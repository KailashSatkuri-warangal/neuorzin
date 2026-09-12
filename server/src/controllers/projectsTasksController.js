import { v4 as uuidv4 } from 'uuid';
import db from '../db/database.js';

async function ensureCustomer(customerId, defaultName = 'Enterprise Client') {
  if (!customerId) customerId = 'CUST-001';
  let cust = await db.get('SELECT id FROM customers WHERE id = ?', [customerId]);
  if (!cust) {
    let lead = await db.get('SELECT * FROM leads WHERE id = ?', [customerId]);
    if (lead) {
      await db.run(`
        INSERT INTO customers (id, lead_id, name, company, email, phone)
        VALUES (?, ?, ?, ?, ?, ?)
      `, [customerId, lead.id, lead.name, lead.company || 'Enterprise Client', lead.email, lead.phone]);
    } else {
      let firstCust = await db.get('SELECT id FROM customers LIMIT 1');
      if (firstCust) return firstCust.id;
      await db.run(`
        INSERT INTO customers (id, name, company, email)
        VALUES (?, ?, ?, ?)
      `, ['CUST-001', defaultName, defaultName, 'client@neuorzin.com']);
      return 'CUST-001';
    }
  }
  return customerId;
}

async function resolveUserId(userId) {
  if (!userId) return 'USR-001';
  const u = await db.get('SELECT id FROM users WHERE id = ? OR name LIKE ?', [userId, `%${userId}%`]);
  return u ? u.id : 'USR-001';
}

async function resolveProjectId(projId) {
  if (!projId) return null;
  const p = await db.get('SELECT id FROM projects WHERE id = ?', [projId]);
  return p ? p.id : null;
}

export const getProjects = async (req, res) => {
  try {
    const projects = await db.all(`
      SELECT p.*, c.name as customer_name, c.company as customer_company,
             c.email as customer_email, c.phone as customer_phone,
             d.title as deal_title, u.name as project_manager_name
      FROM projects p
      LEFT JOIN customers c ON p.customer_id = c.id
      LEFT JOIN deals d ON p.deal_id = d.id
      LEFT JOIN users u ON p.project_manager_id = u.id
      ORDER BY p.created_at DESC
    `);
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getProjectById = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await db.get(`
      SELECT p.*, c.name as customer_name, c.company as customer_company,
             u.name as project_manager_name
      FROM projects p
      LEFT JOIN customers c ON p.customer_id = c.id
      LEFT JOIN users u ON p.project_manager_id = u.id
      WHERE p.id = ?
    `, [id]);

    if (!project) return res.status(404).json({ error: 'Project not found' });

    const tasks = await db.all(`
      SELECT t.*, u.name as assigned_to_name
      FROM tasks t
      LEFT JOIN users u ON t.assigned_to = u.id
      WHERE t.project_id = ?
      ORDER BY t.created_at DESC
    `, [id]);

    res.json({ project, tasks });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createProject = async (req, res) => {
  try {
    let { name, deal_id, customer_id, project_manager_id, department, start_date, deadline, budget, description, priority } = req.body;
    if (!name) {
      return res.status(400).json({ error: 'Project name is required' });
    }

    customer_id = await ensureCustomer(customer_id, name);
    const pmId = await resolveUserId(project_manager_id || 'USR-004');

    const projectId = `PRJ-${uuidv4().substring(0, 8)}`;
    const countRow = await db.get('SELECT COUNT(*) as count FROM projects');
    const projCount = Number(countRow?.count || 0);
    const projectCode = `PRJ-2026-${String(projCount + 1).padStart(4, '0')}`;

    await db.run(`
      INSERT INTO projects (
        id, project_code, name, customer_id, deal_id, project_manager_id,
        department, start_date, deadline, budget, priority, status, health, description
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'Kickoff', 'Good', ?)
    `, [
      projectId,
      projectCode,
      name,
      customer_id,
      deal_id || null,
      pmId,
      department || 'Development',
      start_date || new Date().toISOString().split('T')[0],
      deadline || null,
      parseFloat(budget) || 0,
      priority || 'High',
      description || null
    ]);

    res.status(201).json({ id: projectId, project_code: projectCode, message: 'Project created successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, status, health, deadline, budget, priority, description } = req.body;

    await db.run(`
      UPDATE projects
      SET name = COALESCE(?, name),
          status = COALESCE(?, status),
          health = COALESCE(?, health),
          deadline = COALESCE(?, deadline),
          budget = COALESCE(?, budget),
          priority = COALESCE(?, priority),
          description = COALESCE(?, description),
          updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `, [name, status, health, deadline, budget, priority, description, id]);

    res.json({ message: 'Project updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getTasks = async (req, res) => {
  try {
    const { project_id, assigned_to, status, priority, department } = req.query;
    let query = `
      SELECT t.*, p.name as project_name, u.name as assigned_to_name
      FROM tasks t
      LEFT JOIN projects p ON t.project_id = p.id
      LEFT JOIN users u ON t.assigned_to = u.id
      WHERE 1=1
    `;
    const params = [];

    if (project_id) {
      query += ' AND t.project_id = ?';
      params.push(project_id);
    }
    if (assigned_to) {
      query += ' AND t.assigned_to = ?';
      params.push(assigned_to);
    }
    if (status) {
      query += ' AND t.status = ?';
      params.push(status);
    }
    if (priority) {
      query += ' AND t.priority = ?';
      params.push(priority);
    }
    if (department) {
      query += ' AND t.department = ?';
      params.push(department);
    }

    query += ' ORDER BY t.due_date ASC';
    const tasks = await db.all(query, params);
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createTask = async (req, res) => {
  try {
    const { project_id, title, description, department, assigned_to, priority, estimated_hours, due_date } = req.body;
    if (!title) {
      return res.status(400).json({ error: 'Task title is required' });
    }

    const assignedUserId = await resolveUserId(assigned_to || (req.user ? req.user.id : 'USR-005'));
    const resolvedProjId = await resolveProjectId(project_id);

    const taskId = `TSK-${uuidv4().substring(0, 8)}`;
    const countRow = await db.get('SELECT COUNT(*) as count FROM tasks');
    const count = Number(countRow?.count || 0);
    const taskCode = `TSK-${String(count + 1).padStart(4, '0')}`;

    await db.run(`
      INSERT INTO tasks (
        id, task_code, project_id, title, description, department,
        assigned_to, priority, status, estimated_hours, logged_hours,
        due_date, created_by
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'Todo', ?, 0, ?, ?)
    `, [
      taskId,
      taskCode,
      resolvedProjId,
      title,
      description || null,
      department || 'Development',
      assignedUserId,
      priority || 'Medium',
      parseFloat(estimated_hours) || 0,
      due_date || null,
      req.user ? req.user.id : 'USR-001'
    ]);

    res.status(201).json({ id: taskId, task_code: taskCode, message: 'Task created successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, assigned_to, priority, status, estimated_hours, logged_hours, due_date } = req.body;
    const assignedUserId = assigned_to ? await resolveUserId(assigned_to) : null;

    await db.run(`
      UPDATE tasks
      SET title = COALESCE(?, title),
          description = COALESCE(?, description),
          assigned_to = COALESCE(?, assigned_to),
          priority = COALESCE(?, priority),
          status = COALESCE(?, status),
          estimated_hours = COALESCE(?, estimated_hours),
          logged_hours = COALESCE(?, logged_hours),
          due_date = COALESCE(?, due_date),
          updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `, [title, description, assignedUserId, priority, status, estimated_hours, logged_hours, due_date, id]);

    res.json({ message: 'Task updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const logTimesheet = async (req, res) => {
  try {
    const { task_id, hours, notes, date } = req.body;
    if (!task_id || !hours) {
      return res.status(400).json({ error: 'Task ID and hours are required' });
    }

    let task = await db.get('SELECT id FROM tasks WHERE id = ?', [task_id]);
    if (!task) {
      task = await db.get('SELECT id FROM tasks LIMIT 1');
    }
    const finalTaskId = task ? task.id : task_id;
    const userId = req.user ? req.user.id : 'USR-005';

    const timesheetId = `TM-${uuidv4().substring(0, 8)}`;
    await db.run(`
      INSERT INTO timesheets (id, task_id, user_id, date, hours, notes)
      VALUES (?, ?, ?, ?, ?, ?)
    `, [timesheetId, finalTaskId, userId, date || new Date().toISOString().split('T')[0], parseFloat(hours) || 0, notes || null]);

    await db.run('UPDATE tasks SET logged_hours = logged_hours + ? WHERE id = ?', [parseFloat(hours) || 0, finalTaskId]);

    res.status(201).json({ message: 'Timesheet logged successfully', timesheetId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

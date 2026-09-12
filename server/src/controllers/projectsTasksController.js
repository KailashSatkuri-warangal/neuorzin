import { v4 as uuidv4 } from 'uuid';
import db from '../db/database.js';
import { logAudit } from '../services/auditService.js';

// ---- PROJECTS ----
export const getProjects = (req, res) => {
  try {
    const projects = db.prepare(`
      SELECT p.*, c.name as customer_name, c.company as customer_company,
             c.email as customer_email, c.phone as customer_phone,
             d.title as deal_title, u.name as project_manager_name
      FROM projects p
      LEFT JOIN customers c ON p.customer_id = c.id
      LEFT JOIN deals d ON p.deal_id = d.id
      LEFT JOIN users u ON p.project_manager_id = u.id
      ORDER BY p.created_at DESC
    `).all();

    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getProjectById = (req, res) => {
  try {
    const { id } = req.params;
    const project = db.prepare(`
      SELECT p.*, c.name as customer_name, c.company as customer_company,
             u.name as project_manager_name
      FROM projects p
      LEFT JOIN customers c ON p.customer_id = c.id
      LEFT JOIN users u ON p.project_manager_id = u.id
      WHERE p.id = ?
    `).get(id);

    if (!project) return res.status(404).json({ error: 'Project not found' });

    const milestones = db.prepare('SELECT * FROM project_milestones WHERE project_id = ? ORDER BY due_date ASC').all(id);
    const tasks = db.prepare(`
      SELECT t.*, u.name as assigned_to_name
      FROM tasks t
      LEFT JOIN users u ON t.assigned_to = u.id
      WHERE t.project_id = ?
      ORDER BY t.created_at DESC
    `).all(id);

    res.json({
      project,
      milestones,
      tasks
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

function ensureCustomer(customerId, defaultName = 'Enterprise Client') {
  if (!customerId) customerId = 'CUST-001';
  let cust = db.prepare('SELECT id FROM customers WHERE id = ?').get(customerId);
  if (!cust) {
    let lead = db.prepare('SELECT * FROM leads WHERE id = ?').get(customerId);
    if (lead) {
      db.prepare(`
        INSERT OR IGNORE INTO customers (id, lead_id, name, company, email, phone)
        VALUES (?, ?, ?, ?, ?, ?)
      `).run(customerId, lead.id, lead.name, lead.company || 'Enterprise Client', lead.email, lead.phone);
    } else {
      let firstCust = db.prepare('SELECT id FROM customers LIMIT 1').get();
      if (firstCust) return firstCust.id;
      db.prepare(`
        INSERT OR IGNORE INTO customers (id, name, company, email)
        VALUES (?, ?, ?, ?)
      `).run('CUST-001', defaultName, defaultName, 'client@neuorzin.com');
      return 'CUST-001';
    }
  }
  return customerId;
}

function resolveUserId(userId) {
  if (!userId) return 'USR-001';
  const u = db.prepare('SELECT id FROM users WHERE id = ? OR name LIKE ?').get(userId, `%${userId}%`);
  return u ? u.id : 'USR-001';
}

function resolveProjectId(projId) {
  if (!projId) return null;
  const p = db.prepare('SELECT id FROM projects WHERE id = ?').get(projId);
  return p ? p.id : null;
}

export const createProject = (req, res) => {
  try {
    let { name, deal_id, customer_id, project_manager_id, department, start_date, deadline, budget, description, priority } = req.body;
    if (!name) {
      return res.status(400).json({ error: 'Project name is required' });
    }

    customer_id = ensureCustomer(customer_id, name);
    const pmId = resolveUserId(project_manager_id || 'USR-004');

    const projectId = `PRJ-${uuidv4().substring(0, 8)}`;
    const projCount = db.prepare('SELECT COUNT(*) as count FROM projects').get().count;
    const projectCode = `PRJ-2026-${String(projCount + 1).padStart(4, '0')}`;

    db.prepare(`
      INSERT INTO projects (
        id, project_code, name, customer_id, deal_id, project_manager_id,
        department, start_date, deadline, budget, priority, status, health, description
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'Kickoff', 'Good', ?)
    `).run(
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
    );

    res.status(201).json({ id: projectId, project_code: projectCode, message: 'Project created successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateProject = (req, res) => {
  try {
    const { id } = req.params;
    const { name, status, health, deadline, budget, priority, description } = req.body;

    db.prepare(`
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
    `).run(name, status, health, deadline, budget, priority, description, id);

    res.json({ message: 'Project updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ---- TASKS & TIMESHEETS ----
export const getTasks = (req, res) => {
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
    const tasks = db.prepare(query).all(...params);
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createTask = (req, res) => {
  try {
    const { project_id, title, description, department, assigned_to, priority, estimated_hours, due_date } = req.body;
    if (!title) {
      return res.status(400).json({ error: 'Task title is required' });
    }

    const assignedUserId = resolveUserId(assigned_to || (req.user ? req.user.id : 'USR-005'));
    const resolvedProjId = resolveProjectId(project_id);

    const taskId = `TSK-${uuidv4().substring(0, 8)}`;
    const count = db.prepare('SELECT COUNT(*) as count FROM tasks').get().count;
    const taskCode = `TSK-${String(count + 1).padStart(4, '0')}`;

    db.prepare(`
      INSERT INTO tasks (
        id, task_code, project_id, title, description, department,
        assigned_to, priority, status, estimated_hours, logged_hours,
        due_date, created_by
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'Todo', ?, 0, ?, ?)
    `).run(
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
    );

    res.status(201).json({ id: taskId, task_code: taskCode, message: 'Task created successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateTask = (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, assigned_to, priority, status, estimated_hours, logged_hours, due_date } = req.body;

    const assignedUserId = assigned_to ? resolveUserId(assigned_to) : null;

    db.prepare(`
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
    `).run(title, description, assignedUserId, priority, status, estimated_hours, logged_hours, due_date, id);

    res.json({ message: 'Task updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const logTimesheet = (req, res) => {
  try {
    const { task_id, hours, notes, date } = req.body;
    if (!task_id || !hours) {
      return res.status(400).json({ error: 'Task ID and hours are required' });
    }

    // Ensure task exists
    let task = db.prepare('SELECT id FROM tasks WHERE id = ?').get(task_id);
    if (!task) {
      task = db.prepare('SELECT id FROM tasks LIMIT 1').get();
    }
    const finalTaskId = task ? task.id : task_id;
    const userId = req.user ? req.user.id : 'USR-005';

    const timesheetId = `TM-${uuidv4().substring(0, 8)}`;
    db.prepare(`
      INSERT INTO timesheets (id, task_id, user_id, date, hours, notes)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(
      timesheetId,
      finalTaskId,
      userId,
      date || new Date().toISOString().split('T')[0],
      parseFloat(hours) || 0,
      notes || null
    );

    db.prepare('UPDATE tasks SET logged_hours = logged_hours + ? WHERE id = ?').run(parseFloat(hours) || 0, finalTaskId);

    res.status(201).json({ message: 'Timesheet logged successfully', timesheetId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

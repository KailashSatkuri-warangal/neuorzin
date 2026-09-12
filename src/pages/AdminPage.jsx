import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard,
  Inbox, 
  KeyRound, 
  SendHorizontal, 
  BarChart3, 
  Workflow, 
  ShieldCheck, 
  Lock, 
  Mail, 
  User, 
  Search, 
  Filter, 
  Download, 
  Eye, 
  Trash2, 
  Phone, 
  Building, 
  Calendar, 
  TrendingUp, 
  CheckCircle2, 
  Clock, 
  Sparkles, 
  AlertCircle,
  ExternalLink,
  ChevronRight,
  RefreshCw,
  X,
  Key,
  Globe2,
  BellRing,
  Check,
  Cpu,
  LogOut,
  Zap,
  Activity,
  ArrowUpRight,
  Copy,
  ChevronDown,
  EyeOff,
  SlidersHorizontal,
  Server,
  HelpCircle,
  FileText,
  Receipt,
  CreditCard,
  Briefcase,
  CheckSquare,
  MessageSquare,
  DollarSign,
  Layers,
  AlertTriangle,
  PlusCircle,
  Award,
  ArrowRight,
  Send,
  Timer,
  Hash,
  Share2,
  Percent,
  TrendingDown,
  MailCheck,
  MailQuestion,
  FileSpreadsheet,
  Building2,
  Sparkle,
  Reply,
  Settings,
  Sliders,
  Database,
  ArrowUpDown,
  Laptop
} from 'lucide-react';
import { getStoredLeads, saveLeads, recordNewLead } from '../data/leadsStore';
import { EMAIL_CONFIG, createMailtoLink } from '../data/emailConfig';
import { crmApi } from '../data/crmApi';

const VALID_EMAIL = 'admin@neuorzin.com';
const VALID_EMAIL_ALT = 'admin@neuorzin';
const DEFAULT_PASSWORD = 'demo0722';

// Dynamic CSV Exporter Utility
function downloadCsv(filename, rows, columns) {
  if (!rows || !rows.length) return;
  const header = columns.map(c => '"' + (c.header || c.key) + '"').join(',');
  const lines = rows.map(r => 
    columns.map(c => {
      let val = r[c.key];
      if (val === undefined || val === null) val = '';
      return '"' + String(val).replace(/"/g, '""') + '"';
    }).join(',')
  );
  const csvContent = 'data:text/csv;charset=utf-8,' + encodeURIComponent([header, ...lines].join('\n'));
  const link = document.createElement('a');
  link.setAttribute('href', csvContent);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function AdminPage({ onShowToast }) {
  const navigate = useNavigate();
  const location = useLocation();

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('neuorzin_admin_auth') === 'true';
    }
    return false;
  });

  // Extract activeTab from dynamic subroute e.g. /admin/leads -> 'leads'
  const routeTab = useMemo(() => {
    const parts = location.pathname.split('/').filter(Boolean);
    if (parts.length > 1 && parts[0] === 'admin') {
      return parts[1];
    }
    return 'dashboard';
  }, [location.pathname]);

  const [activeTab, setActiveTab] = useState(routeTab);

  // Keep activeTab in sync with route changes
  useEffect(() => {
    if (routeTab && routeTab !== activeTab) {
      setActiveTab(routeTab);
    }
  }, [routeTab]);

  // Navigate dynamically on tab selection
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    navigate(`/admin/${tab}`);
  };

  // Dynamic Document Title
  useEffect(() => {
    const titles = {
      dashboard: 'Executive Dashboard | NeuOrzin CRM Suite',
      leads: 'Inbound Leads CRM | NeuOrzin Operations',
      emails: 'Email Transactions & Mailbox | NeuOrzin',
      deals: 'Deals & Revenue Pipeline | NeuOrzin',
      quotations: 'GST Quotations Builder | NeuOrzin',
      invoices: 'Tax Invoices & Payments | NeuOrzin',
      projects: 'Agile Project Delivery | NeuOrzin',
      tasks: 'Sprint Tasks & Timesheets | NeuOrzin',
      whatsapp: 'WhatsApp Business Inbox | NeuOrzin',
      campaigns: 'Ad Campaigns & ROI Attribution | NeuOrzin',
      audit: 'Tamper-Evident Audit Trail | NeuOrzin',
      settings: 'Enterprise System Settings | NeuOrzin'
    };
    document.title = titles[activeTab] || 'Enterprise Admin Portal | NeuOrzin';
  }, [activeTab]);

  const [isBackendOnline, setIsBackendOnline] = useState(true);
  const [lastSyncTime, setLastSyncTime] = useState(new Date());

  // Dynamic Settings State
  const [systemSettings, setSystemSettings] = useState(() => {
    const saved = localStorage.getItem('neuorzin_system_settings');
    if (saved) {
      try { return JSON.parse(saved); } catch {}
    }
    return {
      companyName: 'NeuOrzin Technologies Pvt Ltd',
      legalGstin: '36AAACN1234F1Z8',
      sacCode: '998313',
      defaultCurrency: 'INR (₹)',
      enquiryEmail: 'info@neuorzin.com',
      slaHours: '2',
      gstRate: '18',
      autoLeadScoring: true,
      realtimeNotifications: true
    };
  });

  // Auth States
  const [authView, setAuthView] = useState('login');
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Live Database States
  const [leads, setLeads] = useState([]);
  const [deals, setDeals] = useState([]);
  const [quotations, setQuotations] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [activities, setActivities] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [auditLogs, setAuditLogs] = useState([]);
  const [campaigns, setCampaigns] = useState([]);
  const [whatsappMessages, setWhatsappMessages] = useState([]);

  // Search & Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState(null);
  const [statusFilter, setStatusFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Active Modals & Selected View
  const [selectedLead, setSelectedLead] = useState(null);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [showAddLeadModal, setShowAddLeadModal] = useState(false);
  const [showAddDealModal, setShowAddDealModal] = useState(false);
  const [showAddQuoteModal, setShowAddQuoteModal] = useState(false);
  const [showAddInvoiceModal, setShowAddInvoiceModal] = useState(false);
  const [showRecordPaymentModal, setShowRecordPaymentModal] = useState(null);
  const [showAddProjectModal, setShowAddProjectModal] = useState(false);
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const [showLogTimeModal, setShowLogTimeModal] = useState(null);
  const [showDispatchWhatsAppModal, setShowDispatchWhatsAppModal] = useState(false);
  const [showAddCampaignModal, setShowAddCampaignModal] = useState(false);
  const [showNotificationsDrawer, setShowNotificationsDrawer] = useState(false);

  // Modal Form States
  const [leadForm, setLeadForm] = useState({
    name: '', email: '', phone: '', company: '', service: 'Enterprise Software & AI',
    requirement_need: '', budget: '', timeline: ''
  });

  const [dealForm, setDealForm] = useState({
    title: '', customer_id: '', pipeline_id: 'PIPE-SW', stage: 'Lead Qualified',
    value: '', probability: 50, expected_close_date: ''
  });

  const [quoteForm, setQuoteForm] = useState({
    customer_id: '', deal_id: '', service_title: 'Enterprise AI & Cloud Infrastructure',
    scope_of_work: 'Development of custom microservices, fine-tuned LLM models, and web application portal.',
    items: [
      { description: 'Phase 1: Architecture & UI/UX Design', qty: 1, rate: 150000, amount: 150000 },
      { description: 'Phase 2: Core Engineering & Backend Services', qty: 1, rate: 250000, amount: 250000 }
    ]
  });

  const [invoiceForm, setInvoiceForm] = useState({
    customer_id: '', deal_id: '', issue_date: new Date().toISOString().split('T')[0],
    due_date: new Date(Date.now() + 15 * 86400000).toISOString().split('T')[0],
    notes: 'Standard GST commercial tax invoice',
    items: [
      { description: 'Enterprise AI & Custom Software Implementation', sac: '998313', qty: 1, rate: 200000, amount: 200000 }
    ]
  });

  const [paymentForm, setPaymentForm] = useState({
    amount: '', payment_method: 'Bank Transfer', transaction_ref: '', notes: ''
  });

  const [projectForm, setProjectForm] = useState({
    name: '', customer_id: '', budget: '500000', department: 'Development',
    deadline: '', description: 'Sprint architecture and deliverables.'
  });

  const [taskForm, setTaskForm] = useState({
    title: '', project_id: '', department: 'Development', priority: 'High',
    estimated_hours: '16', due_date: ''
  });

  const [timesheetForm, setTimesheetForm] = useState({
    hours: '4', notes: 'Completed task implementation and testing.', date: new Date().toISOString().split('T')[0]
  });

  const [waForm, setWaForm] = useState({
    phone_number: '+91 98765 43210',
    message: 'Hello! Thank you for connecting with NeuOrzin. Our senior consultant is reviewing your requirement.'
  });

  const [campaignForm, setCampaignForm] = useState({
    name: '', platform: 'Google Ads', utm_source: '',
    utm_campaign: '', budget: ''
  });

  // 1. Live Database Fetching
  const fetchLiveDatabase = async () => {
    setIsRefreshing(true);
    try {
      const online = await crmApi.checkHealth();
      setIsBackendOnline(online);

      if (online) {
        const [
          leadsRes, dealsRes, quotesRes, invsRes, projsRes,
          tasksRes, actsRes, notifsRes, logsRes, campsRes, waRes
        ] = await Promise.allSettled([
          crmApi.getLeads(),
          crmApi.getDeals(),
          crmApi.getQuotations(),
          crmApi.getInvoices(),
          crmApi.getProjects(),
          crmApi.getTasks(),
          crmApi.getActivities(),
          crmApi.getNotifications(),
          crmApi.getAuditLogs(),
          crmApi.getCampaigns(),
          crmApi.getWhatsAppMessages()
        ]);

        if (leadsRes.status === 'fulfilled' && Array.isArray(leadsRes.value)) setLeads(leadsRes.value);
        if (dealsRes.status === 'fulfilled' && Array.isArray(dealsRes.value)) setDeals(dealsRes.value);
        if (quotesRes.status === 'fulfilled' && Array.isArray(quotesRes.value)) setQuotations(quotesRes.value);
        if (invsRes.status === 'fulfilled' && Array.isArray(invsRes.value)) setInvoices(invsRes.value);
        if (projsRes.status === 'fulfilled' && Array.isArray(projsRes.value)) setProjects(projsRes.value);
        if (tasksRes.status === 'fulfilled' && Array.isArray(tasksRes.value)) setTasks(tasksRes.value);
        if (actsRes.status === 'fulfilled' && Array.isArray(actsRes.value)) setActivities(actsRes.value);
        if (notifsRes.status === 'fulfilled' && Array.isArray(notifsRes.value)) setNotifications(notifsRes.value);
        if (logsRes.status === 'fulfilled' && Array.isArray(logsRes.value)) setAuditLogs(logsRes.value);
        if (campsRes.status === 'fulfilled' && Array.isArray(campsRes.value)) setCampaigns(campsRes.value);
        if (waRes.status === 'fulfilled' && Array.isArray(waRes.value)) setWhatsappMessages(waRes.value);
        setLastSyncTime(new Date());
      } else {
        setLeads(getStoredLeads());
      }
    } catch (err) {
      console.warn('Sync notice:', err);
      setLeads(getStoredLeads());
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchLiveDatabase();
      const interval = setInterval(fetchLiveDatabase, 5000); // 5s fast real-time synchronization

      const handleLiveUpdate = () => fetchLiveDatabase();
      window.addEventListener('neuorzin_leads_updated', handleLiveUpdate);
      window.addEventListener('storage', handleLiveUpdate);

      return () => {
        clearInterval(interval);
        window.removeEventListener('neuorzin_leads_updated', handleLiveUpdate);
        window.removeEventListener('storage', handleLiveUpdate);
      };
    }
  }, [isAuthenticated]);

  // Global Search Handler
  useEffect(() => {
    if (!searchQuery.trim() || searchQuery.length < 2) {
      setSearchResults(null);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        if (isBackendOnline) {
          const res = await crmApi.globalSearch(searchQuery);
          if (res.results) setSearchResults(res.results);
        }
      } catch (err) {
        console.warn('Search query notice:', err);
      }
    }, 250);

    return () => clearTimeout(timer);
  }, [searchQuery, isBackendOnline]);

  // Handle Login
  const handleLogin = (e) => {
    e.preventDefault();
    setLoginError('');
    setIsLoggingIn(true);

    setTimeout(() => {
      const email = emailInput.trim().toLowerCase();
      const pwd = passwordInput.trim();

      if ((email === VALID_EMAIL || email === VALID_EMAIL_ALT) && pwd === DEFAULT_PASSWORD) {
        setIsAuthenticated(true);
        localStorage.setItem('neuorzin_admin_auth', 'true');
        if (onShowToast) onShowToast('Welcome back, Super Admin! Operations Portal Live.', 'success');
        fetchLiveDatabase();
      } else {
        setLoginError('Invalid credentials. Use admin@neuorzin.com / demo0722');
      }
      setIsLoggingIn(false);
    }, 300);
  };

  // Handle Logout
  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('neuorzin_admin_auth');
    if (onShowToast) onShowToast('Signed out of Admin Portal.', 'info');
  };

  // 1. Dynamic Quick Update Lead Status
  const handleUpdateLeadStatus = async (leadId, newStatus) => {
    try {
      if (isBackendOnline) {
        await crmApi.updateLead(leadId, { status: newStatus });
        if (onShowToast) onShowToast(`Lead status updated to ${newStatus}`, 'success');
      }
      fetchLiveDatabase();
    } catch (err) {
      if (onShowToast) onShowToast(err.message, 'error');
    }
  };

  // 2. Dynamic Quick Advance Deal Stage
  const handleAdvanceDealStage = async (dealId, currentStage) => {
    const stageFlow = ['Lead Qualified', 'Proposal Sent', 'Negotiation', 'Won'];
    const currIdx = stageFlow.indexOf(currentStage);
    const nextStage = currIdx !== -1 && currIdx < stageFlow.length - 1 ? stageFlow[currIdx + 1] : 'Won';

    try {
      if (isBackendOnline) {
        await crmApi.updateDeal(dealId, { 
          stage: nextStage, 
          status: nextStage === 'Won' ? 'Won' : 'Open',
          probability: nextStage === 'Won' ? 100 : nextStage === 'Negotiation' ? 80 : 60
        });
        if (onShowToast) onShowToast(`Deal advanced to ${nextStage}!`, 'success');
      }
      fetchLiveDatabase();
    } catch (err) {
      if (onShowToast) onShowToast(err.message, 'error');
    }
  };

  // 3. Dynamic Quick Update Task Status
  const handleUpdateTaskStatus = async (taskId, newStatus) => {
    try {
      if (isBackendOnline) {
        await crmApi.updateTask(taskId, { status: newStatus });
        if (onShowToast) onShowToast(`Task updated to ${newStatus}`, 'success');
      }
      fetchLiveDatabase();
    } catch (err) {
      if (onShowToast) onShowToast(err.message, 'error');
    }
  };

  // 4. Save System Settings
  const handleSaveSettings = (e) => {
    e.preventDefault();
    localStorage.setItem('neuorzin_system_settings', JSON.stringify(systemSettings));
    if (onShowToast) onShowToast('System settings saved successfully!', 'success');
  };

  // 5. Create Inbound Lead Action
  const handleCreateLead = async (e) => {
    e.preventDefault();
    try {
      if (isBackendOnline) {
        await crmApi.createLead({
          name: leadForm.name,
          email: leadForm.email,
          phone: leadForm.phone,
          company: leadForm.company,
          service: leadForm.service,
          requirement_need: leadForm.requirement_need,
          budget: leadForm.budget || '₹5,00,000 - ₹15,00,000',
          timeline: leadForm.timeline || '3-6 Months',
          source: 'Admin Manual Entry'
        });
        if (onShowToast) onShowToast('New Lead captured in Live Database!', 'success');
      }
      setShowAddLeadModal(false);
      setLeadForm({ name: '', email: '', phone: '', company: '', service: 'Enterprise Software & AI', requirement_need: '', budget: '', timeline: '' });
      fetchLiveDatabase();
    } catch (err) {
      if (onShowToast) onShowToast(err.message, 'error');
    }
  };

  // 6. Convert Lead to Deal
  const handleConvertLeadToDeal = async (lead) => {
    try {
      if (isBackendOnline) {
        await crmApi.convertLead(lead.id, 500000);
        if (onShowToast) onShowToast(`Converted ${lead.name} to Active Deal & Project!`, 'success');
      }
      fetchLiveDatabase();
    } catch (err) {
      if (onShowToast) onShowToast(err.message, 'error');
    }
  };

  // 7. Create Deal
  const handleCreateDeal = async (e) => {
    e.preventDefault();
    try {
      if (isBackendOnline) {
        await crmApi.createDeal({
          title: dealForm.title,
          customer_id: dealForm.customer_id || (leads[0]?.id || 'CUST-001'),
          pipeline_id: dealForm.pipeline_id,
          stage: dealForm.stage,
          value: parseFloat(dealForm.value || 0),
          probability: parseInt(dealForm.probability, 10),
          expected_close_date: dealForm.expected_close_date || null
        });
        if (onShowToast) onShowToast('Deal created in Revenue Pipeline!', 'success');
      }
      setShowAddDealModal(false);
      setDealForm({ title: '', customer_id: '', pipeline_id: 'PIPE-SW', stage: 'Lead Qualified', value: '', probability: 50, expected_close_date: '' });
      fetchLiveDatabase();
    } catch (err) {
      if (onShowToast) onShowToast(err.message, 'error');
    }
  };

  // 8. Create Quotation
  const handleCreateQuotation = async (e) => {
    e.preventDefault();
    try {
      const sub = quoteForm.items.reduce((sum, item) => sum + (Number(item.qty || 1) * Number(item.rate || 0)), 0);
      const gst = sub * 0.18;
      const tot = sub + gst;

      if (isBackendOnline) {
        await crmApi.createQuotation({
          customer_id: quoteForm.customer_id || quoteForm.client_name || (leads[0]?.id || 'CUST-001'),
          deal_id: quoteForm.deal_id || null,
          service_title: quoteForm.service_title,
          scope_of_work: quoteForm.scope_of_work,
          items: quoteForm.items,
          subtotal: sub,
          gst_amount: gst,
          total_amount: tot
        });
        if (onShowToast) onShowToast('GST Quotation created with 18% Tax breakdown!', 'success');
      }
      setShowAddQuoteModal(false);
      setQuoteForm({
        customer_id: '', client_name: '', deal_id: '', service_title: '', scope_of_work: '',
        items: [{ description: 'Phase 1: Architecture & UI/UX Design', qty: 1, rate: 50000, amount: 50000 }]
      });
      fetchLiveDatabase();
    } catch (err) {
      if (onShowToast) onShowToast(err.message, 'error');
    }
  };

  // 9. Create Invoice
  const handleCreateInvoice = async (e) => {
    e.preventDefault();
    try {
      const sub = invoiceForm.items.reduce((sum, item) => sum + (Number(item.qty || 1) * Number(item.rate || 0)), 0);
      const gst = sub * 0.18;
      const tot = sub + gst;

      if (isBackendOnline) {
        await crmApi.createInvoice({
          customer_id: invoiceForm.customer_id || invoiceForm.client_name || (leads[0]?.id || 'CUST-001'),
          deal_id: invoiceForm.deal_id || null,
          issue_date: invoiceForm.issue_date,
          due_date: invoiceForm.due_date,
          notes: invoiceForm.notes,
          items: invoiceForm.items,
          subtotal: sub,
          gst_amount: gst,
          total_amount: tot
        });
        if (onShowToast) onShowToast('GST Tax Invoice issued successfully!', 'success');
      }
      setShowAddInvoiceModal(false);
      setInvoiceForm({
        customer_id: '', client_name: '', deal_id: '', issue_date: new Date().toISOString().split('T')[0],
        due_date: new Date(Date.now() + 15 * 86400000).toISOString().split('T')[0],
        notes: 'Standard GST commercial tax invoice',
        items: [{ description: 'Enterprise AI & Custom Software Implementation', sac: '998313', qty: 1, rate: 75000, amount: 75000 }]
      });
      fetchLiveDatabase();
    } catch (err) {
      if (onShowToast) onShowToast(err.message, 'error');
    }
  };

  // 10. Record Payment
  const handleRecordPayment = async (e) => {
    e.preventDefault();
    if (!showRecordPaymentModal) return;

    try {
      if (isBackendOnline) {
        await crmApi.recordPayment({
          invoice_id: showRecordPaymentModal.id,
          amount: parseFloat(paymentForm.amount),
          payment_method: paymentForm.payment_method,
          transaction_ref: paymentForm.transaction_ref,
          notes: paymentForm.notes
        });
        if (onShowToast) onShowToast('Payment reconciled in GST Ledger!', 'success');
      }
      setShowRecordPaymentModal(null);
      fetchLiveDatabase();
    } catch (err) {
      if (onShowToast) onShowToast(err.message, 'error');
    }
  };

  // 11. Create Project
  const handleCreateProject = async (e) => {
    e.preventDefault();
    try {
      if (isBackendOnline) {
        await crmApi.createProject({
          name: projectForm.name,
          customer_id: projectForm.customer_id || (leads[0]?.id || 'CUST-001'),
          budget: parseFloat(projectForm.budget || 0),
          department: projectForm.department,
          deadline: projectForm.deadline || null,
          description: projectForm.description
        });
        if (onShowToast) onShowToast('Agile Delivery Project initialized!', 'success');
      }
      setShowAddProjectModal(false);
      setProjectForm({ name: '', customer_id: '', budget: '500000', department: 'Development', deadline: '', description: '' });
      fetchLiveDatabase();
    } catch (err) {
      if (onShowToast) onShowToast(err.message, 'error');
    }
  };

  // 12. Create Sprint Task
  const handleCreateTask = async (e) => {
    e.preventDefault();
    try {
      if (isBackendOnline) {
        await crmApi.createTask({
          title: taskForm.title,
          project_id: taskForm.project_id || (projects[0]?.id || null),
          department: taskForm.department,
          priority: taskForm.priority,
          estimated_hours: parseFloat(taskForm.estimated_hours || 0),
          due_date: taskForm.due_date || null
        });
        if (onShowToast) onShowToast('Engineering Task created in backlog!', 'success');
      }
      setShowAddTaskModal(false);
      setTaskForm({ title: '', project_id: '', department: 'Development', priority: 'High', estimated_hours: '16', due_date: '' });
      fetchLiveDatabase();
    } catch (err) {
      if (onShowToast) onShowToast(err.message, 'error');
    }
  };

  // 13. Log Timesheet
  const handleLogTimesheet = async (e) => {
    e.preventDefault();
    if (!showLogTimeModal) return;

    try {
      if (isBackendOnline) {
        await crmApi.logTimesheet({
          task_id: showLogTimeModal.id,
          hours: parseFloat(timesheetForm.hours),
          notes: timesheetForm.notes,
          date: timesheetForm.date
        });
        if (onShowToast) onShowToast('Timesheet logged & task hours updated!', 'success');
      }
      setShowLogTimeModal(null);
      fetchLiveDatabase();
    } catch (err) {
      if (onShowToast) onShowToast(err.message, 'error');
    }
  };

  // 14. Send WhatsApp Message
  const handleSendWhatsApp = async (e) => {
    e.preventDefault();
    try {
      if (isBackendOnline) {
        await crmApi.sendWhatsAppMessage({
          phone_number: waForm.phone_number,
          message: waForm.message
        });
        if (onShowToast) onShowToast('WhatsApp message dispatched via Live Gateway!', 'success');
      }
      setShowDispatchWhatsAppModal(false);
      setWaForm({ phone_number: '', message: '' });
      fetchLiveDatabase();
    } catch (err) {
      if (onShowToast) onShowToast(err.message, 'error');
    }
  };

  // 15. Create Marketing Campaign
  const handleCreateCampaign = async (e) => {
    e.preventDefault();
    try {
      if (isBackendOnline) {
        await crmApi.createCampaign({
          name: campaignForm.name,
          platform: campaignForm.platform,
          utm_source: campaignForm.utm_source,
          utm_campaign: campaignForm.utm_campaign,
          budget: parseFloat(campaignForm.budget || 0)
        });
        if (onShowToast) onShowToast('Marketing Campaign created with UTM attribution!', 'success');
      }
      setShowAddCampaignModal(false);
      fetchLiveDatabase();
    } catch (err) {
      if (onShowToast) onShowToast(err.message, 'error');
    }
  };

  // Filtered Leads list
  const filteredLeads = useMemo(() => {
    return leads.filter(l => {
      const q = searchQuery.toLowerCase();
      const matchesSearch = 
        (l.name && l.name.toLowerCase().includes(q)) ||
        (l.email && l.email.toLowerCase().includes(q)) ||
        (l.company && l.company.toLowerCase().includes(q)) ||
        (l.phone && l.phone.toLowerCase().includes(q)) ||
        (l.id && String(l.id).toLowerCase().includes(q));

      const matchesStatus = statusFilter === 'All' || l.status === statusFilter;
      const matchesPriority = priorityFilter === 'All' || l.priority === priorityFilter;
      return matchesSearch && matchesStatus && matchesPriority;
    });
  }, [leads, searchQuery, statusFilter, priorityFilter]);

  // Aggregate Real-time Dashboard KPIs
  const dashboardKpis = useMemo(() => {
    const totalRev = invoices.reduce((sum, inv) => sum + Number(inv.paid_amount || 0), 0);
    const pipelineVal = deals.filter(d => d.status === 'Open').reduce((sum, d) => sum + Number(d.value || d.amount || 0), 0);
    const wonCount = deals.filter(d => d.status === 'Won' || (d.stage && d.stage.includes('Won'))).length;
    const totalDeals = deals.length || 1;
    const winRate = ((wonCount / totalDeals) * 100).toFixed(0);
    const activeProjs = projects.filter(p => p.status !== 'Completed').length;
    const pendingInvoices = invoices.filter(i => i.status !== 'Paid').reduce((sum, i) => sum + (Number(i.total_amount) - Number(i.paid_amount || 0)), 0);

    return {
      totalRevenue: totalRev,
      pipelineValue: pipelineVal,
      activeLeads: leads.length,
      winRate: `${winRate}%`,
      activeProjects: activeProjs,
      pendingInvoicesAmount: pendingInvoices
    };
  }, [invoices, deals, projects, leads]);

  // Derived Inbound Emails list
  const inboundEmails = useMemo(() => {
    return leads.map(l => ({
      id: `EML-${l.id}`,
      sender_name: l.name,
      sender_email: l.email,
      phone: l.phone,
      company: l.company || 'Enterprise Client',
      recipient: EMAIL_CONFIG.enquiries,
      subject: `[Enquiry] ${l.service || 'Enterprise AI Solutions'} - ${l.company || l.name}`,
      body: l.requirement_need || l.message || 'Client submitted an inbound enquiry requesting project scope and technical proposal.',
      timestamp: l.created_at || 'Today',
      status: 'Delivered',
      service: l.service || 'Enterprise AI'
    }));
  }, [leads]);

  // -------------------------------------------------------------------
  // 1. CLEAN WHITE & BLUE LOGIN VIEW
  // -------------------------------------------------------------------
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen py-12 flex items-center justify-center px-4 bg-[#f8fafc] text-slate-900 relative font-sans">
        {/* Soft Blue Gradient Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-blue-100 to-cyan-100 rounded-full blur-[120px] pointer-events-none" />

        <motion.div 
          initial={{ opacity: 0, scale: 0.98, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="w-full max-w-[460px] bg-white border border-slate-200 rounded-3xl p-8 sm:p-10 shadow-xl shadow-blue-500/5 relative z-10"
        >
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#0070ba] to-cyan-500 p-3.5 mx-auto mb-4 shadow-lg shadow-blue-500/25 flex items-center justify-center text-white">
              <ShieldCheck className="w-9 h-9" />
            </div>
            <h2 className="text-2xl font-black text-slate-900 font-display tracking-tight">NeuOrzin CRM</h2>
            <p className="text-xs text-slate-500 mt-1">Enterprise Executive Portal & Operations Suite</p>
          </div>

          {loginError && (
            <div className="mb-6 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-center gap-2.5">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Executive Email</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  placeholder="admin@neuorzin.com"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 py-3 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#0070ba] focus:bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Master Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-11 py-3 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#0070ba] focus:bg-white"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-blue-50/70 border border-blue-100 text-[11px] text-slate-600 space-y-1">
              <div className="flex justify-between items-center">
                <span>Default Super Admin:</span>
                <span className="text-[#0070ba] font-mono font-bold">admin@neuorzin.com</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Password:</span>
                <span className="text-[#0070ba] font-mono font-bold">demo0722</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full py-3.5 rounded-xl bg-[#0070ba] hover:bg-[#005a96] text-white text-xs font-bold uppercase tracking-wider shadow-md shadow-blue-500/20 transition-all cursor-pointer flex items-center justify-center gap-2 mt-2"
            >
              {isLoggingIn ? <RefreshCw className="w-4 h-4 animate-spin" /> : <ShieldCheck className="w-4 h-4" />}
              <span>Sign In to Executive Portal</span>
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  // -------------------------------------------------------------------
  // 2. MAIN EXECUTIVE COMMAND CENTER (CLEAN WHITE & BLUE)
  // -------------------------------------------------------------------
  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 flex flex-col font-sans">
      
      {/* TOP COMMAND NAVBAR */}
      <header className="h-16 border-b border-slate-200 bg-white/95 backdrop-blur-md px-4 sm:px-8 flex items-center justify-between sticky top-0 z-30 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#0070ba] to-cyan-500 flex items-center justify-center text-white font-black text-xs shadow-md shadow-blue-500/25">
            NO
          </div>
          <div>
            <div className="text-sm font-black text-slate-900 font-display leading-none flex items-center gap-2">
              <span>NeuOrzin CRM</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-100 text-[#0070ba] font-mono font-bold">Dynamic v2.0</span>
            </div>
            <div className="text-[10px] text-slate-500 mt-1 flex items-center gap-2">
              <span className={`inline-flex items-center gap-1 font-semibold ${isBackendOnline ? 'text-emerald-600' : 'text-amber-600'}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${isBackendOnline ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
                {isBackendOnline ? 'Real-Time Sync Active' : 'Standalone Local DB'}
              </span>
              <span className="text-slate-300">|</span>
              <span className="text-slate-400 font-mono">/admin/{activeTab}</span>
            </div>
          </div>
        </div>

        {/* Global Live Search Bar */}
        <div className="hidden md:flex items-center relative w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search leads, emails, deals, invoices, projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#0070ba] focus:bg-white"
          />

          {/* Search Results Dropdown */}
          {searchResults && (
            <div className="absolute top-12 left-0 w-96 bg-white border border-slate-200 rounded-2xl shadow-xl p-3 z-50 max-h-96 overflow-y-auto space-y-2">
              <div className="text-[10px] font-bold text-slate-400 uppercase">Live Matches for "{searchQuery}"</div>
              {searchResults.leads?.length > 0 && (
                <div>
                  <div className="text-[10px] text-[#0070ba] font-bold">Leads ({searchResults.leads.length})</div>
                  {searchResults.leads.map(l => (
                    <div key={l.id} onClick={() => { handleTabChange('leads'); setSelectedLead(l); }} className="p-1.5 hover:bg-slate-50 rounded text-xs text-slate-800 flex justify-between cursor-pointer">
                      <span>{l.name} ({l.company || 'Client'})</span>
                      <span className="text-[10px] text-slate-500">{l.status}</span>
                    </div>
                  ))}
                </div>
              )}
              {searchResults.deals?.length > 0 && (
                <div>
                  <div className="text-[10px] text-emerald-600 font-bold">Deals ({searchResults.deals.length})</div>
                  {searchResults.deals.map(d => (
                    <div key={d.id} onClick={() => handleTabChange('deals')} className="p-1.5 hover:bg-slate-50 rounded text-xs text-slate-800 flex justify-between cursor-pointer">
                      <span>{d.title}</span>
                      <span className="text-[10px] font-mono text-emerald-600 font-bold">₹{Number(d.value || 0).toLocaleString('en-IN')}</span>
                    </div>
                  ))}
                </div>
              )}
              {searchResults.invoices?.length > 0 && (
                <div>
                  <div className="text-[10px] text-purple-600 font-bold">Invoices ({searchResults.invoices.length})</div>
                  {searchResults.invoices.map(i => (
                    <div key={i.id} onClick={() => handleTabChange('invoices')} className="p-1.5 hover:bg-slate-50 rounded text-xs text-slate-800 flex justify-between cursor-pointer">
                      <span>{i.invoice_number}</span>
                      <span className="text-[10px] text-slate-500">{i.status}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowAddLeadModal(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#0070ba] hover:bg-[#005a96] text-white text-xs font-bold shadow-md shadow-blue-500/20 cursor-pointer transition-all"
          >
            <PlusCircle className="w-4 h-4" />
            <span>New Lead</span>
          </button>

          <button
            onClick={fetchLiveDatabase}
            title="Refresh Live Data"
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-[#0070ba]' : ''}`} />
          </button>

          <div className="relative">
            <button
              onClick={() => setShowNotificationsDrawer(!showNotificationsDrawer)}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 relative cursor-pointer"
            >
              <BellRing className="w-4 h-4" />
              {notifications.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white rounded-full text-[9px] font-bold flex items-center justify-center animate-pulse">
                  {notifications.length}
                </span>
              )}
            </button>

            {/* Notifications Dropdown Drawer */}
            {showNotificationsDrawer && (
              <div className="absolute right-0 top-12 w-80 bg-white border border-slate-200 rounded-2xl shadow-xl p-4 z-50 space-y-3">
                <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                  <span className="text-xs font-bold text-slate-800">Operational Alerts & SLA</span>
                  <span className="text-[10px] text-slate-400">{notifications.length} Total</span>
                </div>
                <div className="max-h-64 overflow-y-auto space-y-2">
                  {notifications.length === 0 ? (
                    <div className="text-center py-4 text-xs text-slate-400">All alerts cleared & healthy.</div>
                  ) : (
                    notifications.map(n => (
                      <div key={n.id} className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs space-y-1">
                        <div className="font-bold text-slate-800">{n.title}</div>
                        <div className="text-[11px] text-slate-600">{n.message}</div>
                        <div className="text-[9px] text-slate-400">{n.created_at || 'Just now'}</div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="h-6 w-px bg-slate-200 mx-1" />

          {/* User Badge */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#0070ba] to-indigo-600 flex items-center justify-center text-white font-bold text-xs">
              SA
            </div>
            <div className="hidden lg:block text-left">
              <div className="text-xs font-bold text-slate-900 leading-tight">Super Admin</div>
              <div className="text-[10px] text-[#0070ba] font-medium">admin@neuorzin.com</div>
            </div>
            <button
              onClick={handleLogout}
              title="Sign Out"
              className="p-1.5 text-slate-400 hover:text-rose-600 transition-colors ml-1 cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* BODY SHELL */}
      <div className="flex-1 flex max-w-[1680px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 gap-6">

        {/* SIDEBAR NAVIGATION (WHITE & BLUE DYNAMIC WEBSITE LINKS) */}
        <aside className="w-64 shrink-0 hidden md:flex flex-col gap-3">
          <div className="p-3 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-1">
            <div className="px-3 py-1.5 text-[10px] uppercase font-bold text-slate-400 tracking-wider">
              Core Operations
            </div>

            <button
              onClick={() => handleTabChange('dashboard')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'dashboard'
                  ? 'bg-gradient-to-r from-[#0070ba] to-[#0284c7] text-white shadow-md shadow-blue-500/20'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Executive Dashboard</span>
            </button>

            <button
              onClick={() => handleTabChange('leads')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'leads'
                  ? 'bg-gradient-to-r from-[#0070ba] to-[#0284c7] text-white shadow-md shadow-blue-500/20'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-3">
                <Inbox className="w-4 h-4" />
                <span>Inbound Leads</span>
              </div>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                activeTab === 'leads' ? 'bg-white/20 text-white' : 'bg-blue-50 text-[#0070ba]'
              }`}>
                {leads.length}
              </span>
            </button>

            <button
              onClick={() => handleTabChange('emails')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'emails'
                  ? 'bg-gradient-to-r from-[#0070ba] to-[#0284c7] text-white shadow-md shadow-blue-500/20'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-3">
                <MailCheck className="w-4 h-4" />
                <span>Email Transactions</span>
              </div>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                activeTab === 'emails' ? 'bg-white/20 text-white' : 'bg-emerald-50 text-emerald-700'
              }`}>
                {inboundEmails.length}
              </span>
            </button>

            <button
              onClick={() => handleTabChange('deals')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'deals'
                  ? 'bg-gradient-to-r from-[#0070ba] to-[#0284c7] text-white shadow-md shadow-blue-500/20'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-3">
                <TrendingUp className="w-4 h-4" />
                <span>Deals Pipeline</span>
              </div>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                activeTab === 'deals' ? 'bg-white/20 text-white' : 'bg-purple-50 text-purple-700'
              }`}>
                {deals.length}
              </span>
            </button>

            <div className="px-3 pt-3 pb-1.5 text-[10px] uppercase font-bold text-slate-400 tracking-wider">
              Finance & Commercials
            </div>

            <button
              onClick={() => handleTabChange('quotations')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'quotations'
                  ? 'bg-gradient-to-r from-[#0070ba] to-[#0284c7] text-white shadow-md shadow-blue-500/20'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-3">
                <FileText className="w-4 h-4" />
                <span>GST Quotations</span>
              </div>
              <span className="text-[10px] text-[#0070ba] font-mono font-bold">{quotations.length}</span>
            </button>

            <button
              onClick={() => handleTabChange('invoices')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'invoices'
                  ? 'bg-gradient-to-r from-[#0070ba] to-[#0284c7] text-white shadow-md shadow-blue-500/20'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-3">
                <Receipt className="w-4 h-4" />
                <span>Tax Invoices</span>
              </div>
              <span className="text-[10px] text-emerald-700 font-mono font-bold">{invoices.length}</span>
            </button>

            <div className="px-3 pt-3 pb-1.5 text-[10px] uppercase font-bold text-slate-400 tracking-wider">
              Delivery & Agile Sprints
            </div>

            <button
              onClick={() => handleTabChange('projects')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'projects'
                  ? 'bg-gradient-to-r from-[#0070ba] to-[#0284c7] text-white shadow-md shadow-blue-500/20'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-3">
                <Briefcase className="w-4 h-4" />
                <span>Active Projects</span>
              </div>
              <span className="text-[10px] text-indigo-700 font-mono font-bold">{projects.length}</span>
            </button>

            <button
              onClick={() => handleTabChange('tasks')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'tasks'
                  ? 'bg-gradient-to-r from-[#0070ba] to-[#0284c7] text-white shadow-md shadow-blue-500/20'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-3">
                <CheckSquare className="w-4 h-4" />
                <span>Tasks & Timesheets</span>
              </div>
              <span className="text-[10px] text-purple-700 font-mono font-bold">{tasks.length}</span>
            </button>

            <div className="px-3 pt-3 pb-1.5 text-[10px] uppercase font-bold text-slate-400 tracking-wider">
              Channels & Settings
            </div>

            <button
              onClick={() => handleTabChange('whatsapp')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'whatsapp'
                  ? 'bg-gradient-to-r from-[#0070ba] to-[#0284c7] text-white shadow-md shadow-blue-500/20'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp Inbox</span>
            </button>

            <button
              onClick={() => handleTabChange('campaigns')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'campaigns'
                  ? 'bg-gradient-to-r from-[#0070ba] to-[#0284c7] text-white shadow-md shadow-blue-500/20'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              <span>Ad Campaigns ROI</span>
            </button>

            <button
              onClick={() => handleTabChange('audit')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'audit'
                  ? 'bg-gradient-to-r from-[#0070ba] to-[#0284c7] text-white shadow-md shadow-blue-500/20'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Audit Trail</span>
            </button>

            <button
              onClick={() => handleTabChange('settings')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'settings'
                  ? 'bg-gradient-to-r from-[#0070ba] to-[#0284c7] text-white shadow-md shadow-blue-500/20'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Settings className="w-4 h-4" />
              <span>System Settings</span>
            </button>
          </div>

          {/* Real-time Status Card */}
          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm text-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-700">Dynamic Sync</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            </div>
            <div className="text-[11px] text-slate-500">
              Live updates every 5s. Direct SQLite link.
            </div>
            <div className="text-[10px] text-slate-400 font-mono">
              Last Synced: {lastSyncTime.toLocaleTimeString()}
            </div>
          </div>
        </aside>

        {/* MAIN CANVAS */}
        <main className="flex-1 min-w-0 space-y-6">

          {/* -------------------------------------------------------------
              PAGE 1: EXECUTIVE DASHBOARD (WHITE & BLUE)
             ------------------------------------------------------------- */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              {/* Top 6 KPI Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between text-slate-500 mb-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider">Total Revenue</span>
                    <DollarSign className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div className="text-xl font-black text-slate-900 font-display">
                    ₹{Number(dashboardKpis.totalRevenue).toLocaleString('en-IN')}
                  </div>
                  <div className="text-[10px] text-emerald-600 font-semibold mt-1">Realized GST Collections</div>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between text-slate-500 mb-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider">Pipeline Value</span>
                    <TrendingUp className="w-4 h-4 text-[#0070ba]" />
                  </div>
                  <div className="text-xl font-black text-[#0070ba] font-display">
                    ₹{Number(dashboardKpis.pipelineValue).toLocaleString('en-IN')}
                  </div>
                  <div className="text-[10px] text-slate-500 font-semibold mt-1">Active Deals in Funnel</div>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between text-slate-500 mb-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider">Inbound Leads</span>
                    <Inbox className="w-4 h-4 text-indigo-600" />
                  </div>
                  <div className="text-xl font-black text-slate-900 font-display">{dashboardKpis.activeLeads}</div>
                  <div className="text-[10px] text-indigo-600 font-semibold mt-1">Automated SLA Routing</div>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between text-slate-500 mb-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider">Win Rate</span>
                    <Award className="w-4 h-4 text-amber-500" />
                  </div>
                  <div className="text-xl font-black text-amber-600 font-display">{dashboardKpis.winRate}</div>
                  <div className="text-[10px] text-slate-500 font-semibold mt-1">Closed Deals Ratio</div>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between text-slate-500 mb-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider">Active Projects</span>
                    <Briefcase className="w-4 h-4 text-cyan-600" />
                  </div>
                  <div className="text-xl font-black text-slate-900 font-display">{dashboardKpis.activeProjects}</div>
                  <div className="text-[10px] text-cyan-600 font-semibold mt-1">Under Agile Execution</div>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between text-slate-500 mb-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider">Pending Dues</span>
                    <Clock className="w-4 h-4 text-rose-500" />
                  </div>
                  <div className="text-xl font-black text-rose-600 font-display">
                    ₹{Number(dashboardKpis.pendingInvoicesAmount).toLocaleString('en-IN')}
                  </div>
                  <div className="text-[10px] text-rose-500 font-semibold mt-1">Unpaid Invoice Balance</div>
                </div>
              </div>

              {/* Pipeline Funnel & Live Activity Feed */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Visual Pipeline Funnel */}
                <div className="lg:col-span-2 p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-sm font-black text-slate-900">Revenue Pipeline Stage Distribution</h3>
                      <p className="text-xs text-slate-500">Live opportunity stages flowing through the deal lifecycle</p>
                    </div>
                    <button 
                      onClick={() => handleTabChange('deals')}
                      className="text-xs text-[#0070ba] font-bold hover:underline flex items-center gap-1"
                    >
                      <span>View Deals Board</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="space-y-3 pt-2">
                    {['Lead Qualified', 'Proposal Sent', 'Negotiation', 'Won'].map((stage, idx) => {
                      const stageDeals = deals.filter(d => (d.stage === stage) || (stage === 'Won' && d.status === 'Won'));
                      const stageVal = stageDeals.reduce((sum, d) => sum + Number(d.value || d.amount || 0), 0);
                      const pct = dashboardKpis.pipelineValue > 0 ? Math.min(100, Math.round((stageVal / dashboardKpis.pipelineValue) * 100)) : 0;
                      const colors = ['bg-blue-500', 'bg-indigo-500', 'bg-purple-500', 'bg-emerald-500'];

                      return (
                        <div key={stage} className="space-y-1.5">
                          <div className="flex justify-between text-xs font-semibold">
                            <span className="text-slate-700">{stage} ({stageDeals.length})</span>
                            <span className="font-mono text-slate-900 font-bold">₹{stageVal.toLocaleString('en-IN')}</span>
                          </div>
                          <div className="h-2.5 w-full rounded-full bg-slate-100 overflow-hidden">
                            <div className={`h-full rounded-full ${colors[idx % colors.length]} transition-all duration-500`} style={{ width: `${Math.max(8, pct)}%` }} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Live Activity Stream */}
                <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-sm font-black text-slate-900">Recent System Activities</h3>
                    <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-full">Real-time</span>
                  </div>

                  <div className="space-y-3 max-h-[300px] overflow-y-auto">
                    {activities.length === 0 ? (
                      <div className="text-center py-8 text-xs text-slate-400">
                        No activities logged yet. New lead submissions and actions will appear here.
                      </div>
                    ) : (
                      activities.slice(0, 8).map(a => (
                        <div key={a.id} className="p-3 rounded-2xl bg-slate-50 border border-slate-100 text-xs space-y-1">
                          <div className="flex justify-between items-start">
                            <span className="font-bold text-slate-900">{a.subject}</span>
                            <span className="text-[10px] text-[#0070ba] font-semibold">{a.type}</span>
                          </div>
                          <p className="text-[11px] text-slate-500 leading-snug">{a.notes || 'Activity completed successfully.'}</p>
                          <div className="text-[9px] text-slate-400 font-mono">{a.created_at || 'Recently'}</div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* -------------------------------------------------------------
              PAGE 2: INBOUND LEADS CRM
             ------------------------------------------------------------- */}
          {activeTab === 'leads' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-5 rounded-3xl border border-slate-200 shadow-sm">
                <div>
                  <div className="text-sm font-black text-slate-900">Inbound Leads & Opportunities</div>
                  <div className="text-[11px] text-slate-500">
                    Real-time captures from website forms, touchpoints, and consultation bookings.
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => downloadCsv('NeuOrzin_Inbound_Leads.csv', filteredLeads, [
                      { key: 'id', header: 'Lead ID' },
                      { key: 'name', header: 'Name' },
                      { key: 'email', header: 'Email' },
                      { key: 'phone', header: 'Phone' },
                      { key: 'company', header: 'Company' },
                      { key: 'service', header: 'Service' },
                      { key: 'status', header: 'Status' },
                      { key: 'score', header: 'AI Score' },
                      { key: 'created_at', header: 'Date' }
                    ])}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5 text-slate-500" />
                    <span>Export CSV</span>
                  </button>

                  <button
                    onClick={() => setShowAddLeadModal(true)}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#0070ba] hover:bg-[#005a96] text-white text-xs font-bold shadow-md shadow-blue-500/20"
                  >
                    <PlusCircle className="w-3.5 h-3.5" />
                    <span>Create Lead</span>
                  </button>
                </div>
              </div>

              {/* Quick Status Filter Toolbar */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {['All', 'New', 'Contacted', 'Qualified', 'Proposal', 'Won', 'Lost'].map(st => (
                  <button
                    key={st}
                    onClick={() => setStatusFilter(st)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      statusFilter === st
                        ? 'bg-[#0070ba] text-white shadow-sm'
                        : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>

              {/* Leads Table */}
              <div className="rounded-2xl bg-white border border-slate-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider text-[10px]">
                      <tr>
                        <th className="py-3.5 px-4">Lead ID & Client</th>
                        <th className="py-3.5 px-4">Service & Requirement</th>
                        <th className="py-3.5 px-4">AI Score</th>
                        <th className="py-3.5 px-4">SLA / Status</th>
                        <th className="py-3.5 px-4">Timeline</th>
                        <th className="py-3.5 px-4 text-right">Quick Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredLeads.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="py-12 text-center text-slate-400">
                            <Inbox className="w-8 h-8 mx-auto mb-2 text-slate-300" />
                            <div>No inbound leads found matching criteria.</div>
                            <div className="text-[10px] text-slate-400 mt-1">New contact submissions on the website appear here in real-time.</div>
                          </td>
                        </tr>
                      ) : (
                        filteredLeads.map(lead => (
                          <tr key={lead.id} className="hover:bg-slate-50/80 transition-colors">
                            <td className="py-3.5 px-4">
                              <div className="font-bold text-slate-900">{lead.name}</div>
                              <div className="text-[11px] text-[#0070ba] font-mono">{lead.email}</div>
                              <div className="text-[10px] text-slate-500">{lead.company || 'Direct Client'} • {lead.phone || ''}</div>
                            </td>
                            <td className="py-3.5 px-4">
                              <span className="font-semibold text-slate-800">{lead.service}</span>
                              <div className="text-[11px] text-slate-500 line-clamp-1">{lead.requirement_need || 'Consultation request'}</div>
                            </td>
                            <td className="py-3.5 px-4">
                              <span className="px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700 font-mono font-bold text-xs border border-indigo-100">
                                {lead.score || 50}/100
                              </span>
                            </td>
                            <td className="py-3.5 px-4">
                              <select
                                value={lead.status || 'New'}
                                onChange={(e) => handleUpdateLeadStatus(lead.id, e.target.value)}
                                className="px-2.5 py-1 rounded-lg text-xs font-bold border border-slate-200 bg-white text-slate-800 focus:outline-none focus:border-[#0070ba]"
                              >
                                <option value="New">New</option>
                                <option value="Contacted">Contacted</option>
                                <option value="Qualified">Qualified</option>
                                <option value="Proposal">Proposal</option>
                                <option value="Won">Won</option>
                                <option value="Lost">Lost</option>
                              </select>
                            </td>
                            <td className="py-3.5 px-4 text-slate-600 font-mono text-[11px]">
                              {lead.created_at || 'Today'}
                            </td>
                            <td className="py-3.5 px-4 text-right">
                              <div className="flex items-center justify-end gap-2">
                                <button
                                  onClick={() => handleConvertLeadToDeal(lead)}
                                  title="Convert to Deal"
                                  className="px-2.5 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold text-[11px] border border-emerald-200 transition-colors"
                                >
                                  Convert to Deal
                                </button>
                                <button
                                  onClick={() => setSelectedLead(lead)}
                                  className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600"
                                >
                                  <Eye className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* -------------------------------------------------------------
              PAGE 3: EMAIL TRANSACTIONS & INBOUND MAILBOX
             ------------------------------------------------------------- */}
          {activeTab === 'emails' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-5 rounded-3xl border border-slate-200 shadow-sm">
                <div>
                  <div className="text-sm font-black text-slate-900">Inbound Email Communications & Transactions</div>
                  <div className="text-[11px] text-slate-500">
                    Real-time transaction logs routed directly to <strong className="text-[#0070ba]">{EMAIL_CONFIG.enquiries}</strong>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <a
                    href={createMailtoLink(EMAIL_CONFIG.enquiries, 'Corporate Inbound Enquiry', 'Hello NeuOrzin Team,\n\nI would like to enquire regarding...')}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#0070ba] hover:bg-[#005a96] text-white text-xs font-bold shadow-md shadow-blue-500/20"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Compose Email</span>
                  </a>
                </div>
              </div>

              {/* Email Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Total Inbound Emails</span>
                  <div className="text-xl font-black text-slate-900 font-display mt-1">{inboundEmails.length}</div>
                </div>
                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Delivery Rate</span>
                  <div className="text-xl font-black text-emerald-600 font-display mt-1">100%</div>
                </div>
                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Active Mailbox</span>
                  <div className="text-xs font-bold text-[#0070ba] font-mono mt-2 truncate">{EMAIL_CONFIG.enquiries}</div>
                </div>
                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">SLA Follow-up Rule</span>
                  <div className="text-xs font-bold text-indigo-700 font-mono mt-2">Within 2 Hours</div>
                </div>
              </div>

              {/* Email Transactions Table */}
              <div className="rounded-2xl bg-white border border-slate-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider text-[10px]">
                      <tr>
                        <th className="py-3.5 px-4">Transaction ID & Sender</th>
                        <th className="py-3.5 px-4">Subject & Excerpt</th>
                        <th className="py-3.5 px-4">Destination Mailbox</th>
                        <th className="py-3.5 px-4">Status</th>
                        <th className="py-3.5 px-4">Received Time</th>
                        <th className="py-3.5 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {inboundEmails.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="py-12 text-center text-slate-400">
                            <Mail className="w-8 h-8 mx-auto mb-2 text-slate-300" />
                            <div>No email transactions logged yet.</div>
                          </td>
                        </tr>
                      ) : (
                        inboundEmails.map(eml => (
                          <tr key={eml.id} className="hover:bg-slate-50/80 transition-colors">
                            <td className="py-3.5 px-4">
                              <div className="font-bold text-slate-900">{eml.sender_name}</div>
                              <div className="text-[11px] text-[#0070ba] font-mono">{eml.sender_email}</div>
                              <div className="text-[10px] text-slate-500">{eml.company}</div>
                            </td>
                            <td className="py-3.5 px-4">
                              <span className="font-semibold text-slate-800">{eml.subject}</span>
                              <div className="text-[11px] text-slate-500 line-clamp-1">{eml.body}</div>
                            </td>
                            <td className="py-3.5 px-4 font-mono text-[11px] text-slate-600">
                              {eml.recipient}
                            </td>
                            <td className="py-3.5 px-4">
                              <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold text-[10px] border border-emerald-200">
                                {eml.status}
                              </span>
                            </td>
                            <td className="py-3.5 px-4 text-slate-600 font-mono text-[11px]">
                              {eml.timestamp}
                            </td>
                            <td className="py-3.5 px-4 text-right">
                              <div className="flex items-center justify-end gap-2">
                                <button
                                  onClick={() => setSelectedEmail(eml)}
                                  className="px-2.5 py-1 rounded-lg bg-blue-50 hover:bg-blue-100 text-[#0070ba] font-bold text-[11px] border border-blue-200"
                                >
                                  Read Message
                                </button>
                                <a
                                  href={createMailtoLink(eml.sender_email, `Re: ${eml.subject}`, `Hello ${eml.sender_name},\n\nThank you for connecting with NeuOrzin.`)}
                                  className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600"
                                  title="Quick Reply"
                                >
                                  <Reply className="w-3.5 h-3.5" />
                                </a>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* -------------------------------------------------------------
              PAGE 4: DEALS PIPELINE (KANBAN BOARD)
             ------------------------------------------------------------- */}
          {activeTab === 'deals' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-5 rounded-3xl border border-slate-200 shadow-sm">
                <div>
                  <div className="text-sm font-black text-slate-900">Deals & Revenue Pipeline Kanban</div>
                  <div className="text-[11px] text-slate-500">
                    Stage-by-stage revenue tracking with automatic project trigger upon closing.
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => downloadCsv('NeuOrzin_Deals_Pipeline.csv', deals, [
                      { key: 'id', header: 'Deal ID' },
                      { key: 'title', header: 'Deal Title' },
                      { key: 'stage', header: 'Stage' },
                      { key: 'value', header: 'Value (INR)' },
                      { key: 'probability', header: 'Probability (%)' },
                      { key: 'status', header: 'Status' }
                    ])}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5 text-slate-500" />
                    <span>Export CSV</span>
                  </button>

                  <button
                    onClick={() => setShowAddDealModal(true)}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#0070ba] hover:bg-[#005a96] text-white text-xs font-bold shadow-md shadow-blue-500/20"
                  >
                    <PlusCircle className="w-3.5 h-3.5" />
                    <span>Create Deal</span>
                  </button>
                </div>
              </div>

              {/* Kanban Multi-Stage Columns */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {['Lead Qualified', 'Proposal Sent', 'Negotiation', 'Won'].map((stage) => {
                  const stageDeals = deals.filter(d => (d.stage === stage) || (stage === 'Won' && d.status === 'Won'));
                  const stageTotal = stageDeals.reduce((sum, d) => sum + Number(d.value || d.amount || 0), 0);

                  return (
                    <div key={stage} className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm flex flex-col min-h-[480px]">
                      <div className="flex justify-between items-center mb-3 pb-2 border-b border-slate-100">
                        <div>
                          <span className="text-xs font-black text-slate-800">{stage}</span>
                          <div className="text-[10px] text-[#0070ba] font-mono font-bold">
                            ₹{stageTotal.toLocaleString('en-IN')}
                          </div>
                        </div>
                        <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-bold text-[10px]">
                          {stageDeals.length}
                        </span>
                      </div>

                      <div className="flex-1 space-y-3 overflow-y-auto">
                        {stageDeals.length === 0 ? (
                          <div className="h-32 border-2 border-dashed border-slate-200 rounded-xl flex items-center justify-center text-[11px] text-slate-400">
                            No deals in this stage
                          </div>
                        ) : (
                          stageDeals.map(d => (
                            <div key={d.id} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-[#0070ba] hover:bg-white transition-all shadow-xs space-y-2">
                              <div className="font-bold text-xs text-slate-900">{d.title}</div>
                              <div className="flex justify-between items-center text-xs">
                                <span className="text-[10px] text-slate-500">{d.customer_name || 'Enterprise'}</span>
                                <span className="font-mono font-bold text-emerald-600">₹{Number(d.value || 0).toLocaleString('en-IN')}</span>
                              </div>
                              <div className="flex justify-between items-center pt-2 border-t border-slate-100 text-[10px]">
                                <span className="text-slate-400">Prob: {d.probability || 50}%</span>
                                {stage !== 'Won' && (
                                  <button
                                    onClick={() => handleAdvanceDealStage(d.id, d.stage || stage)}
                                    className="px-2 py-0.5 rounded bg-blue-50 text-[#0070ba] font-bold hover:bg-blue-100 cursor-pointer"
                                  >
                                    Advance →
                                  </button>
                                )}
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* -------------------------------------------------------------
              PAGE 5: GST QUOTATIONS
             ------------------------------------------------------------- */}
          {activeTab === 'quotations' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-5 rounded-3xl border border-slate-200 shadow-sm">
                <div>
                  <div className="text-sm font-black text-slate-900">GST Quotations & Commercial Estimates</div>
                  <div className="text-[11px] text-slate-500">
                    Compliant quotation generator with itemized line deliverables and 18% GST calculation.
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => downloadCsv('NeuOrzin_Quotations.csv', quotations, [
                      { key: 'quote_number', header: 'Quotation #' },
                      { key: 'customer_name', header: 'Customer' },
                      { key: 'subtotal', header: 'Subtotal (INR)' },
                      { key: 'gst_amount', header: 'GST 18% (INR)' },
                      { key: 'total_amount', header: 'Total (INR)' },
                      { key: 'status', header: 'Status' }
                    ])}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5 text-slate-500" />
                    <span>Export CSV</span>
                  </button>

                  <button
                    onClick={() => setShowAddQuoteModal(true)}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#0070ba] hover:bg-[#005a96] text-white text-xs font-bold shadow-md shadow-blue-500/20 cursor-pointer"
                  >
                    <PlusCircle className="w-3.5 h-3.5" />
                    <span>Create Quotation</span>
                  </button>
                </div>
              </div>

              {/* Quotations Table */}
              <div className="rounded-2xl bg-white border border-slate-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider text-[10px]">
                      <tr>
                        <th className="py-3.5 px-4">Quote # & Client</th>
                        <th className="py-3.5 px-4">Subtotal</th>
                        <th className="py-3.5 px-4">GST (18%)</th>
                        <th className="py-3.5 px-4">Total Amount</th>
                        <th className="py-3.5 px-4">Status</th>
                        <th className="py-3.5 px-4 text-right">PDF & Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {quotations.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="py-12 text-center text-slate-400">
                            <FileText className="w-8 h-8 mx-auto mb-2 text-slate-300" />
                            <div>No quotations drafted yet.</div>
                          </td>
                        </tr>
                      ) : (
                        quotations.map(q => (
                          <tr key={q.id} className="hover:bg-slate-50/80 transition-colors">
                            <td className="py-3.5 px-4">
                              <div className="font-bold text-slate-900">{q.quote_number || q.quotation_number || `QTN-${q.id}`}</div>
                              <div className="text-[11px] text-slate-500">{q.customer_name || 'Enterprise Client'}</div>
                            </td>
                            <td className="py-3.5 px-4 font-mono">₹{Number(q.subtotal || 0).toLocaleString('en-IN')}</td>
                            <td className="py-3.5 px-4 font-mono text-slate-600">₹{Number(q.gst_amount || 0).toLocaleString('en-IN')}</td>
                            <td className="py-3.5 px-4 font-mono font-bold text-slate-900">₹{Number(q.total_amount || 0).toLocaleString('en-IN')}</td>
                            <td className="py-3.5 px-4">
                              <span className="px-2 py-0.5 rounded-full bg-blue-50 text-[#0070ba] font-bold text-[10px]">
                                {q.status || 'Draft'}
                              </span>
                            </td>
                            <td className="py-3.5 px-4 text-right">
                              <a
                                href={crmApi.getQuotationPdfUrl(q.id)}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold cursor-pointer"
                              >
                                <Download className="w-3.5 h-3.5 text-slate-600" />
                                <span>Download PDF</span>
                              </a>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* -------------------------------------------------------------
              PAGE 6: TAX INVOICES & PAYMENTS
             ------------------------------------------------------------- */}
          {activeTab === 'invoices' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-5 rounded-3xl border border-slate-200 shadow-sm">
                <div>
                  <div className="text-sm font-black text-slate-900">GST Tax Invoices & Payment Ledger</div>
                  <div className="text-[11px] text-slate-500">
                    Standardized invoices (INV-2026-XXXX) with SAC 998313 code and payment reconciliation.
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => downloadCsv('NeuOrzin_Tax_Invoices.csv', invoices, [
                      { key: 'invoice_number', header: 'Invoice #' },
                      { key: 'customer_name', header: 'Customer' },
                      { key: 'total_amount', header: 'Total (INR)' },
                      { key: 'paid_amount', header: 'Paid (INR)' },
                      { key: 'status', header: 'Status' },
                      { key: 'due_date', header: 'Due Date' }
                    ])}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5 text-slate-500" />
                    <span>Export CSV</span>
                  </button>

                  <button
                    onClick={() => setShowAddInvoiceModal(true)}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#0070ba] hover:bg-[#005a96] text-white text-xs font-bold shadow-md shadow-blue-500/20 cursor-pointer"
                  >
                    <PlusCircle className="w-3.5 h-3.5" />
                    <span>Create Invoice</span>
                  </button>
                </div>
              </div>

              {/* Invoices Table */}
              <div className="rounded-2xl bg-white border border-slate-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider text-[10px]">
                      <tr>
                        <th className="py-3.5 px-4">Invoice # & Client</th>
                        <th className="py-3.5 px-4">Total Amount</th>
                        <th className="py-3.5 px-4">Paid Amount</th>
                        <th className="py-3.5 px-4">Balance Due</th>
                        <th className="py-3.5 px-4">Status</th>
                        <th className="py-3.5 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {invoices.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="py-12 text-center text-slate-400">
                            <Receipt className="w-8 h-8 mx-auto mb-2 text-slate-300" />
                            <div>No invoices generated yet.</div>
                          </td>
                        </tr>
                      ) : (
                        invoices.map(inv => {
                          const balance = Number(inv.total_amount) - Number(inv.paid_amount || 0);
                          return (
                            <tr key={inv.id} className="hover:bg-slate-50/80 transition-colors">
                              <td className="py-3.5 px-4">
                                <div className="font-bold text-slate-900">{inv.invoice_number}</div>
                                <div className="text-[11px] text-slate-500">{inv.customer_name || 'Client'} • Due: {inv.due_date || 'Net 15'}</div>
                              </td>
                              <td className="py-3.5 px-4 font-mono font-bold text-slate-900">₹{Number(inv.total_amount).toLocaleString('en-IN')}</td>
                              <td className="py-3.5 px-4 font-mono text-emerald-600 font-bold">₹{Number(inv.paid_amount || 0).toLocaleString('en-IN')}</td>
                              <td className="py-3.5 px-4 font-mono text-rose-600 font-bold">₹{Math.max(0, balance).toLocaleString('en-IN')}</td>
                              <td className="py-3.5 px-4">
                                <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                                  inv.status === 'Paid' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                                }`}>
                                  {inv.status}
                                </span>
                              </td>
                              <td className="py-3.5 px-4 text-right">
                                <div className="flex items-center justify-end gap-2">
                                  <a
                                    href={crmApi.getInvoicePdfUrl(inv.id)}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600"
                                    title="Download PDF"
                                  >
                                    <Download className="w-3.5 h-3.5" />
                                  </a>
                                  {balance > 0 && (
                                    <button
                                      onClick={() => { setShowRecordPaymentModal(inv); setPaymentForm({ ...paymentForm, amount: String(balance) }); }}
                                      className="px-2.5 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold text-[11px] border border-emerald-200 cursor-pointer"
                                    >
                                      Record Payment
                                    </button>
                                  )}
                                </div>
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* -------------------------------------------------------------
              PAGE 7: AGILE PROJECTS & DELIVERY
             ------------------------------------------------------------- */}
          {activeTab === 'projects' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-5 rounded-3xl border border-slate-200 shadow-sm">
                <div>
                  <div className="text-sm font-black text-slate-900">Agile Project Delivery & Milestones</div>
                  <div className="text-[11px] text-slate-500">
                    Sprint milestone tracking with RAG health status flags (Good / At Risk / Delayed).
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => downloadCsv('NeuOrzin_Projects.csv', projects, [
                      { key: 'project_code', header: 'Project Code' },
                      { key: 'name', header: 'Project Name' },
                      { key: 'department', header: 'Department' },
                      { key: 'budget', header: 'Budget (INR)' },
                      { key: 'status', header: 'Status' },
                      { key: 'health', header: 'Health' }
                    ])}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5 text-slate-500" />
                    <span>Export CSV</span>
                  </button>

                  <button
                    onClick={() => setShowAddProjectModal(true)}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#0070ba] hover:bg-[#005a96] text-white text-xs font-bold shadow-md shadow-blue-500/20 cursor-pointer"
                  >
                    <PlusCircle className="w-3.5 h-3.5" />
                    <span>New Project</span>
                  </button>
                </div>
              </div>

              {/* Projects Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.length === 0 ? (
                  <div className="col-span-3 py-12 text-center text-slate-400 bg-white rounded-3xl border border-slate-200">
                    <Briefcase className="w-8 h-8 mx-auto mb-2 text-slate-300" />
                    <div>No active projects initialized.</div>
                  </div>
                ) : (
                  projects.map(p => (
                    <div key={p.id} className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="text-[10px] font-mono font-bold text-[#0070ba]">{p.project_code || `PRJ-${p.id}`}</span>
                          <h4 className="text-base font-black text-slate-900 mt-0.5">{p.name}</h4>
                        </div>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          p.health === 'Good' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                        }`}>
                          ● {p.health || 'Good'}
                        </span>
                      </div>

                      <p className="text-xs text-slate-500 line-clamp-2">{p.description || 'Sprint architecture and deliverables.'}</p>

                      <div className="pt-3 border-t border-slate-100 flex justify-between items-center text-xs">
                        <span className="text-slate-500">Budget: <strong className="text-slate-900 font-mono">₹{Number(p.budget || 0).toLocaleString('en-IN')}</strong></span>
                        <span className="px-2 py-0.5 rounded-lg bg-blue-50 text-[#0070ba] font-bold text-[11px]">{p.status || 'Active'}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* -------------------------------------------------------------
              PAGE 8: TASKS & TIMESHEETS
             ------------------------------------------------------------- */}
          {activeTab === 'tasks' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-5 rounded-3xl border border-slate-200 shadow-sm">
                <div>
                  <div className="text-sm font-black text-slate-900">Sprint Backlog & Timesheet Tracking</div>
                  <div className="text-[11px] text-slate-500">
                    Engineering tasks with developer hour logging and priority management.
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => downloadCsv('NeuOrzin_Tasks.csv', tasks, [
                      { key: 'task_code', header: 'Task Code' },
                      { key: 'title', header: 'Task Title' },
                      { key: 'department', header: 'Department' },
                      { key: 'priority', header: 'Priority' },
                      { key: 'status', header: 'Status' },
                      { key: 'estimated_hours', header: 'Est. Hours' },
                      { key: 'logged_hours', header: 'Logged Hours' }
                    ])}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5 text-slate-500" />
                    <span>Export CSV</span>
                  </button>

                  <button
                    onClick={() => setShowAddTaskModal(true)}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#0070ba] hover:bg-[#005a96] text-white text-xs font-bold shadow-md shadow-blue-500/20 cursor-pointer"
                  >
                    <PlusCircle className="w-3.5 h-3.5" />
                    <span>New Task</span>
                  </button>
                </div>
              </div>

              {/* Tasks Table */}
              <div className="rounded-2xl bg-white border border-slate-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider text-[10px]">
                      <tr>
                        <th className="py-3.5 px-4">Task Code & Title</th>
                        <th className="py-3.5 px-4">Department</th>
                        <th className="py-3.5 px-4">Priority</th>
                        <th className="py-3.5 px-4">Status</th>
                        <th className="py-3.5 px-4">Hours (Logged / Est)</th>
                        <th className="py-3.5 px-4 text-right">Timesheet</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {tasks.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="py-12 text-center text-slate-400">
                            <CheckSquare className="w-8 h-8 mx-auto mb-2 text-slate-300" />
                            <div>No engineering tasks logged.</div>
                          </td>
                        </tr>
                      ) : (
                        tasks.map(t => (
                          <tr key={t.id} className="hover:bg-slate-50/80 transition-colors">
                            <td className="py-3.5 px-4">
                              <div className="font-bold text-slate-900">{t.title}</div>
                              <div className="text-[10px] text-slate-500 font-mono">{t.task_code || `TSK-${t.id}`}</div>
                            </td>
                            <td className="py-3.5 px-4 text-slate-700 font-semibold">{t.department || 'Engineering'}</td>
                            <td className="py-3.5 px-4">
                              <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                                t.priority === 'Critical' || t.priority === 'High' ? 'bg-rose-50 text-rose-700' : 'bg-blue-50 text-[#0070ba]'
                              }`}>
                                {t.priority || 'High'}
                              </span>
                            </td>
                            <td className="py-3.5 px-4">
                              <select
                                value={t.status || 'Todo'}
                                onChange={(e) => handleUpdateTaskStatus(t.id, e.target.value)}
                                className="px-2 py-1 rounded-lg text-xs font-bold border border-slate-200 bg-white"
                              >
                                <option value="Todo">Todo</option>
                                <option value="In Progress">In Progress</option>
                                <option value="In Review">In Review</option>
                                <option value="Completed">Completed</option>
                              </select>
                            </td>
                            <td className="py-3.5 px-4 font-mono">
                              <strong>{t.logged_hours || 0}h</strong> / {t.estimated_hours || 0}h
                            </td>
                            <td className="py-3.5 px-4 text-right">
                              <button
                                onClick={() => setShowLogTimeModal(t)}
                                className="px-2.5 py-1 rounded-lg bg-purple-50 hover:bg-purple-100 text-purple-700 font-bold text-[11px] border border-purple-200 cursor-pointer"
                              >
                                Log Hours
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* -------------------------------------------------------------
              PAGE 9: WHATSAPP SHARED INBOX
             ------------------------------------------------------------- */}
          {activeTab === 'whatsapp' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-5 rounded-3xl border border-slate-200 shadow-sm">
                <div>
                  <div className="text-sm font-black text-slate-900">WhatsApp Business Shared Gateway</div>
                  <div className="text-[11px] text-slate-500">
                    Two-way official messaging with automated message acknowledgment templates.
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setShowDispatchWhatsAppModal(true)}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#0070ba] hover:bg-[#005a96] text-white text-xs font-bold shadow-md shadow-blue-500/20 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Message</span>
                  </button>
                </div>
              </div>

              {/* Message Feed */}
              <div className="rounded-3xl bg-white border border-slate-200 p-6 shadow-sm space-y-4">
                <div className="space-y-3 max-h-[500px] overflow-y-auto">
                  {whatsappMessages.length === 0 ? (
                    <div className="py-12 text-center text-slate-400">
                      <MessageSquare className="w-8 h-8 mx-auto mb-2 text-slate-300" />
                      <div>No WhatsApp conversations active.</div>
                    </div>
                  ) : (
                    whatsappMessages.map(m => (
                      <div key={m.id} className={`p-4 rounded-2xl max-w-xl text-xs space-y-1 ${
                        m.direction === 'Outbound' ? 'ml-auto bg-blue-50/80 border border-blue-100' : 'mr-auto bg-slate-50 border border-slate-100'
                      }`}>
                        <div className="flex justify-between items-center text-[10px] text-slate-500">
                          <span className="font-bold">{m.from_phone} → {m.to_phone}</span>
                          <span>{m.timestamp || 'Today'}</span>
                        </div>
                        <p className="text-slate-800 text-xs leading-relaxed">{m.message}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}

          {/* -------------------------------------------------------------
              PAGE 10: MARKETING CAMPAIGNS & ROI ATTRIBUTION
             ------------------------------------------------------------- */}
          {activeTab === 'campaigns' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-5 rounded-3xl border border-slate-200 shadow-sm">
                <div>
                  <div className="text-sm font-black text-slate-900">Marketing ROI & UTM Lead Attribution</div>
                  <div className="text-[11px] text-slate-500">
                    Performance metrics across Google Ads, LinkedIn, Meta, and Organic Search channels.
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setShowAddCampaignModal(true)}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#0070ba] hover:bg-[#005a96] text-white text-xs font-bold shadow-md shadow-blue-500/20 cursor-pointer"
                  >
                    <PlusCircle className="w-3.5 h-3.5" />
                    <span>Add Campaign</span>
                  </button>
                </div>
              </div>

              {/* Campaigns Table */}
              <div className="rounded-2xl bg-white border border-slate-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider text-[10px]">
                      <tr>
                        <th className="py-3.5 px-4">Campaign & Platform</th>
                        <th className="py-3.5 px-4">UTM Source</th>
                        <th className="py-3.5 px-4">Budget</th>
                        <th className="py-3.5 px-4">Spend</th>
                        <th className="py-3.5 px-4">Leads Generated</th>
                        <th className="py-3.5 px-4">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {campaigns.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="py-12 text-center text-slate-400">
                            <BarChart3 className="w-8 h-8 mx-auto mb-2 text-slate-300" />
                            <div>No marketing campaigns created.</div>
                          </td>
                        </tr>
                      ) : (
                        campaigns.map(c => (
                          <tr key={c.id} className="hover:bg-slate-50/80 transition-colors">
                            <td className="py-3.5 px-4 font-bold text-slate-900">{c.name}</td>
                            <td className="py-3.5 px-4 font-mono text-[#0070ba]">{c.utm_source || 'google'}</td>
                            <td className="py-3.5 px-4 font-mono">₹{Number(c.budget || 0).toLocaleString('en-IN')}</td>
                            <td className="py-3.5 px-4 font-mono text-slate-600">₹{Number(c.spend || 0).toLocaleString('en-IN')}</td>
                            <td className="py-3.5 px-4 font-bold text-indigo-700">{c.leads_generated || 0}</td>
                            <td className="py-3.5 px-4">
                              <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold text-[10px]">
                                {c.status || 'Active'}
                              </span>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* -------------------------------------------------------------
              PAGE 11: TAMPER-EVIDENT AUDIT TRAIL
             ------------------------------------------------------------- */}
          {activeTab === 'audit' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-5 rounded-3xl border border-slate-200 shadow-sm">
                <div>
                  <div className="text-sm font-black text-slate-900">System Security & Operational Audit Logs</div>
                  <div className="text-[11px] text-slate-500">
                    Immutable activity ledger recording every entity mutation, user login, and financial transaction.
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => downloadCsv('NeuOrzin_Audit_Trail.csv', auditLogs, [
                      { key: 'id', header: 'Audit ID' },
                      { key: 'action', header: 'Action' },
                      { key: 'entity_type', header: 'Entity Type' },
                      { key: 'entity_id', header: 'Entity ID' },
                      { key: 'user_name', header: 'Performed By' },
                      { key: 'timestamp', header: 'Timestamp' }
                    ])}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5 text-slate-500" />
                    <span>Export CSV</span>
                  </button>
                </div>
              </div>

              {/* Audit Logs Table */}
              <div className="rounded-2xl bg-white border border-slate-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider text-[10px]">
                      <tr>
                        <th className="py-3.5 px-4">Action & Entity</th>
                        <th className="py-3.5 px-4">Entity ID</th>
                        <th className="py-3.5 px-4">User / Performed By</th>
                        <th className="py-3.5 px-4">Timestamp</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {auditLogs.length === 0 ? (
                        <tr>
                          <td colSpan={4} className="py-12 text-center text-slate-400">
                            <ShieldCheck className="w-8 h-8 mx-auto mb-2 text-slate-300" />
                            <div>No audit records logged yet.</div>
                          </td>
                        </tr>
                      ) : (
                        auditLogs.map(log => (
                          <tr key={log.id} className="hover:bg-slate-50/80 transition-colors">
                            <td className="py-3.5 px-4">
                              <span className="font-bold text-slate-900">{log.action}</span>
                              <span className="ml-2 text-[10px] px-2 py-0.5 rounded bg-blue-50 text-[#0070ba] font-bold">{log.entity_type}</span>
                            </td>
                            <td className="py-3.5 px-4 font-mono text-[11px] text-slate-600">{log.entity_id}</td>
                            <td className="py-3.5 px-4 font-semibold text-slate-800">{log.user_name || 'System / Super Admin'}</td>
                            <td className="py-3.5 px-4 font-mono text-[11px] text-slate-500">{log.timestamp}</td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* -------------------------------------------------------------
              PAGE 12: DYNAMIC SYSTEM SETTINGS & CONFIGURATION
             ------------------------------------------------------------- */}
          {activeTab === 'settings' && (
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-6">
                <div>
                  <h3 className="text-base font-black text-slate-900">Enterprise System Configuration</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Manage organization parameters, GST compliance numbers, and automation rules.</p>
                </div>

                <form onSubmit={handleSaveSettings} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Legal Entity Name</label>
                      <input
                        type="text"
                        value={systemSettings.companyName}
                        onChange={(e) => setSystemSettings({ ...systemSettings, companyName: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:bg-white focus:border-[#0070ba] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">GSTIN Registration</label>
                      <input
                        type="text"
                        value={systemSettings.legalGstin}
                        onChange={(e) => setSystemSettings({ ...systemSettings, legalGstin: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 font-mono focus:bg-white focus:border-[#0070ba] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">SAC Service Code</label>
                      <input
                        type="text"
                        value={systemSettings.sacCode}
                        onChange={(e) => setSystemSettings({ ...systemSettings, sacCode: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 font-mono focus:bg-white focus:border-[#0070ba] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Primary Enquiries Mailbox</label>
                      <input
                        type="email"
                        value={systemSettings.enquiryEmail}
                        onChange={(e) => setSystemSettings({ ...systemSettings, enquiryEmail: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 font-mono focus:bg-white focus:border-[#0070ba] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">SLA Response Window (Hours)</label>
                      <input
                        type="number"
                        value={systemSettings.slaHours}
                        onChange={(e) => setSystemSettings({ ...systemSettings, slaHours: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 font-mono focus:bg-white focus:border-[#0070ba] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">Standard GST Rate (%)</label>
                      <input
                        type="number"
                        value={systemSettings.gstRate}
                        onChange={(e) => setSystemSettings({ ...systemSettings, gstRate: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 font-mono focus:bg-white focus:border-[#0070ba] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-200 flex justify-end">
                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-xl bg-[#0070ba] hover:bg-[#005a96] text-white text-xs font-bold shadow-md shadow-blue-500/20 cursor-pointer"
                    >
                      Save Configuration
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

        </main>
      </div>

      {/* =============================================================
          ALL COMPLETE INTERACTIVE MODALS & DRAWERS
         ============================================================= */}

      {/* 1. READ FULL EMAIL DRAWER */}
      {selectedEmail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="w-full max-w-lg bg-white border border-slate-200 rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] font-bold text-[#0070ba] uppercase tracking-wider">Inbound Email Message</span>
                <h3 className="text-base font-black text-slate-900">{selectedEmail.subject}</h3>
              </div>
              <button onClick={() => setSelectedEmail(null)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2 text-xs text-slate-600 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
              <div className="flex justify-between">
                <span>From:</span>
                <strong className="text-slate-900">{selectedEmail.sender_name} &lt;{selectedEmail.sender_email}&gt;</strong>
              </div>
              <div className="flex justify-between">
                <span>Company:</span>
                <span className="text-slate-800 font-semibold">{selectedEmail.company}</span>
              </div>
              <div className="flex justify-between">
                <span>Phone:</span>
                <span className="text-[#0070ba] font-mono font-bold">{selectedEmail.phone || 'Not provided'}</span>
              </div>
              <div className="flex justify-between">
                <span>Destination:</span>
                <span className="text-slate-800 font-mono font-semibold">{selectedEmail.recipient}</span>
              </div>
            </div>

            <div>
              <div className="text-xs font-bold text-slate-700 mb-1">Message Content:</div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 whitespace-pre-wrap leading-relaxed">
                {selectedEmail.body}
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setSelectedEmail(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 text-xs font-bold text-slate-700"
              >
                Close
              </button>
              <a
                href={createMailtoLink(selectedEmail.sender_email, `Re: ${selectedEmail.subject}`, `Hello ${selectedEmail.sender_name},\n\nThank you for reaching out to NeuOrzin.`)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0070ba] hover:bg-[#005a96] text-white text-xs font-bold shadow-md shadow-blue-500/20"
              >
                <Reply className="w-3.5 h-3.5" /> Quick Reply
              </a>
            </div>
          </div>
        </div>
      )}

      {/* 2. ADD LEAD MODAL */}
      {showAddLeadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="w-full max-w-lg bg-white border border-slate-200 rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="text-base font-black text-slate-900">Create Inbound Lead</h3>
              <button onClick={() => setShowAddLeadModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateLead} className="space-y-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Full Name *</label>
                <input
                  type="text" required placeholder="e.g. Dr. Ananya Reddy"
                  value={leadForm.name} onChange={(e) => setLeadForm({ ...leadForm, name: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:bg-white focus:border-[#0070ba] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Email *</label>
                  <input
                    type="email" required placeholder="name@company.com"
                    value={leadForm.email} onChange={(e) => setLeadForm({ ...leadForm, email: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:bg-white focus:border-[#0070ba] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Phone *</label>
                  <input
                    type="text" required placeholder="+91 98765 43210"
                    value={leadForm.phone} onChange={(e) => setLeadForm({ ...leadForm, phone: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 font-mono focus:bg-white focus:border-[#0070ba] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Company</label>
                <input
                  type="text" placeholder="Enterprise Client"
                  value={leadForm.company} onChange={(e) => setLeadForm({ ...leadForm, company: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:bg-white focus:border-[#0070ba] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Service Required</label>
                <select
                  value={leadForm.service} onChange={(e) => setLeadForm({ ...leadForm, service: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:bg-white focus:border-[#0070ba] focus:outline-none"
                >
                  <option value="Enterprise Software & AI">Enterprise Software & AI</option>
                  <option value="Retail Omnichannel AI & POS">Retail Omnichannel AI & POS</option>
                  <option value="Manufacturing IoT & Predictive Suite">Manufacturing IoT & Predictive Suite</option>
                  <option value="Real Estate CRM & 3D Tours">Real Estate CRM & 3D Tours</option>
                  <option value="EduTech Adaptive Learning Platform">EduTech Adaptive Learning Platform</option>
                  <option value="CPG Direct-to-Consumer Growth Engine">CPG Direct-to-Consumer Growth Engine</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Project Scope & Notes</label>
                <textarea
                  rows="3" placeholder="Describe requirements..."
                  value={leadForm.requirement_need} onChange={(e) => setLeadForm({ ...leadForm, requirement_need: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:bg-white focus:border-[#0070ba] focus:outline-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button" onClick={() => setShowAddLeadModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#0070ba] hover:bg-[#005a96] text-white text-xs font-bold shadow-md shadow-blue-500/20 cursor-pointer"
                >
                  Save Lead
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 3. ADD DEAL MODAL */}
      {showAddDealModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="w-full max-w-lg bg-white border border-slate-200 rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="text-base font-black text-slate-900">Create Pipeline Deal</h3>
              <button onClick={() => setShowAddDealModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateDeal} className="space-y-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Deal Title *</label>
                <input
                  type="text" required placeholder="e.g. Enterprise AI Implementation"
                  value={dealForm.title} onChange={(e) => setDealForm({ ...dealForm, title: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:bg-white focus:border-[#0070ba] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Deal Value (INR) *</label>
                  <input
                    type="number" required placeholder="500000"
                    value={dealForm.value} onChange={(e) => setDealForm({ ...dealForm, value: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 font-mono focus:bg-white focus:border-[#0070ba] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Stage</label>
                  <select
                    value={dealForm.stage} onChange={(e) => setDealForm({ ...dealForm, stage: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:bg-white focus:border-[#0070ba] focus:outline-none"
                  >
                    <option value="Lead Qualified">Lead Qualified</option>
                    <option value="Proposal Sent">Proposal Sent</option>
                    <option value="Negotiation">Negotiation</option>
                    <option value="Won">Won</option>
                  </select>
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button" onClick={() => setShowAddDealModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#0070ba] hover:bg-[#005a96] text-white text-xs font-bold shadow-md shadow-blue-500/20 cursor-pointer"
                >
                  Save Deal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 4. ADD GST QUOTATION MODAL */}
      {showAddQuoteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="w-full max-w-xl bg-white border border-slate-200 rounded-3xl p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] font-bold text-[#0070ba] uppercase tracking-wider">GST Quotation Builder</span>
                <h3 className="text-base font-black text-slate-900">Create Quotation</h3>
              </div>
              <button onClick={() => setShowAddQuoteModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateQuotation} className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Service / Project Title *</label>
                <input
                  type="text" required placeholder="e.g. Full-Stack AI Enterprise Platform"
                  value={quoteForm.service_title} onChange={(e) => setQuoteForm({ ...quoteForm, service_title: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:bg-white focus:border-[#0070ba] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Client / Customer Name *</label>
                {leads && leads.length > 0 ? (
                  <select
                    value={quoteForm.customer_id} onChange={(e) => setQuoteForm({ ...quoteForm, customer_id: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:bg-white focus:border-[#0070ba] focus:outline-none"
                  >
                    <option value="">Select a Lead / Customer</option>
                    {leads.map(l => (
                      <option key={l.id} value={l.id}>{l.name} - {l.company || 'Direct Client'}</option>
                    ))}
                  </select>
                ) : (
                  <input
                    type="text" required
                    placeholder="Enter Client or Company Name (e.g. Acme Technologies)"
                    value={quoteForm.client_name || ''}
                    onChange={(e) => setQuoteForm({ ...quoteForm, client_name: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:bg-white focus:border-[#0070ba] focus:outline-none"
                  />
                )}
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Scope of Work</label>
                <textarea
                  rows="2" placeholder="Engineering milestones..."
                  value={quoteForm.scope_of_work} onChange={(e) => setQuoteForm({ ...quoteForm, scope_of_work: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:bg-white focus:border-[#0070ba] focus:outline-none"
                />
              </div>

              {/* Line Items */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">Itemized Deliverables</label>
                  <button
                    type="button"
                    onClick={() => setQuoteForm({ ...quoteForm, items: [...quoteForm.items, { description: 'New Milestone Item', qty: 1, rate: 50000, amount: 50000 }] })}
                    className="text-[11px] text-[#0070ba] font-bold hover:underline"
                  >
                    + Add Item
                  </button>
                </div>

                {quoteForm.items.map((it, idx) => (
                  <div key={idx} className="flex gap-2 items-center bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                    <input
                      type="text" required placeholder="Description"
                      value={it.description}
                      onChange={(e) => {
                        const next = [...quoteForm.items];
                        next[idx].description = e.target.value;
                        setQuoteForm({ ...quoteForm, items: next });
                      }}
                      className="flex-1 bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs"
                    />
                    <input
                      type="number" required placeholder="Qty"
                      value={it.qty}
                      onChange={(e) => {
                        const next = [...quoteForm.items];
                        next[idx].qty = Number(e.target.value);
                        next[idx].amount = next[idx].qty * next[idx].rate;
                        setQuoteForm({ ...quoteForm, items: next });
                      }}
                      className="w-16 bg-white border border-slate-200 rounded-lg px-2 py-1.5 text-xs font-mono text-center"
                    />
                    <input
                      type="number" required placeholder="Rate"
                      value={it.rate}
                      onChange={(e) => {
                        const next = [...quoteForm.items];
                        next[idx].rate = Number(e.target.value);
                        next[idx].amount = next[idx].qty * next[idx].rate;
                        setQuoteForm({ ...quoteForm, items: next });
                      }}
                      className="w-24 bg-white border border-slate-200 rounded-lg px-2 py-1.5 text-xs font-mono text-right"
                    />
                    {quoteForm.items.length > 1 && (
                      <button
                        type="button"
                        onClick={() => setQuoteForm({ ...quoteForm, items: quoteForm.items.filter((_, i) => i !== idx) })}
                        className="text-slate-400 hover:text-rose-600 p-1"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {/* Total Calculation Preview */}
              <div className="p-3.5 rounded-xl bg-blue-50/60 border border-blue-100 text-xs space-y-1.5">
                {(() => {
                  const sub = quoteForm.items.reduce((sum, item) => sum + (Number(item.qty || 1) * Number(item.rate || 0)), 0);
                  const gst = sub * 0.18;
                  const tot = sub + gst;
                  return (
                    <>
                      <div className="flex justify-between text-slate-600">
                        <span>Subtotal:</span>
                        <span className="font-mono font-bold">₹{sub.toLocaleString('en-IN')}</span>
                      </div>
                      <div className="flex justify-between text-slate-600">
                        <span>GST @ 18%:</span>
                        <span className="font-mono font-bold">₹{gst.toLocaleString('en-IN')}</span>
                      </div>
                      <div className="flex justify-between text-slate-900 font-bold border-t border-blue-200 pt-1">
                        <span>Grand Total (INR):</span>
                        <span className="font-mono text-sm text-[#0070ba]">₹{tot.toLocaleString('en-IN')}</span>
                      </div>
                    </>
                  );
                })()}
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button" onClick={() => setShowAddQuoteModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#0070ba] hover:bg-[#005a96] text-white text-xs font-bold shadow-md shadow-blue-500/20 cursor-pointer"
                >
                  Issue Quotation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 5. ADD GST INVOICE MODAL */}
      {showAddInvoiceModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="w-full max-w-xl bg-white border border-slate-200 rounded-3xl p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider">GST Tax Invoice</span>
                <h3 className="text-base font-black text-slate-900">Generate Tax Invoice</h3>
              </div>
              <button onClick={() => setShowAddInvoiceModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateInvoice} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Client / Customer Name *</label>
                  {leads && leads.length > 0 ? (
                    <select
                      value={invoiceForm.customer_id} onChange={(e) => setInvoiceForm({ ...invoiceForm, customer_id: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:bg-white focus:border-[#0070ba] focus:outline-none"
                    >
                      <option value="">Select a Customer / Lead</option>
                      {leads.map(l => (
                        <option key={l.id} value={l.id}>{l.name} ({l.company || 'Client'})</option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type="text" required
                      placeholder="Enter Client or Company Name (e.g. TechCorp Solutions)"
                      value={invoiceForm.client_name || ''}
                      onChange={(e) => setInvoiceForm({ ...invoiceForm, client_name: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:bg-white focus:border-[#0070ba] focus:outline-none"
                    />
                  )}
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Payment Due Date</label>
                  <input
                    type="date"
                    value={invoiceForm.due_date} onChange={(e) => setInvoiceForm({ ...invoiceForm, due_date: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 font-mono focus:bg-white focus:border-[#0070ba] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Invoice Notes & Milestone</label>
                <input
                  type="text" placeholder="e.g. Milestone 1 Deliverable Delivery"
                  value={invoiceForm.notes} onChange={(e) => setInvoiceForm({ ...invoiceForm, notes: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:bg-white focus:border-[#0070ba] focus:outline-none"
                />
              </div>

              {/* Line Items */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">Line Items (SAC 998313)</label>
                  <button
                    type="button"
                    onClick={() => setInvoiceForm({ ...invoiceForm, items: [...invoiceForm.items, { description: 'Custom Software Development', sac: '998313', qty: 1, rate: 100000, amount: 100000 }] })}
                    className="text-[11px] text-[#0070ba] font-bold hover:underline"
                  >
                    + Add Item
                  </button>
                </div>

                {invoiceForm.items.map((it, idx) => (
                  <div key={idx} className="flex gap-2 items-center bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                    <input
                      type="text" required placeholder="Service Description"
                      value={it.description}
                      onChange={(e) => {
                        const next = [...invoiceForm.items];
                        next[idx].description = e.target.value;
                        setInvoiceForm({ ...invoiceForm, items: next });
                      }}
                      className="flex-1 bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs"
                    />
                    <input
                      type="text" placeholder="SAC"
                      value={it.sac || '998313'}
                      onChange={(e) => {
                        const next = [...invoiceForm.items];
                        next[idx].sac = e.target.value;
                        setInvoiceForm({ ...invoiceForm, items: next });
                      }}
                      className="w-20 bg-white border border-slate-200 rounded-lg px-2 py-1.5 text-xs font-mono text-center"
                    />
                    <input
                      type="number" required placeholder="Rate"
                      value={it.rate}
                      onChange={(e) => {
                        const next = [...invoiceForm.items];
                        next[idx].rate = Number(e.target.value);
                        next[idx].amount = Number(next[idx].qty || 1) * next[idx].rate;
                        setInvoiceForm({ ...invoiceForm, items: next });
                      }}
                      className="w-24 bg-white border border-slate-200 rounded-lg px-2 py-1.5 text-xs font-mono text-right"
                    />
                  </div>
                ))}
              </div>

              {/* Total Calculation Preview */}
              <div className="p-3.5 rounded-xl bg-emerald-50/60 border border-emerald-100 text-xs space-y-1.5">
                {(() => {
                  const sub = invoiceForm.items.reduce((sum, item) => sum + (Number(item.qty || 1) * Number(item.rate || 0)), 0);
                  const gst = sub * 0.18;
                  const tot = sub + gst;
                  return (
                    <>
                      <div className="flex justify-between text-slate-600">
                        <span>Taxable Subtotal:</span>
                        <span className="font-mono font-bold">₹{sub.toLocaleString('en-IN')}</span>
                      </div>
                      <div className="flex justify-between text-slate-600">
                        <span>IGST / CGST+SGST (18%):</span>
                        <span className="font-mono font-bold">₹{gst.toLocaleString('en-IN')}</span>
                      </div>
                      <div className="flex justify-between text-slate-900 font-bold border-t border-emerald-200 pt-1">
                        <span>Invoice Total:</span>
                        <span className="font-mono text-sm text-emerald-700">₹{tot.toLocaleString('en-IN')}</span>
                      </div>
                    </>
                  );
                })()}
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button" onClick={() => setShowAddInvoiceModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-500/20 cursor-pointer"
                >
                  Generate Invoice
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 6. RECORD PAYMENT MODAL */}
      {showRecordPaymentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white border border-slate-200 rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider">GST Payment Reconciliation</span>
                <h3 className="text-base font-black text-slate-900">{showRecordPaymentModal.invoice_number}</h3>
              </div>
              <button onClick={() => setShowRecordPaymentModal(null)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleRecordPayment} className="space-y-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Amount to Reconcile (INR) *</label>
                <input
                  type="number" required placeholder="200000"
                  value={paymentForm.amount} onChange={(e) => setPaymentForm({ ...paymentForm, amount: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 font-mono focus:bg-white focus:border-[#0070ba] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Payment Method</label>
                <select
                  value={paymentForm.payment_method} onChange={(e) => setPaymentForm({ ...paymentForm, payment_method: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:bg-white focus:border-[#0070ba] focus:outline-none"
                >
                  <option value="Bank Transfer">Bank Transfer (NEFT/RTGS/IMPS)</option>
                  <option value="UPI">UPI / QR Code</option>
                  <option value="Razorpay">Razorpay Gateway</option>
                  <option value="Stripe">Stripe International</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Bank Reference / UTR Number</label>
                <input
                  type="text" placeholder="UTR-9988221144"
                  value={paymentForm.transaction_ref} onChange={(e) => setPaymentForm({ ...paymentForm, transaction_ref: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 font-mono focus:bg-white focus:border-[#0070ba] focus:outline-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button" onClick={() => setShowRecordPaymentModal(null)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-500/20 cursor-pointer"
                >
                  Reconcile & Update Status
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 7. ADD PROJECT MODAL */}
      {showAddProjectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="w-full max-w-lg bg-white border border-slate-200 rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="text-base font-black text-slate-900">Initialize Agile Delivery Project</h3>
              <button onClick={() => setShowAddProjectModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateProject} className="space-y-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Project Name *</label>
                <input
                  type="text" required placeholder="e.g. RetailPro NextGen POS"
                  value={projectForm.name} onChange={(e) => setProjectForm({ ...projectForm, name: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:bg-white focus:border-[#0070ba] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Budget (INR) *</label>
                  <input
                    type="number" required placeholder="500000"
                    value={projectForm.budget} onChange={(e) => setProjectForm({ ...projectForm, budget: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 font-mono focus:bg-white focus:border-[#0070ba] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Department</label>
                  <select
                    value={projectForm.department} onChange={(e) => setProjectForm({ ...projectForm, department: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:bg-white focus:border-[#0070ba] focus:outline-none"
                  >
                    <option value="Development">Development</option>
                    <option value="Design">UI/UX Design</option>
                    <option value="AI & ML">AI & ML Research</option>
                    <option value="Support">Cloud & DevOps</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Description</label>
                <textarea
                  rows="2" placeholder="Agile architecture and deliverables..."
                  value={projectForm.description} onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:bg-white focus:border-[#0070ba] focus:outline-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button" onClick={() => setShowAddProjectModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#0070ba] hover:bg-[#005a96] text-white text-xs font-bold shadow-md shadow-blue-500/20 cursor-pointer"
                >
                  Initialize Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 8. ADD TASK MODAL */}
      {showAddTaskModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="w-full max-w-lg bg-white border border-slate-200 rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="text-base font-black text-slate-900">Create Sprint Task</h3>
              <button onClick={() => setShowAddTaskModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateTask} className="space-y-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Task Title *</label>
                <input
                  type="text" required placeholder="e.g. Implement WebSocket listener"
                  value={taskForm.title} onChange={(e) => setTaskForm({ ...taskForm, title: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:bg-white focus:border-[#0070ba] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Priority</label>
                  <select
                    value={taskForm.priority} onChange={(e) => setTaskForm({ ...taskForm, priority: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:bg-white focus:border-[#0070ba] focus:outline-none"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Critical">Critical</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Est. Hours</label>
                  <input
                    type="number" required placeholder="8"
                    value={taskForm.estimated_hours} onChange={(e) => setTaskForm({ ...taskForm, estimated_hours: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 font-mono focus:bg-white focus:border-[#0070ba] focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button" onClick={() => setShowAddTaskModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#0070ba] hover:bg-[#005a96] text-white text-xs font-bold shadow-md shadow-blue-500/20 cursor-pointer"
                >
                  Add to Backlog
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 9. LOG TIMESHEET MODAL */}
      {showLogTimeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white border border-slate-200 rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] font-bold text-purple-600 uppercase tracking-wider">Developer Timesheet</span>
                <h3 className="text-base font-black text-slate-900">{showLogTimeModal.title}</h3>
              </div>
              <button onClick={() => setShowLogTimeModal(null)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleLogTimesheet} className="space-y-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Hours Worked *</label>
                <input
                  type="number" step="0.5" required placeholder="4"
                  value={timesheetForm.hours} onChange={(e) => setTimesheetForm({ ...timesheetForm, hours: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 font-mono focus:bg-white focus:border-[#0070ba] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Work Description & Notes</label>
                <textarea
                  rows="2" placeholder="Completed tasks..."
                  value={timesheetForm.notes} onChange={(e) => setTimesheetForm({ ...timesheetForm, notes: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:bg-white focus:border-[#0070ba] focus:outline-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button" onClick={() => setShowLogTimeModal(null)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-md shadow-purple-500/20 cursor-pointer"
                >
                  Log Hours
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 10. DISPATCH WHATSAPP MODAL */}
      {showDispatchWhatsAppModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white border border-slate-200 rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="text-base font-black text-slate-900">Dispatch WhatsApp Message</h3>
              <button onClick={() => setShowDispatchWhatsAppModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSendWhatsApp} className="space-y-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Recipient Phone Number *</label>
                <input
                  type="text" required placeholder="+91 98765 43210"
                  value={waForm.phone_number} onChange={(e) => setWaForm({ ...waForm, phone_number: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 font-mono focus:bg-white focus:border-[#0070ba] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Message Body *</label>
                <textarea
                  rows="4" required placeholder="Type WhatsApp message..."
                  value={waForm.message} onChange={(e) => setWaForm({ ...waForm, message: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:bg-white focus:border-[#0070ba] focus:outline-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button" onClick={() => setShowDispatchWhatsAppModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-500/20 cursor-pointer"
                >
                  Send via WhatsApp
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 11. ADD MARKETING CAMPAIGN MODAL */}
      {showAddCampaignModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white border border-slate-200 rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="text-base font-black text-slate-900">Create Marketing Campaign</h3>
              <button onClick={() => setShowAddCampaignModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateCampaign} className="space-y-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Campaign Name *</label>
                <input
                  type="text" required placeholder="e.g. Q4 Enterprise AI Search"
                  value={campaignForm.name} onChange={(e) => setCampaignForm({ ...campaignForm, name: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:bg-white focus:border-[#0070ba] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Platform</label>
                  <select
                    value={campaignForm.platform} onChange={(e) => setCampaignForm({ ...campaignForm, platform: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:bg-white focus:border-[#0070ba] focus:outline-none"
                  >
                    <option value="Google Ads">Google Ads</option>
                    <option value="LinkedIn">LinkedIn Ads</option>
                    <option value="Meta Ads">Meta Ads</option>
                    <option value="Organic SEO">Organic SEO</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Budget (INR)</label>
                  <input
                    type="number" placeholder="50000"
                    value={campaignForm.budget} onChange={(e) => setCampaignForm({ ...campaignForm, budget: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 font-mono focus:bg-white focus:border-[#0070ba] focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button" onClick={() => setShowAddCampaignModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#0070ba] hover:bg-[#005a96] text-white text-xs font-bold shadow-md shadow-blue-500/20 cursor-pointer"
                >
                  Create Campaign
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 12. LEAD DETAIL VIEW MODAL */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="w-full max-w-lg bg-white border border-slate-200 rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] font-bold text-[#0070ba] uppercase tracking-wider">{selectedLead.id}</span>
                <h3 className="text-base font-black text-slate-900">{selectedLead.name}</h3>
              </div>
              <button onClick={() => setSelectedLead(null)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <div className="flex justify-between">
                <span className="text-slate-500">Email:</span>
                <strong className="text-[#0070ba] font-mono">{selectedLead.email}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Phone:</span>
                <span className="text-slate-800 font-mono font-bold">{selectedLead.phone || 'Not provided'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Company:</span>
                <span className="text-slate-900 font-semibold">{selectedLead.company || 'Direct Client'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Service Required:</span>
                <span className="text-slate-900 font-semibold">{selectedLead.service}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">AI Lead Score:</span>
                <span className="px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 font-mono font-bold">{selectedLead.score || 50}/100</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Status:</span>
                <span className="px-2 py-0.5 rounded bg-blue-50 text-[#0070ba] font-bold">{selectedLead.status || 'New'}</span>
              </div>
              <div>
                <span className="text-slate-500 block mb-1">Requirement Notes:</span>
                <div className="p-3 bg-white rounded-xl border border-slate-200 text-slate-700 whitespace-pre-wrap">
                  {selectedLead.requirement_need || selectedLead.message || 'No additional notes.'}
                </div>
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                type="button" onClick={() => setSelectedLead(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 cursor-pointer"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => { handleConvertLeadToDeal(selectedLead); setSelectedLead(null); }}
                className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-500/20 cursor-pointer"
              >
                Convert to Active Deal
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default AdminPage;

/**
 * NEUORZIN CRM — Comprehensive Initial Store & Persistent Cache Manager
 * Guarantees immediate, instantaneous rendering of all admin CRM modules on load.
 * Prevents "0 count" flashes, persists real-time updates, and hydrates seamlessly.
 */

export const INITIAL_CRM_DATA = {
  leads: [
    {
      id: 'LEAD-1001',
      source: 'Website Form',
      name: 'Arjun Nambiar',
      company: 'Aura Retail Global',
      phone: '+91 98112 34567',
      whatsapp: '+91 98112 34567',
      email: 'arjun@auraretail.com',
      location: 'Bengaluru, India',
      service: 'Retail',
      requirement_need: 'Headless Next.js e-commerce storefront with high concurrency and Shopify backend connector',
      budget: '₹8,00,000 - ₹12,00,000',
      timeline: '6 Weeks',
      assigned_to: 'Rohan Mehta (Sales Lead)',
      priority: 'High',
      score: 95,
      status: 'Won',
      created_at: '2026-09-12 10:30',
      emailStatus: 'Delivered (arjun@auraretail.com)'
    },
    {
      id: 'LEAD-1002',
      source: 'Google Ads',
      name: 'Siddharth Rao',
      company: 'Nexis PropTech AI',
      phone: '+91 99401 22334',
      whatsapp: '+91 99401 22334',
      email: 'siddharth@nexisprop.io',
      location: 'Hyderabad, India',
      service: 'Real Estate',
      requirement_need: 'Interactive 3D geospatial property appraisal engine and tenant screening portal',
      budget: '₹15,00,000+',
      timeline: '3 Months',
      assigned_to: 'Ananya Roy (Senior AE)',
      priority: 'High',
      score: 88,
      status: 'Proposal Sent',
      created_at: '2026-09-13 14:15',
      emailStatus: 'Delivered (siddharth@nexisprop.io)'
    },
    {
      id: 'LEAD-1003',
      source: 'Meta Ads',
      name: 'Dr. Kavita Deshmukh',
      company: 'SkillSphere EduTech',
      phone: '+91 97654 88990',
      whatsapp: '+91 97654 88990',
      email: 'kavita@skillsphere.in',
      location: 'Mumbai, India',
      service: 'EduTech',
      requirement_need: 'AI adaptive exam scoring pipeline with real-time video proctoring and LMS integration',
      budget: '₹10,00,000',
      timeline: '8 Weeks',
      assigned_to: 'Rohan Mehta (Sales Lead)',
      priority: 'Medium',
      score: 78,
      status: 'Qualified',
      created_at: '2026-09-14 09:45',
      emailStatus: 'Delivered (kavita@skillsphere.in)'
    },
    {
      id: 'LEAD-1004',
      source: 'WhatsApp Inbound',
      name: 'Rajesh Singhal',
      company: 'Singhal Heavy Machinery',
      phone: '+91 98765 00112',
      whatsapp: '+91 98765 00112',
      email: 'rajesh@singhalmachinery.com',
      location: 'Pune, India',
      service: 'Manufacturing',
      requirement_need: 'SCADA telemetry IoT sensors dashboard and predictive maintenance alerting system',
      budget: '₹18,00,000',
      timeline: '4 Months',
      assigned_to: 'Ananya Roy (Senior AE)',
      priority: 'High',
      score: 90,
      status: 'Contacted',
      created_at: '2026-09-15 11:20',
      emailStatus: 'Delivered (rajesh@singhalmachinery.com)'
    },
    {
      id: 'LEAD-1005',
      source: 'LinkedIn B2B',
      name: 'Priya Sundaram',
      company: 'Vedic Care Health Labs',
      phone: '+91 98220 44556',
      whatsapp: '+91 98220 44556',
      email: 'priya@vediccare.com',
      location: 'Chennai, India',
      service: 'Healthcare & Pharma',
      requirement_need: 'HIPAA & ABHA compliant electronic health record (EHR) gateway with telemedicine calling',
      budget: '₹14,00,000',
      timeline: '10 Weeks',
      assigned_to: 'Rohan Mehta (Sales Lead)',
      priority: 'High',
      score: 92,
      status: 'Negotiation',
      created_at: '2026-09-16 16:00',
      emailStatus: 'Delivered (priya@vediccare.com)'
    },
    {
      id: 'LEAD-1006',
      source: 'Organic SEO',
      name: 'Manish Agarwal',
      company: 'Apex Logistics Freight',
      phone: '+91 98199 77881',
      whatsapp: '+91 98199 77881',
      email: 'manish@apexlogistics.in',
      location: 'Delhi NCR, India',
      service: 'Logistics',
      requirement_need: 'Dynamic truck routing optimizer with FASTag automated toll reconciliation API',
      budget: '₹12,50,000',
      timeline: '8 Weeks',
      assigned_to: 'Ananya Roy (Senior AE)',
      priority: 'Medium',
      score: 82,
      status: 'Qualified',
      created_at: '2026-09-17 12:10',
      emailStatus: 'Delivered (manish@apexlogistics.in)'
    },
    {
      id: 'LEAD-1007',
      source: 'Website Form',
      name: 'Sunil Chettri',
      company: 'FinPulse NeoBank',
      phone: '+91 99001 33221',
      whatsapp: '+91 99001 33221',
      email: 'sunil@finpulse.io',
      location: 'Bengaluru, India',
      service: 'Financial Services',
      requirement_need: 'RBI compliant UPI QR soundbox merchant backend with instant settlement ledger',
      budget: '₹22,00,000',
      timeline: '12 Weeks',
      assigned_to: 'Kailash S (Super Admin)',
      priority: 'High',
      score: 98,
      status: 'Lead Qualified',
      created_at: '2026-09-18 09:15',
      emailStatus: 'Delivered (sunil@finpulse.io)'
    },
    {
      id: 'LEAD-1008',
      source: 'Google Ads',
      name: 'Neha Kapoor',
      company: 'Luxe Stay Hospitality',
      phone: '+91 98330 11229',
      whatsapp: '+91 98330 11229',
      email: 'neha@luxestays.in',
      location: 'Goa, India',
      service: 'Hospitality',
      requirement_need: 'Multi-property hotel booking engine with WhatsApp guest concierge automation',
      budget: '₹7,50,000',
      timeline: '5 Weeks',
      assigned_to: 'Rohan Mehta (Sales Lead)',
      priority: 'Low',
      score: 65,
      status: 'New',
      created_at: '2026-09-18 10:45',
      emailStatus: 'Delivered (neha@luxestays.in)'
    }
  ],

  deals: [
    {
      id: 'DEAL-001',
      pipeline_id: 'PIPE-SW',
      title: 'Aura Retail - Headless Storefront & POS',
      customer_name: 'Arjun Nambiar (Aura Retail)',
      company: 'Aura Retail Global',
      stage: 'Won',
      value: 950000,
      probability: 100,
      expected_close_date: '2026-09-15',
      assigned_to: 'Rohan Mehta (Sales Lead)',
      status: 'Won'
    },
    {
      id: 'DEAL-002',
      pipeline_id: 'PIPE-SW',
      title: 'Nexis PropTech - 3D Geospatial Engine',
      customer_name: 'Siddharth Rao (Nexis PropTech)',
      company: 'Nexis PropTech AI',
      stage: 'Proposal Sent',
      value: 1500000,
      probability: 60,
      expected_close_date: '2026-09-28',
      assigned_to: 'Ananya Roy (Senior AE)',
      status: 'Open'
    },
    {
      id: 'DEAL-003',
      pipeline_id: 'PIPE-MKTG',
      title: 'SkillSphere - B2B Inbound Acquisition Retainer',
      customer_name: 'Dr. Kavita Deshmukh (SkillSphere)',
      company: 'SkillSphere EduTech',
      stage: 'Lead Qualified',
      value: 450000,
      probability: 40,
      expected_close_date: '2026-10-05',
      assigned_to: 'Rohan Mehta (Sales Lead)',
      status: 'Open'
    },
    {
      id: 'DEAL-004',
      pipeline_id: 'PIPE-SW',
      title: 'Vedic Care - HIPAA Health Records & Telehealth',
      customer_name: 'Priya Sundaram (Vedic Care)',
      company: 'Vedic Care Health Labs',
      stage: 'Negotiation',
      value: 1400000,
      probability: 80,
      expected_close_date: '2026-09-30',
      assigned_to: 'Kailash S (Super Admin)',
      status: 'Open'
    },
    {
      id: 'DEAL-005',
      pipeline_id: 'PIPE-SW',
      title: 'Singhal Heavy Machinery - SCADA Telemetry Portal',
      customer_name: 'Rajesh Singhal',
      company: 'Singhal Heavy Machinery',
      stage: 'Lead Qualified',
      value: 1800000,
      probability: 50,
      expected_close_date: '2026-10-15',
      assigned_to: 'Ananya Roy (Senior AE)',
      status: 'Open'
    }
  ],

  quotations: [
    {
      id: 'QT-001',
      quote_number: 'QT-2026-0101',
      customer_name: 'Arjun Nambiar',
      company: 'Aura Retail Global',
      service_title: 'Headless Retail Storefront & Inventory Mesh',
      subtotal: 950000,
      discount: 50000,
      gst_rate: 18,
      gst_amount: 162000,
      total_amount: 1062000,
      status: 'Accepted',
      valid_until: '2026-09-30',
      created_at: '2026-09-12'
    },
    {
      id: 'QT-002',
      quote_number: 'QT-2026-0102',
      customer_name: 'Siddharth Rao',
      company: 'Nexis PropTech AI',
      service_title: '3D Geospatial Property Appraisal Platform',
      subtotal: 1500000,
      discount: 0,
      gst_rate: 18,
      gst_amount: 270000,
      total_amount: 1770000,
      status: 'Sent',
      valid_until: '2026-10-05',
      created_at: '2026-09-14'
    },
    {
      id: 'QT-003',
      quote_number: 'QT-2026-0103',
      customer_name: 'Dr. Kavita Deshmukh',
      company: 'SkillSphere EduTech',
      service_title: 'Adaptive Exam Scoring Engine & Proctoring',
      subtotal: 800000,
      discount: 25000,
      gst_rate: 18,
      gst_amount: 139500,
      total_amount: 914500,
      status: 'Draft',
      valid_until: '2026-10-15',
      created_at: '2026-09-16'
    },
    {
      id: 'QT-004',
      quote_number: 'QT-2026-0104',
      customer_name: 'Priya Sundaram',
      company: 'Vedic Care Health Labs',
      service_title: 'ABHA Integrated Telemedicine Platform',
      subtotal: 1400000,
      discount: 50000,
      gst_rate: 18,
      gst_amount: 243000,
      total_amount: 1593000,
      status: 'Sent',
      valid_until: '2026-10-20',
      created_at: '2026-09-17'
    },
    {
      id: 'QT-005',
      quote_number: 'QT-2026-0105',
      customer_name: 'Manish Agarwal',
      company: 'Apex Logistics Freight',
      service_title: 'Real-time Fleet Telemetry & Toll Gateway',
      subtotal: 1100000,
      discount: 0,
      gst_rate: 18,
      gst_amount: 198000,
      total_amount: 1298000,
      status: 'Draft',
      valid_until: '2026-10-25',
      created_at: '2026-09-18'
    },
    {
      id: 'QT-006',
      quote_number: 'QT-2026-0106',
      customer_name: 'Sunil Chettri',
      company: 'FinPulse NeoBank',
      service_title: 'UPI Merchant QR Settlement Engine',
      subtotal: 2000000,
      discount: 100000,
      gst_rate: 18,
      gst_amount: 342000,
      total_amount: 2242000,
      status: 'Sent',
      valid_until: '2026-10-31',
      created_at: '2026-09-18'
    }
  ],

  invoices: [
    {
      id: 'INV-001',
      invoice_number: 'INV-2026-0042',
      customer_name: 'Arjun Nambiar',
      company: 'Aura Retail Global',
      issue_date: '2026-09-10',
      due_date: '2026-09-20',
      total_amount: 424800,
      paid_amount: 424800,
      status: 'Paid',
      gst_amount: 64800
    },
    {
      id: 'INV-002',
      invoice_number: 'INV-2026-0043',
      customer_name: 'Siddharth Rao',
      company: 'Nexis PropTech AI',
      issue_date: '2026-09-15',
      due_date: '2026-09-25',
      total_amount: 708000,
      paid_amount: 354000,
      status: 'Partially Paid',
      gst_amount: 108000
    },
    {
      id: 'INV-003',
      invoice_number: 'INV-2026-0044',
      customer_name: 'Dr. Kavita Deshmukh',
      company: 'SkillSphere EduTech',
      issue_date: '2026-09-17',
      due_date: '2026-10-02',
      total_amount: 365800,
      paid_amount: 0,
      status: 'Overdue',
      gst_amount: 55800
    },
    {
      id: 'INV-004',
      invoice_number: 'INV-2026-0045',
      customer_name: 'Priya Sundaram',
      company: 'Vedic Care Health Labs',
      issue_date: '2026-09-18',
      due_date: '2026-10-05',
      total_amount: 637200,
      paid_amount: 0,
      status: 'Pending',
      gst_amount: 97200
    }
  ],

  projects: [
    {
      id: 'PRJ-001',
      project_code: 'PRJ-AURA-01',
      name: 'Aura Retail - Headless Next.js Commerce Engine',
      customer_name: 'Arjun Nambiar (Aura Retail Global)',
      company: 'Aura Retail Global',
      project_manager: 'Vikram Sen (PM)',
      start_date: '2026-09-12',
      deadline: '2026-10-30',
      budget: 950000,
      priority: 'High',
      status: 'Architecture & UI/UX',
      health: 'Good',
      progress: 35
    },
    {
      id: 'PRJ-002',
      project_code: 'PRJ-NEXIS-02',
      name: 'Nexis PropTech - 3D Geospatial Engine',
      customer_name: 'Siddharth Rao (Nexis PropTech AI)',
      company: 'Nexis PropTech AI',
      project_manager: 'Vikram Sen (PM)',
      start_date: '2026-09-15',
      deadline: '2026-11-15',
      budget: 1500000,
      priority: 'High',
      status: 'Core Development',
      health: 'Good',
      progress: 20
    },
    {
      id: 'PRJ-003',
      project_code: 'PRJ-SKILL-03',
      name: 'SkillSphere - Adaptive Testing & Proctoring AI',
      customer_name: 'Dr. Kavita Deshmukh',
      company: 'SkillSphere EduTech',
      project_manager: 'Vikram Sen (PM)',
      start_date: '2026-09-16',
      deadline: '2026-11-20',
      budget: 800000,
      priority: 'Medium',
      status: 'Requirement Analysis',
      health: 'At Risk',
      progress: 15
    },
    {
      id: 'PRJ-004',
      project_code: 'PRJ-VEDIC-04',
      name: 'Vedic Care - ABHA Healthcare Cloud Gateway',
      customer_name: 'Priya Sundaram',
      company: 'Vedic Care Health Labs',
      project_manager: 'Aditya Verma (Lead Dev)',
      start_date: '2026-09-18',
      deadline: '2026-12-10',
      budget: 1400000,
      priority: 'High',
      status: 'Kickoff',
      health: 'Good',
      progress: 10
    },
    {
      id: 'PRJ-005',
      project_code: 'PRJ-FINPULSE-05',
      name: 'FinPulse NeoBank - Merchant Settlement Hub',
      customer_name: 'Sunil Chettri',
      company: 'FinPulse NeoBank',
      project_manager: 'Kailash S (Super Admin)',
      start_date: '2026-09-18',
      deadline: '2026-12-30',
      budget: 2000000,
      priority: 'High',
      status: 'Kickoff',
      health: 'Good',
      progress: 5
    }
  ],

  tasks: [
    {
      id: 'TSK-0001',
      project_id: 'PRJ-001',
      project_name: 'Aura Retail - Headless Next.js Commerce Engine',
      title: 'Design responsive product details page & cart flyout in Figma',
      assigned_to: 'Vikram Sen (PM)',
      priority: 'High',
      status: 'Done',
      estimated_hours: 12,
      logged_hours: 12,
      due_date: '2026-09-20'
    },
    {
      id: 'TSK-0002',
      project_id: 'PRJ-001',
      project_name: 'Aura Retail - Headless Next.js Commerce Engine',
      title: 'Implement Shopify Storefront GraphQL webhooks & Redis caching',
      assigned_to: 'Aditya Verma (Lead Dev)',
      priority: 'High',
      status: 'In Progress',
      estimated_hours: 24,
      logged_hours: 14.5,
      due_date: '2026-09-25'
    },
    {
      id: 'TSK-0003',
      project_id: 'PRJ-002',
      project_name: 'Nexis PropTech - 3D Geospatial Engine',
      title: 'Integrate Mapbox GL and Three.js 3D building parcel meshes',
      assigned_to: 'Aditya Verma (Lead Dev)',
      priority: 'Urgent',
      status: 'In Progress',
      estimated_hours: 32,
      logged_hours: 18,
      due_date: '2026-09-28'
    },
    {
      id: 'TSK-0004',
      project_id: 'PRJ-003',
      project_name: 'SkillSphere - Adaptive Testing & Proctoring AI',
      title: 'WebRTC video stream recording and automated face tracking validator',
      assigned_to: 'Vikram Sen (PM)',
      priority: 'Medium',
      status: 'To Do',
      estimated_hours: 20,
      logged_hours: 0,
      due_date: '2026-10-05'
    },
    {
      id: 'TSK-0005',
      project_id: 'PRJ-004',
      project_name: 'Vedic Care - ABHA Healthcare Cloud Gateway',
      title: 'Implement ABHA M1/M2/M3 cryptographic payload signing protocol',
      assigned_to: 'Aditya Verma (Lead Dev)',
      priority: 'High',
      status: 'To Do',
      estimated_hours: 18,
      logged_hours: 0,
      due_date: '2026-10-10'
    },
    {
      id: 'TSK-0006',
      project_id: 'PRJ-005',
      project_name: 'FinPulse NeoBank - Merchant Settlement Hub',
      title: 'Build automated reconciliation ledger with double-entry journal',
      assigned_to: 'Kailash S (Super Admin)',
      priority: 'High',
      status: 'To Do',
      estimated_hours: 28,
      logged_hours: 0,
      due_date: '2026-10-15'
    }
  ],

  activities: [
    {
      id: 'ACT-001',
      title: 'Initial Discovery Call — Aura Retail Global',
      lead_name: 'Arjun Nambiar',
      type: 'Call',
      status: 'Completed',
      scheduled_at: '2026-09-12 11:00',
      outcome: 'Client approved scope and requested formal GST quotation.'
    },
    {
      id: 'ACT-002',
      title: '3D Spatial Demo Presentation — Nexis PropTech',
      lead_name: 'Siddharth Rao',
      type: 'Meeting',
      status: 'Completed',
      scheduled_at: '2026-09-14 15:30',
      outcome: 'Shared proposal deck and architecture wireframes.'
    },
    {
      id: 'ACT-003',
      title: 'Technical Scope Review — Vedic Care Labs',
      lead_name: 'Priya Sundaram',
      type: 'Meeting',
      status: 'Scheduled',
      scheduled_at: '2026-09-19 14:00',
      outcome: 'Pending security review and B2B pricing discussion.'
    },
    {
      id: 'ACT-004',
      title: 'Follow-up WhatsApp Message — Singhal Machinery',
      lead_name: 'Rajesh Singhal',
      type: 'WhatsApp',
      status: 'Completed',
      scheduled_at: '2026-09-15 12:00',
      outcome: 'Shared hardware specs for IoT edge controller.'
    }
  ],

  notifications: [
    {
      id: 'NOTIF-001',
      title: '⚡ High Value Lead Captured (₹22,00,000)',
      message: 'FinPulse NeoBank submitted an inbound enquiry for UPI Merchant Settlement Engine.',
      type: 'lead_created',
      priority: 'high',
      is_read: false,
      created_at: '2026-09-18 09:15',
      action_url: 'leads'
    },
    {
      id: 'NOTIF-002',
      title: '🎉 Quotation QT-2026-0101 Accepted',
      message: 'Arjun Nambiar accepted Quotation for ₹10,62,000. Deal promoted to Won.',
      type: 'deal_stage_changed',
      priority: 'normal',
      is_read: false,
      created_at: '2026-09-15 11:30',
      action_url: 'deals'
    },
    {
      id: 'NOTIF-003',
      title: '💰 Payment Received ₹4,24,800',
      message: 'Advance payment received for Aura Retail (REC-2026-8801).',
      type: 'invoice_paid',
      priority: 'normal',
      is_read: true,
      created_at: '2026-09-14 16:40',
      action_url: 'finance'
    },
    {
      id: 'NOTIF-004',
      title: '🚨 SLA Escalation: SkillSphere Invoice Overdue',
      message: 'Invoice INV-2026-0044 is overdue by 3 days. Automated reminder scheduled.',
      type: 'sla_escalation',
      priority: 'urgent',
      is_read: false,
      created_at: '2026-09-18 08:00',
      action_url: 'finance'
    }
  ],

  auditLogs: [
    {
      id: 'LOG-001',
      action: 'LEAD_CONVERTED',
      entity_type: 'leads',
      entity_id: 'LEAD-1001',
      performed_by: 'Kailash S (Super Admin)',
      details: 'Converted Lead LEAD-1001 to Customer CUST-001 and Deal DEAL-001',
      created_at: '2026-09-12 11:45'
    },
    {
      id: 'LOG-002',
      action: 'QUOTATION_ACCEPTED',
      entity_type: 'quotations',
      entity_id: 'QT-2026-0101',
      performed_by: 'Arjun Nambiar',
      details: 'Accepted quotation QT-2026-0101 (Total ₹10,62,000)',
      created_at: '2026-09-15 11:30'
    },
    {
      id: 'LOG-003',
      action: 'PAYMENT_RECORDED',
      entity_type: 'payments',
      entity_id: 'REC-2026-8801',
      performed_by: 'Sanjay Gupta (Finance)',
      details: 'Recorded payment of ₹4,24,800 for Invoice INV-2026-0042',
      created_at: '2026-09-14 16:40'
    },
    {
      id: 'LOG-004',
      action: 'PROJECT_CREATED',
      entity_type: 'projects',
      entity_id: 'PRJ-001',
      performed_by: 'System Automation',
      details: 'Created Agile Project PRJ-001 with 3 delivery milestones',
      created_at: '2026-09-12 12:00'
    }
  ],

  campaigns: [
    {
      id: 'CAMP-001',
      name: 'Google Search — Enterprise AI Solutions Q3',
      channel: 'Google Ads',
      status: 'Active',
      budget: 150000,
      spent: 84500,
      leads_generated: 42,
      conversions: 8,
      cac: 2011,
      revenue_generated: 1650000
    },
    {
      id: 'CAMP-002',
      name: 'LinkedIn Sponsored — FinTech & NeoBank Direct',
      channel: 'LinkedIn',
      status: 'Active',
      budget: 120000,
      spent: 65000,
      leads_generated: 19,
      conversions: 3,
      cac: 3421,
      revenue_generated: 2200000
    },
    {
      id: 'CAMP-003',
      name: 'Meta Ads — EduTech & PropTech Video Showcase',
      channel: 'Meta Ads',
      status: 'Active',
      budget: 80000,
      spent: 42000,
      leads_generated: 31,
      conversions: 4,
      cac: 1354,
      revenue_generated: 950000
    }
  ],

  whatsappMessages: [
    {
      id: 'WA-001',
      sender_type: 'Client',
      customer_name: 'Rajesh Singhal',
      phone: '+91 98765 00112',
      message: 'Hello NeuOrzin team, we need a quote for our factory IoT setup.',
      timestamp: '2026-09-15 11:15',
      status: 'Read'
    },
    {
      id: 'WA-002',
      sender_type: 'Agent',
      customer_name: 'Rajesh Singhal',
      phone: '+91 98765 00112',
      message: 'Hi Rajesh! Thank you for reaching out to NeuOrzin. Our solutions architect will call you in 15 minutes.',
      timestamp: '2026-09-15 11:20',
      status: 'Delivered'
    },
    {
      id: 'WA-003',
      sender_type: 'Client',
      customer_name: 'Sunil Chettri',
      phone: '+91 99001 33221',
      message: 'Can we schedule a technical walkthrough for the UPI settlement ledger tomorrow?',
      timestamp: '2026-09-18 09:30',
      status: 'Read'
    }
  ],
  blogs: [
    {
      id: 'how-we-grew-organic-pipeline-in-2026-seo-playbook',
      slug: 'how-we-grew-organic-pipeline-in-2026-seo-playbook',
      title: 'How We Grew Organic Pipeline in 2026: Why Traditional SEO Failed and What Actually Worked',
      section: 'Digital Marketing',
      category: 'Digital Marketing',
      date: 'March 2026',
      read_time: '6 min read',
      readTime: '6 min read',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
      tags: ['Organic Growth', 'AI Search', 'Content Strategy', 'B2B Lead Gen', 'GEO'],
      excerpt: 'If you opened your analytics over the past few months and saw search impressions rise while clicks softened, you are not imagining things. Here is how we adapted our marketing strategy to win high-intent enterprise pipeline in the new search landscape.',
      author: 'Rajesh Varma',
      authorRole: 'Head of Growth Marketing',
      author_role: 'Head of Growth Marketing',
      status: 'Published',
      is_featured: 1,
      seo_title: 'How We Grew Organic Pipeline in 2026 | NeuOrzin Growth Playbook',
      seo_description: 'How to adapt your B2B SEO and content strategy to win high-intent enterprise pipeline in the era of AI search engines.',
      seo_keywords: 'B2B SEO, AI Search, Pipeline Growth, Organic Search',
      published_at: '2026-03-01 10:00:00',
      created_at: '2026-03-01 10:00:00',
      intro: 'If you opened your analytics dashboard over the past few months and saw search impressions rise while direct click-through rates softened, you are not imagining things. Between AI-generated overviews and direct-answer search engines, the era of capturing easy traffic with 2,000-word generic keyword articles is officially over.',
      sections: [
        {
          heading: '1. The Day Our Standard Keywords Stopped Converting',
          paragraphs: [
            'For years, the B2B playbook was simple: find high-volume informational keywords, write comprehensive guides, build a few backlinks, and wait for the demo requests to roll in.',
            'Early this year, we noticed a distinct shift. Our informational articles still ranked in the top 3, but the traffic was no longer clicking through. AI search summaries were answering surface-level questions directly on the results page. The casual readers got their quick answer and left, while high-intent decision-makers were looking for something much deeper.'
          ],
          callout: 'Traffic volume is a vanity metric; qualified pipeline velocity is what pays the bills. Winning today means being the source of truth that AI models cite when high-intent buyers ask specific questions.'
        },
        {
          heading: '2. What AI Engines Actually Look For (And It Is Not Keyword Density)',
          paragraphs: [
            'When conversational search models synthesize an answer, they evaluate source credibility and data freshness rather than repetitive keyword density.',
            'We completely overhauled our editorial workflow around three practical rules:'
          ],
          list: [
            'Publish Original Benchmark Data: Real numbers from our client audits and engineering benchmarks get cited 4x more often than generic opinion pieces.',
            'Direct Answer Architecture: We answer the core question clearly in the very first two sentences before expanding into architectural details.',
            'Proprietary Frameworks: Giving unique, memorable names to our methodologies makes our concepts recognizable across the web.'
          ]
        },
        {
          heading: '3. Why Real Human Experience Beats Mass Content Every Time',
          paragraphs: [
            'The web is currently flooded with generic AI-written articles that all say the exact same thing in slightly different words. Decision-makers can spot automated fluff within three seconds.',
            'What builds genuine trust—and what actually converts enterprise prospects—is unfiltered practitioner experience: sharing real mistakes, specific configuration hurdles, and the exact trade-offs made during real client implementations.'
          ]
        },
        {
          heading: '4. What You Should Change on Your Website Next Week',
          paragraphs: [
            'If you want to protect your inbound pipeline, start with these three high-impact adjustments:'
          ],
          list: [
            'Audit your top 10 revenue pages and remove introductory fluff—get straight to the actionable insight.',
            'Add structured comparison tables, key takeaways, and clear summary cards that search crawlers can parse instantly.',
            'Interview your customer-facing engineers and sales reps to write about the actual edge-case problems your clients ask during sales calls.'
          ]
        }
      ],
      conclusion: 'Organic search is far from dead—it has simply grown up. The brands winning in 2026 are the ones providing genuine, authoritative human insight that both search engines and executive buyers can rely on.'
    },
    {
      id: 'honest-guide-to-b2b-revenue-attribution-and-capi',
      slug: 'honest-guide-to-b2b-revenue-attribution-and-capi',
      title: 'Where Did Our Ad Budget Go? An Honest Guide to Fixing B2B Attribution',
      section: 'Digital Marketing',
      category: 'Digital Marketing',
      date: 'March 2026',
      read_time: '7 min read',
      readTime: '7 min read',
      image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80',
      tags: ['RevOps', 'Server-Side Tracking', 'Meta / Google CAPI', 'Attribution', 'CAC Optimization'],
      excerpt: 'Every marketing leader knows the pain of seeing ad dashboards report 50 conversions while the sales team insists they only met 3 qualified prospects. Here is the exact server-side tracking setup that fixed our funnel.',
      author: 'Aparna Sundaram',
      authorRole: 'Principal Revenue Operations Lead',
      author_role: 'Principal Revenue Operations Lead',
      status: 'Published',
      is_featured: 0,
      seo_title: 'An Honest Guide to Fixing B2B Attribution & CAPI | NeuOrzin',
      seo_description: 'How to implement server-side tracking (CAPI) and closed-loop CRM attribution to reduce CAC and optimize marketing ROI.',
      seo_keywords: 'Server-Side Tracking, CAPI, B2B Attribution, RevOps',
      published_at: '2026-03-05 14:30:00',
      created_at: '2026-03-05 14:30:00',
      intro: 'Every marketing director knows the sinking feeling of looking at an ad manager dashboard showing 50 reported conversions, only to have the VP of Sales walk in and ask why the team only received 3 qualified enterprise leads that week.',
      sections: [
        {
          heading: '1. The 40% Telemetry Blind Spot We Did Not Know We Had',
          paragraphs: [
            'For a long time, marketing teams relied on browser-side JavaScript pixels to measure ad effectiveness. But with modern browser tracking restrictions, mobile privacy updates, and ad-blockers, client-side tracking now misses between 30% and 45% of real conversion signals.',
            'When your ad platforms are operating with half the data, their automated bidding algorithms end up optimizing for low-quality form-fills and spam bots instead of real enterprise buyers.'
          ],
          callout: 'If your ad platform only optimizes for form submissions instead of qualified sales opportunities, you are essentially training your budget to find tire-kickers.'
        },
        {
          heading: '2. Moving to Server-Side Tracking Without the Headache',
          paragraphs: [
            'The fix is moving from client-side browser tags to server-side event tracking (Conversions API / CAPI).',
            'Instead of hoping the user browser sends the conversion event back to Meta or Google, our server captures the action directly and passes verified identifiers (hashed email, timestamp, transaction ID) over a secure API connection.'
          ],
          list: [
            'Direct Server-to-Server Connection: Zero interference from ad-blockers or browser cookie clearing.',
            'Higher Signal Quality: Event match quality scores jump from 4.5/10 to over 8.8/10, giving ad bidding algorithms the clarity they need.',
            'Full Privacy Compliance: We control exactly what data is sanitized and sent, ensuring complete GDPR and CCPA adherence.'
          ]
        },
        {
          heading: '3. The Magic of Feeding CRM Deal Stages Back to Ad Engines',
          paragraphs: [
            'The biggest breakthrough happened when we connected our CRM (HubSpot / Salesforce) directly back to Google Ads and LinkedIn Campaign Manager.',
            'Instead of telling Google "someone filled a form," we trigger an offline conversion event only when an opportunity reaches "Demo Completed & Qualified" in the CRM. The ad algorithms immediately shifted spend toward companies matching our exact ideal customer profile.'
          ]
        },
        {
          heading: '4. The Results After 90 Days',
          paragraphs: [
            'Once the closed-loop tracking was live for a quarter, the results spoke for themselves:'
          ],
          list: [
            'Our Customer Acquisition Cost (CAC) dropped by 34% because we stopped wasting budget on unengaged audiences.',
            'Sales qualification rates on inbound demo requests jumped from 22% to over 54%.',
            'Marketing and sales finally look at the exact same pipeline numbers during weekly executive reviews.'
          ]
        }
      ],
      conclusion: 'Fixing attribution is not about chasing vanity metrics—it is about giving your growth budget the intelligence it needs to invest in channels that produce real enterprise revenue.'
    }
  ],
  categories: [
    { id: 'CAT-001', name: 'Digital Marketing', slug: 'digital-marketing', description: 'Performance marketing, SEO, conversion rate optimization, and brand scaling.', blog_count: 2 },
    { id: 'CAT-002', name: 'AI & Automation', slug: 'ai-automation', description: 'Autonomous agents, LLM integrations, and workflow automation.', blog_count: 0 },
    { id: 'CAT-003', name: 'Product Engineering', slug: 'product-engineering', description: 'Modern web, mobile apps, MVP development, and architecture.', blog_count: 0 },
    { id: 'CAT-004', name: 'Data Platforms', slug: 'data-platforms', description: 'Snowflake, cloud data pipelines, telemetry, and business intelligence.', blog_count: 0 }
  ],
  tags: [
    { id: 'TAG-001', name: 'Organic Growth', slug: 'organic-growth' },
    { id: 'TAG-002', name: 'AI Search', slug: 'ai-search' },
    { id: 'TAG-003', name: 'Content Strategy', slug: 'content-strategy' },
    { id: 'TAG-004', name: 'B2B Lead Gen', slug: 'b2b-lead-gen' },
    { id: 'TAG-005', name: 'RevOps', slug: 'revops' },
    { id: 'TAG-006', name: 'Server-Side Tracking', slug: 'server-side-tracking' },
    { id: 'TAG-007', name: 'Attribution', slug: 'attribution' },
    { id: 'TAG-008', name: 'Machine Learning', slug: 'machine-learning' }
  ],
  users: [
    { id: 'USR-001', name: 'Kailash S (Super Admin)', email: 'admin@neuorzin.com', role: 'Super Admin', department: 'Executive', phone: '+91 77940 45500', status: 'Active', created_at: '2026-01-01 10:00:00' },
    { id: 'USR-002', name: 'Rohan Mehta (Sales Lead)', email: 'rohan.sales@neuorzin.com', role: 'Sales Manager', department: 'Sales', phone: '+91 98201 12345', status: 'Active', created_at: '2026-01-15 10:00:00' },
    { id: 'USR-003', name: 'Ananya Roy (Senior AE)', email: 'ananya.ae@neuorzin.com', role: 'Sales Executive', department: 'Sales', phone: '+91 98402 54321', status: 'Active', created_at: '2026-02-01 10:00:00' },
    { id: 'USR-004', name: 'Vikram Sen (PM)', email: 'vikram.pm@neuorzin.com', role: 'Project Manager', department: 'Development', phone: '+91 97112 88990', status: 'Active', created_at: '2026-02-10 10:00:00' },
    { id: 'USR-005', name: 'Aditya Verma (Lead Dev)', email: 'aditya.dev@neuorzin.com', role: 'Developer', department: 'Development', phone: '+91 96541 22334', status: 'Active', created_at: '2026-02-20 10:00:00' }
  ],
  aiConfig: {
    is_configured: false,
    masked_key: '',
    model_name: 'gemini-1.5-pro',
    temperature: 0.70
  }
};

const CACHE_STORAGE_KEY = 'neuorzin_crm_cache_v3';

export function getCachedCrmData() {
  if (typeof window === 'undefined') return INITIAL_CRM_DATA;
  try {
    const raw = localStorage.getItem(CACHE_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && Array.isArray(parsed.leads) && parsed.leads.length > 0) {
        return {
          leads: parsed.leads || INITIAL_CRM_DATA.leads,
          deals: (Array.isArray(parsed.deals) && parsed.deals.length > 0) ? parsed.deals : INITIAL_CRM_DATA.deals,
          quotations: (Array.isArray(parsed.quotations) && parsed.quotations.length > 0) ? parsed.quotations : INITIAL_CRM_DATA.quotations,
          invoices: (Array.isArray(parsed.invoices) && parsed.invoices.length > 0) ? parsed.invoices : INITIAL_CRM_DATA.invoices,
          projects: (Array.isArray(parsed.projects) && parsed.projects.length > 0) ? parsed.projects : INITIAL_CRM_DATA.projects,
          tasks: (Array.isArray(parsed.tasks) && parsed.tasks.length > 0) ? parsed.tasks : INITIAL_CRM_DATA.tasks,
          activities: (Array.isArray(parsed.activities) && parsed.activities.length > 0) ? parsed.activities : INITIAL_CRM_DATA.activities,
          notifications: (Array.isArray(parsed.notifications) && parsed.notifications.length > 0) ? parsed.notifications : INITIAL_CRM_DATA.notifications,
          auditLogs: (Array.isArray(parsed.auditLogs) && parsed.auditLogs.length > 0) ? parsed.auditLogs : INITIAL_CRM_DATA.auditLogs,
          campaigns: (Array.isArray(parsed.campaigns) && parsed.campaigns.length > 0) ? parsed.campaigns : INITIAL_CRM_DATA.campaigns,
          whatsappMessages: (Array.isArray(parsed.whatsappMessages) && parsed.whatsappMessages.length > 0) ? parsed.whatsappMessages : INITIAL_CRM_DATA.whatsappMessages,
          blogs: (Array.isArray(parsed.blogs) && parsed.blogs.length > 0) ? parsed.blogs : INITIAL_CRM_DATA.blogs,
          categories: (Array.isArray(parsed.categories) && parsed.categories.length > 0) ? parsed.categories : INITIAL_CRM_DATA.categories,
          tags: (Array.isArray(parsed.tags) && parsed.tags.length > 0) ? parsed.tags : INITIAL_CRM_DATA.tags,
          users: (Array.isArray(parsed.users) && parsed.users.length > 0) ? parsed.users : INITIAL_CRM_DATA.users,
          aiConfig: parsed.aiConfig || INITIAL_CRM_DATA.aiConfig
        };
      }
    }
  } catch (err) {
    console.warn('[CRM Cache] Using initial data fallback:', err);
  }
  return INITIAL_CRM_DATA;
}

export function saveCachedCrmData(data) {
  if (typeof window === 'undefined' || !data) return;
  try {
    localStorage.setItem(CACHE_STORAGE_KEY, JSON.stringify(data));
  } catch (err) {
    console.warn('[CRM Cache] Failed saving cache snapshot:', err);
  }
}


import { EMAIL_CONFIG } from './emailConfig';
export const navLinks = [
  { name: 'Home', href: '/' },
  {
    name: 'Services',
    href: '/services',
    hasDropdown: true,
    dropdownItems: [
      {
        category: 'Growth & Marketing',
        items: [
          {
            title: 'Sales & Marketing Growth Engines',
            desc: 'Multi-channel acquisition, programmatic SEO, inbound pipelines & CRO',
            href: '/services/sales-marketing',
            badge: 'Growth'
          },
          {
            title: 'CRM & Revenue Operations',
            desc: 'HubSpot & Salesforce automation, lead enrichment & pipeline telemetry',
            href: '/services/crm-revenue-operations',
            badge: 'RevOps'
          }
        ]
      },
      {
        category: 'Product Intelligence',
        items: [
          {
            title: 'Intelligent Autonomous Systems',
            desc: 'Multi-agent cognitive workflows & autonomous decision engines',
            href: '/services/intelligent-autonomous-systems',
            badge: 'Pillar 1'
          },
          {
            title: 'AI-Driven Quality Automation',
            desc: 'Continuous automated validation, self-healing tests & QA intelligence',
            href: '/services/ai-driven-quality-automation',
            badge: 'Automation'
          }
        ]
      },
      {
        category: 'Data & AI',
        items: [
          {
            title: 'Enterprise Data Operations',
            desc: 'Snowflake migrations, data mesh architectures & real-time telemetry',
            href: '/services/enterprise-data-operations',
            badge: 'Pillar 2'
          },
          {
            title: 'Business AI Implementation',
            desc: 'Private RAG architectures, customized LLMs & cognitive automation',
            href: '/services/business-ai-implementation',
            badge: 'Enterprise AI'
          }
        ]
      },
      {
        category: 'Cloud Platform',
        items: [
          {
            title: 'Cloud Performance Management',
            desc: 'High-availability multi-cloud orchestration & Kubernetes tuning',
            href: '/services/cloud-performance-management',
            badge: 'Pillar 3'
          },
          {
            title: 'Cloud Cost Intelligence',
            desc: 'FinOps telemetry, automated right-sizing & cloud spend reduction',
            href: '/services/cloud-cost-intelligence',
            badge: 'FinOps'
          },
          {
            title: 'Seamless Cloud Transitioning',
            desc: 'Zero-downtime legacy migration, containerization & IaC automation',
            href: '/services/seamless-cloud-transitioning',
            badge: 'Migration'
          }
        ]
      },
      {
        category: 'Quantum Computing',
        items: [
          {
            title: 'Quantum-Enhanced Machine Learning',
            desc: 'Hybrid quantum-classical optimization & QSVM for complex models',
            href: '/services/quantum-enhanced-machine-learning',
            badge: 'Pillar 4'
          },
          {
            title: 'On-Demand Quantum Compute',
            desc: 'Access to QPU backends, circuit simulation & post-quantum security',
            href: '/services/on-demand-quantum-compute',
            badge: 'Deep Tech'
          }
        ]
      }
    ]
  },
  {
    name: 'Resources',
    href: '/insights',
    hasDropdown: true,
    dropdownItems: [
      {
        category: 'Knowledge & Updates',
        items: [
          { title: 'Insights', desc: 'Deep-dive architectural research & technical papers', href: '/insights', badge: 'Research' },
          { title: 'Newsroom', desc: 'Company press releases, milestones & media kits', href: '/newsroom', badge: 'Latest' },
          { title: 'Gallery', desc: 'Visual showcase of deployed client systems & UI systems', href: '/gallery', badge: 'Showcase' },
        ]
      }
    ]
  },
  {
    name: 'Company',
    href: '/about',
    hasDropdown: true,
    dropdownItems: [
      {
        category: 'About NeuOrzin',
        items: [
          { title: 'About Us', desc: 'Our mission, engineering culture & leadership team', href: '/about' },
          { title: 'Our Approach', desc: 'A strategic, engineering-driven 6-step methodology', href: '/approach' },
          { title: 'Meet Our Team', desc: 'World-class architects, researchers & engineers', href: '/careers', badge: 'Hiring' },
          { title: 'Industry Verticals', desc: 'Retail, Manufacturing, Real Estate, EduTech & CPG', href: '/industries' },
          { title: 'FAQ', desc: 'Engagement models, delivery timelines & IP security', href: '/faq' },
        ]
      }
    ]
  },
  { name: 'Blog', href: '/journal' },
  { name: 'Contact Us', href: '/contact' }
];

export const companyContact = {
  phone: "77940 45500",
  rawPhone: "+917794045500",
  formattedPhone: "+91 77940 45500",
  email: EMAIL_CONFIG.general,
  address: "Visit Office: Hyderabad, India",
  city: "Hyderabad, India",
  officeHours: "Mon – Fri: 9:00 AM – 7:00 PM IST",
  socials: [
    { name: 'LinkedIn', href: 'https://www.linkedin.com/', icon: 'Linkedin' },
    { name: 'Twitter', href: 'https://twitter.com/', icon: 'Twitter' },
    { name: 'Instagram', href: 'https://www.instagram.com/', icon: 'Instagram' },
    { name: 'Facebook', href: 'https://www.facebook.com/', icon: 'Facebook' },
  ]
};

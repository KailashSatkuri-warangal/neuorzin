export const navLinks = [
  { name: 'Home', href: '/' },
  {
    name: 'Services',
    href: '/services',
    hasDropdown: true,
    dropdownItems: [
      {
        category: 'Core Engineering',
        items: [
          { title: 'Product Engineering', desc: 'Scalable web, mobile apps & fast MVP launches', href: '/services/product-engineering', badge: 'Popular' },
          { title: 'AI & Autonomous Automation', desc: 'Agent swarms & enterprise LLM workflows', href: '/services/ai-automation', badge: 'Next-Gen' },
        ]
      },
      {
        category: 'Data & Cloud',
        items: [
          { title: 'Data Engineering & Analytics', desc: 'Snowflake migrations & real-time pipelines', href: '/services/data-engineering', badge: 'Core' },
          { title: 'Cloud Performance & FinOps', desc: 'Cost intelligence & high-availability tuning', href: '/services/cloud-performance' },
        ]
      },
      {
        category: 'Next-Gen Innovation',
        items: [
          { title: 'Quantum Machine Learning', desc: 'Hybrid quantum-classical optimization', href: '/services/quantum-innovation', badge: 'R&D' },
          { title: 'Growth Engines & Reach', desc: 'Programmatic SEO & high-conversion funnels', href: '/services/sales-marketing' },
        ]
      }
    ]
  },
  { name: 'About', href: '/about' },
  { name: 'Industries', href: '/industries' },
  { name: 'Work', href: '/projects' },
  { name: 'Approach', href: '/approach' },
  { name: 'Journal', href: '/journal' },
  {
    name: 'More',
    href: '/about',
    hasDropdown: true,
    dropdownItems: [
      {
        category: 'Company & Resources',
        items: [
          { title: 'Careers', desc: 'Join our elite engineering pods (We are hiring!)', href: '/careers', badge: 'Hiring' },
          { title: 'FAQ', desc: 'Everything about our engagement & delivery', href: '/faq' },
          { title: 'Contact Us', desc: 'Reach our global offices & start a project', href: '/contact' },
        ]
      }
    ]
  },
];

export const companyContact = {
  phone: "+02)-574-328-301",
  email: "info@neuorzin.com",
  address: "HITEC City Tech Park, Phase 2, Hyderabad, Telangana, India",
  officeHours: "Mon – Fri: 9:00 AM – 7:00 PM IST",
  socials: [
    { name: 'LinkedIn', href: 'https://www.linkedin.com/', icon: 'Linkedin' },
    { name: 'Twitter', href: 'https://twitter.com/', icon: 'Twitter' },
    { name: 'Instagram', href: 'https://www.instagram.com/', icon: 'Instagram' },
    { name: 'Facebook', href: 'https://www.facebook.com/', icon: 'Facebook' },
  ]
};

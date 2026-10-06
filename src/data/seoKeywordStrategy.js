// =====================================================================
// NEUORIZIN INDIA + GLOBAL COMMERCIAL SEO KEYWORD STRATEGY MATRIX
// High-Commercial-Intent, Geographically Clustered, Priority-Scored
// =====================================================================

export const SEO_PRIORITY_LEVELS = {
  P0: { label: 'P0 — Brand & Entity (Highest Priority)', scoreRange: '9.5 - 10.0', intent: 'Navigational & Direct Brand Authority' },
  P1: { label: 'P1 — High-Value Commercial Intent', scoreRange: '8.5 - 9.4', intent: 'High Buying Intent / Procurement / RFPs' },
  P2: { label: 'P2 — Top / Leading / Best Discovery', scoreRange: '7.5 - 8.4', intent: 'Vendor Selection & Comparative Shortlisting' },
  P3: { label: 'P3 — Technical Deep-Dives & Long-Tail', scoreRange: '6.5 - 7.4', intent: 'Architectural Research & Problem Solution' },
  P4: { label: 'P4 — Emerging & Frontier Tech', scoreRange: '5.5 - 6.4', intent: 'Future-Proofing & Pioneer Positioning' }
};

export const SEO_GEOGRAPHIC_CLUSTERS = {
  national: {
    region: 'India',
    marketDescription: 'Pan-India Enterprise, Tier-1 Tech Hubs (Bengaluru, Hyderabad, Mumbai, Delhi-NCR, Pune, Chennai)',
    primaryHubs: ['Hyderabad', 'Bengaluru', 'Mumbai', 'Delhi-NCR', 'Pune']
  },
  regional: {
    state: 'Telangana',
    description: 'Telangana State Innovation Corridor & IT Hub',
    targetSectors: ['Enterprise IT', 'Pharma Tech', 'Fintech', 'GovTech', 'SaaS']
  },
  local: {
    city: 'Hyderabad',
    techCorridors: ['HITEC City', 'Financial District Gachibowli', 'Madhapur', 'Kondapur'],
    description: 'Cyberabad Enterprise Technology & Global Capability Centers (GCCs)'
  },
  global: {
    markets: ['United States', 'United Kingdom', 'Middle East (UAE / Saudi Arabia)', 'Singapore / APAC'],
    targetAudience: ['CTOs', 'VPs of Engineering', 'Heads of Growth', 'Procurement Officers']
  }
};

export const NEUORIZIN_KEYWORD_STRATEGY = {
  // -------------------------------------------------------------------
  // P0 — BRAND & ENTITY KEYWORDS
  // -------------------------------------------------------------------
  p0_brand: [
    { keyword: 'Neuorizin', score: 10.0, category: 'Brand Core', intent: 'Navigational' },
    { keyword: 'Neuorizin India', score: 10.0, category: 'Brand Geography', intent: 'Navigational' },
    { keyword: 'Neuorizin Hyderabad', score: 9.9, category: 'Brand Geography', intent: 'Navigational' },
    { keyword: 'Neuorizin technology', score: 9.8, category: 'Brand Entity', intent: 'Brand Commercial' },
    { keyword: 'Neuorizin AI', score: 9.9, category: 'Brand Capability', intent: 'Brand Commercial' },
    { keyword: 'Neuorizin AI company', score: 9.8, category: 'Brand Entity', intent: 'Brand Commercial' },
    { keyword: 'Neuorizin technology company', score: 9.8, category: 'Brand Entity', intent: 'Brand Commercial' },
    { keyword: 'Neuorizin enterprise technology', score: 9.7, category: 'Brand Entity', intent: 'Brand Commercial' },
    { keyword: 'Neuorizin software company', score: 9.6, category: 'Brand Entity', intent: 'Brand Commercial' },
    { keyword: 'Neuorizin AI solutions', score: 9.8, category: 'Brand Services', intent: 'Brand Commercial' },
    { keyword: 'Neuorizin cloud solutions', score: 9.6, category: 'Brand Services', intent: 'Brand Commercial' },
    { keyword: 'Neuorizin data solutions', score: 9.6, category: 'Brand Services', intent: 'Brand Commercial' },
    { keyword: 'Neuorizin autonomous systems', score: 9.7, category: 'Brand Services', intent: 'Brand Commercial' },
    { keyword: 'Neuorizin quantum computing', score: 9.7, category: 'Brand Services', intent: 'Brand Commercial' }
  ],

  // -------------------------------------------------------------------
  // PILLAR 1: GROWTH & MARKETING
  // -------------------------------------------------------------------
  growth_marketing: {
    pillar: 'Growth Engineering & Revenue Operations',
    subpillars: {
      programmatic_seo: [
        { keyword: 'programmatic SEO company India', priority: 'P1', score: 9.3, searchVolumeEst: 'High Intent', landingPage: '/services/programmatic-seo' },
        { keyword: 'programmatic SEO agency India', priority: 'P1', score: 9.1, searchVolumeEst: 'High Intent', landingPage: '/services/programmatic-seo' },
        { keyword: 'programmatic SEO services India', priority: 'P1', score: 9.2, searchVolumeEst: 'High Intent', landingPage: '/services/programmatic-seo' },
        { keyword: 'enterprise programmatic SEO India', priority: 'P1', score: 9.4, searchVolumeEst: 'Enterprise RFP', landingPage: '/services/programmatic-seo' },
        { keyword: 'top programmatic SEO companies India', priority: 'P2', score: 8.6, searchVolumeEst: 'Discovery', landingPage: '/blog/top-programmatic-seo-companies-india' },
        { keyword: 'leading programmatic SEO agencies India', priority: 'P2', score: 8.4, searchVolumeEst: 'Discovery', landingPage: '/blog/top-programmatic-seo-companies-india' },
        { keyword: 'programmatic SEO Hyderabad', priority: 'P1', score: 8.9, searchVolumeEst: 'Regional Intent', landingPage: '/services/programmatic-seo' },
        { keyword: 'enterprise SEO services India', priority: 'P1', score: 9.1, searchVolumeEst: 'High Intent', landingPage: '/services/enterprise-seo' },
        { keyword: 'B2B SEO company India', priority: 'P1', score: 9.0, searchVolumeEst: 'High Intent', landingPage: '/services/b2b-seo' },
        { keyword: 'technical SEO company India', priority: 'P1', score: 8.8, searchVolumeEst: 'Commercial', landingPage: '/services/technical-seo' }
      ],
      growth_marketing_cro: [
        { keyword: 'growth marketing company India', priority: 'P1', score: 9.1, searchVolumeEst: 'High Intent', landingPage: '/services/growth-marketing' },
        { keyword: 'B2B growth marketing India', priority: 'P1', score: 9.2, searchVolumeEst: 'High Intent', landingPage: '/services/growth-marketing' },
        { keyword: 'enterprise growth marketing India', priority: 'P1', score: 9.3, searchVolumeEst: 'High Intent', landingPage: '/services/growth-marketing' },
        { keyword: 'growth engineering company India', priority: 'P1', score: 9.0, searchVolumeEst: 'High Intent', landingPage: '/services/growth-engineering' },
        { keyword: 'top growth marketing companies India', priority: 'P2', score: 8.5, searchVolumeEst: 'Discovery', landingPage: '/blog/top-growth-marketing-companies-india' },
        { keyword: 'leading growth marketing agencies India', priority: 'P2', score: 8.3, searchVolumeEst: 'Discovery', landingPage: '/blog/top-growth-marketing-companies-india' },
        { keyword: 'growth marketing Hyderabad', priority: 'P1', score: 8.8, searchVolumeEst: 'Regional Intent', landingPage: '/services/growth-marketing' },
        { keyword: 'CRO company India', priority: 'P1', score: 8.9, searchVolumeEst: 'High Intent', landingPage: '/services/cro' },
        { keyword: 'conversion rate optimization India', priority: 'P1', score: 9.0, searchVolumeEst: 'High Intent', landingPage: '/services/cro' },
        { keyword: 'CRO services India', priority: 'P1', score: 8.8, searchVolumeEst: 'Commercial', landingPage: '/services/cro' },
        { keyword: 'enterprise CRO services India', priority: 'P1', score: 9.1, searchVolumeEst: 'Enterprise RFP', landingPage: '/services/cro' },
        { keyword: 'top CRO agencies India', priority: 'P2', score: 8.2, searchVolumeEst: 'Discovery', landingPage: '/blog/top-cro-agencies-india' },
        { keyword: 'conversion optimization Hyderabad', priority: 'P1', score: 8.6, searchVolumeEst: 'Regional Intent', landingPage: '/services/cro' }
      ],
      crm_revops: [
        { keyword: 'CRM automation company India', priority: 'P1', score: 9.2, searchVolumeEst: 'High Intent', landingPage: '/services/crm-revops' },
        { keyword: 'HubSpot automation company India', priority: 'P1', score: 9.1, searchVolumeEst: 'High Intent', landingPage: '/services/crm-revops' },
        { keyword: 'Salesforce automation company India', priority: 'P1', score: 9.3, searchVolumeEst: 'High Intent', landingPage: '/services/crm-revops' },
        { keyword: 'RevOps consulting India', priority: 'P1', score: 9.2, searchVolumeEst: 'High Intent', landingPage: '/services/crm-revops' },
        { keyword: 'revenue operations company India', priority: 'P1', score: 9.1, searchVolumeEst: 'Commercial', landingPage: '/services/crm-revops' },
        { keyword: 'sales automation company India', priority: 'P1', score: 8.9, searchVolumeEst: 'Commercial', landingPage: '/services/crm-revops' },
        { keyword: 'lead enrichment services India', priority: 'P1', score: 8.7, searchVolumeEst: 'Commercial', landingPage: '/services/crm-revops' },
        { keyword: 'CRM consulting Hyderabad', priority: 'P1', score: 8.9, searchVolumeEst: 'Regional Intent', landingPage: '/services/crm-revops' },
        { keyword: 'top CRM automation companies India', priority: 'P2', score: 8.4, searchVolumeEst: 'Discovery', landingPage: '/blog/top-crm-automation-companies-india' }
      ]
    }
  },

  // -------------------------------------------------------------------
  // PILLAR 2: INTELLIGENT AUTONOMOUS SYSTEMS & AI QA
  // -------------------------------------------------------------------
  autonomous_systems: {
    pillar: 'Agentic AI & Autonomous Systems',
    subpillars: {
      agentic_ai: [
        { keyword: 'agentic AI company India', priority: 'P1', score: 9.8, searchVolumeEst: 'Tier-1 Priority', landingPage: '/services/agentic-ai' },
        { keyword: 'agentic AI development company India', priority: 'P1', score: 9.7, searchVolumeEst: 'Tier-1 Priority', landingPage: '/services/agentic-ai' },
        { keyword: 'AI agent development India', priority: 'P1', score: 9.6, searchVolumeEst: 'High Intent', landingPage: '/services/agentic-ai' },
        { keyword: 'AI agent development company India', priority: 'P1', score: 9.7, searchVolumeEst: 'Tier-1 Priority', landingPage: '/services/agentic-ai' },
        { keyword: 'enterprise AI agents India', priority: 'P1', score: 9.6, searchVolumeEst: 'Enterprise RFP', landingPage: '/services/agentic-ai' },
        { keyword: 'multi-agent AI company India', priority: 'P1', score: 9.5, searchVolumeEst: 'High Intent', landingPage: '/services/agentic-ai' },
        { keyword: 'multi-agent systems India', priority: 'P1', score: 9.3, searchVolumeEst: 'Technical RFP', landingPage: '/services/agentic-ai' },
        { keyword: 'autonomous AI company India', priority: 'P1', score: 9.5, searchVolumeEst: 'Commercial', landingPage: '/services/autonomous-systems' },
        { keyword: 'autonomous AI systems India', priority: 'P1', score: 9.3, searchVolumeEst: 'Commercial', landingPage: '/services/autonomous-systems' },
        { keyword: 'AI workflow automation India', priority: 'P1', score: 9.4, searchVolumeEst: 'High Intent', landingPage: '/services/autonomous-systems' },
        { keyword: 'enterprise AI automation India', priority: 'P1', score: 9.5, searchVolumeEst: 'Enterprise RFP', landingPage: '/services/autonomous-systems' },
        { keyword: 'cognitive automation India', priority: 'P1', score: 9.1, searchVolumeEst: 'Commercial', landingPage: '/services/autonomous-systems' },
        { keyword: 'autonomous decision systems India', priority: 'P1', score: 9.2, searchVolumeEst: 'Commercial', landingPage: '/services/autonomous-systems' },
        { keyword: 'AI orchestration company India', priority: 'P1', score: 9.3, searchVolumeEst: 'High Intent', landingPage: '/services/autonomous-systems' },
        { keyword: 'top agentic AI companies India', priority: 'P2', score: 8.8, searchVolumeEst: 'Discovery', landingPage: '/blog/top-agentic-ai-companies-india' },
        { keyword: 'leading agentic AI companies India', priority: 'P2', score: 8.7, searchVolumeEst: 'Discovery', landingPage: '/blog/top-agentic-ai-companies-india' },
        { keyword: 'best AI agent development companies India', priority: 'P2', score: 8.8, searchVolumeEst: 'Discovery', landingPage: '/blog/top-agentic-ai-companies-india' },
        { keyword: 'agentic AI Hyderabad', priority: 'P1', score: 9.2, searchVolumeEst: 'Regional Intent', landingPage: '/services/agentic-ai' },
        { keyword: 'AI agent development Hyderabad', priority: 'P1', score: 9.3, searchVolumeEst: 'Regional Intent', landingPage: '/services/agentic-ai' }
      ],
      ai_quality_automation: [
        { keyword: 'AI testing company India', priority: 'P1', score: 9.2, searchVolumeEst: 'High Intent', landingPage: '/services/ai-qa-automation' },
        { keyword: 'AI test automation India', priority: 'P1', score: 9.1, searchVolumeEst: 'High Intent', landingPage: '/services/ai-qa-automation' },
        { keyword: 'AI QA automation India', priority: 'P1', score: 9.3, searchVolumeEst: 'High Intent', landingPage: '/services/ai-qa-automation' },
        { keyword: 'AI software testing company India', priority: 'P1', score: 9.0, searchVolumeEst: 'High Intent', landingPage: '/services/ai-qa-automation' },
        { keyword: 'autonomous testing India', priority: 'P1', score: 9.1, searchVolumeEst: 'Commercial', landingPage: '/services/ai-qa-automation' },
        { keyword: 'self-healing test automation India', priority: 'P1', score: 9.4, searchVolumeEst: 'High Intent', landingPage: '/services/ai-qa-automation' },
        { keyword: 'intelligent QA automation India', priority: 'P1', score: 9.0, searchVolumeEst: 'Commercial', landingPage: '/services/ai-qa-automation' },
        { keyword: 'AI quality engineering India', priority: 'P1', score: 9.1, searchVolumeEst: 'Commercial', landingPage: '/services/ai-qa-automation' },
        { keyword: 'autonomous QA company India', priority: 'P1', score: 9.2, searchVolumeEst: 'Commercial', landingPage: '/services/ai-qa-automation' },
        { keyword: 'top AI testing companies India', priority: 'P2', score: 8.4, searchVolumeEst: 'Discovery', landingPage: '/blog/top-ai-testing-companies-india' },
        { keyword: 'leading AI QA companies India', priority: 'P2', score: 8.3, searchVolumeEst: 'Discovery', landingPage: '/blog/top-ai-testing-companies-india' }
      ]
    }
  },

  // -------------------------------------------------------------------
  // PILLAR 3: DATA & AI (DATA ENGINEERING, SNOWFLAKE, RAG & LLMs)
  // -------------------------------------------------------------------
  data_and_ai: {
    pillar: 'Data Architecture, Snowflake & Enterprise AI',
    subpillars: {
      data_engineering: [
        { keyword: 'data engineering company India', priority: 'P1', score: 9.5, searchVolumeEst: 'High Intent', landingPage: '/services/data-engineering' },
        { keyword: 'enterprise data engineering India', priority: 'P1', score: 9.6, searchVolumeEst: 'Enterprise RFP', landingPage: '/services/data-engineering' },
        { keyword: 'data engineering services India', priority: 'P1', score: 9.4, searchVolumeEst: 'Commercial', landingPage: '/services/data-engineering' },
        { keyword: 'data platform company India', priority: 'P1', score: 9.2, searchVolumeEst: 'Commercial', landingPage: '/services/data-engineering' },
        { keyword: 'data modernization company India', priority: 'P1', score: 9.3, searchVolumeEst: 'Enterprise RFP', landingPage: '/services/data-engineering' },
        { keyword: 'data architecture consulting India', priority: 'P1', score: 9.3, searchVolumeEst: 'Consulting', landingPage: '/services/data-engineering' },
        { keyword: 'data mesh consulting India', priority: 'P1', score: 9.4, searchVolumeEst: 'Advanced RFP', landingPage: '/services/data-engineering' },
        { keyword: 'real-time data engineering India', priority: 'P1', score: 9.3, searchVolumeEst: 'Commercial', landingPage: '/services/data-engineering' },
        { keyword: 'data pipeline development India', priority: 'P1', score: 9.1, searchVolumeEst: 'Development', landingPage: '/services/data-engineering' },
        { keyword: 'data observability India', priority: 'P1', score: 8.9, searchVolumeEst: 'Emerging', landingPage: '/services/data-engineering' },
        { keyword: 'top data engineering companies India', priority: 'P2', score: 8.7, searchVolumeEst: 'Discovery', landingPage: '/blog/top-data-engineering-companies-india' },
        { keyword: 'leading data engineering companies India', priority: 'P2', score: 8.6, searchVolumeEst: 'Discovery', landingPage: '/blog/top-data-engineering-companies-india' },
        { keyword: 'data engineering Hyderabad', priority: 'P1', score: 9.2, searchVolumeEst: 'Regional Intent', landingPage: '/services/data-engineering' }
      ],
      snowflake: [
        { keyword: 'Snowflake consulting India', priority: 'P1', score: 9.4, searchVolumeEst: 'High Intent', landingPage: '/services/snowflake' },
        { keyword: 'Snowflake migration India', priority: 'P1', score: 9.5, searchVolumeEst: 'High Intent', landingPage: '/services/snowflake' },
        { keyword: 'Snowflake migration company India', priority: 'P1', score: 9.4, searchVolumeEst: 'Commercial', landingPage: '/services/snowflake' },
        { keyword: 'Snowflake consulting company India', priority: 'P1', score: 9.3, searchVolumeEst: 'Commercial', landingPage: '/services/snowflake' },
        { keyword: 'Snowflake data engineering India', priority: 'P1', score: 9.3, searchVolumeEst: 'Commercial', landingPage: '/services/snowflake' },
        { keyword: 'enterprise Snowflake services India', priority: 'P1', score: 9.4, searchVolumeEst: 'Enterprise RFP', landingPage: '/services/snowflake' },
        { keyword: 'top Snowflake consulting companies India', priority: 'P2', score: 8.6, searchVolumeEst: 'Discovery', landingPage: '/blog/top-snowflake-consulting-companies-india' }
      ],
      business_ai_rag_llm: [
        { keyword: 'enterprise AI implementation India', priority: 'P1', score: 9.7, searchVolumeEst: 'Enterprise RFP', landingPage: '/services/enterprise-ai' },
        { keyword: 'private RAG company India', priority: 'P1', score: 9.6, searchVolumeEst: 'High Intent', landingPage: '/services/private-rag' },
        { keyword: 'RAG development company India', priority: 'P1', score: 9.5, searchVolumeEst: 'High Intent', landingPage: '/services/private-rag' },
        { keyword: 'RAG implementation India', priority: 'P1', score: 9.4, searchVolumeEst: 'Commercial', landingPage: '/services/private-rag' },
        { keyword: 'enterprise RAG solutions India', priority: 'P1', score: 9.6, searchVolumeEst: 'Enterprise RFP', landingPage: '/services/private-rag' },
        { keyword: 'custom LLM development India', priority: 'P1', score: 9.6, searchVolumeEst: 'High Intent', landingPage: '/services/custom-llm' },
        { keyword: 'LLM development company India', priority: 'P1', score: 9.5, searchVolumeEst: 'Commercial', landingPage: '/services/custom-llm' },
        { keyword: 'LLM application development India', priority: 'P1', score: 9.4, searchVolumeEst: 'Development', landingPage: '/services/custom-llm' },
        { keyword: 'generative AI company India', priority: 'P1', score: 9.6, searchVolumeEst: 'High Volume', landingPage: '/services/generative-ai' },
        { keyword: 'enterprise generative AI India', priority: 'P1', score: 9.7, searchVolumeEst: 'Enterprise RFP', landingPage: '/services/generative-ai' },
        { keyword: 'private AI company India', priority: 'P1', score: 9.3, searchVolumeEst: 'Security/Fintech', landingPage: '/services/private-rag' },
        { keyword: 'AI copilot development India', priority: 'P1', score: 9.3, searchVolumeEst: 'Commercial', landingPage: '/services/custom-llm' },
        { keyword: 'AI implementation company Hyderabad', priority: 'P1', score: 9.2, searchVolumeEst: 'Regional Intent', landingPage: '/services/enterprise-ai' },
        { keyword: 'RAG development Hyderabad', priority: 'P1', score: 9.1, searchVolumeEst: 'Regional Intent', landingPage: '/services/private-rag' },
        { keyword: 'custom LLM development Hyderabad', priority: 'P1', score: 9.2, searchVolumeEst: 'Regional Intent', landingPage: '/services/custom-llm' },
        { keyword: 'top generative AI companies India', priority: 'P2', score: 8.8, searchVolumeEst: 'Discovery', landingPage: '/blog/top-generative-ai-companies-india' },
        { keyword: 'leading enterprise AI companies India', priority: 'P2', score: 8.9, searchVolumeEst: 'Discovery', landingPage: '/blog/top-enterprise-ai-companies-india' }
      ]
    }
  },

  // -------------------------------------------------------------------
  // PILLAR 4: CLOUD PLATFORM (PERFORMANCE, FINOPS & MIGRATION)
  // -------------------------------------------------------------------
  cloud_platform: {
    pillar: 'Cloud Engineering, Kubernetes, FinOps & Migration',
    subpillars: {
      cloud_performance_k8s: [
        { keyword: 'cloud consulting company India', priority: 'P1', score: 9.3, searchVolumeEst: 'High Intent', landingPage: '/services/cloud-performance' },
        { keyword: 'cloud engineering company India', priority: 'P1', score: 9.3, searchVolumeEst: 'High Intent', landingPage: '/services/cloud-performance' },
        { keyword: 'cloud performance optimization India', priority: 'P1', score: 9.2, searchVolumeEst: 'Commercial', landingPage: '/services/cloud-performance' },
        { keyword: 'cloud infrastructure company India', priority: 'P1', score: 9.1, searchVolumeEst: 'Commercial', landingPage: '/services/cloud-performance' },
        { keyword: 'Kubernetes consulting company India', priority: 'P1', score: 9.4, searchVolumeEst: 'High Intent', landingPage: '/services/cloud-performance' },
        { keyword: 'Kubernetes optimization India', priority: 'P1', score: 9.2, searchVolumeEst: 'Technical', landingPage: '/services/cloud-performance' },
        { keyword: 'Kubernetes consulting Hyderabad', priority: 'P1', score: 8.9, searchVolumeEst: 'Regional Intent', landingPage: '/services/cloud-performance' },
        { keyword: 'multi-cloud consulting India', priority: 'P1', score: 9.2, searchVolumeEst: 'Enterprise RFP', landingPage: '/services/cloud-performance' },
        { keyword: 'cloud architecture consulting India', priority: 'P1', score: 9.3, searchVolumeEst: 'Consulting', landingPage: '/services/cloud-performance' },
        { keyword: 'enterprise cloud engineering India', priority: 'P1', score: 9.4, searchVolumeEst: 'Enterprise RFP', landingPage: '/services/cloud-performance' },
        { keyword: 'top cloud consulting companies India', priority: 'P2', score: 8.7, searchVolumeEst: 'Discovery', landingPage: '/blog/top-cloud-consulting-companies-india' },
        { keyword: 'leading cloud engineering companies India', priority: 'P2', score: 8.6, searchVolumeEst: 'Discovery', landingPage: '/blog/top-cloud-consulting-companies-india' }
      ],
      finops: [
        { keyword: 'FinOps consulting India', priority: 'P1', score: 9.5, searchVolumeEst: 'High Intent', landingPage: '/services/finops' },
        { keyword: 'cloud cost optimization India', priority: 'P1', score: 9.5, searchVolumeEst: 'High Intent', landingPage: '/services/finops' },
        { keyword: 'cloud cost management India', priority: 'P1', score: 9.3, searchVolumeEst: 'Commercial', landingPage: '/services/finops' },
        { keyword: 'AWS cost optimization India', priority: 'P1', score: 9.4, searchVolumeEst: 'Commercial', landingPage: '/services/finops' },
        { keyword: 'Azure cost optimization India', priority: 'P1', score: 9.3, searchVolumeEst: 'Commercial', landingPage: '/services/finops' },
        { keyword: 'Google Cloud cost optimization India', priority: 'P1', score: 9.2, searchVolumeEst: 'Commercial', landingPage: '/services/finops' },
        { keyword: 'cloud spend optimization India', priority: 'P1', score: 9.2, searchVolumeEst: 'Commercial', landingPage: '/services/finops' },
        { keyword: 'cloud right-sizing India', priority: 'P1', score: 9.0, searchVolumeEst: 'Technical', landingPage: '/services/finops' },
        { keyword: 'FinOps company India', priority: 'P1', score: 9.3, searchVolumeEst: 'Commercial', landingPage: '/services/finops' },
        { keyword: 'top FinOps companies India', priority: 'P2', score: 8.6, searchVolumeEst: 'Discovery', landingPage: '/blog/top-finops-companies-india' },
        { keyword: 'leading FinOps consulting companies India', priority: 'P2', score: 8.5, searchVolumeEst: 'Discovery', landingPage: '/blog/top-finops-companies-india' }
      ],
      cloud_migration: [
        { keyword: 'cloud migration company India', priority: 'P1', score: 9.5, searchVolumeEst: 'High Intent', landingPage: '/services/cloud-migration' },
        { keyword: 'cloud migration services India', priority: 'P1', score: 9.4, searchVolumeEst: 'Commercial', landingPage: '/services/cloud-migration' },
        { keyword: 'enterprise cloud migration India', priority: 'P1', score: 9.6, searchVolumeEst: 'Enterprise RFP', landingPage: '/services/cloud-migration' },
        { keyword: 'legacy application migration India', priority: 'P1', score: 9.3, searchVolumeEst: 'Commercial', landingPage: '/services/cloud-migration' },
        { keyword: 'application modernization India', priority: 'P1', score: 9.4, searchVolumeEst: 'High Intent', landingPage: '/services/cloud-migration' },
        { keyword: 'Kubernetes migration India', priority: 'P1', score: 9.2, searchVolumeEst: 'Technical', landingPage: '/services/cloud-migration' },
        { keyword: 'containerization services India', priority: 'P1', score: 9.1, searchVolumeEst: 'Technical', landingPage: '/services/cloud-migration' },
        { keyword: 'Terraform consulting India', priority: 'P1', score: 9.0, searchVolumeEst: 'Technical', landingPage: '/services/cloud-migration' },
        { keyword: 'Infrastructure as Code India', priority: 'P1', score: 9.1, searchVolumeEst: 'Technical', landingPage: '/services/cloud-migration' },
        { keyword: 'zero downtime migration India', priority: 'P1', score: 9.3, searchVolumeEst: 'High Intent', landingPage: '/services/cloud-migration' },
        { keyword: 'top cloud migration companies India', priority: 'P2', score: 8.6, searchVolumeEst: 'Discovery', landingPage: '/blog/top-cloud-migration-companies-india' },
        { keyword: 'leading cloud migration companies India', priority: 'P2', score: 8.5, searchVolumeEst: 'Discovery', landingPage: '/blog/top-cloud-migration-companies-india' }
      ]
    }
  },

  // -------------------------------------------------------------------
  // PILLAR 5: QUANTUM COMPUTING & QUANTUM COMPUTE
  // -------------------------------------------------------------------
  quantum_computing: {
    pillar: 'Quantum Computing, Hybrid QPU & Quantum ML',
    subpillars: {
      quantum_algorithms_ml: [
        { keyword: 'quantum computing company India', priority: 'P1', score: 9.4, searchVolumeEst: 'Pioneer Authority', landingPage: '/services/quantum-computing' },
        { keyword: 'quantum computing services India', priority: 'P1', score: 9.3, searchVolumeEst: 'Commercial', landingPage: '/services/quantum-computing' },
        { keyword: 'quantum AI company India', priority: 'P1', score: 9.5, searchVolumeEst: 'Pioneer Authority', landingPage: '/services/quantum-computing' },
        { keyword: 'quantum machine learning India', priority: 'P1', score: 9.4, searchVolumeEst: 'Specialized RFP', landingPage: '/services/quantum-computing' },
        { keyword: 'quantum ML company India', priority: 'P1', score: 9.3, searchVolumeEst: 'Specialized', landingPage: '/services/quantum-computing' },
        { keyword: 'quantum machine learning services India', priority: 'P1', score: 9.2, searchVolumeEst: 'Commercial', landingPage: '/services/quantum-computing' },
        { keyword: 'quantum optimization India', priority: 'P1', score: 9.1, searchVolumeEst: 'Specialized', landingPage: '/services/quantum-computing' },
        { keyword: 'hybrid quantum classical computing India', priority: 'P1', score: 9.2, searchVolumeEst: 'Advanced', landingPage: '/services/quantum-computing' },
        { keyword: 'quantum algorithm development India', priority: 'P1', score: 9.2, searchVolumeEst: 'Research / Dev', landingPage: '/services/quantum-computing' },
        { keyword: 'quantum computing Hyderabad', priority: 'P1', score: 9.0, searchVolumeEst: 'Regional Authority', landingPage: '/services/quantum-computing' },
        { keyword: 'quantum AI Hyderabad', priority: 'P1', score: 9.1, searchVolumeEst: 'Regional Authority', landingPage: '/services/quantum-computing' },
        { keyword: 'quantum computing solutions India', priority: 'P1', score: 9.2, searchVolumeEst: 'Commercial', landingPage: '/services/quantum-computing' },
        { keyword: 'top quantum computing companies India', priority: 'P2', score: 8.8, searchVolumeEst: 'Discovery', landingPage: '/blog/top-quantum-computing-companies-india' },
        { keyword: 'leading quantum computing companies India', priority: 'P2', score: 8.7, searchVolumeEst: 'Discovery', landingPage: '/blog/top-quantum-computing-companies-india' }
      ],
      quantum_compute_platform: [
        { keyword: 'quantum cloud computing India', priority: 'P1', score: 9.2, searchVolumeEst: 'Infrastructure', landingPage: '/services/quantum-compute' },
        { keyword: 'quantum computing platform India', priority: 'P1', score: 9.1, searchVolumeEst: 'Platform', landingPage: '/services/quantum-compute' },
        { keyword: 'QPU access India', priority: 'P1', score: 8.9, searchVolumeEst: 'Specialized', landingPage: '/services/quantum-compute' },
        { keyword: 'quantum compute services India', priority: 'P1', score: 9.0, searchVolumeEst: 'Commercial', landingPage: '/services/quantum-compute' },
        { keyword: 'quantum circuit simulation India', priority: 'P1', score: 8.8, searchVolumeEst: 'Specialized', landingPage: '/services/quantum-compute' },
        { keyword: 'quantum computing infrastructure India', priority: 'P1', score: 9.0, searchVolumeEst: 'Infrastructure', landingPage: '/services/quantum-compute' },
        { keyword: 'post-quantum security India', priority: 'P1', score: 9.3, searchVolumeEst: 'Security/Enterprise', landingPage: '/services/quantum-compute' }
      ]
    }
  },

  // -------------------------------------------------------------------
  // GEOGRAPHIC CLUSTER KEYWORDS (HYDERABAD & TELANGANA FOCUS)
  // -------------------------------------------------------------------
  geo_hyderabad_telangana: [
    { keyword: 'AI company Hyderabad', priority: 'P1', score: 9.6, area: 'Hyderabad', landingPage: '/locations/hyderabad' },
    { keyword: 'AI development company Hyderabad', priority: 'P1', score: 9.7, area: 'Hyderabad', landingPage: '/locations/hyderabad' },
    { keyword: 'enterprise AI Hyderabad', priority: 'P1', score: 9.5, area: 'Hyderabad', landingPage: '/locations/hyderabad' },
    { keyword: 'AI automation Hyderabad', priority: 'P1', score: 9.4, area: 'Hyderabad', landingPage: '/locations/hyderabad' },
    { keyword: 'AI agent development Hyderabad', priority: 'P1', score: 9.6, area: 'Hyderabad', landingPage: '/locations/hyderabad' },
    { keyword: 'data engineering Hyderabad', priority: 'P1', score: 9.4, area: 'Hyderabad', landingPage: '/locations/hyderabad' },
    { keyword: 'cloud consulting Hyderabad', priority: 'P1', score: 9.2, area: 'Hyderabad', landingPage: '/locations/hyderabad' },
    { keyword: 'cloud migration Hyderabad', priority: 'P1', score: 9.3, area: 'Hyderabad', landingPage: '/locations/hyderabad' },
    { keyword: 'software engineering Hyderabad', priority: 'P1', score: 9.1, area: 'Hyderabad', landingPage: '/locations/hyderabad' },
    { keyword: 'enterprise technology Hyderabad', priority: 'P1', score: 9.3, area: 'Hyderabad', landingPage: '/locations/hyderabad' },
    { keyword: 'AI company Telangana', priority: 'P1', score: 9.1, area: 'Telangana', landingPage: '/locations/telangana' },
    { keyword: 'AI solutions Telangana', priority: 'P1', score: 9.0, area: 'Telangana', landingPage: '/locations/telangana' },
    { keyword: 'enterprise technology Telangana', priority: 'P1', score: 9.1, area: 'Telangana', landingPage: '/locations/telangana' },
    { keyword: 'AI automation Telangana', priority: 'P1', score: 9.0, area: 'Telangana', landingPage: '/locations/telangana' },
    { keyword: 'cloud solutions Telangana', priority: 'P1', area: 'Telangana', score: 8.9, landingPage: '/locations/telangana' },
    { keyword: 'data engineering Telangana', priority: 'P1', area: 'Telangana', score: 9.0, landingPage: '/locations/telangana' }
  ]
};

// ---------------------------------------------------------------------
// SEARCH INTENT MODIFIER MATRIX GENERATOR
// Programmatically applies modifiers across Neuorzin service pillars
// ---------------------------------------------------------------------
export const SEARCH_INTENT_MODIFIERS = {
  commercial: ['services', 'company', 'provider', 'solutions', 'consulting', 'implementation', 'development'],
  discovery: ['top', 'leading', 'best', 'trusted', 'recommended'],
  geography: ['India', 'Hyderabad', 'Telangana', 'global'],
  enterprise: ['enterprise', 'B2B', 'large-scale', 'production', 'business']
};

export function generateKeywordVariations(serviceName) {
  const variations = [];
  const geo = ['India', 'Hyderabad'];
  
  // 1. Direct commercial
  for (const c of SEARCH_INTENT_MODIFIERS.commercial) {
    for (const g of geo) {
      variations.push(`${serviceName} ${c} ${g}`);
    }
  }

  // 2. Enterprise commercial
  for (const c of ['solutions', 'implementation', 'services', 'development']) {
    variations.push(`enterprise ${serviceName} ${c} India`);
    variations.push(`enterprise ${serviceName} ${c} Hyderabad`);
  }

  // 3. Discovery / comparative
  for (const d of ['top', 'leading', 'best']) {
    variations.push(`${d} ${serviceName} companies in India`);
    variations.push(`${d} ${serviceName} providers in India`);
  }

  return Array.from(new Set(variations));
}

// ---------------------------------------------------------------------
// KEYWORD PRIORITY SCORING ALGORITHM
// Score = Commercial Intent (0-3) + Relevance (0-2) + Demand (0-2) +
//         Conversion Potential (0-1.5) + Brand Value (0-1) + Geo Relevance (0-0.5)
// ---------------------------------------------------------------------
export function calculateKeywordPriorityScore({
  commercialIntent = 2.5,     // 0 (pure informational) to 3.0 (procurement/RFP)
  relevance = 2.0,            // 0 to 2.0 (direct core competence of Neuorzin)
  searchDemand = 1.5,         // 0 to 2.0 (commercial search volume)
  conversionPotential = 1.5,  // 0 to 1.5 (likelihood to yield discovery call/audit)
  brandValue = 1.0,           // 0 to 1.0 (reinforces Neuorzin technical authority)
  geoRelevance = 0.5          // 0 to 0.5 (matches India / Hyderabad / global target markets)
}) {
  const raw = commercialIntent + relevance + searchDemand + conversionPotential + brandValue + geoRelevance;
  const score = Math.min(10, Math.max(1, Number(raw.toFixed(1))));

  let priority = 'P3';
  if (score >= 9.5) priority = 'P0';
  else if (score >= 8.5) priority = 'P1';
  else if (score >= 7.5) priority = 'P2';
  else if (score >= 6.5) priority = 'P3';
  else priority = 'P4';

  return { score, priority };
}

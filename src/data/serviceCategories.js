// NeuOrzin Service Pillars, Automated Categories, and AI Topic Recommendations

export const NEUORZIN_SERVICE_CATEGORIES = [
  {
    name: 'Sales & Marketing Growth Engines',
    slug: 'sales-marketing-growth',
    pillar: 'Growth & Marketing',
    description: 'Programmatic SEO, high-conversion outbound pipelines, conversion rate optimization (CRO), and multi-channel performance advertising.',
    suggestedTags: ['Organic Growth', 'Programmatic SEO', 'CRO', 'Demand Gen', 'B2B Marketing', 'CAPI'],
    recommendedTopics: [
      {
        title: 'How We Grew Organic Pipeline in 2026: Why Traditional SEO Failed and What Actually Worked',
        excerpt: 'How AI search summaries changed search intent and the direct-answer architecture required to capture enterprise buyers.',
        keywords: ['Programmatic SEO', 'AI Search Overviews', 'B2B Pipeline', 'GEO Optimization'],
        tone: 'Authoritative & Practitioner-Led',
        length: 'Comprehensive (1,500 - 2,000 words)'
      },
      {
        title: 'Where Did Our Ad Budget Go? An Honest Guide to Fixing B2B Attribution with Server-Side CAPI',
        excerpt: 'Overcoming 40% telemetry loss caused by browser privacy blocks using direct server-to-server conversion events and CRM feedback.',
        keywords: ['Server-Side Tracking', 'Meta CAPI', 'Google Enhanced Conversions', 'RevOps Telemetry'],
        tone: 'Data-Driven & Practical',
        length: 'In-Depth (1,200 - 1,800 words)'
      },
      {
        title: 'Building a Programmatic SEO Engine: Generating 500+ High-Converting Landing Pages That Actually Rank',
        excerpt: 'The technical architecture behind dynamic programmatic page templates that capture long-tail commercial intent without duplicate content penalties.',
        keywords: ['Programmatic SEO', 'Dynamic Templates', 'Next.js SSG', 'Keyword Clustering'],
        tone: 'Technical & Strategic',
        length: 'Deep Architecture (2,000+ words)'
      }
    ]
  },
  {
    name: 'CRM & Revenue Operations',
    slug: 'crm-revenue-operations',
    pillar: 'Growth & Marketing',
    description: 'Enterprise HubSpot and Salesforce architecture, automated lead scoring, bidirectional ERP sync, and pipeline velocity telemetry.',
    suggestedTags: ['HubSpot', 'Salesforce', 'RevOps', 'Lead Scoring', 'Pipeline Velocity', 'ERP Sync'],
    recommendedTopics: [
      {
        title: 'The Modern RevOps Stack: Connecting HubSpot, Salesforce, and Stripe Without Data Drift',
        excerpt: 'How bidirectional event-driven synchronization prevents duplicate records and aligns sales with finance.',
        keywords: ['HubSpot Architecture', 'Salesforce Sync', 'RevOps Automation', 'Data Integrity'],
        tone: 'Architectural & Business-Focused',
        length: 'Comprehensive (1,500 words)'
      },
      {
        title: 'Predictive Lead Scoring in 2026: Using Behavioral Event Streams Instead of Static Form Data',
        excerpt: 'Moving from arbitrary point values to machine learning probability scores that route high-intent leads to sales within 60 seconds.',
        keywords: ['Lead Routing', 'Predictive Scoring', 'Real-Time Telemetry', 'SLA Enforcement'],
        tone: 'Analytical & Tactical',
        length: 'In-Depth (1,200 words)'
      }
    ]
  },
  {
    name: 'Intelligent Autonomous Systems',
    slug: 'intelligent-autonomous-systems',
    pillar: 'Product Intelligence',
    description: 'Multi-agent cognitive workflows, autonomous decision engines, and self-orchestrating business processes.',
    suggestedTags: ['Autonomous Agents', 'LangGraph', 'Multi-Agent', 'Cognitive Workflows', 'Decision Engines'],
    recommendedTopics: [
      {
        title: 'Beyond Simple Chatbots: Building Multi-Agent Autonomous Workflows for Complex Enterprise Operations',
        excerpt: 'How multi-agent architectures with specialized roles, task state memory, and human-in-the-loop validation deliver 10x ROI.',
        keywords: ['Multi-Agent AI', 'Autonomous Workflows', 'LangGraph', 'State Management'],
        tone: 'Visionary & Highly Technical',
        length: 'Deep Architecture (2,000+ words)'
      },
      {
        title: 'Self-Healing AI Systems: Designing Fault-Tolerant Cognitive Microservices for Production',
        excerpt: 'Techniques for automated fallback routing, output schema validation, and guardrail enforcement in mission-critical LLM apps.',
        keywords: ['LLM Guardrails', 'Fault Tolerance', 'Self-Healing AI', 'Structured JSON Output'],
        tone: 'Engineering Guide',
        length: 'In-Depth (1,500 words)'
      }
    ]
  },
  {
    name: 'Enterprise Data Operations',
    slug: 'enterprise-data-operations',
    pillar: 'Data & AI',
    description: 'Snowflake migrations, dbt transformation pipelines, real-time Kafka streaming, and decentralized data mesh architectures.',
    suggestedTags: ['Snowflake', 'dbt', 'Data Mesh', 'Kafka', 'Lakehouse', 'Data Governance'],
    recommendedTopics: [
      {
        title: 'Zero-Downtime Data Lakehouse Migration: Moving 50TB of Relational Data to Snowflake and dbt',
        excerpt: 'A step-by-step engineering blueprint for CDC streaming, data contract validation, and continuous schema evolution.',
        keywords: ['Snowflake Migration', 'dbt Models', 'CDC Replication', 'Data Contracts'],
        tone: 'Technical Blueprint',
        length: 'Deep Architecture (2,200 words)'
      },
      {
        title: 'Data Mesh in Practice: How We Broke Down Monolithic Data Teams into Domain-Driven Data Products',
        excerpt: 'Practical governance models, self-serve data infrastructure, and automated telemetry that empowered product teams.',
        keywords: ['Data Mesh', 'Domain Driven Architecture', 'Data As A Product', 'Data Governance'],
        tone: 'Executive Leadership',
        length: 'Comprehensive (1,600 words)'
      }
    ]
  },
  {
    name: 'Business AI Implementation',
    slug: 'business-ai-implementation',
    pillar: 'Data & AI',
    description: 'Private retrieval-augmented generation (RAG), fine-tuned domain models, vector search, and secure on-premise AI deployments.',
    suggestedTags: ['Private RAG', 'Vector Search', 'Fine-Tuning', 'Enterprise LLMs', 'Milvus', 'Pgvector'],
    recommendedTopics: [
      {
        title: 'Enterprise RAG That Does Not Hallucinate: Hybrid Search, Reranking, and Graph-Augmented Retrieval',
        excerpt: 'Combining dense vector embeddings with BM25 sparse keyword search and cross-encoder rerankers to achieve 99.2% precision on technical documents.',
        keywords: ['Hybrid RAG', 'Vector Embeddings', 'ColBERT Reranking', 'Knowledge Graphs'],
        tone: 'Deep Technical & Benchmark-Heavy',
        length: 'Deep Architecture (2,500 words)'
      },
      {
        title: 'Fine-Tuning vs. RAG: An Executive Cost-Benefit Matrix for Enterprise AI Strategy',
        excerpt: 'A pragmatic framework for deciding when to train LoRA adapters versus when to rely on context window retrieval.',
        keywords: ['RAG vs Fine-Tuning', 'LoRA Adapters', 'LLM Cost Optimization', 'Enterprise AI'],
        tone: 'Strategic & Analytical',
        length: 'Comprehensive (1,500 words)'
      }
    ]
  },
  {
    name: 'Cloud Performance Management',
    slug: 'cloud-performance-management',
    pillar: 'Cloud Platform',
    description: 'High-availability multi-cloud orchestration, Kubernetes cluster tuning, eBPF telemetry, and site reliability engineering (SRE).',
    suggestedTags: ['Kubernetes', 'Multi-Cloud', 'eBPF', 'SRE', 'Latency Optimization', 'Terraform'],
    recommendedTopics: [
      {
        title: 'Debugging P99 Latency Spikes in Kubernetes: An SRE Deep Dive Into Linux Kernel eBPF Telemetry',
        excerpt: 'How we pinpointed network socket contention and CPU throttling across 400 microservices without code modifications.',
        keywords: ['eBPF Observability', 'Kubernetes P99 Latency', 'Linux Kernel Tuning', 'Prometheus'],
        tone: 'Hardcore Engineering',
        length: 'Deep Architecture (2,400 words)'
      },
      {
        title: 'Multi-Region Active-Active Deployments: Overcoming Distributed Database Replication Lag',
        excerpt: 'Architectural patterns for conflict-free replicated data types (CRDTs) and global traffic steering with sub-50ms latency worldwide.',
        keywords: ['Active-Active Multi-Region', 'CockroachDB', 'Global Traffic Steering', 'High Availability'],
        tone: 'High-Level Systems Engineering',
        length: 'Comprehensive (1,800 words)'
      }
    ]
  },
  {
    name: 'Cloud Cost Intelligence',
    slug: 'cloud-cost-intelligence',
    pillar: 'Cloud Platform',
    description: 'FinOps telemetry, automated compute right-sizing, spot instance orchestration, and cloud spend reduction.',
    suggestedTags: ['FinOps', 'AWS Cost Optimization', 'Spot Instances', 'Kubecost', 'Cloud Spend'],
    recommendedTopics: [
      {
        title: 'How We Slashed AWS Cloud Spend by 43% in 60 Days: A Pragmatic FinOps Case Study',
        excerpt: 'Automated spot instance termination handlers, GP3 EBS volume right-sizing, and idle NAT gateway elimination.',
        keywords: ['AWS FinOps', 'Spot Instance Fleet', 'Cloud Cost Reduction', 'Kubecost Tuning'],
        tone: 'Case Study & Financial Engineering',
        length: 'Comprehensive (1,600 words)'
      }
    ]
  },
  {
    name: 'Quantum-Enhanced Machine Learning',
    slug: 'quantum-enhanced-ml',
    pillar: 'Quantum Computing',
    description: 'Hybrid quantum-classical optimization, quantum support vector machines (QSVM), and post-quantum cryptographic security.',
    suggestedTags: ['Quantum ML', 'QSVM', 'Qiskit', 'Hybrid Quantum', 'Post-Quantum Crypto'],
    recommendedTopics: [
      {
        title: 'Preparing for the Post-Quantum Era: Implementing NIST-Approved Lattice Cryptography Today',
        excerpt: 'Why enterprise TLS and database encryption must transition to ML-KEM (Kyber) and ML-DSA before Q-Day.',
        keywords: ['Post-Quantum Cryptography', 'NIST Standards', 'Kyber Encryption', 'Quantum Security'],
        tone: 'Security & Future-Proofing',
        length: 'In-Depth (1,700 words)'
      },
      {
        title: 'Hybrid Quantum-Classical Optimization: Solving High-Dimensional Logistics and Risk Matrices with Qiskit',
        excerpt: 'How variational quantum eigensolvers (VQE) handle combinatorial explosion that brings classical supercomputers to a halt.',
        keywords: ['VQE Algorithm', 'Qiskit Optimization', 'Quantum Computing', 'Combinatorial Search'],
        tone: 'Deep Scientific & Technical',
        length: 'Deep Architecture (2,200 words)'
      }
    ]
  }
];

// Helper to get flat category names
export function getAllServiceCategoryNames() {
  return NEUORZIN_SERVICE_CATEGORIES.map(c => c.name);
}

// Helper to get all recommended topics across services
export function getAllRecommendedTopics() {
  const topics = [];
  NEUORZIN_SERVICE_CATEGORIES.forEach(cat => {
    (cat.recommendedTopics || []).forEach(t => {
      topics.push({
        ...t,
        category: cat.name,
        categorySlug: cat.slug,
        pillar: cat.pillar
      });
    });
  });
  return topics;
}

export const detailedServices = [
  {
    id: 'product-engineering',
    slug: 'product-engineering',
    title: 'Product Engineering – Web, Mobile & MVP',
    tagline: 'From Concept to High-Scale Production with Zero Technical Debt',
    description: 'We design and engineer enterprise-grade web applications, cross-platform mobile apps, and high-velocity MVPs built for exponential scale. Every system is engineered with modular microservices, clean state machines, and sub-second interactions.',
    heroMetric: '3.5x Faster Time to Market',
    accentColor: '#745EFF',
    icon: 'Layers',
    category: 'Core Engineering',
    features: [
      {
        title: 'High-Concurrency Web Platforms',
        desc: 'React 18/19, Next.js App Router, SSR/SSG caching tiers, and edge rendering for blazing load times.'
      },
      {
        title: 'Cross-Platform Mobile Apps',
        desc: 'Fluid React Native & Flutter apps with 60fps animations, offline sync, and biometric authentication.'
      },
      {
        title: 'Microservices & High-Throughput APIs',
        desc: 'Go and Node.js microservices with gRPC and GraphQL layers delivering sub-10ms response times.'
      },
      {
        title: 'Design System & Component Architecture',
        desc: 'Pixel-perfect UI component libraries built with Tailwind CSS, accessible tokens, and motion physics.'
      }
    ],
    phases: [
      { step: '01', name: 'Discovery & UX Prototype', duration: 'Week 1–2', desc: 'Interactive Figma blueprints, API contract specs, and tech stack validation.' },
      { step: '02', name: 'Core Architecture & CI/CD', duration: 'Week 3–4', desc: 'Containerized infra setup, database schemas, auth layers, and automated testing.' },
      { step: '03', name: 'Rapid Iteration & Build', duration: 'Week 5–8', desc: 'Feature pods delivering continuous sprint releases with automated QA.' },
      { step: '04', name: 'Production Launch & Scale', duration: 'Week 9+', desc: 'Load testing, security auditing, multi-region CDN routing, and live monitoring.' }
    ],
    techStack: ['React', 'Next.js', 'React Native', 'Node.js', 'Go', 'PostgreSQL', 'Redis', 'Docker', 'AWS'],
    deliverables: [
      'Full Source Code Repository with 100% IP Transfer',
      'Automated CI/CD Pipelines with 90%+ Test Coverage',
      'Comprehensive Architecture Blueprint & API Documentation',
      'Production Kubernetes / AWS Deployment Scripts',
      '30-Day Post-Launch Hypercare & Performance Warranty'
    ]
  },
  {
    id: 'data-engineering',
    slug: 'data-engineering',
    title: 'Data Engineering & Analytics',
    tagline: 'Unified Intelligence, Modern Snowflake Migrations & Real-Time Telemetry',
    description: 'Transform fragmented data silos into a high-performance data mesh. We specialize in zero-downtime Snowflake migrations, automated dbt ELT pipelines, real-time Kafka streaming, and executive PowerBI telemetry.',
    heroMetric: '65% Reduction in Query Costs',
    accentColor: '#2B4DFF',
    icon: 'Database',
    category: 'Data & Cloud',
    features: [
      {
        title: 'Zero-Downtime Snowflake Migrations',
        desc: 'End-to-end migration from Oracle, Teradata, SQL Server, and Redshift with automated schema translation.'
      },
      {
        title: 'dbt & Airflow Pipeline Automation',
        desc: 'Modular, version-controlled data transformations with automated lineage tracking and data quality tests.'
      },
      {
        title: 'Real-Time Streaming Analytics',
        desc: 'Apache Kafka, Flink, and Spark streaming for sub-second event ingestion and fraud detection.'
      },
      {
        title: 'Executive BI & Dashboards',
        desc: 'Custom PowerBI, Tableau, and Looker semantic layers delivering actionable business telemetry.'
      }
    ],
    phases: [
      { step: '01', name: 'Data Audit & Schema Mapping', duration: 'Week 1–2', desc: 'Analysis of data volume, dependencies, query workloads, and cost bottlenecks.' },
      { step: '02', name: 'Snowflake Infra & dbt Modeling', duration: 'Week 3–4', desc: 'Virtual warehouse sizing, RBAC security, and automated ELT orchestration.' },
      { step: '03', name: 'Dual-Run & Reconciliation', duration: 'Week 5–6', desc: 'Parallel execution and automated row-level data validation against legacy systems.' },
      { step: '04', name: 'Cutover & FinOps Tuning', duration: 'Week 7+', desc: 'Final DNS switchover, legacy decommission, auto-suspend optimization, and dashboard rollouts.' }
    ],
    techStack: ['Snowflake', 'dbt', 'Apache Kafka', 'Airflow', 'Python', 'PowerBI', 'Looker', 'Iceberg', 'AWS S3'],
    deliverables: [
      'Production Snowflake Architecture with Automated RBAC',
      'Modular dbt Data Transformation Repository',
      'Real-Time Ingestion Pipelines & Monitoring Alerts',
      'Executive KPI Telemetry Dashboards',
      'FinOps Cost Optimization Guide & Autoscaling Policies'
    ]
  },
  {
    id: 'ai-automation',
    slug: 'ai-automation',
    title: 'AI & Autonomous Automation',
    tagline: 'Cognitive Workflows, Multi-Agent Swarms & Domain LLM Fine-Tuning',
    description: 'Empower your enterprise with autonomous AI agents that reason, plan, and execute complex workflows. From private enterprise RAG systems to multi-agent swarms, we build secure, compliant AI that delivers measurable ROI.',
    heroMetric: '80% Automation of Routine Tasks',
    accentColor: '#00F0FF',
    icon: 'Bot',
    category: 'AI & Automation',
    features: [
      {
        title: 'Private Enterprise RAG Systems',
        desc: 'Retrieval-Augmented Generation on internal documentation, wikis, and databases with strict access controls.'
      },
      {
        title: 'Autonomous Multi-Agent Swarms',
        desc: 'Self-coordinating AI agents that handle multi-step workflows like invoice audits, code reviews, and customer triage.'
      },
      {
        title: 'Domain Model Fine-Tuning & Quantization',
        desc: 'Custom-adapted open-source LLMs (Llama 3, Mistral, DeepSeek) optimized for specific industry vocabularies.'
      },
      {
        title: 'Intelligent Document Processing',
        desc: 'Computer vision and multimodal AI for parsing unstructured contracts, medical records, and financial statements.'
      }
    ],
    phases: [
      { step: '01', name: 'Workflow Feasibility & Evaluation', duration: 'Week 1', desc: 'Identify highest-ROI automation targets and curate golden test datasets.' },
      { step: '02', name: 'Knowledge Graph & Vector Pipeline', duration: 'Week 2–3', desc: 'Chunking strategies, hybrid vector + keyword search, and metadata tagging.' },
      { step: '03', name: 'Agent Orchestration & Guardrails', duration: 'Week 4–6', desc: 'Implement hallucination detection, prompt caching, tool use, and latency tuning.' },
      { step: '04', name: 'Enterprise Deployment & SRE', duration: 'Week 7+', desc: 'VPC-isolated deployment with real-time token tracking and fallback models.' }
    ],
    techStack: ['PyTorch', 'LangChain', 'LlamaIndex', 'vLLM', 'Pinecone', 'Qdrant', 'FastAPI', 'OpenAI / Claude', 'Triton'],
    deliverables: [
      'Self-Hosted or Cloud AI Agent Orchestration Engine',
      'Curated Vector Database & Knowledge Retrieval Pipeline',
      'Hallucination Guardrails & Token Governance Dashboard',
      'Admin Monitoring UI for Agent Decision Auditing',
      'Full API Documentation & Integration SDKs'
    ]
  },
  {
    id: 'cloud-performance',
    slug: 'cloud-performance',
    title: 'Cloud Performance & FinOps Intelligence',
    tagline: 'High-Availability Cloud Architecture & Expenditure Control',
    description: 'Maximize cloud infrastructure efficiency while slashing runaway AWS, Azure, and GCP bills. We re-architect compute topologies, automate autoscaling, and implement rigorous FinOps governance to cut cloud bills by 30% to 55%.',
    heroMetric: '42% Average Cloud Cost Reduction',
    accentColor: '#00E5FF',
    icon: 'Cloud',
    category: 'Cloud & Infrastructure',
    features: [
      {
        title: 'Kubernetes Multi-Cluster Optimization',
        desc: 'Right-sizing pod allocations, Karpenter dynamic node autoscaling, and spot instance fleets.'
      },
      {
        title: 'FinOps Governance & Anomaly Detection',
        desc: 'Automated cost attribution tags, budget threshold alerts, and orphan resource cleanup scripts.'
      },
      {
        title: 'Multi-Region High Availability & DR',
        desc: 'Active-active failover topologies, low-latency GeoDNS routing, and sub-10-minute RTO/RPO targets.'
      },
      {
        title: 'Zero-Trust Cloud Security',
        desc: 'Automated IAM least-privilege policies, secret rotation, and continuous compliance scanning.'
      }
    ],
    phases: [
      { step: '01', name: 'Cloud Infrastructure Audit', duration: 'Week 1', desc: 'Identify idle instances, over-provisioned clusters, and unattached storage volumes.' },
      { step: '02', name: 'Topology Blueprint & IaC Refactor', duration: 'Week 2–3', desc: 'Convert infrastructure to modular Terraform with automated CI/CD validation.' },
      { step: '03', name: 'Autoscaling & Spot Implementation', duration: 'Week 4–5', desc: 'Deploy Karpenter, spot node pools, and database read replica autoscaling.' },
      { step: '04', name: 'FinOps Policy Enforcement', duration: 'Week 6+', desc: 'Implement automated tagging, cost telemetry dashboards, and anomaly notifications.' }
    ],
    techStack: ['AWS', 'GCP', 'Azure', 'Kubernetes', 'Terraform', 'Karpenter', 'Datadog', 'Prometheus', 'ArgoCD'],
    deliverables: [
      'Modular Terraform Infrastructure-as-Code Codebase',
      'Real-Time Cloud Cost Telemetry & FinOps Dashboard',
      'Dynamic Karpenter Autoscaling Configuration',
      'Multi-Region Disaster Recovery Runbook',
      'Continuous Security & IAM Audit Report'
    ]
  },
  {
    id: 'quantum-innovation',
    slug: 'quantum-innovation',
    title: 'Quantum-Enhanced Machine Learning',
    tagline: 'Hybrid Quantum-Classical Optimization for Exponential Scale',
    description: 'Prepare your enterprise for the post-classical era. We design and simulate hybrid quantum algorithms (QAOA, VQE, QSVM) to solve combinatorial optimization problems in finance, logistics, chemistry, and cryptography.',
    heroMetric: '10x Faster Combinatorial Solving',
    accentColor: '#A855F7',
    icon: 'Cpu',
    category: 'Next-Gen Research',
    features: [
      {
        title: 'Hybrid Quantum-Classical Solvers',
        desc: 'Variational Quantum Eigensolvers (VQE) and QAOA tailored for large-scale portfolio and routing optimization.'
      },
      {
        title: 'Cloud Quantum Hardware Simulation',
        desc: 'Leverage IBM Quantum, Rigetti, and AWS Braket QPU backends with high-fidelity noise mitigation.'
      },
      {
        title: 'Quantum Kernel Methods & QSVM',
        desc: 'High-dimensional feature space mappings for fraud detection and complex pattern classification.'
      },
      {
        title: 'Post-Quantum Cryptographic Readiness',
        desc: 'Audit existing encryption protocols and transition to NIST-standardized quantum-resistant algorithms.'
      }
    ],
    phases: [
      { step: '01', name: 'Problem Formulation & Hamiltonian Mapping', duration: 'Week 1–2', desc: 'Translate business optimization bottlenecks into quantum Ising/QUBO formulations.' },
      { step: '02', name: 'Circuit Design & Error Mitigation', duration: 'Week 3–4', desc: 'Develop parameterized quantum circuits optimized for NISQ device depth constraints.' },
      { step: '03', name: 'Simulation & QPU Benchmark', duration: 'Week 5–8', desc: 'Run comparative benchmarks between classical solvers (Gurobi/CPLEX) and quantum circuits.' },
      { step: '04', name: 'Production Hybrid API', duration: 'Week 9+', desc: 'Package hybrid solver as a high-availability cloud microservice with automatic fallback.' }
    ],
    techStack: ['Qiskit', 'Cirq', 'PennyLane', 'Amazon Braket', 'IBM Quantum', 'Python', 'NumPy/SciPy', 'Docker'],
    deliverables: [
      'Custom Quantum Circuit & Algorithm Codebase',
      'Classical vs Quantum Performance Benchmark Report',
      'Cloud QPU Integration Wrapper & Fallback API',
      'Post-Quantum Cryptography Readiness Assessment',
      'Executive Whitepaper on Quantum Advantage Roadmap'
    ]
  },
  {
    id: 'sales-marketing',
    slug: 'sales-marketing',
    title: 'Growth Engines & Digital Reach',
    tagline: 'Data-Driven Acquisition Funnels, Programmatic SEO & Enterprise Lead Generation',
    description: 'Scale pipeline revenue with automated inbound engines, technical SEO architecture, high-conversion design systems, and data-backed performance advertising across global enterprise channels.',
    heroMetric: '240% Increase in Qualified Leads',
    accentColor: '#FFB800',
    icon: 'TrendingUp',
    category: 'Growth & Marketing',
    features: [
      {
        title: 'Programmatic SEO Architecture',
        desc: 'High-speed headless CMS pipelines generating thousands of indexable, high-intent ranking pages.'
      },
      {
        title: 'Enterprise Inbound Funnels',
        desc: 'Interactive calculators, self-serve diagnostic tools, and frictionless appointment booking systems.'
      },
      {
        title: 'Performance Marketing & Retargeting',
        desc: 'Precision B2B LinkedIn, Google Ads, and programmatic display campaigns with real-time attribution.'
      },
      {
        title: 'Conversion Rate Optimization (CRO)',
        desc: 'Continuous multivariate A/B testing on landing pages, copy variants, and interactive onboarding flows.'
      }
    ],
    phases: [
      { step: '01', name: 'Market Intelligence & Funnel Audit', duration: 'Week 1', desc: 'Competitive keyword analysis, conversion drop-off points, and TAM modeling.' },
      { step: '02', name: 'Landing Page System & Lead Magnets', duration: 'Week 2–3', desc: 'Design high-converting interactive tools, case study hubs, and automated email drips.' },
      { step: '03', name: 'Campaign Launch & Tracking', duration: 'Week 4–5', desc: 'Deploy multi-channel campaigns with server-side Google Tag Manager and CRM sync.' },
      { step: '04', name: 'CRO & Scaled Optimization', duration: 'Week 6+', desc: 'Iterative multivariate experiments to systematically lower CAC and increase LTV.' }
    ],
    techStack: ['HubSpot', 'Google Analytics 4', 'Next.js', 'PostHog', 'Mixpanel', 'Segment', 'VWO', 'LinkedIn Campaign Mgr'],
    deliverables: [
      'High-Converting Landing Page & Component Library',
      'Programmatic SEO Content Generation Engine',
      'End-to-End Analytics & Multi-Touch Attribution Pipeline',
      'Automated Lead Nurturing Email Workflows',
      'Monthly Growth & Conversion Experiment Playbook'
    ]
  }
];

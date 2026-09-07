export const projectsData = [
  {
    id: 'lionpro-agency',
    title: 'Lionpro Digital Enterprise',
    client: 'Lionpro Global Creative',
    category: 'Product Engineering',
    date: 'February 2024',
    stats: '+340% Throughput',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    summary: 'High-performance digital agency platform built for hyper-scale creative asset delivery and client collaboration.',
    description: 'NeuOrzin re-engineered Lionpro Agency’s digital presence from the ground up. We implemented an interactive visual showcase, responsive micro-interactions, and an optimized headless content delivery network that slashed load times by 68%.',
    tags: ['React 18', 'Next.js', 'Go Microservices', 'Tailwind CSS', 'Headless CMS'],
    metrics: [
      { label: 'Performance Score', value: '99/100' },
      { label: 'Conversion Lift', value: '+74%' },
      { label: 'Asset Load Time', value: '0.4s' }
    ],
    deliverables: [
      'Custom Responsive React Web Application',
      'Unified Component Design System',
      'Headless Content API Integration',
      'Automated CI/CD Pipeline & Multi-Region CDN'
    ]
  },
  {
    id: 'snowflake-telecom-mesh',
    title: 'Petabyte Snowflake Data Mesh',
    client: 'Apex Telecom Global',
    category: 'Data Engineering',
    date: 'January 2024',
    stats: '-65% Query Cost',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
    summary: 'Zero-downtime petabyte-scale data warehouse migration from legacy Oracle systems to Snowflake with automated dbt governance.',
    description: 'Migrated 4.2 petabytes of historical billing, call records, and customer telemetry to Snowflake. Implemented automated dbt transformation models, real-time Apache Kafka streaming, and PowerBI semantic acceleration.',
    tags: ['Snowflake', 'dbt Core', 'Apache Kafka', 'Airflow', 'PowerBI'],
    metrics: [
      { label: 'Data Volume Migrated', value: '4.2 PB' },
      { label: 'Downtime During Cutover', value: '0 Minutes' },
      { label: 'Query Compute Savings', value: '$1.4M / yr' }
    ],
    deliverables: [
      'Multi-Cluster Snowflake Warehouse Architecture',
      'Automated dbt Data Modeling Repository',
      'Real-Time Kafka Event Ingestion Stream',
      'Executive KPI Telemetry Dashboards'
    ]
  },
  {
    id: 'autonomous-fintech-swarms',
    title: 'Autonomous Multi-Agent FinTech Core',
    client: 'Vanguard Capital Markets',
    category: 'Autonomous AI',
    date: 'December 2023',
    stats: '80% Automation',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    summary: 'Self-coordinating AI agent swarms executing real-time fraud mitigation, regulatory compliance audits, and loan underwriting.',
    description: 'Deployed private, VPC-isolated multi-agent swarms with strict JSON schema outputs and semantic guardrails. Automated 80% of routine underwriting steps while maintaining 100% human-in-the-loop oversight.',
    tags: ['LangChain', 'LlamaIndex', 'vLLM', 'Pinecone', 'Python / FastAPI'],
    metrics: [
      { label: 'Underwriting Turnaround', value: '2.4 mins (from 48 hrs)' },
      { label: 'Audit Accuracy', value: '99.98%' },
      { label: 'Annual Labor Saved', value: '$2.1M' }
    ],
    deliverables: [
      'Autonomous Multi-Agent Orchestration Engine',
      'Private Enterprise RAG Knowledge Graph',
      'Real-Time Audit Trail & Hallucination Guardrails',
      'Admin Monitoring & Human-in-the-Loop Review Dashboard'
    ]
  },
  {
    id: 'cloud-finops-orchestrator',
    title: 'Multi-Cloud FinOps & Infrastructure Right-Sizing',
    client: 'CloudScale SaaS Holdings',
    category: 'Cloud Architecture',
    date: 'November 2023',
    stats: '$2.8M Saved',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
    summary: 'Autonomous cloud cost governance, dynamic Karpenter Kubernetes node autoscaling, and spot instance fleet management across AWS and GCP.',
    description: 'Conducted a deep-architecture audit across 1,400+ cloud instances. Refactored infrastructure to modular Terraform with Karpenter dynamic scaling, slashing unallocated spend by 48% with zero impact on P99 latency.',
    tags: ['AWS', 'GCP', 'Kubernetes', 'Terraform', 'Karpenter', 'Datadog'],
    metrics: [
      { label: 'Monthly Cloud Bill Cut', value: '48%' },
      { label: 'Cluster Auto-Recovery', value: '< 15 seconds' },
      { label: 'Annual Cost Saved', value: '$2.8M' }
    ],
    deliverables: [
      'Modular Terraform Infrastructure-as-Code Repository',
      'Dynamic Kubernetes Karpenter Cluster Scaling',
      'Real-Time FinOps Attribution & Anomaly Alerting',
      'Disaster Recovery Failover Runbook'
    ]
  },
  {
    id: 'quantum-portfolio-solver',
    title: 'Quantum-Classical Hybrid Portfolio Optimizer',
    client: 'Aethelgard Quant Fund',
    category: 'Quantum Innovation',
    date: 'October 2023',
    stats: '10x Speedup',
    image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=800&q=80',
    summary: 'Parameterized QAOA quantum circuits formulated to solve combinatorial multi-asset portfolio balancing and risk frontier modeling.',
    description: 'Translated NP-hard quadratic portfolio optimization constraints into Ising QUBO formulations simulated across IBM Quantum and AWS Braket QPUs with classical fallback microservices.',
    tags: ['Qiskit', 'PennyLane', 'AWS Braket', 'Python', 'NumPy / SciPy'],
    metrics: [
      { label: 'Combinatorial Solve Time', value: '10x Faster' },
      { label: 'Asset Graph Nodes', value: '10,000+ Assets' },
      { label: 'Risk Frontier Sharpness', value: '+34%' }
    ],
    deliverables: [
      'Parameterized Quantum Circuit & Solver Engine',
      'Classical vs Quantum Comparative Benchmark Suite',
      'Cloud QPU Microservice Wrapper with Zero-Downtime Fallback',
      'Post-Quantum Cryptographic Readiness Audit'
    ]
  },
  {
    id: 'education-platform-lms',
    title: 'Global Adaptive Learning & LMS Platform',
    client: 'EdSphere University Network',
    category: 'Product Engineering',
    date: 'September 2023',
    stats: '1M+ Users',
    image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=800&q=80',
    summary: 'Adaptive learning management ecosystem with intelligent student progress telemetry and AI-assisted tutoring.',
    description: 'Engineered an enterprise ed-tech portal supporting hundreds of thousands of concurrent learners. Embedded generative AI quiz assistants and unified student analytics dashboards for institutional educators.',
    tags: ['React', 'Next.js', 'WebSockets', 'PostgreSQL', 'Snowflake'],
    metrics: [
      { label: 'Active Learners', value: '1,200,000+' },
      { label: 'Course Completion Rate', value: '88%' },
      { label: 'Server Cost Savings', value: '45%' }
    ],
    deliverables: [
      'Interactive Student & Educator Portal',
      'Sub-50ms WebSocket Live Collaboration Engine',
      'Generative AI Quiz & Study Assistant',
      'Institutional Telemetry & PowerBI Dashboards'
    ]
  }
];

export const industriesData = [
  {
    id: 'fintech',
    number: '01',
    title: 'Autonomous FinTech & Banking',
    subtitle: 'High-Frequency Financial Infrastructure & Security',
    description: 'We engineer sub-millisecond payment processing gateways, automated fraud mitigation swarms, algorithmic risk modeling engines, and institutional crypto/fiat ledger systems.',
    metrics: '< 50ms Latency | SOC2 + PCI-DSS',
    points: [
      'High-concurrency tokenized payment orchestration gateways',
      'Real-time fraud anomaly detection using vector streaming AI',
      'Automated regulatory compliance reporting (AML / KYC / Basel III)',
      'Zero-downtime distributed ledger synchronization'
    ],
    technologies: ['Go / Rust', 'Apache Kafka', 'PostgreSQL', 'Snowflake', 'PCI-DSS HSM', 'Redis Enterprise'],
    tags: ['Payment Gateways', 'Fraud Detection AI', 'SOC2 / PCI-DSS', 'Real-Time Ledgers'],
    stats: { primary: '< 50ms', label: 'Transaction Latency' },
    icon: 'Building'
  },
  {
    id: 'healthcare',
    number: '02',
    title: 'Precision MedTech & Life Sciences',
    subtitle: 'HIPAA-Compliant Health Data & Diagnostic AI',
    description: 'We design secure clinical telemetry pipelines, medical imaging AI classifiers, FHIR-compliant EHR data lakes, and private telehealth consultation infrastructure.',
    metrics: '99.999% SLA | HIPAA & HITECH',
    points: [
      'End-to-end encrypted ePHI storage with signed BAA protocols',
      'HL7 / FHIR protocol connectors for universal hospital interoperability',
      'Deep learning diagnostic pipelines on DICOM medical imaging',
      'Remote patient monitoring telemetry with sub-second alerting'
    ],
    technologies: ['Python', 'PyTorch', 'AWS HealthLake', 'FastAPI', 'Kubernetes', 'Docker'],
    tags: ['HIPAA Compliant', 'EHR / HL7 FHIR', 'Diagnostic AI', 'Telehealth Systems'],
    stats: { primary: '99.999%', label: 'Uptime Reliability' },
    icon: 'HeartPulse'
  },
  {
    id: 'supply-chain',
    number: '03',
    title: 'Smart Logistics & Supply Chain',
    subtitle: 'IoT Fleet Telemetry & Warehouse Automation',
    description: 'We build digital twin tracking networks, predictive warehouse robotics controllers, combinatorial route optimizers, and automated freight audit software.',
    metrics: '42% Downtime Cut | 10k+ IoT Nodes',
    points: [
      'Real-time IoT sensor ingestion handling 500,000 events per second',
      'Combinatorial vehicle routing optimization algorithms',
      'Automated invoice reconciliation and freight bill auditing',
      'Digital twin warehouse modeling for automated inventory picking'
    ],
    technologies: ['Apache Flink', 'Kafka', 'Go', 'Snowflake', 'Qiskit', 'Terraform'],
    tags: ['IoT Sensor Streams', 'Predictive Maintenance', 'Supply Chain Mesh', 'Digital Twins'],
    stats: { primary: '42%', label: 'Downtime Reduction' },
    icon: 'ShoppingBag'
  },
  {
    id: 'retail',
    number: '04',
    title: 'High-Scale E-Commerce & Retail',
    subtitle: 'Headless Commerce & Predictive Personalization',
    description: 'We architect lightning-fast storefronts capable of handling Black Friday traffic spikes, AI-driven recommendation engines, and omnichannel inventory sync.',
    metrics: '0.3s Page Load | 3.5x Conversion',
    points: [
      'Headless commerce architecture with Edge SSR / SSG rendering',
      'Vector-based real-time personalized product recommendation swarms',
      'Omnichannel inventory synchronization with millisecond lock consistency',
      'Multi-currency checkout funnels with dynamic fraud protection'
    ],
    technologies: ['React 18', 'Next.js', 'Node.js', 'Redis', 'Tailwind CSS', 'GraphQL'],
    tags: ['Headless Commerce', 'Recommendation AI', 'Omnichannel Sync', 'High Concurrency'],
    stats: { primary: '0.3s', label: 'Edge Load Speed' },
    icon: 'Bot'
  },
  {
    id: 'aerospace-defense',
    number: '05',
    title: 'Aerospace, Defense & Quantum Labs',
    subtitle: 'Mission-Critical Telemetry & Quantum AI',
    description: 'We develop air-gapped cryptographic architectures, mission telemetry flight simulation models, and hybrid quantum-classical combinatorial algorithms.',
    metrics: '10x Speedup | ISO 27001 Certified',
    points: [
      'Air-gapped Zero-Trust infrastructure with automated security fuzzing',
      'High-throughput telemetry simulation engines for aerospace testing',
      'Hybrid quantum-classical algorithms (VQE / QAOA) for combinatorial optimization',
      'Post-quantum cryptographic migration and key encapsulation protocols'
    ],
    technologies: ['Rust', 'Qiskit', 'C++', 'AWS Braket', 'Kubernetes', 'Vault'],
    tags: ['Quantum ML', 'Distributed HPC', 'Mission Telemetry', 'Zero-Trust'],
    stats: { primary: '10x', label: 'Compute Speedup' },
    icon: 'Shield'
  }
];

export const industriesData = [
  {
    id: 'financial-services',
    number: '01',
    title: 'Financial Services & FinTech',
    subtitle: 'Ultra-Low Latency Core Banking, Algorithmic Risk & Fraud Defenses',
    description: 'We architect resilient core banking backbones, high-frequency transaction clearing meshes, real-time algorithmic fraud prevention systems, and automated KYC/AML regulatory reporting pipelines.',
    metrics: '< 15ms Latency | 99.999% Availability',
    points: [
      'Microsecond-clearing transaction ledgers with distributed ACID consensus',
      'Machine-learning fraud anomaly detection on live payment & transaction streams',
      'Automated regulatory compliance pipelines (RBI, SEC, FINRA & PCI-DSS Level 1)',
      'High-throughput algorithmic credit scoring & automated underwriting engines'
    ],
    technologies: ['Go / Rust', 'Java Spring Boot', 'Apache Kafka', 'PostgreSQL', 'Redis Cluster', 'HashiCorp Vault', 'AWS'],
    tags: ['FinTech', 'Core Banking', 'Algorithmic Fraud', 'PCI-DSS Level 1'],
    stats: { primary: '< 15ms', label: 'Transaction Latency' },
    icon: 'ShieldCheck'
  },
  {
    id: 'manufacturing',
    number: '02',
    title: 'Manufacturing & Smart Industry 4.0',
    subtitle: 'IoT Sensor Telemetry, Digital Twins & Predictive Maintenance',
    description: 'We engineer industrial IoT ingestion pipelines, automated computer vision quality inspection systems, digital twin plant simulations, and SCADA-integrated ERP workflows.',
    metrics: '42% Downtime Cut | 500k+ IoT Events/sec',
    points: [
      'Real-time IoT sensor telemetry ingestion with edge data filtering',
      'High-speed computer vision models for automated assembly line defect detection',
      'Predictive maintenance alert engines cutting unplanned machine downtime',
      'Digital twin plant modeling for automated inventory picking and routing'
    ],
    technologies: ['Apache Kafka', 'Go / Rust', 'Python', 'PyTorch', 'MQTT', 'TimeScaleDB', 'Docker'],
    tags: ['Industry 4.0', 'Predictive Maintenance', 'IoT Sensor Mesh', 'Digital Twins'],
    stats: { primary: '42%', label: 'Downtime Reduction' },
    icon: 'Factory'
  },
  {
    id: 'real-estate',
    number: '03',
    title: 'Real Estate & PropTech Platforms',
    subtitle: 'Property Telemetry, Automated Valuation & Virtual Staging',
    description: 'We develop multi-tenant PropTech marketplaces, automated algorithmic valuation models (AVM), spatial 3D virtual tour engines, and automated lease lifecycle workflows.',
    metrics: '10x Pipeline Speed | 99.99% Availability',
    points: [
      'Multi-tenant property listing pipelines with geospatial map clustering',
      'Algorithmic real-time automated property valuation and rent yield modeling',
      'Digital smart contract management and automated KYC/tenant screening',
      'Integrated spatial 3D architectural viewer & interactive floor plans'
    ],
    technologies: ['React', 'Node.js', 'PostgreSQL', 'PostGIS', 'Three.js / WebGL', 'AWS', 'Redis'],
    tags: ['PropTech', 'Geospatial AI', 'Automated Valuation', 'Smart Leases'],
    stats: { primary: '10x', label: 'Pipeline Speed' },
    icon: 'Building'
  },
  {
    id: 'edutech',
    number: '04',
    title: 'EduTech & Adaptive Learning Ecosystems',
    subtitle: 'AI Tutors, Virtual Classrooms & Student Telemetry',
    description: 'We design high-concurrency interactive learning platforms, adaptive AI knowledge graphs, low-latency live video streaming classrooms, and gamified assessment engines.',
    metrics: '50k+ Concurrent Students | < 100ms Latency',
    points: [
      'Adaptive learning graphs personalizing curriculum paths in real time',
      'Ultra-low-latency WebRTC live lecture streaming and interactive collaborative whiteboards',
      'Automated proctoring anomaly detection and algorithmic assessment grading',
      'SCORM and LTI-compliant integration with global LMS standards'
    ],
    technologies: ['WebRTC', 'FastAPI', 'Python', 'React', 'MongoDB', 'Redis', 'Kubernetes'],
    tags: ['EduTech', 'Adaptive Learning', 'WebRTC Classrooms', 'AI Assessment'],
    stats: { primary: '50k+', label: 'Active Concurrent Learners' },
    icon: 'GraduationCap'
  },
  {
    id: 'retail-cpg',
    number: '05',
    title: 'Retail and CPG (Consumer Packaged Goods)',
    subtitle: 'Headless Storefronts, D2C Distribution & Supply Telemetry',
    description: 'We build headless omnichannel commerce engines, sub-second checkout funnels, predictive demand forecasting pipelines, D2C brand engines, and SKU-level inventory visibility hubs.',
    metrics: '0.3s Edge Speed | 99.4% Forecast Accuracy',
    points: [
      'Headless omnichannel commerce architecture with Edge SSR / SSG micro-frontends',
      'Vector-based real-time personalized product recommendation swarms',
      'Machine learning demand forecasting based on market trends and seasonality',
      'D2C brand storefronts with high-conversion recurring subscription billing'
    ],
    technologies: ['React 18', 'Next.js', 'Node.js', 'Snowflake', 'Redis Enterprise', 'GraphQL', 'Stripe'],
    tags: ['Retail Commerce', 'CPG Solutions', 'Demand Forecasting', 'D2C Distribution'],
    stats: { primary: '0.3s', label: 'Edge Load Speed' },
    icon: 'ShoppingBag'
  }
];

export default industriesData;

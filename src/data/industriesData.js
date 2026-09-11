export const industriesData = [
  {
    id: 'retail',
    number: '01',
    title: 'Retail & Omnichannel Commerce',
    subtitle: 'High-Throughput Storefronts, Dynamic Pricing & Inventory Mesh',
    description: 'We build headless commerce engines, sub-second checkout funnels, AI-driven personalized recommendation swarms, and unified omnichannel inventory synchronizers.',
    metrics: '0.3s Load Speed | 3.5x Conversion Growth',
    points: [
      'Headless commerce architecture with Edge SSR / SSG micro-frontends',
      'Vector-based real-time personalized product recommendation swarms',
      'Omnichannel inventory synchronization with millisecond lock consistency',
      'Unified multi-currency checkout funnels with automated fraud filtering'
    ],
    technologies: ['React 18', 'Next.js', 'Node.js', 'Redis Enterprise', 'Tailwind CSS', 'GraphQL', 'Stripe'],
    tags: ['Headless Retail', 'Recommendation AI', 'Omnichannel Sync', 'High Concurrency'],
    stats: { primary: '0.3s', label: 'Edge Load Speed' },
    icon: 'ShoppingBag'
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
    id: 'cpg',
    number: '05',
    title: 'CPG (Consumer Packaged Goods)',
    subtitle: 'Demand Forecasting, D2C Distribution & Supply Telemetry',
    description: 'We build predictive demand forecasting pipelines, Direct-to-Consumer (D2C) brand engines, distributor order management portals, and SKU-level inventory visibility hubs.',
    metrics: '99.4% Forecast Accuracy | 2.8x D2C Velocity',
    points: [
      'Machine learning demand forecasting based on market trends and seasonality',
      'D2C brand storefronts with high-conversion recurring subscription billing',
      'B2B distributor ordering portals with automated credit limits & dynamic discounting',
      'End-to-end batch traceability & real-time SKU distribution telemetry'
    ],
    technologies: ['Python', 'Snowflake', 'Apache Flink', 'React', 'Next.js', 'GraphQL', 'AWS'],
    tags: ['CPG Solutions', 'Demand Forecasting', 'D2C Commerce', 'SKU Telemetry'],
    stats: { primary: '99.4%', label: 'Forecast Accuracy' },
    icon: 'Package'
  }
];

export default industriesData;

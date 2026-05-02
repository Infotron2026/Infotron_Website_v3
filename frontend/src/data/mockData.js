// Mock data for Infotron Solutions website

export const clientLogos = [
  {
    name: "Hilmar Cheese",
    logo: "https://images.unsplash.com/photo-1452195100486-9cc805987862?w=200&h=80&fit=crop&auto=format",
    alt: "Hilmar Cheese Company"
  },
  {
    name: "Sculptor Capital",
    logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=200&h=80&fit=crop&auto=format",
    alt: "Sculptor Capital Management"
  },
  {
    name: "Lucid Motors",
    logo: "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=200&h=80&fit=crop&auto=format",
    alt: "Lucid Motors"
  },
  {
    name: "Enterprise Client",
    logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=80&fit=crop&auto=format",
    alt: "Enterprise Technology Partner"
  }
];

export const services = [
  {
    id: "managed-services",
    title: "Managed Services",
    shortDesc: "AI-driven delivery teams that ship on time. Intelligent automation built in.",
    icon: "Server",
    href: "/services/managed-services"
  },
  {
    id: "staff-augmentation",
    title: "Staff Augmentation",
    shortDesc: "Senior engineers including AI/ML specialists. Deploy in weeks, not months.",
    icon: "Users",
    href: "/services/staff-augmentation"
  },
  {
    id: "business-consulting",
    title: "Business Consulting",
    shortDesc: "AI strategy and transformation leadership. Execution, not PowerPoint decks.",
    icon: "Briefcase",
    href: "/services/business-consulting"
  }
];

export const whyInfotron = [
  {
    title: "2-Week Deploy",
    description: "Senior teams live in 14 days. No 6-month searches. No false starts.",
    icon: "Zap"
  },
  {
    title: "We Own Outcomes",
    description: "Missed deadline? Our problem. Scope creep? We handle it. You focus on business.",
    icon: "Target"
  },
  {
    title: "AI-Enhanced Delivery",
    description: "ML-powered workflows, intelligent automation, and data-driven optimization built in.",
    icon: "Award"
  },
  {
    title: "Domain Expertise",
    description: "FinTech. Trading systems. Enterprise SaaS. AI/ML platforms. We've built them all.",
    icon: "TrendingUp"
  },
  {
    title: "92% Retention",
    description: "Clients renew because we ship. Not because of contracts.",
    icon: "Shield"
  },
  {
    title: "US + Global",
    description: "Headquarters in the US. Delivery worldwide. Time zones that match yours.",
    icon: "Globe"
  }
];

export const caseStudies = [
  {
    id: 1,
    slug: "scaled-trading-infrastructure",
    client: "Global FinTech Platform",
    industry: "Financial Services",
    title: "Scaled Trading Infrastructure for 10X Growth",
    impact: "Sub-50ms latency across 500M+ daily transactions",
    challenge: "A rapidly growing trading platform needed to scale infrastructure to handle 10x transaction volume while maintaining sub-50ms latency requirements.",
    approach: "Deployed a managed DevOps team and re-architected core trading systems using microservices, Kubernetes, and real-time data pipelines.",
    overview: "The client operates a multi-asset trading platform serving institutional clients across North America and EMEA. A combination of new regulatory flows, expanded asset classes, and onboarding of two large prime brokers created transaction volume projections the existing infrastructure could not absorb. Any latency regression above 50ms directly impacted execution quality and revenue.",
    challenges: [
      "Monolithic order routing service tightly coupled to a shared RDBMS, creating contention under peak load",
      "Market data ingestion pipeline built on legacy message bus with no horizontal scaling path",
      "Deployments required 45-minute maintenance windows, blocking rapid iteration",
      "Observability gaps made it impossible to isolate latency spikes across 40+ downstream services",
      "Compliance constraints required every architectural change to preserve full audit and replay capability"
    ],
    solution: "We designed a phased modernization of the trading stack around event-driven microservices, a Kafka-based market data fabric, and Kubernetes on AWS. Order routing was decomposed into latency-critical and stateful services, with gRPC for inter-service calls and Redis for hot-path caching. A custom observability layer combining OpenTelemetry, Prometheus, and Grafana gave engineers per-symbol latency visibility. Blue-green deployments with shadow traffic replay eliminated maintenance windows and preserved the audit trail required by compliance.",
    execution: "A 12-person pod operated in 2-week sprints co-located with the client's trading platform team. Delivery was structured in four tracks: data fabric, order routing, observability, and platform hardening. Quarterly architecture reviews with the client's CTO and Head of Risk kept scope aligned. End-to-end rollout completed in 6 months with zero client-visible incidents.",
    results: [
      "Infrastructure scaled to handle 500M+ daily transactions",
      "Reduced p99 latency from 120ms to 35ms",
      "Achieved 99.99% uptime during peak trading hours",
      "Cut infrastructure spend by $2.3M annually through right-sizing and spot usage",
      "Eliminated maintenance-window deploys — release cadence moved from monthly to daily"
    ],
    techStack: ["Kubernetes (EKS)", "Kafka", "gRPC", "Go", "Java", "Redis", "PostgreSQL", "Terraform", "OpenTelemetry", "Prometheus", "Grafana", "AWS"],
    image: "https://images.unsplash.com/photo-1635236066449-5f81ce4a2bef?w=1200&h=700&fit=crop&auto=format",
    duration: "6 months",
    teamSize: "12 engineers",
    deliveryModel: "Managed Services Pod"
  },
  {
    id: 2,
    slug: "legacy-platform-modernization",
    client: "Enterprise SaaS Company",
    industry: "B2B Software",
    title: "Modernized a 15-Year-Old Platform in 90 Days",
    impact: "Migrated 2.5M users with zero downtime, 65% faster load times",
    challenge: "A B2B SaaS company with a large installed base needed to modernize a 15-year-old monolithic application without service disruption.",
    approach: "Assembled a full-stack team and executed phased migration to cloud-native architecture with zero downtime strategy.",
    overview: "The platform supported mission-critical workflows for enterprise customers across finance, HR, and procurement. Its legacy PHP monolith had grown unmaintainable: new feature releases averaged one per quarter, onboarding a new engineer took six weeks, and AWS spend was growing 35% year over year without matching revenue growth. Leadership needed a modernization path that preserved existing contracts and SLAs while unlocking weekly release velocity.",
    challenges: [
      "15 years of business logic with limited documentation and heavy use of stored procedures",
      "Tightly coupled front-end and back-end rendering, blocking any independent UI refresh",
      "Database schema serving reporting, OLTP, and batch jobs from the same tables",
      "Contractual uptime SLA of 99.95% with hard penalties for customer-visible outages",
      "Parallel feature roadmap that could not be paused during migration"
    ],
    solution: "We executed a strangler-fig migration: a new React front-end behind an API gateway, with Node.js/NestJS services carved out of the monolith by bounded context. Read traffic was shifted to new services first behind feature flags, followed by writes, using dual-write and CDC (Debezium) to keep the legacy DB and new PostgreSQL stores consistent. Core reporting moved to a separate read replica to eliminate OLTP contention. A customer-visible changelog plus progressive rollout by tenant gave enterprise clients confidence throughout cutover.",
    execution: "An 18-engineer team operated across three streams (front-end, services, data) with a dedicated SRE sub-team owning rollout safety. The team ran in 1-week iterations with a weekly stakeholder demo. Feature-flagged rollout was executed tenant-by-tenant over the final four weeks, with automated rollback on any SLA regression.",
    results: [
      "Migrated 2.5M users to the new platform with zero downtime",
      "Reduced p95 page load times by 65%",
      "Cut operational cloud costs by 40%",
      "Moved release cadence from quarterly to weekly",
      "Reduced new-engineer onboarding from 6 weeks to 8 days"
    ],
    techStack: ["React", "TypeScript", "Node.js", "NestJS", "PostgreSQL", "Debezium", "Kafka", "AWS ECS", "CloudFront", "LaunchDarkly", "Datadog"],
    image: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=1200&h=700&fit=crop&auto=format",
    duration: "3 months",
    teamSize: "18 engineers",
    deliveryModel: "Managed Services + Consulting"
  },
  {
    id: 3,
    slug: "algorithmic-trading-platform",
    client: "Institutional Asset Manager",
    industry: "Investment Management",
    title: "Built an Algorithmic Trading Platform from Scratch",
    impact: "$2B+ daily trade volume with 99.999% reliability",
    challenge: "A multi-billion-dollar asset manager required a proprietary algorithmic trading platform with complex quantitative models and real-time risk management.",
    approach: "Delivered end-to-end platform development with quantitative engineers, data engineers, and trading system specialists.",
    overview: "The firm's existing execution stack combined three vendor products stitched together with scripts. Strategy researchers could not backtest and deploy on the same infrastructure, slippage between research and production signals was material, and risk calculations ran on end-of-day batches. Leadership committed to a ground-up rebuild to consolidate research, execution, and risk onto a single platform.",
    challenges: [
      "Research-to-production gap causing signal decay between backtest and live trading",
      "Intraday risk exposure across 10,000+ positions computed only at market close",
      "Need for deterministic, replayable execution for model audit and attribution",
      "Multi-venue connectivity with strict exchange conformance and failover requirements",
      "Full regulatory audit trail for every order decision, model input, and risk check"
    ],
    solution: "We delivered a unified Python/Rust platform: a research environment with vectorized backtesting on historical tick data, a deterministic execution engine in Rust for sub-millisecond order handling, and a streaming risk service computing exposure in real time across all strategies. A central event store (Kafka + S3) captured every market tick, order, fill, and risk calculation, enabling full replay and model attribution. Deployment used dedicated, latency-tuned bare-metal alongside co-located exchange connectivity.",
    execution: "A 15-person delivery team combined two quant engineers embedded with the client's research desk, a core execution squad, a data platform squad, and a risk/compliance squad. The team shipped an MVP in 10 weeks, ran 8 weeks of parallel paper trading, and cut over one strategy at a time over the final 12 weeks. Model governance and audit reviews were built into the release pipeline.",
    results: [
      "Platform handling $2B+ in daily trade volume",
      "Real-time risk calculations across 10,000+ positions",
      "99.999% system reliability in first 12 months",
      "Reduced trade execution time by 85%",
      "Closed research-to-production gap — strategies now deploy in hours, not weeks"
    ],
    techStack: ["Rust", "Python", "FIX Protocol", "Kafka", "ClickHouse", "Redis", "PostgreSQL", "Kubernetes", "Pandas", "NumPy", "Grafana"],
    image: "https://images.unsplash.com/photo-1642790551116-18e150f248e5?w=1200&h=700&fit=crop&auto=format",
    duration: "8 months",
    teamSize: "15 specialists",
    deliveryModel: "Dedicated Delivery Team"
  }
];

export const testimonials = [
  {
    id: 1,
    quote: "By seamlessly integrating with the internal team, Infotron helped achieve key objectives by performing to the same expectations as full-time employees.",
    author: "Surendra Pathak",
    title: "Founder & CEO",
    company: "Interlynk"
  },
  {
    id: 2,
    quote: "Infotron has been a great business partner, providing great quality resource to augment high-performing and fast-moving teams.",
    author: "Amit Mishra",
    title: "Sr. Director, Engineering",
    company: "Fox Sports"
  }
];

export const blogPosts = [
  {
    id: 1,
    title: "The Total Cost of Technology Talent: Why Elite Teams Pay for Themselves",
    excerpt: "Analysis of how top-tier engineering teams reduce operational costs, accelerate time-to-market, and minimize technical debt.",
    author: "Infotron Strategy Team",
    date: "2025-01-15",
    readTime: "8 min",
    category: "Strategy",
    image: "https://images.unsplash.com/photo-1763550662603-78aa2f2033bf?w=800&h=400&fit=crop&auto=format",
    slug: "total-cost-technology-talent"
  },
  {
    id: 2,
    title: "Staff Augmentation vs. Managed Services: A Decision Framework for CTOs",
    excerpt: "Comprehensive guide to choosing the right engagement model based on organizational maturity, project complexity, and strategic objectives.",
    author: "Infotron Leadership",
    date: "2025-01-10",
    readTime: "12 min",
    category: "Insights",
    image: "https://images.unsplash.com/photo-1750768145268-a42806c391a4?w=800&h=400&fit=crop&auto=format",
    slug: "staff-augmentation-vs-managed-services"
  },
  {
    id: 3,
    title: "Building FinTech Infrastructure That Scales: Lessons from $100B+ Platforms",
    excerpt: "Technical deep-dive into architectural patterns, technology choices, and operational practices from high-scale financial systems.",
    author: "Engineering Team",
    date: "2025-01-05",
    readTime: "15 min",
    category: "Technology",
    image: "https://images.pexels.com/photos/5256687/pexels-photo-5256687.jpeg?w=800&h=400&fit=crop&auto=format",
    slug: "fintech-infrastructure-scaling"
  },
  {
    id: 4,
    title: "The Myth of the 'Unicorn' Developer: Why Team Composition Beats Individual Talent",
    excerpt: "Research-backed analysis of team dynamics, skill complementarity, and organizational effectiveness in technology delivery.",
    author: "Talent Strategy Team",
    date: "2024-12-28",
    readTime: "10 min",
    category: "Talent",
    image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?w=800&h=400&fit=crop&auto=format",
    slug: "team-composition-vs-individual-talent"
  }
];

export const jobListings = [
  {
    id: "job-001",
    title: "Senior Full-Stack Engineer",
    location: "Remote (US)",
    type: "Full-Time",
    category: "Engineering",
    description: "Join elite teams building mission-critical systems for FinTech and enterprise clients. React, Node.js, AWS, microservices architecture.",
    requirements: ["5+ years full-stack experience", "React, Node.js, TypeScript", "Cloud architecture (AWS/Azure)", "Financial systems experience preferred"],
    responsibilities: ["Design and build scalable applications", "Lead technical implementation", "Mentor junior engineers", "Client collaboration"],
    salary: "$140K - $180K + performance bonus"
  },
  {
    id: "job-002",
    title: "DevOps/Platform Engineer",
    location: "New York, NY / Remote",
    type: "Full-Time",
    category: "Infrastructure",
    description: "Build and manage cloud infrastructure for high-scale trading and SaaS platforms. Kubernetes, Terraform, CI/CD, observability.",
    requirements: ["4+ years DevOps/Infrastructure experience", "Kubernetes production experience", "Infrastructure as Code (Terraform)", "High-scale systems background"],
    responsibilities: ["Design cloud infrastructure", "Implement CI/CD pipelines", "System reliability and performance", "Security and compliance"],
    salary: "$135K - $175K + performance bonus"
  },
  {
    id: "job-003",
    title: "SAP Solutions Architect",
    location: "Remote (US/EMEA)",
    type: "Contract",
    category: "Consulting",
    description: "Lead SAP implementations and transformations for Fortune 500 clients. S/4HANA, Fiori, integration architecture.",
    requirements: ["8+ years SAP experience", "S/4HANA migration expertise", "Enterprise architecture background", "Client-facing consulting experience"],
    responsibilities: ["Solution architecture and design", "Client stakeholder management", "Technical team leadership", "Risk management"],
    salary: "$160 - $220/hour"
  },
  {
    id: "job-004",
    title: "Quantitative Developer",
    location: "New York, NY",
    type: "Full-Time",
    category: "Trading",
    description: "Build algorithmic trading systems and quantitative models for hedge funds and prop trading firms. Python, C++, real-time systems.",
    requirements: ["3+ years in trading systems", "Python/C++ proficiency", "Low-latency systems experience", "Financial markets knowledge"],
    responsibilities: ["Develop trading algorithms", "Optimize system performance", "Real-time data processing", "Backtesting and simulation"],
    salary: "$150K - $200K + significant bonus"
  },
  {
    id: "job-005",
    title: "Data Engineer",
    location: "Remote (Americas)",
    type: "Full-Time",
    category: "Data",
    description: "Design and build data pipelines for analytics and ML platforms. Spark, Kafka, Airflow, data warehousing at scale.",
    requirements: ["4+ years data engineering", "Spark/Kafka expertise", "Data warehouse design", "Python/Scala proficiency"],
    responsibilities: ["Build data pipelines", "Design data architecture", "Performance optimization", "Data quality and governance"],
    salary: "$130K - $170K + performance bonus"
  },
  {
    id: "job-006",
    title: "Engineering Manager",
    location: "San Francisco, CA / Remote",
    type: "Full-Time",
    category: "Leadership",
    description: "Lead engineering teams delivering for Fortune 500 and high-growth clients. People leadership, technical oversight, client management.",
    requirements: ["7+ years engineering experience", "3+ years management experience", "Delivered large-scale projects", "Client relationship management"],
    responsibilities: ["Team leadership and development", "Technical delivery oversight", "Client partnership", "Hiring and talent development"],
    salary: "$160K - $210K + performance bonus"
  }
];

export const companyValues = [
  {
    title: "Execution Excellence",
    description: "We deliver results, not excuses. Every engagement is measured by outcomes, not effort.",
    icon: "CheckCircle"
  },
  {
    title: "Client Partnership",
    description: "Your success is our success. We operate as an extension of your leadership team.",
    icon: "Handshake"
  },
  {
    title: "Technical Rigor",
    description: "World-class engineering standards. Code quality, architecture, and operational excellence in everything we build.",
    icon: "Code"
  },
  {
    title: "Speed with Quality",
    description: "Fast delivery without compromising on quality. We move quickly because we're experienced, not reckless.",
    icon: "Rocket"
  },
  {
    title: "Continuous Learning",
    description: "Technology evolves rapidly. We invest heavily in our teams' growth and stay at the cutting edge.",
    icon: "BookOpen"
  },
  {
    title: "Transparency",
    description: "Honest communication about progress, challenges, and outcomes. No surprises, no spin.",
    icon: "Eye"
  }
];

export const aboutStats = [
  { number: "92%", label: "Client Retention Rate" },
  { number: "2000+", label: "Technical Candidates Evaluated" },
  { number: "15+", label: "Years of Leadership Experience" }
];

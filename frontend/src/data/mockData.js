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
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&h=700&fit=crop&auto=format",
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
    image: "https://images.unsplash.com/photo-1642543492481-44e81e3914a7?w=1200&h=700&fit=crop&auto=format",
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
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1200&h=600&fit=crop&auto=format",
    slug: "total-cost-technology-talent",
    sections: [
      {
        heading: "The hidden price of \"affordable\" engineering",
        body: "Most engineering leaders evaluate talent on a single dimension: hourly rate. The cheaper the resource, the better the deal. This framing is one of the most persistent and most expensive mistakes in enterprise technology delivery. The fully-loaded cost of a software engineer is not their bill rate. It is the time they consume from senior engineers, the rework they introduce, the technical debt they leave behind, and the velocity they fail to unlock for the rest of the team."
      },
      {
        heading: "What \"elite\" actually changes in a delivery program",
        body: "Senior engineers do four things that compound over time. They make architectural decisions that survive contact with production. They write code that other engineers can extend without rewriting it. They identify the highest-leverage problem on a roadmap and solve that one first. And they raise the floor of every engineer around them by leaving behind better documentation, cleaner abstractions, and clearer domain models. None of those four show up on a timesheet, but every one of them shows up on a P&L."
      },
      {
        heading: "A simple framework: cost-to-outcome ratio",
        body: "Stop optimizing on cost-per-hour. Start optimizing on cost-per-outcome. An engineer who is twice as expensive but ships a feature in one third of the time, with one fifth of the post-launch defects, is a 6–10x cheaper engineer once you measure what actually matters: time-to-revenue and total-cost-of-ownership. We have seen this pattern repeat across trading platforms, B2B SaaS migrations, and PMO digitization programs. The data is consistent: senior pods finish in weeks what mid-level teams stretch into quarters."
      },
      {
        heading: "When to insist on senior, and when not to",
        body: "Elite talent is not the right answer for every line of work. Repeatable, well-specified workstreams (UI flow implementation against a finalized design, batch data loading against a known schema, content migration with deterministic mapping) are well served by mid-level engineers paired with strong tooling. Where seniority is non-negotiable: greenfield architecture, latency-sensitive systems, integrations that must survive five years of evolution, and any program where the cost of being wrong exceeds the cost of being slow."
      },
      {
        heading: "The bottom line",
        body: "If you measure your engineering org by hours billed, you are buying activity. If you measure it by outcomes shipped per quarter, you are buying leverage. The leaders who consistently ship faster than their peers are not paying less for talent. They are paying differently for it, and they are paying for it once instead of three times."
      }
    ]
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
    slug: "staff-augmentation-vs-managed-services",
    sections: [
      {
        heading: "Two models, very different commitments",
        body: "Staff augmentation and managed services are often discussed as substitutes. They are not. Staff augmentation extends the capacity of an existing team. Managed services transfer the responsibility for an outcome. The former is a multiplier on your existing engineering org; the latter is an alternative to building one. Treating these as interchangeable is the single biggest reason vendor engagements miss expectations on both sides."
      },
      {
        heading: "Choose staff augmentation when…",
        body: "Your team has clear ownership of the architecture, your roadmap is mature, your engineering managers can absorb new contributors quickly, and your bottleneck is throughput, not direction. Augmentation works best when you know exactly what to build and need more hands that can be steered by your existing leads. The risk: if your roadmap is ambiguous or your internal leadership is overloaded, augmented engineers will sit idle or build the wrong thing."
      },
      {
        heading: "Choose managed services when…",
        body: "You have a defined business outcome (a product launch, a platform migration, an SLA to hold) but you do not have, or do not want to build, the internal capability to deliver it end-to-end. A managed services pod owns architecture, delivery, and operations against a measurable target. The risk: vendor lock-in if the engagement is not designed for transfer from day one. Always demand a documented exit and ownership transition path before the contract is signed."
      },
      {
        heading: "The hybrid model nobody talks about",
        body: "The fastest-moving enterprise engineering orgs we work with do not pick one. They run a small managed-services pod for a high-uncertainty initiative (a new product line, a regulatory deadline) while running staff augmentation against a stable mature platform. The managed pod absorbs the unknowns; the augmented team accelerates the knowns. The CTO retains architectural authority across both."
      },
      {
        heading: "How to choose, in three questions",
        body: "1. Do I know what to build, or do I know what outcome I need? If the former, augment. If the latter, manage. 2. Is my internal team's bottleneck capacity, or capability? If capacity, augment. If capability, manage. 3. Will the deliverable live inside my codebase forever, or is it a discrete program? If forever, augment so the knowledge stays. If discrete, manage so the accountability stays. Get those three right and the engagement model picks itself."
      }
    ]
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
    slug: "fintech-infrastructure-scaling",
    sections: [
      {
        heading: "The four properties every fintech platform needs",
        body: "Across every multi-billion-dollar trading and asset platform we have helped build, four non-negotiable properties show up: deterministic execution, strict tenant isolation, full auditability, and a clean recovery story. None of these are exotic. All four are routinely under-engineered. The platforms that survive their own growth are the ones that engineered them in from the first commit, not the ones that retrofit them after a regulator visit."
      },
      {
        heading: "Deterministic execution beats clever execution",
        body: "Trading systems do not get points for elegance. They get points for behaving the same way at 9:30am on a quiet Tuesday and at 3:59pm on a Fed-decision Friday. Determinism comes from a small number of choices: a single-writer principle for state, an event log as the source of truth, idempotent handlers, and pure functions wherever the business logic lives. Build those four primitives and you can replay any trading day in your sleep, including the bad ones."
      },
      {
        heading: "Tenant isolation: where shortcuts always come back",
        body: "Multi-tenant fintech platforms tend to evolve through three phases. Phase one: shared everything. Phase two: shared compute, isolated data. Phase three: isolated compute, isolated data, shared control plane. Every team we have worked with has tried to skip phase three. None of them succeeded. The cost of going from phase two to three at 10x scale is roughly 30x the cost of building phase three at the start. Plan accordingly."
      },
      {
        heading: "Auditability is a feature, not a logging concern",
        body: "Every order, every fill, every risk check, every model input. Captured. Time-stamped. Replayable. Indexed by trade, by user, by strategy, by symbol. A real audit trail is a column in your data model, not a side effect of your logger. Treat it that way and the next regulatory request becomes a query, not a project."
      },
      {
        heading: "The recovery story is the architecture",
        body: "Ask yourself one question: if our primary region disappeared in the next sixty seconds, exactly what process would resume trading from a different region? If the answer is more than two paragraphs long, the architecture is not done yet. The platforms that scale to $100B+ in daily volume are the ones that can answer that in two sentences and run the drill quarterly. The technology stack matters less than the operational discipline that surrounds it."
      }
    ]
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
    slug: "team-composition-vs-individual-talent",
    sections: [
      {
        heading: "Why 10x engineers do not save 10x time",
        body: "The \"10x engineer\" idea is correct in spirit and wrong in practice. There are engineers who outperform peers by an order of magnitude on raw output. There are very few teams in which their presence translates linearly into team output. The reason is mundane: engineering is overwhelmingly a coordination problem. A single engineer cannot review their own pull requests, cannot cover their own pager rotation, and cannot fill the room with the perspectives needed to spot a bad architectural decision before it ships."
      },
      {
        heading: "What complementarity actually looks like",
        body: "Strong teams pair four kinds of strength: a deep systems thinker who owns the architecture, a relentless executor who closes tickets faster than the backlog can grow, a domain translator who bridges product and engineering, and a quality gatekeeper who keeps the platform from rotting under release pressure. None of those four people need to be the strongest engineer in the room. All four need to be excellent at the specific job they own."
      },
      {
        heading: "The composition trap most companies fall into",
        body: "Too many staff plus, all chasing the same architectural decision, makes a team slower, not faster. Too many mids, all waiting for direction, makes a team productive at the wrong things. The healthiest pods we have run are roughly 1 senior engineer per 3 mid-level engineers per 1 quality engineer, with a tech lead who is half coder, half coordinator. That ratio sounds simple. It is. It is also very rarely held to."
      },
      {
        heading: "Hire for the gap in the team, not the gap in the market",
        body: "When you are hiring engineer number eight, do not ask \"who is the best engineer available?\" Ask \"who plugs the hole that engineer one through seven cannot?\" That question reorders priorities. Sometimes the best hire is the senior backend engineer everyone is chasing. More often, it is the boring, methodical SRE who will quietly own the on-call rotation and let the rest of the team focus."
      },
      {
        heading: "The takeaway",
        body: "Optimize for the team's vector, not its top scorer. Five engineers pointing in the same direction will out-deliver eight engineers each chasing their own hill, every quarter, on every metric that ends up on a board slide. Talent matters. Composition matters more."
      }
    ]
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

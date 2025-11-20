export const CORE_SKILLS = [
    "Python", "JavaScript", "Java", "SQL",
    "React", "Spring Boot", "AWS", "Kafka"
];

export const WORK_EXPERIENCE = [
    {
        id: "sheetz",
        company: "Sheetz",
        role: "Software Engineer",
        period: "Jan 2024 - Dec 2024",
        description: "Built real-time event syndication systems handling 500k+ events/sec using Kafka.",
        image: "https://images.unsplash.com/photo-1558494949-ef526b0042a0?q=80&w=1000&auto=format&fit=crop",
        category: "Distributed Systems",
        content: {
            title: "Data Streaming Platform",
            subtitle: "Real-Time Event Syndication at Scale",
            tech: "Kafka (MSK) | Databricks | PySpark | Delta Live Tables | SolarWinds | JMeter",
            sections: [
                {
                    heading: "Project Context and Goal",
                    body: "Sheetz, a U.S. convenience store and fuel chain, planned to expand from ~700 to ~1300 stores, which meant scaling their existing data infrastructure to handle a sharp rise in real-time data volume — from store transactions, IoT telemetry, and inventory systems.\n\nTheir Unified Commerce Platform (UCP) was heavily dependent on Mulesoft for integrations between these systems. While Mulesoft is excellent for orchestrating API-based workflows, it wasn't designed to handle high-throughput, real-time streaming workloads.\n\nThe core mission was to replace the legacy Mulesoft integration layer with a Kafka-based, real-time event syndication pipeline that could support massive data ingestion, provide fault tolerance, and scale seamlessly with store expansion."
                },
                {
                    heading: "Data Input Sources",
                    body: "The streaming pipeline integrated three major upstream systems:\n\n**GK Cloud:** Consolidated transaction data system combining in-store and fuel purchases. Each store generated continuous purchase data from POS terminals and fuel pumps.\n\n**IoT Data:** Real-time telemetry data from in-store sensors — temperature, HVAC, lighting, fuel levels. Data was stored as telemetry objects in Azure Blob Storage.\n\n**Ignite:** Inventory management and stock tracking for fuel and general store merchandise. Handled stock-level data across stores."
                },
                {
                    heading: "Event Syndication Layer – Kafka/MSK",
                    body: "After evaluating RabbitMQ, Apache Pulsar, AWS Kinesis, and AWS MSK, we chose **AWS MSK (Managed Kafka)** for its mature ecosystem, managed infrastructure, and high flexibility.\n\n**Benchmarking:** Performance testing was conducted using Apache JMeter to simulate producers generating events at varying rates, with Nginx as a load balancer. MSK delivered superior throughput (~500K events/sec sustained) and stability under high load.\n\n**Topic Design:**\n• Separate topics for each data domain: `gk-transactions`, `iot-telemetry`, `ignite-inventory`\n• Partition Key: `store_id` (ensures ordering per store)\n• Replication Factor: 3 (ensures durability)\n• Retention Policy: 7 days (allows replay/reprocessing)"
                },
                {
                    heading: "Data Processing – Databricks + PySpark",
                    body: "Once events were streamed into MSK, Databricks handled streaming ingestion, transformation, and loading into Delta Live Tables (DLT).\n\n**GK Cloud Transformations:**\n• Parsed raw JSON into structured schema\n• Normalized timestamps to a common timezone\n• Derived new fields: `transaction_date`, `hour_of_day`, `is_fuel_purchase`\n• Filtered malformed records into a quarantine table\n\n**IoT Telemetry:**\n• Normalized units (temperature, power, fuel)\n• Filtered invalid data (negative or impossible values)\n• Derived `is_within_expected_range` and `alert_flag` for thresholds\n\n**Ignite Inventory:**\n• Standardized SKUs across systems\n• Derived `is_low_stock` and `days_since_last_restock`"
                },
                {
                    heading: "Monitoring and Observability",
                    body: "**SolarWinds:** Tracked CPU, memory, network, and disk I/O for EC2 and Databricks clusters. Alerts for node health or network issues.\n\n**AWS CloudWatch:** Collected metrics for MSK brokers, storage, and network performance. Integrated with SolarWinds via API.\n\n**Databricks Job UI + Logs:** Monitored job failures, consumer lag, checkpoint health, and latency per micro-batch."
                },
                {
                    heading: "Outcomes",
                    body: "• **Data latency:** 30–60 min → < 5 seconds\n• **Throughput capacity:** Limited by API call frequency → ~500K events/sec (benchmarked)\n• **Fault tolerance:** Minimal retry handling → Replay + idempotent consumer support\n• **Scalability:** Manual, brittle → Horizontal, auto-scaling consumers\n• **Observability:** Basic logs → Full infra + app monitoring\n\nThe final system enabled unified real-time data flow across retail, IoT, and inventory domains, improved monitoring and resilience, and created a scalable base for predictive analytics and anomaly detection."
                }
            ]
        }
    },
    {
        id: "bank-of-america",
        company: "Bank of America",
        role: "Software Engineer II",
        period: "June 2022 - July 2023",
        description: "Developing high-frequency trading platforms and financial data pipelines.",
        image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=1000&auto=format&fit=crop",
        category: "FinTech",
        content: {
            title: "Merrill Lynch Derivative Products Automation",
            subtitle: "Risk & Derivatives Platform",
            tech: "Java | Spring Boot | Kafka | SQL | Spring Batch | Jenkins | SolarWinds | Postman",
            sections: [
                {
                    heading: "Context",
                    body: "The derivatives division at Merrill Lynch handled products like swaps, options, and structured notes, traded across six major currencies – USD, EUR, GBP, JPY, AUD, and CAD. Each trade generated large volumes of post-trade data that needed to be validated, transformed, and loaded into downstream risk-management systems for daily exposure calculations and P&L reporting.\n\nOriginally, much of this process relied on manual verification and legacy batch scripts. This caused delays, inconsistent updates, and frequent job failures that affected the timeliness of risk reports.\n\nMy goal was to automate these manual steps, modernize the batch flows, and make the overall data pipeline more scalable and observable."
                },
                {
                    heading: "System Overview",
                    body: "The project sat in the middleware layer between three main components:\n\n• **Trade Capture Systems** – source of truth for executed derivative trades\n• **Market Data Feeds** – live pricing, exchange rates, and reference data\n• **Risk Management Platform** – consumers of validated trade and market data for exposure and analytics\n\nMy layer handled:\n• Data ingestion and validation\n• Transformation into consistent schemas\n• Delivery of clean data to the risk platform\n• Logging, monitoring, and audit tracking for compliance"
                },
                {
                    heading: "Building Kafka + Spring Boot Microservices",
                    body: "Developed microservices in Java (Spring Boot) using Spring Kafka to replace file-based transfers. Kafka acted as the streaming backbone, carrying trade events and updates between systems.\n\nEach service had a producer (publishing normalized events) and consumer (subscribing to topics for risk ingestion). Implemented idempotent consumption and offset tracking so duplicate messages never corrupted data.\n\nThe services mainly handled two data categories:\n• **Trade Capture Data** – trade IDs, instrument details, notional amounts, timestamps\n• **Market Data Feeds** – reference rates and mark-to-market values for those instruments"
                },
                {
                    heading: "ETL (Extract–Transform–Load) Jobs",
                    body: "Designed ETL flows in the same ecosystem:\n\n**Extract:** Pulled real-time trade events from Kafka topics. For less frequent updates (like counterparty reference data), used REST APIs exposed by the upstream systems.\n\n**Transform:**\n• Cleaned malformed or duplicate records\n• Normalized currencies, timestamps, and numeric formats\n• Enriched trade data with current market values\n• Applied mapping rules to match schemas expected by the risk DB\n\n**Load:** Loaded the validated and normalized data into the risk-management database. Each transaction included audit metadata (trade ID, timestamp, batch ID).\n\nThe pipeline processed roughly 10K trade updates per day, sustaining high reliability and near-real-time ingestion."
                },
                {
                    heading: "Modernizing Legacy Batch Jobs",
                    body: "Migrated fragile shell/Perl jobs to Spring Batch for structured job control. Added checkpointing and retry logic to resume from the last processed record instead of restarting entire jobs.\n\nParameterized job configurations and integrated everything into Jenkins for scheduled execution. Connected SolarWinds monitoring alerts to Jenkins pipelines, enabling early detection of stalled or failed runs.\n\nThis improved batch-job stability by ~85% and cut manual restarts dramatically."
                },
                {
                    heading: "Results",
                    body: "• **Manual verification workload:** Reduced from hours daily to near-zero\n• **Batch job stability:** +85% uptime increase\n• **SLA breaches in daily risk reports:** Largely eliminated\n• **Incident resolution:** Cut roughly in half (≈ 2h → 45 min)\n• **Risk data freshness:** From batch-hourly to near real-time"
                }
            ]
        }
    },
    {
        id: "brillio",
        company: "Brillio",
        role: "Developer",
        period: "July 2021 - June 2022",
        description: "Led cloud migration initiatives and microservices architecture design.",
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000&auto=format&fit=crop",
        category: "Cloud & APIs",
        content: {
            title: "Verizon 5G Data Integration & API Modernization",
            subtitle: "SOAP to REST Migration",
            tech: "Spring Boot | JDBC | Cassandra | JUnit | Mockito | Postman",
            sections: [
                {
                    heading: "Overview",
                    body: "Led the transformation of Verizon's legacy SOAP services to modern RESTful APIs as part of their 5G data integration initiative. The project focused on maintaining backward compatibility while introducing modern features and improving system performance."
                },
                {
                    heading: "Responsibilities",
                    body: "**API Transformation:**\n• Transformed SOAP services to RESTful APIs using Spring Boot and JDBC\n• Ensured backward compatibility for legacy consumers while adding modern features\n• Bridged SOAP contract structures with REST resource models\n\n**Testing & Quality:**\n• Wrote comprehensive unit tests (JUnit, Mockito) and endpoint tests (Postman)\n• Achieved 85% test coverage across all services\n• Implemented validation pipelines to prevent data loss during migration\n\n**Documentation:**\n• Created detailed architecture and method flows (HLD/LLD)\n• Standardized onboarding documentation for new team members\n\n**Database Migration:**\n• Implemented Cassandra migration scripts from SQL\n• Automated key-value mapping for seamless data transition"
                },
                {
                    heading: "Key Challenges",
                    body: "• **Contract Mapping:** Bridging SOAP contract structures with REST resource models required careful design to maintain semantic equivalence\n• **Data Integrity:** Preventing data loss during migration by introducing comprehensive validation pipelines\n• **Legacy Support:** Maintaining backward compatibility while modernizing the API layer"
                },
                {
                    heading: "Impact",
                    body: "• Improved integration latency by > 30%\n• Modernized Verizon's data interfaces for 5G readiness\n• Reduced technical debt and improved maintainability\n• Enabled faster feature development with modern API patterns"
                }
            ]
        }
    },
    {
        id: "accenture",
        company: "Accenture",
        role: "Associate Software Engineer",
        period: "Aug 2020 - July 2021",
        description: "Full-stack development for enterprise-scale web applications.",
        image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1000&auto=format&fit=crop",
        category: "Healthcare Tech",
        content: {
            title: "AstraZeneca VeevaCRM iPatient Platform",
            subtitle: "Healthcare Data Platform",
            tech: "Salesforce Apex | LWC | Health Cloud | Community Cloud | Splunk",
            sections: [
                {
                    heading: "Overview",
                    body: "Worked on the VeevaCRM iPatient Healthcare Platform for AstraZeneca, focusing on real-time patient health data tracking for chronic conditions. The platform enabled healthcare providers to monitor patient data, track treatment progress, and ensure data accuracy across the system."
                },
                {
                    heading: "Key Deliverables",
                    body: "**Real-Time Data Tracking:**\n• Implemented real-time patient health data tracking for chronic conditions\n• Ensured data synchronization across multiple systems\n• Built dashboards for healthcare providers to monitor patient progress\n\n**Bug Fixes & Optimization:**\n• Diagnosed and fixed data sync bugs in Salesforce using Apex Triggers and Workbench\n• Enhanced Apex logic for edge cases ensuring real-time dashboard accuracy\n• Improved system reliability and data consistency\n\n**Monitoring & Analytics:**\n• Integrated Splunk for log analysis and system monitoring\n• Created Salesforce Health Cloud reports to measure uptime and system health\n• Implemented proactive alerting for system issues"
                },
                {
                    heading: "Achievements",
                    body: "• **20% reduction in system downtime** through proactive monitoring and bug fixes\n• **Top 4 placement** in Accenture x Salesforce Hackathon for building a healthcare appointment and communication app\n• Improved data accuracy and reliability for patient health tracking\n• Enhanced user experience for healthcare providers"
                }
            ]
        }
    }
];

export const PROJECTS = [
    {
        id: "resume-chatbot",
        title: "Resume ChatBot",
        category: "AI & Cloud",
        description: "An interactive AI assistant powered by Amazon Bedrock and AWS Lambda.",
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1000&auto=format&fit=crop",
        content: {
            title: "Resume ChatBot – Serverless RAG Application on AWS",
            subtitle: "Personal Project, Mid-2024 (Ongoing)",
            tech: "AWS Lambda | API Gateway | DynamoDB | AWS Bedrock | FAISS | SentenceTransformers | React (Vercel)",
            sections: [
                {
                    heading: "Context",
                    body: "This project started as an experiment in learning how large language models (LLMs) could be applied to personal data retrieval. The goal was simple: build a chatbot that could 'chat with your resume' — answer recruiter-style questions about your background, projects, and skills in natural language — using Retrieval-Augmented Generation (RAG).\n\nI began with local GPU experimentation and later migrated to a serverless cloud-based architecture for scalability and cost efficiency."
                },
                {
                    heading: "Local Prototype (Learning Phase)",
                    body: "Began with minimal LLM understanding — basic prompting, context limits, and model selection. Experimented with open-source models such as Flan-T5, CodeT5, TinyLLaMA, and SmolLM2.\n\n**Implementation:**\n• Chunked resume text into smaller pieces to fit model token limits\n• Created FAISS indexes of vector embeddings generated using SentenceTransformers for semantic search\n• Locally tested retrieval and generation logic using lightweight Python scripts and Gradio UI\n\n**Challenges:**\n• Limited compute (CPU inference only)\n• Model latency and context loss on larger resumes\n• Manual environment setup and dependency conflicts"
                },
                {
                    heading: "Cloud Migration (Scalable Architecture)",
                    body: "Once the prototype worked locally, I transitioned the pipeline to AWS, focusing on scalability and cost optimization.\n\n**Architecture Flow:**\n```\nUser → React Frontend (Vercel)\n     → API Gateway → AWS Lambda\n                       ↳ DynamoDB (stores embeddings, metadata)\n                       ↳ AWS Bedrock (model inference)\n                       ↳ SES (contact form)\n```\n\n**User Query Flow:**\n1. A user asks a question on the resume website's chat UI (React + Vercel)\n2. API Gateway forwards the request to Lambda, applying rate limits and basic auth\n3. Lambda retrieves relevant resume chunks from DynamoDB using FAISS embeddings for semantic similarity\n4. Packages these chunks into a RAG prompt and sends to AWS Bedrock for inference\n5. The model generates a grounded, context-aware answer\n6. Lambda returns the response through API Gateway to the frontend in real time"
                },
                {
                    heading: "Technical Highlights",
                    body: "**Retrieval-Augmented Generation (RAG):**\n• Built a RAG pipeline combining semantic search + controlled generation\n• Retrieval: SentenceTransformers embeddings indexed in FAISS → fetches top-k relevant chunks per query\n• Generation: Bedrock model responds strictly from retrieved chunks, minimizing hallucinations\n• Maintains chat history context in DynamoDB for multi-turn coherence\n\n**Serverless Deployment:**\n• AWS Lambda replaced local GPUs entirely\n• Scales automatically with traffic\n• Each invocation performs retrieval + model call, eliminating idle compute costs\n\n**Cost Efficiency:**\n• Lambda: $0.20–$1/month\n• Bedrock: $0.05–$0.10 per session\n• DynamoDB: $1–$2/month\n• SES + API Gateway: $3–$5/month\n• **Total: ≈ $5–$10/month**\n\n**Privacy & Safety:**\n• Removed sensitive personal identifiers (email, phone, links) from embeddings\n• Answers are grounded only on resume-approved content"
                },
                {
                    heading: "Results",
                    body: "• Delivered a fully serverless, GPU-free, and cost-optimized RAG chatbot\n• Responses are semantic, context-aware, and latency-optimized (~1.5s average)\n• Demonstrated full lifecycle skills — from LLM experimentation to cloud deployment and frontend integration\n• Public demo hosted at: https://resume-chatbot-frontend-puce.vercel.app"
                },
                {
                    heading: "Key Learnings",
                    body: "• Embeddings + FAISS form the backbone of intelligent retrieval\n• Model choice is a balance between speed, cost, and accuracy\n• AWS Bedrock simplifies inference scaling — no GPU provisioning needed\n• Even complex AI prototypes can be made practical and affordable with serverless design"
                }
            ]
        }
    },
    {
        id: "kafka-samza-streaming",
        title: "Stream Processing with Kafka and Samza",
        category: "Distributed Systems",
        description: "Real-time streaming architecture for ride-hailing service processing 500K+ events/sec.",
        image: "https://images.unsplash.com/photo-1558494949-ef526b0042a0?q=80&w=1000&auto=format&fit=crop",
        content: {
            title: "Stream Processing with Kafka and Samza",
            subtitle: "Academic Project - Real-Time Ride-Hailing Architecture",
            tech: "Kafka | Apache Samza | AWS EMR | Terraform",
            sections: [
                {
                    heading: "Objective",
                    body: "Design a real-time streaming architecture for a ride-hailing service (Uber-like) that processes thousands of concurrent ride events with minimal latency and high throughput."
                },
                {
                    heading: "Implementation Overview",
                    body: "**Kafka as Messaging Buffer:**\nKafka acted as the distributed messaging buffer. Multiple producers wrote different event types: driver locations, ride requests, trip durations, payments, etc. Each event type was routed into a dedicated Kafka topic such as `driver-location`, `ride-request`, or `trip-duration`.\n\n**Samza as Processing Layer:**\nSamza functioned as the distributed consumer and processing layer. It consumed Kafka streams and applied business logic such as:\n• Driver–passenger matching\n• Pricing logic\n• Dynamic promotions\n\n**Driver Matching Algorithm:**\nA custom driver-match function scored candidate drivers:\n• 40% distance\n• 30% rating\n• 20% fare cost\n\nThis ensured optimal driver selection for each ride request.\n\n**Deployment:**\nDeployed the cluster on AWS EMR for scalability and managed compute provisioning via Terraform."
                },
                {
                    heading: "Challenges & Solutions",
                    body: "**Event Ordering & Deduplication:**\nManaging event ordering and ensuring no duplication when multiple producers emitted concurrent events. Solved using Kafka's partitioning keys and idempotent producers.\n\n**Latency Optimization:**\nEnsuring end-to-end latency < 2 seconds under heavy load. Optimized with asynchronous processing and batching within Samza tasks."
                },
                {
                    heading: "Outcome",
                    body: "Delivered a robust streaming prototype capable of:\n• Ingesting 500K+ events/sec\n• Producing near-real-time analytics dashboards\n• Maintaining sub-2-second end-to-end latency\n• Demonstrating production-grade distributed systems design"
                }
            ]
        }
    },
    {
        id: "wecloud-chat",
        title: "WeCloud Chat",
        category: "Cloud & DevOps",
        description: "Multi-cloud chat application with cross-cloud failover and zero-downtime deployments.",
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000&auto=format&fit=crop",
        content: {
            title: "WeCloud Chat — Cloud-Native Chat Application",
            subtitle: "Academic Project - Multi-Cloud Architecture",
            tech: "Docker | Kubernetes | GKE | Azure | Helm | Terraform | MySQL",
            sections: [
                {
                    heading: "Goal",
                    body: "The goal of this project was to build a chat application that could run reliably across two cloud providers — Google Cloud and Azure. If one cloud went down, the system would automatically keep running on the other. I wanted to design it to be highly available, scalable, and fault-tolerant, just like real production systems."
                },
                {
                    heading: "Architecture",
                    body: "The app was made up of three small services, each focused on one clear task:\n\n• **Profile Service** – handled user data like name, photo, and status\n• **Chat Service** – handled sending, receiving, and storing messages\n• **Login Service** – took care of authentication and user sessions\n\nEach of these was a separate microservice, which meant I could update or restart one without affecting the others."
                },
                {
                    heading: "Containerization & Deployment",
                    body: "**Docker Containers:**\nI packaged each microservice in Docker containers, so they could run anywhere consistently.\n\n**Kubernetes Orchestration:**\nThen I deployed them to Kubernetes, which took care of scaling, self-healing, and load balancing. I used Google Kubernetes Engine (GKE) as my main cluster and also set up a backup cluster on Azure for fault tolerance.\n\n**Infrastructure as Code:**\nTo manage deployments, I used:\n• **Helm charts** to version and deploy services (this made rollbacks very easy)\n• **Terraform** to automate setting up the cloud infrastructure — so I didn't have to do it manually"
                },
                {
                    heading: "Networking and Traffic Handling",
                    body: "Initially, each service had its own load balancer, but that became messy. So I added an **Ingress Controller** — a single entry point that routes traffic to the right service based on the URL.\n\nOn top of that, I used **Azure Front Door** as a global load balancer. It sat in front of both cloud clusters and automatically directed users to whichever cluster was healthy or closest to them.\n\nThis setup made the system **cross-cloud** — if GCP went down, Azure instantly handled the traffic."
                },
                {
                    heading: "Database Migration",
                    body: "I started with an H2 embedded database (good for testing) but switched to MySQL for production. I updated the JDBC configs in each service so they all connected to a shared MySQL instance.\n\nThis allowed real data persistence — users didn't lose messages or profiles when containers restarted."
                },
                {
                    heading: "Scaling and Reliability",
                    body: "• Configured **autoscaling** based on CPU and memory usage. For example, when usage went above 70%, Kubernetes automatically added more pods\n• Used **rolling updates** so I could push new versions without any downtime\n• Kubernetes handled restarts on its own if any service crashed — that's the 'auto-healing' part"
                },
                {
                    heading: "Outcome",
                    body: "• The system could handle more load smoothly and stay online even during updates\n• **Zero downtime** during rolling updates\n• It worked across both GCP and Azure, giving full geographic redundancy (useful if one region fails)\n• The setup proved that multi-cloud deployments are achievable and manageable even with small services"
                },
                {
                    heading: "What I Learned",
                    body: "• How to containerize and orchestrate real microservices using Docker + Kubernetes\n• How to manage infrastructure using Terraform and Helm\n• How to design a multi-cloud deployment with Ingress Controllers and global load balancing\n• The importance of monitoring, auto-scaling, and zero-downtime deployments"
                }
            ]
        }
    },
    {
        id: "ml-cloud",
        title: "Machine Learning on the Cloud",
        category: "ML & Cloud",
        description: "Cab fare prediction using XGBoost on Vertex AI with 92% accuracy.",
        image: "https://images.unsplash.com/photo-1677756119517-756a188d2d94?q=80&w=1000&auto=format&fit=crop",
        content: {
            title: "Machine Learning on the Cloud",
            subtitle: "Academic Project - Cab Fare Prediction",
            tech: "XGBoost | Vertex AI | Google App Engine | Python",
            sections: [
                {
                    heading: "Problem Statement",
                    body: "Predict cab fares using real-world trip data containing pickup/drop coordinates, timestamps, and passenger counts."
                },
                {
                    heading: "Data Preparation & Feature Engineering",
                    body: "**Spatial Features:**\n• Computed Haversine distance (great-circle distance between coordinates)\n• Computed Manhattan distance (grid-based distance)\n\n**Time-Based Features:**\n• Derived hour of day, day of week, month\n• Created weekend flag for demand patterns\n\n**Categorical Features:**\n• Added airport pickup/drop boolean\n• Encoded location-based features"
                },
                {
                    heading: "Model Training",
                    body: "**Training Platform:**\nTrained XGBoost models on Vertex AI with HyperTune for hyperparameter search:\n• `max_depth`\n• `learning_rate`\n• `n_estimators`\n\n**Validation:**\nValidated on hold-out set and exported model for inference.\n\n**Deployment:**\nDeployed inference API on Google App Engine for scalable, on-demand predictions."
                },
                {
                    heading: "Outcome",
                    body: "• Achieved **> 92% accuracy** on test set\n• Created scalable REST endpoint for on-demand predictions\n• Demonstrated end-to-end ML pipeline from data prep to production deployment\n• Leveraged cloud-native tools for training and serving"
                }
            ]
        }
    }
];

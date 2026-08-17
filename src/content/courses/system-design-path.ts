import { Path } from '@/types/content';
import { COURSE_CERTIFICATION_POLICIES } from '../certification-policies';

export const systemDesignPath: Path = {
  id: 'system-design-mastery',
  slug: 'system-design',
  title: 'System Design & Scalable Architecture',
  subtitle: 'Master distributed systems, microservices, load balancing, CAP theorem, database sharding, and caching strategies.',
  description: 'Master high-scale system design: latency vs throughput metrics, load balancing algorithms, database sharding, CAP Theorem trade-offs, distributed caching (Redis), message queues (Kafka/RabbitMQ), event-driven microservices, and real-world system architecture blueprints.',
  icon: '🏗️',
  category: 'cs',
  categoryLabel: 'System Architecture',
  isActive: true,
  status: 'active',
  courseType: 'conceptual',
  difficulty: 'advanced',
  estimatedHours: 50,
  totalLessons: 6,
  totalProjects: 2,
  certificationRequirement: COURSE_CERTIFICATION_POLICIES['system-design'],
  projects: [
    {
      id: 'sd-proj-1',
      slug: 'distributed-url-shortener-architecture-design',
      title: 'High-Scale URL Shortener (TinyURL) Architecture',
      subtitle: 'Design an end-to-end distributed URL shortener system serving 100M daily active users with sub-10ms latency.',
      description: 'Architect a scalable URL shortener platform calculating QPS capacity estimations, Base62 encoding key generation services (KGS), Redis caching layers, and database sharding.',
      difficulty: 'intermediate',
      estimatedHours: 5,
      skillsLearned: ['Back-of-the-Envelope Capacity Estimation', 'Base62 Key Generation Service (KGS)', 'Distributed Cache Invalidation', 'Database Partitioning'],
      prerequisites: ['Scalability & Caching'],
      learningObjectives: ['Calculate QPS and storage hardware capacity requirements.', 'Design collision-free Base62 short URL key generation.'],
      starterCode: `// Architecture Document Blueprint\n// QPS: 100M DAU -> ~1,160 writes/sec, 11,600 reads/sec`,
      projectInstructionsMarkdown: '### Project Overview\nDesign a scalable distributed URL shortener system capable of handling 100M daily users.',
      milestones: [
        { id: 'sdm1', title: 'Milestone 1: Capacity Estimation & API Contracts', description: 'Compute read/write QPS, bandwidth, and storage capacity estimates.', orderIndex: 1 },
        { id: 'sdm2', title: 'Milestone 2: KGS & Database Sharding Architecture', description: 'Architect Key Generation Service and Redis cache lookup layer.', orderIndex: 2 }
      ],
      completionCriteria: 'Verify QPS math accuracy, KGS key collision prevention, and cache hit ratio designs.',
      pathSlug: 'system-design'
    },
    {
      id: 'sd-proj-2',
      slug: 'high-throughput-realtime-chat-system-design',
      title: 'Real-Time Distributed Messaging Platform Architecture',
      subtitle: 'Design a real-time messaging architecture (Slack/WhatsApp) supporting WebSockets, message queues, and push notifications.',
      description: 'Architect a global real-time chat platform incorporating WebSocket gateway servers, Kafka event streaming queues, Cassandra NoSQL chat history stores, and push notification services.',
      difficulty: 'advanced',
      estimatedHours: 8,
      skillsLearned: ['WebSocket Gateway Clusters', 'Apache Kafka Event Streams', 'NoSQL Cassandra Data Model', 'Presence Service Design'],
      prerequisites: ['Message Queues & Distributed Systems'],
      learningObjectives: ['Architect persistent bi-directional WebSocket connection clusters.', 'Design NoSQL Cassandra schemas for time-series message histories.'],
      starterCode: `// Real-Time Chat System Architecture Blueprint\n// WebSocket Gateway -> Kafka -> Cassandra Storage`,
      projectInstructionsMarkdown: '### Project Overview\nArchitect a high-throughput real-time messaging platform supporting millions of concurrent WebSockets.',
      milestones: [
        { id: 'sdm3', title: 'Milestone 1: WebSocket Gateway & Kafka Pipeline', description: 'Design stateful WebSocket connection managers and Kafka topics.', orderIndex: 1 },
        { id: 'sdm4', title: 'Milestone 2: NoSQL Chat History & Presence System', description: 'Model Cassandra time-series table schemas and user presence heartbeats.', orderIndex: 2 }
      ],
      completionCriteria: 'Pass architectural bottleneck reviews, message ordering guarantees, and push notification fallback paths.',
      pathSlug: 'system-design'
    }
  ],
  modules: [
    {
      id: 'sd-mod-1',
      slug: 'system-design-foundations',
      title: 'Level 1: Scalability Metrics & Load Balancing Patterns',
      description: 'Master latency vs throughput trade-offs, SLA availability (99.99%), vertical vs horizontal scaling, and Load Balancer algorithms.',
      level: 'foundations',
      orderIndex: 1,
      lessons: [
        {
          id: 'sd-les-1',
          slug: 'system-design-metrics-scalability',
          title: 'System Metrics: Latency, QPS, Availability Nines & Capacity Math',
          description: 'Calculate Back-of-the-Envelope QPS math, storage sizing, latency p99 metrics, and evaluate horizontal vs vertical scaling.',
          estimatedMinutes: 30,
          orderIndex: 1,
          prerequisites: [],
          concepts: [
            {
              id: 'sdc1_1',
              title: 'Learning Objectives & Back-of-the-Envelope Estimation',
              contentMarkdown: `### Learning Objectives
- Convert Daily Active Users (DAU) into Queries Per Second (QPS) average and peak workloads.
- Evaluate SLA availability thresholds (99.9% vs 99.99% "four nines").
- Distinguish between Vertical Scaling (Scale-Up) and Horizontal Scaling (Scale-Out).
- Understand Latency percentiles (p50, p95, p99 tail latency).

---

### Back-of-the-Envelope Estimation Rules
- $1 \text{ Day} = 86,400 \text{ seconds} \approx 10^5 \text{ seconds}$.
- **QPS Equation**: $\text{QPS} = \frac{\text{Daily Active Users} \times \text{Requests per User}}{86,400}$.
- **Peak QPS**: $\text{Average QPS} \times 2$.`
            }
          ],
          examples: [
            {
              id: 'sdex1_1',
              title: 'Example 1: Capacity Sizing Math',
              code: `// DAU: 10 Million Users
// Each user performs 10 Read requests and 1 Write request per day
// Average Read QPS = (10M * 10) / 86,400 = 1,157 QPS
// Peak Read QPS = 1,157 * 2 = 2,314 QPS

// Storage Calculation for 5 years:
// 10M writes/day * 500 bytes = 5 GB/day * 365 * 5 = 9.125 TB`,
              explanation: 'System design interviews require fast estimation of QPS and 5-year storage capacity requirements.'
            }
          ],
          quiz: [
            {
              id: 'sdq1_1',
              question: 'How much total unscheduled downtime per year is permitted under a 99.99% ("four nines") SLA target?',
              options: ['~52.6 minutes', '~8.76 hours', '~3.65 days', '~1 second'],
              correctOptionIndex: 0,
              explanation: '99.99% availability permits no more than 52.56 minutes of unscheduled downtime per year.'
            }
          ],
          exercise: {
            id: 'sdex-1',
            instructions: 'Write a snippet outputting `"Average Read QPS: 1157"` to standard console.log.',
            initialCode: '// QPS calculation output\n',
            solutionCode: 'console.log("Average Read QPS: 1157");',
            hints: ['console.log("Average Read QPS: 1157");'],
            validationType: 'stdout',
            testCases: [{ id: 'sdtc1', description: 'Outputs Average Read QPS text', expectedOutput: 'Average Read QPS: 1157' }]
          },
          references: [],
          completionCriteria: { requiresConceptsRead: true, requiresQuizPassed: true, requiresExercisePassed: true }
        },
        {
          id: 'sd-les-2',
          slug: 'system-design-load-balancing',
          title: 'Load Balancing Algorithms & Consistent Hashing',
          description: 'Distribute incoming traffic using Layer 4 (Transport) & Layer 7 (Application) Load Balancers, and master Consistent Hashing ring placement.',
          estimatedMinutes: 35,
          orderIndex: 2,
          prerequisites: ['sd-les-1'],
          concepts: [
            {
              id: 'sdc2_1',
              title: 'Consistent Hashing Rings',
              contentMarkdown: `### Why Consistent Hashing?
Traditional modulo hashing ($\text{hash}(key) \pmod N$) requires remapping almost 100% of keys whenever a cache node is added or removed ($N \to N+1$). **Consistent Hashing** maps keys and nodes onto a circular $2^{32}-1$ hash ring, remapping only $K/N$ keys during node scaling.`
            }
          ],
          examples: [
            {
              id: 'sdex2_1',
              title: 'Example 1: Consistent Hashing Ring Concept',
              code: `class ConsistentHashRing {
    constructor(virtualNodes = 100) {
        this.ring = new Map(); // Sorted hash position -> node IP
        this.sortedKeys = [];
        this.virtualNodes = virtualNodes;
    }

    getNode(key) {
        const hash = this.hash(key);
        // Find first node position >= hash on circular ring
        const targetPos = this.sortedKeys.find(pos => pos >= hash) || this.sortedKeys[0];
        return this.ring.get(targetPos);
    }
}`,
              explanation: 'Virtual nodes distribute keys uniformly across physical servers, mitigating hot spot node imbalances.'
            }
          ],
          quiz: [
            {
              id: 'sdq2_1',
              question: 'Why is Consistent Hashing preferred over traditional modulo hashing (key % N) in distributed caching clusters?',
              options: [
                'Adding or removing a server node remaps only 1/N keys on average rather than nearly all keys',
                'It bypasses network security firewalls',
                'It operates faster than CPU registers',
                'It eliminates the need for database storage'
              ],
              correctOptionIndex: 0,
              explanation: 'Consistent Hashing minimizes key re-allocations when scaling cluster nodes up or down.'
            }
          ],
          exercise: {
            id: 'sdex-2',
            instructions: 'Write a snippet outputting `"Consistent Hash Node Found: Server-3"` to standard console.log.',
            initialCode: '// Ring lookup output\n',
            solutionCode: 'console.log("Consistent Hash Node Found: Server-3");',
            hints: ['console.log("Consistent Hash Node Found: Server-3");'],
            validationType: 'stdout',
            testCases: [{ id: 'sdtc2', description: 'Outputs Consistent Hash Node text', expectedOutput: 'Consistent Hash Node Found: Server-3' }]
          },
          references: [],
          completionCriteria: { requiresConceptsRead: true, requiresQuizPassed: true, requiresExercisePassed: true }
        }
      ]
    },
    {
      id: 'sd-mod-2',
      slug: 'system-design-data-architecture',
      title: 'Level 2: Distributed Caching, CAP Theorem & Database Sharding',
      description: 'Implement distributed Redis caching strategies (Cache-Aside, Write-Through), master CAP Theorem trade-offs, and partition data via Database Sharding.',
      level: 'intermediate',
      orderIndex: 2,
      lessons: [
        {
          id: 'sd-les-3',
          slug: 'system-design-caching-redis',
          title: 'Distributed Caching Strategies & Redis Invalidation',
          description: 'Master Cache-Aside, Write-Through, Write-Back caching strategies, Redis LRU eviction policies, and prevent Cache Stampede / Thundering Herd.',
          estimatedMinutes: 35,
          orderIndex: 1,
          prerequisites: ['sd-les-2'],
          concepts: [
            {
              id: 'sdc3_1',
              title: 'Distributed Caching Patterns',
              contentMarkdown: `### Caching Strategies
- **Cache-Aside (Lazy Loading)**: Application queries cache first; on cache miss, reads from DB and updates cache.
- **Write-Through**: Application writes to cache; cache synchronously updates DB.
- **Cache Stampede (Thundering Herd)**: Occurs when a high-traffic key expires, causing concurrent DB read spikes. Fixed via Distributed Locks or probabilistic early expiration.`
            }
          ],
          examples: [
            {
              id: 'sdex3_1',
              title: 'Example 1: Cache-Aside Implementation in Node.js',
              code: `async function getUserProfile(userId) {
    const cacheKey = \`user:\${userId}\`;
    
    // 1. Query Redis Cache
    const cachedData = await redis.get(cacheKey);
    if (cachedData) {
        return JSON.parse(cachedData); // Cache Hit
    }

    // 2. Cache Miss -> Query Database
    const dbUser = await db.users.findById(userId);
    if (dbUser) {
        // Set cache with 3600 second TTL
        await redis.set(cacheKey, JSON.stringify(dbUser), 'EX', 3600);
    }
    return dbUser;
}`,
              explanation: 'App queries fast Redis cache layer first, falling back to database query on cache miss.'
            }
          ],
          quiz: [
            {
              id: 'sdq3_1',
              question: 'Which caching pattern queries the cache first, fetching from the database and setting the cache key only upon a cache miss?',
              options: ['Cache-Aside (Lazy Loading)', 'Write-Through', 'Write-Back', 'Refresh-Ahead'],
              correctOptionIndex: 0,
              explanation: 'Cache-Aside lazily populates cache keys only when missed by application requests.'
            }
          ],
          exercise: {
            id: 'sdex-3',
            instructions: 'Write a snippet outputting `"Cache Status: HIT"` to standard console.log.',
            initialCode: '// Cache status output\n',
            solutionCode: 'console.log("Cache Status: HIT");',
            hints: ['console.log("Cache Status: HIT");'],
            validationType: 'stdout',
            testCases: [{ id: 'sdtc3', description: 'Outputs Cache Status text', expectedOutput: 'Cache Status: HIT' }]
          },
          references: [],
          completionCriteria: { requiresConceptsRead: true, requiresQuizPassed: true, requiresExercisePassed: true }
        },
        {
          id: 'sd-les-4',
          slug: 'system-design-cap-sharding',
          title: 'The CAP Theorem & Database Horizontal Sharding',
          description: 'Analyze Consistency, Availability, Partition Tolerance (CAP Theorem) trade-offs, and scale databases horizontally using Range and Hash Sharding.',
          estimatedMinutes: 40,
          orderIndex: 2,
          prerequisites: ['sd-les-3'],
          concepts: [
            {
              id: 'sdc4_1',
              title: 'CAP Theorem & Database Sharding',
              contentMarkdown: `### The CAP Theorem (Brewer\'s Theorem)
In a distributed network partition (P), a system MUST choose between:
- **Consistency (CP)**: Every read receives the most recent write or an error.
- **Availability (AP)**: Every non-failing node returns a non-error response without guaranteeing latest data.

### Database Sharding
Sharding partitions large tables horizontally across multiple distinct database instances based on a **Shard Key** (\`user_id\`).`
            }
          ],
          examples: [
            {
              id: 'sdex4_1',
              title: 'Example 1: Hash-Based Database Shard Router',
              code: `function getShardInstance(userId, totalShards = 4) {
    const shardIndex = Math.abs(hash(userId)) % totalShards;
    const shardHosts = [
        "db-shard-0.cluster.local",
        "db-shard-1.cluster.local",
        "db-shard-2.cluster.local",
        "db-shard-3.cluster.local"
    ];
    return shardHosts[shardIndex];
}`,
              explanation: 'Routes user queries to specific database shard instances based on user_id hash.'
            }
          ],
          quiz: [
            {
              id: 'sdq4_1',
              question: 'Under the CAP Theorem, what two properties must a distributed system trade off between when a network partition (P) occurs?',
              options: ['Consistency (C) vs Availability (A)', 'Speed vs Storage', 'CPU vs Memory', 'Security vs Encryption'],
              correctOptionIndex: 0,
              explanation: 'During network partitions, distributed systems must trade off absolute Consistency for Availability or vice versa.'
            }
          ],
          exercise: {
            id: 'sdex-4',
            instructions: 'Write a snippet outputting `"Routed to Shard: db-shard-2"` to standard console.log.',
            initialCode: '// Shard router status\n',
            solutionCode: 'console.log("Routed to Shard: db-shard-2");',
            hints: ['console.log("Routed to Shard: db-shard-2");'],
            validationType: 'stdout',
            testCases: [{ id: 'sdtc4', description: 'Outputs Shard router status', expectedOutput: 'Routed to Shard: db-shard-2' }]
          },
          references: [],
          completionCriteria: { requiresConceptsRead: true, requiresQuizPassed: true, requiresExercisePassed: true }
        }
      ]
    },
    {
      id: 'sd-mod-3',
      slug: 'system-design-microservices-queues',
      title: 'Level 3: Microservices, Message Queues & Real-World Blueprints',
      description: 'Decouple services using Message Queues (Kafka / RabbitMQ), build Event-Driven Microservices, and study real-world System Design blueprints.',
      level: 'advanced',
      orderIndex: 3,
      lessons: [
        {
          id: 'sd-les-5',
          slug: 'system-design-message-queues-kafka',
          title: 'Asynchronous Message Queues (Kafka / RabbitMQ) & Event Streaming',
          description: 'Decouple synchronous API calls using message queues, publish-subscribe topics, dead-letter queues, and event-driven microservice pipelines.',
          estimatedMinutes: 40,
          orderIndex: 1,
          prerequisites: ['sd-les-4'],
          concepts: [
            {
              id: 'sdc5_1',
              title: 'Message Queues vs Event Streams',
              contentMarkdown: `### Message Queue Architectures
- **RabbitMQ**: AMQP message broker pushing messages to consumers; deletes messages upon acknowledgment.
- **Apache Kafka**: High-throughput distributed append-only commit log storing message streams persistently for replay.`
            }
          ],
          examples: [
            {
              id: 'sdex5_1',
              title: 'Example 1: Event-Driven Kafka Consumer Pipeline',
              code: `// Async Order Processing Event Consumer
kafkaConsumer.subscribe({ topic: 'order-created-events' });

await kafkaConsumer.run({
    eachMessage: async ({ topic, partition, message }) => {
        const orderEvent = JSON.parse(message.value.toString());
        await processInventoryReservation(orderEvent);
        await sendOrderConfirmationEmail(orderEvent);
    }
});`,
              explanation: 'Decouples order creation HTTP response from asynchronous email generation and inventory reservation.'
            }
          ],
          quiz: [
            {
              id: 'sdq5_1',
              question: 'Why do high-scale architectures use asynchronous message queues (Kafka / RabbitMQ) between microservices?',
              options: [
                'To decouple services, absorb traffic spikes, and execute background tasks asynchronously without blocking HTTP requests',
                'To replace database storage',
                'To disable CSS animations',
                'To speed up CPU clock speeds'
              ],
              correctOptionIndex: 0,
              explanation: 'Message queues buffer traffic bursts and decouple microservices into asynchronous non-blocking pipelines.'
            }
          ],
          exercise: {
            id: 'sdex-5',
            instructions: 'Write a snippet outputting `"Kafka Event Processed: Order-101"` to standard console.log.',
            initialCode: '// Kafka consumer status\n',
            solutionCode: 'console.log("Kafka Event Processed: Order-101");',
            hints: ['console.log("Kafka Event Processed: Order-101");'],
            validationType: 'stdout',
            testCases: [{ id: 'sdtc5', description: 'Outputs Kafka Event status', expectedOutput: 'Kafka Event Processed: Order-101' }]
          },
          references: [],
          completionCriteria: { requiresConceptsRead: true, requiresQuizPassed: true, requiresExercisePassed: true }
        },
        {
          id: 'sd-les-6',
          slug: 'system-design-blueprints-case-studies',
          title: 'System Design Architecture Blueprints & Interview Case Studies',
          description: 'Review end-to-end architecture blueprints for real-world platforms: URL Shortener, Notification Service, and Distributed Rate Limiter.',
          estimatedMinutes: 45,
          orderIndex: 2,
          prerequisites: ['sd-les-5'],
          concepts: [
            {
              id: 'sdc6_1',
              title: 'System Design Interview Blueprint',
              contentMarkdown: `### 4-Step System Design Interview Framework
1. **Understand Requirements & Scope**: Define Functional requirements, Non-Functional metrics (QPS, Latency, Storage).
2. **High-Level Design**: Sketch client, load balancer, API gateway, microservice blocks, cache, database.
3. **Deep Dive Key Components**: Bottlenecks, caching invalidation, sharding key selection, message queue replay.
4. **Wrap-up & Trade-offs**: Discuss SPOFs (Single Points of Failure), monitoring, and failure recovery.`
            }
          ],
          examples: [
            {
              id: 'sdex6_1',
              title: 'Example 1: Distributed Token Bucket Rate Limiter Architecture',
              code: `// Redis Sliding Window Log Rate Limiter Concept
async function allowRequest(ipAddress, maxRequests = 100, windowSec = 60) {
    const now = Date.now();
    const windowStart = now - (windowSec * 1000);
    const key = \`rate:\${ipAddress}\`;

    await redis.zremrangebyscore(key, 0, windowStart); // Evict old entries
    const currentCount = await redis.zcard(key);

    if (currentCount < maxRequests) {
        await redis.zadd(key, now, now);
        return true; // Allow request
    }
    return false; // Rate limit exceeded (429)
}`,
              explanation: 'Uses Redis Sorted Sets (ZSET) to track sliding window timestamps per IP address accurately.'
            }
          ],
          quiz: [
            {
              id: 'sdq6_1',
              question: 'Which rate limiting algorithm uses timestamps in a sorted set to prevent burst boundary attacks across sliding windows?',
              options: ['Sliding Window Log', 'Fixed Window Counter', 'Leaky Bucket', 'Random Drop'],
              correctOptionIndex: 0,
              explanation: 'Sliding Window Log tracks exact request timestamps, eliminating burst boundary spikes.'
            }
          ],
          exercise: {
            id: 'sdex-6',
            instructions: 'Write a snippet outputting `"System Design Blueprint Approved"` to standard console.log.',
            initialCode: '// Blueprint status\n',
            solutionCode: 'console.log("System Design Blueprint Approved");',
            hints: ['console.log("System Design Blueprint Approved");'],
            validationType: 'stdout',
            testCases: [{ id: 'sdtc6', description: 'Outputs Blueprint Approved status', expectedOutput: 'System Design Blueprint Approved' }]
          },
          references: [],
          completionCriteria: { requiresConceptsRead: true, requiresQuizPassed: true, requiresExercisePassed: true }
        }
      ]
    }
  ]
};

import { Path } from '@/types/content';
import { COURSE_CERTIFICATION_POLICIES } from '../certification-policies';

export const sqlDbmsPath: Path = {
  id: 'sql-dbms-mastery',
  slug: 'dbms',
  title: 'SQL & Database Management Systems',
  subtitle: 'Master relational schema architecture, SQL queries, multi-table JOINs, database normalization, and B-Tree indexing.',
  description: 'Master relational databases, SQL DDL/DML, complex JOINs, aggregation queries, database normalization (1NF-3NF), ACID transactions, B-Tree indexes, and query plan optimization.',
  icon: '🛢️',
  category: 'cs',
  categoryLabel: 'Computer Science',
  isActive: true,
  status: 'active',
  courseType: 'coding',
  difficulty: 'intermediate',
  estimatedHours: 40,
  totalLessons: 6,
  totalProjects: 2,
  certificationRequirement: COURSE_CERTIFICATION_POLICIES['dbms'],
  projects: [
    {
      id: 'dbms-proj-1',
      slug: 'sql-e-commerce-database-design',
      title: 'Relational E-Commerce Database Schema',
      subtitle: 'Design normalized SQL table schemas for orders, products, users, payments, and inventory audit trails.',
      description: 'Architect a 3NF normalized SQL database schema with primary/foreign key constraints, cascade rules, index optimizations, and analytical queries.',
      difficulty: 'intermediate',
      estimatedHours: 5,
      skillsLearned: ['SQL DDL Constraints', 'Foreign Key Cascades', 'Database Normalization', 'Complex Aggregations'],
      prerequisites: ['SQL Queries & JOINs'],
      learningObjectives: ['Design foreign key relationships enforcing referential integrity.', 'Construct complex SQL queries with GROUP BY and HAVING.'],
      starterCode: `CREATE TABLE users (\n    id SERIAL PRIMARY KEY,\n    email VARCHAR(255) UNIQUE NOT NULL\n);`,
      projectInstructionsMarkdown: '### Project Overview\nDesign a 3NF normalized SQL database schema for an e-commerce platform.',
      milestones: [
        { id: 'dbm1', title: 'Milestone 1: Schema DDL & Constraints', description: 'Write DDL statements creating users, orders, order_items, and products tables.', orderIndex: 1 },
        { id: 'dbm2', title: 'Milestone 2: Multi-Table JOIN & Analytics Queries', description: 'Write SQL query computing total revenue per user category.', orderIndex: 2 }
      ],
      completionCriteria: 'Pass schema constraint validation, referential integrity, and analytical query result checks.',
      pathSlug: 'dbms'
    },
    {
      id: 'dbms-proj-2',
      slug: 'dbms-analytics-query-engine',
      title: 'High-Throughput SQL Query Performance Engine',
      subtitle: 'Optimize slow SQL queries using EXPLAIN ANALYZE, composite B-Tree indexes, and table partitioning.',
      description: 'Diagnose and optimize database performance bottlenecks over millions of row records using SQL execution plans, index tuning, and transaction isolation.',
      difficulty: 'advanced',
      estimatedHours: 6,
      skillsLearned: ['EXPLAIN ANALYZE Execution Plans', 'Composite B-Tree Indexes', 'ACID Isolation Levels', 'Window Functions'],
      prerequisites: ['Transactions & Indexing'],
      learningObjectives: ['Analyze execution plans to eliminate sequential table scans.', 'Configure appropriate B-Tree composite indexes.'],
      starterCode: `EXPLAIN ANALYZE\nSELECT customer_id, SUM(amount)\nFROM transactions\nGROUP BY customer_id;`,
      projectInstructionsMarkdown: '### Project Overview\nOptimize query execution plans and database indexes for high-throughput applications.',
      milestones: [
        { id: 'dbm3', title: 'Milestone 1: Index Optimization & Execution Plans', description: 'Create composite B-Tree indexes reducing query cost.', orderIndex: 1 },
        { id: 'dbm4', title: 'Milestone 2: ACID Transactions & Window Queries', description: 'Implement window functions (ROW_NUMBER, DENSE_RANK) with transaction safety.', orderIndex: 2 }
      ],
      completionCriteria: 'Verify sub-millisecond query execution plans and correct analytical window outputs.',
      pathSlug: 'dbms'
    }
  ],
  modules: [
    {
      id: 'dbms-mod-1',
      slug: 'sql-foundations',
      title: 'Level 1: Relational Database Fundamentals & SQL Queries',
      description: 'Understand relational tables, Primary & Foreign Keys, DDL (CREATE/ALTER), DML (SELECT/INSERT/UPDATE/DELETE), filtering, and sorting.',
      level: 'foundations',
      orderIndex: 1,
      lessons: [
        {
          id: 'sql-les-1',
          slug: 'sql-relational-ddl-dml',
          title: 'Relational Architecture, Primary Keys & SQL Syntax',
          description: 'Create database tables, enforce integrity constraints (PRIMARY KEY, UNIQUE, NOT NULL), and perform SELECT, WHERE, ORDER BY, and LIMIT operations.',
          estimatedMinutes: 30,
          orderIndex: 1,
          prerequisites: [],
          concepts: [
            {
              id: 'sqlc1_1',
              title: 'Learning Objectives & The Relational Model',
              contentMarkdown: `### Learning Objectives
- Master relational database fundamentals (tables, rows, columns, schemas).
- Enforce entity integrity with \`PRIMARY KEY\` and \`FOREIGN KEY\` constraints.
- Categorize SQL statements into DDL (\`CREATE\`, \`ALTER\`, \`DROP\`) and DML (\`SELECT\`, \`INSERT\`, \`UPDATE\`, \`DELETE\`).
- Filter records dynamically using \`WHERE\`, \`LIKE\`, \`IN\`, and \`BETWEEN\` operators.

---

### The Relational Database Architecture
Relational Database Management Systems (RDBMS) store structured records in two-dimensional tables consisting of rows (tuples) and columns (attributes). Data relationships are linked using **Foreign Keys**, preventing orphan records and guaranteeing referential integrity.`
            }
          ],
          examples: [
            {
              id: 'sqlex1_1',
              title: 'Example 1: Table Creation DDL Statement',
              code: `CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`,
              explanation: 'Defines users table schema enforcing non-null email and automatic auto-incrementing Primary Key id.'
            }
          ],
          quiz: [
            {
              id: 'sqlq1_1',
              question: 'Which SQL sub-language classification includes CREATE, ALTER, and DROP table schema commands?',
              options: ['DDL (Data Definition Language)', 'DML (Data Manipulation Language)', 'DCL (Data Control Language)', 'TCL (Transaction Control Language)'],
              correctOptionIndex: 0,
              explanation: 'Data Definition Language (DDL) manages database schema structures.'
            }
          ],
          exercise: {
            id: 'sqlex-1',
            instructions: 'Write a SELECT query `SELECT * FROM users WHERE status = \'active\';` and match text.',
            initialCode: '-- Write SQL query\n',
            solutionCode: "SELECT * FROM users WHERE status = 'active';",
            hints: ["Use SELECT * FROM users WHERE status = 'active';"],
            validationType: 'text_match',
            testCases: [{ id: 'sqltc1', description: 'Matches SQL query statement', expectedOutput: "SELECT * FROM users WHERE status = 'active';" }]
          },
          references: [],
          completionCriteria: { requiresConceptsRead: true, requiresQuizPassed: true, requiresExercisePassed: true }
        },
        {
          id: 'sql-les-2',
          slug: 'sql-joins-aggregations',
          title: 'Multi-Table JOINs & GROUP BY Aggregations',
          description: 'Combine tables using INNER JOIN, LEFT JOIN, RIGHT JOIN, FULL OUTER JOIN, and summarize data with GROUP BY & HAVING.',
          estimatedMinutes: 35,
          orderIndex: 2,
          prerequisites: ['sql-les-1'],
          concepts: [
            {
              id: 'sqlc2_1',
              title: 'SQL JOIN Types & Grouping Rules',
              contentMarkdown: `### SQL JOIN Venn Matrix
- **INNER JOIN**: Returns only matching rows present in BOTH tables.
- **LEFT JOIN**: Returns ALL rows from the left table, plus matched right table rows (filling missing values with \`NULL\`).
- **GROUP BY & HAVING**: Aggregates row values (\`SUM\`, \`AVG\`, \`COUNT\`, \`MAX\`). The \`HAVING\` clause filters AFTER group aggregation.`
            }
          ],
          examples: [
            {
              id: 'sqlex2_1',
              title: 'Example 1: Multi-Table JOIN with Aggregation',
              code: `SELECT 
    c.name AS category_name,
    COUNT(p.id) AS total_products,
    ROUND(AVG(p.price), 2) AS avg_price
FROM categories c
INNER JOIN products p ON c.id = p.category_id
GROUP BY c.id, c.name
HAVING COUNT(p.id) >= 5
ORDER BY avg_price DESC;`,
              explanation: 'Joins products to categories, computes group metrics, and filters categories having 5 or more products.'
            }
          ],
          quiz: [
            {
              id: 'sqlq2_1',
              question: 'Which SQL clause filters aggregate results calculated by a GROUP BY clause?',
              options: ['HAVING', 'WHERE', 'ORDER BY', 'FILTER'],
              correctOptionIndex: 0,
              explanation: 'HAVING filters aggregate values after GROUP BY calculation (unlike WHERE which filters rows beforehand).'
            }
          ],
          exercise: {
            id: 'sqlex-2',
            instructions: 'Write a JOIN query `SELECT * FROM orders INNER JOIN users ON orders.user_id = users.id;` and match text.',
            initialCode: '-- Write JOIN query\n',
            solutionCode: 'SELECT * FROM orders INNER JOIN users ON orders.user_id = users.id;',
            hints: ['Use INNER JOIN and ON orders.user_id = users.id'],
            validationType: 'text_match',
            testCases: [{ id: 'sqltc2', description: 'Matches INNER JOIN query statement', expectedOutput: 'SELECT * FROM orders INNER JOIN users ON orders.user_id = users.id;' }]
          },
          references: [],
          completionCriteria: { requiresConceptsRead: true, requiresQuizPassed: true, requiresExercisePassed: true }
        }
      ]
    },
    {
      id: 'dbms-mod-2',
      slug: 'sql-intermediate-architecture',
      title: 'Level 2: Subqueries, Normalization & ACID Transactions',
      description: 'Master nested subqueries, database Normalization (1NF, 2NF, 3NF), and ACID transaction control (BEGIN, COMMIT, ROLLBACK).',
      level: 'intermediate',
      orderIndex: 2,
      lessons: [
        {
          id: 'sql-les-3',
          slug: 'sql-normalization-3nf',
          title: 'Database Normalization (1NF, 2NF, 3NF) & ER Diagrams',
          description: 'Eliminate update anomalies, duplicate data redundancy, and functional dependency violations through 1NF, 2NF, and 3NF normalization.',
          estimatedMinutes: 35,
          orderIndex: 1,
          prerequisites: ['sql-les-2'],
          concepts: [
            {
              id: 'sqlc3_1',
              title: 'Normal Forms Overview',
              contentMarkdown: `### Database Normalization Stages
- **First Normal Form (1NF)**: Atomic values per cell (no multi-value comma arrays).
- **Second Normal Form (2NF)**: Satisfies 1NF and removes Partial Key Dependencies.
- **Third Normal Form (3NF)**: Satisfies 2NF and removes Transitive Dependencies (non-key attribute determining another non-key attribute).`
            }
          ],
          examples: [
            {
              id: 'sqlex3_1',
              title: 'Example 1: Normalizing to 3NF',
              code: `-- 3NF Normalized Schema splitting Orders and Customers
CREATE TABLE customers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    city VARCHAR(50) NOT NULL
);

CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    customer_id INT REFERENCES customers(id),
    order_date DATE NOT NULL,
    total_amount DECIMAL(10,2) NOT NULL
);`,
              explanation: 'Separating customer details from order records eliminates update anomalies when customer city changes.'
            }
          ],
          quiz: [
            {
              id: 'sqlq3_1',
              question: 'Which Normal Form condition requires removing transitive non-key dependencies?',
              options: ['3NF (Third Normal Form)', '1NF', '2NF', 'BCNF'],
              correctOptionIndex: 0,
              explanation: '3NF states that non-key attributes must depend on the primary key, the whole key, and nothing but the key.'
            }
          ],
          exercise: {
            id: 'sqlex-3',
            instructions: 'Write DDL foreign key syntax `customer_id INT REFERENCES customers(id)` and match text.',
            initialCode: '-- Foreign key DDL\n',
            solutionCode: 'customer_id INT REFERENCES customers(id)',
            hints: ['Use customer_id INT REFERENCES customers(id)'],
            validationType: 'text_match',
            testCases: [{ id: 'sqltc3', description: 'Matches foreign key syntax', expectedOutput: 'customer_id INT REFERENCES customers(id)' }]
          },
          references: [],
          completionCriteria: { requiresConceptsRead: true, requiresQuizPassed: true, requiresExercisePassed: true }
        },
        {
          id: 'sql-les-4',
          slug: 'sql-acid-transactions',
          title: 'ACID Guarantees & Transaction Control (BEGIN, COMMIT, ROLLBACK)',
          description: 'Understand Atomicity, Consistency, Isolation, Durability (ACID), transaction isolation levels, and concurrency locking.',
          estimatedMinutes: 40,
          orderIndex: 2,
          prerequisites: ['sql-les-3'],
          concepts: [
            {
              id: 'sqlc4_1',
              title: 'ACID Guarantee Invariants',
              contentMarkdown: `### The ACID Model
- **Atomicity**: All-or-nothing execution. If any operation fails, the entire transaction is rolled back.
- **Consistency**: Database transitions strictly from one valid state conforming to schema invariants to another.
- **Isolation**: Concurrent transactions execute independently without dirty reads or phantom reads.
- **Durability**: Committed transaction data persists permanently even during hardware power failure.`
            }
          ],
          examples: [
            {
              id: 'sqlex4_1',
              title: 'Example 1: Bank Transfer Transaction Block',
              code: `BEGIN TRANSACTION;

UPDATE accounts SET balance = balance - 500 WHERE id = 101;
UPDATE accounts SET balance = balance + 500 WHERE id = 202;

-- Validate balances and commit
COMMIT;`,
              explanation: 'Encapsulating debits and credits inside a transaction ensures money is never lost midway.'
            }
          ],
          quiz: [
            {
              id: 'sqlq4_1',
              question: 'Which ACID property guarantees that all operations in a batch execute completely or none execute at all?',
              options: ['Atomicity', 'Consistency', 'Isolation', 'Durability'],
              correctOptionIndex: 0,
              explanation: 'Atomicity enforces all-or-nothing batch transaction execution.'
            }
          ],
          exercise: {
            id: 'sqlex-4',
            instructions: 'Write SQL transaction commit statement `COMMIT;` and match text.',
            initialCode: '-- Commit transaction\n',
            solutionCode: 'COMMIT;',
            hints: ['Use COMMIT;'],
            validationType: 'text_match',
            testCases: [{ id: 'sqltc4', description: 'Matches COMMIT statement', expectedOutput: 'COMMIT;' }]
          },
          references: [],
          completionCriteria: { requiresConceptsRead: true, requiresQuizPassed: true, requiresExercisePassed: true }
        }
      ]
    },
    {
      id: 'dbms-mod-3',
      slug: 'sql-advanced-performance',
      title: 'Level 3: Indexing, Query Optimization & Window Functions',
      description: 'Master B-Tree index structures, EXPLAIN execution plan cost analysis, window analytics functions (ROW_NUMBER, DENSE_RANK), and database performance tuning.',
      level: 'advanced',
      orderIndex: 3,
      lessons: [
        {
          id: 'sql-les-5',
          slug: 'sql-b-tree-indexing',
          title: 'B-Tree Indexing & EXPLAIN ANALYZE Execution Plans',
          description: 'Accelerate slow table scans with composite B-Tree indexes, evaluate query cost with EXPLAIN ANALYZE, and avoid index degradation pitfalls.',
          estimatedMinutes: 40,
          orderIndex: 1,
          prerequisites: ['sql-les-4'],
          concepts: [
            {
              id: 'sqlc5_1',
              title: 'B-Tree Index Mechanics',
              contentMarkdown: `### B-Tree Index Lookups
Without an index, querying a table requires a **Sequential Table Scan** ($O(N)$). Creating a B-Tree index builds a balanced logarithmic search tree ($O(\log N)$) storing ordered pointers directly to row heap pages.`
            }
          ],
          examples: [
            {
              id: 'sqlex5_1',
              title: 'Example 1: Composite Index & EXPLAIN Execution',
              code: `-- Create composite B-Tree index on customer_id and order_date
CREATE INDEX idx_orders_customer_date ON orders(customer_id, order_date DESC);

-- Query using index scan
EXPLAIN ANALYZE 
SELECT * FROM orders 
WHERE customer_id = 450 
ORDER BY order_date DESC;`,
              explanation: 'EXPLAIN ANALYZE displays whether PostgreSQL/MySQL uses Index Scan instead of Sequential Scan.'
            }
          ],
          quiz: [
            {
              id: 'sqlq5_1',
              question: 'What time complexity search optimization does a B-Tree database index provide over a sequential table scan?',
              options: ['O(log N) logarithmic time', 'O(1) constant time', 'O(N^2) quadratic time', 'O(N) linear time'],
              correctOptionIndex: 0,
              explanation: 'B-Tree index lookups traverse logarithmic depth trees in O(log N) time.'
            }
          ],
          exercise: {
            id: 'sqlex-5',
            instructions: 'Write DDL index creation syntax `CREATE INDEX idx_email ON users(email);` and match text.',
            initialCode: '-- Index DDL\n',
            solutionCode: 'CREATE INDEX idx_email ON users(email);',
            hints: ['Use CREATE INDEX idx_email ON users(email);'],
            validationType: 'text_match',
            testCases: [{ id: 'sqltc5', description: 'Matches CREATE INDEX syntax', expectedOutput: 'CREATE INDEX idx_email ON users(email);' }]
          },
          references: [],
          completionCriteria: { requiresConceptsRead: true, requiresQuizPassed: true, requiresExercisePassed: true }
        },
        {
          id: 'sql-les-6',
          slug: 'sql-window-functions',
          title: 'Advanced Analytical Window Functions (OVER, ROW_NUMBER, PARTITION BY)',
          description: 'Compute running totals, moving averages, and ranks across row partitions using OVER(PARTITION BY ... ORDER BY ...) without collapsing rows.',
          estimatedMinutes: 40,
          orderIndex: 2,
          prerequisites: ['sql-les-5'],
          concepts: [
            {
              id: 'sqlc6_1',
              title: 'Window Functions vs GROUP BY',
              contentMarkdown: `### Window Functions
Unlike \`GROUP BY\` which collapses grouped rows into a single summary output line, **Window Functions** compute aggregate values across a partition of rows while retaining individual row identities.`
            }
          ],
          examples: [
            {
              id: 'sqlex6_1',
              title: 'Example 1: Ranking Products per Category',
              code: `SELECT 
    product_name,
    category_id,
    price,
    DENSE_RANK() OVER (
        PARTITION BY category_id 
        ORDER BY price DESC
    ) AS category_price_rank
FROM products;`,
              explanation: 'DENSE_RANK() assigns sequential ranks to products inside each category partition ordered by price.'
            }
          ],
          quiz: [
            {
              id: 'sqlq6_1',
              question: 'What is the main difference between Window Functions and GROUP BY aggregation in SQL?',
              options: [
                'Window Functions perform calculations without collapsing individual output rows',
                'Window Functions can only be used on strings',
                'GROUP BY cannot perform calculations',
                'Window Functions run slower than subqueries'
              ],
              correctOptionIndex: 0,
              explanation: 'Window functions preserve individual row output identities while computing partitioned calculations.'
            }
          ],
          exercise: {
            id: 'sqlex-6',
            instructions: 'Write window function syntax `ROW_NUMBER() OVER (ORDER BY salary DESC)` and match text.',
            initialCode: '-- Window function\n',
            solutionCode: 'ROW_NUMBER() OVER (ORDER BY salary DESC)',
            hints: ['Use ROW_NUMBER() OVER (ORDER BY salary DESC)'],
            validationType: 'text_match',
            testCases: [{ id: 'sqltc6', description: 'Matches ROW_NUMBER window syntax', expectedOutput: 'ROW_NUMBER() OVER (ORDER BY salary DESC)' }]
          },
          references: [],
          completionCriteria: { requiresConceptsRead: true, requiresQuizPassed: true, requiresExercisePassed: true }
        }
      ]
    }
  ]
};

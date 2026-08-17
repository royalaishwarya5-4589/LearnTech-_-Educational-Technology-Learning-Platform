import { Assessment } from '@/types/content';

export const sampleAssessments: Assessment[] = [
  {
    id: 'py-assessment-final',
    slug: 'python-mastery-final-exam',
    title: 'Python Developer Mastery Final Exam',
    description: 'Comprehensive certification assessment evaluating core syntax, OOP design, async concurrency, FastAPI, SQL ORM, and software architecture.',
    pathSlug: 'python',
    associatedModuleSlug: 'industry-mastery',
    type: 'course_assessment',
    difficulty: 'mastery',
    passingScorePercent: 80,
    timeLimitMinutes: 45,
    maxAttempts: 5,
    randomizeQuestions: true,
    questions: [
      {
        id: 'py-q1',
        type: 'single_choice',
        question: 'Which underlying mechanism does the Python Global Interpreter Lock (GIL) control in CPython?',
        explanation: 'The GIL ensures only one native thread executes CPython bytecode at a time, preventing multi-threaded CPU parallel execution.',
        points: 10,
        difficulty: 'advanced',
        options: [
          'It automatically compiles Python into C++ binaries at runtime',
          'It restricts CPython execution so only one thread executes bytecode at a time',
          'It forces all dictionaries to be read-only',
          'It manages network socket connections'
        ],
        correctAnswer: 1
      },
      {
        id: 'py-q2',
        type: 'multiple_choice',
        question: 'Which of the following are valid immutable data structures in standard Python? (Select all that apply)',
        explanation: 'Tuples, strings, frozensets, and integers are immutable; lists and dictionaries are mutable.',
        points: 10,
        difficulty: 'intermediate',
        options: [
          'tuple',
          'list',
          'str',
          'dict',
          'frozenset'
        ],
        correctAnswer: [0, 2, 4]
      },
      {
        id: 'py-q3',
        type: 'true_false',
        question: 'True or False: Defining __slots__ on a Python class suppresses per-instance __dict__ creation to optimize memory allocation.',
        explanation: '__slots__ allocates a static array for attributes, preventing dynamic __dict__ dictionary memory overhead.',
        points: 10,
        difficulty: 'intermediate',
        options: ['True', 'False'],
        correctAnswer: 0
      },
      {
        id: 'py-q4',
        type: 'short_answer',
        question: 'What keyword turns a standard Python function into a lazy generator iterator?',
        explanation: 'The yield keyword emits values lazily from a generator function.',
        points: 10,
        difficulty: 'beginner',
        correctAnswer: ['yield']
      },
      {
        id: 'py-q5',
        type: 'code',
        question: 'Write a Python expression using list comprehension to extract all even numbers from list `nums`.',
        explanation: '[x for x in nums if x % 2 == 0] filters even numbers.',
        points: 10,
        difficulty: 'intermediate',
        codeSnippet: 'nums = [1, 2, 3, 4, 5, 6]',
        correctAnswer: '[x for x in nums if x % 2 == 0]'
      }
    ]
  },
  {
    id: 'py-assessment-mod-1',
    slug: 'python-foundations-assessment',
    title: 'Level 1: Python Foundations Module Assessment',
    description: 'Module assessment evaluating control flow, functions, lists, dictionaries, exceptions, and file I/O.',
    pathSlug: 'python',
    associatedModuleSlug: 'fundamentals',
    type: 'module_assessment',
    difficulty: 'beginner',
    passingScorePercent: 75,
    timeLimitMinutes: 20,
    randomizeQuestions: false,
    questions: [
      {
        id: 'pym1-q1',
        type: 'single_choice',
        question: 'What is the result of `range(1, 5)` when iterated in Python?',
        explanation: 'range(start, stop) generates integers from start up to stop - 1 (1, 2, 3, 4).',
        points: 10,
        options: ['1, 2, 3, 4, 5', '1, 2, 3, 4', '0, 1, 2, 3, 4', '2, 3, 4, 5'],
        correctAnswer: 1
      },
      {
        id: 'pym1-q2',
        type: 'single_choice',
        question: 'Which statement safely manages file handles automatically closing descriptors upon exit?',
        explanation: 'with open(...) as f: utilizes context managers for safe resource disposal.',
        points: 10,
        options: ['file.open()', 'try open()', 'with open(...) as f:', 'using open()'],
        correctAnswer: 2
      }
    ]
  },
  {
    id: 'java-assessment-1',
    slug: 'java-enterprise-assessment',
    title: 'Java Enterprise Syntax & OOP Assessment',
    description: 'Evaluates Java 21 compilation, static typing, class inheritance, collections, multithreading, and Spring Boot.',
    pathSlug: 'java',
    associatedModuleSlug: 'java-foundations',
    type: 'course_assessment',
    difficulty: 'intermediate',
    passingScorePercent: 80,
    timeLimitMinutes: 30,
    questions: [
      {
        id: 'jq-1',
        type: 'single_choice',
        question: 'Which Java keyword binds a class to an interface contract requirement?',
        explanation: 'implements obligates a class to fulfill interface method signatures.',
        points: 10,
        options: ['extends', 'implements', 'inherits', 'uses'],
        correctAnswer: 1
      },
      {
        id: 'jq-2',
        type: 'single_choice',
        question: 'Which Java Collection implementation guarantees element uniqueness?',
        explanation: 'Set implementations (like HashSet) reject duplicate items.',
        points: 10,
        options: ['List', 'HashSet', 'ArrayList', 'Vector'],
        correctAnswer: 1
      }
    ]
  },
  {
    id: 'js-assessment-1',
    slug: 'javascript-es6-async-assessment',
    title: 'JavaScript ES6+ & Event Loop Assessment',
    description: 'Evaluates closures, Lexical Scope, Promises, DOM manipulation, and Event Loop execution order.',
    pathSlug: 'javascript',
    associatedModuleSlug: 'js-foundations',
    type: 'course_assessment',
    difficulty: 'intermediate',
    passingScorePercent: 80,
    timeLimitMinutes: 30,
    questions: [
      {
        id: 'jsq-1',
        type: 'single_choice',
        question: 'Which ES6 variable declaration keywords prevent hoisting pollution by enforcing block scope?',
        explanation: 'let and const enforce block scope boundaries.',
        points: 10,
        options: ['var and global', 'let and const', 'define and set', 'static and val'],
        correctAnswer: 1
      },
      {
        id: 'jsq-2',
        type: 'single_choice',
        question: 'Which queue in the Event Loop takes precedence after the synchronous call stack empties?',
        explanation: 'Microtasks (Promises) execute before macrotasks (setTimeout).',
        points: 10,
        options: ['Microtask Queue (Promises)', 'Task Queue (setTimeout)', 'Render Queue', 'Network Queue'],
        correctAnswer: 0
      }
    ]
  },
  {
    id: 'react-assessment-1',
    slug: 'react-nextjs-architecture-assessment',
    title: 'React & Next.js App Router Architecture Assessment',
    description: 'Evaluates JSX rendering, React Hooks, Context API, Next.js Server Components, and SSR data fetching.',
    pathSlug: 'react',
    associatedModuleSlug: 'react-fundamentals',
    type: 'course_assessment',
    difficulty: 'intermediate',
    passingScorePercent: 80,
    timeLimitMinutes: 30,
    questions: [
      {
        id: 'rq-1',
        type: 'single_choice',
        question: 'Which directive designates a component file in Next.js App Router as a Client Component?',
        explanation: '"use client" marks boundary components requiring client-side interactivity or React hooks.',
        points: 10,
        options: ['"use client"', '"use server"', '"use browser"', '"use react"'],
        correctAnswer: 0
      }
    ]
  },
  {
    id: 'web-assessment-1',
    slug: 'html-css-modern-web-assessment',
    title: 'HTML5 Semantics & Modern CSS Layout Assessment',
    description: 'Evaluates semantic HTML structure, accessibility (a11y), CSS Box Model, Flexbox, and CSS Grid.',
    pathSlug: 'html-css',
    associatedModuleSlug: 'html5-foundations',
    type: 'course_assessment',
    difficulty: 'beginner',
    passingScorePercent: 80,
    timeLimitMinutes: 30,
    questions: [
      {
        id: 'wq-1',
        type: 'single_choice',
        question: 'Which CSS unit represents a fractional share of remaining space in a CSS Grid layout?',
        explanation: 'The fr unit represents a fractional share of free grid space.',
        points: 10,
        options: ['fr', 'px', 'em', 'rem'],
        correctAnswer: 0
      }
    ]
  },
  {
    id: 'dsa-assessment-1',
    slug: 'dsa-asymptotic-complexity-assessment',
    title: 'Data Structures & Algorithmic Complexity Assessment',
    description: 'Evaluates Big-O time and space asymptotic growth, Binary Search Trees, and Graph traversals.',
    pathSlug: 'dsa',
    associatedModuleSlug: 'dsa-foundations',
    type: 'course_assessment',
    difficulty: 'advanced',
    passingScorePercent: 80,
    timeLimitMinutes: 30,
    questions: [
      {
        id: 'dsaq-1',
        type: 'single_choice',
        question: 'What is the average time complexity of searching a sorted array of N elements using Binary Search?',
        explanation: 'Binary search splits search intervals in half on every step, operating in O(log N) time.',
        points: 10,
        options: ['O(1)', 'O(log N)', 'O(N)', 'O(N^2)'],
        correctAnswer: 1
      }
    ]
  },
  {
    id: 'ai-assessment-1',
    slug: 'genai-llm-agents-architecture-assessment',
    title: 'Generative AI & LLM Autonomous Agents Assessment',
    description: 'Evaluates Large Language Models, Prompt Engineering, Vector Embeddings, RAG, and ReAct Agents.',
    pathSlug: 'genai-llm-agents',
    associatedModuleSlug: 'genai-foundations',
    type: 'course_assessment',
    difficulty: 'advanced',
    passingScorePercent: 80,
    timeLimitMinutes: 35,
    questions: [
      {
        id: 'aiq-1',
        type: 'single_choice',
        question: 'What primary problem in enterprise LLM deployment does RAG (Retrieval-Augmented Generation) solve?',
        explanation: 'RAG grounds responses in up-to-date retrieved factual documents to prevent hallucinations.',
        points: 10,
        options: ['LLM Hallucinations & Outdated Knowledge', 'GPU Compilation Time', 'CSS Styling', 'Disk Partitioning'],
        correctAnswer: 0
      }
    ]
  },
  {
    id: 'sec-assessment-1',
    slug: 'web-security-owasp-assessment',
    title: 'Web Security & OWASP Defense Assessment',
    description: 'Evaluates XSS prevention, SQL injection defense, and security header configurations.',
    pathSlug: 'web-security',
    associatedModuleSlug: 'security-foundations',
    type: 'course_assessment',
    difficulty: 'intermediate',
    passingScorePercent: 80,
    timeLimitMinutes: 30,
    questions: [
      {
        id: 'secq-1',
        type: 'single_choice',
        question: 'Which HTTP response header restricts the origins from which scripts and styles can execute?',
        explanation: 'Content-Security-Policy (CSP) mitigates Cross-Site Scripting (XSS) by restricting resource loading domains.',
        points: 10,
        options: ['Access-Control-Allow-Origin', 'Content-Security-Policy', 'X-Frame-Options', 'Strict-Transport-Security'],
        correctAnswer: 1
      }
    ]
  },
  {
    id: 'lin-assessment-1',
    slug: 'linux-security-administration-assessment',
    title: 'Linux Systems & Security Administration Assessment',
    description: 'Evaluates POSIX file permissions, systemd service management, Bash scripting, and SELinux hardening.',
    pathSlug: 'linux-security',
    associatedModuleSlug: 'linux-foundations',
    type: 'course_assessment',
    difficulty: 'intermediate',
    passingScorePercent: 80,
    timeLimitMinutes: 30,
    questions: [
      {
        id: 'linq-1',
        type: 'single_choice',
        question: 'What numeric octal permission value corresponds to rwxr-xr-x?',
        explanation: 'rwx (7), r-x (5), r-x (5) equals 755.',
        points: 10,
        options: ['755', '644', '777', '700'],
        correctAnswer: 0
      }
    ]
  },
  {
    id: 'git-assessment-1',
    slug: 'git-github-workflow-assessment',
    title: 'Git & GitHub Version Control Workflow Assessment',
    description: 'Evaluates Git staging area, branching, merge conflict resolution, interactive rebase, and GitHub Actions.',
    pathSlug: 'git-github',
    associatedModuleSlug: 'git-foundations',
    type: 'course_assessment',
    difficulty: 'intermediate',
    passingScorePercent: 80,
    timeLimitMinutes: 30,
    questions: [
      {
        id: 'gitq-1',
        type: 'single_choice',
        question: 'Which command displays the log of all HEAD movement pointers, allowing recovery of unreferenced commits?',
        explanation: 'git reflog records every local HEAD position change.',
        points: 10,
        options: ['git reflog', 'git log', 'git status', 'git diff'],
        correctAnswer: 0
      }
    ]
  },
  {
    id: 'cloud-assessment-1',
    slug: 'cloud-devops-infrastructure-assessment',
    title: 'Cloud Services & DevOps Infrastructure Assessment',
    description: 'Evaluates AWS core services, Docker containerization, Kubernetes manifests, Terraform IaC, and CI/CD pipelines.',
    pathSlug: 'cloud-devops',
    associatedModuleSlug: 'cloud-foundations',
    type: 'course_assessment',
    difficulty: 'advanced',
    passingScorePercent: 80,
    timeLimitMinutes: 35,
    questions: [
      {
        id: 'cloudq-1',
        type: 'single_choice',
        question: 'What is the smallest deployable compute unit in Kubernetes?',
        explanation: 'A Pod encapsulates one or more co-located containers in Kubernetes.',
        points: 10,
        options: ['Pod', 'Container', 'Cluster', 'Node'],
        correctAnswer: 0
      }
    ]
  },
  {
    id: 'testing-assessment-1',
    slug: 'software-testing-qa-assessment',
    title: 'Software Testing & Quality Assurance Assessment',
    description: 'Evaluates unit testing principles, Test Pyramid, TDD Red-Green-Refactor, mocks, API contract testing, and E2E Playwright.',
    pathSlug: 'software-testing',
    associatedModuleSlug: 'testing-foundations',
    type: 'course_assessment',
    difficulty: 'intermediate',
    passingScorePercent: 80,
    timeLimitMinutes: 30,
    questions: [
      {
        id: 'testq-1',
        type: 'single_choice',
        question: 'Which test double variant records function invocation counts and argument history?',
        explanation: 'Spies record function invocation calls and arguments.',
        points: 10,
        options: ['Spy', 'Dummy', 'Fake', 'Assertion'],
        correctAnswer: 0
      }
    ]
  },
  {
    id: 'sql-assessment-1',
    slug: 'sql-relational-dbms-assessment',
    title: 'SQL Querying & Database Architecture Assessment',
    description: 'Evaluates SELECT queries, GROUP BY aggregations, JOINs, and database normalization.',
    pathSlug: 'dbms',
    associatedModuleSlug: 'sql-foundations',
    type: 'course_assessment',
    difficulty: 'intermediate',
    passingScorePercent: 80,
    timeLimitMinutes: 30,
    questions: [
      {
        id: 'sqlq-1',
        type: 'single_choice',
        question: 'Which SQL clause aggregates row results for functions like SUM, AVG, and COUNT?',
        explanation: 'GROUP BY groups rows sharing column values for aggregate function computations.',
        points: 10,
        options: ['ORDER BY', 'GROUP BY', 'WHERE', 'HAVING'],
        correctAnswer: 1
      }
    ]
  },
  {
    id: 'sd-assessment-1',
    slug: 'system-design-cap-assessment',
    title: 'Distributed System Design & CAP Architecture Assessment',
    description: 'Evaluates CAP Theorem trade-offs, load balancing algorithms, and database sharding.',
    pathSlug: 'system-design',
    associatedModuleSlug: 'system-design-foundations',
    type: 'course_assessment',
    difficulty: 'advanced',
    passingScorePercent: 80,
    timeLimitMinutes: 35,
    questions: [
      {
        id: 'sdq-1',
        type: 'single_choice',
        question: 'According to CAP Theorem, what trade-off must a distributed system choose during a network partition (P)?',
        explanation: 'During a partition, a distributed system must choose between returning latest consistent data (C) or remaining available (A).',
        points: 10,
        options: ['Consistency (C) OR Availability (A)', 'Consistency AND Availability simultaneously', 'Neither C nor A', 'Only Speed'],
        correctAnswer: 0
      }
    ]
  },
  {
    id: 'int-assessment-1',
    slug: 'interview-prep-coding-behavioral-assessment',
    title: 'Technical Coding & STAR Behavioral Interview Assessment',
    description: 'Evaluates coding patterns (Two Pointers, Sliding Window) and STAR behavioral communication.',
    pathSlug: 'interview-preparation',
    associatedModuleSlug: 'interview-foundations',
    type: 'interview_assessment',
    difficulty: 'intermediate',
    passingScorePercent: 80,
    timeLimitMinutes: 30,
    questions: [
      {
        id: 'intq-1',
        type: 'single_choice',
        question: 'In the STAR behavioral communication framework, what does the "A" stand for?',
        explanation: 'Action describes the specific engineering steps you personally executed.',
        points: 10,
        options: ['Algorithm', 'Action (specific steps you executed)', 'Architecture', 'Assessment'],
        correctAnswer: 1
      }
    ]
  }
];

export function getAssessmentBySlug(slug: string): Assessment | undefined {
  return sampleAssessments.find((a) => a.slug === slug || a.id === slug);
}

export function getAssessmentsByPath(pathSlug: string): Assessment[] {
  return sampleAssessments.filter((a) => a.pathSlug === pathSlug);
}

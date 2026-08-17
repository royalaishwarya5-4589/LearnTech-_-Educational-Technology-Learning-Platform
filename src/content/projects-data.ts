import { Project } from '@/types/content';

export const pythonProjects: Project[] = [
  {
    id: 'py-proj-1',
    slug: 'python-cli-student-management',
    title: 'Python CLI Student Management System',
    subtitle: 'Build an interactive console application to create, query, update, and persist student academic records.',
    description: 'Build a production-grade Command-Line Interface (CLI) application in Python that manages student profiles, course grades, GPA calculations, and JSON file storage. You will apply core data structures, input validation, and defensive programming.',
    difficulty: 'beginner',
    estimatedHours: 4,
    skillsLearned: [
      'Python Dictionaries & Lists',
      'CLI Menu Loop Control Flow',
      'JSON File Read/Write Operations',
      'Input Sanitization & Validation',
      'Error & Exception Handling'
    ],
    prerequisites: [
      'Variables & Fundamental Data Types',
      'Control Flow & Conditional Logic',
      'Loops & Iteration',
      'Functions & Scope'
    ],
    learningObjectives: [
      'Design structured nested dictionary representations for complex entity records.',
      'Implement CRUD (Create, Read, Update, Delete) data operations over interactive CLI inputs.',
      'Safely handle invalid user inputs with try/except exception catching.',
      'Persist application state cleanly using Python standard library json file serialization.'
    ],
    starterCode: `# Python CLI Student Management System
import json
import os

STUDENTS_FILE = "students.json"

def load_students():
    """Load student records from JSON file."""
    if not os.path.exists(STUDENTS_FILE):
        return {}
    try:
        with open(STUDENTS_FILE, "r") as f:
            return json.load(f)
    except Exception as e:
        print(f"Error loading records: {e}")
        return {}

def save_students(students):
    """Save student records to JSON file."""
    with open(STUDENTS_FILE, "w") as f:
        json.dump(students, f, indent=4)

def calculate_gpa(grades):
    """Calculate average GPA from list of numeric grades."""
    if not grades:
        return 0.0
    return round(sum(grades) / len(grades), 2)

def main():
    students = load_students()
    print("Welcome to Python CLI Student Management System!")
    # Implement interactive menu loop

if __name__ == "__main__":
    main()
`,
    projectInstructionsMarkdown: `
### Project Overview
The **Student Management System** is a foundational CLI application designed to consolidate your mastery of Python Level 0 & 1 concepts.

### System Architecture & Requirements
1. **Student Data Model**:
   - Each student is identified by a unique ID (e.g. \`"STU1001"\`).
   - Attributes: \`name\` (str), \`age\` (int), \`email\` (str), \`courses\` (list of str), \`grades\` (list of float).
2. **Core Features**:
   - **Add Student**: Prompts for details, validates numeric grades, and computes initial GPA.
   - **Search Student**: Query by Student ID or partial Name search.
   - **Update Record**: Add new course grades or update email address.
   - **Delete Student**: Safely remove student profile after user confirmation.
   - **Export Report**: Print formatted ASCII summary table of all enrolled students sorted by GPA.
3. **Data Persistence**:
   - Automatically save all mutations to \`students.json\` upon program exit.
`,
    milestones: [
      {
        id: 'm1',
        title: 'Milestone 1: Project Setup & Record Schema Design',
        description: 'Define student dictionary structure, starter functions, and json file storage handlers.',
        hints: ['Use json.dump(data, f, indent=4) for human-readable formatted JSON output.'],
        orderIndex: 1,
      },
      {
        id: 'm2',
        title: 'Milestone 2: Implement Add & List Students Features',
        description: 'Build interactive user input prompts for creating new student profiles and listing all active records.',
        hints: ['Validate that age > 0 and grade numbers are between 0.0 and 4.0.'],
        orderIndex: 2,
      },
      {
        id: 'm3',
        title: 'Milestone 3: Implement Search & Update Operations',
        description: 'Allow looking up students by ID or name, and append new course grades with automatic GPA re-calculation.',
        hints: ['Use str.lower() for case-insensitive student name searching.'],
        orderIndex: 3,
      },
      {
        id: 'm4',
        title: 'Milestone 4: Implement Delete & File Persistence Engine',
        description: 'Add safe delete prompts and automate JSON reading/writing across CLI command sessions.',
        hints: ['Ensure file handles are closed using context managers (with open(...) as f:).'],
        orderIndex: 4,
      },
      {
        id: 'm5',
        title: 'Milestone 5: Error Handling & Formatted Summary Report',
        description: 'Wrap input parsing in try/except blocks to prevent runtime crashes, and format output as an aligned text report.',
        hints: ['Use f-string alignment syntax like f"{name:<20} | {gpa:>5.2f}" for clean ASCII tables.'],
        orderIndex: 5,
      },
    ],
    completionCriteria: 'Complete all 5 project milestones and verify JSON file storage and GPA computation logic.',
    pathSlug: 'python',
    associatedModuleSlug: 'fundamentals',
  },
  {
    id: 'py-proj-2',
    slug: 'python-cli-expense-tracker',
    title: 'CLI Personal Expense Tracker & Financial Reporter',
    subtitle: 'Build a financial tracking tool to log, categorize, filter, and analyze personal expenses.',
    description: 'Develop a modular Python application that parses financial entries, calculates spending metrics by category, exports CSV reports, and generates visual text-based spending distribution charts.',
    difficulty: 'beginner',
    estimatedHours: 6,
    skillsLearned: [
      'CSV & Data Aggregation',
      'Datetime Parsing & Filtering',
      'Modular Code Architecture',
      'List Comprehensions & Filtering',
      'ASCII Chart & Report Rendering'
    ],
    prerequisites: [
      'Level 1: Beginner Fundamentals',
      'Working with Lists & List Methods',
      'Dictionaries & Tuples'
    ],
    learningObjectives: [
      'Construct a robust expense record model with timestamping and categories.',
      'Implement CSV export and import capabilities using Python built-in modules.',
      'Calculate category breakdown percentages and date range aggregations.',
      'Build visual ASCII distribution charts for terminal display.'
    ],
    starterCode: `# Personal Expense Tracker
import csv
from datetime import datetime

EXPENSES_FILE = "expenses.csv"
CATEGORIES = ["Food", "Housing", "Transport", "Utilities", "Entertainment", "Other"]

def add_expense(amount, category, description, date_str=None):
    """Log a new expense entry."""
    pass

def generate_summary(expenses):
    """Aggregate expense totals by category."""
    pass
`,
    projectInstructionsMarkdown: `
### Project Overview
The **Personal Expense Tracker** teaches financial data manipulation, date-based filtering, and file I/O using Python standard library.

### Core Specifications
1. **Expense Data Record**:
   - ID (auto-increment), Date (\`YYYY-MM-DD\`), Category, Amount (\`float\`), Description.
2. **Key Capabilities**:
   - Log expense entries with automatic date defaults.
   - Filter transactions by date range (e.g. Current Month, Last 30 Days).
   - Export structured logs to \`expenses.csv\`.
   - Render text-based percentage bar charts.
`,
    milestones: [
      {
        id: 'm1',
        title: 'Milestone 1: Category & Data Model Architecture',
        description: 'Define allowed financial categories, expense dictionary schemas, and timestamp defaults.',
        hints: ['Use datetime.now().strftime("%Y-%m-%d") for default transaction dates.'],
        orderIndex: 1,
      },
      {
        id: 'm2',
        title: 'Milestone 2: Transaction Logging & CSV Writer',
        description: 'Build user input handlers for logging transactions and writing rows to expenses.csv.',
        hints: ['Use Python builtin csv.DictWriter with header fields.'],
        orderIndex: 2,
      },
      {
        id: 'm3',
        title: 'Milestone 3: Date Filtering & Category Aggregation',
        description: 'Implement spending aggregation by category and date-range filters.',
        hints: ['Filter entries using list comprehensions and datetime comparisons.'],
        orderIndex: 3,
      },
      {
        id: 'm4',
        title: 'Milestone 4: CSV Import & Data Reader Engine',
        description: 'Read existing expenses.csv logs into memory on startup with automatic file creation if missing.',
        hints: ['Handle FileNotFoundError gracefully by initializing an empty dataset.'],
        orderIndex: 4,
      },
      {
        id: 'm5',
        title: 'Milestone 5: Visual Terminal Spending Bar Chart',
        description: 'Generate formatted ASCII progress bars showing spending proportion per category.',
        hints: ['Calculate fraction = category_total / grand_total, then scale bar length.'],
        orderIndex: 5,
      },
    ],
    completionCriteria: 'Complete all 5 project milestones, verify CSV persistence, and render spending bar charts.',
    pathSlug: 'python',
    associatedModuleSlug: 'fundamentals',
  },
  {
    id: 'py-proj-3',
    slug: 'python-file-organizer-automation',
    title: 'Automated Desktop File Organizer & Cleaner',
    subtitle: 'Build an automated system utility that scans directories, classifies file types, and cleans unorganized folders.',
    description: 'Build a production-grade system automation tool in Python using pathlib and shutil. The script scans target folders, categorizes files by extensions, creates organized subfolders, handles file collisions safely, and outputs detailed execution logs.',
    difficulty: 'intermediate',
    estimatedHours: 6,
    skillsLearned: [
      'pathlib & OS System Automation',
      'shutil File Management',
      'Collision Resolution Algorithms',
      'Automated Execution Logging',
      'Dry-Run Safety Testing'
    ],
    prerequisites: [
      'Level 1: Foundations',
      'Functions & Scope',
      'Error & Exception Handling'
    ],
    learningObjectives: [
      'Master file system interaction using modern pathlib.Path abstractions.',
      'Implement filename collision strategies (e.g. appending timestamps or counters).',
      'Record all file move operations into an execution log file.',
      'Implement a Dry-Run simulation flag allowing users to preview changes before moving files.'
    ],
    starterCode: `# Desktop File Organizer & Utility
import os
import shutil
from pathlib import Path
import logging

FILE_CATEGORY_MAP = {
    "Images": [".jpg", ".jpeg", ".png", ".gif", ".svg"],
    "Documents": [".pdf", ".docx", ".txt", ".xlsx", ".pptx"],
    "Audio": [".mp3", ".wav", ".flac"],
    "Archives": [".zip", ".tar", ".gz", ".rar"],
    "Code": [".py", ".js", ".html", ".css", ".json"]
}

def organize_directory(target_path, dry_run=True):
    """Scan and organize directory files."""
    pass
`,
    projectInstructionsMarkdown: `
### Project Overview
The **File Organizer & Cleaner** gives you practical experience writing system scripts, working with filesystem paths, and automating repetitive tasks safely.

### Technical Requirements
1. **Extension Classifier**: Maps file extensions to category directories.
2. **Collision Resolution**: If \`report.pdf\` exists in destination, automatically rename to \`report_1.pdf\`.
3. **Dry-Run Mode**: Print planned operations without mutating filesystem.
4. **Audit Logging**: Write structured logs to \`organizer.log\`.
`,
    milestones: [
      {
        id: 'm1',
        title: 'Milestone 1: File Extension Classification Mapping',
        description: 'Build dictionary mapping file extensions to category target folder names.',
        hints: ['Convert file extensions to lowercase (.PDF -> .pdf) before matching.'],
        orderIndex: 1,
      },
      {
        id: 'm2',
        title: 'Milestone 2: Directory Scanner with pathlib',
        description: 'Use pathlib.Path.iterdir() to discover files and ignore existing category directories.',
        hints: ['Check path.is_file() to skip nested subdirectories.'],
        orderIndex: 2,
      },
      {
        id: 'm3',
        title: 'Milestone 3: Safe File Migration & Collision Handler',
        description: 'Implement shutil.move with duplicate filename collision checks.',
        hints: ['Increment a counter index filename_1.ext if target path already exists.'],
        orderIndex: 3,
      },
      {
        id: 'm4',
        title: 'Milestone 4: Execution Logging Engine',
        description: 'Configure Python logging module to record operations in organizer.log.',
        hints: ['Use logging.basicConfig(filename="organizer.log", level=logging.INFO).'],
        orderIndex: 4,
      },
      {
        id: 'm5',
        title: 'Milestone 5: Dry-Run Mode & CLI Configuration',
        description: 'Add a dry_run parameter allowing users to preview planned moves safely.',
        hints: ['Print "[DRY-RUN] Would move X -> Y" when dry_run=True.'],
        orderIndex: 5,
      },
    ],
    completionCriteria: 'Complete all 5 project milestones and verify safe file movement and collision handling.',
    pathSlug: 'python',
    associatedModuleSlug: 'intermediate-python',
  },
  {
    id: 'py-proj-5',
    slug: 'python-rest-api-service',
    title: 'RESTful Microservice API with Python',
    subtitle: 'Engineer a HTTP REST API with routing, validation, status codes, and JSON serialization.',
    description: 'Build a modular REST API application using HTTP principles, request validation, proper status codes, error handling, and structured JSON responses.',
    difficulty: 'intermediate',
    estimatedHours: 8,
    skillsLearned: [
      'HTTP Protocol & REST Design',
      'JSON Serialization & Deserialization',
      'Request Validation',
      'Status Code Architecture',
      'API Error Standard Messaging'
    ],
    prerequisites: [
      'Level 2: Intermediate Python',
      'Level 3: Professional Python Basics'
    ],
    learningObjectives: [
      'Design RESTful HTTP endpoint schemas following GET, POST, PUT, DELETE semantics.',
      'Implement request body parsing and structural schema validation.',
      'Return standard JSON error payloads with correct HTTP status codes (200, 201, 400, 404, 500).',
      'Write modular route handlers separated from core business logic.'
    ],
    starterCode: `# Python RESTful API Service
import json

class RESTApiHandler:
    def __init__(self):
        self.db = {}

    def get_items(self):
        return {"status": 200, "data": list(self.db.values())}

    def create_item(self, payload):
        # Validate payload & insert
        pass
`,
    projectInstructionsMarkdown: `
### Project Overview
Engineer a clean, maintainable REST API handler managing resources with full HTTP verbs, input validation, and proper error payloads.
`,
    milestones: [
      {
        id: 'm1',
        title: 'Milestone 1: Endpoint Routing & Architecture Design',
        description: 'Define URL resource paths and HTTP verb handlers.',
        orderIndex: 1,
      },
      {
        id: 'm2',
        title: 'Milestone 2: GET & Listing Handler Implementation',
        description: 'Implement item listing, pagination query parameters, and single-item lookup.',
        orderIndex: 2,
      },
      {
        id: 'm3',
        title: 'Milestone 3: POST Creation & Data Validation',
        description: 'Parse JSON payloads, validate field types, and return 201 Created responses.',
        orderIndex: 3,
      },
      {
        id: 'm4',
        title: 'Milestone 4: PUT & DELETE Resource Management',
        description: 'Implement full record updates and safe resource deletion with 404 error checks.',
        orderIndex: 4,
      },
      {
        id: 'm5',
        title: 'Milestone 5: Error Middleware & JSON Payload Standardization',
        description: 'Format unified error envelopes and standard status code responses.',
        orderIndex: 5,
      },
    ],
    completionCriteria: 'Complete all 5 API milestones and pass HTTP verb validation tests.',
    pathSlug: 'python',
    associatedModuleSlug: 'professional-python',
  },
  {
    id: 'py-proj-6',
    slug: 'python-auth-security-system',
    title: 'Secure Authentication & Password Vault Engine',
    subtitle: 'Implement password hashing, salt generation, session tokens, and security authorization.',
    description: 'Construct a secure authentication and password management library incorporating cryptographic hashing (PBKDF2/Bcrypt), salt management, secret token generation, and role-based access control (RBAC).',
    difficulty: 'intermediate',
    estimatedHours: 8,
    skillsLearned: [
      'Cryptographic Hashing & Salting',
      'Password Security Best Practices',
      'Session Token Generation',
      'Role-Based Access Control (RBAC)',
      'Defensive Security Engineering'
    ],
    prerequisites: [
      'Level 2: Intermediate Python',
      'Modules & Packages'
    ],
    learningObjectives: [
      'Hash user passwords using salted cryptographic functions.',
      'Generate cryptographically secure session tokens.',
      'Enforce authorization checks based on user roles (Admin, Member, Guest).',
      'Prevent timing attacks and credential leakage.'
    ],
    starterCode: `# Secure Auth & Token Engine
import hashlib
import secrets
import time

class AuthEngine:
    def hash_password(self, password: str, salt: bytes = None) -> tuple[str, str]:
        """Hash password with cryptographic salt."""
        pass
`,
    projectInstructionsMarkdown: `
### Project Overview
Build a production security library for user registration, authentication, password verification, and role authorization.
`,
    milestones: [
      {
        id: 'm1',
        title: 'Milestone 1: Cryptographic Salt & Hash Generator',
        description: 'Implement secure salted password hashing using PBKDF2/SHA256.',
        orderIndex: 1,
      },
      {
        id: 'm2',
        title: 'Milestone 2: User Registration & Credential Store',
        description: 'Build user account creation with password strength verification.',
        orderIndex: 2,
      },
      {
        id: 'm3',
        title: 'Milestone 3: Authentication & Token Issuance',
        description: 'Verify login credentials and issue time-limited session tokens.',
        orderIndex: 3,
      },
      {
        id: 'm4',
        title: 'Milestone 4: Role-Based Authorization Guard',
        description: 'Implement RBAC decorators inspecting session token permissions.',
        orderIndex: 4,
      },
      {
        id: 'm5',
        title: 'Milestone 5: Token Revocation & Audit Security Logs',
        description: 'Add token invalidation on logout and log failed authentication attempts.',
        orderIndex: 5,
      },
    ],
    completionCriteria: 'Complete all 5 security milestones and verify password hash salting and RBAC authorization.',
    pathSlug: 'python',
    associatedModuleSlug: 'python-backend',
  },
  {
    id: 'py-proj-7',
    slug: 'python-database-orm-catalog',
    title: 'Database-Backed Inventory & Relational ORM System',
    subtitle: 'Connect Python to SQL databases, design schemas, execute transactional queries, and build ORM models.',
    description: 'Build a relational database application in Python using SQLite/PostgreSQL driver and ORM patterns. Implement tables, foreign key relationships, multi-statement transactions, indexing, and parameterized query security.',
    difficulty: 'advanced',
    estimatedHours: 8,
    skillsLearned: [
      'SQL Query Writing & Schema Design',
      'Parameterized Queries & SQL Injection Defense',
      'Relational Foreign Keys & Joins',
      'Database Transactions & ACID',
      'Object-Relational Mapping (ORM)'
    ],
    prerequisites: [
      'Level 3: Professional Python',
      'Level 4: Python Backend'
    ],
    learningObjectives: [
      'Design relational schemas with Primary Keys, Foreign Keys, and Constraints.',
      'Execute SQL queries using parameterized placeholders to prevent SQL injection.',
      'Manage database connection pools and context managers for safe transactions.',
      'Map database rows into Python domain model classes.'
    ],
    starterCode: `# SQL Database & ORM System
import sqlite3

class InventoryDB:
    def __init__(self, db_path="inventory.db"):
        self.db_path = db_path
        self.init_db()

    def init_db(self):
        # Create relational tables
        pass
`,
    projectInstructionsMarkdown: `
### Project Overview
Construct a full relational database management utility handling inventory products, categories, suppliers, and purchase transactions.
`,
    milestones: [
      {
        id: 'm1',
        title: 'Milestone 1: Relational Schema & Table Initialization',
        description: 'Write DDL SQL statements for products, categories, and inventory transactions.',
        orderIndex: 1,
      },
      {
        id: 'm2',
        title: 'Milestone 2: Parameterized CRUD Query Methods',
        description: 'Implement insert, select, update, and delete methods using parameterized bindings.',
        orderIndex: 2,
      },
      {
        id: 'm3',
        title: 'Milestone 3: Relational JOIN Queries & Aggregations',
        description: 'Build multi-table join queries to generate inventory valuation reports.',
        orderIndex: 3,
      },
      {
        id: 'm4',
        title: 'Milestone 4: Transaction Commit & Rollback Handler',
        description: 'Wrap multi-step inventory adjustments in explicit BEGIN/COMMIT/ROLLBACK blocks.',
        orderIndex: 4,
      },
      {
        id: 'm5',
        title: 'Milestone 5: Domain Model ORM Wrapper Class',
        description: 'Map relational SQL record tuples into clean Python entity class instances.',
        orderIndex: 5,
      },
    ],
    completionCriteria: 'Complete all 5 database milestones, verify foreign key enforcement, and test transactional integrity.',
    pathSlug: 'python',
    associatedModuleSlug: 'python-backend',
  },
  {
    id: 'py-proj-8',
    slug: 'python-fullstack-web-dashboard',
    title: 'Full-Stack Python Web Application & Analytics Dashboard',
    subtitle: 'Build an end-to-end full-stack web application combining a Python backend server with dynamic web interfaces.',
    description: 'Develop a full-stack web application with dynamic server-side routing, API integration, HTML templates, responsive styling, state management, and real-time dashboard telemetry.',
    difficulty: 'advanced',
    estimatedHours: 10,
    skillsLearned: [
      'Full-Stack Web Architecture',
      'Backend Route Routing & Middlewares',
      'Dynamic HTML Template Rendering',
      'Session & State Management',
      'Full-Stack Integration Testing'
    ],
    prerequisites: [
      'Level 4: Python Backend',
      'REST APIs & Database Programming'
    ],
    learningObjectives: [
      'Connect a Python backend web server with interactive frontend templates.',
      'Render dynamic analytics cards and data tables directly from backend services.',
      'Handle user login sessions, cookie management, and state persistence.',
      'Deploy application assets with production static asset serving.'
    ],
    starterCode: `# Full-Stack Web Application Engine
class WebApp:
    def __init__(self):
        self.routes = {}

    def route(self, path, method="GET"):
        def decorator(func):
            self.routes[(path, method)] = func
            return func
        return decorator
`,
    projectInstructionsMarkdown: `
### Project Overview
Engineer a complete full-stack web application featuring user dashboards, data filtering, dynamic UI updates, and backend API endpoints.
`,
    milestones: [
      {
        id: 'm1',
        title: 'Milestone 1: Web Server Architecture & Router Setup',
        description: 'Initialize backend application runner and request routing system.',
        orderIndex: 1,
      },
      {
        id: 'm2',
        title: 'Milestone 2: Dynamic Template Engine Integration',
        description: 'Render HTML pages populated with backend model data.',
        orderIndex: 2,
      },
      {
        id: 'm3',
        title: 'Milestone 3: Interactive Web Form Processing & Input Validation',
        description: 'Process POST forms, validate inputs, and redirect on success.',
        orderIndex: 3,
      },
      {
        id: 'm4',
        title: 'Milestone 4: Session Cookies & Authentication Flow',
        description: 'Store logged-in user state in encrypted session cookies.',
        orderIndex: 4,
      },
      {
        id: 'm5',
        title: 'Milestone 5: Production Asset Serving & Dashboard Telemetry',
        description: 'Serve CSS/JS static assets and display live metric summary widgets.',
        orderIndex: 5,
      },
    ],
    completionCriteria: 'Complete all 5 full-stack milestones and pass end-to-end integration tests.',
    pathSlug: 'python',
    associatedModuleSlug: 'python-backend',
  },
  {
    id: 'py-proj-9',
    slug: 'python-production-microservice-api',
    title: 'High-Throughput Production API with Caching & Queues',
    subtitle: 'Build a production API microservice with Redis caching, rate limiting, and background worker queues.',
    description: 'Engineer a production-ready API service capable of handling high concurrency. Implement Redis caching layers, token bucket rate limiting, asynchronous worker queues for background jobs, and structured JSON metrics.',
    difficulty: 'advanced',
    estimatedHours: 10,
    skillsLearned: [
      'High-Concurrency API Design',
      'In-Memory Caching (Redis/Memcached)',
      'Rate Limiting & Throttling Algorithms',
      'Asynchronous Background Worker Queues',
      'Production Health Monitoring & Metrics'
    ],
    prerequisites: [
      'Level 5: Advanced Python',
      'asyncio & Concurrency'
    ],
    learningObjectives: [
      'Implement Cache-Aside pattern for database read acceleration.',
      'Build sliding-window rate limiting to protect endpoints from traffic spikes.',
      'Offload long-running computations to background asynchronous queues.',
      'Expose health check and telemetry metrics endpoints.'
    ],
    starterCode: `# High-Throughput Production API
import time
import asyncio

class CacheLayer:
    def __init__(self, ttl_seconds=60):
        self.store = {}
        self.ttl = ttl_seconds

    def get(self, key):
        if key in self.store:
            val, expiry = self.store[key]
            if time.time() < expiry:
                return val
            del self.store[key]
        return None

    def set(self, key, value):
        self.store[key] = (value, time.time() + self.ttl)
`,
    projectInstructionsMarkdown: `
### Project Overview
Build an enterprise API architecture with distributed caching, rate limiting, asynchronous background workers, and performance profiling.
`,
    milestones: [
      {
        id: 'm1',
        title: 'Milestone 1: Cache-Aside Data Engine',
        description: 'Build in-memory cache layer with automatic Time-To-Live (TTL) expiration.',
        orderIndex: 1,
      },
      {
        id: 'm2',
        title: 'Milestone 2: Token Bucket Rate Limiter',
        description: 'Enforce per-client request quotas to prevent API abuse.',
        orderIndex: 2,
      },
      {
        id: 'm3',
        title: 'Milestone 3: Asynchronous Worker Job Queue',
        description: 'Offload email dispatch and heavy analytics tasks to background worker tasks.',
        orderIndex: 3,
      },
      {
        id: 'm4',
        title: 'Milestone 4: Observability & Health Check Endpoints',
        description: 'Add /health and /metrics endpoints reporting latency percentiles and queue depth.',
        orderIndex: 4,
      },
      {
        id: 'm5',
        title: 'Milestone 5: Load Testing & Performance Optimization',
        description: 'Profile API throughput under simulated concurrent load.',
        orderIndex: 5,
      },
    ],
    completionCriteria: 'Complete all 5 production milestones and verify caching hit rates and rate limit enforcement.',
    pathSlug: 'python',
    associatedModuleSlug: 'advanced-python',
  },
  {
    id: 'py-proj-10',
    slug: 'python-distributed-task-worker-engine',
    title: 'Distributed Task Queue & Event Worker Architecture',
    subtitle: 'Architect a distributed asynchronous task queue system with job retries, dead-letter queues, and worker orchestration.',
    description: 'Design and build a scalable distributed task execution engine similar to Celery. Support job serialization, task routing, worker process pools, exponential backoff retries, dead-letter queues, and event stream monitoring.',
    difficulty: 'capstone',
    estimatedHours: 12,
    skillsLearned: [
      'Distributed Systems Architecture',
      'Process & Worker Task Scheduling',
      'Fault Tolerance & Exponential Backoff',
      'Dead-Letter Queue Management',
      'System Observability & Monitoring'
    ],
    prerequisites: [
      'Level 5: Advanced Python',
      'Level 6: Industry Mastery'
    ],
    learningObjectives: [
      'Architect message broker task abstractions for decoupled execution.',
      'Implement multi-process worker pools processing concurrent job queues.',
      'Build automatic retry strategies with exponential jitter backoff.',
      'Route failed jobs to Dead-Letter Queues (DLQ) for inspection.'
    ],
    starterCode: `# Distributed Task Queue Engine
import uuid
import time
import multiprocessing

class Task:
    def __init__(self, name, func, args=(), kwargs=None, max_retries=3):
        self.id = str(uuid.uuid4())
        self.name = name
        self.func = func
        self.args = args
        self.kwargs = kwargs or {}
        self.retries = 0
        self.max_retries = max_retries
`,
    projectInstructionsMarkdown: `
### Project Overview
Engineer a fault-tolerant task queue and multi-worker execution engine handling background workloads at scale.
`,
    milestones: [
      {
        id: 'm1',
        title: 'Milestone 1: Task Contract & Message Broker Specification',
        description: 'Define serializable task definitions, payload contracts, and queue data structures.',
        orderIndex: 1,
      },
      {
        id: 'm2',
        title: 'Milestone 2: Multi-Process Worker Pool',
        description: 'Spawn worker processes consuming tasks concurrently from shared queues.',
        orderIndex: 2,
      },
      {
        id: 'm3',
        title: 'Milestone 3: Fault Recovery & Retry Engine',
        description: 'Catch worker exceptions and reschedule tasks with exponential backoff.',
        orderIndex: 3,
      },
      {
        id: 'm4',
        title: 'Milestone 4: Dead-Letter Queue (DLQ) & Error Inspection',
        description: 'Isolate permanently failed tasks into DLQ storage for manual review.',
        orderIndex: 4,
      },
      {
        id: 'm5',
        title: 'Milestone 5: System Telemetry & Cluster Dashboard',
        description: 'Monitor worker heartbeat status, queue depth, throughput, and error rates.',
        orderIndex: 5,
      },
    ],
    completionCriteria: 'Complete all 5 architecture milestones and verify worker pool concurrency and fault-tolerant retry handling.',
    pathSlug: 'python',
    associatedModuleSlug: 'industry-mastery',
  },
  {
    id: 'py-proj-4',
    slug: 'python-capstone-data-analytics-tool',
    title: 'Final Python Capstone: Real-World Data Analytics Engine',
    subtitle: 'Design and build a comprehensive data processing, analytics, and reporting engine from scratch in Python.',
    description: 'The culmination of the Python Path! Build an end-to-end data analytics tool that ingests raw dataset files, performs statistical transformations, applies custom filter rules, computes descriptive statistics, and generates multi-format markdown & HTML analytical reports.',
    difficulty: 'capstone',
    estimatedHours: 10,
    skillsLearned: [
      'End-to-End Software Architecture',
      'Descriptive Statistical Algorithms',
      'Object-Oriented Design (OOP)',
      'Data Cleaning & Normalization Pipeline',
      'Markdown & HTML Report Generator'
    ],
    prerequisites: [
      'Level 0: Absolute Beginner',
      'Level 1: Python Foundations',
      'Level 2: Intermediate Python',
      'Level 3: Professional Python',
      'Level 4: Python Backend',
      'Level 5: Advanced Python',
      'Level 6: Industry Mastery'
    ],
    learningObjectives: [
      'Architect a modular object-oriented DataProcessor and ReportGenerator class system.',
      'Implement statistical algorithms without external heavy dependencies (mean, median, variance, std dev).',
      'Build dynamic dataset filtering pipeline using higher-order functions.',
      'Export formatted HTML/Markdown analytical dashboards containing statistical highlights.'
    ],
    starterCode: `# Final Python Capstone — Real-World Data Analytics Engine

class DataIngestor:
    """Ingests raw CSV/JSON datasets into clean dictionary records."""
    pass

class AnalyticsEngine:
    """Computes statistical metrics across numerical dataset columns."""
    
    def mean(self, values):
        return sum(values) / len(values) if values else 0.0

    def median(self, values):
        sorted_vals = sorted(values)
        n = len(sorted_vals)
        if n == 0: return 0.0
        mid = n // 2
        return (sorted_vals[mid] + sorted_vals[~mid]) / 2

class ReportGenerator:
    """Generates Markdown and HTML summary reports."""
    pass
`,
    projectInstructionsMarkdown: `
### Capstone Overview
This final portfolio capstone brings together everything you have learned in the Python Mastery Path. You will engineer a standalone Data Analytics & Report Engine.

### Technical Architecture
1. **Dataset Ingestor**: Load structured tabular records from CSV or JSON.
2. **Data Sanitizer**: Handle missing values (\`None\`, \`""\`), convert data types, and normalize text fields.
3. **Statistical Engine**:
   - Metrics: Count, Sum, Mean, Median, Min, Max, Variance, Standard Deviation.
   - Grouping: Calculate metrics grouped by categorical columns (e.g. Sales by Region).
4. **Report Generator**:
   - Export standalone \`report.md\` and \`report.html\` with styling.
`,
    milestones: [
      {
        id: 'm1',
        title: 'Milestone 1: Architecture Planning & Dataset Ingestion',
        description: 'Design DataIngestor class to read CSV and JSON raw data into structured memory records.',
        hints: ['Return dataset records as a list of dicts with standardized column keys.'],
        orderIndex: 1,
      },
      {
        id: 'm2',
        title: 'Milestone 2: Data Sanitization & Normalization Pipeline',
        description: 'Clean raw input data by casting numeric values, filling missing fields, and stripping whitespace.',
        hints: ['Convert strings like "$1,250.50" to float 1250.50.'],
        orderIndex: 2,
      },
      {
        id: 'm3',
        title: 'Milestone 3: Statistical Calculation Engine',
        description: 'Implement descriptive statistical functions (Mean, Median, Standard Deviation, Quantiles).',
        hints: ['Standard Deviation formula: math.sqrt(sum((x - mean)^2) / N).'],
        orderIndex: 3,
      },
      {
        id: 'm4',
        title: 'Milestone 4: Categorical Grouping & Filter Pipeline',
        description: 'Implement SQL-like GROUP BY aggregation and custom filter predicates.',
        hints: ['Use dictionaries to group records by key e.g. groups[category].append(value).'],
        orderIndex: 4,
      },
      {
        id: 'm5',
        title: 'Milestone 5: Multi-Format Report Generator (Markdown & HTML)',
        description: 'Generate polished Markdown and HTML reports containing styled summary cards and tables.',
        hints: ['Embed clean inline CSS in HTML report templates for professional presentation.'],
        orderIndex: 5,
      },
    ],
    completionCriteria: 'Complete all 5 capstone milestones and verify data sanitization, statistical metrics, and HTML report generation.',
    pathSlug: 'python',
    associatedModuleSlug: 'real-world-projects',
  },
];

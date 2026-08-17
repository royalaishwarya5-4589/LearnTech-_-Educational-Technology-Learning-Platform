import { Path } from '@/types/content';
import { COURSE_CERTIFICATION_POLICIES } from '../certification-policies';

export const testingPath: Path = {
  id: 'software-testing-mastery',
  slug: 'software-testing',
  title: 'Software Testing & Quality Assurance',
  subtitle: 'Master unit testing, TDD methodology, mocking frameworks, API testing, and automated E2E browser testing.',
  description: 'Master software quality engineering: unit testing fundamentals, Test Pyramid, TDD Red-Green-Refactor workflows, test doubles (mocks, stubs, spies), API contract testing, database fixtures, automated E2E browser testing, and CI testing suites.',
  icon: '🧪',
  category: 'cs',
  categoryLabel: 'Software Engineering',
  isActive: true,
  status: 'active',
  courseType: 'coding',
  difficulty: 'intermediate',
  estimatedHours: 35,
  totalLessons: 6,
  totalProjects: 2,
  certificationRequirement: COURSE_CERTIFICATION_POLICIES['software-testing'],
  projects: [
    {
      id: 'test-proj-1',
      slug: 'unit-testing-and-mocking-suite',
      title: 'Comprehensive Unit & Mocking Test Suite',
      subtitle: 'Build a unit testing suite isolating complex service dependencies with mocks, stubs, and code coverage analysis.',
      description: 'Engineer a unit testing suite applying Jest/Vitest test frameworks, test doubles, async mocks, and 100% code coverage threshold rules.',
      difficulty: 'intermediate',
      estimatedHours: 5,
      skillsLearned: ['Unit Testing Frameworks', 'Mocking Dependencies', 'Code Coverage Metrics', 'Edge Case Verification'],
      prerequisites: ['Unit Testing & Mocking'],
      learningObjectives: ['Mock external HTTP service clients.', 'Achieve high line and branch code coverage.'],
      starterCode: `describe('UserService Unit Suite', () => {\n    it('should authenticate valid credentials', () => {\n        // Test implementation\n    });\n});`,
      projectInstructionsMarkdown: '### Project Overview\nEngineer a unit test suite with mocking and 100% code coverage rules.',
      milestones: [
        { id: 'testm1', title: 'Milestone 1: Service Layer Unit Tests', description: 'Write unit tests validating business logic edge cases.', orderIndex: 1 },
        { id: 'testm2', title: 'Milestone 2: Mocking External API Clients', description: 'Implement spy and stub mocks isolating network dependency calls.', orderIndex: 2 }
      ],
      completionCriteria: 'Pass unit test suite execution, zero assertion failures, and >90% code coverage checks.',
      pathSlug: 'software-testing'
    },
    {
      id: 'test-proj-2',
      slug: 'full-stack-automated-e2e-testing-framework',
      title: 'Automated E2E Playwright/Cypress Test Framework',
      subtitle: 'Build an automated end-to-end browser testing framework evaluating user flows, authentication, and API endpoints.',
      description: 'Architect an automated End-to-End (E2E) testing framework using Playwright/Cypress covering user login flows, dynamic UI element interactions, visual regressions, and CI test reports.',
      difficulty: 'advanced',
      estimatedHours: 6,
      skillsLearned: ['E2E Playwright Automation', 'Page Object Model (POM)', 'API Contract Testing', 'CI Parallel Test Runners'],
      prerequisites: ['E2E & API Testing'],
      learningObjectives: ['Structure E2E test suites using the Page Object Model pattern.', 'Integrate E2E test execution into GitHub Actions CI workflows.'],
      starterCode: `import { test, expect } from '@playwright/test';\ntest('login flow', async ({ page }) => {\n  await page.goto('/login');\n});`,
      projectInstructionsMarkdown: '### Project Overview\nEngineer an automated E2E browser testing framework with Playwright.',
      milestones: [
        { id: 'testm3', title: 'Milestone 1: Page Object Model Setup', description: 'Design Page Object classes encapsulating UI selectors and interactions.', orderIndex: 1 },
        { id: 'testm4', title: 'Milestone 2: End-to-End User Flow & API Suite', description: 'Write parallel automated user journey tests and HTML execution report generation.', orderIndex: 2 }
      ],
      completionCriteria: 'Pass all headless E2E browser tests and HTML test execution report generation.',
      pathSlug: 'software-testing'
    }
  ],
  modules: [
    {
      id: 'test-mod-1',
      slug: 'testing-foundations',
      title: 'Level 1: Automated Unit Testing & TDD Principles',
      description: 'Understand the Test Pyramid, AAA test structure (Arrange-Act-Assert), Test-Driven Development (TDD), and test assertions.',
      level: 'foundations',
      orderIndex: 1,
      lessons: [
        {
          id: 'test-les-1',
          slug: 'testing-principles-unit-test-cases',
          title: 'Software Testing Principles, Test Pyramid & AAA Pattern',
          description: 'Learn the Test Pyramid (Unit vs Integration vs E2E), FIRST test characteristics, boundary value testing, and Arrange-Act-Assert pattern.',
          estimatedMinutes: 30,
          orderIndex: 1,
          prerequisites: [],
          concepts: [
            {
              id: 'testc1_1',
              title: 'Learning Objectives & The Test Pyramid',
              contentMarkdown: `### Learning Objectives
- Differentiate between Unit, Integration, and End-to-End (E2E) testing tiers in the Test Pyramid.
- Structure readable test cases using the **Arrange-Act-Assert (AAA)** pattern.
- Apply F.I.R.S.T. unit test properties (Fast, Independent, Repeatable, Self-validating, Timely).
- Perform Boundary Value Analysis (BVA) to detect edge case defects.

---

### The Testing Pyramid Architecture
1. **Unit Tests (70%)**: Fast, isolated tests evaluating pure functions and individual methods without network or database dependencies.
2. **Integration Tests (20%)**: Tests evaluating multi-component interactions (e.g. API route connecting to database).
3. **E2E Tests (10%)**: Slow, browser-level user journey flows verifying end-to-end system health.`
            }
          ],
          examples: [
            {
              id: 'testex1_1',
              title: 'Example 1: Arrange-Act-Assert Test Structure',
              code: `describe('ShoppingCart Calculator', () => {
    it('should compute total price with tax correctly', () => {
        // Arrange
        const cart = new ShoppingCart();
        cart.addItem({ name: 'Book', price: 20 });
        const taxRate = 0.10;

        // Act
        const total = cart.calculateTotal(taxRate);

        // Assert
        expect(total).toBe(22);
    });
});`,
              explanation: 'AAA structure separates input setup, method execution, and assertion validation into distinct readable steps.'
            }
          ],
          quiz: [
            {
              id: 'testq1_1',
              question: 'Which tier forms the fast, high-volume foundational base of the Test Pyramid?',
              options: ['Unit Tests', 'E2E Tests', 'Manual Smoke Tests', 'Visual Regression Tests'],
              correctOptionIndex: 0,
              explanation: 'Unit tests form the foundational base of the Test Pyramid due to their fast sub-millisecond execution.'
            }
          ],
          exercise: {
            id: 'testex-1',
            instructions: 'Write assertion code `expect(result).toBe(10);` and match text.',
            initialCode: '// Test assertion\n',
            solutionCode: 'expect(result).toBe(10);',
            hints: ['Use expect(result).toBe(10);'],
            validationType: 'text_match',
            testCases: [{ id: 'testtc1', description: 'Matches test assertion', expectedOutput: 'expect(result).toBe(10);' }]
          },
          references: [],
          completionCriteria: { requiresConceptsRead: true, requiresQuizPassed: true, requiresExercisePassed: true }
        },
        {
          id: 'test-les-2',
          slug: 'testing-tdd-cycle',
          title: 'Test-Driven Development (TDD): Red-Green-Refactor',
          description: 'Master TDD methodology by writing failing tests first (Red), implementing minimal passing code (Green), and optimizing design (Refactor).',
          estimatedMinutes: 35,
          orderIndex: 2,
          prerequisites: ['test-les-1'],
          concepts: [
            {
              id: 'testc2_1',
              title: 'The Red-Green-Refactor Cycle',
              contentMarkdown: `### TDD Execution Cycle
- 🔴 **RED**: Write a failing unit test for a feature before writing production code.
- 🟢 **GREEN**: Write the minimal simplest code necessary to make the test pass.
- 🔵 **REFACTOR**: Clean up code structure, eliminate duplication, and improve variable naming while keeping tests passing.`
            }
          ],
          examples: [
            {
              id: 'testex2_1',
              title: 'Example 1: TDD String Inverter Method',
              code: `// 1. RED: Test written before implementation
describe('reverseString', () => {
    it('should reverse a standard string', () => {
        expect(reverseString('hello')).toBe('olleh');
    });
});

// 2. GREEN: Minimal passing implementation
function reverseString(str) {
    return str.split('').reverse().join('');
}`,
              explanation: 'TDD forces developers to consider interface contracts and edge case assertions prior to writing implementation logic.'
            }
          ],
          quiz: [
            {
              id: 'testq2_1',
              question: 'In the TDD Red-Green-Refactor workflow, what does the RED phase signify?',
              options: [
                'Writing a failing test assertion before writing implementation code',
                'Fixing a production bug emergency',
                'Deleting broken unit tests',
                'Failing a CI build'
              ],
              correctOptionIndex: 0,
              explanation: 'The RED phase requires writing a failing test first to establish clear acceptance criteria.'
            }
          ],
          exercise: {
            id: 'testex-2',
            instructions: 'Write a snippet outputting `"TDD Cycle: RED -> GREEN -> REFACTOR"` to standard console.log.',
            initialCode: '// TDD status snippet\n',
            solutionCode: 'console.log("TDD Cycle: RED -> GREEN -> REFACTOR");',
            hints: ['console.log("TDD Cycle: RED -> GREEN -> REFACTOR");'],
            validationType: 'stdout',
            testCases: [{ id: 'testtc2', description: 'Outputs TDD status', expectedOutput: 'TDD Cycle: RED -> GREEN -> REFACTOR' }]
          },
          references: [],
          completionCriteria: { requiresConceptsRead: true, requiresQuizPassed: true, requiresExercisePassed: true }
        }
      ]
    },
    {
      id: 'test-mod-2',
      slug: 'testing-mocking-integration',
      title: 'Level 2: Test Doubles (Mocks/Spies) & Integration Testing',
      description: 'Isolate external service dependencies using Mocks, Stubs, and Spies, and write API Integration tests evaluating database endpoints.',
      level: 'intermediate',
      orderIndex: 2,
      lessons: [
        {
          id: 'test-les-3',
          slug: 'testing-mocks-stubs-spies',
          title: 'Test Doubles: Mocks, Stubs, Spies & Dependency Injection',
          description: 'Isolate network HTTP calls and database IO using Dummy, Stub, Mock, and Spy test doubles in Vitest/Jest.',
          estimatedMinutes: 35,
          orderIndex: 1,
          prerequisites: ['test-les-2'],
          concepts: [
            {
              id: 'testc3_1',
              title: 'Test Double Taxonomy',
              contentMarkdown: `### Types of Test Doubles (Gerard Meszaros Taxonomy)
- **Dummy**: Unused placeholder objects passed strictly to satisfy parameter signatures.
- **Stub**: Provides hardcoded canned responses to method calls during the test.
- **Spy**: Wraps real functions, recording execution counts and received argument details.
- **Mock**: Pre-programmed object specifying expected call sequences and verifying assertions automatically.`
            }
          ],
          examples: [
            {
              id: 'testex3_1',
              title: 'Example 1: Mocking Async API Client in Vitest',
              code: `import { vi, describe, it, expect } from 'vitest';
import { fetchUserProfile } from './api';

vi.mock('./api', () => ({
    fetchUserProfile: vi.fn().mockResolvedValue({ id: 101, name: 'Alice' })
}));

it('should process mocked user data', async () => {
    const user = await fetchUserProfile(101);
    expect(user.name).toBe('Alice');
    expect(fetchUserProfile).toHaveBeenCalledWith(101);
});`,
              explanation: 'vi.fn().mockResolvedValue replaces actual network HTTP calls with fast, deterministic mock responses.'
            }
          ],
          quiz: [
            {
              id: 'testq3_1',
              question: 'Which type of test double records execution metadata (call count, passed arguments) while preserving function invocation tracking?',
              options: ['Spy', 'Dummy', 'Stub', 'Fake'],
              correctOptionIndex: 0,
              explanation: 'Spies track function call metrics (e.g. toHaveBeenCalledWith) for assertion checks.'
            }
          ],
          exercise: {
            id: 'testex-3',
            instructions: 'Write mock spy assertion `expect(fetchMock).toHaveBeenCalledWith(101);` and match text.',
            initialCode: '// Spy assertion\n',
            solutionCode: 'expect(fetchMock).toHaveBeenCalledWith(101);',
            hints: ['Use expect(fetchMock).toHaveBeenCalledWith(101);'],
            validationType: 'text_match',
            testCases: [{ id: 'testtc3', description: 'Matches spy assertion', expectedOutput: 'expect(fetchMock).toHaveBeenCalledWith(101);' }]
          },
          references: [],
          completionCriteria: { requiresConceptsRead: true, requiresQuizPassed: true, requiresExercisePassed: true }
        },
        {
          id: 'test-les-4',
          slug: 'testing-api-integration',
          title: 'API Integration Testing & Contract Validation',
          description: 'Execute HTTP Integration tests against REST API routes using Supertest, managing test database transactions and JSON payload contracts.',
          estimatedMinutes: 40,
          orderIndex: 2,
          prerequisites: ['test-les-3'],
          concepts: [
            {
              id: 'testc4_1',
              title: 'Integration Testing Boundaries',
              contentMarkdown: `### Integration Testing Objectives
While unit tests isolate individual functions, **Integration Tests** verify that multiple real system layers (e.g. Express HTTP Controller + Service Layer + Postgres Database) work correctly in combination.`
            }
          ],
          examples: [
            {
              id: 'testex4_1',
              title: 'Example 1: Supertest API Route Integration Test',
              code: `import request from 'supertest';
import app from '../app';

describe('POST /api/v1/users', () => {
    it('should create new user and return 201 Created status', async () => {
        const response = await request(app)
            .post('/api/v1/users')
            .send({ email: 'newuser@example.com', name: 'Alice' });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('id');
        expect(response.body.email).toBe('newuser@example.com');
    });
});`,
              explanation: 'Supertest issues real HTTP requests against in-memory Express application instances.'
            }
          ],
          quiz: [
            {
              id: 'testq4_1',
              question: 'Which node testing library issues HTTP requests against server route handlers during integration tests?',
              options: ['Supertest', 'Jest', 'Playwright', 'Selenium'],
              correctOptionIndex: 0,
              explanation: 'Supertest sends HTTP payloads to Express/Node handlers for integration endpoint testing.'
            }
          ],
          exercise: {
            id: 'testex-4',
            instructions: 'Write assertion `expect(response.status).toBe(200);` and match text.',
            initialCode: '// HTTP status assertion\n',
            solutionCode: 'expect(response.status).toBe(200);',
            hints: ['Use expect(response.status).toBe(200);'],
            validationType: 'text_match',
            testCases: [{ id: 'testtc4', description: 'Matches HTTP status assertion', expectedOutput: 'expect(response.status).toBe(200);' }]
          },
          references: [],
          completionCriteria: { requiresConceptsRead: true, requiresQuizPassed: true, requiresExercisePassed: true }
        }
      ]
    },
    {
      id: 'test-mod-3',
      slug: 'testing-e2e-performance',
      title: 'Level 3: Automated E2E Browser Testing & CI Suites',
      description: 'Architect automated End-to-End browser test suites with Playwright/Cypress, Page Object Model (POM), and CI pipeline execution.',
      level: 'advanced',
      orderIndex: 3,
      lessons: [
        {
          id: 'test-les-5',
          slug: 'testing-e2e-playwright-pom',
          title: 'Automated E2E Testing with Playwright & Page Object Model (POM)',
          description: 'Automate headless browser interactions using Playwright, encapsulate UI selectors with Page Object Model classes, and handle dynamic web states.',
          estimatedMinutes: 40,
          orderIndex: 1,
          prerequisites: ['test-les-4'],
          concepts: [
            {
              id: 'testc5_1',
              title: 'Page Object Model (POM) Design Pattern',
              contentMarkdown: `### Why Use Page Object Model?
Hardcoding CSS selectors (\`#submit-btn-login\`) directly inside test files causes fragile tests when UI design changes. **Page Object Model** encapsulates page layout selectors and actions into dedicated class objects.`
            }
          ],
          examples: [
            {
              id: 'testex5_1',
              title: 'Example 1: Playwright Page Object Class',
              code: `import { Page, Locator } from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    readonly emailInput: Locator;
    readonly submitButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.emailInput = page.locator('#email');
        this.submitButton = page.locator('button[type="submit"]');
    }

    async login(email: string) {
        await this.emailInput.fill(email);
        await this.submitButton.click();
    }
}`,
              explanation: 'Encapsulates email input locator and click submit action into a clean reusable class.'
            }
          ],
          quiz: [
            {
              id: 'testq5_1',
              question: 'What is the main design benefit of applying the Page Object Model pattern in automated E2E browser testing?',
              options: [
                'Encapsulates UI selectors into dedicated reusable classes, reducing test maintenance when UI layouts change',
                'Speeds up database queries',
                'Disables JavaScript',
                'Eliminates the need for assertions'
              ],
              correctOptionIndex: 0,
              explanation: 'POM isolates DOM selectors from test assertions, requiring updates in only one class when UI markup changes.'
            }
          ],
          exercise: {
            id: 'testex-5',
            instructions: 'Write Playwright page interaction `await page.click("button#submit");` and match text.',
            initialCode: '// Playwright action\n',
            solutionCode: 'await page.click("button#submit");',
            hints: ['Use await page.click("button#submit");'],
            validationType: 'text_match',
            testCases: [{ id: 'testtc5', description: 'Matches Playwright action', expectedOutput: 'await page.click("button#submit");' }]
          },
          references: [],
          completionCriteria: { requiresConceptsRead: true, requiresQuizPassed: true, requiresExercisePassed: true }
        },
        {
          id: 'test-les-6',
          slug: 'testing-ci-coverage-reporting',
          title: 'Code Coverage Thresholds & CI Test Runner Pipeline',
          description: 'Enforce code coverage thresholds (Line, Branch, Function), generate HTML coverage reports, and configure parallel test execution in CI/CD.',
          estimatedMinutes: 40,
          orderIndex: 2,
          prerequisites: ['test-les-5'],
          concepts: [
            {
              id: 'testc6_1',
              title: 'Code Coverage Metrics & Sharding',
              contentMarkdown: `### Code Coverage Metrics
- **Line Coverage**: Percentage of code lines executed during test runs.
- **Branch Coverage**: Percentage of conditional \`if/else\` decision branches evaluated.
- **Test Sharding**: Splitting large E2E test suites across multiple parallel CI runner machines.`
            }
          ],
          examples: [
            {
              id: 'testex6_1',
              title: 'Example 1: Vitest Code Coverage Threshold Config',
              code: `// vitest.config.ts
export default defineConfig({
  test: {
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      thresholds: {
        lines: 85,
        functions: 85,
        branches: 80,
        statements: 85
      }
    }
  }
});`,
              explanation: 'Configures automated build failure if code coverage drops below defined percentage thresholds.'
            }
          ],
          quiz: [
            {
              id: 'testq6_1',
              question: 'Which coverage metric measures whether both true and false conditional evaluation branches were executed during testing?',
              options: ['Branch Coverage', 'Line Coverage', 'Function Coverage', 'File Coverage'],
              correctOptionIndex: 0,
              explanation: 'Branch coverage checks whether conditional logical decision paths (true/false) were evaluated.'
            }
          ],
          exercise: {
            id: 'testex-6',
            instructions: 'Write a snippet outputting `"Code Coverage: 92% Passed"` to standard console.log.',
            initialCode: '// Coverage status\n',
            solutionCode: 'console.log("Code Coverage: 92% Passed");',
            hints: ['console.log("Code Coverage: 92% Passed");'],
            validationType: 'stdout',
            testCases: [{ id: 'testtc6', description: 'Outputs Coverage Passed status', expectedOutput: 'Code Coverage: 92% Passed' }]
          },
          references: [],
          completionCriteria: { requiresConceptsRead: true, requiresQuizPassed: true, requiresExercisePassed: true }
        }
      ]
    }
  ]
};

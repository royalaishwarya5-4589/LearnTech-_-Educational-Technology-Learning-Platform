import { Path } from '@/types/content';
import { COURSE_CERTIFICATION_POLICIES } from '../certification-policies';

export const interviewPrepPath: Path = {
  id: 'interview-prep-mastery',
  slug: 'interview-preparation',
  title: 'Software Engineering Technical Interview Prep',
  subtitle: 'Master algorithmic coding interview patterns, system design frameworks, STAR behavioral communication, and offer negotiation.',
  description: 'Prepare for software engineering technical interviews with algorithmic coding patterns, whiteboard system design frameworks, STAR behavioral responses, and timed mock assessments.',
  icon: '🎯',
  category: 'career',
  categoryLabel: 'Career & Growth',
  isActive: true,
  status: 'active',
  courseType: 'conceptual',
  difficulty: 'intermediate',
  estimatedHours: 40,
  totalLessons: 6,
  totalProjects: 2,
  certificationRequirement: COURSE_CERTIFICATION_POLICIES['interview-preparation'],
  projects: [
    {
      id: 'int-proj-1',
      slug: 'technical-portfolio-and-resume-blueprint',
      title: 'Production Software Engineer Portfolio & Resume',
      subtitle: 'Build an impactful developer resume and GitHub project portfolio showcasing STAR achievements and system architecture.',
      description: 'Construct a software engineering resume applying action-result metrics (X-Y-Z formula: Accomplished [X] as measured by [Y] by doing [Z]) and align GitHub repository README project showcases.',
      difficulty: 'intermediate',
      estimatedHours: 4,
      skillsLearned: ['Google X-Y-Z Resume Method', 'GitHub Portfolio Alignment', 'Technical Writing', 'Impact Metric Formatting'],
      prerequisites: ['Resume & Portfolio Blueprint'],
      learningObjectives: ['Format technical resume bullet points using quantitative impact metrics.', 'Structure production-ready GitHub repository project documentation.'],
      starterCode: `// Resume Bullet Formula: Accomplished X as measured by Y by doing Z\n// Example: Improved API latency by 45% (Y) by implementing Redis caching (Z)`,
      projectInstructionsMarkdown: '### Project Overview\nEngineer an enterprise software developer resume and GitHub portfolio showcase.',
      milestones: [
        { id: 'intm1', title: 'Milestone 1: Impact-Driven Technical Resume Writing', description: 'Write quantitative achievement bullet points following X-Y-Z structure.', orderIndex: 1 },
        { id: 'intm2', title: 'Milestone 2: GitHub Repository Portfolio Architecture', description: 'Structure architecture diagrams, setup instructions, and badges for capstone projects.', orderIndex: 2 }
      ],
      completionCriteria: 'Verify X-Y-Z impact metric formatting, GitHub project documentation completeness, and technical resume polish.',
      pathSlug: 'interview-preparation'
    },
    {
      id: 'int-proj-2',
      slug: 'mock-technical-interview-code-and-design-submission',
      title: 'Full Technical Mock Interview & Behavioral Audit',
      subtitle: 'Complete a timed live coding problem, system design blueprint, and STAR behavioral interview panel presentation.',
      description: 'Execute a comprehensive mock technical interview evaluation consisting of algorithmic problem solving out-loud, high-level system design diagramming, and STAR behavioral scenario responses.',
      difficulty: 'advanced',
      estimatedHours: 6,
      skillsLearned: ['Live Coding Verification', 'System Design Interview Presentation', 'STAR Behavioral Responses', 'Offer Negotiation Strategies'],
      prerequisites: ['Coding Patterns & System Design'],
      learningObjectives: ['Demonstrate clear out-loud technical problem-solving communication.', 'Structure STAR behavioral responses with clear business actions.'],
      starterCode: `function mockInterviewSubmission() {\n    // Algorithmic solution & system design blueprint\n}`,
      projectInstructionsMarkdown: '### Project Overview\nComplete a comprehensive technical mock interview evaluation covering coding, design, and behavioral scenarios.',
      milestones: [
        { id: 'intm3', title: 'Milestone 1: Live Coding & Complexity Communication', description: 'Solve live algorithmic coding prompt while communicating time/space complexity.', orderIndex: 1 },
        { id: 'intm4', title: 'Milestone 2: STAR Behavioral & Design Presentation', description: 'Present STAR behavioral conflict resolution and system design architecture.', orderIndex: 2 }
      ],
      completionCriteria: 'Pass coding correctness, out-loud technical communication, and STAR behavioral assessment rubrics.',
      pathSlug: 'interview-preparation'
    }
  ],
  modules: [
    {
      id: 'int-mod-1',
      slug: 'interview-coding-foundations',
      title: 'Level 1: Technical Interview Frameworks & Coding Patterns',
      description: 'Understand Google X-Y-Z resume writing, 7-step problem-solving frameworks, and core algorithmic coding patterns (Two-Pointer, Sliding Window).',
      level: 'foundations',
      orderIndex: 1,
      lessons: [
        {
          id: 'int-les-1',
          slug: 'interview-prep-resume-portfolio',
          title: 'Technical Interview Blueprint: X-Y-Z Resume & 7-Step Coding Method',
          description: 'Learn how technical interview loops work, structure quantitative resume metrics, and apply out-loud problem-solving steps.',
          estimatedMinutes: 30,
          orderIndex: 1,
          prerequisites: [],
          concepts: [
            {
              id: 'intc1_1',
              title: 'Learning Objectives & 7-Step Method',
              contentMarkdown: `### Learning Objectives
- Write quantitative resume bullet points following the Google X-Y-Z formula.
- Execute the **7-Step Live Coding Framework** out-loud during interviews.
- Communicate time ($\mathcal{O}$) and auxiliary space complexity clearly.

---

### The 7-Step Live Coding Framework
1. **Clarify Inputs & Edge Cases**: Ask about null values, empty arrays, integer overflows, and duplicate inputs.
2. **State Inputs & Output Types**: Explicitly declare expected return signatures.
3. **Walk Through Hand-Drawn Examples**: Trace sample test cases step-by-step.
4. **Propose Brute-Force Baseline**: State naive time/space bounds first ($O(N^2)$).
5. **Propose Optimal Pattern**: Identify algorithmic optimizations ($O(N)$ or $O(N \log N)$).
6. **Write Modular Code Out-Loud**: Verbalize thought processes while typing.
7. **Dry Run & Analyze Complexity**: Trace edge cases and state final Big-O.`
            }
          ],
          examples: [
            {
              id: 'intex1_1',
              title: 'Example 1: Google X-Y-Z Resume Formula',
              code: `// Google X-Y-Z Resume Formula:
// "Accomplished [X] as measured by [Y] by doing [Z]"

// BEFORE (Vague):
// "Built backend API endpoints and added database caching."

// AFTER (High Impact):
// "Reduced p99 API response latency by 45% (X) as measured by Datadog metrics (Y) by implementing a multi-region Redis cache-aside layer (Z)."`,
              explanation: 'Quantitative X-Y-Z metrics clearly communicate engineering ownership and business value.'
            }
          ],
          quiz: [
            {
              id: 'intq1_1',
              question: 'What is the recommended first step upon receiving a coding problem statement in a live technical interview?',
              options: [
                'Clarify requirements, inputs/outputs, and edge cases out-loud',
                'Immediately start typing code without speaking',
                'Memorize the solution silently',
                'Ask the interviewer for the answer'
              ],
              correctOptionIndex: 0,
              explanation: 'Clarifying constraints out-loud demonstrates communication skills and prevents incorrect assumptions.'
            }
          ],
          exercise: {
            id: 'intex-1',
            instructions: 'Write a snippet outputting `"7-Step Method: Clarify -> Example -> Optimize -> Code"` to standard console.log.',
            initialCode: '// Method status snippet\n',
            solutionCode: 'console.log("7-Step Method: Clarify -> Example -> Optimize -> Code");',
            hints: ['console.log("7-Step Method: Clarify -> Example -> Optimize -> Code");'],
            validationType: 'stdout',
            testCases: [{ id: 'inttc1', description: 'Outputs 7-Step Method text', expectedOutput: '7-Step Method: Clarify -> Example -> Optimize -> Code' }]
          },
          references: [],
          completionCriteria: { requiresConceptsRead: true, requiresQuizPassed: true, requiresExercisePassed: true }
        },
        {
          id: 'int-les-2',
          slug: 'interview-prep-coding-patterns',
          title: 'Essential Coding Patterns: Two-Pointers & Sliding Window',
          description: 'Recognize pattern signatures for Two-Pointers, Sliding Window, Fast/Slow Pointers, and Top-K Heap algorithms.',
          estimatedMinutes: 35,
          orderIndex: 2,
          prerequisites: ['int-les-1'],
          concepts: [
            {
              id: 'intc2_1',
              title: 'Algorithmic Pattern Signatures',
              contentMarkdown: `### Pattern Recognition
- **Two-Pointers**: Sorted arrays/strings searching for pairs (\`left=0, right=n-1\`). Time: $O(N)$.
- **Sliding Window**: Subarray/substring contiguous windows (e.g. longest substring without repeating characters). Time: $O(N)$.
- **Fast & Slow Pointers (Floyd Cycle)**: Linked list cycle detection and middle node discovery.`
            }
          ],
          examples: [
            {
              id: 'intex2_1',
              title: 'Example 1: Sliding Window Longest Substring',
              code: `function lengthOfLongestSubstring(s) {
    let charSet = new Set();
    let left = 0, maxLen = 0;

    for (let right = 0; right < s.length; right++) {
        while (charSet.has(s[right])) {
            charSet.delete(s[left]);
            left++;
        }
        charSet.add(s[right]);
        maxLen = Math.max(maxLen, right - left + 1);
    }
    return maxLen;
}`,
              explanation: 'Sliding window expands right pointer and shrinks left pointer dynamically in O(N) time.'
            }
          ],
          quiz: [
            {
              id: 'intq2_1',
              question: 'Which algorithmic pattern signature is ideal for finding contiguous maximum/minimum subarray metrics in linear O(N) time?',
              options: ['Sliding Window', 'Binary Search', 'Backtracking', 'Union-Find'],
              correctOptionIndex: 0,
              explanation: 'Sliding window maintains dynamic contiguous sub-array bounds in O(N) linear time.'
            }
          ],
          exercise: {
            id: 'intex-2',
            instructions: 'Write a snippet outputting `"Pattern Identified: Sliding Window O(N)"` to standard console.log.',
            initialCode: '// Pattern output\n',
            solutionCode: 'console.log("Pattern Identified: Sliding Window O(N)");',
            hints: ['console.log("Pattern Identified: Sliding Window O(N)");'],
            validationType: 'stdout',
            testCases: [{ id: 'inttc2', description: 'Outputs Pattern Identified status', expectedOutput: 'Pattern Identified: Sliding Window O(N)' }]
          },
          references: [],
          completionCriteria: { requiresConceptsRead: true, requiresQuizPassed: true, requiresExercisePassed: true }
        }
      ]
    },
    {
      id: 'int-mod-2',
      slug: 'interview-system-design-behavioral',
      title: 'Level 2: System Design Interviews & STAR Behavioral Strategy',
      description: 'Master 4-step System Design interview frameworks and deliver structured behavioral responses using the STAR method.',
      level: 'intermediate',
      orderIndex: 2,
      lessons: [
        {
          id: 'int-les-3',
          slug: 'interview-prep-system-design-framework',
          title: 'System Design Interview Framework & Whiteboard Communication',
          description: 'Structure 45-minute system design interviews: Requirements -> Estimations -> High-Level Design -> Deep Dive -> Failure Recovery.',
          estimatedMinutes: 35,
          orderIndex: 1,
          prerequisites: ['int-les-2'],
          concepts: [
            {
              id: 'intc3_1',
              title: 'System Design Time Management (45-Min Round)',
              contentMarkdown: `### 45-Minute System Design Breakdown
- **00-05 min**: Clarify Functional & Non-Functional Requirements.
- **05-10 min**: Back-of-the-Envelope Capacity Estimations (QPS, Storage).
- **10-25 min**: High-Level Architecture Diagramming (LB, API, DB, Cache).
- **25-40 min**: Deep Dive Key Components & Bottlenecks.
- **40-45 min**: Wrap-up, Trade-offs, SPOFs, and Failure Scenarios.`
            }
          ],
          examples: [
            {
              id: 'intex3_1',
              title: 'Example 1: High-Level System Architecture Sketch',
              code: `// System Design Architectural Stack Flow:
Client Browser/App 
  -> DNS & CDN (Cloudflare)
  -> API Gateway & Load Balancer (Nginx / ALB)
  -> Stateless Web Service Instances (Node/Java/Python)
  ├── Distributed Cache (Redis Cluster)
  ├── Relational DB Shards (PostgreSQL - Write) + Read Replicas
  └── Event Bus Queue (Apache Kafka) -> Worker Async Processing`,
              explanation: 'Structure components logically from edge proxy down to data persistence layers.'
            }
          ],
          quiz: [
            {
              id: 'intq3_1',
              question: 'In a 45-minute system design interview round, when should capacity estimations (QPS / Storage math) be discussed?',
              options: [
                'Within the first 10 minutes before drawing high-level architecture diagrams',
                'At the very end of the interview',
                'Capacity math should never be done',
                'Only if the code fails'
              ],
              correctOptionIndex: 0,
              explanation: 'Establishing QPS and storage bounds early guides data store selection and caching strategies.'
            }
          ],
          exercise: {
            id: 'intex-3',
            instructions: 'Write a snippet outputting `"System Design Phase: High-Level Architecture"` to standard console.log.',
            initialCode: '// Design status\n',
            solutionCode: 'console.log("System Design Phase: High-Level Architecture");',
            hints: ['console.log("System Design Phase: High-Level Architecture");'],
            validationType: 'stdout',
            testCases: [{ id: 'inttc3', description: 'Outputs System Design Phase status', expectedOutput: 'System Design Phase: High-Level Architecture' }]
          },
          references: [],
          completionCriteria: { requiresConceptsRead: true, requiresQuizPassed: true, requiresExercisePassed: true }
        },
        {
          id: 'int-les-4',
          slug: 'interview-prep-star-behavioral',
          title: 'STAR Method Behavioral Responses & Leadership Principles',
          description: 'Structure behavioral interview stories (Situation, Task, Action, Result) answering conflict resolution and technical trade-off questions.',
          estimatedMinutes: 35,
          orderIndex: 2,
          prerequisites: ['int-les-3'],
          concepts: [
            {
              id: 'intc4_1',
              title: 'The STAR Behavioral Structure',
              contentMarkdown: `### The STAR Framework
- **Situation (15%)**: Set the background context and technical environment.
- **Task (15%)**: Explain the specific challenge or goal assigned.
- **Action (50%)**: Detail the specific actions YOU took (70%+ focus on your individual contributions).
- **Result (20%)**: State quantifiable business impact metrics and key lessons learned.`
            }
          ],
          examples: [
            {
              id: 'intex4_1',
              title: 'Example 1: STAR Response Outline',
              code: `// Situation: Legacy monolith experiencing 5-second database timeouts during sales.
// Task: I was tasked with restoring checkout response times under 500ms.
// Action: I profiled queries with EXPLAIN ANALYZE, added composite indexes, and implemented Redis cache-aside.
// Result: Reduced p99 latency by 85% to 350ms, resulting in zero checkout dropouts.`,
              explanation: 'Emphasizes personal technical actions and quantitative business results.'
            }
          ],
          quiz: [
            {
              id: 'intq4_1',
              question: 'Which component of the STAR behavioral framework should receive the majority (50%+) of your story focus time?',
              options: ['Action (the specific steps you personally executed)', 'Situation', 'Task', 'Result'],
              correctOptionIndex: 0,
              explanation: 'Interviewers evaluate your personal engineering capabilities through the Action section.'
            }
          ],
          exercise: {
            id: 'intex-4',
            instructions: 'Write a snippet outputting `"STAR Response: Action & Result"` to standard console.log.',
            initialCode: '// STAR status\n',
            solutionCode: 'console.log("STAR Response: Action & Result");',
            hints: ['console.log("STAR Response: Action & Result");'],
            validationType: 'stdout',
            testCases: [{ id: 'inttc4', description: 'Outputs STAR Response status', expectedOutput: 'STAR Response: Action & Result' }]
          },
          references: [],
          completionCriteria: { requiresConceptsRead: true, requiresQuizPassed: true, requiresExercisePassed: true }
        }
      ]
    },
    {
      id: 'int-mod-3',
      slug: 'interview-negotiation-mastery',
      title: 'Level 3: Mock Interviews & Software Engineering Offer Negotiation',
      description: 'Conduct timed mock interview drills, evaluate compensation components (Base, Equity/RSUs, Bonus), and execute professional offer negotiation.',
      level: 'advanced',
      orderIndex: 3,
      lessons: [
        {
          id: 'int-les-5',
          slug: 'interview-prep-offer-negotiation',
          title: 'Compensation Component Analysis & Offer Negotiation Strategies',
          description: 'Understand Total Compensation (Base Salary, Equity RSUs, Sign-On Bonus), equity vesting schedules, and counter-offer communication tactics.',
          estimatedMinutes: 40,
          orderIndex: 1,
          prerequisites: ['int-les-4'],
          concepts: [
            {
              id: 'intc5_1',
              title: 'Compensation Structure & Equity Vesting',
              contentMarkdown: `### Total Compensation (TC) Components
1. **Base Salary**: Guaranteed annual cash payment.
2. **Equity (RSUs / Options)**: Shares vesting over 4 years (typically with a 1-year cliff).
3. **Sign-On / Performance Bonus**: One-time or recurring cash incentives.`
            }
          ],
          examples: [
            {
              id: 'intex5_1',
              title: 'Example 1: Professional Counter-Offer Communication Script',
              code: `// Counter-Offer Email Script:
"I am thrilled about the opportunity to join the engineering team. Based on my specialized experience in distributed systems and competing market benchmarks for Senior Engineer roles, I would be ready to sign immediately if we can adjust the base salary to $185,000 and include a $20,000 sign-on bonus."`,
              explanation: 'Expresses enthusiasm while tying counter-offer requests to clear benchmarks and instant commitment.'
            }
          ],
          quiz: [
            {
              id: 'intq5_1',
              question: 'What is a typical 4-year RSU equity vesting cliff schedule in software engineering offers?',
              options: [
                '25% of shares vest after 1 year, followed by monthly/quarterly vesting for remaining 3 years',
                '100% of shares vest immediately on day 1',
                'Shares vest only upon company sale',
                'Shares vest evenly every day'
              ],
              correctOptionIndex: 0,
              explanation: 'A 1-year cliff requires 12 months of service before the first 25% chunk of equity vests.'
            }
          ],
          exercise: {
            id: 'intex-5',
            instructions: 'Write a snippet outputting `"Negotiation Outcome: Total Compensation Increased"` to standard console.log.',
            initialCode: '// Negotiation output\n',
            solutionCode: 'console.log("Negotiation Outcome: Total Compensation Increased");',
            hints: ['console.log("Negotiation Outcome: Total Compensation Increased");'],
            validationType: 'stdout',
            testCases: [{ id: 'inttc5', description: 'Outputs Negotiation Outcome text', expectedOutput: 'Negotiation Outcome: Total Compensation Increased' }]
          },
          references: [],
          completionCriteria: { requiresConceptsRead: true, requiresQuizPassed: true, requiresExercisePassed: true }
        },
        {
          id: 'int-les-6',
          slug: 'interview-prep-full-mock-assessment',
          title: 'Full Technical Mock Interview Audit & Feedback Rubrics',
          description: 'Evaluate coding correctness, Big-O communication, whiteboard design, and STAR behavioral responses using standardized interview rubrics.',
          estimatedMinutes: 40,
          orderIndex: 2,
          prerequisites: ['int-les-5'],
          concepts: [
            {
              id: 'intc6_1',
              title: 'Standard Engineering Interview Evaluation Rubric',
              contentMarkdown: `### 4-Tier Assessment Rubric
- **Coding Competency**: Syntax fluency, correct handling of edge cases, modular function separation.
- **Problem Solving**: Algorithmic pattern choice, Big-O optimization.
- **Communication**: Out-loud verbalization of thought process, receptivity to interviewer hints.
- **System Architecture**: High-level design, capacity math accuracy, trade-off awareness.`
            }
          ],
          examples: [
            {
              id: 'intex6_1',
              title: 'Example 1: Candidate Evaluation Feedback',
              code: `// Mock Interview Feedback Summary:
// Strong Candidate (Hire):
// - Solved Two-Sum in O(N) using Hash Map on first attempt.
// - Communicated p99 latency trade-offs during system design round.
// - Structured STAR responses with clear business metrics.`,
              explanation: 'Standardized evaluation feedback rubric used by engineering hiring committees.'
            }
          ],
          quiz: [
            {
              id: 'intq6_1',
              question: 'Which factor is most critical when interviewers evaluate live coding communication?',
              options: [
                'Verbalizing thought process out-loud and discussing trade-offs collaboratively',
                'Typing as fast as possible without speaking',
                'Never asking clarifying questions',
                'Copying code from memory'
              ],
              correctOptionIndex: 0,
              explanation: 'Technical interviewers evaluate how candidates collaborate and think through complex problems out-loud.'
            }
          ],
          exercise: {
            id: 'intex-6',
            instructions: 'Write a snippet outputting `"Mock Interview Score: Strong Hire"` to standard console.log.',
            initialCode: '// Mock status\n',
            solutionCode: 'console.log("Mock Interview Score: Strong Hire");',
            hints: ['console.log("Mock Interview Score: Strong Hire");'],
            validationType: 'stdout',
            testCases: [{ id: 'inttc6', description: 'Outputs Mock status', expectedOutput: 'Mock Interview Score: Strong Hire' }]
          },
          references: [],
          completionCriteria: { requiresConceptsRead: true, requiresQuizPassed: true, requiresExercisePassed: true }
        }
      ]
    }
  ]
};

import { Path } from '@/types/content';
import { COURSE_CERTIFICATION_POLICIES } from '../certification-policies';

export const reactNextPath: Path = {
  id: 'react-next-mastery',
  slug: 'react',
  title: 'React & Next.js Framework Architecture',
  subtitle: 'Build modern full-stack web applications with React 19, Server Components, and Next.js App Router.',
  description: 'Master component composition, JSX declarative UI, custom hooks, state management, Next.js App Router, Server Components, SSR, and production web deployment.',
  icon: '⚛️',
  category: 'web',
  categoryLabel: 'Web Frameworks',
  isActive: true,
  status: 'active',
  courseType: 'coding',
  difficulty: 'intermediate',
  estimatedHours: 50,
  totalLessons: 6,
  totalProjects: 2,
  certificationRequirement: COURSE_CERTIFICATION_POLICIES['react'],
  projects: [
    {
      id: 'react-proj-1',
      slug: 'react-interactive-kanban-board',
      title: 'React Interactive Task Kanban Board',
      subtitle: 'Build a drag-and-drop Kanban project management application with custom hooks and persistent local state.',
      description: 'Architect a modular React application featuring dynamic column management, task modal dialogs, custom state hooks, and optimistic UI updates.',
      difficulty: 'intermediate',
      estimatedHours: 6,
      skillsLearned: ['React 19 Components', 'useState & useReducer Hooks', 'Drag & Drop Event API', 'Custom React Hooks'],
      prerequisites: ['React Hooks & State'],
      learningObjectives: ['Manage complex nested state updates cleanly.', 'Create reusable UI component hierarchies.'],
      starterCode: `export default function KanbanBoard() {\n  return <div>Kanban Board Initialized</div>;\n}`,
      projectInstructionsMarkdown: '### Project Overview\nBuild an interactive drag-and-drop Kanban board UI in React.',
      milestones: [
        { id: 'rm1', title: 'Milestone 1: Column & Task Card Components', description: 'Design KanbanColumn and TaskCard presentation components.', orderIndex: 1 },
        { id: 'rm2', title: 'Milestone 2: State Reducer & Task Mutators', description: 'Implement useReducer hook managing task movements across columns.', orderIndex: 2 }
      ],
      completionCriteria: 'Verify dynamic task movement, status updates, and component re-render performance.',
      pathSlug: 'react'
    },
    {
      id: 'react-proj-2',
      slug: 'nextjs-fullstack-e-commerce-portal',
      title: 'Full-Stack Next.js App Router Platform',
      subtitle: 'Build a production-grade web portal featuring React Server Components, Server Actions, and Supabase Database integration.',
      description: 'Architect an end-to-end web application with Next.js App Router, dynamic route params, server-side data fetching, authentication middleware, and database ORM.',
      difficulty: 'advanced',
      estimatedHours: 10,
      skillsLearned: ['Next.js App Router', 'React Server Components (RSC)', 'Server Actions', 'Dynamic API Routing'],
      prerequisites: ['Next.js App Router', 'SSR/SSG'],
      learningObjectives: ['Structure hybrid Client and Server Component boundaries.', 'Implement Server Actions for secure form mutations.'],
      starterCode: `export default async function StorePage() {\n  return <h1>E-Commerce Store</h1>;\n}`,
      projectInstructionsMarkdown: '### Project Overview\nEngineer a full-stack Next.js web application using modern App Router.',
      milestones: [
        { id: 'rm3', title: 'Milestone 1: Server Component Data Layer', description: 'Fetch product lists directly on the server with zero client JS overhead.', orderIndex: 1 },
        { id: 'rm4', title: 'Milestone 2: Server Actions & Cart State', description: 'Build dynamic cart mutator Server Actions with optimistic updates.', orderIndex: 2 }
      ],
      completionCriteria: 'Pass all Server Component data fetching, routing, and checkout flow tests.',
      pathSlug: 'react'
    }
  ],
  modules: [
    {
      id: 'react-mod-1',
      slug: 'react-fundamentals',
      title: 'Level 1: React Fundamentals & JSX Component Architecture',
      description: 'Understand declarative JSX syntax, component composition, Virtual DOM reconciliation diffing, props, and unidirectional data flow.',
      level: 'foundations',
      orderIndex: 1,
      lessons: [
        {
          id: 'react-les-1',
          slug: 'react-jsx-components',
          title: 'JSX, Virtual DOM & Component Composition',
          description: 'Build your first functional component, understand JSX compilation, and master Virtual DOM reconciliation diffing algorithms.',
          estimatedMinutes: 30,
          orderIndex: 1,
          prerequisites: [],
          concepts: [
            {
              id: 'rc1_1',
              title: 'Learning Objectives & Declarative Rendering',
              contentMarkdown: `### Learning Objectives
- Differentiate between imperative DOM manipulation and React's declarative state-driven model.
- Master JSX compilation mechanics into \`React.createElement\` function calls.
- Understand Virtual DOM diffing (reconciliation) and \`key\` prop heuristics.
- Pass immutable data downward using component \`props\`.

---

### The Declarative UI Paradigm
React introduces a declarative model where user interfaces are rendered as pure functions of application state ($UI = f(State)$). Instead of imperatively querying and updating DOM elements manually, developers define component hierarchies, allowing React to compute Virtual DOM diffs and perform minimal DOM updates.`
            }
          ],
          examples: [
            {
              id: 'rex1_1',
              title: 'Example 1: Functional Component & Props Unpacking',
              code: `interface UserCardProps {
    name: string;
    role: string;
    isVerified?: boolean;
}

export function UserCard({ name, role, isVerified = false }: UserCardProps) {
    return (
        <div className="user-card">
            <h3>{name} {isVerified && '✓'}</h3>
            <p className="role-tag">{role}</p>
        </div>
    );
}`,
              explanation: 'JSX allows embedding JavaScript expressions inside curly braces {} with type safety.'
            }
          ],
          quiz: [
            {
              id: 'rq1_1',
              question: 'Which tool transforms JSX markup into standard React.createElement call expressions during build time?',
              options: ['Babel / SWC / Turbopack', 'Webpack', 'ESLint', 'PostCSS'],
              correctOptionIndex: 0,
              explanation: 'SWC and Babel compile JSX element tags into browser-executable JavaScript function calls.'
            }
          ],
          exercise: {
            id: 'rex-1',
            instructions: 'Write a React functional component rendering `<div>Welcome to React</div>` and match snippet.',
            initialCode: '// Write React component\n',
            solutionCode: 'export function Welcome() { return <div>Welcome to React</div>; }',
            hints: ['Return <div>Welcome to React</div> inside function.'],
            validationType: 'text_match',
            testCases: [{ id: 'rtc1', description: 'Matches Welcome component snippet', expectedOutput: 'export function Welcome() { return <div>Welcome to React</div>; }' }]
          },
          references: [],
          completionCriteria: { requiresConceptsRead: true, requiresQuizPassed: true, requiresExercisePassed: true }
        },
        {
          id: 'react-les-2',
          slug: 'react-state-hooks',
          title: 'State Management with useState & useEffect Hooks',
          description: 'Manage component lifecycle, state persistence, side-effect cleanup, and custom React hooks.',
          estimatedMinutes: 35,
          orderIndex: 2,
          prerequisites: ['react-les-1'],
          concepts: [
            {
              id: 'rc2_1',
              title: 'React Hook Rules & Effect Cleanup',
              contentMarkdown: `### Rules of React Hooks
1. **Call Hooks Only at the Top Level**: Never invoke hooks inside loops, conditional \`if\` statements, or nested functions.
2. **Call Hooks Only from React Functions**: Call hooks strictly inside functional components or custom hooks.

---

### useEffect Synchronization Lifecycle
\`useEffect(setup, dependencies)\` synchronizes components with external side-effects (fetching data, subscribing to browser events). Returning a cleanup function prevents memory leaks when components unmount.`
            }
          ],
          examples: [
            {
              id: 'rex2_1',
              title: 'Example 1: Counter State with useState',
              code: `import { useState } from 'react';

export function Counter() {
    const [count, setCount] = useState(0);

    return (
        <button onClick={() => setCount(prev => prev + 1)}>
            Clicked {count} times
        </button>
    );
}`,
              explanation: 'setCount(prev => prev + 1) uses updater function form to prevent race conditions during rapid state updates.'
            }
          ],
          quiz: [
            {
              id: 'rq2_1',
              question: 'Why should state updaters use functional updates (setCount(prev => prev + 1)) when deriving new state?',
              options: [
                'To guarantee access to the latest state value regardless of batching',
                'Because strings are immutable',
                'To prevent JSX syntax errors',
                'It is required by TypeScript'
              ],
              correctOptionIndex: 0,
              explanation: 'Functional updaters receive the guaranteed latest state value, avoiding stale closure bugs in asynchronous batches.'
            }
          ],
          exercise: {
            id: 'rex-2',
            instructions: 'Write a useState hook snippet `const [count, setCount] = useState(0);` and match text.',
            initialCode: '// useState hook snippet\n',
            solutionCode: 'const [count, setCount] = useState(0);',
            hints: ['Use const [count, setCount] = useState(0);'],
            validationType: 'text_match',
            testCases: [{ id: 'rtc2', description: 'Matches useState hook declaration', expectedOutput: 'const [count, setCount] = useState(0);' }]
          },
          references: [],
          completionCriteria: { requiresConceptsRead: true, requiresQuizPassed: true, requiresExercisePassed: true }
        }
      ]
    },
    {
      id: 'react-mod-2',
      slug: 'nextjs-app-router',
      title: 'Level 2: Next.js App Router & Server Components',
      description: 'Master Next.js file-system routing, React Server Components (RSC), Client Components ("use client"), and server-side data fetching.',
      level: 'intermediate',
      orderIndex: 2,
      lessons: [
        {
          id: 'react-les-3',
          slug: 'nextjs-routing-architecture',
          title: 'Next.js App Router Architecture & File System Routing',
          description: 'Build layouts (layout.tsx), pages (page.tsx), loading boundaries (loading.tsx), and dynamic routes ([slug]/page.tsx).',
          estimatedMinutes: 40,
          orderIndex: 1,
          prerequisites: ['react-les-2'],
          concepts: [
            {
              id: 'rc3_1',
              title: 'App Router Directory Conventions',
              contentMarkdown: `### Next.js App Router Conventions
- **\`page.tsx\`**: Exposes public route endpoints.
- **\`layout.tsx\`**: Wraps child routes while preserving state across page transitions.
- **\`loading.tsx\`**: Automatic React Suspense streaming fallback container.
- **\`error.tsx\`**: React Error Boundary fallback handling runtime exceptions.`
            }
          ],
          examples: [
            {
              id: 'rex3_1',
              title: 'Example 1: Dynamic Route Handler',
              code: `// app/courses/[courseSlug]/page.tsx
interface PageProps {
    params: Promise<{ courseSlug: string }>;
}

export default async function CoursePage({ params }: PageProps) {
    const { courseSlug } = await params;
    return (
        <main>
            <h1>Course Path: {courseSlug}</h1>
        </main>
    );
}`,
              explanation: 'Next.js App Router async Server Component receives params promise in modern Next.js versions.'
            }
          ],
          quiz: [
            {
              id: 'rq3_1',
              question: 'Which file convention in Next.js App Router preserves UI state across child route navigations?',
              options: ['layout.tsx', 'page.tsx', 'template.tsx', 'route.ts'],
              correctOptionIndex: 0,
              explanation: 'layout.tsx wraps child route segments while preserving state and avoiding re-renders upon navigation.'
            }
          ],
          exercise: {
            id: 'rex-3',
            instructions: 'Write Next.js async page snippet `export default async function Page() { return <h1>Next Page</h1>; }` and match text.',
            initialCode: '// Next.js async page\n',
            solutionCode: 'export default async function Page() { return <h1>Next Page</h1>; }',
            hints: ['Write export default async function Page() { return <h1>Next Page</h1>; }'],
            validationType: 'text_match',
            testCases: [{ id: 'rtc3', description: 'Matches Next.js page snippet', expectedOutput: 'export default async function Page() { return <h1>Next Page</h1>; }' }]
          },
          references: [],
          completionCriteria: { requiresConceptsRead: true, requiresQuizPassed: true, requiresExercisePassed: true }
        },
        {
          id: 'react-les-4',
          slug: 'nextjs-server-components-actions',
          title: 'React Server Components (RSC) & Server Actions',
          description: 'Fetch data on the server with zero client bundle overhead, understand the "use client" directive boundary, and mutate data securely via Server Actions.',
          estimatedMinutes: 40,
          orderIndex: 2,
          prerequisites: ['react-les-3'],
          concepts: [
            {
              id: 'rc4_1',
              title: 'Server Components vs Client Components',
              contentMarkdown: `### Server vs Client Boundary
- **Server Components (Default)**: Render exclusively on the server, have direct database/filesystem access, and ship ZERO JavaScript to the client bundle.
- **Client Components (\`'use client'\`)**: Hydrate in the browser to provide interactive event listeners (\`onClick\`) and state hooks (\`useState\`).`
            }
          ],
          examples: [
            {
              id: 'rex4_1',
              title: 'Example 1: Server Action Definition',
              code: `'use server';

import { revalidatePath } from 'next/cache';

export async function updateProgressAction(courseSlug: string, lessonSlug: string) {
    // Perform database mutation securely on server
    console.log(\`Updating progress for \${courseSlug}:\${lessonSlug}\`);
    revalidatePath(\`/paths/\${courseSlug}\`);
    return { success: true };
}`,
              explanation: '\'use server\' directive creates a secure RPC endpoint executable from forms or client components.'
            }
          ],
          quiz: [
            {
              id: 'rq4_1',
              question: 'Which directive must be added at the top of a file to declare Server Action functions?',
              options: ["'use server'", "'use client'", "'use node'", "'use api'"],
              correctOptionIndex: 0,
              explanation: "'use server' marks server-side RPC action functions in Next.js."
            }
          ],
          exercise: {
            id: 'rex-4',
            instructions: 'Write Server Action header directive "\'use server\';" and match text.',
            initialCode: '// Server action directive\n',
            solutionCode: "'use server';",
            hints: ["Use 'use server';"],
            validationType: 'text_match',
            testCases: [{ id: 'rtc4', description: "Matches 'use server'; directive", expectedOutput: "'use server';" }]
          },
          references: [],
          completionCriteria: { requiresConceptsRead: true, requiresQuizPassed: true, requiresExercisePassed: true }
        }
      ]
    },
    {
      id: 'react-mod-3',
      slug: 'react-advanced-architecture',
      title: 'Level 3: Full-Stack Architecture & Performance',
      description: 'Architect production React applications with Context state management, dynamic code splitting (next/dynamic), and web deployment optimizations.',
      level: 'advanced',
      orderIndex: 3,
      lessons: [
        {
          id: 'react-les-5',
          slug: 'react-context-state',
          title: 'Global State Management with React Context API',
          description: 'Share global state across component trees using createContext, useContext, and Provider patterns without prop drilling.',
          estimatedMinutes: 35,
          orderIndex: 1,
          prerequisites: ['react-les-4'],
          concepts: [
            {
              id: 'rc5_1',
              title: 'React Context Architecture',
              contentMarkdown: `### Context API & Prop Drilling
When multiple nested components require access to shared state (such as user authentication or theme preferences), passing props through intermediate components causes **Prop Drilling**. React Context provides global state provider injection.`
            }
          ],
          examples: [
            {
              id: 'rex5_1',
              title: 'Example 1: Custom Theme Context Provider',
              code: `import { createContext, useContext, useState } from 'react';

const ThemeContext = createContext({ theme: 'dark', toggleTheme: () => {} });

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setTheme] = useState('dark');
    const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark');

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export const useTheme = () => useContext(ThemeContext);`,
              explanation: 'Custom hook useTheme encapsulates useContext(ThemeContext) with full TypeScript auto-completion.'
            }
          ],
          quiz: [
            {
              id: 'rq5_1',
              question: 'Which React hook consumes values provided by a matching Context Provider higher in the tree?',
              options: ['useContext', 'useProvider', 'useGlobal', 'useState'],
              correctOptionIndex: 0,
              explanation: 'useContext subscribes to React Context value changes.'
            }
          ],
          exercise: {
            id: 'rex-5',
            instructions: 'Write custom hook export `export const useAuth = () => useContext(AuthContext);` and match text.',
            initialCode: '// Custom hook snippet\n',
            solutionCode: 'export const useAuth = () => useContext(AuthContext);',
            hints: ['Use export const useAuth = () => useContext(AuthContext);'],
            validationType: 'text_match',
            testCases: [{ id: 'rtc5', description: 'Matches custom hook snippet', expectedOutput: 'export const useAuth = () => useContext(AuthContext);' }]
          },
          references: [],
          completionCriteria: { requiresConceptsRead: true, requiresQuizPassed: true, requiresExercisePassed: true }
        },
        {
          id: 'react-les-6',
          slug: 'react-performance-deployment',
          title: 'React Performance Optimization & Bundle Splitting',
          description: 'Optimize rendering using React.memo, useMemo, useCallback, dynamic code splitting with next/dynamic, and production build auditing.',
          estimatedMinutes: 40,
          orderIndex: 2,
          prerequisites: ['react-les-5'],
          concepts: [
            {
              id: 'rc6_1',
              title: 'Memoization & Lazy Loading',
              contentMarkdown: `### React Performance Tools
- **\`useMemo\`**: Caches expensive computation results between re-renders.
- **\`useCallback\`**: Caches function references between re-renders.
- **\`next/dynamic\`**: Lazy-loads non-critical client components dynamically.`
            }
          ],
          examples: [
            {
              id: 'rex6_1',
              title: 'Example 1: Dynamic Component Import',
              code: `import dynamic from 'next/dynamic';

const MonacoEditor = dynamic(
    () => import('@monaco-editor/react').then(mod => mod.default),
    { ssr: false, loading: () => <p>Loading Editor...</p> }
);`,
              explanation: 'dynamic loading with ssr: false prevents heavy Monaco editor JS from bundling into initial page HTML.'
            }
          ],
          quiz: [
            {
              id: 'rq6_1',
              question: 'Which Next.js feature enables lazy loading heavy client components on demand with SSR disabled?',
              options: ['next/dynamic', 'React.memo', 'useMemo', 'next/image'],
              correctOptionIndex: 0,
              explanation: 'next/dynamic performs code splitting and lazy loading of client components.'
            }
          ],
          exercise: {
            id: 'rex-6',
            instructions: 'Write dynamic import snippet `const HeavyComponent = dynamic(() => import("./Heavy"));` and match text.',
            initialCode: '// Dynamic import snippet\n',
            solutionCode: 'const HeavyComponent = dynamic(() => import("./Heavy"));',
            hints: ['Use const HeavyComponent = dynamic(() => import("./Heavy"));'],
            validationType: 'text_match',
            testCases: [{ id: 'rtc6', description: 'Matches dynamic import snippet', expectedOutput: 'const HeavyComponent = dynamic(() => import("./Heavy"));' }]
          },
          references: [],
          completionCriteria: { requiresConceptsRead: true, requiresQuizPassed: true, requiresExercisePassed: true }
        }
      ]
    }
  ]
};

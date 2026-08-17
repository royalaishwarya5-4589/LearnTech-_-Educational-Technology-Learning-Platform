import { Path } from '@/types/content';
import { COURSE_CERTIFICATION_POLICIES } from '../certification-policies';

export const dsaPath: Path = {
  id: 'dsa-mastery',
  slug: 'dsa',
  title: 'Data Structures & Algorithms',
  subtitle: 'Master asymptotic Big-O runtime analysis, tree/graph algorithms, dynamic programming, and interview problem-solving.',
  description: 'Master computer science algorithmic fundamentals: Big-O analysis, dynamic arrays, linked lists, stacks, queues, hash tables, binary trees, graphs, sorting, searching, greedy algorithms, and dynamic programming.',
  icon: '⚡',
  category: 'cs',
  categoryLabel: 'Computer Science',
  isActive: true,
  status: 'active',
  courseType: 'coding',
  difficulty: 'advanced',
  estimatedHours: 60,
  totalLessons: 7,
  totalProjects: 2,
  certificationRequirement: COURSE_CERTIFICATION_POLICIES['dsa'],
  projects: [
    {
      id: 'dsa-proj-1',
      slug: 'dsa-custom-collections-library',
      title: 'Custom High-Performance Data Structure Suite',
      subtitle: 'Build a standalone data structures library in code featuring dynamic arrays, Doubly LinkedLists, and HashMaps.',
      description: 'Implement foundational data structures from scratch: Resizable Dynamic Array, Doubly Linked List with sentinel nodes, and Hash Map handling bucket collision resolution.',
      difficulty: 'intermediate',
      estimatedHours: 6,
      skillsLearned: ['Data Structure Design', 'Doubly Linked Lists', 'Hash Table Collision Resolution', 'Memory Allocation'],
      prerequisites: ['Arrays, Lists, Stacks & Queues'],
      learningObjectives: ['Implement bucket hashing with separate chaining.', 'Manage pointer references in doubly linked nodes.'],
      starterCode: `class CustomHashMap {\n    constructor(capacity = 16) {\n        this.buckets = new Array(capacity);\n    }\n}`,
      projectInstructionsMarkdown: '### Project Overview\nEngineer a custom data structures collection library from scratch.',
      milestones: [
        { id: 'dsam1', title: 'Milestone 1: Doubly LinkedList Implementation', description: 'Implement push, pop, append, and remove node operations.', orderIndex: 1 },
        { id: 'dsam2', title: 'Milestone 2: Chained Hash Map Implementation', description: 'Implement hash function, put, get, and remove key operations.', orderIndex: 2 }
      ],
      completionCriteria: 'Pass all O(1) hash map operations, node traversal, and memory cleanup tests.',
      pathSlug: 'dsa'
    },
    {
      id: 'dsa-proj-2',
      slug: 'dsa-graph-route-optimization-engine',
      title: 'Dijkstra & A* Graph Route Optimization Engine',
      subtitle: 'Build a shortest-path graph navigation engine resolving multi-city routes with Min-Heaps and A* search heuristics.',
      description: 'Architect a graph search algorithm engine implementing Dijkstra Shortest Path and A* heuristic navigation using Priority Queues and adjacency graphs.',
      difficulty: 'advanced',
      estimatedHours: 8,
      skillsLearned: ['Graph Algorithms', 'Dijkstra Shortest Path', 'A* Search Heuristic', 'Binary Min-Heap Priority Queue'],
      prerequisites: ['Graph BFS/DFS & Heaps'],
      learningObjectives: ['Build adjacency list graph representations.', 'Implement priority queue min-heaps for optimal vertex relaxation.'],
      starterCode: `function dijkstra(graph, startNode, endNode) {\n    // Graph algorithm implementation\n}`,
      projectInstructionsMarkdown: '### Project Overview\nEngineer a graph route optimization algorithm engine using Dijkstra and A* search.',
      milestones: [
        { id: 'dsam3', title: 'Milestone 1: Binary Min-Heap Priority Queue', description: 'Implement min-heap sift-up and sift-down operations.', orderIndex: 1 },
        { id: 'dsam4', title: 'Milestone 2: Dijkstra & A* Algorithm Implementation', description: 'Compute shortest path distance across weighted graph edges.', orderIndex: 2 }
      ],
      completionCriteria: 'Verify optimal shortest-path distance calculations and priority queue performance.',
      pathSlug: 'dsa'
    }
  ],
  modules: [
    {
      id: 'dsa-mod-1',
      slug: 'dsa-complexity-linear',
      title: 'Level 1: Algorithmic Complexity & Linear Data Structures',
      description: 'Master Big-O space/time asymptotic analysis, arrays, strings, two-pointer techniques, linked lists, stacks, and queues.',
      level: 'foundations',
      orderIndex: 1,
      lessons: [
        {
          id: 'dsa-les-1',
          slug: 'dsa-big-o-complexity',
          title: 'Asymptotic Big-O Analysis & Space Complexity',
          description: 'Analyze O(1), O(log N), O(N), O(N log N), and O(N^2) asymptotic runtime and auxiliary memory growth curves.',
          estimatedMinutes: 30,
          orderIndex: 1,
          prerequisites: [],
          concepts: [
            {
              id: 'dsac1_1',
              title: 'Learning Objectives & Asymptotic Notation',
              contentMarkdown: `### Learning Objectives
- Define Big-O ($\mathcal{O}$), Big-Omega ($\Omega$), and Big-Theta ($\Theta$) asymptotic bounds.
- Classify algorithm runtime growth curves ($O(1) < O(\log N) < O(N) < O(N \log N) < O(N^2) < O(2^N)$).
- Calculate auxiliary Space Complexity beyond input storage allocations.
- Eliminate lower-order non-dominant terms during asymptotic simplification.

---

### Big-O Notation Fundamentals
**Big-O Notation** measures how an algorithm's execution time or memory allocation grows relative to input size $N$ as $N$ approaches infinity.`
            }
          ],
          examples: [
            {
              id: 'dsaex1_1',
              title: 'Example 1: Time Complexity Comparison',
              code: `// O(1) Constant Time
function getFirstElement(arr) {
    return arr[0];
}

// O(N) Linear Time
function findMax(arr) {
    let maxVal = arr[0];
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] > maxVal) maxVal = arr[i];
    }
    return maxVal;
}

// O(N^2) Quadratic Time
function printAllPairs(arr) {
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length; j++) {
            console.log(arr[i], arr[j]);
        }
    }
}`,
              explanation: 'Direct array index lookups take constant O(1) time. Nested loops scanning all pairs take quadratic O(N^2) time.'
            }
          ],
          quiz: [
            {
              id: 'dsaq1_1',
              question: 'What is the worst-case time complexity of accessing an array element directly by index?',
              options: ['O(1)', 'O(N)', 'O(log N)', 'O(N^2)'],
              correctOptionIndex: 0,
              explanation: 'Array contiguous memory allocation allows instant index pointer offset calculations in O(1) time.'
            }
          ],
          exercise: {
            id: 'dsaex-1',
            instructions: 'Write a function snippet returning max element in linear O(N) time and match output statement.',
            initialCode: '// Write O(N) snippet\n',
            solutionCode: 'console.log("Max Found in O(N)");',
            hints: ['console.log("Max Found in O(N)");'],
            validationType: 'stdout',
            testCases: [{ id: 'dsatc1', description: 'Outputs Max Found text', expectedOutput: 'Max Found in O(N)' }]
          },
          references: [],
          completionCriteria: { requiresConceptsRead: true, requiresQuizPassed: true, requiresExercisePassed: true }
        },
        {
          id: 'dsa-les-2',
          slug: 'dsa-linked-lists-stacks-queues',
          title: 'Linked Lists, Stacks, Queues & Two-Pointer Patterns',
          description: 'Construct Singly/Doubly Linked Lists, Stacks (LIFO), Queues (FIFO), and solve array problems using Two-Pointers & Sliding Window.',
          estimatedMinutes: 35,
          orderIndex: 2,
          prerequisites: ['dsa-les-1'],
          concepts: [
            {
              id: 'dsac2_1',
              title: 'Linear Data Structure Architectures',
              contentMarkdown: `### Data Structure Tradeoffs
- **Singly Linked List**: Pointer nodes holding \`value\` and \`next\`. $O(1)$ insertion at head, $O(N)$ random lookup access.
- **Stack (LIFO)**: Last-In, First-Out collection supporting $O(1)$ \`push()\` and \`pop()\`.
- **Queue (FIFO)**: First-In, First-Out collection supporting $O(1)$ \`enqueue()\` and \`dequeue()\`.`
            }
          ],
          examples: [
            {
              id: 'dsaex2_1',
              title: 'Example 1: Linked List Node & Inversion',
              code: `class ListNode {
    constructor(val, next = null) {
        this.val = val;
        this.next = next;
    }
}

function reverseLinkedList(head) {
    let prev = null;
    let curr = head;

    while (curr !== null) {
        let nextTemp = curr.next;
        curr.next = prev;
        prev = curr;
        curr = nextTemp;
    }
    return prev;
}`,
              explanation: 'Inverts pointer directions in-place using three pointers (prev, curr, nextTemp) in O(N) time and O(1) space.'
            }
          ],
          quiz: [
            {
              id: 'dsaq2_1',
              question: 'Which linear data structure operates strictly on a Last-In, First-Out (LIFO) protocol?',
              options: ['Stack', 'Queue', 'Array', 'Linked List'],
              correctOptionIndex: 0,
              explanation: 'Stacks push and pop elements from the top according to LIFO ordering.'
            }
          ],
          exercise: {
            id: 'dsaex-2',
            instructions: 'Write a snippet outputting `"LinkedList Reversed in O(N)"` to standard console.log.',
            initialCode: '// Output reversed text\n',
            solutionCode: 'console.log("LinkedList Reversed in O(N)");',
            hints: ['console.log("LinkedList Reversed in O(N)");'],
            validationType: 'stdout',
            testCases: [{ id: 'dsatc2', description: 'Outputs LinkedList Reversed', expectedOutput: 'LinkedList Reversed in O(N)' }]
          },
          references: [],
          completionCriteria: { requiresConceptsRead: true, requiresQuizPassed: true, requiresExercisePassed: true }
        }
      ]
    },
    {
      id: 'dsa-mod-2',
      slug: 'dsa-trees-graphs',
      title: 'Level 2: Trees, Graphs & Searching Algorithms',
      description: 'Master Binary Search Trees (BST), Tree Traversals (In-order, Pre-order, Post-order), Graph Traversals (BFS, DFS), and Binary Search.',
      level: 'intermediate',
      orderIndex: 2,
      lessons: [
        {
          id: 'dsa-les-3',
          slug: 'dsa-binary-search-trees',
          title: 'Binary Search Trees (BST) & Tree Traversals',
          description: 'Insert, search, and delete BST nodes in O(log N) average time, and master In-order, Pre-order, and Post-order Depth-First Search traversals.',
          estimatedMinutes: 35,
          orderIndex: 1,
          prerequisites: ['dsa-les-2'],
          concepts: [
            {
              id: 'dsac3_1',
              title: 'Binary Search Tree Invariants',
              contentMarkdown: `### BST Invariants
A Binary Search Tree is a hierarchical node structure where for every node:
- All values in its **left subtree** are strictly LESS than the node's value.
- All values in its **right subtree** are strictly GREATER than the node's value.`
            }
          ],
          examples: [
            {
              id: 'dsaex3_1',
              title: 'Example 1: In-Order BST Traversal (Sorted Output)',
              code: `class TreeNode {
    constructor(val, left = null, right = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

function inOrderTraversal(root, result = []) {
    if (!root) return result;
    inOrderTraversal(root.left, result);
    result.push(root.val);
    inOrderTraversal(root.right, result);
    return result;
}`,
              explanation: 'In-order traversal (Left -> Node -> Right) prints BST node values in strictly sorted ascending order.'
            }
          ],
          quiz: [
            {
              id: 'dsaq3_1',
              question: 'Which tree traversal order visits a Binary Search Tree such that elements are processed in strictly ascending order?',
              options: ['In-Order Traversal', 'Pre-Order Traversal', 'Post-Order Traversal', 'Level-Order Traversal'],
              correctOptionIndex: 0,
              explanation: 'In-order traversal visits left subtree, current node, then right subtree, producing sorted output for BSTs.'
            }
          ],
          exercise: {
            id: 'dsaex-3',
            instructions: 'Write a snippet outputting `"BST Search O(log N)"` to standard stdout.',
            initialCode: '// Output search status\n',
            solutionCode: 'console.log("BST Search O(log N)");',
            hints: ['console.log("BST Search O(log N)");'],
            validationType: 'stdout',
            testCases: [{ id: 'dsatc3', description: 'Outputs BST Search status', expectedOutput: 'BST Search O(log N)' }]
          },
          references: [],
          completionCriteria: { requiresConceptsRead: true, requiresQuizPassed: true, requiresExercisePassed: true }
        },
        {
          id: 'dsa-les-4',
          slug: 'dsa-graph-bfs-dfs',
          title: 'Graph Traversals: Breadth-First Search (BFS) & Depth-First Search (DFS)',
          description: 'Represent graphs using Adjacency Lists, search shortest paths using BFS queue traversal, and explore component paths using DFS recursion stack.',
          estimatedMinutes: 40,
          orderIndex: 2,
          prerequisites: ['dsa-les-3'],
          concepts: [
            {
              id: 'dsac4_1',
              title: 'Graph Search Mechanics',
              contentMarkdown: `### BFS vs DFS Algorithms
- **Breadth-First Search (BFS)**: Level-by-level queue traversal. Guarantees finding the **shortest path** in unweighted graphs. Time: $O(V + E)$.
- **Depth-First Search (DFS)**: Deep branch exploration using recursive call stack or explicit stack. Ideal for topological sort and cycle detection.`
            }
          ],
          examples: [
            {
              id: 'dsaex4_1',
              title: 'Example 1: Graph BFS Queue Traversal',
              code: `function bfsShortestPath(graph, startNode) {
    const visited = new Set([startNode]);
    const queue = [startNode];

    while (queue.length > 0) {
        const vertex = queue.shift();
        console.log('Visited Vertex:', vertex);

        for (const neighbor of graph[vertex] || []) {
            if (!visited.has(neighbor)) {
                visited.add(neighbor);
                queue.push(neighbor);
            }
        }
    }
}`,
              explanation: 'Uses queue shift() and push() with visited set tracking to visit unweighted graph nodes in shortest distance order.'
            }
          ],
          quiz: [
            {
              id: 'dsaq4_1',
              question: 'Which graph traversal algorithm uses a Queue data structure to guarantee finding shortest paths in unweighted graphs?',
              options: ['Breadth-First Search (BFS)', 'Depth-First Search (DFS)', 'Dijkstra Algorithm', 'Prim Algorithm'],
              correctOptionIndex: 0,
              explanation: 'BFS visits graph nodes level-by-level using a FIFO queue, guaranteeing shortest unweighted path discovery.'
            }
          ],
          exercise: {
            id: 'dsaex-4',
            instructions: 'Write a snippet outputting `"BFS Visited: Node A"` to standard console.log.',
            initialCode: '// BFS output snippet\n',
            solutionCode: 'console.log("BFS Visited: Node A");',
            hints: ['console.log("BFS Visited: Node A");'],
            validationType: 'stdout',
            testCases: [{ id: 'dsatc4', description: 'Outputs BFS Visited text', expectedOutput: 'BFS Visited: Node A' }]
          },
          references: [],
          completionCriteria: { requiresConceptsRead: true, requiresQuizPassed: true, requiresExercisePassed: true }
        }
      ]
    },
    {
      id: 'dsa-mod-3',
      slug: 'dsa-advanced-dp-sorting',
      title: 'Level 3: Sorting, Heaps & Dynamic Programming',
      description: 'Master QuickSort/MergeSort, Binary Heap Priority Queues, Dijkstra Shortest Path, and Dynamic Programming (Overlapping Subproblems & Memoization).',
      level: 'advanced',
      orderIndex: 3,
      lessons: [
        {
          id: 'dsa-les-5',
          slug: 'dsa-sorting-heaps',
          title: 'Sorting Algorithms (MergeSort, QuickSort) & Binary Heaps',
          description: 'Compare O(N log N) sorting algorithms (MergeSort, QuickSort), and build Binary Min-Heap Priority Queues supporting O(log N) insertion/extraction.',
          estimatedMinutes: 40,
          orderIndex: 1,
          prerequisites: ['dsa-les-4'],
          concepts: [
            {
              id: 'dsac5_1',
              title: 'Sorting Complexity & Heap Structures',
              contentMarkdown: `### Sorting & Priority Queues
- **MergeSort**: Divide-and-conquer algorithm guaranteeing $O(N \log N)$ worst-case runtime using $O(N)$ auxiliary space.
- **QuickSort**: In-place partitioning algorithm with $O(N \log N)$ average runtime.
- **Binary Min-Heap**: Complete binary tree satisfying the heap property (parent node $\le$ child nodes), allowing $O(1)$ min lookup and $O(\log N)$ extraction.`
            }
          ],
          examples: [
            {
              id: 'dsaex5_1',
              title: 'Example 1: MergeSort Implementation',
              code: `function mergeSort(arr) {
    if (arr.length <= 1) return arr;

    const mid = Math.floor(arr.length / 2);
    const left = mergeSort(arr.slice(0, mid));
    const right = mergeSort(arr.slice(mid));

    return merge(left, right);
}

function merge(left, right) {
    const result = [];
    let i = 0, j = 0;
    while (i < left.length && j < right.length) {
        if (left[i] <= right[j]) result.push(left[i++]);
        else result.push(right[j++]);
    }
    return result.concat(left.slice(i)).concat(right.slice(j));
}`,
              explanation: 'MergeSort recursively divides arrays into halves and merges sorted sub-arrays in O(N log N) time.'
            }
          ],
          quiz: [
            {
              id: 'dsaq5_1',
              question: 'What is the guaranteed worst-case time complexity of MergeSort?',
              options: ['O(N log N)', 'O(N^2)', 'O(N)', 'O(log N)'],
              correctOptionIndex: 0,
              explanation: 'MergeSort guarantees O(N log N) time complexity across all input array distributions.'
            }
          ],
          exercise: {
            id: 'dsaex-5',
            instructions: 'Write a snippet outputting `"MergeSort Executed: O(N log N)"` to standard console.log.',
            initialCode: '// MergeSort status snippet\n',
            solutionCode: 'console.log("MergeSort Executed: O(N log N)");',
            hints: ['console.log("MergeSort Executed: O(N log N)");'],
            validationType: 'stdout',
            testCases: [{ id: 'dsatc5', description: 'Outputs MergeSort status', expectedOutput: 'MergeSort Executed: O(N log N)' }]
          },
          references: [],
          completionCriteria: { requiresConceptsRead: true, requiresQuizPassed: true, requiresExercisePassed: true }
        },
        {
          id: 'dsa-les-6',
          slug: 'dsa-dynamic-programming',
          title: 'Dynamic Programming: Memoization vs Tabulation',
          description: 'Solve complex optimization problems by identifying Overlapping Subproblems and Optimal Substructure using Top-Down Memoization and Bottom-Up Tabulation.',
          estimatedMinutes: 45,
          orderIndex: 2,
          prerequisites: ['dsa-les-5'],
          concepts: [
            {
              id: 'dsac6_1',
              title: 'Dynamic Programming Paradigms',
              contentMarkdown: `### Dynamic Programming Principles
Dynamic Programming (DP) optimizes recursive exponential algorithms ($O(2^N)$) down to polynomial time ($O(N)$ or $O(N \cdot W)$) by storing intermediate subproblem solutions:
1. **Top-Down (Memoization)**: Recursive call tree storing cached results in a lookup table or hash map.
2. **Bottom-Up (Tabulation)**: Iterative DP table population building solutions from base cases upward.`
            }
          ],
          examples: [
            {
              id: 'dsaex6_1',
              title: 'Example 1: Fibonacci Tabulation O(N) Time / O(1) Space',
              code: `function fibonacciTabulation(n) {
    if (n <= 1) return n;
    let prev2 = 0, prev1 = 1;

    for (let i = 2; i <= n; i++) {
        let curr = prev1 + prev2;
        prev2 = prev1;
        prev1 = curr;
    }
    return prev1;
}

console.log('Fibonacci(10):', fibonacciTabulation(10));`,
              explanation: 'Optimizes exponential recursive Fibonacci O(2^N) to O(N) time and O(1) memory space.'
            }
          ],
          quiz: [
            {
              id: 'dsaq6_1',
              question: 'Which two core properties must a problem possess to be solvable via Dynamic Programming?',
              options: [
                'Optimal Substructure and Overlapping Subproblems',
                'Linear Sorting and Hash Tables',
                'Binary Trees and Heap Queues',
                'Constant Space and Graph Edges'
              ],
              correctOptionIndex: 0,
              explanation: 'DP applies when optimal subproblem solutions combine into global solutions and subproblems repeat recursively.'
            }
          ],
          exercise: {
            id: 'dsaex-6',
            instructions: 'Write a snippet outputting `"Fibonacci(10): 55"` to standard console.log.',
            initialCode: '// DP snippet\n',
            solutionCode: 'console.log("Fibonacci(10): 55");',
            hints: ['console.log("Fibonacci(10): 55");'],
            validationType: 'stdout',
            testCases: [{ id: 'dsatc6', description: 'Outputs Fibonacci 55', expectedOutput: 'Fibonacci(10): 55' }]
          },
          references: [],
          completionCriteria: { requiresConceptsRead: true, requiresQuizPassed: true, requiresExercisePassed: true }
        },
        {
          id: 'dsa-les-7',
          slug: 'dsa-interview-strategies',
          title: 'Technical Interview Algorithmic Problem-Solving Framework',
          description: 'Apply the 5-step engineering problem-solving framework: Clarify Invariants -> Trace Examples -> State Brute-Force -> Optimize with Patterns -> Write Clean Code.',
          estimatedMinutes: 45,
          orderIndex: 3,
          prerequisites: ['dsa-les-6'],
          concepts: [
            {
              id: 'dsac7_1',
              title: 'Technical Coding Interview Framework',
              contentMarkdown: `### 5-Step Interview Strategy
1. **Clarify Inputs & Boundaries**: Ask about empty arrays, negative numbers, space constraints, and integer overflow.
2. **Work Out Concrete Examples**: Walk through sample inputs manually on whiteboard/editor.
3. **Propose Brute-Force Baseline**: State time/space bounds of simple approach first.
4. **Identify Pattern for Optimization**: Apply Sliding Window, Two Pointers, Hash Table, or Binary Search.
5. **Implement & Dry-Run Test Cases**: Write clean code and test edge cases step-by-step.`
            }
          ],
          examples: [
            {
              id: 'dsaex7_1',
              title: 'Example 1: Two-Sum Hash Map Optimization (O(N) Time)',
              code: `function twoSum(nums, target) {
    const map = new Map();
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        if (map.has(complement)) {
            return [map.get(complement), i];
        }
        map.set(nums[i], i);
    }
    return [];
}`,
              explanation: 'Uses Hash Map complement lookup to optimize brute-force nested loop O(N^2) time to O(N) linear time.'
            }
          ],
          quiz: [
            {
              id: 'dsaq7_1',
              question: 'Which pattern optimizes Two-Sum array lookup from nested loop O(N^2) down to O(N) linear time?',
              options: ['Hash Map Complement Lookup', 'Sorting and Selection Sort', 'Depth-First Search', 'Matrix Exponentiation'],
              correctOptionIndex: 0,
              explanation: 'Storing seen numbers in a Hash Map allows complement key lookups in O(1) time per element.'
            }
          ],
          exercise: {
            id: 'dsaex-7',
            instructions: 'Write a snippet outputting `"TwoSum Optimized O(N)"` to standard console.log.',
            initialCode: '// Interview snippet\n',
            solutionCode: 'console.log("TwoSum Optimized O(N)");',
            hints: ['console.log("TwoSum Optimized O(N)");'],
            validationType: 'stdout',
            testCases: [{ id: 'dsatc7', description: 'Outputs TwoSum Optimized', expectedOutput: 'TwoSum Optimized O(N)' }]
          },
          references: [],
          completionCriteria: { requiresConceptsRead: true, requiresQuizPassed: true, requiresExercisePassed: true }
        }
      ]
    }
  ]
};

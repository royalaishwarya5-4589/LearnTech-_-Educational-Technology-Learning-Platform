import { Path } from '@/types/content';
import { COURSE_CERTIFICATION_POLICIES } from '../certification-policies';

export const gitGithubPath: Path = {
  id: 'git-github-mastery',
  slug: 'git-github',
  title: 'Git & GitHub Collaboration Mastery',
  subtitle: 'Master distributed version control, interactive rebasing, branch workflows, pull requests, and GitHub Actions CI/CD.',
  description: 'Master Git distributed version control: staging area, commits, branching, merge conflict resolution, interactive rebasing, cherry-picking, reflog recovery, GitHub Pull Requests, code reviews, and GitHub Actions automation pipelines.',
  icon: '🐙',
  category: 'cs',
  categoryLabel: 'Developer Tools',
  isActive: true,
  status: 'active',
  courseType: 'coding',
  difficulty: 'intermediate',
  estimatedHours: 35,
  totalLessons: 6,
  totalProjects: 2,
  certificationRequirement: COURSE_CERTIFICATION_POLICIES['git-github'],
  projects: [
    {
      id: 'git-proj-1',
      slug: 'git-collaborative-feature-workflow',
      title: 'Git Collaborative Feature Branch & Conflict Resolution',
      subtitle: 'Simulate a real-world multi-developer feature workflow resolving complex Git merge conflicts and squashing commits.',
      description: 'Execute a collaborative feature development simulation incorporating feature branching, commit squashing via interactive rebase (`git rebase -i`), resolving merge conflicts, and preparing clean pull requests.',
      difficulty: 'intermediate',
      estimatedHours: 5,
      skillsLearned: ['Git Feature Branching', 'Interactive Rebase Squashing', 'Merge Conflict Resolution', 'Git Reflog Recovery'],
      prerequisites: ['Git CLI & Branching'],
      learningObjectives: ['Resolve multi-file Git merge conflict markers.', 'Squash dirty commit histories into clean logical feature commits.'],
      starterCode: `git checkout -b feature/auth-flow\n# Execute Git workflow steps`,
      projectInstructionsMarkdown: '### Project Overview\nSimulate collaborative Git branching workflows and resolve merge conflict scenarios.',
      milestones: [
        { id: 'gitm1', title: 'Milestone 1: Feature Branching & Rebase Squashing', description: 'Create feature branch and squash commits with interactive rebase.', orderIndex: 1 },
        { id: 'gitm2', title: 'Milestone 2: Merge Conflict Resolution', description: 'Resolve conflicting branch markers and complete clean merge to main.', orderIndex: 2 }
      ],
      completionCriteria: 'Pass commit history linear structure checks and conflict resolution verification.',
      pathSlug: 'git-github'
    },
    {
      id: 'git-proj-2',
      slug: 'github-actions-ci-cd-pipeline-automation',
      title: 'GitHub Actions Automated CI/CD Pipeline',
      subtitle: 'Build a production GitHub Actions workflow file automating linting, testing, Docker builds, and deployment release tags.',
      description: 'Engineer an end-to-end GitHub Actions workflow YAML script automating code quality linting, unit test execution, matrix node testing, and release tagging.',
      difficulty: 'advanced',
      estimatedHours: 6,
      skillsLearned: ['GitHub Actions YAML', 'CI/CD Automated Testing', 'Matrix Build Strategies', 'Release Tag Automation'],
      prerequisites: ['GitHub Actions & CI/CD'],
      learningObjectives: ['Define reusable GitHub Actions workflow steps.', 'Configure pull request status check requirements.'],
      starterCode: `name: CI/CD Pipeline\non:\n  push:\n    branches: [ main ]\njobs:\n  build:\n    runs-on: ubuntu-latest`,
      projectInstructionsMarkdown: '### Project Overview\nEngineer an enterprise GitHub Actions CI/CD automation workflow.',
      milestones: [
        { id: 'gitm3', title: 'Milestone 1: Automated Test & Lint Jobs', description: 'Define parallel jobs for ESLint, TypeScript, and test suite execution.', orderIndex: 1 },
        { id: 'gitm4', title: 'Milestone 2: Production Artifact & Release Pipeline', description: 'Configure automated release artifact tagging upon main branch merge.', orderIndex: 2 }
      ],
      completionCriteria: 'Verify GitHub Actions workflow syntax, job step dependencies, and automated test execution.',
      pathSlug: 'git-github'
    }
  ],
  modules: [
    {
      id: 'git-mod-1',
      slug: 'git-foundations',
      title: 'Level 1: Distributed Version Control & Git Mechanics',
      description: 'Understand the three states of Git (Working Directory, Staging Index, Local Repository), commit SHA-1 hashes, and basic branching.',
      level: 'foundations',
      orderIndex: 1,
      lessons: [
        {
          id: 'git-les-1',
          slug: 'git-cli-foundations-staging',
          title: 'Git Architecture, Staging Area & Atomic Commits',
          description: 'Initialize Git repositories, understand Working Tree vs Staging Index vs Commit HEAD, and write atomic commit messages.',
          estimatedMinutes: 30,
          orderIndex: 1,
          prerequisites: [],
          concepts: [
            {
              id: 'gitc1_1',
              title: 'Learning Objectives & The Three States of Git',
              contentMarkdown: `### Learning Objectives
- Differentiate between Centralized (SVN) and Distributed (Git) Version Control Systems.
- Navigate the three states of Git: Working Tree, Staging Index, and Commit HEAD.
- Inspect project history and file diffs using \`git log\` and \`git diff\`.
- Write atomic Conventional Commit messages (\`feat:\`, \`fix:\`, \`docs:\`).

---

### The Three Local States of Git
Git tracks files through three local areas:
1. **Working Directory**: Modified files on disk not yet staged.
2. **Staging Area (Index)**: Proposed commit snapshot formatted via \`git add\`.
3. **Local Repository (\`.git\` directory)**: Permanent immutable snapshot commits stored as directed acyclic graph (DAG) objects.`
            }
          ],
          examples: [
            {
              id: 'gitex1_1',
              title: 'Example 1: Basic Staging & Atomic Commit',
              code: `# Stage specific modified files
git add src/server.ts package.json

# Record atomic commit snapshot
git commit -m "feat(auth): add JWT login endpoint handler"

# Inspect commit log graph
git log --oneline --graph`,
              explanation: 'git add selectively stages files before git commit records a SHA-1 snapshot hash in repository history.'
            }
          ],
          quiz: [
            {
              id: 'gitq1_1',
              question: 'Which local Git area holds modified file snapshots prepared for the next upcoming commit?',
              options: ['Staging Index Area', 'Working Directory', 'Remote Repository', 'Stash Container'],
              correctOptionIndex: 0,
              explanation: 'The Staging Index Area buffers file snapshots formatted by git add prior to committing.'
            }
          ],
          exercise: {
            id: 'gitex-1',
            instructions: 'Write git commit command `git commit -m "feat: initial commit"` and match text.',
            initialCode: '# Git commit command\n',
            solutionCode: 'git commit -m "feat: initial commit"',
            hints: ['Use git commit -m "feat: initial commit"'],
            validationType: 'text_match',
            testCases: [{ id: 'gittc1', description: 'Matches git commit command', expectedOutput: 'git commit -m "feat: initial commit"' }]
          },
          references: [],
          completionCriteria: { requiresConceptsRead: true, requiresQuizPassed: true, requiresExercisePassed: true }
        },
        {
          id: 'git-les-2',
          slug: 'git-branching-merging',
          title: 'Git Branching, Fast-Forward & Merge Conflict Resolution',
          description: 'Create feature branches, perform Fast-Forward and 3-Way merges, and resolve inline conflict markers cleanly.',
          estimatedMinutes: 35,
          orderIndex: 2,
          prerequisites: ['git-les-1'],
          concepts: [
            {
              id: 'gitc2_1',
              title: 'Branch Pointers & Conflict Resolution',
              contentMarkdown: `### Git Branching Mechanics
In Git, a branch is simply a 41-byte light reference pointer to a commit hash. When merging branches:
- **Fast-Forward Merge**: Target branch has no divergent commits; main pointer simply moves forward.
- **3-Way Merge**: Divergent commits exist; Git creates a new merge commit combining changes.`
            }
          ],
          examples: [
            {
              id: 'gitex2_1',
              title: 'Example 1: Resolving Conflict Markers',
              code: `<<<<<<< HEAD
const API_URL = "https://api.v1.production.com";
=======
const API_URL = "https://api.v2.production.com";
>>>>>>> feature/v2-api

// RESOLVED OUTPUT:
const API_URL = "https://api.v2.production.com";`,
              explanation: 'Edit file to remove conflict markers (<<<<<<<, =======, >>>>>>>) and stage resolved file via git add.'
            }
          ],
          quiz: [
            {
              id: 'gitq2_1',
              question: 'What is a Git branch under the hood inside the .git directory structure?',
              options: ['A lightweight text file containing a 40-character commit SHA-1 pointer', 'A complete duplicate copy of all source code files', 'A compressed zip archive', 'A server database record'],
              correctOptionIndex: 0,
              explanation: 'A Git branch is a lightweight reference file pointing to a specific commit hash.'
            }
          ],
          exercise: {
            id: 'gitex-2',
            instructions: 'Write command `git checkout -b feature/auth` and match text.',
            initialCode: '# Create branch command\n',
            solutionCode: 'git checkout -b feature/auth',
            hints: ['Use git checkout -b feature/auth'],
            validationType: 'text_match',
            testCases: [{ id: 'gittc2', description: 'Matches branch creation command', expectedOutput: 'git checkout -b feature/auth' }]
          },
          references: [],
          completionCriteria: { requiresConceptsRead: true, requiresQuizPassed: true, requiresExercisePassed: true }
        }
      ]
    },
    {
      id: 'git-mod-2',
      slug: 'git-advanced-rebase-history',
      title: 'Level 2: Interactive Rebasing, Cherry-Picking & Reflog',
      description: 'Clean commit histories with interactive rebase (git rebase -i), cherry-pick specific commits, and recover deleted branches via git reflog.',
      level: 'intermediate',
      orderIndex: 2,
      lessons: [
        {
          id: 'git-les-3',
          slug: 'git-interactive-rebase-squash',
          title: 'Interactive Rebasing, Squashing & Commit Rewriting',
          description: 'Squash dirty intermediate commits (pick, squash, reword, drop), maintain linear commit histories, and obey the Golden Rule of Rebasing.',
          estimatedMinutes: 35,
          orderIndex: 1,
          prerequisites: ['git-les-2'],
          concepts: [
            {
              id: 'gitc3_1',
              title: 'Rebase vs Merge & Golden Rule of Rebasing',
              contentMarkdown: `### Rebase vs Merge
- **\`git merge\`**: Preserves complete historic branch topology, adding a merge commit.
- **\`git rebase\`**: Replays feature commits on top of target branch, creating a linear history.

> ⚠️ **The Golden Rule of Rebasing**: NEVER rebase branches that have already been pushed and shared with other developers on remote repositories.`
            }
          ],
          examples: [
            {
              id: 'gitex3_1',
              title: 'Example 1: Interactive Rebase Todo List',
              code: `# Interactive rebase last 3 commits
git rebase -i HEAD~3

# TODO LIST EDITOR:
pick a1b2c3d feat(auth): add login form
squash e4f5g6h fix typo in auth
squash i7j8k9l fix lint error in login`,
              explanation: 'Changes pick to squash on secondary commits to combine 3 commits into 1 clean logical feature commit.'
            }
          ],
          quiz: [
            {
              id: 'gitq3_1',
              question: 'What is the Golden Rule of Rebasing in Git?',
              options: [
                'Never rebase commits that have been pushed and shared on a public/shared branch',
                'Always rebase main into feature branches daily',
                'Rebasing deletes files permanently',
                'Never use git rebase on local branches'
              ],
              correctOptionIndex: 0,
              explanation: 'Rebasing rewrites commit SHA-1 hashes, which breaks history for other collaborators on shared remote branches.'
            }
          ],
          exercise: {
            id: 'gitex-3',
            instructions: 'Write command `git rebase -i HEAD~3` and match text.',
            initialCode: '# Interactive rebase command\n',
            solutionCode: 'git rebase -i HEAD~3',
            hints: ['Use git rebase -i HEAD~3'],
            validationType: 'text_match',
            testCases: [{ id: 'gittc3', description: 'Matches interactive rebase command', expectedOutput: 'git rebase -i HEAD~3' }]
          },
          references: [],
          completionCriteria: { requiresConceptsRead: true, requiresQuizPassed: true, requiresExercisePassed: true }
        },
        {
          id: 'git-les-4',
          slug: 'git-reflog-cherry-pick-recovery',
          title: 'Git Reflog Disaster Recovery & Cherry-Picking',
          description: 'Recover deleted commits or aborted rebases using git reflog, and apply isolated commits using git cherry-pick.',
          estimatedMinutes: 40,
          orderIndex: 2,
          prerequisites: ['git-les-3'],
          concepts: [
            {
              id: 'gitc4_1',
              title: 'Reflog & Safety Net Recovery',
              contentMarkdown: `### What is Git Reflog?
\`git reflog\` records every HEAD pointer position movement in your local repository over the last 90 days. Even if a branch is force-deleted (\`git branch -D\`), the commits remain accessible in the reflog.`
            }
          ],
          examples: [
            {
              id: 'gitex4_1',
              title: 'Example 1: Recovering Deleted Branch via Reflog',
              code: `# View reflog history
git reflog

# Output: 8f3a1b2 HEAD@{1}: checkout: moving from feature-deleted to main

# Recover deleted branch tip commit
git checkout -b recovered-branch 8f3a1b2`,
              explanation: 'Locates commit SHA-1 in reflog and creates a new branch pointer at that commit position.'
            }
          ],
          quiz: [
            {
              id: 'gitq4_1',
              question: 'Which Git command logs local HEAD pointer movements, enabling disaster recovery of deleted branches?',
              options: ['git reflog', 'git log', 'git status', 'git diff'],
              correctOptionIndex: 0,
              explanation: 'git reflog tracks all local pointer updates, providing a 90-day recovery safety net.'
            }
          ],
          exercise: {
            id: 'gitex-4',
            instructions: 'Write command `git reflog` and match text.',
            initialCode: '# Reflog command\n',
            solutionCode: 'git reflog',
            hints: ['Use git reflog'],
            validationType: 'text_match',
            testCases: [{ id: 'gittc4', description: 'Matches git reflog command', expectedOutput: 'git reflog' }]
          },
          references: [],
          completionCriteria: { requiresConceptsRead: true, requiresQuizPassed: true, requiresExercisePassed: true }
        }
      ]
    },
    {
      id: 'git-mod-3',
      slug: 'github-collaboration-cicd',
      title: 'Level 3: GitHub Collaboration & Actions CI/CD Automation',
      description: 'Master GitHub Pull Request code reviews, branch protection rules, and build automated CI/CD pipelines with GitHub Actions.',
      level: 'advanced',
      orderIndex: 3,
      lessons: [
        {
          id: 'git-les-5',
          slug: 'github-pull-requests-code-reviews',
          title: 'GitHub Pull Requests, Code Reviews & Branch Protection',
          description: 'Structure professional Pull Requests, enforce mandatory code reviews, and configure branch protection rules on main.',
          estimatedMinutes: 35,
          orderIndex: 1,
          prerequisites: ['git-les-4'],
          concepts: [
            {
              id: 'gitc5_1',
              title: 'GitHub Pull Request Governance',
              contentMarkdown: `### Enterprise Branch Protection Rules
1. Require a Pull Request before merging.
2. Require minimum 2 approving code reviews.
3. Require status checks (CI tests/linting) to pass before merging.
4. Require linear commit history.`
            }
          ],
          examples: [
            {
              id: 'gitex5_1',
              title: 'Example 1: Pull Request Template Markdown',
              code: `## Description
Add JWT authentication endpoint with rate limiting.

## Changes Made
- Implement /api/login REST handler
- Add bcrypt password verification

## Checklist
- [x] Unit tests passing
- [x] Security headers verified`,
              explanation: 'Standardized PR descriptions guide reviewers through change context and test validation.'
            }
          ],
          quiz: [
            {
              id: 'gitq5_1',
              question: 'Which GitHub setting prevents developers from pushing code directly to main without an approved Pull Request?',
              options: ['Branch Protection Rules', 'Repository Archiving', 'GitHub Pages', 'Forking Settings'],
              correctOptionIndex: 0,
              explanation: 'Branch Protection Rules enforce PR reviews and passing CI status checks prior to merging.'
            }
          ],
          exercise: {
            id: 'gitex-5',
            instructions: 'Write a snippet outputting `"Pull Request Merged: Linear History"` to standard console.log.',
            initialCode: '// PR status\n',
            solutionCode: 'console.log("Pull Request Merged: Linear History");',
            hints: ['console.log("Pull Request Merged: Linear History");'],
            validationType: 'stdout',
            testCases: [{ id: 'gittc5', description: 'Outputs PR Merged status', expectedOutput: 'Pull Request Merged: Linear History' }]
          },
          references: [],
          completionCriteria: { requiresConceptsRead: true, requiresQuizPassed: true, requiresExercisePassed: true }
        },
        {
          id: 'git-les-6',
          slug: 'github-actions-cicd-automation',
          title: 'GitHub Actions CI/CD Pipeline Automation',
          description: 'Engineer GitHub Actions workflow YAML files triggering automated linting, test suites, and Docker builds on pull requests.',
          estimatedMinutes: 40,
          orderIndex: 2,
          prerequisites: ['git-les-5'],
          concepts: [
            {
              id: 'gitc6_1',
              title: 'GitHub Actions Architecture',
              contentMarkdown: `### GitHub Actions Components
- **Workflow**: Automated process defined in \`.github/workflows/*.yml\`.
- **Events**: Triggers executing workflows (\`push\`, \`pull_request\`).
- **Jobs**: Set of steps executing on a runner VM (\`runs-on: ubuntu-latest\`).`
            }
          ],
          examples: [
            {
              id: 'gitex6_1',
              title: 'Example 1: Complete GitHub Actions CI Workflow',
              code: `name: Node.js CI

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build-and-test:
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v4
    - name: Set up Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '20'
    - run: npm ci
    - run: npm run lint
    - run: npm test`,
              explanation: 'Automated CI pipeline checks out code, installs dependencies with npm ci, and runs linting/tests.'
            }
          ],
          quiz: [
            {
              id: 'gitq6_1',
              question: 'In which directory must GitHub Actions workflow YAML configuration files be placed inside a repository?',
              options: ['.github/workflows/', '.config/ci/', '.git/hooks/', 'scripts/actions/'],
              correctOptionIndex: 0,
              explanation: 'GitHub automatically parses workflow YAML files stored inside .github/workflows/.'
            }
          ],
          exercise: {
            id: 'gitex-6',
            instructions: 'Write YAML trigger statement `on: [push, pull_request]` and match text.',
            initialCode: '# Workflow trigger\n',
            solutionCode: 'on: [push, pull_request]',
            hints: ['Use on: [push, pull_request]'],
            validationType: 'text_match',
            testCases: [{ id: 'gittc6', description: 'Matches workflow trigger YAML', expectedOutput: 'on: [push, pull_request]' }]
          },
          references: [],
          completionCriteria: { requiresConceptsRead: true, requiresQuizPassed: true, requiresExercisePassed: true }
        }
      ]
    }
  ]
};

import { pythonPath } from './python-path';
import { javaPath } from './courses/java-path';
import { javascriptPath } from './courses/javascript-path';
import { webDevPath } from './courses/web-dev-path';
import { reactNextPath } from './courses/react-next-path';
import { sqlDbmsPath } from './courses/sql-dbms-path';
import { dsaPath } from './courses/dsa-path';
import { aiMlPath } from './courses/ai-ml-path';
import { cybersecurityPath } from './courses/cybersecurity-path';
import { linuxPath } from './courses/linux-path';
import { gitGithubPath } from './courses/git-github-path';
import { cloudDevopsPath } from './courses/cloud-devops-path';
import { testingPath } from './courses/testing-path';
import { systemDesignPath } from './courses/system-design-path';
import { interviewPrepPath } from './courses/interview-prep-path';

export interface CategorySummary {
  id: string;
  title: string;
  description: string;
  icon: string;
  paths: PathSummary[];
}

export interface PathSummary {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  category: string;
  categoryLabel: string;
  isActive: boolean;
  estimatedHours: number;
  totalLessons: number;
  badgeText: string;
}

export const pathCategories: CategorySummary[] = [
  {
    id: 'programming',
    title: 'Programming Languages',
    description: 'Master core programming syntaxes, object-oriented principles, type systems, and software fundamentals.',
    icon: '💻',
    paths: [
      {
        id: pythonPath.id,
        slug: pythonPath.slug,
        title: pythonPath.title,
        subtitle: pythonPath.subtitle,
        description: pythonPath.description,
        icon: pythonPath.icon,
        category: 'programming',
        categoryLabel: 'Programming Languages',
        isActive: true,
        estimatedHours: pythonPath.estimatedHours,
        totalLessons: pythonPath.totalLessons,
        badgeText: 'Active Flagship'
      },
      {
        id: javaPath.id,
        slug: javaPath.slug,
        title: javaPath.title,
        subtitle: javaPath.subtitle,
        description: javaPath.description,
        icon: javaPath.icon,
        category: 'programming',
        categoryLabel: 'Programming Languages',
        isActive: true,
        estimatedHours: javaPath.estimatedHours,
        totalLessons: javaPath.totalLessons,
        badgeText: 'Active Course'
      },
      {
        id: javascriptPath.id,
        slug: javascriptPath.slug,
        title: javascriptPath.title,
        subtitle: javascriptPath.subtitle,
        description: javascriptPath.description,
        icon: javascriptPath.icon,
        category: 'programming',
        categoryLabel: 'Programming Languages',
        isActive: true,
        estimatedHours: javascriptPath.estimatedHours,
        totalLessons: javascriptPath.totalLessons,
        badgeText: 'Active Course'
      },
      {
        id: 'c-lang',
        slug: 'c',
        title: 'C Programming & Systems',
        subtitle: 'Understand memory management, pointers, and hardware interaction from scratch.',
        description: 'Learn foundational system programming, manual memory management, structures, and low-level code.',
        icon: '⚙️',
        category: 'programming',
        categoryLabel: 'Programming Languages',
        isActive: false,
        estimatedHours: 40,
        totalLessons: 28,
        badgeText: 'Coming Soon'
      },
      {
        id: 'cpp-lang',
        slug: 'cpp',
        title: 'C++ Modern Software Engineering',
        subtitle: 'High-performance programming, RAII, STL, and memory architecture.',
        description: 'Master modern C++17/20, object-oriented concepts, template metaprogramming, and STL algorithms.',
        icon: '⚡',
        category: 'programming',
        categoryLabel: 'Programming Languages',
        isActive: false,
        estimatedHours: 50,
        totalLessons: 36,
        badgeText: 'Coming Soon'
      },
      {
        id: 'typescript-lang',
        slug: 'typescript',
        title: 'TypeScript for Scale',
        subtitle: 'Static type checking, generics, and production application safety.',
        description: 'Master TypeScript type inference, mapped types, interfaces, decorators, and strict compilation.',
        icon: '🔷',
        category: 'programming',
        categoryLabel: 'Programming Languages',
        isActive: false,
        estimatedHours: 30,
        totalLessons: 20,
        badgeText: 'Coming Soon'
      },
      {
        id: 'go-lang',
        slug: 'go',
        title: 'Go Cloud Systems',
        subtitle: 'Goroutines, channels, microservices, and modern backend engineering.',
        description: 'Learn concurrent programming, channels, interfaces, and fast service building with Go.',
        icon: '🐹',
        category: 'programming',
        categoryLabel: 'Programming Languages',
        isActive: false,
        estimatedHours: 35,
        totalLessons: 24,
        badgeText: 'Coming Soon'
      },
      {
        id: 'rust-lang',
        slug: 'rust',
        title: 'Rust Systems Programming',
        subtitle: 'Memory safety without garbage collection, borrow checker, and fearless concurrency.',
        description: 'Understand ownership, borrowing, lifetimes, pattern matching, and zero-cost abstractions.',
        icon: '🦀',
        category: 'programming',
        categoryLabel: 'Programming Languages',
        isActive: false,
        estimatedHours: 55,
        totalLessons: 40,
        badgeText: 'Coming Soon'
      }
    ]
  },
  {
    id: 'cs',
    title: 'Computer Science Core',
    description: 'Understand the underlying foundations of computing: algorithms, systems, networking, databases, and architecture.',
    icon: '🧠',
    paths: [
      {
        id: dsaPath.id,
        slug: dsaPath.slug,
        title: dsaPath.title,
        subtitle: dsaPath.subtitle,
        description: dsaPath.description,
        icon: dsaPath.icon,
        category: 'cs',
        categoryLabel: 'Computer Science',
        isActive: true,
        estimatedHours: dsaPath.estimatedHours,
        totalLessons: dsaPath.totalLessons,
        badgeText: 'Active Course'
      },
      {
        id: sqlDbmsPath.id,
        slug: sqlDbmsPath.slug,
        title: sqlDbmsPath.title,
        subtitle: sqlDbmsPath.subtitle,
        description: sqlDbmsPath.description,
        icon: sqlDbmsPath.icon,
        category: 'cs',
        categoryLabel: 'Computer Science',
        isActive: true,
        estimatedHours: sqlDbmsPath.estimatedHours,
        totalLessons: sqlDbmsPath.totalLessons,
        badgeText: 'Active Course'
      },
      {
        id: systemDesignPath.id,
        slug: systemDesignPath.slug,
        title: systemDesignPath.title,
        subtitle: systemDesignPath.subtitle,
        description: systemDesignPath.description,
        icon: systemDesignPath.icon,
        category: 'cs',
        categoryLabel: 'Computer Science',
        isActive: true,
        estimatedHours: systemDesignPath.estimatedHours,
        totalLessons: systemDesignPath.totalLessons,
        badgeText: 'Active Course'
      },
      {
        id: 'os',
        slug: 'operating-systems',
        title: 'Operating Systems Internals',
        subtitle: 'Processes, threads, memory paging, concurrency, and kernel architectures.',
        description: 'Explore CPU scheduling, process synchronization, virtual memory management, and file systems.',
        icon: '🖥️',
        category: 'cs',
        categoryLabel: 'Computer Science',
        isActive: false,
        estimatedHours: 40,
        totalLessons: 28,
        badgeText: 'Coming Soon'
      },
      {
        id: 'cn',
        slug: 'computer-networks',
        title: 'Computer Networks & HTTP',
        subtitle: 'TCP/IP model, socket programming, DNS, TLS, and protocol inspection.',
        description: 'Understand packet switching, IP routing, TCP handshakes, TLS security, and web protocols.',
        icon: '🌐',
        category: 'cs',
        categoryLabel: 'Computer Science',
        isActive: false,
        estimatedHours: 35,
        totalLessons: 22,
        badgeText: 'Coming Soon'
      }
    ]
  },
  {
    id: 'web',
    title: 'Web Development',
    description: 'Build full-stack web applications from semantic HTML to deployed serverless architectures.',
    icon: '🌐',
    paths: [
      {
        id: webDevPath.id,
        slug: webDevPath.slug,
        title: webDevPath.title,
        subtitle: webDevPath.subtitle,
        description: webDevPath.description,
        icon: webDevPath.icon,
        category: 'web',
        categoryLabel: 'Web Development',
        isActive: true,
        estimatedHours: webDevPath.estimatedHours,
        totalLessons: webDevPath.totalLessons,
        badgeText: 'Active Course'
      },
      {
        id: reactNextPath.id,
        slug: reactNextPath.slug,
        title: reactNextPath.title,
        subtitle: reactNextPath.subtitle,
        description: reactNextPath.description,
        icon: reactNextPath.icon,
        category: 'web',
        categoryLabel: 'Web Development',
        isActive: true,
        estimatedHours: reactNextPath.estimatedHours,
        totalLessons: reactNextPath.totalLessons,
        badgeText: 'Active Course'
      }
    ]
  },
  {
    id: 'ai',
    title: 'AI / Machine Learning',
    description: 'From mathematical foundations and Python libraries to Deep Learning and Generative AI Agents.',
    icon: '🤖',
    paths: [
      {
        id: aiMlPath.id,
        slug: aiMlPath.slug,
        title: aiMlPath.title,
        subtitle: aiMlPath.subtitle,
        description: aiMlPath.description,
        icon: aiMlPath.icon,
        category: 'ai',
        categoryLabel: 'AI / Machine Learning',
        isActive: true,
        estimatedHours: aiMlPath.estimatedHours,
        totalLessons: aiMlPath.totalLessons,
        badgeText: 'Active Course'
      }
    ]
  },
  {
    id: 'security',
    title: 'Cybersecurity',
    description: 'Learn Linux systems, network protocol inspection, ethical hacking, digital forensics, and cloud defense.',
    icon: '🛡️',
    paths: [
      {
        id: linuxPath.id,
        slug: linuxPath.slug,
        title: linuxPath.title,
        subtitle: linuxPath.subtitle,
        description: linuxPath.description,
        icon: linuxPath.icon,
        category: 'security',
        categoryLabel: 'Cybersecurity',
        isActive: true,
        estimatedHours: linuxPath.estimatedHours,
        totalLessons: linuxPath.totalLessons,
        badgeText: 'Active Course'
      },
      {
        id: cybersecurityPath.id,
        slug: cybersecurityPath.slug,
        title: cybersecurityPath.title,
        subtitle: cybersecurityPath.subtitle,
        description: cybersecurityPath.description,
        icon: cybersecurityPath.icon,
        category: 'security',
        categoryLabel: 'Cybersecurity',
        isActive: true,
        estimatedHours: cybersecurityPath.estimatedHours,
        totalLessons: cybersecurityPath.totalLessons,
        badgeText: 'Active Course'
      }
    ]
  },
  {
    id: 'career',
    title: 'Career & Technical Skills',
    description: 'Translate engineering knowledge into career success: Git/GitHub, technical resumes, interviews, open source, and freelancing.',
    icon: '🚀',
    paths: [
      {
        id: gitGithubPath.id,
        slug: gitGithubPath.slug,
        title: gitGithubPath.title,
        subtitle: gitGithubPath.subtitle,
        description: gitGithubPath.description,
        icon: gitGithubPath.icon,
        category: 'career',
        categoryLabel: 'Career & Technical Skills',
        isActive: true,
        estimatedHours: gitGithubPath.estimatedHours,
        totalLessons: gitGithubPath.totalLessons,
        badgeText: 'Active Course'
      },
      {
        id: cloudDevopsPath.id,
        slug: cloudDevopsPath.slug,
        title: cloudDevopsPath.title,
        subtitle: cloudDevopsPath.subtitle,
        description: cloudDevopsPath.description,
        icon: cloudDevopsPath.icon,
        category: 'career',
        categoryLabel: 'Career & Technical Skills',
        isActive: true,
        estimatedHours: cloudDevopsPath.estimatedHours,
        totalLessons: cloudDevopsPath.totalLessons,
        badgeText: 'Active Course'
      },
      {
        id: testingPath.id,
        slug: testingPath.slug,
        title: testingPath.title,
        subtitle: testingPath.subtitle,
        description: testingPath.description,
        icon: testingPath.icon,
        category: 'career',
        categoryLabel: 'Career & Technical Skills',
        isActive: true,
        estimatedHours: testingPath.estimatedHours,
        totalLessons: testingPath.totalLessons,
        badgeText: 'Active Course'
      },
      {
        id: interviewPrepPath.id,
        slug: interviewPrepPath.slug,
        title: interviewPrepPath.title,
        subtitle: interviewPrepPath.subtitle,
        description: interviewPrepPath.description,
        icon: interviewPrepPath.icon,
        category: 'career',
        categoryLabel: 'Career & Technical Skills',
        isActive: true,
        estimatedHours: interviewPrepPath.estimatedHours,
        totalLessons: interviewPrepPath.totalLessons,
        badgeText: 'Active Course'
      }
    ]
  }
];

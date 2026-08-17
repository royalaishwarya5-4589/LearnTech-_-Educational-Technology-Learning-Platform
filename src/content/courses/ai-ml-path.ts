import { Path } from '@/types/content';
import { COURSE_CERTIFICATION_POLICIES } from '../certification-policies';

export const aiMlPath: Path = {
  id: 'genai-llm-agents-mastery',
  slug: 'genai-llm-agents',
  title: 'Generative AI & LLM Agents',
  subtitle: 'Master Large Language Model architectures, prompt engineering, RAG vector search, and autonomous LLM agent tool calling.',
  description: 'Learn foundational artificial intelligence, Transformer architectures, prompt engineering techniques, embeddings, vector databases, Retrieval-Augmented Generation (RAG), and autonomous LLM multi-agent tool calling.',
  icon: '🤖',
  category: 'ai',
  categoryLabel: 'Artificial Intelligence',
  isActive: true,
  status: 'active',
  courseType: 'hybrid',
  difficulty: 'advanced',
  estimatedHours: 45,
  totalLessons: 6,
  totalProjects: 2,
  certificationRequirement: COURSE_CERTIFICATION_POLICIES['genai-llm-agents'],
  projects: [
    {
      id: 'ai-proj-1',
      slug: 'rag-document-search-agent',
      title: 'Enterprise RAG Document Q&A Agent',
      subtitle: 'Build a Retrieval-Augmented Generation engine parsing documentation, chunking text, computing vector embeddings, and answering user queries.',
      description: 'Engineer a end-to-end RAG architecture with vector similarity search (cosine distance), semantic chunking, and LLM context synthesis.',
      difficulty: 'intermediate',
      estimatedHours: 6,
      skillsLearned: ['Text Chunking', 'Vector Embeddings', 'Cosine Similarity Search', 'RAG Context Injection'],
      prerequisites: ['Python & API Integration'],
      learningObjectives: ['Build document text chunking pipelines.', 'Query vector databases to supply relevant prompt context.'],
      starterCode: `async function queryRAG(userQuery) {\n    // RAG pipeline implementation\n}`,
      projectInstructionsMarkdown: '### Project Overview\nEngineer a RAG document search agent using vector embeddings and LLM context synthesis.',
      milestones: [
        { id: 'aim1', title: 'Milestone 1: Document Chunking & Embeddings', description: 'Chunk raw Markdown text and compute vector embeddings.', orderIndex: 1 },
        { id: 'aim2', title: 'Milestone 2: Vector Search & Prompt Synthesis', description: 'Retrieve top-k vector matches and synthesize answer.', orderIndex: 2 }
      ],
      completionCriteria: 'Verify vector similarity retrieval accuracy and contextualized LLM response output.',
      pathSlug: 'genai-llm-agents'
    },
    {
      id: 'ai-proj-2',
      slug: 'autonomous-llm-agent-toolkit',
      title: 'Autonomous Multi-Tool ReAct LLM Agent',
      subtitle: 'Build an autonomous agent with ReAct reasoning loops (Thought-Action-Observation) executing external API tools dynamically.',
      description: 'Architect an autonomous LLM agent capable of invoking custom python/JS function tools, evaluating JSON schemas, and resolving multi-step user instructions.',
      difficulty: 'advanced',
      estimatedHours: 8,
      skillsLearned: ['ReAct Agent Loop', 'Function / Tool Calling', 'JSON Schema Validation', 'Agent Safety Guardrails'],
      prerequisites: ['RAG & Prompt Engineering'],
      learningObjectives: ['Implement ReAct (Reasoning + Acting) execution loops.', 'Bind strict JSON function schemas to LLM tool calls.'],
      starterCode: `class AutonomousAgent {\n    async executeTask(userGoal) {}\n}`,
      projectInstructionsMarkdown: '### Project Overview\nEngineer an autonomous ReAct LLM agent with multi-tool function calling.',
      milestones: [
        { id: 'aim3', title: 'Milestone 1: Function Schema Registry', description: 'Define JSON schemas for web search and calculator tools.', orderIndex: 1 },
        { id: 'aim4', title: 'Milestone 2: ReAct Execution Loop & Guardrails', description: 'Implement Thought-Action-Observation loops with step limits.', orderIndex: 2 }
      ],
      completionCriteria: 'Pass dynamic tool call execution, schema parsing, and autonomous task completion tests.',
      pathSlug: 'genai-llm-agents'
    }
  ],
  modules: [
    {
      id: 'ai-mod-1',
      slug: 'ai-foundations',
      title: 'Level 1: AI & Large Language Model Foundations',
      description: 'Master AI/ML fundamentals, Transformer self-attention architecture, tokenization, and structured prompt engineering techniques.',
      level: 'foundations',
      orderIndex: 1,
      lessons: [
        {
          id: 'ai-les-1',
          slug: 'ai-llm-architecture-prompting',
          title: 'LLM Transformer Architecture & Systematic Prompt Engineering',
          description: 'Understand Transformer self-attention, BPE tokenization, temperature sampling, and zero-shot/few-shot/chain-of-thought prompting.',
          estimatedMinutes: 30,
          orderIndex: 1,
          prerequisites: [],
          concepts: [
            {
              id: 'aic1_1',
              title: 'Learning Objectives & Transformer Mechanics',
              contentMarkdown: `### Learning Objectives
- Understand Transformer self-attention mechanisms and auto-regressive next-token prediction.
- Master prompt engineering techniques: System Instructions, Few-Shot Demonstrations, and Chain-of-Thought (CoT) reasoning.
- Control generation randomness using \`temperature\`, \`top_p\`, and frequency penalties.

---

### How Large Language Models Work
Large Language Models (LLMs) are auto-regressive deep neural networks trained on massive textual corpora. Text inputs are split into sub-word units called **Tokens** using Byte-Pair Encoding (BPE). The **Transformer Self-Attention** layer computes contextual relationships between tokens, calculating probability distributions to generate subsequent tokens.`
            }
          ],
          examples: [
            {
              id: 'aiex1_1',
              title: 'Example 1: System Prompt & Few-Shot Chain-of-Thought Structure',
              code: `const promptPayload = {
    system: "You are a senior software architect. Analyze code snippets step-by-step.",
    messages: [
        {
            role: "user",
            content: "Question: What is the time complexity of binary search? Let's think step by step."
        }
    ],
    temperature: 0.2 // Low temperature for deterministic factual responses
};`,
              explanation: 'Combines strict system persona instructions with step-by-step Chain-of-Thought reasoning triggers.'
            }
          ],
          quiz: [
            {
              id: 'aiq1_1',
              question: 'Which sampling parameter controls the randomness of next-token probability distributions in LLMs?',
              options: ['Temperature', 'Max Tokens', 'Presence Penalty', 'Batch Size'],
              correctOptionIndex: 0,
              explanation: 'Temperature adjusts prediction probability distributions (lower = deterministic, higher = creative).'
            }
          ],
          exercise: {
            id: 'aiex-1',
            instructions: 'Write a prompt payload snippet declaring `temperature: 0.2` and output matching text.',
            initialCode: '// Prompt payload snippet\n',
            solutionCode: 'console.log("temperature: 0.2");',
            hints: ['console.log("temperature: 0.2");'],
            validationType: 'stdout',
            testCases: [{ id: 'aitc1', description: 'Outputs temperature setting', expectedOutput: 'temperature: 0.2' }]
          },
          references: [],
          completionCriteria: { requiresConceptsRead: true, requiresQuizPassed: true, requiresExercisePassed: true }
        },
        {
          id: 'ai-les-2',
          slug: 'ai-embeddings-vector-search',
          title: 'Vector Embeddings & Semantic Similarity Search',
          description: 'Convert unstructured text into high-dimensional dense vector embeddings, compute Cosine Similarity, and store vectors in databases.',
          estimatedMinutes: 35,
          orderIndex: 2,
          prerequisites: ['ai-les-1'],
          concepts: [
            {
              id: 'aic2_1',
              title: 'Vector Spaces & Similarity Metrics',
              contentMarkdown: `### Dense Vector Embeddings
Embedding models transform text into high-dimensional floating-point vectors (e.g., 1536 dimensions) where semantically similar concepts reside close to one another in vector space. **Cosine Similarity** measures the angle between vectors:

$$\text{Cosine Similarity} = \frac{\mathbf{A} \cdot \mathbf{B}}{\|\mathbf{A}\| \|\mathbf{B}\|}$$`
            }
          ],
          examples: [
            {
              id: 'aiex2_1',
              title: 'Example 1: Cosine Similarity Calculation',
              code: `function cosineSimilarity(vecA, vecB) {
    let dotProduct = 0, normA = 0, normB = 0;
    for (let i = 0; i < vecA.length; i++) {
        dotProduct += vecA[i] * vecB[i];
        normA += vecA[i] ** 2;
        normB += vecB[i] ** 2;
    }
    return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}`,
              explanation: 'Computes geometric dot product normalized by vector magnitudes, returning similarity score between -1 and 1.'
            }
          ],
          quiz: [
            {
              id: 'aiq2_1',
              question: 'Which mathematical metric measures the directional angle similarity between two dense vector embeddings?',
              options: ['Cosine Similarity', 'Euclidean Distance', 'Manhattan Distance', 'Hamming Distance'],
              correctOptionIndex: 0,
              explanation: 'Cosine similarity measures normalized angular dot product alignment in high-dimensional vector spaces.'
            }
          ],
          exercise: {
            id: 'aiex-2',
            instructions: 'Write a snippet printing `"Similarity Score: 0.95"` to standard console.log.',
            initialCode: '// Vector similarity output\n',
            solutionCode: 'console.log("Similarity Score: 0.95");',
            hints: ['console.log("Similarity Score: 0.95");'],
            validationType: 'stdout',
            testCases: [{ id: 'aitc2', description: 'Outputs Similarity Score text', expectedOutput: 'Similarity Score: 0.95' }]
          },
          references: [],
          completionCriteria: { requiresConceptsRead: true, requiresQuizPassed: true, requiresExercisePassed: true }
        }
      ]
    },
    {
      id: 'ai-mod-2',
      slug: 'ai-rag-architecture',
      title: 'Level 2: Retrieval-Augmented Generation (RAG) Architecture',
      description: 'Master document ingestion pipelines, semantic text chunking strategies, vector database indexing (pgvector, Pinecone), and context injection.',
      level: 'intermediate',
      orderIndex: 2,
      lessons: [
        {
          id: 'ai-les-3',
          slug: 'ai-rag-pipeline-chunking',
          title: 'Document Chunking Strategies & Vector Indexing',
          description: 'Split long-form documents into semantic chunks with overlap, index vector embeddings in pgvector, and retrieve relevant context top-K passages.',
          estimatedMinutes: 35,
          orderIndex: 1,
          prerequisites: ['ai-les-2'],
          concepts: [
            {
              id: 'aic3_1',
              title: 'RAG Ingestion Architecture',
              contentMarkdown: `### RAG Architecture Stages
1. **Document Processing**: Parse Markdown/PDF into text passages.
2. **Chunking**: Split text into fixed-size chunks (e.g., 500 tokens) with 50-token overlap to preserve boundary context.
3. **Embedding**: Compute vector embeddings for each chunk.
4. **Vector Retrieval**: Perform k-Nearest Neighbors ($k$-NN) query matching user query embedding.`
            }
          ],
          examples: [
            {
              id: 'aiex3_1',
              title: 'Example 1: SQL Vector Search in pgvector',
              code: `SELECT 
    document_id,
    content_chunk,
    1 - (embedding <=> $1) AS similarity_score
FROM document_chunks
ORDER BY embedding <=> $1
LIMIT 5;`,
              explanation: 'Uses pgvector <=> cosine distance operator to retrieve top-5 most relevant context passages.'
            }
          ],
          quiz: [
            {
              id: 'aiq3_1',
              question: 'Why do RAG text chunking pipelines include token overlap between consecutive chunks?',
              options: [
                'To preserve semantic context across chunk boundary splits',
                'To reduce database storage costs',
                'To increase LLM temperature',
                'It is required by SQL specifications'
              ],
              correctOptionIndex: 0,
              explanation: 'Token overlap ensures sentences split across boundary edges do not lose essential context.'
            }
          ],
          exercise: {
            id: 'aiex-3',
            instructions: 'Output `"RAG Context Retrieved: Top 5 Matches"` to standard console.log.',
            initialCode: '// RAG search status\n',
            solutionCode: 'console.log("RAG Context Retrieved: Top 5 Matches");',
            hints: ['console.log("RAG Context Retrieved: Top 5 Matches");'],
            validationType: 'stdout',
            testCases: [{ id: 'aitc3', description: 'Outputs RAG Context status', expectedOutput: 'RAG Context Retrieved: Top 5 Matches' }]
          },
          references: [],
          completionCriteria: { requiresConceptsRead: true, requiresQuizPassed: true, requiresExercisePassed: true }
        },
        {
          id: 'ai-les-4',
          slug: 'ai-function-calling-tools',
          title: 'LLM Function / Tool Calling & JSON Schemas',
          description: 'Bind strict JSON Schemas to LLM prompt completions, parse structured tool invocation payloads, and execute external REST APIs.',
          estimatedMinutes: 40,
          orderIndex: 2,
          prerequisites: ['ai-les-3'],
          concepts: [
            {
              id: 'aic4_1',
              title: 'Tool Calling Mechanics',
              contentMarkdown: `### How LLM Tool Calling Works
Instead of generating free-form unstructured text responses, LLMs trained on function calling examine provided JSON Schemas and generate structured JSON tool calls specifying arguments to invoke.`
            }
          ],
          examples: [
            {
              id: 'aiex4_1',
              title: 'Example 1: Function Calling JSON Schema Definition',
              code: `const getWeatherTool = {
    name: "get_current_weather",
    description: "Fetch live weather details for a given city",
    parameters: {
        type: "object",
        properties: {
            city: { type: "string", description: "City name e.g. London" },
            units: { type: "string", enum: ["celsius", "fahrenheit"] }
        },
        required: ["city"]
    }
};`,
              explanation: 'Defines JSON Schema parameter constraints for the LLM to populate when invoking get_current_weather.'
            }
          ],
          quiz: [
            {
              id: 'aiq4_1',
              question: 'How do Large Language Models communicate structured tool invocation parameters to host applications?',
              options: [
                'By outputting structured JSON payload arguments matching a declared JSON Schema',
                'By executing Python binaries directly inside the GPU model weights',
                'By compiling C++ code',
                'By sending raw HTTP packets'
              ],
              correctOptionIndex: 0,
              explanation: 'LLMs generate JSON formatted payloads matching supplied schema definitions.'
            }
          ],
          exercise: {
            id: 'aiex-4',
            instructions: 'Output `"Tool Executed: get_current_weather"` to standard console.log.',
            initialCode: '// Tool call output\n',
            solutionCode: 'console.log("Tool Executed: get_current_weather");',
            hints: ['console.log("Tool Executed: get_current_weather");'],
            validationType: 'stdout',
            testCases: [{ id: 'aitc4', description: 'Outputs Tool Executed text', expectedOutput: 'Tool Executed: get_current_weather' }]
          },
          references: [],
          completionCriteria: { requiresConceptsRead: true, requiresQuizPassed: true, requiresExercisePassed: true }
        }
      ]
    },
    {
      id: 'ai-mod-3',
      slug: 'ai-autonomous-agents',
      title: 'Level 3: Autonomous Multi-Agent Systems & Evaluation',
      description: 'Architect autonomous ReAct (Reasoning + Acting) loop agents, multi-agent collaboration topologies, and LLM evaluation benchmarks (Ragas / G-Eval).',
      level: 'advanced',
      orderIndex: 3,
      lessons: [
        {
          id: 'ai-les-5',
          slug: 'ai-react-agent-loop',
          title: 'The ReAct (Reasoning + Acting) Agent Execution Loop',
          description: 'Build autonomous agents combining Thought reasoning steps, Action tool calls, and Observation feedback iterations.',
          estimatedMinutes: 40,
          orderIndex: 1,
          prerequisites: ['ai-les-4'],
          concepts: [
            {
              id: 'aic5_1',
              title: 'ReAct Agent Loop Architecture',
              contentMarkdown: `### The ReAct Cycle
1. **Thought**: The agent reasons about user goal and remaining steps.
2. **Action**: The agent selects a tool and provides input parameters.
3. **Observation**: The host application executes the tool and returns output observations back into the agent context.`
            }
          ],
          examples: [
            {
              id: 'aiex5_1',
              title: 'Example 1: ReAct Reasoning Loop',
              code: `class ReActAgent {
    async step(history) {
        const response = await callLLM(history);
        if (response.toolCall) {
            const observation = await executeTool(response.toolCall);
            history.push({ role: 'tool', content: observation });
            return this.step(history); // Recursively iterate
        }
        return response.textFinalAnswer;
    }
}`,
              explanation: 'Loop continues executing actions and appending observations until final answer is reached.'
            }
          ],
          quiz: [
            {
              id: 'aiq5_1',
              question: 'What are the three core sequence steps comprising the ReAct agent framework cycle?',
              options: ['Thought -> Action -> Observation', 'Input -> Process -> Output', 'Compile -> Build -> Test', 'Prompt -> Embedding -> Vector'],
              correctOptionIndex: 0,
              explanation: 'ReAct stands for Reasoning (Thought), Acting (Action tool invocation), and Observation feedback.'
            }
          ],
          exercise: {
            id: 'aiex-5',
            instructions: 'Write a snippet outputting `"ReAct Loop Completed: Final Answer"` to standard console.log.',
            initialCode: '// ReAct status\n',
            solutionCode: 'console.log("ReAct Loop Completed: Final Answer");',
            hints: ['console.log("ReAct Loop Completed: Final Answer");'],
            validationType: 'stdout',
            testCases: [{ id: 'aitc5', description: 'Outputs ReAct status', expectedOutput: 'ReAct Loop Completed: Final Answer' }]
          },
          references: [],
          completionCriteria: { requiresConceptsRead: true, requiresQuizPassed: true, requiresExercisePassed: true }
        },
        {
          id: 'ai-les-6',
          slug: 'ai-evaluation-safety-guardrails',
          title: 'LLM Evaluation (RAGAS / G-Eval) & Safety Guardrails',
          description: 'Measure Faithfulness, Context Precision, Answer Relevance, and enforce input/output security guardrails against prompt injections.',
          estimatedMinutes: 40,
          orderIndex: 2,
          prerequisites: ['ai-les-5'],
          concepts: [
            {
              id: 'aic6_1',
              title: 'LLM Evaluation Metrics & Guardrails',
              contentMarkdown: `### RAG Triad Evaluation Metrics
- **Faithfulness**: Measures whether answer facts are strictly grounded in retrieved context (detects hallucinations).
- **Answer Relevance**: Measures how directly the generated answer addresses user query goals.
- **Context Precision**: Measures the signal-to-noise ratio of retrieved vector passages.`
            }
          ],
          examples: [
            {
              id: 'aiex6_1',
              title: 'Example 1: Prompt Injection Guardrail Inspection',
              code: `function sanitizePromptInput(userInput) {
    const injectionPatterns = [
        /ignore previous instructions/i,
        /system prompt disclosure/i,
        /you are now in developer mode/i
    ];

    for (const pattern of injectionPatterns) {
        if (pattern.test(userInput)) {
            throw new Error("Security Alert: Prompt Injection Attempt Blocked.");
        }
    }
    return userInput;
}`,
              explanation: 'Inspects user prompt strings for malicious adversarial override patterns before submitting to LLM APIs.'
            }
          ],
          quiz: [
            {
              id: 'aiq6_1',
              question: 'Which RAG evaluation metric verifies that generated LLM statements are strictly grounded in retrieved context passages (detecting hallucinations)?',
              options: ['Faithfulness', 'Context Recall', 'Latency', 'Token Count'],
              correctOptionIndex: 0,
              explanation: 'Faithfulness verifies that generated output facts originate from retrieved context passages.'
            }
          ],
          exercise: {
            id: 'aiex-6',
            instructions: 'Write a snippet outputting `"Guardrail Check Passed"` to standard console.log.',
            initialCode: '// Guardrail check\n',
            solutionCode: 'console.log("Guardrail Check Passed");',
            hints: ['console.log("Guardrail Check Passed");'],
            validationType: 'stdout',
            testCases: [{ id: 'aitc6', description: 'Outputs Guardrail check text', expectedOutput: 'Guardrail Check Passed' }]
          },
          references: [],
          completionCriteria: { requiresConceptsRead: true, requiresQuizPassed: true, requiresExercisePassed: true }
        }
      ]
    }
  ]
};

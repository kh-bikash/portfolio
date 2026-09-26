// All portfolio copy lives here. Keep it in sync with the resume and LinkedIn.

export const profile = {
  name: 'Khundrakpam Bikash Meitei',
  role: 'AI Engineer · Forward Deployed Engineer',
  intro:
    'I build LLM agents that make it to production — automating real client workflows, evaluating frontier models, and turning messy processes into reliable systems.',
  location: 'India',
  education: 'B.Tech CSE, KL University · CGPA 9.32 · 2027',
  status: 'Open to AI engineering roles',
  email: 'khbikash17@gmail.com',
  github: 'https://github.com/kh-bikash',
  githubUser: 'kh-bikash',
  linkedin: 'https://www.linkedin.com/in/khundrakpam-bikash-meitei-5544ba298/',
  resume: '/Khundrakpam_Bikash_Meitei_Resume.pdf',
}

export const experience = [
  {
    company: 'Handshake',
    role: 'Artificial Intelligence Specialist (Freelance)',
    period: 'Jul 2026 — Present',
    points: [
      'Hardened agentic coding benchmarks — fixed broken terminal tasks, edge-case tests and verification criteria so scores reflect real agent capability.',
      'Mapped accuracy and context-retention failure modes across ChatGPT, Claude and DeepSeek.',
    ],
  },
  {
    company: 'Build Fast with AI',
    role: 'AI Engineer Intern',
    period: 'Jun — Sep 2026',
    points: [
      'Cut manual effort 60–95% per workflow for 3+ client businesses with end-to-end LLM agent pipelines.',
      'Shipped agents with tool calling, RAG and structured outputs as monitored services, plus full-stack dashboards for clients.',
    ],
  },
  {
    company: 'Bot Point',
    role: 'AI/ML Intern',
    period: 'May — Jun 2026',
    points: [
      'Raised response accuracy 30% on 1K+ queries/day with LLM agents on a business automation platform.',
      'Reduced manual intervention 40% with automated prompt-evaluation pipelines.',
    ],
  },
]

export type Project = {
  name: string
  summary: string
  stack: string[]
  repo: string
  live?: string
}

export const projects: Project[] = [
  {
    name: 'ReflexCube',
    summary:
      'No-code AI platform: prompt → train → version → predict across 15 domain agents. 200 ms inference on 10K+ row datasets with subprocess-isolated workers. Backed by a published paper.',
    stack: ['Python', 'FastAPI', 'PyTorch', 'LangChain', 'React'],
    repo: 'https://github.com/kh-bikash/Reflex-Cube',
    live: 'https://reflex-cube.vercel.app',
  },
  {
    name: 'NextFlow',
    summary:
      'Visual AI workflow engine. A DAG executor topologically sorts nodes and runs independent branches in parallel as background jobs, with multimodal Gemini nodes.',
    stack: ['Next.js', 'TypeScript', 'PostgreSQL', 'Trigger.dev'],
    repo: 'https://github.com/kh-bikash/NextFlow',
    live: 'https://next-flow-sooty.vercel.app',
  },
  {
    name: 'ML Inspector Suite',
    summary:
      'QA platform for LLM and RAG systems — 8 tools including a RAG debugger, prompt regression tester and bias auditor, with 100% schema-validated outputs and MLflow tracking.',
    stack: ['TypeScript', 'React', 'Llama 3.1 70B', 'Zod', 'MLflow'],
    repo: 'https://github.com/kh-bikash/MLSuite',
  },
  {
    name: 'pr-review-me',
    summary:
      'pip-installable GitHub PR reviewer that runs three parallel LangGraph agents for security, performance and code quality.',
    stack: ['Python', 'LangGraph', 'FastAPI'],
    repo: 'https://github.com/kh-bikash/pr_agent',
    live: 'https://pypi.org/project/pr-review-me/',
  },
  {
    name: 'MonsoonRelief',
    summary:
      'OpenEnv-compliant multi-objective RL environment for disaster response with a 3-tier programmatic grader. Zero-shot Llama-3.3-70B scored 2.50 / 3.00.',
    stack: ['Python', 'Pydantic', 'Docker', 'OpenEnv'],
    repo: 'https://github.com/kh-bikash/MonsoonRelief-OpenEnv',
  },
]

export const skills = [
  ['Languages', 'Python, TypeScript, JavaScript, SQL, Java, C++'],
  ['LLM & Agents', 'LangChain, LangGraph, LlamaIndex, RAG, multi-agent systems, tool calling, structured outputs, evaluation'],
  ['ML & Data', 'PyTorch, Hugging Face, scikit-learn, fine-tuning, ChromaDB, Pinecone, MLflow, Pandas'],
  ['Backend & Cloud', 'FastAPI, Next.js, React, PostgreSQL, Redis, Supabase, Docker, GitHub Actions, AWS, GCP, Azure AI'],
]

export const recognition = [
  { label: 'Publication', text: 'ReflexCube: A No-Code AI Platform Architecture for LLM Application Development (co-author, 2026)' },
  { label: 'Certifications', text: 'Microsoft Azure AI Apps & Agents Developer Associate · SAP Generative AI Developer · OCI Architect Associate · Salesforce AI Associate' },
  { label: 'Competitive programming', text: '700+ DSA problems · LeetCode 321 solved · CodeChef 4★' },
]

// Shown when the GitHub API is unavailable (rate limit, offline).
// Also supplies descriptions for repos that don't have one on GitHub.
export const repoNotes: Record<string, string> = {
  baxeli: 'Flight recorder for coding agents — rewind any run and fork a new micro-VM from that moment.',
  agentcart: 'Policy-gated AI commerce: lets autonomous agents buy from a Razorpay merchant without uncontrolled access to money.',
  novuagent: 'Incident decision workflow that routes critical alerts, captures human approval and closes the loop.',
  'pep-graph': 'Knowledge graph of 20 years of Python concurrency PEPs, used to reason over new proposals.',
  qsend: 'Agent that vaults OAuth via Arcade and turns Gmail, Slack and Docs into tasks.',
  cutit: 'Claude Code skills for cutting LLM token usage on agentic work without losing quality.',
}

export const hiddenRepos = new Set(['kh-bikash', 'neetcode-submissions', 'portfolio'])

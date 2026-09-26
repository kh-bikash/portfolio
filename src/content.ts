// All portfolio copy lives here. Keep it in sync with the resume and LinkedIn.

export const profile = {
  name: 'Khundrakpam Bikash Meitei',
  role: 'AI Engineer',
  headline: 'I build AI agents that leave the demo and go to work.',
  intro:
    'Forward-deployed AI engineer. I turn messy business processes into LLM agent systems — with tool calling, retrieval and evaluation built in — and ship them to production.',
  status: 'Open to AI engineering roles',
  location: 'India',
  email: 'khbikash17@gmail.com',
  github: 'https://github.com/kh-bikash',
  githubUser: 'kh-bikash',
  linkedin: 'https://www.linkedin.com/in/khundrakpam-bikash-meitei-5544ba298/',
  resume: '/Khundrakpam_Bikash_Meitei_Resume.pdf',
}

export type Project = {
  name: string
  kind: string
  summary: string
  stack: string[]
  repo: string
  live?: string
  image?: string
}

export const featured: Project[] = [
  {
    name: 'ReflexCube',
    kind: 'No-code AI platform',
    summary:
      'Prompt → train → version → predict, across 15 domain agents. Subprocess-isolated ML workers keep inference at 200 ms on 10K+ row datasets. Backed by a co-authored paper.',
    stack: ['FastAPI', 'PyTorch', 'LangChain', 'React'],
    repo: 'https://github.com/kh-bikash/Reflex-Cube',
    live: 'https://reflex-cube.vercel.app',
    image: '/work/reflexcube.webp',
  },
  {
    name: 'Baxel Replay',
    kind: 'Agent tooling',
    summary:
      'A flight recorder for coding agents. Captures the whole machine — files, commands, tests — so you can rewind to any checkpoint and fork a new micro-VM from there.',
    stack: ['TypeScript', 'Blaxel', 'Micro-VMs'],
    repo: 'https://github.com/kh-bikash/baxeli',
    image: '/work/baxeli.webp',
  },
  {
    name: 'AgentCart',
    kind: 'Agentic commerce',
    summary:
      'A policy-gated gateway that lets AI agents buy from Razorpay merchants. Every money action is permissioned, policy-checked and logged as evidence.',
    stack: ['Python', 'FastAPI', 'Razorpay'],
    repo: 'https://github.com/kh-bikash/agentcart',
    live: 'https://agentcart-razorpay.vercel.app',
    image: '/work/agentcart.webp',
  },
  {
    name: 'Beacon',
    kind: 'Incident workflow',
    summary:
      'Routes critical alerts to the right on-call engineer with Novu, captures a human decision, and closes the loop.',
    stack: ['JavaScript', 'Novu'],
    repo: 'https://github.com/kh-bikash/novuagent',
    image: '/work/novuagent.webp',
  },
  {
    name: 'Sitaara Verify',
    kind: 'Document AI',
    summary:
      'Multilingual OCR and verification for Indian land records. Handles printed and handwritten scripts, and holds low-confidence lines for human review.',
    stack: ['Next.js', 'Gemini', 'OpenStreetMap'],
    repo: 'https://github.com/kh-bikash/sitaraverify',
    live: 'https://sitaraverify.vercel.app',
    image: '/work/sitaraverify.webp',
  },
]

export const moreProjects: Project[] = [
  {
    name: 'NextFlow',
    kind: 'Visual AI workflow engine',
    summary: 'DAG executor that runs independent branches in parallel as background jobs.',
    stack: ['Next.js', 'Trigger.dev'],
    repo: 'https://github.com/kh-bikash/NextFlow',
    live: 'https://next-flow-sooty.vercel.app',
  },
  {
    name: 'ML Inspector Suite',
    kind: 'LLM & RAG QA',
    summary: 'Eight QA tools for LLM systems with schema-validated outputs and MLflow tracking.',
    stack: ['TypeScript', 'Zod', 'MLflow'],
    repo: 'https://github.com/kh-bikash/MLSuite',
  },
  {
    name: 'pr-review-me',
    kind: 'Open source',
    summary: 'pip-installable PR reviewer running three parallel LangGraph agents.',
    stack: ['Python', 'LangGraph'],
    repo: 'https://github.com/kh-bikash/pr_agent',
    live: 'https://pypi.org/project/pr-review-me/',
  },
  {
    name: 'MonsoonRelief',
    kind: 'RL environment',
    summary: 'Disaster-response environment for LLM agents with a 3-tier programmatic grader.',
    stack: ['Python', 'OpenEnv'],
    repo: 'https://github.com/kh-bikash/MonsoonRelief-OpenEnv',
  },
]

export const experience = [
  {
    period: '2026 — Now',
    company: 'Handshake',
    role: 'AI Specialist',
    note: 'Hardening agentic coding benchmarks and evaluating ChatGPT, Claude and DeepSeek.',
  },
  {
    period: '2026',
    company: 'Build Fast with AI',
    role: 'AI Engineer Intern',
    note: 'LLM agent pipelines for 3+ client businesses — 60–95% less manual effort.',
  },
  {
    period: '2026',
    company: 'Bot Point',
    role: 'AI/ML Intern',
    note: 'Agents serving 1K+ queries a day with 30% higher accuracy.',
  },
]

export const about = [
  "I'm Bikash, a computer science student at KL University (CGPA 9.32, class of 2027). I like working close to the people who'll use what I build — sitting with a manual process, then replacing it with an agent that actually holds up in production.",
  'Along the way I co-authored a paper on ReflexCube, published pr-review-me on PyPI, and solved 700+ DSA problems (CodeChef 4★).',
]

export const toolkit = 'Python · TypeScript · LangChain · LangGraph · RAG · FastAPI · Next.js · PyTorch · PostgreSQL · Docker · AWS · GCP · Azure AI'

export const certifications = 'Azure AI Apps & Agents Developer · SAP Generative AI Developer · OCI Architect Associate · Salesforce AI Associate'

// Shown when the GitHub API is unavailable, and used for repos without a description.
export const repoNotes: Record<string, string> = {
  'pep-graph': 'Knowledge graph of 20 years of Python concurrency PEPs, used to reason over new proposals.',
  qsend: 'Agent that vaults OAuth via Arcade and turns Gmail, Slack and Docs into tasks.',
  cutit: 'Claude Code skills for cutting LLM token usage on agentic work without losing quality.',
}

// Repos already shown above, or not worth listing.
export const hiddenRepos = new Set([
  'kh-bikash', 'neetcode-submissions', 'portfolio',
  ...[...featured, ...moreProjects].map(p => p.repo.split('/').pop()!),
])

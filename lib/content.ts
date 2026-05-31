/**
 * Site content — derived from the real GitHub profile (github.com/soumya0424)
 * and the positioning brief. Voice: a Computer Science graduate who builds ML
 * systems end to end, looking for an AI Engineer role now and building toward
 * founding a company later. Confident and concrete — not a hobbyist.
 */

export const SOCIALS = {
  github: 'https://github.com/soumya0424',
  email: 'mailto:soumyanaiya0424@gmail.com',
  linkedin: 'https://www.linkedin.com/in/soumya-naiya',
} as const;

/**
 * Hero terminal content. Pixel-art logo sits on the left; ASCII name + two
 * `>`-prefixed paragraph blocks (about_me, interests) sit on the right.
 * Role / languages / tooling are intentionally omitted here — they live in the
 * Tech Stack section.
 */
export const TERMINAL_BLOCKS: { cmd: string; paragraph: string }[] = [
  {
    cmd: 'about_me',
    paragraph:
      "I'm Soumya Naiya, a Computer Science graduate who builds machine learning systems end to end — from raw data and experiments to models that are explainable and actually deployed. I care about the whole path: getting a model to work, making its decisions understandable, and shipping it as something real rather than a notebook that never leaves my laptop.",
  },
  {
    cmd: 'interests',
    paragraph:
      "Outside of work I'm a gym regular and a relentless nerd. A lot of my downtime goes into YouTube — DIY PC and home-server builds, people setting up and running local LLMs, Linux, and tech news. I love seeing how other builders put their systems together, and it's where a lot of my own ideas start.",
  },
];

export type Skill = {
  id: string;
  label: string;
  group: 'language' | 'ml' | 'tools' | 'design';
  description: string;
  proficiency: number; // 0..100
  usage: string;
};

export const SKILLS: Skill[] = [
  {
    id: 'python',
    label: 'Python',
    group: 'language',
    description: 'My primary language across modeling, data work, and services.',
    proficiency: 92,
    usage: 'Model training, data pipelines, backend logic.',
  },
  {
    id: 'scikit',
    label: 'Scikit-learn',
    group: 'ml',
    description: 'Classical ML — pipelines, classification, evaluation.',
    proficiency: 86,
    usage: 'News classification, baselines, applied ML projects.',
  },
  {
    id: 'pandas',
    label: 'Pandas',
    group: 'ml',
    description: 'Data wrangling and feature engineering at speed.',
    proficiency: 88,
    usage: 'Cleaning, EDA, building training datasets.',
  },
  {
    id: 'numpy',
    label: 'NumPy',
    group: 'ml',
    description: 'Vectorized numerical computing under every model.',
    proficiency: 86,
    usage: 'Array math, preprocessing, custom metrics.',
  },
  {
    id: 'docker',
    label: 'Docker',
    group: 'tools',
    description: 'Containerizing apps so they run the same everywhere.',
    proficiency: 80,
    usage: 'Packaging Python services for reproducible deploys.',
  },
  {
    id: 'git',
    label: 'Git',
    group: 'tools',
    description: 'Version control and disciplined collaboration.',
    proficiency: 88,
    usage: 'Branching, reviews, every project I ship.',
  },
  {
    id: 'jupyter',
    label: 'Jupyter',
    group: 'tools',
    description: 'Where I prototype, measure, and validate ideas.',
    proficiency: 86,
    usage: 'Experiments, analysis, research notebooks.',
  },
  {
    id: 'figma',
    label: 'Figma',
    group: 'design',
    description: 'Designing interfaces and product flows before I build.',
    proficiency: 72,
    usage: 'Product UI, prototypes, design systems.',
  },
];

export type Project = {
  id: string;
  name: string;
  tagline: string;
  domain: string;
  tech: string[];
  /** Mind-map node ids this project lights up. */
  nodes: string[];
  overview: string;
  challenges: string[];
  outcomes: string[];
  repo: string;
  /** Featured on the main projects section (vs. explorer-only). */
  pinned: boolean;
};

export const PROJECTS: Project[] = [
  {
    id: 'aneurysm',
    name: 'Aneurysm',
    tagline: 'Clinical-grade detection of brain aneurysms',
    domain: 'Medical AI',
    tech: ['Python', 'Deep Learning', 'Scikit-learn', 'NumPy'],
    nodes: ['ai', 'dl', 'ds'],
    overview:
      'A machine learning system that detects and localizes cerebral aneurysms in medical imaging, built for the RSNA 2025 Intracranial Aneurysm Detection Challenge. It pairs predictions with risk stratification and interpretability so the output is clinically meaningful, not just a score.',
    challenges: [
      'Detecting and localizing aneurysms across high-variance medical scans.',
      'Designing evaluation around sensitivity, where a miss is costly.',
      'Adding interpretability so predictions are auditable.',
    ],
    outcomes: [
      'End-to-end detection and localization pipeline in Python.',
      'Risk stratification layered on top of raw predictions.',
      'Reproducible structure aligned with a real ML competition.',
    ],
    repo: 'https://github.com/soumya0424/Aneurysm',
    pinned: true,
  },
  {
    id: 'global-news',
    name: 'Global-News',
    tagline: 'News classification that explains itself',
    domain: 'NLP · Explainable AI',
    tech: ['Python', 'Scikit-learn', 'LIME', 'Pandas'],
    nodes: ['ai', 'ml', 'xai'],
    overview:
      'A news-classification system that does not stop at a label. Using LIME, it surfaces the exact tokens driving every decision, turning a black-box classifier into something a human can inspect and trust.',
    challenges: [
      'Making opaque model decisions human-readable.',
      'Holding accuracy while adding interpretability.',
      'Normalizing noisy, real-world article text.',
    ],
    outcomes: [
      'Classification pipeline with per-prediction LIME explanations.',
      'Visual breakdowns of why each article was categorized.',
      'A template for trustworthy content systems.',
    ],
    repo: 'https://github.com/soumya0424/Global-News',
    pinned: true,
  },
  {
    id: 'my-docker-app',
    name: 'my-docker-app',
    tagline: 'Taking a Python service from laptop to container',
    domain: 'Backend · Infra',
    tech: ['Docker', 'Python', 'Backend'],
    nodes: ['docker', 'backend', 'ai'],
    overview:
      'A containerized Python application that proves the last mile of ML work: getting something off a notebook and into a reproducible, deployable container that runs identically anywhere.',
    challenges: [
      'Building a small, reproducible image.',
      'Separating configuration from code cleanly.',
      'Keeping local and deployed behavior identical.',
    ],
    outcomes: [
      'Dockerized Python service with a clean build.',
      'Reproducible environment across machines.',
      'A deployable template I reuse for new services.',
    ],
    repo: 'https://github.com/soumya0424/my-docker-app',
    pinned: true,
  },
  {
    id: 'ai-ml',
    name: 'AI-ML',
    tagline: 'A working lab of ML experiments',
    domain: 'Machine Learning',
    tech: ['Jupyter', 'Scikit-learn', 'Pandas', 'NumPy'],
    nodes: ['ml', 'ds', 'ai'],
    overview:
      'A hands-on collection of machine learning notebooks spanning data analysis, classical algorithms, and real-world datasets — the place where ideas get prototyped and measured before they become full projects.',
    challenges: [
      'Keeping many experiments organized and comparable.',
      'Writing notebooks that read as clear research.',
      'Moving fast without losing reproducibility.',
    ],
    outcomes: [
      'A structured, growing set of ML experiments.',
      'Reusable analysis and visualization patterns.',
      'A reliable path from idea to validated approach.',
    ],
    repo: 'https://github.com/soumya0424/AI-ML',
    pinned: false,
  },
  {
    id: 'codsoft',
    name: 'CodSoft',
    tagline: 'Applied ML across real-world problems',
    domain: 'Applied ML',
    tech: ['Python', 'Scikit-learn', 'Pandas', 'NumPy'],
    nodes: ['ml', 'ds'],
    overview:
      'A set of machine learning projects built during the CodSoft program, each tackling a distinct real-world classification or prediction problem with structured datasets and scikit-learn pipelines.',
    challenges: [
      'Adapting to several distinct problem domains.',
      'Building clean, repeatable scikit-learn pipelines.',
      'Delivering working solutions on a schedule.',
    ],
    outcomes: [
      'Multiple end-to-end ML solutions across domains.',
      'Consistent pipeline and evaluation practices.',
      'Practical experience shipping applied ML.',
    ],
    repo: 'https://github.com/soumya0424/CodSoft',
    pinned: false,
  },
  {
    id: 'e-heritage',
    name: 'E-Heritage',
    tagline: 'A full-stack cultural travel platform',
    domain: 'Full-Stack Product',
    tech: ['Node.js', 'Express', 'MongoDB', 'JavaScript'],
    nodes: ['backend', 'product'],
    overview:
      'A travel web application for discovering heritage sites and planning trips — built full-stack with Node, Express, and MongoDB. The project where I practiced thinking like a product builder, not just a model trainer.',
    challenges: [
      'Designing a data model for places, routes, and users.',
      'Wiring a full client–server–database stack.',
      'Turning a product idea into something usable.',
    ],
    outcomes: [
      'Working full-stack app with map-based discovery.',
      'REST API backed by MongoDB.',
      'Hands-on product and backend experience.',
    ],
    repo: 'https://github.com/soumya0424/E-Heritage',
    pinned: false,
  },
];

export type MindNode = {
  id: string;
  label: string;
  /** Normalized position on the canvas (0..1). */
  x: number;
  y: number;
};

export const MIND_NODES: MindNode[] = [
  { id: 'ai', label: 'AI', x: 0.5, y: 0.16 },
  { id: 'ml', label: 'Machine Learning', x: 0.22, y: 0.34 },
  { id: 'dl', label: 'Deep Learning', x: 0.78, y: 0.32 },
  { id: 'xai', label: 'Explainability', x: 0.86, y: 0.62 },
  { id: 'ds', label: 'Data Science', x: 0.16, y: 0.64 },
  { id: 'docker', label: 'Docker', x: 0.72, y: 0.84 },
  { id: 'backend', label: 'Backend', x: 0.44, y: 0.86 },
  { id: 'product', label: 'Product', x: 0.5, y: 0.52 },
];

export const MIND_EDGES: [string, string][] = [
  ['ai', 'ml'],
  ['ai', 'dl'],
  ['ml', 'ds'],
  ['ml', 'xai'],
  ['dl', 'docker'],
  ['docker', 'backend'],
  ['backend', 'product'],
  ['ds', 'product'],
  ['ai', 'product'],
  ['dl', 'xai'],
];

export const NAV_SECTIONS = [
  { id: 'home', label: 'Home' },
  { id: 'stack', label: 'Stack' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
] as const;

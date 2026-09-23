/**
 * PORTFOLIO DATA CONFIGURATION
 * 
 * 💡 MANUAL DATA ENTRY IN CODE:
 * You can directly add, edit, or remove skills and projects right here in this file!
 * Every change you make in this code is instantly rendered on the website.
 * 
 * 📁 ADDING MEDIA / ATTACHMENTS FOR SKILL WORKS:
 * - codeUrl: link to GitHub repository or code snippet (shows [Code] button)
 * - pdfUrl: link to PDF document or file in public/ (shows [PDF] button)
 * - picUrl: link or path to picture/image (shows [Pic] button)
 * - vidUrl: link to YouTube, Vimeo, or video URL (shows [Vid] button)
 * ⚠️ If an attachment is not provided (or left empty), that button is NOT displayed!
 * 
 * 🚀 ADDING PROJECTS:
 * - code: link to GitHub code
 * - live: link to live deployment or demo
 * ⚠️ No images in projects as requested!
 */

export interface SkillWorkItem {
  id: string;
  title: string;
  description?: string;
  // Optional attachments: only shown if you provide them here!
  codeUrl?: string; // Code repository or snippet URL
  pdfUrl?: string;  // PDF document URL (e.g. '/resume.pdf' or external link)
  picUrl?: string;  // Picture / Image URL (e.g. '/mypng.png' or web link)
  vidUrl?: string;  // Video URL (e.g. YouTube, Vimeo, MP4)
}

export interface SkillItem {
  id: string;
  name: string;
  emoji?: string;
  percentage?: number;
  worksDone?: string;
  category?: string;
  color?: string;
  items?: SkillWorkItem[]; // Things what I did in this skill
}

export interface ProjectItem {
  id: string;
  title: string;
  category?: string;
  description: string;
  live?: string;     // Live URL
  link?: string;     // (alias for live)
  code?: string;     // Code / GitHub URL
  github?: string;   // (alias for code)
  tags?: string[];
  featured?: boolean;
}

export interface CertificateItem {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialId?: string;
  pdfUrl?: string;     // Document or certificate PDF (e.g. '/resume.pdf')
  picUrl?: string;     // Certificate image (e.g. '/mypng.png')
  verifyUrl?: string;  // Online verification URL
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  location?: string;
  badge?: string;
  description: string;
  achievements: string[];
  skillsUsed: string[];
  certificates?: CertificateItem[];
}

export interface ResumeData {
  url: string;         // Path to your resume file (e.g. '/resume.pdf')
  lastUpdated: string; // Display date
  summary: string;     // Short professional summary
  downloadName: string;// File download filename
}

/**
 * =========================================================================
 * 🛠️ SKILLS DATA (Edit your skills and "things I did" below)
 * =========================================================================
 */
export const skillsData: SkillItem[] = [
  {
    id: 'art',
    name: 'ART',
    emoji: '🎨',
    percentage: 79,
    category: 'art',
    color: 'from-teal-400 to-emerald-400',
    
  },
  {
    id: 'film-making',
    name: 'FILM MAKING',
    emoji: '🎬',
    percentage: 88,
    worksDone: '6+ Directed Short Films & Cinematic Vignettes',
    category: 'cinema',
    color: 'from-cyan-400 to-blue-500'
    
  },
  {
    id: 'editing',
    name: 'EDITING',
    emoji: '✂️',
    percentage: 55,
    worksDone: '40+ Commercial Reels & Narrative Video Projects',
    category: 'editing',
    color: 'from-emerald-400 to-teal-500',
    items: [
      {
        id: 'edit-1',
        title: 'Kinetic Fashion Commercial & Sound Design Cut',
        description: 'Fast-paced multi-cam rhythmic cut synced precisely to custom percussive stems.',
        vidUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', // Uploaded video
      },
    ],
  },
  
  {
    id: 'vibe-coding',
    name: 'VIBE CODING',
    emoji: '💻',
    percentage: 97,
    worksDone: '30+ Interactive Applications & Ambient Web Experiences',
    category: 'coding',
    color: 'from-cyan-400 to-teal-400',
    
  },
  {
    id: 'music',
    name: 'MUSIC',
    emoji: '🎵',
    percentage: 84,
    worksDone: '12+ Original Lo-Fi Tracks & Ambient Soundscapes',
    category: 'music',
    color: 'from-blue-400 to-cyan-500',
   
  },
  {
    id: 'story-writing',
    name: 'STORY WRITING',
    emoji: '✍️',
    percentage: 60,
    worksDone: '8+ Screenplays, World Lore & Narrative Arcs',
    category: 'writing',
    color: 'from-emerald-400 to-blue-400',
    items: [
      {
        id: 'BASHA',
        title: '"LOVE STORY OF TWO DIFFERENT LANGUAGES" (Screenplay)',
        description: 'A bilingual feature-length screenplay exploring cross-cultural romance and linguistic identity.',
        pdfUrl: 'public/basha.pdf', // Uploaded PDF screenplay
      },
      {
        id: 'NENU',
        title: '"story of a girl" (Screenplay)',
        description: 'A dramatic feature-length screenplay exploring the family drama.',
        pdfUrl: 'public/NENU.pdf', // Uploaded PDF screenplayc
      },
    ],
  },

  /* 
   * 💡 HOW TO ADD A NEW SKILL CARD:
   * Simply copy, paste and uncomment the block below inside `skillsData`:
   *
  {
    id: 'my-new-skill',
    name: 'Game Development',
    emoji: '🎮',
    category: 'Engineering',
    percentage: 90,
    worksDone: 'Built 3 playable game prototypes and physics engines',
    color: 'from-purple-500 to-indigo-400',
    items: [
      {
        id: 'game-1',
        title: 'Dungeon Crawler 2D',
        description: 'Procedural dungeon generation using cellular automata.',
        codeUrl: 'https://github.com/sumanth/dungeon-crawler',
        vidUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      }
    ]
  },
  */
];

/**
 * =========================================================================
 * 🚀 PROJECTS DATA (Edit your GitHub projects and live links below)
 * =========================================================================
 * Direct live and code options as requested — zero images!
 * Any new object added here AUTOMATICALLY creates a new card on the webpage!
 */
export const projectsData: ProjectItem[] = [
  
  {
    id: 'calculator-app',
    title: 'Calculator App',
    category: 'Interactive Web Application',
    description:
      'A sleek, responsive dark-themed vanilla JavaScript calculator application featuring instant computation, keyboard shortcuts, equation history, and zero external runtime dependencies.',
    live: 'https://issumanth.github.io/calc/',
    code: 'https://github.com/issumanth/calc',
    tags: ['Vanilla JS', 'HTML5', 'CSS3 Grid', 'Keyboard Shortcuts'],
    featured: true,
  },
  { id: 'ONLINE DELIVERY APP', title: 'Online Delivery App', category: 'Full-Stack Application', description: 'A comprehensive online delivery platform connecting customers with local vendors.', live: 'https://issumanth.github.io/gowtham-meals/', code: 'https://github.com/issumanth/gowtham-meals.git', tags: ['React', 'TypeScript', 'Node.js', 'Tailwind'], },

  /*
   * 💡 HOW TO ADD A NEW PROJECT CARD:
   * Simply copy, paste and uncomment the block below inside `projectsData`:
   *
  {
    id: 'my-new-project',
    title: 'AI Image Studio',
    category: 'Full-Stack Application',
    description: 'Generative media workspace allowing artists to create and upscale concepts in real-time.',
    live: 'https://my-demo-link.com',
    code: 'https://github.com/sumanth/ai-image-studio',
    tags: ['React', 'TypeScript', 'Node.js', 'Tailwind'],
  },
  */
];

// Aliases for backwards compatibility if needed
export const initialSkills = skillsData;
export const initialProjects = projectsData;

/**
 * =========================================================================
 * 📄 RESUME CONFIGURATION
 * =========================================================================
 * Put your resume file in public/ (e.g. public/resume.pdf) and reference it here.
 * You can easily update the link or download filename anytime!
 */
export const resumeData: ResumeData = {
  url: '/resume.pdf',
  lastUpdated: 'September 2026',
  summary: 'Multidisciplinary Creative Developer, Film Director & Interactive Storyteller',
  downloadName: 'Sumanth_Creative_Developer_Resume.pdf',
};

/**
 * =========================================================================
 * 💼 WORK EXPERIENCE & CERTIFICATES DATA
 * =========================================================================
 * Add, edit, or remove your career milestones and certificates below!
 * Every new entry or certificate automatically renders with animations.
 */
export const experienceData: ExperienceItem[] = [
  {
    id: 'fullstack web developer internship',
    role: 'Creative Frontend Developer & UI Director',
    company: 'CONQUERORS SOFTWARE TECHNOLOGIES',
    period: '2026 march - 2026 april',
    location: 'Remote',
    badge: ' full stack webdeveloper Role',
    description:
      'Designing living, breathing web applications, sensory cursor physics, and kinetic interfaces that merge cinematic pacing with modern frontend engineering.',
    achievements: [
      'Architected custom fluid particle & gooey jelly interactive algorithms with 60fps GPU acceleration',
      'Engineered accessible, responsive React & TypeScript single-page applications with Tailwind CSS',
      'Directed visual design systems, typographic hierarchies, and expressive dark-mode color palettes',
    ],
    skillsUsed: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Web Physics', 'UI/UX'],
    certificates: [
      {
        id: 'cert-frontend-specialist',
        title: ' Frontend Developer Specialization',
        issuer: 'CONQUERORS SOFTWARE TECHNOLOGIES',
        date: '2026',
        credentialId: '-FE-99482',
        pdfUrl: 'public/conquerors intern cert.pdf',
        verifyUrl: 'https://coursera.org',
      },
      
    ],
  },
];


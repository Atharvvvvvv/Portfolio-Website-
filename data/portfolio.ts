export const portfolio = {
  name: "Atharv Singh Jadon",
  nameShort: "Atharv",
  role: "Software Engineer",
  tagline: "I build systems that think.",
  bio: "Software Engineer and AI & ML undergraduate who turns complex problems into clean, maintainable solutions. Focused on modern web engineering, intelligent systems, and the intersection of both.",
  resumeUrl: "/resume.pdf",

  social: {
    github: "https://github.com/atharvsinghjadon",
    linkedin: "https://linkedin.com/in/atharvsinghjadon",
    twitter: "https://x.com/atharvsinghjadon",
    email: "atharv@example.com",
  },

  navigation: [
    { label: "Home", href: "#hero" },
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Work", href: "#showcase" },
    { label: "Contact", href: "#contact" },
  ],

  about: {
    eyebrow: "About Me",
    heading: "Engineer by craft,\ncurious by nature.",
    intro:
      "I'm Atharv — a software engineer and AI & ML undergraduate who enjoys the full stack, from designing clean APIs to building the interfaces people actually use.",
    bio: "My journey started with competitive programming and evolved into a deep interest in how intelligent systems are built and deployed at scale. I care about code that's readable, systems that are resilient, and products that feel effortless. When I'm not building, I'm reading papers, contributing to open source, or mentoring junior developers.",
    location: "Jaipur, Rajasthan, India",
    education: {
      degree: "B.Tech in Artificial Intelligence & Machine Learning",
      institution: "Poornima Institute of Engineering & Technology",
      year: "2023 – 2027",
    },
    currentRole: "Freelance Software Engineer",
    availability: "Open to opportunities",
    techStack: [
      "TypeScript",
      "React",
      "Next.js",
      "Node.js",
      "Python",
      "FastAPI",
      "PostgreSQL",
      "Redis",
      "Docker",
      "LangChain",
      "PyTorch",
      "Git",
    ],
    stats: [
      { label: "Years Coding", value: "4+", description: "since age 16" },
      {
        label: "Projects Built",
        value: "20+",
        description: "shipped & maintained",
      },
      { label: "Technologies", value: "30+", description: "across the stack" },
      { label: "GitHub Commits", value: "800+", description: "and counting" },
    ],
    resumeButtonText: "Download Resume",
  },

  skills: {
    eyebrow: "Skills",
    heading: "What I build\nwith.",
    intro:
      "A pragmatic toolkit built from shipping real projects. No inflated ratings — just honest, hands-on experience across the full stack.",
    categories: [
      {
        key: "languages",
        label: "Languages",
        icon: "Code2" as const,
        items: ["Python", "Java", "JavaScript", "C++", "SQL"],
      },
      {
        key: "frontend",
        label: "Frontend",
        icon: "Globe" as const,
        items: ["HTML", "CSS", "React", "Next.js", "Tailwind CSS"],
      },
      {
        key: "backend",
        label: "Backend",
        icon: "Server" as const,
        items: ["Django", "Spring Boot", "Node.js"],
      },
      {
        key: "aiMl",
        label: "AI / Machine Learning",
        icon: "Brain" as const,
        items: ["TensorFlow", "PyTorch", "Keras", "Scikit-learn"],
      },
      {
        key: "databases",
        label: "Databases",
        icon: "Database" as const,
        items: ["MySQL"],
      },
      {
        key: "tools",
        label: "Tools & Platforms",
        icon: "Wrench" as const,
        items: ["Git", "GitHub", "Linux", "VS Code"],
      },
    ],
  },

  // ─── Projects & Certifications Showcase ─────────────────────────────────────
  showcase: {
    eyebrow: "Portfolio",
    heading: "Projects &\nCertifications.",
    intro:
      "A collection of projects I've built and certifications that showcase my learning journey.",
    items: [
      {
        id: "proj-1",
        type: "project",
        title: "Intelligent Portfolio",
        description: "A highly interactive, modern web portfolio built with Next.js, Framer Motion, and Tailwind CSS. Features subtle animations and a responsive design.",
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1000",
        tags: ["Next.js", "TypeScript", "Tailwind", "Framer Motion"],
        github: "https://github.com/atharvsinghjadon",
        demo: "https://example.com",
        featured: true,
      },
      {
        id: "cert-1",
        type: "certificate",
        title: "Machine Learning Specialization",
        issuer: "Stanford University & DeepLearning.AI",
        date: "December 2023",
        image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1000",
        tags: ["Python", "TensorFlow", "Neural Networks"],
        certificate: "https://coursera.org/verify/...",
        featured: true,
      }
    ] as Array<{
      id: string;
      type: "project" | "certificate";
      title: string;
      description?: string;
      image: string;
      tags: string[];
      github?: string;
      demo?: string;
      certificate?: string;
      issuer?: string;
      date?: string;
      featured?: boolean;
    }>,
  },

  // ─── Contact ─────────────────────────────────────────────────────────────────
  // Section copy only — the email address lives in portfolio.social.email.
  contact: {
    eyebrow: "Get in touch",
    heading: "Contact",
    intro:
      "Interested in collaborating, discussing an opportunity, or just saying hello? Feel free to reach out by email.",
    buttonText: "Email Me",
  },
};

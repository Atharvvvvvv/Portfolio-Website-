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
    email: "jadonatharv1@gmail.com",
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
    bio: "My journey started with competitive programming and evolved into a deep interest in how intelligent systems are built and deployed at scale. I care about code that's readable, systems that are resilient, and products that feel effortless.",
    education: {
      degree: "B.Tech in Artificial Intelligence & Machine Learning",
      institution: "Amity University Gwalior",
      year: "2024 – 2028",
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
      { value: "Python", label: "Primary Language", description: "Backend & AI projects" },
      {
        value: "Django",
        label: "Backend Framework",
        description: "REST & Web Applications",
      },
      { value: "AI/ML", label: "Specialization", description: "TensorFlow & Scikit-learn" },
      { value: "Open Source", label: "Learning Journey", description: "GitHub portfolio" },
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
        items: ["Git", "GitHub", "Linux", "VS Code", "IntelliJ"],
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
        title: "AI-Powered PDF Summarizer",
        description: "An intelligent application that extracts, analyzes, and summarizes content from PDF documents.",
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1000",
        tags: ["Python", "NLP", "Machine Learning"],
        github: "https://github.com/Atharvvvvvv/AI-Powered-PDF-Summarizer",
        demo: "https://github.com/Atharvvvvvv/AI-Powered-PDF-Summarizer",
        featured: true,
      },
      {
        id: "proj-2",
        type: "project",
        title: "Inamigos Foundation Website",
        description: "A modern, responsive awareness website built during an internship to showcase the mission, projects, and social impact of the Inamigos Foundation.",
        image: "/projects/inamigos.png",
        tags: ["HTML", "CSS", "Responsive Design"],
        github: "https://github.com/Atharvvvvvv/Inamigos-Website",
        demo: "https://github.com/Atharvvvvvv/Inamigos-Website",
        featured: true,
      },
      {
        id: "cert-1",
        type: "certificate",
        title: "45 Days of Code 2024",
        issuer: "Amity Coding Club",
        date: "2024",
        image: "/certificates/45_days_of_code.jpg",
        tags: ["Programming", "Coding Challenge"],
        certificate: "/certificates/45_days_of_code.pdf",
        featured: true,
      },
      {
        id: "cert-2",
        type: "certificate",
        title: "Natural Language Processing (NLP) and Text Mining Tutorial for Beginners",
        issuer: "Simplilearn",
        date: "June 2, 2026",
        image: "/certificates/nlp_certificate.jpg",
        tags: ["NLP", "Text Mining"],
        certificate: "/certificates/nlp_certificate.pdf",
        featured: true,
      },
      {
        id: "cert-3",
        type: "certificate",
        title: "Introduction to Deep Learning",
        issuer: "Infosys Springboard",
        date: "April 4, 2026",
        image: "/certificates/intro_to_deep_learning.jpg",
        tags: ["Deep Learning"],
        certificate: "/certificates/intro_to_deep_learning.pdf",
        featured: true,
      },
      {
        id: "cert-4",
        type: "certificate",
        title: "Web Development Internship",
        issuer: "InAmigos Foundation",
        date: "July 23, 2026",
        image: "/certificates/inamigos.jpg",
        tags: ["Web Development", "Internship"],
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

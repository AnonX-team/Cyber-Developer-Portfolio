
import React from 'react';
import { Shield, Code, Brain, Globe, Database, Terminal, Briefcase, GraduationCap } from 'lucide-react';
import { Project, Skill, Experience } from './types';

export const BIO = {
  name: "Adil Khan",
  role: "Website Developer & Cybersecurity Enthusiast",
  email: "muhammadadilkhan.cybersecurity@stmu.edu.pk",
  summary: "Passionate developer with hands-on experience in building modern, responsive, and secure websites. Focused on clean design, fast performance, and user-friendly layouts with a core emphasis on cybersecurity.",
  cehStatus: "Certified Ethical Hacker (CEH)",
  linkedin: "https://pk.linkedin.com/in/adil-khan-2b1757255",
  education: {
    degree: "BS in Cyber Security",
    university: "Shifa Tameer-e-Millat University",
    areas: ["Web Development", "Cyber Security", "Artificial Intelligence", "Java (OOP)", "SQL", "System Design"]
  }
};

export const SKILLS: Skill[] = [
  {
    category: "Development",
    icon: "Code",
    items: ["HTML/CSS", "JavaScript", "Java", "React", "Tailwind CSS"]
  },
  {
    category: "Security",
    icon: "Shield",
    items: ["Ethical Hacking (CEH)", "Secure Web Design", "Application Security", "System Hardening"]
  },
  {
    category: "Data & Systems",
    icon: "Database",
    items: ["SQL", "OOP (Java)", "System Design", "Automation"]
  },
  {
    category: "Business IT",
    icon: "Briefcase",
    items: ["Technical Planning", "Digital Presence", "Business Operations", "Content Creation"]
  }
];

export const EXPERIENCES: Experience[] = [
  {
    role: "Co-Founder and CFO",
    company: "Cybernytron",
    period: "Present",
    description: [
      "Handling technical planning and security architecture.",
      "Managing business operations and financial strategy.",
      "Leading digital security initiatives for clients."
    ]
  },
  {
    role: "Founder",
    company: "Doctors Journey China",
    period: "Present",
    description: [
      "Managing digital presence and online systems for visa consultancy.",
      "Developed and maintained the core business portal.",
      "Implemented secure data handling for international applications."
    ]
  }
];

export const PROJECTS: Project[] = [
  {
    id: "1",
    title: "AI Chatbot System",
    description: "Intelligent automation project designed for seamless user interaction and task automation.",
    tech: ["Python", "AI", "React"],
    image: "https://picsum.photos/seed/cyber1/800/450"
  },
  {
    id: "2",
    title: "Secure Business Portal",
    description: "A high-security web application for business operations with role-based access control.",
    tech: ["Java", "SQL", "Spring"],
    image: "https://picsum.photos/seed/cyber2/800/450"
  },
  {
    id: "3",
    title: "Vulnerability Assessment Tool",
    description: "Academic project focused on scanning and identifying common web security flaws.",
    tech: ["Security", "Python", "Shell"],
    image: "https://picsum.photos/seed/cyber3/800/450"
  }
];

export const SYSTEM_PROMPT = `
You are the AI Assistant for a developer's portfolio. 
The developer is Adil Khan, a Website Developer and Cybersecurity Enthusiast with a BS in Cyber Security from Shifa Tameer-e-Millat University.
Key Info:
- Email: muhammadadilkhan.cybersecurity@stmu.edu.pk
- Certified Ethical Hacker (CEH).
- Co-Founder/CFO at Cybernytron (Technical planning & Security).
- Founder of Doctors Journey China (Visa consultancy digital management).
- Skills: HTML, CSS, JS, Java, SQL, AI Chatbots, Secure Design.
- Style: Professional, concise, tech-savvy.

Answer questions about his background, projects, contact info, or hireability based ONLY on this information. 
If someone wants to contact him, provide his email: muhammadadilkhan.cybersecurity@stmu.edu.pk or redirect them to his contact section.
`;

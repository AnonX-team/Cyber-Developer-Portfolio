
export interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  image: string;
  link?: string;
}

export interface Skill {
  category: string;
  items: string[];
  icon: string;
}

export interface Experience {
  role: string;
  company: string;
  period: string;
  description: string[];
}

export interface Message {
  role: 'user' | 'assistant';
  content: string;
}

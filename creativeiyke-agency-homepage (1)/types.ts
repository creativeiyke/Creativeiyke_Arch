export interface Project {
  id: string;
  title: string;
  category: string;
  metric: string;
  description: string;
  image: string;
  techStack: string[];
}

export interface Step {
  id: string;
  number: string;
  title: string;
  description: string;
}

export interface Sector {
  id: string;
  title: string;
  benefit: string;
  tag: string;
  gridSpan: string;
}

export interface BlogPost {
  id: string;
  title: string;
  date: string;
  category: string;
  readTime: string;
  excerpt: string;
  image: string;
  content: string;
}

export type PageId = 'home' | 'services' | 'industries' | 'process' | 'case-studies' | 'insights' | 'about';

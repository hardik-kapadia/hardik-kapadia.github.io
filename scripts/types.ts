export interface SiteConfig {
  name: string;
  eyebrow: string;
  title: string;
  lede: string;
  note: string;
  availability: string;
  location: string;
  email: string;
  heroLinks: string[];
  contactLinks: string[];
}

export interface LinkItem {
  id: string;
  label: string;
  url: string;
  description: string;
  type: "external" | "internal" | "contact";
  priority: number;
}

export interface AboutContent {
  intro: string;
  summary: string;
  principles: string[];
  notes: string[];
}

export interface ExperienceSubrole {
  title: string;
  period: string;
}

export interface ExperienceEntry {
  id: string;
  role: string;
  company: string;
  period: string;
  location?: string;
  eyebrow?: string;
  summary: string;
  impact: string[];
  systems: string[];
  current: boolean;
  notes: string[];
  subroles?: ExperienceSubrole[];
}

export interface ProjectFilter {
  id: string;
  label: string;
}

export interface ProjectGroup {
  id: string;
  filterId: string;
  label: string;
  description: string;
}

export interface ProjectItem {
  slug: string;
  title: string;
  group: string;
  filters: string[];
  summary: string;
  impact: string;
  stack: string[];
  tags: string[];
  link: string;
  notes: string[];
}

export interface ProjectContent {
  filters: ProjectFilter[];
  groups: ProjectGroup[];
  items: ProjectItem[];
}

export interface SkillBand {
  id: string;
  index: string;
  title: string;
  summary: string;
  tools: string[];
  notes: string[];
}

export interface PortfolioContent {
  site: SiteConfig;
  links: LinkItem[];
  about: AboutContent;
  experience: ExperienceEntry[];
  projects: ProjectContent;
  skills: SkillBand[];
}

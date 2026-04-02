import about from "../../content/about.json";
import experience from "../../content/experience.json";
import links from "../../content/links.json";
import projects from "../../content/projects.json";
import site from "../../content/site.json";
import skills from "../../content/skills.json";
import { logInfo } from "../debug/logger";
import type {
  AboutContent,
  ExperienceEntry,
  LinkItem,
  PortfolioContent,
  ProjectContent,
  SiteConfig,
  SkillBand,
} from "../types";

export const loadPortfolioContent = async (): Promise<PortfolioContent> => {
  logInfo("data:load-portfolio-content:start");

  const content = {
    site: site as SiteConfig,
    links: links as LinkItem[],
    about: about as AboutContent,
    experience: experience as ExperienceEntry[],
    projects: projects as ProjectContent,
    skills: skills as SkillBand[],
  };

  logInfo("data:load-portfolio-content:done", {
    linkIds: content.links.map((link) => link.id),
    skillIds: content.skills.map((skill) => skill.id),
    projectGroups: content.projects.groups.map((group) => group.id),
  });

  return content;
};

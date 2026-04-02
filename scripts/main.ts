import "../styles/main.css";
import { installGlobalErrorLogging, logError, logInfo } from "./debug/logger";
import { loadPortfolioContent } from "./data/load-portfolio-content";
import { setupAtlasMotion } from "./motion/setup-atlas-motion";
import { renderAbout } from "./render/render-about";
import { renderExperience } from "./render/render-experience";
import { renderHero, renderLinks } from "./render/render-links";
import { renderProjects } from "./render/render-projects";
import { renderSkills } from "./render/render-skills";
import { setupThemeToggle } from "./theme-toggle";

const revealSectionsImmediately = () => {
  const sections = document.querySelectorAll<HTMLElement>(".atlas-section");
  logInfo("ui:reveal-sections-immediately", { count: sections.length });

  sections.forEach((section) => {
    section.classList.add("is-active");
  });
};

const showRuntimeFallback = () => {
  logInfo("ui:show-runtime-fallback");

  const title = document.querySelector<HTMLElement>("[data-site-title]");
  const lede = document.querySelector<HTMLElement>("[data-site-lede]");

  if (title) {
    title.textContent = "Hardik Kapadia";
  }

  if (lede) {
    lede.textContent = "Portfolio content failed to initialize fully, but the page shell is still available.";
  }
};

const recoverFromMotionFailure = (error: unknown) => {
  logError("motion:setup-failed", error);
  delete document.body.dataset.motion;
  revealSectionsImmediately();
};

const initializePortfolio = async () => {
  installGlobalErrorLogging();
  logInfo("init:start");

  setupThemeToggle();
  logInfo("init:theme-toggle-ready", { theme: document.body.dataset.theme ?? "unset" });

  const content = await loadPortfolioContent();
  logInfo("init:content-loaded", {
    links: content.links.length,
    skills: content.skills.length,
    experience: content.experience.length,
    projectGroups: content.projects.groups.length,
    projectItems: content.projects.items.length,
  });

  logInfo("render:hero:start");
  renderHero(content.site, content.links);
  logInfo("render:hero:done");

  logInfo("render:about:start");
  renderAbout(content.about);
  logInfo("render:about:done");

  logInfo("render:skills:start");
  renderSkills(content.skills);
  logInfo("render:skills:done");

  logInfo("render:experience:start");
  renderExperience(content.experience);
  logInfo("render:experience:done");

  logInfo("render:projects:start");
  renderProjects(content.projects);
  logInfo("render:projects:done");

  logInfo("render:links:start");
  renderLinks(content.links);
  logInfo("render:links:done");

  requestAnimationFrame(() => {
    logInfo("motion:request-animation-frame");

    try {
      document.body.dataset.motion = "ready";
      setupAtlasMotion();
      logInfo("motion:setup-complete", {
        activeSections: document.querySelectorAll(".atlas-section.is-active").length,
      });
    } catch (error) {
      recoverFromMotionFailure(error);
    }
  });
};

initializePortfolio().catch((error) => {
  logError("init:failed", error);
  showRuntimeFallback();
  revealSectionsImmediately();
});

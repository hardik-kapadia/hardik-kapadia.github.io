import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { logInfo } from "../debug/logger";
import { animateHero } from "./animate-hero";
import { animateRails } from "./animate-rails";
import { animateSections } from "./animate-sections";
import { initializeSectionDock } from "./section-dock";

gsap.registerPlugin(ScrollTrigger);

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const activateSectionsImmediately = () => {
  const sections = document.querySelectorAll<HTMLElement>(".atlas-section");
  logInfo("motion:activate-sections-immediately", { count: sections.length });

  sections.forEach((section) => {
    section.classList.add("is-active");
  });
};

export const setupAtlasMotion = () => {
  logInfo("motion:setup-start", { prefersReducedMotion });
  initializeSectionDock();

  if (prefersReducedMotion) {
    activateSectionsImmediately();
    return;
  }

  animateHero();
  logInfo("motion:hero-ready");

  animateSections();
  logInfo("motion:sections-ready", {
    sectionCount: document.querySelectorAll(".atlas-section").length,
  });

  animateRails();
  logInfo("motion:rails-ready");
};

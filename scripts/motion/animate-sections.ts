import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { logInfo } from "../debug/logger";
import { setActiveDockSection } from "./section-dock";

const getSceneItems = (section: HTMLElement) => {
  const selectors = [
    ".section-heading > *",
    ".about-shell > *",
    ".link-card",
    ".skill-band",
    ".timeline-entry-card",
    ".project-group",
    ".contact-card",
  ];

  return selectors.flatMap((selector) => gsap.utils.toArray<HTMLElement>(section.querySelectorAll(selector)));
};

const activateSection = (section: HTMLElement, sectionName: string) => {
  section.classList.add("is-active");
  setActiveDockSection(sectionName);
  logInfo("motion:section:active", { section: sectionName || "unknown" });
};

const deactivateSection = (section: HTMLElement, sectionName: string) => {
  section.classList.remove("is-active");
  logInfo("motion:section:inactive", { section: sectionName || "unknown" });
};

const createSectionTrigger = (section: HTMLElement) => {
  const sectionName = section.dataset.section ?? "";
  const shell = section.querySelector<HTMLElement>(".section-shell");
  const sceneItems = getSceneItems(section);
  const timeline = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: "top 76%",
    },
  });

  logInfo("motion:section:setup", {
    section: sectionName || "unknown",
    hasShell: Boolean(shell),
    sceneItems: sceneItems.length,
  });

  if (shell) {
    timeline.fromTo(
      shell,
      {
        y: 54,
        opacity: 0,
        clipPath: "inset(0 0 100% 0 round 1.75rem)",
      },
      {
        y: 0,
        opacity: 1,
        clipPath: "inset(0 0 0% 0 round 1.75rem)",
        duration: 0.92,
        ease: "power3.out",
      }
    );
  }

  if (sceneItems.length) {
    timeline.from(
      sceneItems,
      {
        y: 28,
        opacity: 0,
        duration: 0.5,
        stagger: 0.06,
        ease: "power2.out",
      },
      shell ? 0.16 : 0
    );
  }

  ScrollTrigger.create({
    trigger: section,
    start: "top 56%",
    end: "bottom 44%",
    onEnter: () => activateSection(section, sectionName),
    onEnterBack: () => activateSection(section, sectionName),
    onLeave: () => deactivateSection(section, sectionName),
    onLeaveBack: () => deactivateSection(section, sectionName),
  });
};

export const animateSections = () => {
  const sections = gsap.utils.toArray<HTMLElement>(".atlas-section");
  logInfo("motion:sections:start", { count: sections.length });
  sections.forEach(createSectionTrigger);
};

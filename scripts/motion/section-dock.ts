import { gsap } from "gsap";

const getDockItems = () =>
  gsap.utils.toArray<HTMLAnchorElement>("[data-section-dock-item]");

const getNavItems = () =>
  gsap.utils.toArray<HTMLAnchorElement>(".site-nav a");

const syncNavState = (activeSection: string) => {
  getNavItems().forEach((item) => {
    const href = item.getAttribute("href") ?? "";
    const targetSection = href.replace("#", "");
    const isActive = targetSection === activeSection;
    item.classList.toggle("is-active", isActive);
    item.setAttribute("aria-current", isActive ? "location" : "false");
  });
};

const applyDockState = (items: HTMLAnchorElement[], activeSection: string) => {
  let hasReachedActive = false;

  items.forEach((item) => {
    const section = item.dataset.sectionDockItem ?? "";
    const isCurrent = section === activeSection;
    const isPassed = !hasReachedActive && !isCurrent;

    item.classList.toggle("is-current", isCurrent);
    item.classList.toggle("is-passed", isPassed);
    item.setAttribute("aria-current", isCurrent ? "location" : "false");

    if (isCurrent) {
      hasReachedActive = true;
    }
  });

  syncNavState(activeSection);
};

const pulseActiveMarker = (activeSection: string) => {
  const marker = document.querySelector<HTMLElement>(
    `[data-section-dock-item="${activeSection}"] .section-dock__marker`
  );

  if (!marker) {
    return;
  }

  gsap.fromTo(
    marker,
    { scale: 0.88 },
    {
      scale: 1.22,
      duration: 0.42,
      ease: "power2.out",
      clearProps: "scale",
    }
  );
};

export const initializeSectionDock = () => {
  const items = getDockItems();

  if (!items.length) {
    return;
  }

  applyDockState(items, "hero");
};

export const setActiveDockSection = (activeSection: string) => {
  const items = getDockItems();

  if (!items.length) {
    return;
  }

  applyDockState(items, activeSection);
  pulseActiveMarker(activeSection);
};

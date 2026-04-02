import { logInfo, logWarn } from "../debug/logger";
import { appendChildren, clearChildren, createElement, createTagList } from "../dom/elements";
import type { AboutContent } from "../types";

const createPrinciples = (principles: string[]) => {
  const list = createTagList("tag-list tag-list--principles", principles);
  list.setAttribute("aria-label", "About principles");
  return list;
};

export const renderAbout = (about: AboutContent) => {
  const target = document.querySelector<HTMLElement>("[data-about]");

  if (!target) {
    logWarn("render:about:missing-container", { selector: "[data-about]" });
    return;
  }

  clearChildren(target);

  const shell = createElement("div", "about-shell");
  const copy = createElement("div", "about-shell__copy");
  const side = createElement("div", "about-shell__side");
  const intro = createElement("p", "lead", about.intro);
  const summary = createElement("p", "about-summary", about.summary);

  appendChildren(copy, [intro, summary]);
  side.appendChild(createPrinciples(about.principles));
  appendChildren(shell, [copy, side]);
  target.appendChild(shell);

  logInfo("render:about:mounted", {
    principles: about.principles.length,
    hasSummary: Boolean(about.summary),
  });
};

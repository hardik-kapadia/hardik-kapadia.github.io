import { logInfo, logWarn } from "../debug/logger";
import { appendChildren, clearChildren, createElement } from "../dom/elements";
import type { LinkItem, SiteConfig } from "../types";

const CHANNEL_LABELS: Record<string, string> = {
  github: "Code archive",
  linkedin: "Professional record",
  email: "Direct channel",
};

const findLinkById = (links: LinkItem[], id: string) => links.find((link) => link.id === id);
const isExternalLink = (link: LinkItem) => link.type === "external";
const getChannelLabel = (link: LinkItem) => CHANNEL_LABELS[link.id] ?? "Open channel";

const applyAnchorBehavior = (anchor: HTMLAnchorElement, link: LinkItem) => {
  anchor.href = link.url;

  if (isExternalLink(link)) {
    anchor.target = "_blank";
    anchor.rel = "noreferrer";
  }
};

const createHeroLink = (link: LinkItem) => {
  const anchor = createElement("a", "link-pill link-pill--channel");
  const meta = createElement("span", "link-pill__meta", getChannelLabel(link));
  const label = createElement("span", "link-pill__label", link.label);

  applyAnchorBehavior(anchor, link);
  appendChildren(anchor, [meta, label]);
  return anchor;
};

const createLinkCard = (link: LinkItem) => {
  const anchor = createElement("a", "link-card link-card--interactive link-card--channel");
  const meta = createElement("p", "link-card__meta", getChannelLabel(link));
  const label = createElement("p", "link-card__label", link.label);
  const description = createElement("p", "link-card__description", link.description);
  const cue = createElement("span", "link-card__cue", "Open");
  const copy = createElement("div", "link-card__copy");

  appendChildren(copy, [meta, label, description]);
  appendChildren(anchor, [copy, cue]);
  applyAnchorBehavior(anchor, link);
  return anchor;
};

const setText = (selector: string, value: string) => {
  const element = document.querySelector<HTMLElement>(selector);

  if (!element) {
    logWarn("render:links:missing-text-target", { selector });
    return;
  }

  element.textContent = value;
};

export const renderHero = (site: SiteConfig, links: LinkItem[]) => {
  logInfo("render:hero:start", {
    eyebrow: site.eyebrow,
    title: site.title,
    heroLinkIds: site.heroLinks,
  });

  setText("[data-site-eyebrow]", site.eyebrow);
  setText("[data-site-title]", site.title);
  setText("[data-site-lede]", site.lede);

  const heroLinks = document.querySelector<HTMLElement>("[data-hero-links]");

  if (!heroLinks) {
    logWarn("render:hero:missing-links-container", { selector: "[data-hero-links]" });
    return;
  }

  clearChildren(heroLinks);

  const selectedLinks = site.heroLinks
    .map((id) => findLinkById(links, id))
    .filter((link): link is LinkItem => Boolean(link));

  selectedLinks.forEach((link) => {
    heroLinks.appendChild(createHeroLink(link));
  });

  logInfo("render:hero:content-ready", { renderedLinks: selectedLinks.length });
};

export const renderLinks = (links: LinkItem[]) => {
  const linksGrid = document.querySelector<HTMLElement>("[data-links-grid]");

  if (!linksGrid) {
    logWarn("render:links-grid:missing-container", { selector: "[data-links-grid]" });
    return;
  }

  clearChildren(linksGrid);

  const sortedLinks = [...links].sort((left, right) => left.priority - right.priority);
  sortedLinks.forEach((link) => linksGrid.appendChild(createLinkCard(link)));

  logInfo("render:links-grid:done", {
    renderedCount: sortedLinks.length,
    labels: sortedLinks.map((link) => link.label),
  });
};

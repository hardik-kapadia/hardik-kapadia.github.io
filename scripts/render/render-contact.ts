import { logInfo, logWarn } from "../debug/logger";
import { clearChildren, createElement } from "../dom/elements";
import type { LinkItem, SiteConfig } from "../types";

const findLinkById = (links: LinkItem[], id: string) => links.find((link) => link.id === id);

const createContactCard = (label: string, value: string, href?: string) => {
  const element = href
    ? createElement("a", "contact-card")
    : createElement("div", "contact-card contact-card--static");

  if (href && element instanceof HTMLAnchorElement) {
    element.href = href;
  }

  element.appendChild(createElement("span", "contact-card__label", label));
  element.appendChild(createElement("span", "contact-card__value", value));

  return element;
};

export const renderContact = (site: SiteConfig, links: LinkItem[]) => {
  const grid = document.querySelector<HTMLElement>("[data-contact-grid]");

  if (!grid) {
    logWarn("render:contact:missing-container", { selector: "[data-contact-grid]" });
    return;
  }

  clearChildren(grid);

  grid.appendChild(createContactCard("Email", site.email, `mailto:${site.email}`));
  grid.appendChild(createContactCard("Location", site.location));
  grid.appendChild(createContactCard("Status", site.availability));

  const renderedLinks = site.contactLinks
    .map((id) => findLinkById(links, id))
    .filter((link): link is LinkItem => Boolean(link))
    .filter((link) => link.id !== "email");

  renderedLinks.forEach((link) => {
    grid.appendChild(createContactCard(link.label, link.description, link.url));
  });

  logInfo("render:contact:mounted", {
    baseCards: 3,
    linkedCards: renderedLinks.length,
    totalCards: grid.children.length,
  });
};

import { logInfo, logWarn } from "../debug/logger";
import { appendChildren, clearChildren, createDetails, createElement, createTagList } from "../dom/elements";
import type { ProjectContent, ProjectFilter, ProjectGroup, ProjectItem } from "../types";

export interface RenderedProjectsView {
  filterButtons: HTMLButtonElement[];
  projectGroups: HTMLElement[];
}

const createProjectNotes = (notes: string[]) => {
  const wrapper = createElement("div", "notes-stack");

  notes.forEach((note) => {
    wrapper.appendChild(createElement("p", "", note));
  });

  return wrapper;
};

const createMetaBlock = (label: string, className: string, values: string[]) => {
  const block = createElement("div", `project-card__meta-block ${className}`);
  const heading = createElement("p", "project-card__meta-label", label);
  appendChildren(block, [heading, createTagList("tag-list", values)]);
  return block;
};

const createProjectActionLink = (href: string) => {
  const link = createElement("a", "project-card__action", "Open repo");
  link.href = href;
  link.target = "_blank";
  link.rel = "noreferrer";
  return link;
};

const createProjectCard = (project: ProjectItem, isLead: boolean) => {
  const article = createElement(
    "article",
    isLead ? "project-card project-card--lead" : "project-card"
  );
  const evidenceLine = project.notes[0] ?? "A clear, well-scoped project with a strong implementation story.";
  const detailNotes = project.notes.length > 1 ? project.notes.slice(1) : project.notes;

  article.dataset.projectFilter = project.filters.join(" ");
  article.dataset.matchesFilter = "true";
  article.dataset.collapsedHidden = "false";

  const header = createElement("div", "project-card__header");
  const title = createElement("h4", "project-card__title", project.title);
  appendChildren(header, [title, createProjectActionLink(project.link)]);

  const summary = createElement("p", "project-card__summary", project.summary);
  const signalLabel = createElement("p", "project-card__meta-label", "Overview");
  const impact = createElement("p", "project-card__impact", project.impact);
  const evidence = createElement("p", "project-card__evidence", evidenceLine);
  const meta = createElement("div", "project-card__meta-grid");

  appendChildren(meta, [
    createMetaBlock("Tags", "project-card__meta-block--tags", project.tags),
    createMetaBlock("Systems", "project-card__meta-block--stack", project.stack),
  ]);

  appendChildren(article, [header, summary, signalLabel, impact, evidence, meta]);

  if (detailNotes.length) {
    article.appendChild(createDetails("Details", createProjectNotes(detailNotes)));
  }

  return article;
};

const createGroupToggle = () => {
  const button = createElement("button", "project-group__toggle", "Show more");
  button.type = "button";
  button.dataset.groupToggle = "true";
  button.hidden = true;
  return button;
};

const createProjectGroup = (group: ProjectGroup, items: ProjectItem[], index: number) => {
  const section = createElement("section", "project-group");
  section.dataset.projectGroup = group.id;
  section.dataset.projectGroupFilter = group.filterId;
  section.dataset.expanded = "false";

  const heading = createElement("div", "project-group__heading");
  const groupIndex = createElement("p", "project-group__index", `0${index + 1}`);
  appendChildren(heading, [
    groupIndex,
    createElement("p", "eyebrow", group.label),
    createElement("h3", "", group.description),
  ]);

  const cards = createElement("div", "project-group__cards");

  items.forEach((item, itemIndex) => {
    cards.appendChild(createProjectCard(item, itemIndex === 0));
  });

  appendChildren(section, [heading, cards, createGroupToggle()]);
  return section;
};

const createFilterButton = (filter: ProjectFilter, isActive: boolean) => {
  const button = createElement(
    "button",
    isActive ? "project-filter is-active" : "project-filter",
    filter.label
  );

  button.type = "button";
  button.dataset.filter = filter.id;
  button.setAttribute("aria-pressed", String(isActive));
  return button;
};

const getFilterTarget = () => document.querySelector<HTMLElement>("[data-project-filters]");
const getGroupTarget = () => document.querySelector<HTMLElement>("[data-project-groups]");

const renderFilterButtons = (filters: ProjectFilter[]) => {
  const target = getFilterTarget();

  if (!target) {
    logWarn("render:projects:missing-filter-container", { selector: "[data-project-filters]" });
    return [];
  }

  clearChildren(target);

  return filters.map((filter, index) => {
    const button = createFilterButton(filter, index === 0);
    target.appendChild(button);
    return button;
  });
};

const renderProjectGroups = (content: ProjectContent) => {
  const target = getGroupTarget();

  if (!target) {
    logWarn("render:projects:missing-group-container", { selector: "[data-project-groups]" });
    return [];
  }

  clearChildren(target);

  return content.groups.map((group, index) => {
    const items = content.items.filter((item) => item.group === group.id);
    const section = createProjectGroup(group, items, index);
    target.appendChild(section);
    return section;
  });
};

export const renderProjectsView = (content: ProjectContent): RenderedProjectsView => {
  const view = {
    filterButtons: renderFilterButtons(content.filters),
    projectGroups: renderProjectGroups(content),
  };

  logInfo("render:projects:view-mounted", {
    filters: view.filterButtons.length,
    groups: view.projectGroups.length,
  });

  return view;
};




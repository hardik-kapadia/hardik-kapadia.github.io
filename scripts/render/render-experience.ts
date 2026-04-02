import { logInfo, logWarn } from "../debug/logger";
import { appendChildren, clearChildren, createDetails, createElement, createTagList } from "../dom/elements";
import type { ExperienceEntry, ExperienceSubrole } from "../types";

const createImpactList = (impact: string[]) => {
  const list = createElement("ul", "impact-list");

  impact.forEach((item) => {
    list.appendChild(createElement("li", "", item));
  });

  return list;
};

const createNotesContent = (notes: string[]) => {
  const wrapper = createElement("div", "notes-stack");

  notes.forEach((note) => wrapper.appendChild(createElement("p", "", note)));

  return wrapper;
};

const createSubroleItem = (subrole: ExperienceSubrole) => {
  const item = createElement("li", "timeline-role-track__item");
  const title = createElement("p", "timeline-role-track__title", subrole.title);
  const period = createElement("p", "timeline-role-track__period", subrole.period);

  appendChildren(item, [title, period]);
  return item;
};

const createSubroleTrack = (subroles: ExperienceSubrole[]) => {
  const wrapper = createElement("div", "timeline-role-track");
  const label = createElement("p", "timeline-role-track__label", "Role trail");
  const list = createElement("ul", "timeline-role-track__list");

  subroles.forEach((subrole) => list.appendChild(createSubroleItem(subrole)));
  appendChildren(wrapper, [label, list]);

  return wrapper;
};

const createDetailsContent = (entry: ExperienceEntry) => {
  const wrapper = createElement("div", "timeline-entry-card__details");

  if (entry.impact.length) {
    wrapper.appendChild(createImpactList(entry.impact));
  }

  if (entry.subroles?.length) {
    wrapper.appendChild(createSubroleTrack(entry.subroles));
  }

  if (entry.notes.length) {
    wrapper.appendChild(createNotesContent(entry.notes));
  }

  return wrapper;
};

const createTimelineEntry = (entry: ExperienceEntry) => {
  const article = createElement("article", "timeline-entry-card");
  const meta = createElement("div", "timeline-entry-card__meta");
  const eyebrow = createElement(
    "p",
    "timeline-entry-card__eyebrow",
    entry.eyebrow ?? (entry.current ? "Current role" : "Earlier entry")
  );
  const title = createElement("h3", "", `${entry.role} - ${entry.company}`);
  const period = createElement("p", "timeline-entry-card__period", entry.period);
  const summary = createElement("p", "", entry.summary);
  const systems = createTagList("tag-list", entry.systems);

  appendChildren(meta, [eyebrow, title, period]);

  if (entry.location) {
    meta.appendChild(createElement("p", "timeline-entry-card__location", entry.location));
  }

  appendChildren(meta, [summary, systems, createDetails("Details", createDetailsContent(entry))]);
  article.appendChild(meta);

  return article;
};

export const renderExperience = (entries: ExperienceEntry[]) => {
  const timeline = document.querySelector<HTMLElement>("[data-experience-timeline]");

  if (!timeline) {
    logWarn("render:experience:missing-container", { selector: "[data-experience-timeline]" });
    return;
  }

  clearChildren(timeline);
  entries.forEach((entry) => timeline.appendChild(createTimelineEntry(entry)));

  logInfo("render:experience:mounted", {
    entries: entries.length,
    currentRoles: entries.filter((entry) => entry.current).length,
    subroles: entries.reduce((count, entry) => count + (entry.subroles?.length ?? 0), 0),
  });
};

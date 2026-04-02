import { logInfo, logWarn } from "../debug/logger";
import { appendChildren, clearChildren, createDetails, createElement } from "../dom/elements";
import type { SkillBand } from "../types";

const createSkillNotes = (notes: string[]) => {
  const wrapper = createElement("div", "notes-stack");
  notes.forEach((note) => wrapper.appendChild(createElement("p", "", note)));
  return wrapper;
};

const createToolList = (tools: string[]) => {
  const list = createElement("ul", "skill-band__tools");
  tools.forEach((tool) => list.appendChild(createElement("li", "", tool)));
  return list;
};

const createSkillBand = (skill: SkillBand) => {
  const article = createElement("article", "skill-band skill-band--matrix");
  const header = createElement("div", "skill-band__header");
  const index = createElement("p", "skill-band__index", skill.index);
  const title = createElement("h3", "", skill.title);
  const summary = createElement("p", "skill-band__summary", skill.summary);
  const evidence = createElement(
    "p",
    "skill-band__evidence",
    skill.notes[0] ?? "Real-world usage and system thinking reflected in shipped work."
  );
  const body = createElement("div", "skill-band__matrix");
  const toolsPanel = createElement("div", "skill-band__module");
  const proofPanel = createElement("div", "skill-band__module skill-band__module--proof");
  const toolLabel = createElement("p", "skill-band__label", "Systems / tools");
  const proofLabel = createElement("p", "skill-band__label", "Operational evidence");

  appendChildren(header, [index, title]);
  appendChildren(toolsPanel, [toolLabel, createToolList(skill.tools)]);
  appendChildren(proofPanel, [proofLabel, evidence]);
  appendChildren(body, [toolsPanel, proofPanel]);
  appendChildren(article, [header, summary, body]);

  if (skill.notes.length > 1) {
    article.appendChild(createDetails("Expand capability notes", createSkillNotes(skill.notes.slice(1))));
  }

  return article;
};

export const renderSkills = (skills: SkillBand[]) => {
  const grid = document.querySelector<HTMLElement>("[data-skills-grid]");

  if (!grid) {
    logWarn("render:skills:missing-container", { selector: "[data-skills-grid]" });
    return;
  }

  clearChildren(grid);
  skills.forEach((skill) => grid.appendChild(createSkillBand(skill)));

  logInfo("render:skills:done", {
    renderedCount: skills.length,
    skillIds: skills.map((skill) => skill.id),
  });
};

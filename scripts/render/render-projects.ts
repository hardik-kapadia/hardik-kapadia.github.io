import { logInfo } from "../debug/logger";
import type { ProjectContent } from "../types";
import { initializeProjectInteractions } from "./project-interactions";
import { renderProjectsView } from "./project-view";

export const renderProjects = (content: ProjectContent) => {
  logInfo("render:projects:view:start", {
    filters: content.filters.length,
    groups: content.groups.length,
    items: content.items.length,
  });

  const view = renderProjectsView(content);

  logInfo("render:projects:view:done", {
    filterButtons: view.filterButtons.length,
    projectGroups: view.projectGroups.length,
  });

  initializeProjectInteractions(view);
  logInfo("render:projects:interactions-ready");
};

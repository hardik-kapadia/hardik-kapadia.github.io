import { gsap } from "gsap";
import { logInfo, logWarn } from "../debug/logger";
import type { RenderedProjectsView } from "./project-view";

const DEFAULT_VISIBLE_CARDS = 3;

const getProjectCards = (group: HTMLElement) => Array.from(group.querySelectorAll<HTMLElement>(".project-card"));

const getFilterMatchedCards = (group: HTMLElement) =>
  getProjectCards(group).filter((card) => card.dataset.matchesFilter !== "false");

const getVisibleSceneItems = (groups: HTMLElement[]) =>
  groups.flatMap((group) => {
    const visibleCards = getProjectCards(group).filter((card) => !card.hidden);
    return group.hidden ? [] : [group, ...visibleCards];
  });

const syncCardVisibility = (card: HTMLElement) => {
  const filteredOut = card.dataset.matchesFilter === "false";
  const collapsedHidden = card.dataset.collapsedHidden === "true";
  card.hidden = filteredOut || collapsedHidden;
};

const setCollapsedState = (card: HTMLElement, collapsedHidden: boolean) => {
  card.dataset.collapsedHidden = String(collapsedHidden);
  syncCardVisibility(card);
};

const getGroupToggle = (group: HTMLElement) =>
  group.querySelector<HTMLButtonElement>("[data-group-toggle]");

const getGroupFilterId = (group: HTMLElement) => group.dataset.projectGroupFilter ?? "";

const updateFilterState = (buttons: HTMLButtonElement[], activeId: string) => {
  buttons.forEach((button) => {
    const isActive = button.dataset.filter === activeId;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
};

const updateGroupToggle = (group: HTMLElement, hiddenCount: number) => {
  const button = getGroupToggle(group);

  if (!button) {
    return;
  }

  if (hiddenCount <= 0) {
    button.hidden = true;
    return;
  }

  button.hidden = false;
  button.textContent = group.dataset.expanded === "true" ? "Show fewer" : `Show ${hiddenCount} more`;
};

const updateGroupVisibility = (group: HTMLElement) => {
  const matchedCards = getFilterMatchedCards(group);
  const expanded = group.dataset.expanded === "true";

  matchedCards.forEach((card, index) => {
    setCollapsedState(card, !expanded && index >= DEFAULT_VISIBLE_CARDS);
  });

  group.hidden = matchedCards.length === 0;
  updateGroupToggle(group, matchedCards.length - DEFAULT_VISIBLE_CARDS);
};

const collapseProjectGroups = (groups: HTMLElement[]) => {
  groups.forEach((group) => {
    group.dataset.expanded = "false";
  });
};

const updateProjectVisibility = (groups: HTMLElement[], filter: string) => {
  groups.forEach((group) => {
    const groupMatches = getGroupFilterId(group) === filter;

    getProjectCards(group).forEach((card) => {
      card.dataset.matchesFilter = String(groupMatches);
    });

    updateGroupVisibility(group);
  });
};

const animateProjectStateChange = (groups: HTMLElement[], callback: () => void) => {
  callback();

  const visibleItems = getVisibleSceneItems(groups);

  if (!visibleItems.length) {
    logWarn("projects:animate-state-change:no-visible-items");
    return;
  }

  gsap.fromTo(
    visibleItems,
    { opacity: 0, y: 18 },
    {
      opacity: 1,
      y: 0,
      duration: 0.42,
      ease: "power2.out",
      stagger: 0.03,
      overwrite: true,
    }
  );
};

const bindFilterButtons = (buttons: HTMLButtonElement[], groups: HTMLElement[]) => {
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter ?? "all";
      logInfo("projects:filter-click", { filter });
      updateFilterState(buttons, filter);
      animateProjectStateChange(groups, () => {
        collapseProjectGroups(groups);
        updateProjectVisibility(groups, filter);
      });
    });
  });
};

const bindGroupToggles = (groups: HTMLElement[]) => {
  groups.forEach((group) => {
    const button = getGroupToggle(group);

    if (!button) {
      logWarn("projects:missing-group-toggle", { group: group.dataset.projectGroup });
      return;
    }

    button.addEventListener("click", () => {
      const nextExpanded = group.dataset.expanded !== "true";
      logInfo("projects:toggle-group", {
        group: group.dataset.projectGroup,
        expanded: nextExpanded,
      });

      animateProjectStateChange(groups, () => {
        group.dataset.expanded = nextExpanded ? "true" : "false";
        updateGroupVisibility(group);
      });
    });
  });
};

export const initializeProjectInteractions = ({
  filterButtons,
  projectGroups,
}: RenderedProjectsView) => {
  const initialFilter = filterButtons[0]?.dataset.filter ?? "";

  logInfo("projects:initialize-interactions", {
    filterButtons: filterButtons.length,
    projectGroups: projectGroups.length,
    initialFilter,
  });

  bindFilterButtons(filterButtons, projectGroups);
  bindGroupToggles(projectGroups);
  updateProjectVisibility(projectGroups, initialFilter);

  logInfo("projects:initial-visibility-ready", {
    visibleGroups: projectGroups.filter((group) => !group.hidden).length,
  });
};



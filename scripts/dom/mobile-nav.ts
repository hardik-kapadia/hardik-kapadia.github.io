import { logInfo } from "../debug/logger";

const DESKTOP_BREAKPOINT = window.matchMedia("(min-width: 861px)");

const getToggle = () => document.querySelector<HTMLButtonElement>("[data-mobile-nav-toggle]");
const getOverlay = () => document.querySelector<HTMLElement>("[data-mobile-nav-overlay]");
const getLinks = () =>
  Array.from(document.querySelectorAll<HTMLAnchorElement>("[data-mobile-nav-link]"));

const setToggleState = (button: HTMLButtonElement, isOpen: boolean) => {
  button.setAttribute("aria-expanded", String(isOpen));
  button.setAttribute("aria-label", isOpen ? "Close section index" : "Open section index");
};

const focusFirstLink = () => {
  getLinks()[0]?.focus();
};

const openMobileNav = (button: HTMLButtonElement, overlay: HTMLElement) => {
  if (!overlay.hidden) {
    return;
  }

  overlay.hidden = false;
  document.body.dataset.mobileNav = "open";
  setToggleState(button, true);

  requestAnimationFrame(() => {
    overlay.classList.add("is-open");
    focusFirstLink();
  });

  logInfo("mobile-nav:open");
};

const closeMobileNav = (button: HTMLButtonElement, overlay: HTMLElement) => {
  if (overlay.hidden) {
    return;
  }

  overlay.classList.remove("is-open");
  delete document.body.dataset.mobileNav;
  setToggleState(button, false);

  window.setTimeout(() => {
    if (!overlay.classList.contains("is-open")) {
      overlay.hidden = true;
    }
  }, 260);

  logInfo("mobile-nav:close");
};

const toggleMobileNav = (button: HTMLButtonElement, overlay: HTMLElement) => {
  if (overlay.hidden) {
    openMobileNav(button, overlay);
    return;
  }

  closeMobileNav(button, overlay);
};

const bindCloseOnLink = (button: HTMLButtonElement, overlay: HTMLElement) => {
  getLinks().forEach((link) => {
    link.addEventListener("click", () => {
      closeMobileNav(button, overlay);
    });
  });
};

const bindEscapeToClose = (button: HTMLButtonElement, overlay: HTMLElement) => {
  window.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") {
      return;
    }

    closeMobileNav(button, overlay);
  });
};

const bindResizeReset = (button: HTMLButtonElement, overlay: HTMLElement) => {
  DESKTOP_BREAKPOINT.addEventListener("change", (event) => {
    if (!event.matches) {
      return;
    }

    closeMobileNav(button, overlay);
  });
};

export const setupMobileNavigation = () => {
  const button = getToggle();
  const overlay = getOverlay();

  if (!button || !overlay) {
    return;
  }

  setToggleState(button, false);

  button.addEventListener("click", () => {
    toggleMobileNav(button, overlay);
  });

  bindCloseOnLink(button, overlay);
  bindEscapeToClose(button, overlay);
  bindResizeReset(button, overlay);

  logInfo("mobile-nav:ready");
};

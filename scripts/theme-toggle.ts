const STORAGE_KEY = "portfolio-theme";
const DARK_THEME = "dark";
const LIGHT_THEME = "light";

const getStoredTheme = () => window.localStorage.getItem(STORAGE_KEY);
const getPreferredTheme = () =>
  window.matchMedia("(prefers-color-scheme: dark)").matches ? DARK_THEME : LIGHT_THEME;
const getThemeToggle = () => document.querySelector<HTMLButtonElement>("[data-theme-toggle]");
const getInitialTheme = () => getStoredTheme() ?? getPreferredTheme();
const getNextTheme = (currentTheme: string) =>
  currentTheme === DARK_THEME ? LIGHT_THEME : DARK_THEME;

const applyTheme = (theme: string) => {
  document.body.dataset.theme = theme;
};

const updateThemeToggle = (button: HTMLButtonElement, theme: string) => {
  const isDark = theme === DARK_THEME;
  button.dataset.theme = theme;
  button.setAttribute("aria-pressed", String(isDark));
  button.setAttribute(
    "aria-label",
    isDark ? "Switch to light mode" : "Switch to dark mode"
  );
};

const persistTheme = (theme: string) => {
  window.localStorage.setItem(STORAGE_KEY, theme);
};

const bindThemeToggle = (button: HTMLButtonElement) => {
  button.addEventListener("click", () => {
    const currentTheme = document.body.dataset.theme || LIGHT_THEME;
    const nextTheme = getNextTheme(currentTheme);

    applyTheme(nextTheme);
    updateThemeToggle(button, nextTheme);
    persistTheme(nextTheme);
  });
};

export const setupThemeToggle = () => {
  const button = getThemeToggle();

  if (!button) {
    return;
  }

  const theme = getInitialTheme();
  applyTheme(theme);
  updateThemeToggle(button, theme);
  bindThemeToggle(button);
};
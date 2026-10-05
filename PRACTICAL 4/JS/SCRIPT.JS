/**
 * STUDENT HUB - THEME CONTROLLER (SCRIPT.JS)
 * Practical 3 UI Interactivity & Persistent Theme
 * Synchronized with Practical 4 via localStorage key "registrationTheme"
 */

(function () {
  const THEME_STORAGE_KEY = "registrationTheme";

  function applyTheme(isDark) {
    if (isDark) {
      document.body.classList.add("dark-theme");
    } else {
      document.body.classList.remove("dark-theme");
    }

    document.querySelectorAll(".theme-toggle-btn").forEach((btn) => {
      const icon = btn.querySelector(".theme-icon");
      const text = btn.querySelector(".theme-text");
      if (icon) icon.textContent = isDark ? "☀️" : "🌙";
      if (text) text.textContent = isDark ? "Light mode" : "Dark mode";
    });
  }

  // Check saved theme preference from localStorage
  const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
  const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  const isInitiallyDark = savedTheme === "dark" || (!savedTheme && prefersDark);

  function initTheme() {
    applyTheme(isInitiallyDark);

    // Bind event listeners to all theme toggle buttons on the page
    document.querySelectorAll(".theme-toggle-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const isDark = !document.body.classList.contains("dark-theme");
        applyTheme(isDark);
        localStorage.setItem(THEME_STORAGE_KEY, isDark ? "dark" : "light");
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initTheme);
  } else {
    initTheme();
  }

  // Cross-tab synchronization: updates automatically if changed in Practical 4
  window.addEventListener("storage", (event) => {
    if (event.key === THEME_STORAGE_KEY) {
      applyTheme(event.newValue === "dark");
    }
  });
})();

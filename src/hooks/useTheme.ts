import { useCallback, useEffect, useState } from "react";

/* Two modes only — light and dark. The system preference picks the starting
   point on a first visit, but it isn't a mode of its own: one icon, one
   click, one switch. */
export type ThemeMode = "light" | "dark";

const STORAGE_KEY = "ai-portfolio-theme";

function systemPrefersDark(): boolean {
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

function applyTheme(mode: ThemeMode) {
  document.documentElement.classList.toggle("dark", mode === "dark");
  // browser chrome mirrors the app ground: read the live --background token
  // instead of repeating its hex here
  const meta = document.querySelector('meta[name="theme-color"]');
  const bg = getComputedStyle(document.documentElement).getPropertyValue("--background").trim();
  if (meta && bg) meta.setAttribute("content", bg);
}

function loadStoredMode(): ThemeMode {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "light" || stored === "dark") return stored;
    // "system" from before the third mode was removed, or nothing stored:
    // resolve the preference once and carry on with a plain light/dark
    return systemPrefersDark() ? "dark" : "light";
  } catch {
    return "light";
  }
}

export function useTheme() {
  const [mode, setModeState] = useState<ThemeMode>(loadStoredMode);

  useEffect(() => {
    applyTheme(mode);
  }, [mode]);

  const setMode = useCallback((next: ThemeMode) => {
    setModeState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // storage unavailable — theme still applies for this session
    }
  }, []);

  return { mode, resolved: mode, setMode };
}

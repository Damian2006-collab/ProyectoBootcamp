import { useState } from 'react';

type Theme = 'light' | 'dark';

function currentTheme(): Theme {
  // El script del <head> de index.html ya puso data-theme antes de pintar.
  return document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(currentTheme);
  const isDark = theme === 'dark';

  function toggleTheme() {
    const next: Theme = isDark ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    setTheme(next);
  }

  return (
    <button
      className="theme-toggle"
      type="button"
      id="btn-theme"
      aria-pressed={isDark}
      aria-label={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
      onClick={toggleTheme}
    >
      {isDark ? '☀️' : '🌙'}
    </button>
  );
}

// shared/dm-toggle.js
// Persists theme choice via localStorage across all pages.
// Hook: define window.onThemeChange(theme) in the page's script to trigger chart re-renders.
(function () {
  'use strict';
  const KEY = 'dm-theme';

  // Apply saved theme synchronously (before first paint) to avoid flash
  const saved = localStorage.getItem(KEY) || 'dark';
  document.documentElement.setAttribute('data-theme', saved);

  function syncUI(theme) {
    const icon = document.getElementById('dm-icon');
    const lbl  = document.getElementById('dm-label');
    if (!icon || !lbl) return;
    const isLight = theme === 'light';
    icon.textContent = isLight ? '☀️' : '🌙';
    lbl.textContent  = isLight ? 'LIGHT' : 'DARK';
  }

  function init() {
    syncUI(document.documentElement.getAttribute('data-theme'));
    const btn = document.getElementById('dm-toggle');
    if (!btn) return;
    btn.addEventListener('click', function () {
      const next = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem(KEY, next);
      syncUI(next);
      if (typeof window.onThemeChange === 'function') window.onThemeChange(next);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

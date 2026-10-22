/* Mode jour / nuit.
   Chargé dans le <head> pour appliquer le thème AVANT l'affichage (pas de flash).
   - Sans choix enregistré : suit le thème du système.
   - Le bouton enregistre le choix du visiteur dans le navigateur. */
(function () {
  "use strict";
  const KEY = "lm-theme";
  const root = document.documentElement;
  const mq = window.matchMedia ? matchMedia("(prefers-color-scheme: light)") : null;
  const saved = () => { try { return localStorage.getItem(KEY); } catch (e) { return null; } };
  const system = () => (mq && mq.matches ? "light" : "dark");

  function apply(theme) {
    root.setAttribute("data-theme", theme);
    const btn = document.getElementById("themeToggle");
    if (btn) {
      const next = theme === "light" ? "nuit" : "jour";
      btn.setAttribute("aria-label", `Passer en mode ${next}`);
      btn.title = `Mode ${next}`;
    }
  }

  apply(saved() || system());

  // Si le visiteur n'a rien choisi, on suit les changements du système
  if (mq && mq.addEventListener) mq.addEventListener("change", () => { if (!saved()) apply(system()); });

  document.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById("themeToggle");
    if (!btn) return;
    apply(root.getAttribute("data-theme"));
    btn.addEventListener("click", () => {
      const next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
      apply(next);
      try { localStorage.setItem(KEY, next); } catch (e) { /* stockage indisponible */ }
    });
  });
})();

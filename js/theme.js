/* Mode jour / nuit.
   Chargé dans le <head> pour appliquer le thème AVANT l'affichage (pas de flash).

   Le choix du visiteur doit suivre d'une page à l'autre dans TOUS les cas
   (GitHub Pages, fichiers ouverts en local, navigation privée, aperçus
   intégrés où le stockage est bloqué ou isolé par page). On le transmet donc
   de trois façons, de la plus fiable à la moins fiable :
     1. dans l'adresse des liens internes : page.html?theme=light
     2. localStorage (garde le choix d'une visite à l'autre)
     3. window.name (garde le choix dans l'onglet)
   Sans aucun choix : on suit le thème du système. */
(function () {
  "use strict";
  const KEY = "lm-theme";
  const PARAM = "theme";
  const NAME_RE = /(?:^|;)lm-theme=(light|dark)(?:;|$)/;
  const valid = (v) => (v === "light" || v === "dark" ? v : null);
  const root = document.documentElement;
  const mq = window.matchMedia ? matchMedia("(prefers-color-scheme: light)") : null;
  const system = () => (mq && mq.matches ? "light" : "dark");

  /* ---------- Lecture ---------- */
  function fromUrl() {
    try { return valid(new URL(location.href).searchParams.get(PARAM)); } catch (e) { return null; }
  }
  function fromStorage() {
    let v = null;
    try { v = valid(localStorage.getItem(KEY)); } catch (e) { /* stockage indisponible */ }
    if (v) return v;
    const m = NAME_RE.exec(window.name || "");
    return m ? m[1] : null;
  }
  function isBackForward() {
    try {
      const nav = performance.getEntriesByType("navigation")[0];
      return nav && nav.type === "back_forward";
    } catch (e) { return false; }
  }
  // Lien cliqué : l'adresse fait foi. Bouton "retour" : le dernier choix enregistré fait foi.
  const chosen = () => (isBackForward() ? fromStorage() || fromUrl() : fromUrl() || fromStorage());

  /* ---------- Écriture ---------- */
  function save(theme) {
    try { localStorage.setItem(KEY, theme); } catch (e) { /* stockage indisponible */ }
    try {
      const rest = (window.name || "").replace(/(?:^|;)lm-theme=(light|dark)/g, "").replace(/^;|;$/g, "");
      window.name = (rest ? rest + ";" : "") + `lm-theme=${theme}`;
    } catch (e) { /* rien */ }
    // met aussi l'adresse de la page courante à jour (utile pour le bouton "retour")
    try {
      const u = new URL(location.href);
      if (u.searchParams.get(PARAM) !== theme) {
        u.searchParams.set(PARAM, theme);
        history.replaceState(history.state, "", u.pathname + u.search + u.hash);
      }
    } catch (e) { /* rien */ }
  }

  function apply(theme) {
    root.setAttribute("data-theme", theme);
    const btn = document.getElementById("themeToggle");
    if (btn) {
      const next = theme === "light" ? "nuit" : "jour";
      btn.setAttribute("aria-label", `Passer en mode ${next}`);
      btn.title = `Mode ${next}`;
    }
  }

  /* ---------- Démarrage ---------- */
  const initial = chosen();
  apply(initial || system());
  if (initial) save(initial); // recopie le choix dans toutes les mémoires

  // Aucun choix : on suit les changements du thème du système
  if (mq && mq.addEventListener) mq.addEventListener("change", () => { if (!chosen()) apply(system()); });

  // Page restaurée depuis le cache du navigateur (retour arrière)
  window.addEventListener("pageshow", (e) => {
    if (!e.persisted) return;
    const t = fromStorage() || fromUrl();
    if (t) { apply(t); save(t); }
  });

  // Ajoute ?theme=… aux liens internes au moment du clic (y compris les liens
  // créés en JavaScript : cartes de projets, cartes de la collection, etc.)
  function tagLink(a) {
    const theme = root.getAttribute("data-theme");
    if (!valid(theme) || !a || !a.getAttribute("href")) return;
    const raw = a.getAttribute("href");
    if (/^(mailto:|tel:|javascript:|#)/i.test(raw) || a.hasAttribute("download")) return;
    let u;
    try { u = new URL(raw, location.href); } catch (e) { return; }
    if (u.origin !== location.origin || !/\.html?$|\/$/.test(u.pathname)) return;
    u.searchParams.set(PARAM, theme);
    a.href = u.href;
  }
  ["click", "auxclick", "keydown"].forEach((type) =>
    document.addEventListener(type, (e) => {
      if (type === "keydown" && e.key !== "Enter") return;
      tagLink(e.target.closest && e.target.closest("a[href]"));
    }, true));

  document.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById("themeToggle");
    if (!btn) return;
    apply(root.getAttribute("data-theme"));
    btn.addEventListener("click", () => {
      const next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
      apply(next);
      save(next);
    });
  });
})();

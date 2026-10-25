/* =========================================================================
   LANGUE — français / anglais
   Chargé dans le <head>, juste après theme.js.

   - Choix de la langue, du plus prioritaire au moins prioritaire :
       1. l'adresse de la page (?lang=en), ajoutée automatiquement aux liens internes
       2. le dernier choix du visiteur (localStorage / window.name)
       3. la langue du navigateur : français si elle commence par "fr", sinon anglais
   - Textes fixes des pages HTML : attribut data-i18n="clé" (texte) ou
     data-i18n-html="clé" (texte avec balises <b>, <sup>…). Le français reste
     écrit dans le HTML, seule la version anglaise est dans STRINGS.en.
   - Textes générés en JavaScript : I18N.t("clé").
   - Contenu (projets, cartes, parcours…) : js/data.en.js.
   ========================================================================= */
(function () {
  "use strict";
  const KEY = "lm-lang";
  const PARAM = "lang";
  const NAME_RE = /(?:^|;)lm-lang=(fr|en)(?:;|$)/;
  const valid = (v) => (v === "fr" || v === "en" ? v : null);

  const STRINGS = {
    fr: {
      "lang.switch": "Switch to English",
      "filter.all": "Tous",
      "card.open": "ouvrir →",
      "photo.alt": "Photo de {name}",
      "photo.placeholder": "// votre photo ici",
      "project.notFound": "Projet introuvable",
      "project.notFoundText": "Ce projet n'existe pas ou a été renommé.",
      "project.back": "Retour aux projets",
      "project.trailerSoon": "// trailer à venir<br>ajoutez l'ID YouTube dans data.js",
      "project.playTrailer": "Lire le trailer",
      "project.about": "Le projet",
      "project.did": "Ce que j'ai fait",
      "project.challenges": "Défis techniques",
      "project.play": "Jouer",
      "project.sheet": "Fiche technique",
      "field.year": "Année", "field.duration": "Durée", "field.context": "Contexte",
      "field.engine": "Moteur", "field.language": "Langage",
      "field.team": "Équipe", "field.role": "Mon rôle", "field.status": "Statut",
      "btn.playItch": "Jouer sur itch.io",
      "btn.code": "Voir le code",
      "btn.trailer": "Trailer sur YouTube",
      "btn.close": "Fermer",
      "btn.viewProject": "Voir le projet",
      "btn.again": "Tirer encore",
      "btn.collection": "Collection ({n}/{t})",
      "kind.skill": "Compétence", "kind.project": "Projet", "kind.profile": "Profil",
      "card.seeProject": "voir le projet →",
      "card.locked": "Carte non obtenue",
      "slot.pull": "Tirez le levier !",
      "slot.complete": "Collection complète ! 🎉",
      "slot.newCard": "Nouvelle carte · {r}",
      "slot.win": "{r} !",
      "col.count": "{n} / {t} cartes",
      "col.none": "Aucune carte ici.",
      "col.reset": "Remettre à zéro",
      "col.confirm": "Confirmer la remise à zéro ?"
    },
    en: {
      "lang.switch": "Passer en français",
      "filter.all": "All",
      "card.open": "open →",
      "photo.alt": "Photo of {name}",
      "photo.placeholder": "// your photo here",
      "project.notFound": "Project not found",
      "project.notFoundText": "This project doesn't exist or has been renamed.",
      "project.back": "Back to projects",
      "project.trailerSoon": "// trailer coming soon",
      "project.playTrailer": "Play the trailer",
      "project.about": "The project",
      "project.did": "What I did",
      "project.challenges": "Technical challenges",
      "project.play": "Play",
      "project.sheet": "Project sheet",
      "field.year": "Year", "field.duration": "Duration", "field.context": "Context",
      "field.engine": "Engine", "field.language": "Language",
      "field.team": "Team", "field.role": "My role", "field.status": "Status",
      "btn.playItch": "Play on itch.io",
      "btn.code": "View the code",
      "btn.trailer": "Trailer on YouTube",
      "btn.close": "Close",
      "btn.viewProject": "View project",
      "btn.again": "Pull again",
      "btn.collection": "Collection ({n}/{t})",
      "kind.skill": "Skill", "kind.project": "Project", "kind.profile": "Profile",
      "card.seeProject": "view project →",
      "card.locked": "Card not collected yet",
      "slot.pull": "Pull the lever!",
      "slot.complete": "Collection complete! 🎉",
      "slot.newCard": "New card · {r}",
      "slot.win": "{r}!",
      "col.count": "{n} / {t} cards",
      "col.none": "No cards here.",
      "col.reset": "Reset collection",
      "col.confirm": "Confirm reset?",

      /* ---- textes fixes des pages HTML ---- */
      "meta.title.home": "Louis Morvan · Game Programmer",
      "meta.title.project": "Project · Louis Morvan",
      "meta.title.collection": "Collection · Louis Morvan",
      "nav.projects": "Projects",
      "nav.collection": "Collection",
      "nav.about": "About me",
      "nav.journey": "Journey",
      "nav.contact": "Contact",
      "nav.allProjects": "← All projects",
      "nav.backMachine": "← Back to the machine",
      "theme.label": "Change theme",
      "machine.hint": "Click or pull the lever down",
      "machine.collection": "Collection",
      "machine.cards": "cards",
      "machine.lever": "Pull the lever",
      "how.btn": "How it's made",
      "how.title": "// under the hood",
      "how.1": "<b>Weighted draw without replacement</b>: each rarity has a weight, and a collected card leaves the pool. No duplicates possible.",
      "how.2": "<b>Reels</b>: symbol strips generated on every pull and animated in CSS with a slightly overshooting curve for the bounce. Gold cards make the 3rd reel spin longer.",
      "how.3": "<b>Lever</b>: dragged with Pointer Events, with a hand-written spring-back (<i>ease-out-back</i>).",
      "how.4": "<b>Collection saved</b> in the browser (localStorage).",
      "how.5": "Every card is described in a single data file, like ScriptableObjects.",
      "how.odds": "// odds for the next pull",
      "hero.label": "// game programmer",
      "hero.title": "Hi, I'm <span class=\"accent\">Louis Morvan</span>.",
      "hero.lead": "I build games and the systems that make them run. I mostly work in <b>Unity with C#</b>, I'm learning <b>Unreal Engine with C++</b>, and I do my 3D in <b>Blender</b>.",
      "hero.text": "I'm in the 1st year of a Master's in Game Programming. Pull the machine's lever to get cards about my skills and projects, and complete the collection.",
      "hero.projects": "See my projects",
      "hero.cv": "Download my CV",
      "section.projects": "Projects",
      "section.about": "About me",
      "section.journey": "Journey",
      "section.contact": "Contact",
      "about.cv": "Download my CV (PDF)",
      "journey.edu": "Education",
      "journey.pro": "Work experience",
      "contact.text": "An internship, a work-study position, a project? Get in touch.",
      "footer": "Handmade · HTML / CSS / JS · hosted on GitHub Pages",
      "loading": "Loading…",
      "col.label": "// collection",
      "col.title": "My cards",
      "col.tagline": "Every card in the machine. The ones you haven't pulled yet stay hidden.",
      "col.empty": "You don't have any cards yet.",
      "col.pull": "Pull the lever",
      "col.filters": "Filter cards",
      "col.f.all": "All",
      "col.f.skills": "Skills",
      "col.f.projects": "Projects",
      "col.f.profile": "Profile",
      "col.f.any": "Any",
      "col.f.owned": "Collected",
      "col.f.missing": "Missing",
      "col.unlock": "No time? Reveal everything"
    }
  };

  /* ---------------- Détection ---------------- */
  function fromUrl() { try { return valid(new URL(location.href).searchParams.get(PARAM)); } catch (e) { return null; } }
  function fromStorage() {
    let v = null;
    try { v = valid(localStorage.getItem(KEY)); } catch (e) { /* stockage indisponible */ }
    if (v) return v;
    const m = NAME_RE.exec(window.name || "");
    return m ? m[1] : null;
  }
  function fromBrowser() {
    const l = (navigator.languages && navigator.languages[0]) || navigator.language || "fr";
    return /^fr\b/i.test(l) ? "fr" : "en";
  }
  function save(lang) {
    try { localStorage.setItem(KEY, lang); } catch (e) { /* rien */ }
    try {
      const rest = (window.name || "").replace(/(?:^|;)lm-lang=(fr|en)/g, "").replace(/^;|;$/g, "");
      window.name = (rest ? rest + ";" : "") + `lm-lang=${lang}`;
    } catch (e) { /* rien */ }
  }

  const lang = fromUrl() || fromStorage() || fromBrowser();
  save(lang);
  document.documentElement.lang = lang;

  function t(key, vars) {
    let s = (STRINGS[lang] && STRINGS[lang][key]) ?? STRINGS.fr[key] ?? key;
    if (vars) s = s.replace(/\{(\w+)\}/g, (_, k) => (vars[k] ?? ""));
    return s;
  }

  /* ---------------- Textes fixes du HTML ---------------- */
  function applyStatic(root) {
    if (lang === "fr") return; // le HTML est déjà en français
    const dict = STRINGS.en;
    (root || document).querySelectorAll("[data-i18n]").forEach((el) => {
      const k = el.getAttribute("data-i18n");
      if (dict[k] != null) el.textContent = dict[k];
    });
    (root || document).querySelectorAll("[data-i18n-html]").forEach((el) => {
      const k = el.getAttribute("data-i18n-html");
      if (dict[k] != null) el.innerHTML = dict[k];
    });
    // attributs : data-i18n-attr="aria-label:clé;title:clé"
    (root || document).querySelectorAll("[data-i18n-attr]").forEach((el) => {
      el.getAttribute("data-i18n-attr").split(";").forEach((pair) => {
        const [attr, k] = pair.split(":").map((x) => x.trim());
        if (attr && dict[k] != null) el.setAttribute(attr, dict[k]);
      });
    });
    const tk = document.documentElement.getAttribute("data-title-key");
    if (tk && dict[tk]) document.title = dict[tk];
  }

  /* ---------------- Liens internes : on transmet ?lang= ---------------- */
  function tagLink(a) {
    if (!a || !a.getAttribute("href")) return;
    const raw = a.getAttribute("href");
    if (/^(mailto:|tel:|javascript:|#)/i.test(raw) || a.hasAttribute("download")) return;
    let u;
    try { u = new URL(raw, location.href); } catch (e) { return; }
    if (u.origin !== location.origin || !/\.html?$|\/$/.test(u.pathname)) return;
    u.searchParams.set(PARAM, lang);
    a.href = u.href;
  }
  ["click", "auxclick", "keydown"].forEach((type) =>
    document.addEventListener(type, (e) => {
      if (type === "keydown" && e.key !== "Enter") return;
      tagLink(e.target.closest && e.target.closest("a[href]"));
    }, true));

  /* ---------------- Bouton FR / EN ---------------- */
  function switchTo(next) {
    save(next);
    const u = new URL(location.href);
    u.searchParams.set(PARAM, next);
    location.replace(u.pathname + u.search + u.hash); // la page se recharge dans la nouvelle langue
  }
  document.addEventListener("DOMContentLoaded", () => {
    applyStatic(); // filet de sécurité si applyStatic n'a pas déjà été appelé
    const btn = document.getElementById("langToggle");
    if (!btn) return;
    btn.querySelectorAll("[data-lang]").forEach((s) => s.classList.toggle("on", s.dataset.lang === lang));
    btn.setAttribute("aria-label", t("lang.switch"));
    btn.title = t("lang.switch");
    btn.addEventListener("click", () => switchTo(lang === "fr" ? "en" : "fr"));
  });

  window.I18N = { lang, t, applyStatic };
})();

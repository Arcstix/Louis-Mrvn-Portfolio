/* =========================================================================
   CARTES — données, sauvegarde, tirage et rendu.
   Partagé par la machine à sous (index.html) et la page Collection.
   ========================================================================= */
(function () {
  "use strict";
  const D = window.PORTFOLIO;
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const L = (k, v) => (window.I18N ? I18N.t(k, v) : k);
  const KIND_LABEL = { skill: L("kind.skill"), project: L("kind.project"), profile: L("kind.profile") };
  const STARS = { gold: "★★★", silver: "★★", bronze: "★" };

  /* ---- Résolution : une carte "project" récupère titre et image du projet ---- */
  const projectsById = Object.fromEntries(D.projects.map((p) => [p.id, p]));
  const cards = D.cards.map((c, i) => {
    const p = c.kind === "project" ? projectsById[c.project] : null;
    const initials = (t) => t.split(/\s+/).map((w) => w[0]).join("").slice(0, 3).toUpperCase();
    return Object.assign({ num: i + 1 }, c, {
      title: c.title || (p ? p.title : "?"),
      image: c.icon || (p ? (p.cover || (p.youtube ? `https://i.ytimg.com/vi/${p.youtube}/hqdefault.jpg` : "")) : ""),
      glyph: c.glyph || initials(c.title || (p ? p.title : "?")),
      color: c.color || (p ? p.color : "#5ef0b5"),
      href: p ? `project.html?id=${encodeURIComponent(p.id)}` : ""
    });
  });
  const byId = Object.fromEntries(cards.map((c) => [c.id, c]));

  /* ---- Sauvegarde (localStorage, protégé : navigation privée, etc.) ---- */
  const KEY = "lm-cards-v1";
  let owned = new Set();
  try { (JSON.parse(localStorage.getItem(KEY)) || []).forEach((id) => byId[id] && owned.add(id)); } catch (e) { /* rien */ }
  function save() { try { localStorage.setItem(KEY, JSON.stringify([...owned])); } catch (e) { /* rien */ } }

  /* ---- Tirage pondéré SANS remise : impossible d'avoir un doublon ---- */
  function remaining() { return cards.filter((c) => !owned.has(c.id)); }
  function odds() {
    const rem = remaining();
    const total = rem.reduce((s, c) => s + D.rarity[c.rarity].weight, 0);
    const out = {};
    for (const r of Object.keys(D.rarity)) {
      const w = rem.filter((c) => c.rarity === r).reduce((s, c) => s + D.rarity[c.rarity].weight, 0);
      out[r] = total ? w / total : 0;
    }
    return out;
  }
  function draw() {
    const rem = remaining();
    if (!rem.length) return null;
    let roll = Math.random() * rem.reduce((s, c) => s + D.rarity[c.rarity].weight, 0);
    for (const c of rem) { roll -= D.rarity[c.rarity].weight; if (roll <= 0) return c; }
    return rem[rem.length - 1];
  }

  /* ---- Rendu HTML d'une carte ---- */
  function render(c, opts = {}) {
    const locked = opts.locked;
    const art = locked
      ? `<div class="tc-glyph">?</div>`
      : c.image
        ? `<img src="${esc(c.image)}" alt="" loading="lazy">`
        : `<div class="tc-glyph">${esc(c.glyph)}</div>`;
    const tag = c.href && !locked && opts.link ? "a" : "article";
    const href = tag === "a" ? ` href="${esc(c.href)}"` : "";
    return `
      <${tag} class="tcard r-${c.rarity}${locked ? " locked" : ""}${c.kind === "project" ? " is-project" : ""}"${href}
        style="--c:${esc(c.color)}" data-id="${esc(c.id)}" ${opts.button && !locked ? 'tabindex="0" role="button"' : ""}
        aria-label="${locked ? esc(L("card.locked")) : esc(c.title)}">
        <div class="tc-inner">
          <div class="tc-band"><span>${esc(D.rarity[c.rarity].label)}</span><span>#${String(c.num).padStart(2, "0")}/${cards.length}</span></div>
          <div class="tc-art">${art}</div>
          <div class="tc-body">
            <span class="tc-kind">${esc(KIND_LABEL[c.kind] || "")}</span>
            <h3>${locked ? "???" : esc(c.title)}</h3>
            ${locked ? "" : `<p class="tc-stat">${esc(c.stat)}</p><p class="tc-text">${esc(c.text)}</p>`}
          </div>
          <div class="tc-band bottom"><span>${STARS[c.rarity]}</span>${c.href && !locked ? `<span>${esc(L("card.seeProject"))}</span>` : ""}</div>
        </div>
        ${c.rarity === "gold" && !locked ? '<div class="tc-shine"></div>' : ""}
      </${tag}>`;
  }

  /* ---- Fenêtre de révélation (utilisée par la machine et la collection) ---- */
  let lastFocus = null;
  function ensureModal() {
    let m = document.getElementById("cardModal");
    if (m) return m;
    m = document.createElement("div");
    m.id = "cardModal";
    m.className = "card-modal";
    m.hidden = true;
    m.setAttribute("role", "dialog");
    m.setAttribute("aria-modal", "true");
    m.innerHTML = `
      <div class="cm-backdrop" data-close></div>
      <div class="cm-content">
        <p class="cm-title mono" id="cmTitle"></p>
        <div class="cm-stage"><div class="cm-flip" id="cmFlip"><div class="cm-back"></div><div class="cm-front" id="cmFront"></div></div><div class="cm-burst" id="cmBurst"></div></div>
        <div class="cm-actions" id="cmActions"></div>
      </div>`;
    document.body.appendChild(m);
    m.addEventListener("click", (e) => { if (e.target.closest("[data-close]")) closeModal(); });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !m.hidden) closeModal(); });
    return m;
  }
  function openModal(c, { reveal = false, title = "", actions = "" } = {}) {
    const m = ensureModal();
    lastFocus = document.activeElement;
    m.querySelector("#cmTitle").textContent = title;
    m.querySelector("#cmFront").innerHTML = render(c, { link: true });
    m.querySelector("#cmActions").innerHTML = actions + `<button class="btn" type="button" data-close>${esc(L("btn.close"))}</button>`;
    m.className = `card-modal r-${c.rarity}${reveal ? " reveal" : ""}`;
    const flip = m.querySelector("#cmFlip");
    flip.classList.remove("go"); void flip.offsetWidth; flip.classList.add("go"); // relance l'animation
    const burst = m.querySelector("#cmBurst");
    burst.innerHTML = reveal ? Array.from({ length: 18 }, (_, i) => `<i style="--a:${i * 20}deg;--d:${(i % 3) * 30}px"></i>`).join("") : "";
    m.hidden = false;
    document.body.style.overflow = "hidden";
    setTimeout(() => { const b = m.querySelector(".cm-actions .btn"); if (b) b.focus(); }, 50);
  }
  function closeModal() {
    const m = document.getElementById("cardModal");
    if (!m || m.hidden) return;
    m.hidden = true;
    document.body.style.overflow = "";
    if (lastFocus && lastFocus.focus) lastFocus.focus({ preventScroll: true });
    document.dispatchEvent(new CustomEvent("cards:closed"));
  }

  /* ---- API publique ---- */
  window.Cards = {
    all: cards, byId, render, draw, odds, openModal, closeModal,
    get total() { return cards.length; },
    get count() { return owned.size; },
    has: (id) => owned.has(id),
    add(id) { if (byId[id]) { owned.add(id); save(); } },
    unlockAll() { cards.forEach((c) => owned.add(c.id)); save(); },
    reset() { owned.clear(); save(); }
  };

  /* =======================================================================
     PAGE COLLECTION
     ======================================================================= */
  const root = document.getElementById("collectionRoot");
  if (!root) return;

  const grid = document.getElementById("colGrid");
  const prog = document.getElementById("colProgress");
  const bar = document.getElementById("colBar");
  const filtersEl = document.getElementById("colFilters");
  let kindFilter = "all", ownFilter = "all";

  function draw_() {
    const n = Cards.count, t = Cards.total;
    prog.textContent = L("col.count", { n, t });
    bar.style.width = `${(n / t) * 100}%`;
    const per = ["gold", "silver", "bronze"].map((r) => {
      const all = cards.filter((c) => c.rarity === r);
      return `<span class="rc r-${r}">${D.rarity[r].label} ${all.filter((c) => owned.has(c.id)).length}/${all.length}</span>`;
    }).join("");
    document.getElementById("colRarity").innerHTML = per;

    const list = cards.filter((c) =>
      (kindFilter === "all" || c.kind === kindFilter) &&
      (ownFilter === "all" || (ownFilter === "owned") === owned.has(c.id)));
    grid.innerHTML = list.length
      ? list.map((c) => render(c, { locked: !owned.has(c.id), button: true })).join("")
      : `<p class="muted" style="grid-column:1/-1;text-align:center">${esc(L("col.none"))}</p>`;
    document.getElementById("colEmpty").hidden = n > 0;
  }

  filtersEl.addEventListener("click", (e) => {
    const b = e.target.closest("button"); if (!b) return;
    const group = b.dataset.group;
    filtersEl.querySelectorAll(`button[data-group="${group}"]`).forEach((x) => x.setAttribute("aria-pressed", x === b));
    if (group === "kind") kindFilter = b.dataset.v; else ownFilter = b.dataset.v;
    draw_();
  });

  function openFromGrid(el) {
    const c = byId[el.dataset.id];
    if (!c || !owned.has(c.id)) return;
    openModal(c, { title: `${KIND_LABEL[c.kind]} · ${D.rarity[c.rarity].label}`,
      actions: c.href ? `<a class="btn primary" href="${esc(c.href)}">${esc(L("btn.viewProject"))}</a>` : "" });
  }
  grid.addEventListener("click", (e) => { const el = e.target.closest(".tcard"); if (el) openFromGrid(el); });
  grid.addEventListener("keydown", (e) => {
    if (e.key !== "Enter" && e.key !== " ") return;
    const el = e.target.closest(".tcard"); if (el) { e.preventDefault(); openFromGrid(el); }
  });

  document.getElementById("btnUnlock").addEventListener("click", () => { Cards.unlockAll(); draw_(); });
  const resetBtn = document.getElementById("btnReset");
  let armed = false, armT = 0;
  resetBtn.addEventListener("click", () => {
    if (!armed) {
      armed = true; resetBtn.textContent = L("col.confirm");
      clearTimeout(armT); armT = setTimeout(() => { armed = false; resetBtn.textContent = L("col.reset"); }, 3000);
      return;
    }
    armed = false; resetBtn.textContent = L("col.reset");
    Cards.reset(); draw_();
  });

  draw_();
})();

/* Rendu des pages à partir de js/data.js — aucune dépendance. */
(function () {
  "use strict";
  const D = window.PORTFOLIO;
  const t = (k, v) => (window.I18N ? I18N.t(k, v) : k);
  const $ = (s) => document.querySelector(s);
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const initials = (t) => t.split(/\s+/).map((w) => w[0]).join("").slice(0, 2).toUpperCase();

  function coverHTML(p) {
    if (p.cover) return `<img src="${esc(p.cover)}" alt="" loading="lazy">`;
    if (p.youtube) return `<img src="https://i.ytimg.com/vi/${esc(p.youtube)}/hqdefault.jpg" alt="" loading="lazy">`;
    return `<div class="cover-gen">${esc(initials(p.title))}</div>`;
  }

  /* ---------------- Page d'accueil ---------------- */
  function renderHome() {
    $("#skillTags").innerHTML = D.skills.map((s) => `<li>${esc(s)}</li>`).join("");

    // Filtres
    const ALL = "__all";
    const cats = [ALL, ...new Set(D.projects.map((p) => p.category))];
    const filters = $("#filters");
    filters.innerHTML = cats.map((c, i) => `<button class="chip" type="button" data-cat="${esc(c)}" aria-pressed="${i === 0}">${esc(c === ALL ? t("filter.all") : c)}</button>`).join("");
    filters.addEventListener("click", (e) => {
      const b = e.target.closest("button");
      if (!b) return;
      filters.querySelectorAll("button").forEach((x) => x.setAttribute("aria-pressed", x === b));
      drawCards(b.dataset.cat);
    });

    function drawCards(cat) {
      const list = D.projects.filter((p) => cat === ALL || p.category === cat);
      $("#projectCards").innerHTML = list.map((p) => `
        <a class="card" href="project.html?id=${encodeURIComponent(p.id)}" style="--c:${esc(p.color || "var(--accent)")}">
          <div class="cover">${coverHTML(p)}<span class="arrow">${esc(t("card.open"))}</span></div>
          <div class="body">
            <h3>${esc(p.title)}</h3>
            <p>${esc(p.tagline)}</p>
            <div class="meta"><span>${esc(p.engine)}</span><span>${esc(p.duration)}</span><span>${esc(p.context)}</span></div>
          </div>
        </a>`).join("");
    }
    drawCards(ALL);

    // Qui suis-je
    $("#aboutPhoto").innerHTML = D.photo
      ? `<img src="${esc(D.photo)}" alt="${esc(t("photo.alt", { name: D.name }))}" loading="lazy">`
      : `<div class="photo-placeholder" role="img" aria-label="Emplacement de la photo">
           <svg viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="38" r="17"/><path d="M18 92c2-20 16-31 32-31s30 11 32 31z"/></svg>
           <span class="mono">${esc(t("photo.placeholder"))}</span>
           <span class="mono muted">data.js → photo</span>
         </div>`;
    $("#aboutText").innerHTML = D.about.map((a) => `<p>${esc(a)}</p>`).join("");
    $("#aboutStats").innerHTML = D.stats.map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join("");

    // Parcours
    $("#timeline").innerHTML = D.timeline.map((e) => `
      <li class="tl-item ${e.type === "pro" ? "pro" : "edu"}">
        <span class="date">${esc(e.date)}</span>
        <h3>${esc(e.title)}</h3>
        <div class="place">${esc(e.place)}</div>
        <p>${esc(e.text)}</p>
      </li>`).join("");
    const items = document.querySelectorAll(".tl-item");
    if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: 0.2 });
      items.forEach((i) => io.observe(i));
    } else items.forEach((i) => i.classList.add("in"));

    // Contact
    $("#contactLinks").innerHTML = D.contact.map((c) => `<a class="btn" href="${esc(c.url)}" target="_blank" rel="noopener">${esc(c.label)}</a>`).join("");

    // Panneau "comment c'est fait"
    const how = $("#btnHow"), panel = $("#howPanel");
    how.addEventListener("click", () => { panel.hidden = !panel.hidden; how.setAttribute("aria-expanded", !panel.hidden); });
  }

  /* ---------------- Page projet ---------------- */
  function renderProject() {
    const id = new URLSearchParams(location.search).get("id");
    const idx = D.projects.findIndex((p) => p.id === id);
    const root = $("#projectRoot");
    if (idx < 0) {
      root.innerHTML = `<div class="p-head"><h1>${esc(t("project.notFound"))}</h1><p class="tagline">${esc(t("project.notFoundText"))}</p><p><a class="btn" href="index.html#projets">${esc(t("project.back"))}</a></p></div>`;
      return;
    }
    const p = D.projects[idx];
    document.title = `${p.title} · ${D.name}`;
    const prev = D.projects[(idx - 1 + D.projects.length) % D.projects.length];
    const next = D.projects[(idx + 1) % D.projects.length];

    const media = p.youtube
      ? `<button class="yt-lite" type="button" aria-label="${esc(t("project.playTrailer"))}" style="background-image:url(https://i.ytimg.com/vi/${esc(p.youtube)}/hqdefault.jpg)" data-id="${esc(p.youtube)}"></button>`
      : `<div class="empty">${t("project.trailerSoon")}</div>`;

    const field = (k, v) => v ? `<div class="field"><span>${esc(k)}</span><span>${esc(v)}</span></div>` : "";
    const comp = (name, body) => `<details class="comp" open><summary><i></i>${esc(name)}</summary>${body}<div class="pad"></div></details>`;

    root.style.setProperty("--c", p.color || "var(--accent)");
    root.innerHTML = `
      <div class="p-head">
        <p class="label">// ${esc(p.category)} · ${esc(p.year)}</p>
        <h1>${esc(p.title)}</h1>
        <p class="tagline">${esc(p.tagline)}</p>
      </div>
      <div class="p-grid">
        <div>
          <div class="media" id="media">${media}</div>
          <div class="block"><h2>${esc(t("project.about"))}</h2><p>${esc(p.summary)}</p></div>
          ${p.contributions?.length ? `<div class="block"><h2>${esc(t("project.did"))}</h2><ul>${p.contributions.map((c) => `<li>${esc(c)}</li>`).join("")}</ul></div>` : ""}
          ${p.challenges?.length ? `<div class="block"><h2>${esc(t("project.challenges"))}</h2>${p.challenges.map((c) => `<div class="challenge"><h3>${esc(c.title)}</h3><p>${esc(c.text)}</p></div>`).join("")}</div>` : ""}
          ${p.itchEmbed ? `<div class="block"><h2>${esc(t("project.play"))}</h2><iframe class="itch-embed" loading="lazy" src="https://itch.io/embed/${esc(p.itchEmbed)}?dark=true" title="${esc(p.title)} · itch.io"></iframe></div>` : ""}
        </div>
        <aside class="inspector" aria-label="${esc(t("project.sheet"))}">
          <header>▣ <b>${esc(p.title)}</b><span style="margin-left:auto">Inspector</span></header>
          ${comp("Transform", field(t("field.year"), p.year) + field(t("field.duration"), p.duration) + field(t("field.context"), p.context))}
          ${comp("Engine", field(t("field.engine"), p.engine) + field(t("field.language"), p.language))}
          ${comp("Team", field(t("field.team"), p.team) + field(t("field.role"), p.role))}
          ${comp("Build", field(t("field.status"), p.status))}
          <div class="actions">
            ${p.itchUrl ? `<a class="btn primary full" href="${esc(p.itchUrl)}" target="_blank" rel="noopener">${esc(t("btn.playItch"))}</a>` : ""}
            ${p.githubUrl ? `<a class="btn full" href="${esc(p.githubUrl)}" target="_blank" rel="noopener">${esc(t("btn.code"))}</a>` : ""}
            ${p.youtube ? `<a class="btn full" href="https://www.youtube.com/watch?v=${esc(p.youtube)}" target="_blank" rel="noopener">${esc(t("btn.trailer"))}</a>` : ""}
          </div>
        </aside>
      </div>
      <nav class="p-nav">
        <a class="btn" href="project.html?id=${encodeURIComponent(prev.id)}">← ${esc(prev.title)}</a>
        <a class="btn" href="project.html?id=${encodeURIComponent(next.id)}">${esc(next.title)} →</a>
      </nav>`;

    // Lecteur YouTube chargé au clic seulement (page plus légère)
    const yt = root.querySelector(".yt-lite");
    if (yt) yt.addEventListener("click", () => {
      $("#media").innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${encodeURIComponent(yt.dataset.id)}?autoplay=1&rel=0" title="Trailer" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>`;
    });
  }

  if (document.getElementById("projectRoot")) renderProject();
  else renderHome();
})();

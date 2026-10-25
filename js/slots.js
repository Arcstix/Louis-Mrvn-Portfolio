/* =========================================================================
   MACHINE À SOUS — page d'accueil
   Levier (clic, glisser ou clavier) -> rouleaux -> une carte sort de la fente
   -> révélation. Tirage sans remise géré par js/cards.js.
   ========================================================================= */
(function () {
  "use strict";
  const machine = document.getElementById("machine");
  if (!machine || !window.Cards) return;
  const D = window.PORTFOLIO;
  const L = (k, v) => (window.I18N ? I18N.t(k, v) : k);

  const reels = [...machine.querySelectorAll(".reel .strip")];
  const lever = document.getElementById("lever");
  const ball = document.getElementById("leverBall");
  const stick = document.getElementById("leverStick");
  const msg = document.getElementById("slotMsg");
  const eject = document.getElementById("cardEject");
  const countEls = document.querySelectorAll("[data-card-count]");
  const oddsEl = document.getElementById("slotOdds");

  const reduced = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  const FILLER = ["7", "★", "◆", "♥", "●", "♣", "{ }"];
  const sleep = (ms) => new Promise((r) => setTimeout(r, reduced ? Math.min(ms, 120) : ms));
  let busy = false;

  /* ---------------- Compteurs / probabilités ---------------- */
  function refresh() {
    countEls.forEach((el) => { el.textContent = `${Cards.count}/${Cards.total}`; });
    if (oddsEl) {
      const o = Cards.odds();
      oddsEl.innerHTML = Object.keys(D.rarity).map((r) =>
        `<li><span class="rc r-${r}">${D.rarity[r].label}</span> ${(o[r] * 100).toFixed(0)} %</li>`).join("");
    }
    if (Cards.count >= Cards.total) setMsg(L("slot.complete"));
  }
  function setMsg(t) { msg.textContent = t; }

  /* ---------------- Rouleaux ---------------- */
  function fillStrip(strip, finalSym, len) {
    const syms = [];
    for (let i = 0; i < len; i++) syms.push(FILLER[(Math.random() * FILLER.length) | 0]);
    syms.push(finalSym);
    strip.innerHTML = syms.map((s) => `<div class="sym" data-s="${s}">${s}</div>`).join("");
    return syms.length;
  }
  function idleReels() {
    reels.forEach((s) => { s.style.transition = "none"; s.style.transform = "translateY(0)"; fillStrip(s, FILLER[(Math.random() * FILLER.length) | 0], 0); });
  }
  function spinReels(finalSyms, suspense) {
    return Promise.all(reels.map((strip, i) => new Promise((resolve) => {
      const n = fillStrip(strip, finalSyms[i], 18 + i * 6);
      const h = strip.firstElementChild.offsetHeight;
      strip.style.transition = "none";
      strip.style.transform = "translateY(0)";
      void strip.offsetHeight; // force le reflow avant de lancer la transition
      let dur = reduced ? 0.2 : 1.0 + i * 0.4 + (suspense && i === 2 ? 0.9 : 0);
      strip.style.transition = `transform ${dur}s cubic-bezier(.12,.8,.25,1.06)`;
      strip.style.transform = `translateY(${-(n - 1) * h}px)`;
      setTimeout(() => { strip.parentElement.classList.add("stopped"); resolve(); }, dur * 1000);
    })));
  }

  /* ---------------- Levier ---------------- */
  // p = 0 (levier en haut) .. 1 (levier tiré en bas)
  function setLever(p) {
    const travel = lever.clientHeight - ball.offsetHeight;
    const pivot = travel / 2 + ball.offsetHeight / 2;
    const y = p * travel;
    const center = y + ball.offsetHeight / 2;
    ball.style.transform = `translateY(${y}px)`;
    stick.style.top = `${Math.min(center, pivot)}px`;
    stick.style.height = `${Math.abs(center - pivot)}px`;
    // le bout du levier grossit en passant devant (effet de perspective)
    ball.style.scale = String(1 + Math.sin(p * Math.PI) * 0.25);
  }
  function tweenLever(from, to, ms, ease) {
    return new Promise((resolve) => {
      const t0 = performance.now();
      const step = (now) => {
        const k = Math.min(1, (now - t0) / (reduced ? 1 : ms));
        setLever(from + (to - from) * ease(k));
        if (k < 1) requestAnimationFrame(step); else resolve();
      };
      requestAnimationFrame(step);
    });
  }
  const easeIn = (k) => k * k;
  const easeOutBack = (k) => { const c = 1.9; return 1 + (c + 1) * (k - 1) ** 3 + c * (k - 1) ** 2; };

  /* ---------------- Séquence complète ---------------- */
  async function pull(fromP = 0) {
    if (busy) return;
    busy = true;
    machine.classList.add("busy");
    machine.classList.remove("win-gold", "win-silver", "win-bronze");
    machine.querySelectorAll(".reel").forEach((r) => r.classList.remove("stopped"));
    lever.classList.add("pulled");

    await tweenLever(fromP, 1, 160 * (1 - fromP) + 40, easeIn);
    const springBack = tweenLever(1, 0, 650, easeOutBack);

    const card = Cards.draw();
    if (!card) {
      setMsg(L("slot.complete"));
      await springBack;
      await spinReels(["7", "7", "7"], false);
      machine.classList.add("win-gold");
      done();
      return;
    }

    setMsg("…");
    const sym = D.rarity[card.rarity].symbol;
    await spinReels([sym, sym, sym], card.rarity === "gold");
    machine.classList.add(`win-${card.rarity}`);
    setMsg(L("slot.win", { r: D.rarity[card.rarity].label }));

    // la carte sort de la fente
    eject.className = `card-eject r-${card.rarity}`;
    void eject.offsetWidth;
    eject.classList.add("out");
    await sleep(750);

    Cards.add(card.id);
    refresh();
    Cards.openModal(card, {
      reveal: true,
      title: L("slot.newCard", { r: D.rarity[card.rarity].label }),
      actions: (card.href ? `<a class="btn" href="${card.href}">${L("btn.viewProject")}</a>` : "") +
               `<a class="btn" href="collection.html">${L("btn.collection", { n: Cards.count, t: Cards.total })}</a>` +
               (Cards.count < Cards.total ? `<button class="btn primary" type="button" id="cmAgain">${L("btn.again")}</button>` : "")
    });
    const again = document.getElementById("cmAgain");
    if (again) again.addEventListener("click", () => { Cards.closeModal(); setTimeout(() => pull(), 150); }, { once: true });
    done();
  }
  function done() {
    busy = false;
    machine.classList.remove("busy");
    lever.classList.remove("pulled");
  }
  document.addEventListener("cards:closed", () => {
    eject.classList.remove("out");
    if (Cards.count < Cards.total) setMsg(L("slot.pull"));
  });

  /* ---------------- Entrées : clic, glisser, clavier ---------------- */
  let drag = null;
  ball.addEventListener("pointerdown", (e) => {
    if (busy) return;
    drag = { id: e.pointerId, y0: e.clientY, p: 0, moved: false };
    ball.setPointerCapture(e.pointerId);
    e.preventDefault();
  });
  ball.addEventListener("pointermove", (e) => {
    if (!drag || e.pointerId !== drag.id) return;
    const travel = lever.clientHeight - ball.offsetHeight;
    drag.p = Math.max(0, Math.min(1, (e.clientY - drag.y0) / travel));
    if (drag.p > 0.04) drag.moved = true;
    setLever(drag.p);
  });
  function endDrag(e) {
    if (!drag || e.pointerId !== drag.id) return;
    const { p, moved } = drag;
    drag = null;
    if (!moved || p > 0.55) pull(p);          // simple clic, ou levier tiré assez bas
    else tweenLever(p, 0, 400, easeOutBack);  // pas assez tiré : il remonte
  }
  ball.addEventListener("pointerup", endDrag);
  ball.addEventListener("pointercancel", endDrag);
  ball.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); pull(); } });
  // toute la machine est cliquable aussi
  machine.addEventListener("click", () => pull());

  // (le bouton "Comment c'est fait" est géré par site.js)

  // Lumières du fronton
  const lights = document.getElementById("mLights");
  if (lights) lights.innerHTML = Array.from({ length: 14 }, (_, i) => `<i style="--i:${i}"></i>`).join("");

  idleReels();
  setLever(0);
  window.addEventListener("resize", () => setLever(0));
  refresh();
})();

/* =========================================================================
   CONTENU EN ANGLAIS
   Même structure que data.js, mais on ne met QUE les textes à traduire.
   Tout ce qui n'est pas ici (images, liens, couleurs, moteurs…) vient de data.js.
   - about, stats      : listes complètes (elles remplacent celles de data.js)
   - timeline          : même ordre que dans data.js
   - cards, projects   : rangés par "id"
   Si un texte manque ici, la version française est affichée.
   ========================================================================= */
window.PORTFOLIO_EN = {
  about: [
    "Ever since I was a kid, I've been fascinated by virtual reality. It all started with Ready Player One and Sword Art Online: two works that made me want to build imaginary worlds that feel more real than life.",
    "Over time, I realized that what drives me isn't so much the technology itself as what it brings to life. My goal is to create immersive experiences that make magic believable and give players real emotions.",
    "I mainly work in Unity with C#. I'm currently leveling up on Unreal Engine and C++. I also do 3D modeling in Blender."
  ],

  stats: [
    ["Main engine", "Unity · C#"],
    ["Currently learning", "Unreal · C++"],
    ["3D", "Blender"],
    ["Languages", "French, English (TOEIC)"]
  ],

  // Même ordre que la timeline de data.js (du plus récent au plus ancien)
  timeline: [
    { title: "Master's in Game Programming",
      text: "Gameplay programming, Unity, C#, Unreal, C++, AI. Group projects with game designers and artists." },
    { date: "2026 · 6 months", title: "R&D Developer Intern",
      text: "Analysis of the factors causing cybersickness. Development of technical solutions. Merging several applications into a single tool." },
    { title: "Game Master",
      text: "Welcoming players, explaining the rules and acting." },
    { date: "2025 · 2 months", title: "Unity AR Developer Intern",
      text: "Technology watch on 3D modeling and AR. Built an augmented-reality escape game." },
    { title: "Bachelor's in Game Design",
      text: "Gameplay programming, Unity, C#, game design, Blender. Several projects in teams of 6, each member with a defined role." },
    { date: "2022 · 6 months", title: "Associate Game Developer",
      text: "Gameplay programming, Unity, C#." },
    { title: "DUT (2-year technical degree) in Physical Measurements",
      text: "Metrology, mathematics, fluid mechanics, embedded systems and programming." }
  ],

  rarity: {
    gold:   { label: "Gold" },
    silver: { label: "Silver" },
    bronze: { label: "Bronze" }
  },

  cards: {
    "unity":   { stat: "4 years of experience", text: "My main engine: gameplay, editor tools, UI, optimization." },
    "csharp":  { stat: "4 years of experience", text: "The language I know best: OOP, design patterns, async, LINQ." },
    "unreal":  { stat: "Currently learning", text: "Actors, Components, Blueprints and Enhanced Input, studied during my Master's." },
    "cpp":     { stat: "Currently learning", text: "Pointers, memory, Unreal macros (UPROPERTY, UFUNCTION)." },
    "blender": { stat: "Since 2023", text: "Modeling, UVs, export to Unity and Unreal. My very first 3D model? A dragon. Quite the challenge for a beginner!" },
    "passion-vr": { title: "VR / AR passion", stat: "Ready Player One · SAO", text: "My passion for virtual and augmented reality comes from Ready Player One and Sword Art Online." },
    "git":     { stat: "All my projects", text: "Branches, pull requests, Git LFS for assets." },
    "master":  { title: "Master's", stat: "Game Programming · 1st year", text: "ICAN, Paris. Gameplay, engines, C++ and AI." },
    "langues": { title: "Languages", glyph: "EN", stat: "French · English", text: "Fluent English, TOEIC certified." },

    "card-oryn":         { stat: "Bachelor's final project", text: "Attraction / repulsion controller and surveillance-camera AI." },
    "card-traffic-hell": { stat: "Puzzle · simulation", text: "Car driving that follows the rules of the road, plus a level-building tool." },
    "card-be-quiet":     { stat: "Unreal · C++", text: "Player movement and sound propagation through walls." },
    "card-stellar-hive": { stat: "Toy prototype", text: "Character control and optimized stars that follow the player." }
  },

  projects: {
    "projet-be-quiet": {
      tagline: "Horror survival game",
      duration: "3 months",
      team: "2 people (2 devs)",
      context: "1st-year project, Master's in Game Programming",
      status: "Completed",
      summary: "You're trapped in a building with a monster, and your goal is to get out while making as little noise as possible.",
      contributions: [
        "Player character movement",
        "Sound emission / detection mechanic"
      ],
      challenges: [
        { title: "How walls affect sound", text: "To keep the system balanced, the sound made by the player had to be harder for the monster to hear when they're not in the same room." }
      ]
    },
    "projet-oryn": {
      tagline: "Fast-paced 3D platformer",
      duration: "1 year",
      team: "6 people (1 dev, 2 GD, 3 artists)",
      context: "Bachelor's final project",
      status: "Completed",
      summary: "The game has two complementary mechanics: attraction and repulsion. The player uses attraction to move around and repulsion to destroy the obstacles in their path.",
      contributions: [
        "Character controller (movement, attracting and repelling objects).",
        "Enemy AI built on a state machine, working like a surveillance camera."
      ],
      challenges: [
        { title: "Switching from attraction to repulsion", text: "The main challenge was getting smooth transitions between the attraction and repulsion phases. My solution was a state machine. The result is clearly separated phases, with no unwanted overlap between the mechanics." },
        { title: "Objects with modular behavior", text: "The behavior of the objects tied to the core mechanic changed a lot throughout development. This led me to build a modular system that makes it easy to switch from one behavior to another for testing." }
      ]
    },
    "projet-traffic-hell": {
      tagline: "Puzzle traffic simulator",
      duration: "6 months",
      team: "5 people (2 devs, 1 GD, 2 artists)",
      context: "End-of-2nd-year Bachelor's project",
      role: "Programming",
      status: "Completed",
      summary: "In Traffic Hell, you sow chaos in a calm, quiet town. Cause pile-ups to fill your chaos meter and make sure the town can never recover.",
      contributions: [
        "Car driving logic",
        "A tool to build levels more easily in Unity."
      ],
      challenges: [
        { title: "A simulator inside a game", text: "Left alone, the game must run without a single accident until the player steps in. Implementing the rules of the road in the cars' behavior was therefore crucial." }
      ]
    },
    "projet-stellar-hive": {
      tagline: "Toy prototype",
      duration: "3 months",
      team: "3 people (1 dev, 1 GD, 1 artist)",
      context: "Start-of-2nd-year Bachelor's project",
      role: "Programming",
      status: "Completed",
      summary: "Play as a white star that can attract the colored stars around it. Gather as many stars as you can, then enjoy the fireworks by making them all explode.",
      contributions: [
        "Character control",
        "Star-following system"
      ],
      challenges: [
        { title: "Optimizing star behavior", text: "The game relies entirely on physics, which causes performance issues once many stars start following the player. My solution was to disable physics on stars that are surrounded by other stars." }
      ]
    }
  }
};

/* ---- Application : remplace les textes français par les textes anglais ---- */
(function () {
  "use strict";
  const D = window.PORTFOLIO, EN = window.PORTFOLIO_EN;
  if (!D || !EN || !window.I18N || I18N.lang !== "en") return;

  if (EN.about) D.about = EN.about;
  if (EN.stats) D.stats = EN.stats;
  if (EN.skills) D.skills = EN.skills;
  (EN.timeline || []).forEach((tr, i) => { if (D.timeline[i] && tr) Object.assign(D.timeline[i], tr); });
  Object.keys(EN.rarity || {}).forEach((r) => { if (D.rarity[r]) Object.assign(D.rarity[r], EN.rarity[r]); });
  D.cards.forEach((c) => { if (EN.cards && EN.cards[c.id]) Object.assign(c, EN.cards[c.id]); });
  D.projects.forEach((p) => { if (EN.projects && EN.projects[p.id]) Object.assign(p, EN.projects[p.id]); });
})();

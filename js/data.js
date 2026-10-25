/* =========================================================================
   CONTENU DU PORTFOLIO
   C'est le seul fichier à modifier pour mettre à jour le site.
   - youtube : l'ID de la vidéo (ce qu'il y a après "v=" dans l'URL)
   - itchEmbed : l'ID du jeu pour le widget itch.io (page du jeu > Edit > Distribute > Embed)
   - Laisser une valeur à "" pour masquer le bloc correspondant.
   ========================================================================= */
window.PORTFOLIO = {
  name: "Louis Morvan",
  role: "Game Programmer",

  // Photo de la section "Qui suis-je" (format portrait conseillé, ex. 800 x 1000 px).
  // Laisser "" pour afficher le placeholder.
  photo: "assets/Photo_Profil.jpg",

  skills: ["Unity", "C#", "Unreal Engine", "C++", "Blender", "Git / GitHub"],

  about: [
      "Depuis tout petit, la réalité virtuelle me fascine. Tout a commencé avec Ready Player One et Sword Art Online : deux œuvres qui m’ont donné envie de construire des mondes imaginaires plus vrais que nature.",
    "Avec le temps, j’ai compris que ce qui me passionne, ce n’est pas tant la technologie elle-même que ce qu’elle permet de faire vivre. Mon objectif est de créer des expériences immersives qui rendent la magie crédible et qui procurent de vraies émotions aux joueurs.",
    "Je travaille principalement sur Unity en C#. En ce moment je monte en compétence sur Unreal Engine et le C++. Je modélise aussi en 3D sur Blender.",
  ],

  stats: [
    ["Moteur principal", "Unity · C#"],
    ["En apprentissage", "Unreal · C++"],
    ["3D", "Blender"],
    ["Langue(s)", "Français, Anglais (TOEIC)"]
  ],

  // Du plus récent au plus ancien
  timeline: [
    { type: "edu", date: "2026 — 2028", title: "Mastère Game Programming", place: "ICAN, Paris",
      text: "Programmation gameplay, Unity, C#, Unreal, C++, IA. Projets de groupe avec des game designers et des artistes." },
    { type: "pro", date: "2026 · 6 mois", title: "Stage développeur R&D", place: "EDF, Palaiseau",
      text: "Analyse des facteurs causant la cybercinétose. Développement de solutions techniques. Regroupement de plusieurs applications au sein d'un outil unique." },
    { type: "pro", date: "2024 — 2026", title: "Game Master", place: "Glorious Escape, Vélizy-Villacoublay",
      text: "Accueil des joueurs, explication des règles et acting." }, 
    { type: "pro", date: "2025 · 2 mois", title: "Stage Unity Développeur RA", place: "Immersize Studio, Remote",
      text: "Veille technologique sur la modélisation 3D et la RA. Création d'un Escape Game en réalité augmentée." },
    { type: "edu", date: "2023 — 2025", title: "Bachelor Game Design", place: "ICAN, Paris",
      text: "Programmation gameplay, Unity, C#, Game Design, Blender. Plusieurs projets en groupe de 6 avec chacun un rôle." },
    { type: "edu", date: "2022 · 6 mois", title: "Associate Game Developer", place: "3W ACADEMY, Remote",
      text: "Programmation gameplay, Unity, C#." }, 
    { type: "edu", date: "2019 — 2021", title: "DUT Mesures Physiques", place: "Université d'Orsay, Paris-Saclay",
      text: "Métrologie, mathématiques, mécanique des fluides, systèmes embarqués et programmation." }
  ],

  contact: [
    { label: "E-mail", url: "mailto:louis.morvan01@gmail.com" },
    { label: "GitHub", url: "https://github.com/Arcstix" },
    { label: "itch.io", url: "https://louismrvn.itch.io" },
    { label: "YouTube", url: "https://youtube.com/@louismorvan2798" },
    { label: "LinkedIn", url: "https://linkedin.com/in/louis-morvan" }
  ],

  /* ---------------------------------------------------------------------
     CARTES DE LA MACHINE À SOUS
     - kind   : "skill" (compétence), "project" (projet) ou "profile" (infos sur moi)
     - rarity : "gold", "silver" ou "bronze" (plus c'est rare, moins ça sort souvent)
     - icon   : image du logo, ex. "assets/cards/unity.png" (vide = monogramme "glyph")
     - stat   : la ligne mise en avant sous le titre
     - Pour un projet : "project" = id du projet ci-dessous. Le titre et l'image
       viennent du projet si "title" / "icon" sont vides.
     L'ordre de la liste = le numéro de la carte dans la collection.
     --------------------------------------------------------------------- */
  rarity: {
    gold:   { label: "Or",     weight: 1,   symbol: "7" },
    silver: { label: "Argent", weight: 2.5, symbol: "★" },
    bronze: { label: "Bronze", weight: 5,   symbol: "◆" }
  },

  cards: [
    { id: "unity", kind: "skill", rarity: "gold", title: "Unity", glyph: "U", color: "#e8ebf2", icon: "",
      stat: "4 ans d'expérience", text: "Mon moteur principal : gameplay, outils d'éditeur, UI, optimisation." },
    { id: "csharp", kind: "skill", rarity: "gold", title: "C#", glyph: "C#", color: "#b48cff", icon: "",
      stat: "4 ans d'expérience", text: "Langage que je maîtrise le mieux : POO, design patterns, async, LINQ." },
    { id: "unreal", kind: "skill", rarity: "silver", title: "Unreal Engine", glyph: "UE", color: "#cfd6e4", icon: "",
      stat: "En apprentissage", text: "Actors, Components, Blueprints et Enhanced Input, étudiés en Mastère." },
    { id: "cpp", kind: "skill", rarity: "silver", title: "C++", glyph: "C++", color: "#6aa8ff", icon: "",
      stat: "En apprentissage", text: "Pointeurs, mémoire, macros Unreal (UPROPERTY, UFUNCTION)." },
    { id: "blender", kind: "skill", rarity: "silver", title: "Blender", glyph: "B", color: "#ffb84d", icon: "",
      stat: "Depuis 2023", text: "Modélisation, UV, export vers Unity et Unreal. Mon tout premier modèle 3D ? Un dragon. Un sacré défi pour débuter !" },
    { id: "passion-vr", kind: "profile", rarity: "silver", title: "Passion VR / AR", glyph: "VR", color: "#9b8cff", icon: "",
      stat: "Ready Player One · SAO", text: "Ma passion pour la réalité virtuelle et la réalité augmentée vient de Ready Player One et Sword Art Online." },
    { id: "git", kind: "skill", rarity: "bronze", title: "Git / GitHub", glyph: "git", color: "#ff7a59", icon: "",
      stat: "Tous mes projets", text: "Branches, pull requests, Git LFS pour les assets." },
    { id: "master", kind: "profile", rarity: "bronze", title: "Mastère", glyph: "M1", color: "#5ef0b5", icon: "",
      stat: "Game Programming · 1re année", text: "ICAN, Paris. Gameplay, moteurs, C++ et IA." },
    { id: "langues", kind: "profile", rarity: "bronze", title: "Langues", glyph: "FR", color: "#5ef0b5", icon: "",
      stat: "Français · Anglais", text: "Anglais courant, certifié par le TOEIC." },

      { id: "card-oryn", kind: "project", rarity: "gold", project: "projet-oryn",
          stat: "Projet de fin de Bachelor", text: "Contrôleur attraction / répulsion et IA de caméras de surveillance." },
      { id: "card-traffic-hell", kind: "project", rarity: "gold", project: "projet-traffic-hell",
          stat: "Puzzle · simulation", text: "Conduite des voitures selon le code de la route et outil de création de niveaux." },
      { id: "card-be-quiet", kind: "project", rarity: "gold", project: "projet-be-quiet",
          stat: "Unreal · C++", text: "Déplacements du joueur et propagation du son à travers les murs." },
      { id: "card-stellar-hive", kind: "project", rarity: "silver", project: "projet-stellar-hive",
          stat: "Prototype jouet", text: "Contrôle du personnage et étoiles qui suivent le joueur, optimisées." }
  ],

  /* ---------------------------------------------------------------------
     PROJETS — "id" sert d'adresse : project.html?id=<id>
     --------------------------------------------------------------------- */
  projects: [
    {
      id: "projet-be-quiet",
      title: "Be Quiet",
      tagline: "Horror survival game",
      engine: "Unreal",
      language: "C++, Blueprints",
      category: "Unreal",
      duration: "3 mois",
      team: "2 personnes (2 dev)",
      context: "Projet de 1re année de Mastère Game Programming",
      year: "2026",
      role: "Gameplay programmer",
      status: "Terminé",
      cover: "assets/CoverBQ.png",
      color: "#9b8cff",
      youtube: "",
      itchUrl: "https://louismrvn.itch.io/be-quiet",
      itchEmbed: "",
      githubUrl: "https://github.com/Arcstix/UE_Stealth_Game",
      summary: "Tu es coincé dans un bâtiment avec un monstre et ton objectif est de sortir de cet endroit en faisant le moins de bruit possible.",
      contributions: [
          "Déplacement du personnage joueur",
          "Mécanique d'émission/réception de son"
      ],
      challenges: [
          { title: "Impact des murs sur le son", text: "Afin d'avoir un système équilibré il était important que le son émis par le joueur soit plus difficile à entendre pour le monstre s'ils ne se trouvent pas dans la même pièce." }
      ]
    },
    {
      id: "projet-oryn",
      title: "Oryn",
      tagline: "Fast Platformer 3D",
      engine: "Unity",
      language: "C#",
      category: "Unity",
      duration: "1 an",
      team: "6 personnes (1 dev, 2 GD, 3 artistes)",
      context: "Projet de fin de Bachelor",
      year: "2025",
      role: "Gameplay programmer",
      status: "Terminé",
      cover: "assets/CoverOryn.png",            // ex : "assets/projet1.jpg" (laisser vide = visuel généré)
      color: "#ff5d73",
      youtube: "Jg9qDAzFxKM",          // ex : "dQw4w9WgXcQ"
      itchUrl: "https://louismrvn.itch.io/oryn",          // ex : "https://pseudo.itch.io/mon-jeu"
      itchEmbed: "",        // ex : "1234567"
      githubUrl: "https://github.com/Arcstix/ProjetAnnuel3GD",
      summary: "Ce jeu possède 2 mécaniques complémentaires d'attraction et de répulsion. Le joueur utilise sa mécanique d'attraction pour se déplacer et sa mécanique de répulsion pour détruire les obstacles sur son chemin.",
      contributions: [
        "Contrôleur du personnage (déplacement, attraction et répulsion des objets).",
        "IA ennemie avec machine à états style caméra de surveillance."
      ],
      challenges: [
        { title: "Passer de l'attraction à la répulsion", text: "Le problème principal était d'avoir une évolution fluide entre les phases d'attraction et de répulsion. Ma solution a été de faire une machine à états. Le résultat donne des phases bien distinctes et évite des superpositions non voulues dans les mécaniques." },
        { title: "Des objets au comportement modulaire", text: "Le comportement des objets qui permettent d'utiliser la mécanique principale a été très différent tout au long du développement. Cela m'a demandé de créer un système modulaire qui permet de passer d'un comportement à un autre facilement pour les tests." }
      ]
    },
    {
      id: "projet-traffic-hell",
      title: "Traffic Hell",
      tagline: "Puzzle traffic simulator",
      engine: "Unity",
      language: "C#",
      category: "Unity",
      duration: "6 mois",
      team: "5 personnes (2 dev, 1 GD, 2 artistes)",
      context: "Projet de fin de 2e année de Bachelor",
      year: "2024",
      role: "Programmation",
      status: "Terminé",
      cover: "assets/CoverTH.gif",
      color: "#4dd6c4",
      youtube: "fVmDPDCKa-c",
      itchUrl: "https://tuturgames.itch.io/traffic-hell",
      itchEmbed: "",
      githubUrl: "",
      summary: "Dans Traffic Hell, semez le chaos au sein d'une ville calme et tranquille. Provoquez des carambolages afin d'augmenter votre jauge de chaos et faites en sorte que la ville ne soit plus capable de s'en remettre.",
      contributions: [
        "Logique de conduite des voitures",
        "Création d'un outil afin de réaliser des niveaux plus facilement dans Unity."
      ],
      challenges: [
        { title: "Un simulateur dans un jeu", text: "L'état initial du jeu doit faire en sorte qu'il n'y ait aucun accident sans l'intervention du joueur. Il était donc crucial d'implémenter les différentes règles du code de la route dans le comportement des voitures." }
      ]
    },
    {
      id: "projet-stellar-hive",
      title: "Stellar Hive",
      tagline: "Prototype jouet",
      engine: "Unity",
      language: "C#",
      category: "Unity",
      duration: "3 mois",
      team: "3 personnes (1 dev, 1 GD, 1 artiste)",
      context: "Projet de début de 2e année de Bachelor",
      year: "2023",
      role: "Programmation",
      status: "Terminé",
      cover: "assets/CoverSH.png",
      color: "#ffb84d",
      youtube: "NbMCMNL1Jjg",
      itchUrl: "https://lonknico.itch.io/stellar-hive",
      itchEmbed: "",
      githubUrl: "https://github.com/Arcstix/ProjetSemestriel2GDA",
      summary: "Incarne une étoile blanche capable d'attirer les autres de couleur autour d'elle. Accumule un maximum d'étoiles et profite du feu d'artifice en les faisant toutes exploser.",
      contributions: [
        "Contrôle du personnage",
        "Système de suivi des étoiles"
      ],
      challenges: [
        { title: "Optimisation du comportement des étoiles", text: "Ce jeu repose entièrement sur de la physique ce qui amène des problèmes de performance quand de nombreuses étoiles commencent à suivre le joueur. Ma solution a été de désactiver la physique sur les étoiles qui sont entourées par d'autres étoiles." }
      ]
    }
  ]
};

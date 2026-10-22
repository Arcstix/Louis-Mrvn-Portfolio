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
  photo: "",

  skills: ["Unity", "C#", "Unreal Engine", "C++", "Blender", "Python", "Git / GitHub"],

  about: [
    "J'ai 25 ans et je suis en 1re année de Mastère Game Programming. Ce qui me plaît, c'est la partie invisible du jeu : les systèmes de gameplay, l'IA, les outils, et tout ce qui rend un contrôle agréable en main.",
    "Je travaille principalement sur Unity en C#. En ce moment je monte en compétence sur Unreal Engine et le C++. Je modélise sur Blender et j'écris des addons Python pour accélérer mon pipeline.",
    "Je cherche [un stage / une alternance] à partir de [date]."
  ],

  stats: [
    ["Moteur principal", "Unity · C#"],
    ["En apprentissage", "Unreal · C++"],
    ["3D", "Blender"],
    ["Langue(s)", "Français, Anglais"]
  ],

  // Du plus récent au plus ancien
  timeline: [
    { type: "edu", date: "2026 — 2028", title: "Mastère Game Programming", place: "[Nom de l'école], [Ville]",
      text: "Programmation gameplay, moteurs, C++, IA, réseau. Projets de groupe avec des game designers et des artistes." },
    { type: "pro", date: "2025 · 4 mois", title: "Stage développeur Unity", place: "[Studio / entreprise]",
      text: "[Ce que vous avez fait : systèmes développés, outils, résultats concrets.]" },
    { type: "edu", date: "2023 — 2026", title: "Bachelor [intitulé]", place: "[Nom de l'école], [Ville]",
      text: "[Contenu principal de la formation.]" },
    { type: "pro", date: "2022", title: "[Poste]", place: "[Entreprise]",
      text: "[Description courte.]" }
  ],

  contact: [
    { label: "E-mail", url: "mailto:louis.morvan01@gmail.com" },
    { label: "GitHub", url: "https://github.com/[pseudo]" },
    { label: "itch.io", url: "https://[pseudo].itch.io" },
    { label: "YouTube", url: "https://youtube.com/@[chaine]" },
    { label: "LinkedIn", url: "https://linkedin.com/in/[profil]" }
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
      stat: "5 ans d'expérience", text: "Mon moteur principal : gameplay, outils d'éditeur, UI, optimisation." },
    { id: "csharp", kind: "skill", rarity: "gold", title: "C#", glyph: "C#", color: "#b48cff", icon: "",
      stat: "[X] ans de pratique", text: "Langage que je maîtrise le mieux : POO, design patterns, async, LINQ." },
    { id: "unreal", kind: "skill", rarity: "silver", title: "Unreal Engine", glyph: "UE", color: "#cfd6e4", icon: "",
      stat: "En apprentissage", text: "Actors, Components, Blueprints et Enhanced Input, étudiés en Mastère." },
    { id: "cpp", kind: "skill", rarity: "silver", title: "C++", glyph: "C++", color: "#6aa8ff", icon: "",
      stat: "En apprentissage", text: "Pointeurs, mémoire, macros Unreal (UPROPERTY, UFUNCTION)." },
    { id: "blender", kind: "skill", rarity: "silver", title: "Blender", glyph: "B", color: "#ffb84d", icon: "",
      stat: "[X] ans", text: "Modélisation, UV, export FBX / glTF vers Unity et Unreal." },
    { id: "python", kind: "skill", rarity: "bronze", title: "Python", glyph: "Py", color: "#ffd84d", icon: "",
      stat: "Addons Blender", text: "Scripts bpy pour automatiser mon pipeline 3D." },
    { id: "git", kind: "skill", rarity: "bronze", title: "Git / GitHub", glyph: "git", color: "#ff7a59", icon: "",
      stat: "Tous mes projets", text: "Branches, pull requests, Git LFS pour les assets." },
    { id: "master", kind: "profile", rarity: "bronze", title: "Mastère", glyph: "M1", color: "#5ef0b5", icon: "",
      stat: "Game Programming · 1re année", text: "[Nom de l'école], [Ville]." },
    { id: "langues", kind: "profile", rarity: "bronze", title: "Langues", glyph: "FR", color: "#5ef0b5", icon: "",
      stat: "Français · Anglais", text: "[Niveau d'anglais, certification éventuelle.]" },

    { id: "card-projet-1", kind: "project", rarity: "gold", project: "projet-exemple-1",
      stat: "Gameplay programmer", text: "Contrôleur du personnage, IA ennemie, système de vagues." },
    { id: "card-projet-2", kind: "project", rarity: "silver", project: "projet-exemple-2",
      stat: "Game jam · 48 h", text: "Saut au game feel soigné et éditeur de niveaux." },
    { id: "card-projet-3", kind: "project", rarity: "bronze", project: "projet-exemple-3",
      stat: "Premier projet Unreal", text: "Personnage en C++ et composant de santé réutilisable." },
    { id: "card-addon", kind: "project", rarity: "silver", project: "addon-blender",
      stat: "Outil Python", text: "Export FBX en lot avec les bons axes et la bonne échelle." }
  ],

  /* ---------------------------------------------------------------------
     PROJETS — "id" sert d'adresse : project.html?id=<id>
     --------------------------------------------------------------------- */
  projects: [
    {
      id: "projet-exemple-1",
      title: "Nom du jeu 1",
      tagline: "Action roguelite en vue du dessus.",
      engine: "Unity",
      language: "C#",
      category: "Unity",
      duration: "3 mois",
      team: "4 personnes (2 dev, 1 GD, 1 artiste)",
      context: "Projet de cours",
      year: "2026",
      role: "Gameplay programmer",
      status: "Terminé",
      cover: "",            // ex : "assets/projet1.jpg" (laisser vide = visuel généré)
      color: "#ff5d73",
      youtube: "",          // ex : "dQw4w9WgXcQ"
      itchUrl: "",          // ex : "https://pseudo.itch.io/mon-jeu"
      itchEmbed: "",        // ex : "1234567"
      githubUrl: "",
      summary: "Décrivez le jeu en deux ou trois phrases : le pitch, la boucle de gameplay, ce qui le rend intéressant.",
      contributions: [
        "Contrôleur du personnage (déplacement, dash, combo d'attaques).",
        "IA ennemie avec machine à états (patrouille, poursuite, attaque).",
        "Système de vagues piloté par ScriptableObjects."
      ],
      challenges: [
        { title: "Défi technique n°1", text: "Le problème rencontré, la solution choisie et pourquoi, le résultat." },
        { title: "Défi technique n°2", text: "Exemple : passage de 300 à 2000 ennemis à l'écran grâce au pooling et au Job System." }
      ]
    },
    {
      id: "projet-exemple-2",
      title: "Nom du jeu 2",
      tagline: "Puzzle-platformer réalisé en game jam.",
      engine: "Unity",
      language: "C#",
      category: "Unity",
      duration: "48 heures",
      team: "Solo",
      context: "Game jam",
      year: "2025",
      role: "Programmation, game design",
      status: "Jouable en ligne",
      cover: "",
      color: "#4dd6c4",
      youtube: "",
      itchUrl: "",
      itchEmbed: "",
      githubUrl: "",
      summary: "Pitch du jeu de jam, thème imposé et comment il a été interprété.",
      contributions: [
        "Physique du saut : coyote time, jump buffer, gravité variable.",
        "Éditeur de niveaux simple sous forme d'outil Unity."
      ],
      challenges: [
        { title: "Livrer en 48 h", text: "Comment le scope a été réduit et priorisé." }
      ]
    },
    {
      id: "projet-exemple-3",
      title: "Prototype Unreal",
      tagline: "Premier projet Unreal Engine en C++.",
      engine: "Unreal Engine 5",
      language: "C++ / Blueprints",
      category: "Unreal",
      duration: "En cours",
      team: "Solo",
      context: "Projet personnel",
      year: "2026",
      role: "Tout",
      status: "En développement",
      cover: "",
      color: "#ffb84d",
      youtube: "",
      itchUrl: "",
      itchEmbed: "",
      githubUrl: "",
      summary: "Ce que ce projet vous apprend sur Unreal : Actors, Components, GAS, Enhanced Input…",
      contributions: [
        "Personnage en C++ avec Enhanced Input.",
        "Composant de santé réutilisable exposé aux Blueprints."
      ],
      challenges: [
        { title: "Passer de Unity à Unreal", text: "Les différences qui ont demandé le plus d'adaptation et comment vous les avez abordées." }
      ]
    },
    {
      id: "addon-blender",
      title: "Addon Blender",
      tagline: "Outil Python pour automatiser l'export vers le moteur.",
      engine: "Blender",
      language: "Python (bpy)",
      category: "Outils",
      duration: "2 semaines",
      team: "Solo",
      context: "Outil personnel",
      year: "2026",
      role: "Développement de l'outil",
      status: "Disponible sur GitHub",
      cover: "",
      color: "#9b8cff",
      youtube: "",
      itchUrl: "",
      itchEmbed: "",
      githubUrl: "",
      summary: "Ce que fait l'addon et le temps qu'il fait gagner.",
      contributions: [
        "Export FBX en lot avec échelle et axes corrects pour Unity / Unreal.",
        "Panneau dans la sidebar du viewport (N)."
      ],
      challenges: [
        { title: "Gestion du contexte", text: "Exécuter des opérateurs hors du viewport sans erreur de contexte." }
      ]
    }
  ]
};

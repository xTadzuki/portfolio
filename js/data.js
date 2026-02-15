export const SOCIALS = {
  github: "https://github.com/xTadzuki",
  instagram: "https://instagram.com/", // mets ton vrai lien si tu veux
  linkedin: "https://www.linkedin.com/in/marie-bouvier-97237731a/"
};

export const ASSETS = {
  scenes: {
    home: "../assets/img/fond-accueil.png",
    skills: "../assets/img/fond-skills.png",
    formations: "../assets/img/fond-formation.png",
    projects: "../assets/img/fond-projet.png",
    contact: "../assets/img/fond-contact.png"
  },
  astro: {
    home: "./assets/img/astronaute-accueil.png",
    skills: "./assets/img/astronaute-skills.png",
    formations: "./assets/img/astronaute-formations.png",
    projects: "./assets/img/astronaute-projets.png"
  },
  ui: {
    arrowLeft: "./assets/img/fleche-gauche.png",
    arrowRight: "./assets/img/fleche-droite.png"
  }
};

export const HOME_DIALOG = {
  name: "JE SUIS MAR IE",
  text:
    "Développeuse web full-stack et designer d’interface, je conçois des expériences web à la fois esthétiques, fluides et performantes. " +
    "J’interviens de la maquette à la mise en production : UI/UX, intégration responsive, développement back-end, base de données et optimisation. " +
    "J’aime transformer une idée en produit concret, avec un souci constant du détail, de la cohérence visuelle et d’un code propre et maintenable."
};

export const SKILLS = [
  "HTML", "CSS", "JavaScript", "PHP",
  "Angular", "Figma", "MySQL", "WordPress"
];

export const FORMATIONS = [
  {
    title: "Studi — Graduate Développeur Web Full Stack",
    period: "Mai 2025 — Juin 2026",
    text:
      "J’ai suivi la formation Studi Graduate – Développeur Web Full Stack, orientée “projet” et professionnalisation. " +
      "Elle m’a permis de consolider les fondamentaux du web (front/back), la conception d’interfaces, la gestion de bases de données, " +
      "ainsi que les bonnes pratiques de développement (architecture, sécurité, tests/validation, versioning). " +
      "Au fil des réalisations, j’ai appris à construire des applications complètes, de la conception à la mise en production, " +
      "avec une approche structurée et centrée utilisateur."
  },
  {
    title: "Studi — Bachelor Designer d’Interface",
    period: "Janvier 2026 — Décembre 2026",
    text:
      "J’ai suivi la formation Studi Bachelor – Designer d’Interface, centrée sur la conception d’expériences digitales claires et efficaces. " +
      "Elle m’a formée à l’UX/UI : recherche utilisateur, architecture de l’information, wireframes, maquettes haute fidélité, design systems, " +
      "prototypage et tests. J’y ai aussi renforcé ma maîtrise des principes d’ergonomie, d’accessibilité et de cohérence visuelle pour créer " +
      "des interfaces modernes, utilisables et alignées avec une identité de marque."
  },
  {
    title: "HEAJ — Infographiste (Animation & Illustration 2D)",
    period: "Septembre 2018 — Juin 2020",
    text:
      "J’ai suivi une formation d’infographiste, spécialisée en animation et illustration 2D. Elle m’a permis de développer une solide culture visuelle : " +
      "dessin, composition, couleur, typographie et storytelling, ainsi que la production de contenus animés (personnages, décors, motion, rythme). " +
      "Cette base créative renforce aujourd’hui mon approche du design d’interface, avec un vrai sens du détail, de l’illustration et des micro-interactions."
  }
];

export const PROJECTS = [
  {
    title: "Vite & Gourmand",
    text:
      "Vite Gourmand est une application web dédiée à la gestion d’un univers “food”, pensée comme un petit produit complet. " +
      "Elle permet de centraliser des contenus (ex. recettes/produits) avec une interface claire, une navigation fluide et une logique CRUD côté back-end. " +
      "Le projet met en avant un développement full-stack (front responsive + back + base de données), avec une attention particulière à l’UX/UI, " +
      "à la structure du code et à la fiabilité des fonctionnalités (gestion des données, formulaires, validations)."
  },
  {
    title: "Customotor",
    text:
      "Customotor est un site web “vitrine + gestion” pour un univers performance/préparation automobile, conçu comme un projet complet. " +
      "Il combine une interface soignée (pages Home, Performance/Services, Lookbook, Contact) avec un back-office admin permettant de gérer les contenus " +
      "(projets, images, demandes, rendez-vous, avis, et services via CRUD). Le projet met en avant une architecture structurée (MVC en PHP), " +
      "une base de données relationnelle, des formulaires sécurisés (ex. CSRF), et un travail UI/UX poussé autour d’une identité visuelle “racing” moderne."
  }
];

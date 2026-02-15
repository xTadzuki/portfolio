export const Scene = Object.freeze({
  HOME: "home",
  SKILLS: "skills",
  FORMATIONS: "formations",
  PROJECTS: "projects"
});

export const Sub = Object.freeze({
  INTRO: "intro",
  DIALOG: "dialog"
});

export const appState = {
  scene: Scene.HOME,
  sub: Sub.INTRO,
  formationIndex: 0,
  projectIndex: 0,
  isTyping: false,
  contactOpen: false
};

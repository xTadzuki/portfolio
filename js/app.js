import { SOCIALS } from "./data.js";
import { getRoute, routeToScene } from "./router.js";
import { appState } from "./state.js";
import { applyScene, next, prev, switchFormation, switchProject } from "./engine/sceneEngine.js";
import { setupInput } from "./engine/input.js";
import { initAudioControls } from "./audio-controls.js";

function bindSocialLinks() {
  const all = document.querySelectorAll("[data-social]");
  all.forEach((el) => {
    el.addEventListener("click", (e) => {
      e.preventDefault();
      const key = el.dataset.social;
      const url = SOCIALS[key];
      if (!url) return;
      window.open(url, "_blank", "noopener,noreferrer");
    });
  });
}

function setupDrawer() {
  const drawer = document.getElementById("drawer");
  const overlay = document.getElementById("drawerOverlay");
  const btnClose = document.getElementById("btnDrawerClose");
  const form = document.getElementById("contactForm");

  const open = () => {
    appState.contactOpen = true;
    overlay.hidden = false;
    overlay.classList.add("is-open");
    drawer.classList.add("is-open");
    drawer.setAttribute("aria-hidden", "false");
  };

  const close = () => {
    appState.contactOpen = false;
    overlay.classList.remove("is-open");
    drawer.classList.remove("is-open");
    drawer.setAttribute("aria-hidden", "true");
    setTimeout(() => {
      overlay.hidden = true;
    }, 240);
  };

  overlay.addEventListener("click", close);
  btnClose.addEventListener("click", close);

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Message prêt à être envoyé (à connecter à ton système).");
    close();
    form.reset();
  });

  return { open, close };
}

function bindContactButton(drawer) {
  const btn = document.getElementById("btnContact");
  if (!btn) return;

  btn.addEventListener("click", () => {
    drawer.open();
  });
}

function applyRoute() {
  const path = getRoute();
  const scene = routeToScene(path);
  applyScene(scene);
}

bindSocialLinks();
const drawer = setupDrawer();
bindContactButton(drawer);

setupInput({
  onNext: () => next(),
  onPrev: () => prev(),

  onOpenContact: () => drawer.open(),
  onCloseContact: () => drawer.close(),

  onPrevItem: () => {
    if (location.hash === "#/formations") switchFormation(-1);
    if (location.hash === "#/projects") switchProject(-1);
  },
  onNextItem: () => {
    if (location.hash === "#/formations") switchFormation(+1);
    if (location.hash === "#/projects") switchProject(+1);
  },
});

// Initialiser les contrôles audio
initAudioControls();

window.addEventListener("hashchange", applyRoute);
applyRoute();


// sceneengine.js — corrigé (HOME: scroll/enter n’ouvre jamais le dialogue, prev/next propres, pas de doublons)
import { Scene, Sub, appState } from "../state.js";
import { goHash } from "../router.js";
import { HOME_DIALOG, SKILLS, FORMATIONS, PROJECTS, ASSETS } from "../data.js";
import { createTypewriter } from "./typewriter.js";
import { revealIn } from "./reveal.js";
import { initMarquee } from "./marquee.js";

const twName = createTypewriter();
const twDialog = createTypewriter();

function sceneRoot() {
  return document.getElementById("scene");
}

function applySceneVisuals(sceneKey) {
  const app = document.getElementById("app");
  const astro = document.getElementById("astro");
  if (!app) return;

  app.dataset.scene = sceneKey;
  app.dataset.ready = "1";

  const bg = ASSETS.scenes?.[sceneKey] || ASSETS.scenes?.home;
  if (bg) app.style.setProperty("--bg-img", `url("${bg}")`);

  if (astro && ASSETS.astro?.[sceneKey]) {
    astro.src = ASSETS.astro[sceneKey];
  }
}

function mount(html) {
  const root = sceneRoot();
  if (!root) return;

  root.classList.add("sceneFadeOut");

  setTimeout(() => {
    root.innerHTML = html;

    root.classList.remove("sceneFadeOut");
    root.classList.add("sceneFadeIn");
    setTimeout(() => root.classList.remove("sceneFadeIn"), 420);

    initMarquee(root);
    revealIn(root);
  }, 220);
}

/* ---------- VIEW PARTS ---------- */

function hudOpenButton(id) {
  return `
    <button class="hudOpen reveal" id="${id}" type="button" aria-label="Clique pour ouvrir">
      <span class="hudOpen__corner hudOpen__corner--tl" aria-hidden="true"></span>
      <span class="hudOpen__corner hudOpen__corner--tr" aria-hidden="true"></span>
      <span class="hudOpen__corner hudOpen__corner--bl" aria-hidden="true"></span>
      <span class="hudOpen__corner hudOpen__corner--br" aria-hidden="true"></span>

      <span class="hudOpen__line hudOpen__line--top" aria-hidden="true"></span>
      <span class="hudOpen__line hudOpen__line--bot" aria-hidden="true"></span>

      <span class="hudOpen__label">CLIQUE POUR<br>OUVRIR</span>
    </button>
  `;
}

/* wrapper layout fixe (Formations/Projets) */
function sceneFrame({ topHtml, bodyHtml, arrowsFor }) {
  const leftId =
    arrowsFor === "formations" ? "btnPrevFormation" : "btnPrevProject";
  const rightId =
    arrowsFor === "formations" ? "btnNextFormation" : "btnNextProject";

  return `
    <div class="container sceneFrame">
      <div class="sceneTop">
        ${topHtml}
      </div>

      <div class="sceneBody">
        ${bodyHtml}
      </div>

      <div class="sceneArrows" aria-hidden="false">
        <button class="arrowBtn arrowBtn--left" id="${leftId}" type="button" aria-label="Précédent">
          <img src="${ASSETS.ui.arrowLeft}" alt="">
        </button>

        <button class="arrowBtn arrowBtn--right" id="${rightId}" type="button" aria-label="Suivant">
          <img src="${ASSETS.ui.arrowRight}" alt="">
        </button>
      </div>
    </div>
  `;
}

/* ---------- VIEWS ---------- */

function homeIntroView() {
  return `
    <div class="container home">
      <div class="home__hero">

        <div class="marquee reveal" data-marquee data-dir="rtl" data-dur="20" style="opacity:0.6; margin-bottom: 10px;">
          <div class="marquee__track">
            <div class="marquee__item sceneKicker">UN MESSAGE DE LA TERRE</div>
            <div class="marquee__item sceneKicker">UN MESSAGE DE LA TERRE</div>
          </div>
        </div>

        <h1 class="sceneTitle reveal" style="font-size: clamp(25px,3.5vw,46px); line-height: 1;">
          SALUT MEMBRE DE LA GALAXIE
        </h1>

        <div class="marquee reveal" data-marquee data-dir="ltr" data-dur="26" style="margin-top: 10px; margin-bottom: 40px; opacity: 0.6;">
          <div class="marquee__track">
            <div class="marquee__item sceneKicker">UN MESSAGE DE LA TERRE</div>
            <div class="marquee__item sceneKicker">UN MESSAGE DE LA TERRE</div>
          </div>
        </div>

        <h2 class="home__name reveal">JE SUIS MARIE</h2>

        ${hudOpenButton("btnOpenHome")}

      </div>
    </div>
  `;
}

function homeDialogView() {
  return `
    <div class="container home">
      <div class="home__hero">

        <div class="marquee reveal" data-marquee data-dir="rtl" data-dur="20" style="opacity:0.6; margin-bottom: 10px;">
          <div class="marquee__track">
            <div class="marquee__item sceneKicker">UN MESSAGE DE LA TERRE</div>
            <div class="marquee__item sceneKicker">UN MESSAGE DE LA TERRE</div>
          </div>
        </div>

        <h1 class="sceneTitle reveal" style="font-size: clamp(25px,3.5vw,46px); line-height: 1;">
          SALUT MEMBRE DE LA GALAXIE
        </h1>

        <div class="marquee reveal" data-marquee data-dir="ltr" data-dur="26" style="margin-top: 10px; margin-bottom: 40px; opacity: 0.6;">
          <div class="marquee__track">
            <div class="marquee__item sceneKicker">UN MESSAGE DE LA TERRE</div>
            <div class="marquee__item sceneKicker">UN MESSAGE DE LA TERRE</div>
          </div>
        </div>

        <h2 class="home__name reveal" id="homeName"></h2>

        <div class="dialog reveal" id="homeDialog">
          <div class="dialog__corners"></div>
          <div class="dialog__text" id="homeDialogText"></div>
        </div>

      </div>
    </div>
  `;
}

function skillsView() {
  const cards = SKILLS.map((s) => `<div class="skillCard reveal"><span>${s}</span></div>`).join("");
  return `
    <div class="container" style="display:flex; flex-direction:column; align-items:center; padding-top: 5vh;">
      <h1 class="sceneTitle reveal">MES COMPÉTENCES</h1>
      <div class="skillsGrid">
        ${cards}
      </div>
    </div>
  `;
}

/* ---------- FORMATIONS (layout fixe) ---------- */

function formationTop(item) {
  return `
    <h1 class="sceneTitleBox reveal">
      <span class="sceneTitleBox-inner">MES FOR MATIONS</span>
    </h1>

    <h2 class="subTitle reveal" style="max-width: 980px;">${item.title}</h2>
    <p class="subPeriod reveal">${item.period}</p>
  `;
}

function formationIntroView(item) {
  return sceneFrame({
    arrowsFor: "formations",
    topHtml: formationTop(item),
    bodyHtml: hudOpenButton("btnOpenFormation"),
  });
}

function formationDialogView(item) {
  return sceneFrame({
    arrowsFor: "formations",
    topHtml: formationTop(item),
    bodyHtml: `
      <div class="dialog reveal">
        <div class="dialog__corners"></div>
        <div class="dialog__text" id="formationDialogText"></div>
      </div>
    `,
  });
}

/* ---------- PROJECTS (layout fixe) ---------- */

function projectTop(item) {
  return `
    <h1 class="sceneTitleBox reveal">
      <span class="sceneTitleBox-inner">MES PROJETS</span>
    </h1>

    <h2 class="subTitle reveal" style="max-width: 980px;">
      PROJET ${appState.projectIndex + 1} : ${item.title}
    </h2>
  `;
}

function projectIntroView(item) {
  return sceneFrame({
    arrowsFor: "projects",
    topHtml: projectTop(item),
    bodyHtml: hudOpenButton("btnOpenProject"),
  });
}

function projectDialogView(item) {
  return sceneFrame({
    arrowsFor: "projects",
    topHtml: projectTop(item),
    bodyHtml: `
      <div class="dialog reveal">
        <div class="dialog__corners"></div>
        <div class="dialog__text" id="projectDialogText"></div>
      </div>
    `,
  });
}

/* ---------- RENDER ---------- */

export function render() {
  if (appState.scene === Scene.HOME) {
    mount(appState.sub === Sub.INTRO ? homeIntroView() : homeDialogView());
    return;
  }

  if (appState.scene === Scene.SKILLS) {
    mount(skillsView());
    return;
  }

  if (appState.scene === Scene.FORMATIONS) {
    const item = FORMATIONS[appState.formationIndex];
    mount(appState.sub === Sub.INTRO ? formationIntroView(item) : formationDialogView(item));
    return;
  }

  if (appState.scene === Scene.PROJECTS) {
    const item = PROJECTS[appState.projectIndex];
    mount(appState.sub === Sub.INTRO ? projectIntroView(item) : projectDialogView(item));
    return;
  }
}

/* ---------- BINDS ---------- */

export function afterRenderBind() {
  const root = sceneRoot();
  if (!root) return;

  root.querySelector("#btnOpenHome")?.addEventListener("click", () => {
    appState.sub = Sub.DIALOG;
    render();
    setTimeout(() => {
      afterRenderBind();
      runHomeDialog();
    }, 260);
  });

  root.querySelector("#btnOpenFormation")?.addEventListener("click", () => {
    appState.sub = Sub.DIALOG;
    render();
    setTimeout(() => {
      afterRenderBind();
      runFormationDialog();
    }, 260);
  });

  root.querySelector("#btnPrevFormation")?.addEventListener("click", () => switchFormation(-1));
  root.querySelector("#btnNextFormation")?.addEventListener("click", () => switchFormation(+1));

  root.querySelector("#btnOpenProject")?.addEventListener("click", () => {
    appState.sub = Sub.DIALOG;
    render();
    setTimeout(() => {
      afterRenderBind();
      runProjectDialog();
    }, 260);
  });

  root.querySelector("#btnPrevProject")?.addEventListener("click", () => switchProject(-1));
  root.querySelector("#btnNextProject")?.addEventListener("click", () => switchProject(+1));
}

/* ---------- DIALOGS ---------- */

export async function runHomeDialog() {
  const nameEl = document.getElementById("homeName");
  const textEl = document.getElementById("homeDialogText");
  if (!nameEl || !textEl) return;

  appState.isTyping = true;
  await twName.type(nameEl, HOME_DIALOG.name, { speed: 26 });
  await twDialog.type(textEl, HOME_DIALOG.text, { speed: 14 });
  appState.isTyping = false;
}

export async function runFormationDialog() {
  const textEl = document.getElementById("formationDialogText");
  const item = FORMATIONS[appState.formationIndex];
  if (!textEl || !item) return;

  appState.isTyping = true;
  await twDialog.type(textEl, item.text, { speed: 13 });
  appState.isTyping = false;
}

export async function runProjectDialog() {
  const textEl = document.getElementById("projectDialogText");
  const item = PROJECTS[appState.projectIndex];
  if (!textEl || !item) return;

  appState.isTyping = true;
  await twDialog.type(textEl, item.text, { speed: 13 });
  appState.isTyping = false;
}

/* ---------- HELPERS (skip typing) ---------- */

function completeTyping() {
  twName.cancel();
  twDialog.cancel();
  appState.isTyping = false;

  const nameEl = document.getElementById("homeName");
  const homeTextEl = document.getElementById("homeDialogText");
  const fTextEl = document.getElementById("formationDialogText");
  const pTextEl = document.getElementById("projectDialogText");

  if (nameEl) nameEl.textContent = HOME_DIALOG.name;
  if (homeTextEl) homeTextEl.textContent = HOME_DIALOG.text;

  if (fTextEl) {
    const item = FORMATIONS[appState.formationIndex];
    fTextEl.textContent = item?.text ?? "";
  }
  if (pTextEl) {
    const item = PROJECTS[appState.projectIndex];
    pTextEl.textContent = item?.text ?? "";
  }
}

/* ---------- NAV (Enter/Scroll) ---------- */

export function next() {
  if (appState.isTyping) {
    completeTyping();
    return;
  }

  if (appState.scene === Scene.HOME) {
    goHash("/skills");
    return;
  }

  if (appState.scene === Scene.SKILLS) {
    goHash("/formations");
    return;
  }

  if (appState.scene === Scene.FORMATIONS) {
    goHash("/projects");
    return;
  }

  if (appState.scene === Scene.PROJECTS) {
    goHash("/");
    return;
  }
}

export function prev() {
  if (appState.isTyping) {
    completeTyping();
    return;
  }

  // HOME
  if (appState.scene === Scene.HOME) return;

  if (appState.scene === Scene.SKILLS) {
    goHash("/");
    return;
  }

  if (appState.scene === Scene.FORMATIONS) {
    goHash("/skills");
    return;
  }

  if (appState.scene === Scene.PROJECTS) {
    goHash("/formations");
    return;
  }
}

/* ---------- SLIDERS ---------- */

export function switchFormation(dir) {
  appState.formationIndex = (appState.formationIndex + dir + FORMATIONS.length) % FORMATIONS.length;
  appState.sub = Sub.INTRO;
  render();
  setTimeout(() => afterRenderBind(), 260);
}

export function switchProject(dir) {
  appState.projectIndex = (appState.projectIndex + dir + PROJECTS.length) % PROJECTS.length;
  appState.sub = Sub.INTRO;
  render();
  setTimeout(() => afterRenderBind(), 260);
}

/* ---------- APPLY SCENE ---------- */

export function applyScene(scene) {
  appState.scene = scene;
  appState.sub = Sub.INTRO;

  applySceneVisuals(scene);

  render();
  setTimeout(() => afterRenderBind(), 260);
}

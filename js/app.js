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
    
    // Vérifier que EmailJS est chargé
    if (typeof window.emailjs === 'undefined') {
      alert("❌ Erreur: EmailJS n'est pas chargé. Veuillez rafraîchir la page.");
      console.error("EmailJS n'est pas disponible. Vérifiez que le script CDN est bien chargé.");
      return;
    }
    
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    // Désactiver le bouton et afficher un indicateur de chargement
    submitBtn.disabled = true;
    submitBtn.textContent = "Envoi...";
    
    // Récupérer les valeurs du formulaire
    const templateParams = {
      from_name: form.email.value,
      reply_to: form.email.value,
      from_email: form.email.value,
      subject: form.subject.value,
      message: form.message.value
    };
    
    // Envoyer l'email via EmailJS (en utilisant window.emailjs)
    window.emailjs.send("service_ft5nqhb", "template_kfcqc3v", templateParams, "zp55xt9iP18vec1Gd")
      .then(() => {
        // Succès
        alert("✅ Message envoyé avec succès ! Je vous répondrai bientôt.");
        close();
        form.reset();
      })
      .catch((error) => {
        // Erreur détaillée
        console.error("❌ Erreur EmailJS complète:", error);
        console.error("Status:", error.status);
        console.error("Text:", error.text);
        
        let errorMessage = "❌ Erreur lors de l'envoi du message.";
        
        if (error.status === 422) {
          errorMessage += "\n\n🔍 Erreur 422: Les variables du template ne correspondent pas.\nVérifiez la configuration de votre template EmailJS.";
          console.error("⚠️ Variables envoyées:", templateParams);
          console.error("💡 Vérifiez que votre template utilise: {{from_email}}, {{reply_to}}, {{subject}}, {{message}}");
        } else if (error.status === 400) {
          errorMessage += "\n\n🔍 Erreur 400: Identifiants EmailJS incorrects.";
        } else if (error.status === 403) {
          errorMessage += "\n\n🔍 Erreur 403: Service non autorisé.";
        }
        
        errorMessage += "\n\nConsultez la console (F12) pour plus de détails.";
        alert(errorMessage);
      })
      .finally(() => {
        // Réactiver le bouton
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
      });
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


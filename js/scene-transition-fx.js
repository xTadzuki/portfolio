// scene-transition-fx.js - Effets visuels pour les transitions de scènes

(function() {
  'use strict';

  // ========================================
  // VAGUE LUMINEUSE
  // ========================================
  let sweepOverlay = null;

  function createSweepOverlay() {
    if (!sweepOverlay) {
      sweepOverlay = document.createElement('div');
      sweepOverlay.className = 'transition-sweep';
      document.body.appendChild(sweepOverlay);
    }
  }

  function triggerLightSweep() {
    createSweepOverlay();
    sweepOverlay.classList.remove('active');
    // Force reflow pour redémarrer l'animation
    void sweepOverlay.offsetWidth;
    sweepOverlay.classList.add('active');
    
    // Retirer la classe après l'animation
    setTimeout(() => {
      sweepOverlay.classList.remove('active');
    }, 800);
  }

  // ========================================
  // PARTICULES D'ÉTOILES
  // ========================================
  function createStarParticles() {
    const container = document.createElement('div');
    container.style.cssText = `
      position: fixed;
      inset: 0;
      pointer-events: none;
      z-index: 99;
    `;

    // Créer 25 particules
    for (let i = 0; i < 25; i++) {
      const particle = document.createElement('div');
      
      // Position aléatoire
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      
      // Taille aléatoire
      const size = Math.random() * 3 + 2;
      
      // Couleur aléatoire
      const colors = [
        'rgba(195, 120, 255, 0.9)',
        'rgba(120, 205, 255, 0.9)',
        'rgba(255, 255, 255, 0.8)',
      ];
      const color = colors[Math.floor(Math.random() * colors.length)];
      
      // Direction aléatoire
      const angle = Math.random() * 360;
      const distance = Math.random() * 150 + 100;
      
      particle.style.cssText = `
        position: absolute;
        left: ${x}vw;
        top: ${y}vh;
        width: ${size}px;
        height: ${size}px;
        background: ${color};
        border-radius: 50%;
        box-shadow: 0 0 ${size * 2}px ${color};
        animation: particleFly${i} 800ms ease-out forwards;
      `;
      
      // Créer l'animation unique pour chaque particule
      const keyframes = `
        @keyframes particleFly${i} {
          0% {
            opacity: 1;
            transform: translate(0, 0) scale(1);
          }
          100% {
            opacity: 0;
            transform: translate(
              ${Math.cos(angle * Math.PI / 180) * distance}px,
              ${Math.sin(angle * Math.PI / 180) * distance - 50}px
            ) scale(0.3);
          }
        }
      `;
      
      // Injecter l'animation
      const style = document.createElement('style');
      style.textContent = keyframes;
      document.head.appendChild(style);
      
      container.appendChild(particle);
      
      // Cleanup
      setTimeout(() => {
        style.remove();
      }, 800);
    }
    
    document.body.appendChild(container);
    
    // Supprimer le container après l'animation
    setTimeout(() => {
      container.remove();
    }, 800);
  }

  // ========================================
  // TRIGGER AUTOMATIQUE
  // ========================================
  
  // Observer les changements de classe sceneFadeOut
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
        const target = mutation.target;
        if (target.classList.contains('sceneFadeOut')) {
          // Trigger tous les effets
          triggerLightSweep();
          createStarParticles();
        }
      }
    });
  });

  // Observer la scène
  function init() {
    const scene = document.querySelector('.scene');
    if (scene) {
      observer.observe(scene, {
        attributes: true,
        attributeFilter: ['class']
      });
    }
    
    console.log('✨ Effets de transition initialisés');
  }

  // Lancer au chargement
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();

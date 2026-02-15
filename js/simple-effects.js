// simple-effects.js - Effets interactifs légers
// Auto-initialisation au chargement de la page

(function() {
  'use strict';

  // ========================================
  // EFFET RIPPLE AU CLIC
  // ========================================
  function initRipple() {
    document.addEventListener('click', function(e) {
      const target = e.target.closest('button, .btn, .hud__icon, .hudOpen, .arrowBtn, .pill');
      
      if (!target) return;

      // Créer l'élément ripple
      const ripple = document.createElement('span');
      const rect = target.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        top: ${y}px;
        left: ${x}px;
        background: rgba(255, 255, 255, 0.5);
        border-radius: 50%;
        pointer-events: none;
        animation: ripple 0.6s ease-out;
        z-index: 100;
      `;

      // S'assurer que le parent est positionné
      if (getComputedStyle(target).position === 'static') {
        target.style.position = 'relative';
      }
      target.style.overflow = 'hidden';

      target.appendChild(ripple);

      // Supprimer après l'animation
      setTimeout(() => ripple.remove(), 600);
    });
  }

  // ========================================
  // TRAIL DE CURSEUR PERSONNALISÉ (ÉTOILÉ)
  // ========================================
  function initCursorTrail() {
    const trails = [];
    const maxTrails = 25; // Plus de particules !
    let lastTime = 0;

    document.addEventListener('mousemove', function(e) {
      const now = Date.now();
      
      // Throttle réduit pour plus de particules (toutes les 25ms)
      if (now - lastTime < 25) return;
      lastTime = now;

      // Créer plusieurs particules à chaque mouvement pour effet étoilé
      const particlesPerMove = 2;
      
      for (let i = 0; i < particlesPerMove; i++) {
        // Variation de position pour dispersion
        const offsetX = (Math.random() - 0.5) * 10;
        const offsetY = (Math.random() - 0.5) * 10;
        
        // Taille aléatoire pour plus de profondeur
        const size = Math.random() * 4 + 2;
        
        // Couleurs variées
        const colors = [
          'rgba(195, 120, 255, 0.9)',
          'rgba(120, 205, 255, 0.9)',
          'rgba(255, 255, 255, 0.9)',
          'rgba(180, 100, 255, 0.8)',
        ];
        const color = colors[Math.floor(Math.random() * colors.length)];

        const trail = document.createElement('div');
        trail.style.cssText = `
          position: fixed;
          width: ${size}px;
          height: ${size}px;
          background: ${color};
          border-radius: 50%;
          pointer-events: none;
          left: ${e.clientX + offsetX - size/2}px;
          top: ${e.clientY + offsetY - size/2}px;
          z-index: 9999;
          box-shadow: 0 0 ${size * 2}px ${color};
          animation: trailFade ${Math.random() * 0.4 + 0.6}s ease-out forwards;
        `;

        document.body.appendChild(trail);
        trails.push(trail);

        // Limiter le nombre de trails
        if (trails.length > maxTrails) {
          const oldTrail = trails.shift();
          oldTrail?.remove();
        }

        // Supprimer après animation
        setTimeout(() => {
          trail.remove();
          const index = trails.indexOf(trail);
          if (index > -1) trails.splice(index, 1);
        }, 1000);
      }
    });
  }

  // ========================================
  // INITIALISATION
  // ========================================
  function init() {
    // Ajouter l'animation CSS pour le trail fade
    const style = document.createElement('style');
    style.textContent = `
      @keyframes trailFade {
        0% {
          opacity: 1;
          transform: scale(1);
        }
        100% {
          opacity: 0;
          transform: scale(0.3);
        }
      }
    `;
    document.head.appendChild(style);

    // Initialiser les effets
    initRipple();
    initCursorTrail();
    
    console.log('✨ Effets visuels initialisés');
  }

  // Lancer au chargement
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();

// scene-nav-active.js - Gestion de l'état actif du menu de navigation

(function() {
  'use strict';

  function updateActiveNavItem() {
    const currentHash = window.location.hash || '#/';
    const navItems = document.querySelectorAll('.scene-nav__item');
    
    navItems.forEach(item => {
      const itemScene = item.dataset.scene;
      const isActive = 
        (currentHash === '#/' && itemScene === 'home') ||
        (currentHash === '#/skills' && itemScene === 'skills') ||
        (currentHash === '#/formations' && itemScene === 'formations') ||
        (currentHash === '#/projects' && itemScene === 'projects');
      
      if (isActive) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
  }

  // Mettre à jour au chargement
  function init() {
    updateActiveNavItem();
    
    // Mettre à jour quand le hash change
    window.addEventListener('hashchange', updateActiveNavItem);
    
    console.log('🗺️ Navigation des scènes initialisée');
  }

  // Lancer au chargement
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();

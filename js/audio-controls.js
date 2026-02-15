// audio-controls.js - Contrôles UI pour le système audio

import { audioManager } from './audio-manager.js';

export function initAudioControls() {
  const audioToggle = document.getElementById('audioToggle');
  
  if (!audioToggle) {
    console.warn('Bouton audio non trouvé');
    return;
  }
  
  // Restaurer l'état depuis localStorage
  const savedMute = localStorage.getItem('audioMuted');
  if (savedMute === 'true') {
    audioToggle.classList.add('muted');
  }
  
  // Gérer le clic
  audioToggle.addEventListener('click', (e) => {
    e.preventDefault();
    const isMuted = audioManager.toggleMute();
    audioToggle.classList.toggle('muted', isMuted);
    
    // Feedback visuel
    audioToggle.style.transform = 'scale(1.1)';
    setTimeout(() => {
      audioToggle.style.transform = '';
    }, 150);
  });
  
  console.log('🎛️ Contrôles audio initialisés');
}

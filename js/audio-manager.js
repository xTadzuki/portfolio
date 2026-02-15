// audio-manager.js - Gestionnaire audio pour ambiance et effets sonores

class AudioManager {
  constructor() {
    this.audioContext = null;
    this.isMuted = false;
    this.bgMusicGain = null;
    this.sfxGain = null;
    this.bgMusicVolume = 0.25;
    this.sfxVolume = 0.15;
    this.isPlaying = false;
    
    // Pour l'oscillateur de musique de fond
    this.bgOscillators = [];
    this.bgMusicInterval = null;
  }

  // ========================================
  // INITIALISATION
  // ========================================
  async init() {
    try {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
      
      // Créer les gain nodes
      this.bgMusicGain = this.audioContext.createGain();
      this.bgMusicGain.connect(this.audioContext.destination);
      this.bgMusicGain.gain.value = this.bgMusicVolume;
      
      this.sfxGain = this.audioContext.createGain();
      this.sfxGain.connect(this.audioContext.destination);
      this.sfxGain.gain.value = this.sfxVolume;
      
      console.log('🎵 AudioManager initialisé');
      
      // Charger la préférence mute depuis localStorage
      const savedMute = localStorage.getItem('audioMuted');
      if (savedMute === 'true') {
        this.isMuted = true;
      }
      
      return true;
    } catch (error) {
      console.error('Erreur initialisation audio:', error);
      return false;
    }
  }

  // ========================================
  // MUSIQUE DE FOND LOFI (Synthétique)
  // ========================================
  startBgMusic() {
    if (this.isMuted || this.isPlaying) return;
    
    if (!this.audioContext) {
      this.init();
    }
    
    // Resume AudioContext si suspendu (autoplay policy)
    if (this.audioContext.state === 'suspended') {
      this.audioContext.resume();
    }
    
    this.isPlaying = true;
    this.playLofiAmbient();
  }

  playLofiAmbient() {
    // Créer une ambiance lofi avec des notes douces
    const notes = [
      { freq: 261.63, duration: 2 },   // C
      { freq: 293.66, duration: 2 },   // D
      { freq: 329.63, duration: 1.5 }, // E
      { freq: 349.23, duration: 1.5 }, // F
      { freq: 392.00, duration: 2 },   // G
      { freq: 440.00, duration: 1 },   // A
    ];
    
    let currentTime = this.audioContext.currentTime;
    let noteIndex = 0;
    
    const playNote = () => {
      if (!this.isPlaying || this.isMuted) {
        this.stopBgMusic();
        return;
      }
      
      const note = notes[noteIndex % notes.length];
      
      // Créer oscillateur pour la note
      const osc = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();
      
      osc.connect(gainNode);
      gainNode.connect(this.bgMusicGain);
      
      // Son doux (sine wave)
      osc.type = 'sine';
      osc.frequency.value = note.freq;
      
      // Envelope ADSR pour son naturel
      const now = this.audioContext.currentTime;
      gainNode.gain.setValueAtTime(0, now);
      gainNode.gain.linearRampToValueAtTime(0.1, now + 0.1); // Attack
      gainNode.gain.linearRampToValueAtTime(0.07, now + 0.3); // Decay
      gainNode.gain.setValueAtTime(0.07, now + note.duration - 0.3); // Sustain
      gainNode.gain.linearRampToValueAtTime(0, now + note.duration); // Release
      
      osc.start(now);
      osc.stop(now + note.duration);
      
      this.bgOscillators.push(osc);
      
      // Nettoyer après
      osc.onended = () => {
        const index = this.bgOscillators.indexOf(osc);
        if (index > -1) this.bgOscillators.splice(index, 1);
      };
      
      noteIndex++;
      
      // Programmer la prochaine note
      setTimeout(playNote, note.duration * 1000);
    };
    
    playNote();
  }

  stopBgMusic() {
    this.isPlaying = false;
    
    // Arrêter tous les oscillateurs
    this.bgOscillators.forEach(osc => {
      try {
        osc.stop();
      } catch (e) {
        // Déjà arrêté
      }
    });
    this.bgOscillators = [];
    
    if (this.bgMusicInterval) {
      clearInterval(this.bgMusicInterval);
      this.bgMusicInterval = null;
    }
  }

  // ========================================
  // SON DE TEXTE (Type jeu vidéo)
  // ========================================
  playTextBeep() {
    if (this.isMuted || !this.audioContext) return;
    
    try {
      const now = this.audioContext.currentTime;
      
      // Créer oscillateur
      const osc = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();
      
      osc.connect(gainNode);
      gainNode.connect(this.sfxGain);
      
      // Son court et aigu
      osc.type = 'square'; // Son rétro
      osc.frequency.value = 800 + Math.random() * 200; // Variation
      
      // Envelope rapide
      gainNode.gain.setValueAtTime(0.3, now);
      gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.05);
      
      osc.start(now);
      osc.stop(now + 0.05);
    } catch (error) {
      console.error('Erreur son texte:', error);
    }
  }

  // ========================================
  // CONTRÔLES
  // ========================================
  toggleMute() {
    this.isMuted = !this.isMuted;
    
    if (this.isMuted) {
      this.stopBgMusic();
    } else {
      this.startBgMusic();
    }
    
    // Sauvegarder la préférence
    localStorage.setItem('audioMuted', this.isMuted);
    
    return this.isMuted;
  }

  setVolume(type, value) {
    if (type === 'bg' && this.bgMusicGain) {
      this.bgMusicVolume = value;
      this.bgMusicGain.gain.value = value;
    } else if (type === 'sfx' && this.sfxGain) {
      this.sfxVolume = value;
      this.sfxGain.gain.value = value;
    }
  }
}

// Exporter instance singleton
export const audioManager = new AudioManager();

// Auto-init au premier clic
document.addEventListener('click', async () => {
  if (!audioManager.audioContext) {
    await audioManager.init();
    audioManager.startBgMusic();
  }
}, { once: true });

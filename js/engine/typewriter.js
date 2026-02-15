import { audioManager } from '../audio-manager.js';

export function sleep(ms){ return new Promise(r => setTimeout(r, ms)); }

export function createTypewriter(){
  let cancelled = false;

  return {
    cancel(){ cancelled = true; },
    async type(el, text, {speed=18}={}){
      cancelled = false;
      if (!el) return;
      el.textContent = "";
      for (let i=0; i<text.length; i++){
        if (cancelled) return;
        el.textContent += text[i];
        
        // Jouer son tous les 2 caractères
        if (i % 2 === 0 && text[i] !== " ") {
          audioManager.playTextBeep();
        }
        
        const t = text[i] === " " ? Math.max(8, speed - 8) : speed;
        await sleep(t);
      }
    }
  };
}

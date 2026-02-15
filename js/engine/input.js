// engine/input.js


export function setupInput({
  onNext,
  onPrev,
  onPrevItem,
  onNextItem,
  onOpenContact,
  onCloseContact,
}) {
  const isContactOpen = () => {
    const drawer = document.getElementById("drawer");
    return !!drawer && drawer.classList.contains("is-open");
  };

  // Anti-spam wheel/trackpad
  let wheelLock = false;
  const WHEEL_COOLDOWN = 650;
  const DEADZONE = 10;

  function lockWheel() {
    wheelLock = true;
    window.setTimeout(() => (wheelLock = false), WHEEL_COOLDOWN);
  }

  // WHEEL: bas => next, haut => prev
  window.addEventListener(
    "wheel",
    (e) => {
      if (wheelLock) return;
      if (isContactOpen()) return;

      const dy = e.deltaY;
      if (Math.abs(dy) < DEADZONE) return;

      lockWheel();

      if (dy > 0) onNext?.();
      else onPrev?.();
    },
    { passive: true }
  );

  // KEYBOARD
  window.addEventListener("keydown", (e) => {
    // Si drawer ouvert : ESC ferme
    if (isContactOpen()) {
      if (e.key === "Escape") {
        e.preventDefault();
        onCloseContact?.();
      }
      return;
    }

    // Enter = next
    if (e.key === "Enter") {
      e.preventDefault();
      onNext?.();
      return;
    }

    // Backspace / PageUp / ArrowUp = prev (optionnel mais pratique)
    if (e.key === "PageUp" || e.key === "ArrowUp") {
      e.preventDefault();
      onPrev?.();
      return;
    }

    // PageDown / ArrowDown = next
    if (e.key === "PageDown" || e.key === "ArrowDown") {
      e.preventDefault();
      onNext?.();
      return;
    }

    // Navigation item (formations/projets) au clavier 
    if (e.key === "ArrowLeft") {
      onPrevItem?.();
      return;
    }
    if (e.key === "ArrowRight") {
      onNextItem?.();
      return;
    }

    // Raccourci contact : C
    if (e.key.toLowerCase() === "c") {
      onOpenContact?.();
      return;
    }
  });
}

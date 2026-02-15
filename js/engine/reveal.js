export function revealIn(root){
  const els = Array.from(root.querySelectorAll(".reveal"));
  els.forEach((el, i) => {
    const d = 60 * i;
    setTimeout(() => el.classList.add("is-in"), d);
  });
}

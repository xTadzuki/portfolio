export function initMarquee(root){
  const marquees = Array.from(root.querySelectorAll("[data-marquee]"));
  marquees.forEach(m => {
    const dir = m.dataset.dir || "rtl";
    const dur = Number(m.dataset.dur || 26);

    const track = m.querySelector(".marquee__track");
    if (!track) return;

    // Dupliquer le contenu pour la boucle infinie
    const html = track.innerHTML;
    track.innerHTML = html + html;

    track.style.animation = `${dir === "ltr" ? "marqueeLtr" : "marqueeRtl"} ${dur}s linear infinite`;
  });
}

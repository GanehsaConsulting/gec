export const heroCarouselImages = [
  {
    src: "/cement-blanket/installation.png",
    alt: "Pemasangan Cement Blanket di saluran irigasi",
  },
  {
    src: "/cement-blanket/carrying-roll.png",
    alt: "Pengangkutan roll Cement Blanket di lapangan",
  },
  {
    src: "/cement-blanket/completed-canal.png",
    alt: "Saluran irigasi selesai dengan Cement Blanket",
  },
];

export const HERO_IMAGE = heroCarouselImages[0].src;

export function scrollToSection(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

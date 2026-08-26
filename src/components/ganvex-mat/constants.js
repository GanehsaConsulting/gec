export const PRODUCT_PATH = "/ganvex-mat";
export const PRODUCT_LOGO = "/ganvex-mat.jpeg";

export const heroCarouselImages = [
  {
    src: "/ganvex-mat/installation.png",
    alt: "Pemasangan Ganvex Mat di saluran irigasi",
  },
  {
    src: "/ganvex-mat/carrying-roll.png",
    alt: "Pengangkutan roll Ganvex Mat di lapangan",
  },
  {
    src: "/ganvex-mat/completed-canal.png",
    alt: "Saluran irigasi selesai dengan Ganvex Mat",
  },
];

export const HERO_IMAGE = heroCarouselImages[0].src;

export function scrollToSection(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

import {
  Droplets,
  Zap,
  Leaf,
  Coins,
  Layers,
  Shield,
  Clock,
} from "lucide-react";

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

export const characteristicIcons = [Droplets, Zap, Coins, Leaf];
export const userAdvantageIcons = [Layers, Droplets, Shield, Clock];

export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function scrollToSection(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

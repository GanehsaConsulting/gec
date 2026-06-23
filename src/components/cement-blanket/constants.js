import {
  Droplets,
  Zap,
  Feather,
  Leaf,
  Wrench,
  Shield,
} from "lucide-react";

export const HERO_IMAGE = "/cement.webp";

export const benefitIcons = [Droplets, Zap, Feather, Leaf, Wrench, Shield];

export const applicationImages = {
  "slope-protection":
    "/cement.webp",
  "drainage-channel":
    "https://images.unsplash.com/photo-1745265796934-c34e78554872?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "pipe-protection":
    "https://images.unsplash.com/photo-1538474705339-e87de81450e8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "civil-construction":
    "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2076&auto=format&fit=crop",
  mining:
    "https://images.unsplash.com/photo-1523848309072-c199db53f137?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "building-architecture":
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop",
};

export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function scrollToSection(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

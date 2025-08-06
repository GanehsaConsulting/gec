import { TbBuildingWarehouse } from "react-icons/tb";
import { TbCircuitResistor } from "react-icons/tb";
import { TbBuildingFactory } from "react-icons/tb";
import { TbPick } from "react-icons/tb";

export const servicesMenu = [
  {
    icon: <TbBuildingWarehouse />,
    division: "Divisi Infrastruktur Pembangunan",
    services: [
      "Pembangunan Jalan & Jembatan",
      "Fasilitas Umum & Sosial",
      "Kawasan Permukiman",
      "Renovasi & Rehabilitasi",
      "Drainase & Utilitas",
      "Proyek Strategis Skala Nasional",
    ],
  },
  {
    icon: <TbCircuitResistor />,
    division: "Divisi Pengadaan Mekanikal & Elektrikal",
    services: [
      "Automation",
      "Motor & Pump",
      "Power Transmission",
      "Sanitary",
      "Filter",
      "Bolt & Nut",
      "Produksi Panel Listrik",
      "Hot Dip Galvanizing",
    ],
  },
  {
    icon: <TbBuildingFactory />,
    division: "Divisi Instalasi Pabrik",
    services: [
      "Instalasi Sistem Produksi",
      "Sistem Utilitas Pabrik",
      "Instrumentasi & Kontrol",
      "Refurbishment & Revamping",
      "Testing & Commissioning",
    ],
  },
  {
    icon: <TbPick />,
    division: "Divisi Reklamasi Pasca Tambang",
    services: [
      "Reklamasi Pasca Tambang",
      "Revegetasi Lahan",
      "Struktur Penahan Tanah",
      "Pengendalian Erosi & Drainase",
      "Desain Rencana Reklamasi",
      "Monitoring & Evaluasi",
    ],
  },
];

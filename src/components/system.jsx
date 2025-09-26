import { TbBuildingWarehouse } from "react-icons/tb";
import { TbCircuitResistor } from "react-icons/tb";
import { TbBuildingFactory } from "react-icons/tb";
import { TbPick } from "react-icons/tb";
import { TbBuildingFactory2, TbCertificate, TbShieldCheck, TbUsers } from "react-icons/tb";


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



export const whyUs = [
  {
    icon: TbBuildingFactory2,
    title: "Solusi 1 Pintu",
    desc: "Menyatukan seluruh kebutuhan engineering dalam satu layanan terintegrasi yang efisien.",
  },
  {
    icon: TbCertificate,
    title: "Sertifikasi & Legalitas Lengkap",
    desc: "Memenuhi seluruh standar teknis, hukum, dan profesional sesuai aturan nasional dan global.",
  },
  {
    icon: TbShieldCheck,
    title: "Reputasi Terjaga",
    desc: "Diakui luas sebagai mitra terpercaya dengan rekam jejak proyek konstruksi berstandar tinggi.",
  },
  {
    icon: TbUsers,
    title: "Dipercaya Berbagai Kalangan",
    desc: "Menjadi pilihan utama perusahaan, institusi, serta pemangku kepentingan di sektor industri.",
  },
];

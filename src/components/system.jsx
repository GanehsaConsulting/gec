import {
  TbBuildingBridge,
  TbDroplet,
  TbPlant2,
  TbWall,
  TbPackage,
  TbTool,
  TbShieldCheck,
  TbCircuitResistor,
  TbBuildingWarehouse,
  TbBuildingFactory,
  TbPick,
  TbBuildingFactory2,
  TbCertificate,
  TbUsers,
  TbBlocks
} from "react-icons/tb";

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

export const productDivisions = [
  {
    icon: TbBuildingBridge,
    division: "Infrastruktur",
    services: [
      {
        id: "001",
        name: "Cement Blanket",
        slug: "cement-blanket",
        dedicatedPath: "/cement-blanket",
        productCategory: null,
        variants: []
      },
      {
        id: "002",
        name: "MacMat® HS",
        fullName: "High Strength Erosion Control System",
        slug: "macmat-hs-high-strength-erosion-control-system",
        productCategory: "MacMat®",
        variants: [
          {
            id: "003",
            name: "MacMat® EM",
            fullName: "Erosion Control Blanket",
            slug: "macmat-em-erosion-control-blanket",
            division: "Infrastruktur"
          },
          {
            id: "004",
            name: "MacMat® R",
            fullName: "Reinforced ECM",
            slug: "macmat-r-reinforced-ecm",
            division: "Infrastruktur"
          }
        ]
      },
      {
        id: "005",
        name: "PoliMac®",
        fullName: "Advanced Polymer Coating",
        slug: "polimac-advanced-polymer-coating",
        productCategory: "PoliMac®",
        variants: [
          {
            id: "006",
            name: "PoliMac® Coating",
            slug: "polimac-coating",
            division: "Infrastruktur"
          }
        ]
      },
      {
        id: "037",
        name: "Geomembrane (HDPE/LDPE/PVC/EPDM)",
        slug: "geomembrane-hdpe-ldpe-pvc-epdm",
        productCategory: null,
        variants: []
      },
      {
        id: "038",
        name: "Uniaxial Geogrid",
        slug: "uniaxial-geogrid",
        productCategory: null,
        variants: []
      },
      {
        id: "039",
        name: "Biaxial Geogrid",
        slug: "biaxial-geogrid",
        productCategory: null,
        variants: []
      },
      {
        id: "040",
        name: "Triaxial Geogrid",
        slug: "triaxial-geogrid",
        productCategory: null,
        variants: []
      },
      {
        id: "041",
        name: "Steel Plastic Geogrid",
        slug: "steel-plastic-geogrid",
        productCategory: null,
        variants: []
      },
      {
        id: "042",
        name: "Warp Knitted Polyester Geogrid (PET)",
        slug: "warp-knitted-polyester-geogrid-pet",
        productCategory: null,
        variants: []
      },
      {
        id: "043",
        name: "Fiberglass Geogrid",
        slug: "fiberglass-geogrid",
        productCategory: null,
        variants: []
      },
      {
        id: "044",
        name: "Geocell",
        slug: "geocell",
        productCategory: null,
        variants: []
      },
      {
        id: "045",
        name: "Geosynthetic Clay Liner (GCL)",
        slug: "geosynthetic-clay-liner-gcl",
        productCategory: null,
        variants: []
      },
      {
        id: "046",
        name: "Geotube",
        slug: "geotube",
        productCategory: null,
        variants: []
      },
      {
        id: "047",
        name: "Geosynthetic Concrete Mattress (GCM)",
        slug: "geosynthetic-concrete-mattress-gcm",
        productCategory: null,
        variants: []
      },
      {
        id: "051",
        name: "Composite Geosynthetics",
        slug: "composite-geosynthetics-geomembrane-composite-geotextile",
        productCategory: null,
        variants: [
          "Geomembrane Composite Geotextile"
        ]
      },
      {
        id: "052",
        name: "Composite Geosynthetics",
        slug: "composite-geosynthetics-geogrid-composite-geotextile",
        productCategory: null,
        variants: [
          "Geogrid Composite Geotextile"
        ]
      },
      {
        id: "054",
        name: "Geomat (3D Erosion Control)",
        slug: "geomat-3d-erosion-control",
        productCategory: null,
        variants: []
      },
      {
        id: "055",
        name: "Rainwater Collection System (Modular)",
        slug: "rainwater-collection-system-modular",
        productCategory: null,
        variants: []
      }
    ]
  },
  {
    icon: TbDroplet,
    division: "Hydraulic Works",
    services: [
      {
        id: "007",
        name: "Gabion & Reno Mattress®",
        slug: "gabion-reno-mattress",
        productCategory: "Gabion System",
        variants: [
          {
            id: "008",
            name: "Sack Gabions",
            slug: "sack-gabions",
            division: "Hydraulic Works"
          },
          {
            id: "009",
            name: "Gabion Wall (Bronjong)",
            slug: "gabion-wall-bronjong",
            division: "Hydraulic Works"
          },
          {
            id: "010",
            name: "Gabion Retaining Walls",
            slug: "gabion-retaining-walls",
            division: "Hydraulic Works"
          },
          {
            id: "011",
            name: "Gabion Mesh Box",
            slug: "gabion-mesh-box",
            division: "Hydraulic Works"
          },
          {
            id: "012",
            name: "Gabion (Bronjong) - Mass Gravity Wall",
            slug: "gabion-bronjong-mass-gravity-wall",
            division: "Hydraulic Works"
          }
        ]
      },
      {
        id: "013",
        name: "Terramesh® & Green Terramesh®",
        slug: "terramesh-green-terramesh",
        productCategory: "Terramesh® System",
        variants: [
          {
            id: "014",
            name: "Paramesh (Terramesh® + Geogrid System)",
            slug: "paramesh-terramesh-geogrid-system",
            division: "Hydraulic Works"
          },
          {
            id: "015",
            name: "Green Terramesh®",
            slug: "green-terramesh",
            division: "Hydraulic Works"
          },
          {
            id: "016",
            name: "Mineral Terramesh®",
            slug: "mineral-terramesh",
            division: "Hydraulic Works"
          },
          {
            id: "017",
            name: "Paramesh (Terramesh® + Geogrid)",
            slug: "paramesh-terramesh-geogrid",
            division: "Hydraulic Works"
          },
          {
            id: "018",
            name: "Terramesh® System",
            slug: "terramesh-system",
            division: "Hydraulic Works"
          },
          {
            id: "019",
            name: "MSE Wall with Terramesh & Geogrid System",
            slug: "mse-wall-with-terramesh-geogrid-system",
            division: "Hydraulic Works"
          },
          {
            id: "020",
            name: "Terramesh System (Bronjong Angkur)",
            slug: "terramesh-system-bronjong-angkur",
            division: "Hydraulic Works"
          },
          {
            id: "021",
            name: "Green Terramesh System (Perkuatan Hijau)",
            slug: "green-terramesh-system-perkuatan-hijau",
            division: "Hydraulic Works"
          }
        ]
      },
      {
        id: "025",
        name: "MacTex® Geotextiles",
        slug: "mactex-geotextiles",
        productCategory: "Geotextiles",
        variants: [
          {
            id: "026",
            name: "Nonwoven Geotextile",
            slug: "nonwoven-geotextile",
            division: "Hydraulic Works"
          },
          {
            id: "027",
            name: "Woven Geotextile",
            slug: "woven-geotextile",
            division: "Hydraulic Works"
          },
          {
            id: "028",
            name: "Woven Geotextile (Weed Mat)",
            slug: "woven-geotextile-weed-mat",
            division: "Hydraulic Works"
          }
        ]
      },
      {
        id: "029",
        name: "Cubiroc®",
        fullName: "Pre-filled Gabions",
        slug: "cubiroc-pre-filled-gabions",
        productCategory: null,
        variants: []
      },
      {
        id: "030",
        name: "MacLine® & MacTex®",
        fullName: "Geosynthetics Package",
        slug: "macline-mactex-geosynthetics-package",
        productCategory: null,
        variants: []
      },
      {
        id: "032",
        name: "MacLine® Geomembranes",
        slug: "macline-geomembranes",
        productCategory: null,
        variants: []
      },
      {
        id: "033",
        name: "MacDrain® Geocomposites",
        slug: "macdrain-geocomposites",
        productCategory: null,
        variants: []
      }
    ]
  },
  {
    icon: TbPlant2,
    division: "Erosion Control",
    services: [
      {
        id: "034",
        name: "GeoMac",
        slug: "geomac",
        productCategory: null,
        variants: []
      },
      {
        id: "035",
        name: "Biomac",
        slug: "biomac",
        productCategory: null,
        variants: []
      },
      {
        id: "036",
        name: "Green Terramesh®",
        slug: "green-terramesh-erosion",
        productCategory: null,
        variants: []
      }
    ]
  },
  {
    icon: TbWall,
    division: "Retaining Walls And Soil Reinforcement",
    services: [
      {
        id: "031",
        name: "MacGrid™",
        slug: "macgrid",
        productCategory: null,
        variants: []
      }
    ]
  },
  {
    icon: TbPackage,
    division: "Pengadaan",
    services: [
      {
        id: "050",
        name: "Grass Paving Grid",
        slug: "grass-paving-grid",
        productCategory: null,
        variants: []
      }
    ]
  },
  {
    icon: TbTool,
    division: "Instalasi",
    services: [
      {
        id: "048",
        name: "Drainage Board (Plastic)",
        slug: "drainage-board-plastic",
        productCategory: null,
        variants: []
      },
      {
        id: "049",
        name: "Drainage Cell (3D Plastic)",
        slug: "drainage-cell-3d-plastic",
        productCategory: null,
        variants: []
      },
      {
        id: "053",
        name: "Composite Geosynthetics",
        slug: "composite-geosynthetics-drainage-board-composite-geotextile",
        productCategory: null,
        variants: [
          "Drainage Board Composite Geotextile"
        ]
      }
    ]
  },
  {
    icon: TbTool,
    division: "Infrastruktur And Soil Reinforcement",
    services: [
      {
        id: "022",
        name: "ParaLink™ & ParaGrid™",
        fullName: "High-Strength Geogrid",
        slug: "paralink-paragrid-high-strength-geogrid",
        productCategory: "ParaLink™ & ParaGrid™",
        variants: [
          {
            id: "023",
            name: "ParaGrid HF Geogrid",
            slug: "paragrid-hf-geogrid",
            division: "Infrastruktur & Soil Reinforcement"
          },
          {
            id: "024",
            name: "ParaLink Geogrid",
            slug: "paralink-geogrid",
            division: "Infrastruktur & Soil Reinforcement"
          }
        ]
      }
    ]
  }
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


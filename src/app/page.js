import Head from "next/head";
import { Branding } from "@/components/branding";
import { FamilyProductsClient } from "@/components/home/family-products-client";
import { LatestProjectClient } from "@/components/home/latest-project-client";
import { MainBanner } from "@/components/main-banner";
import { StatsSection } from "@/components/stats-section";
import { WhyUs } from "@/components/why-us";

export default function Home() {
  return (
    <>
      <Head>
        {/* 🧱 BASIC SEO */}
        <title>GEC (Ganesha Engineering & Construction) | Mitra Rekayasa Teknik Terintegrasi</title>
        <meta
          name="description"
          content="GEC adalah perusahaan rekayasa teknik terintegrasi yang berfokus pada infrastruktur, pengadaan, instalasi pabrik, dan reklamasi pasca tambang."
        />
        <meta name="keywords" content="jasa konstruksi, pengadaaan, engineering, kontraktor infrastruktur, pengadaan mekanik, instalasi pabrik, reklamasi tambang" />
        <meta name="author" content="GEC - Ganesha Engineering & Construction" />
        <meta name="robots" content="index, follow" />

        {/* 🌐 CANONICAL & OG META */}
        <link rel="canonical" href="https://www.ganeshaec.co.id/" />
        <meta property="og:locale" content="id_ID" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="GEC | Shaping the Future of Engineering" />
        <meta
          property="og:description"
          content="GEC adalah perusahaan rekayasa teknik terintegrasi yang berfokus pada infrastruktur, pengadaan, instalasi pabrik, dan reklamasi pasca tambang."
        />
        <meta property="og:url" content="https://www.ganeshaec.co.id/" />
        <meta property="og:site_name" content="Ganesha Engineering & Construction" />
        <meta property="og:image" content="https://res.cloudinary.com/dzrh2ogbn/image/upload/v1762239660/cms_media/522af2a4eb799ba1851e73d7288f9d8b.png" />
        <meta property="og:image:alt" content="Logo GEC - Ganesha Engineering & Construction" />

        {/* 🐦 TWITTER CARD */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="GEC | Shaping the Future of Engineering" />
        <meta
          name="twitter:description"
          content="GEC menghadirkan solusi menyeluruh untuk pembangunan, pengadaan, instalasi, dan reklamasi dengan standar nasional dan internasional."
        />
        <meta name="twitter:image" content="https://res.cloudinary.com/dzrh2ogbn/image/upload/v1762239660/cms_media/522af2a4eb799ba1851e73d7288f9d8b.png" />

        {/* 📱 RESPONSIVE META */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        {/* 🔗 FAVICON */}
        <link rel="icon" href="https://www.ganeshaec.co.id/favicon.ico" />

        {/* 🧩 STRUCTURED DATA (JSON-LD) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "GEC (Ganesha Engineering & Construction)",
              url: "https://www.ganeshaec.co.id/",
              logo: "https://res.cloudinary.com/dzrh2ogbn/image/upload/v1762239660/cms_media/522af2a4eb799ba1851e73d7288f9d8b.png",
              description:
                "GEC adalah perusahaan rekayasa teknik terintegrasi yang berfokus pada infrastruktur, pengadaan, instalasi pabrik, dan reklamasi pasca tambang.",
              foundingDate: "2025",
              address: {
                "@type": "PostalAddress",
                streetAddress:
                  "Gedung Fancy Mampang, Jl. Mampang Prpt. Raya No.151 Lantai 4 Unit A7, Duren Tiga, Pancoran, Jakarta Selatan",
                addressLocality: "Jakarta Selatan",
                addressRegion: "DKI Jakarta",
                postalCode: "12760",
                addressCountry: "ID",
              },
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+628871510045",
                contactType: "customer service",
                email: "gecganesha@gmail.com",
                areaServed: "ID",
                availableLanguage: ["Indonesian", "English"],
              },
              sameAs: [
                "https://www.facebook.com/GaneshaConsulting",
                "https://www.instagram.com/ganeshaec.co.id",
                "https://www.linkedin.com/company/ganesha-multi-kreatif",
              ],
            }),
          }}
        />
      </Head>

      {/* 🧱 PAGE STRUCTURE */}
      <main lang="id">
        <MainBanner />
        <LatestProjectClient />
        <Branding />
        <StatsSection />
        <WhyUs />
        <FamilyProductsClient />
      </main>
    </>
  );
}

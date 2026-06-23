import { CementBlanketPage } from "@/components/cement-blanket/cement-blanket-page";
import { cementBlanketData } from "@/lib/cementBlanketData";

const { seo, product } = cementBlanketData;

export const metadata = {
  title: seo.metaTitle,
  description: seo.metaDescription,
  keywords: seo.keywords,
  openGraph: {
    title: seo.metaTitle,
    description: seo.metaDescription,
    type: "website",
    images: [
      {
        url: "/cement.webp",
        alt: product.name,
      },
    ],
  },
};

export default function CementBlanketRoute() {
  return <CementBlanketPage />;
}

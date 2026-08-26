import { GanvexMatPage } from "@/components/ganvex-mat/ganvex-mat-page";
import { ganvexMatData } from "@/lib/ganvexMatData";
import { PRODUCT_LOGO } from "@/components/ganvex-mat/constants";

const { seo, product } = ganvexMatData;

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
        url: PRODUCT_LOGO,
        alt: product.name,
      },
    ],
  },
};

export default function GanvexMatRoute() {
  return <GanvexMatPage />;
}

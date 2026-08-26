import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Droplets, Zap, Shield } from "lucide-react";
import { Title } from "@/components/title-text";
import { Button } from "@/components/ui/button";
import { ganvexMatData } from "@/lib/ganvexMatData";
import { PRODUCT_LOGO, PRODUCT_PATH } from "@/components/ganvex-mat/constants";

const { product } = ganvexMatData;

const highlightIcons = [Droplets, Zap, Shield];

export function GanvexMatWidget() {
  return (
    <section className="margin spacing">
      <Title className="mb-6">Featured Product</Title>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-8 items-stretch bg-lightColor dark:bg-darkColor rounded-main overflow-hidden">
        <div className="relative min-h-[260px] lg:min-h-[360px] bg-black">
          <Image
            src={PRODUCT_LOGO}
            alt={product.name}
            fill
            className="object-contain p-8 md:p-12"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <span className="absolute top-4 left-4 px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full bg-otherColor/90 text-otherColorDark">
            {product.category}
          </span>
        </div>

        <div className="flex flex-col justify-center p-6 md:p-8 lg:py-10">
          <h2 className="font-montserrat text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight mb-2">
            {product.name}
          </h2>
          <p className="text-sm font-medium text-mainColor dark:text-otherColor mb-3">
            {product.tagline}
          </p>
          <p className="text-muted-foreground leading-relaxed mb-6 max-w-lg">
            {product.heroDescription}
          </p>

          <ul className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
            {product.heroHighlights.map((label, index) => {
              const Icon = highlightIcons[index] || Shield;
              return (
                <li
                  key={label}
                  className="flex flex-col gap-2 p-3 rounded-secondary bg-white dark:bg-secondaryDark border border-neutral-200/80 dark:border-neutral-800"
                >
                  <div className="w-9 h-9 rounded-full bg-mainColor/10 dark:bg-otherColor/10 flex items-center justify-center">
                    <Icon className="h-4 w-4 text-mainColor dark:text-otherColor" />
                  </div>
                  <span className="text-xs font-semibold">{label}</span>
                </li>
              );
            })}
          </ul>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              asChild
              size="lg"
              className="bg-mainColor hover:bg-mainColor/90 text-white"
            >
              <Link href={PRODUCT_PATH}>
                Pelajari Lebih Lanjut
                <ArrowRight />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/contact">Minta Penawaran</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

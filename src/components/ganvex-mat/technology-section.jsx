import Image from "next/image";
import { ganvexMatData } from "@/lib/ganvexMatData";
import { SectionHeader } from "./section-header";
import { HERO_IMAGE } from "./constants";

const { technology } = ganvexMatData;

export function TechnologySection() {
  return (
    <section id="technology" className="margin spacing">
      <SectionHeader
        label={technology.label}
        title="Teknologi Paten"
        description={technology.description}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 md:gap-4">
        <div className="lg:col-span-5 relative min-h-[280px] md:min-h-[360px] rounded-main overflow-hidden">
          <Image
            src={HERO_IMAGE}
            alt="Struktur material Ganvex Mat di lapangan"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 40vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-darkColor/80 via-darkColor/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-otherColor mb-1">
              {technology.subtitle}
            </p>
            <p className="text-white text-lg md:text-xl font-semibold tracking-tight">
              3D Rubber Sealing
            </p>
          </div>
        </div>

        <div className="lg:col-span-7 flex flex-col gap-3">
          <ul className="grid sm:grid-cols-3 gap-2">
            {technology.features.map((feature, index) => (
              <li
                key={feature}
                className="p-4 rounded-main bg-lightColor dark:bg-darkColor border border-transparent dark:border-white/5"
              >
                <span className="text-otherColorDark dark:text-otherColor text-xs font-semibold tabular-nums">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="mt-2 text-sm leading-relaxed">{feature}</p>
              </li>
            ))}
          </ul>

          <div className="grid sm:grid-cols-3 gap-2 flex-1">
            {technology.materialLayers.map((layer, index) => (
              <div
                key={layer.layer}
                className="flex flex-col justify-between p-4 md:p-5 rounded-main bg-lightColor/80 dark:bg-secondaryDark border border-neutral-200/60 dark:border-white/5"
              >
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">
                    {layer.layer}
                  </p>
                  <p className="font-semibold text-sm md:text-base mb-2">
                    {layer.name}
                  </p>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {layer.description}
                </p>
                <div
                  className="mt-4 h-1 rounded-full bg-mainColor/20 dark:bg-otherColor/20 overflow-hidden"
                  aria-hidden
                >
                  <div
                    className="h-full rounded-full bg-mainColor dark:bg-otherColor"
                    style={{ width: `${100 - index * 22}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

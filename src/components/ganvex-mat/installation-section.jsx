import Image from "next/image";
import { ganvexMatData } from "@/lib/ganvexMatData";
import { SectionHeader } from "./section-header";
import { heroCarouselImages } from "./constants";

const { installation } = ganvexMatData;

export function InstallationSection() {
  return (
    <section
      id="installation"
      className="bg-lightColor/40 dark:bg-darkColor/40 spacing"
    >
      <div className="margin">
        <SectionHeader
          label="Instalasi"
          title={installation.title}
          description={installation.description}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6">
          <div className="lg:col-span-4 relative min-h-[240px] rounded-main overflow-hidden order-2 lg:order-1">
            <Image
              src={heroCarouselImages[1].src}
              alt={heroCarouselImages[1].alt}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-darkColor/75 to-transparent" />
            <div className="absolute bottom-0 p-5">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-otherColor mb-1">
                Manfaat
              </p>
              <p className="text-white text-sm md:text-base leading-relaxed font-medium">
                {installation.benefit}
              </p>
            </div>
          </div>

          <ol className="lg:col-span-8 space-y-2 order-1 lg:order-2">
            {installation.steps.map((step) => (
              <li
                key={step.step}
                className="group grid grid-cols-[auto_1fr] gap-4 md:gap-6 p-4 md:p-5 rounded-main bg-white/70 dark:bg-secondaryDark border border-neutral-200/50 dark:border-white/5 hover:border-mainColor/20 dark:hover:border-otherColor/25 transition-[border-color] duration-300"
              >
                <span className="text-2xl md:text-3xl font-semibold tabular-nums text-mainColor/30 dark:text-otherColor/40 group-hover:text-mainColor dark:group-hover:text-otherColor transition-colors duration-300">
                  {String(step.step).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-semibold text-base md:text-lg mb-1.5">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

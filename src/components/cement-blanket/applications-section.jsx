import Image from "next/image";
import { cementBlanketData } from "@/lib/cementBlanketData";
import { SectionHeader } from "./section-header";
import { heroCarouselImages } from "./constants";

const { applications } = cementBlanketData;

function ApplicationCard({ app, index, featured = false }) {
  const image = heroCarouselImages[index % heroCarouselImages.length];

  if (featured) {
    return (
      <div className="relative h-full min-h-[220px] rounded-main overflow-hidden group">
        <Image
          src={image.src}
          alt=""
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-darkColor via-darkColor/55 to-darkColor/20" />
        <div className="absolute inset-0 flex flex-col justify-end p-5 md:p-6">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-otherColor mb-2">
            {String(index + 1).padStart(2, "0")}
          </p>
          <h3 className="text-lg md:text-xl font-semibold text-white mb-2">
            {app.category}
          </h3>
          <p className="text-sm text-white/75 leading-relaxed mb-3 max-w-md">
            {app.description}
          </p>
          <ul className="flex flex-wrap gap-x-3 gap-y-1">
            {app.useCases.map((useCase) => (
              <li
                key={useCase}
                className="text-[11px] text-white/55 uppercase tracking-wide"
              >
                {useCase}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full p-5 rounded-main bg-lightColor dark:bg-secondaryDark border border-transparent dark:border-white/5 gap-4">
      <p className="text-xs font-semibold tabular-nums text-mainColor dark:text-otherColor">
        {String(index + 1).padStart(2, "0")}
      </p>
      <div className="mt-auto">
        <h3 className="text-base md:text-lg font-semibold leading-snug mb-2">
          {app.category}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed mb-3">
          {app.description}
        </p>
        <ul className="space-y-1 pt-3 border-t border-neutral-200/70 dark:border-white/10">
          {app.useCases.map((useCase) => (
            <li key={useCase} className="text-xs text-muted-foreground">
              {useCase}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function ApplicationsSection() {
  return (
    <section
      id="applications"
      className="bg-lightColor/40 dark:bg-darkColor/40 spacing"
    >
      <div className="margin space-y-5">
        <SectionHeader
          label="Aplikasi"
          title="Aplikasi Cement Blanket"
          description="Solusi pelapisan beton permanen untuk berbagai kebutuhan infrastruktur sipil."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {applications.map((app, index) => (
            <div
              key={app.slug}
              className={index === 0 ? "md:col-span-2 lg:col-span-2" : ""}
            >
              <ApplicationCard app={app} index={index} featured={index === 0} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

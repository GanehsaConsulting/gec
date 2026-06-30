import { cementBlanketData } from "@/lib/cementBlanketData";
import { SectionHeader } from "./section-header";

const { applications } = cementBlanketData;

function ApplicationCard({ app, index }) {
  return (
    <div className="flex flex-col justify-between h-full p-4 md:p-5 rounded-main bg-lightColor dark:bg-darkColor gap-4">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
          {String(index + 1).padStart(2, "0")}
        </p>
        <h3 className="text-base md:text-lg font-semibold leading-snug mb-2">
          {app.category}
        </h3>
        <p className="text-sm leading-relaxed">{app.description}</p>
      </div>
      <ul className="space-y-1 pt-2 border-t border-neutral-200/80 dark:border-neutral-700/80">
        {app.useCases.map((useCase) => (
          <li key={useCase} className="text-xs text-muted-foreground">
            · {useCase}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ApplicationsSection() {
  const topRow = applications.slice(0, 3);
  const bottomRow = applications.slice(3);

  return (
    <section
      id="applications"
      className="bg-lightColor/60 dark:bg-darkColor/60 spacing"
    >
      <div className="margin space-y-5">
        <SectionHeader
          label="Aplikasi"
          title="Aplikasi Cement Blanket"
          description="Solusi pelapisan beton permanen untuk berbagai kebutuhan infrastruktur sipil."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-2">
          {topRow.map((app, index) => (
            <div key={app.slug} className="sm:col-span-1 lg:col-span-2">
              <ApplicationCard app={app} index={index} />
            </div>
          ))}
          {bottomRow.map((app, index) => (
            <div key={app.slug} className="sm:col-span-1 lg:col-span-3">
              <ApplicationCard app={app} index={index + 3} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

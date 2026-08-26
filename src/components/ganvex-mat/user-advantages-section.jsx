import { ganvexMatData } from "@/lib/ganvexMatData";
import { SectionHeader } from "./section-header";

const { userAdvantages } = ganvexMatData;

export function UserAdvantagesSection() {
  return (
    <section id="user-advantages" className="margin spacing">
      <SectionHeader
        label="Keunggulan"
        title="Bagi Pengguna"
        description="Dirancang untuk performa optimal di berbagai kondisi lapangan."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {userAdvantages.map((item, index) => (
          <article
            key={item.title}
            className="relative overflow-hidden p-5 md:p-6 rounded-main bg-lightColor dark:bg-secondaryDark border border-transparent dark:border-white/5"
          >
            <span
              className="absolute -right-1 -top-2 text-6xl md:text-7xl font-semibold tabular-nums text-mainColor/[0.07] dark:text-otherColor/10 select-none pointer-events-none"
              aria-hidden
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <p className="relative text-xs font-semibold uppercase tracking-wider text-mainColor dark:text-otherColor mb-3">
              Keunggulan {String(index + 1).padStart(2, "0")}
            </p>
            <h3 className="relative text-base md:text-lg font-semibold mb-2 leading-snug">
              {item.title}
            </h3>
            <p className="relative text-sm text-muted-foreground leading-relaxed">
              {item.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

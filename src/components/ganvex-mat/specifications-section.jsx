import { ganvexMatData } from "@/lib/ganvexMatData";
import { Title } from "@/components/title-text";
import { SectionHeader } from "./section-header";

const { specifications } = ganvexMatData;
const { beforeSetting, afterSetting, testMethods, trademarkNote } = specifications;

export function SpecificationsSection() {
  return (
    <section id="specifications" className="margin spacing">
      <SectionHeader
        label="Spesifikasi"
        title="Spesifikasi Produk"
        description="GEC Ganvex Mat tersedia dalam varian CB 8 dan CB 10."
      />

      <p className="text-sm leading-relaxed mb-8 p-5 md:p-6 rounded-main bg-lightColor dark:bg-secondaryDark border border-transparent dark:border-white/5 text-muted-foreground">
        {trademarkNote}
      </p>

      <Title className="mb-4 text-mainColor dark:text-otherColor">
        {beforeSetting.title}
      </Title>
      <div className="overflow-x-auto rounded-main bg-lightColor dark:bg-secondaryDark border border-transparent dark:border-white/5 mb-10">
        <table className="w-full min-w-[480px] text-sm">
          <thead>
            <tr className="border-b border-neutral-200/80 dark:border-white/10 bg-mainColor/[0.04] dark:bg-otherColor/5">
              {beforeSetting.headers.map((header) => (
                <th
                  key={header}
                  className="px-4 py-3.5 text-left font-semibold uppercase tracking-wider text-xs"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {beforeSetting.rows.map((row) => (
              <tr
                key={row.spec}
                className="border-b border-neutral-200/60 dark:border-white/5 last:border-0"
              >
                <td className="px-4 py-3.5 font-medium">{row.spec}</td>
                <td className="px-4 py-3.5 text-muted-foreground">{row.cb8}</td>
                <td className="px-4 py-3.5 text-muted-foreground">{row.cb10}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Title className="mb-4 text-mainColor dark:text-otherColor">
        {afterSetting.title}
      </Title>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 mb-10">
        {afterSetting.parameters.map((param) => (
          <div
            key={param.label}
            className="p-4 md:p-5 rounded-main bg-lightColor dark:bg-secondaryDark border border-transparent dark:border-white/5"
          >
            <p className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground mb-2">
              {param.label}
            </p>
            <p className="text-xl md:text-2xl font-semibold tracking-tight text-mainColor dark:text-otherColor">
              {param.value}
            </p>
          </div>
        ))}
      </div>

      <Title className="mb-4 text-mainColor dark:text-otherColor">
        Metode Uji
      </Title>
      <div className="flex flex-wrap gap-2">
        {testMethods.map((method) => (
          <span
            key={method}
            className="px-3.5 py-2 text-xs font-semibold uppercase tracking-wider rounded-main bg-lightColor dark:bg-secondaryDark border border-neutral-200/60 dark:border-white/10"
          >
            {method}
          </span>
        ))}
      </div>
    </section>
  );
}

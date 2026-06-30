import { cementBlanketData } from "@/lib/cementBlanketData";
import { SectionHeader } from "./section-header";

const { specifications } = cementBlanketData;
const { beforeSetting, afterSetting, testMethods, trademarkNote } = specifications;

export function SpecificationsSection() {
  return (
    <section
      id="specifications"
      className="bg-lightColor/60 dark:bg-darkColor/60 spacing"
    >
      <div className="margin">
        <SectionHeader
          label="Spesifikasi"
          title="Spesifikasi Produk"
          description="GEC Cement Blanket tersedia dalam varian CB 8 dan CB 10."
        />

        <p className="text-sm text-muted-foreground mb-8 p-4 rounded-secondary bg-white dark:bg-secondaryDark border border-neutral-200 dark:border-neutral-800">
          {trademarkNote}
        </p>

        <h3 className="text-lg font-semibold mb-4">{beforeSetting.title}</h3>
        <div className="overflow-x-auto rounded-main border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-secondaryDark mb-8">
          <table className="w-full min-w-[480px] text-sm">
            <thead>
              <tr className="bg-mainColor/5 dark:bg-otherColor/10">
                {beforeSetting.headers.map((header) => (
                  <th key={header} className="px-4 py-3 text-left font-semibold">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {beforeSetting.rows.map((row) => (
                <tr
                  key={row.spec}
                  className="border-t border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-900/50"
                >
                  <td className="px-4 py-3 font-medium">{row.spec}</td>
                  <td className="px-4 py-3">{row.cb8}</td>
                  <td className="px-4 py-3">{row.cb10}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3 className="text-lg font-semibold mb-4">{afterSetting.title}</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {afterSetting.parameters.map((param) => (
            <div
              key={param.label}
              className="p-4 bg-white dark:bg-secondaryDark rounded-secondary border border-neutral-200 dark:border-neutral-800"
            >
              <p className="text-xs text-muted-foreground mb-1">{param.label}</p>
              <p className="font-semibold text-lg text-mainColor dark:text-otherColor">
                {param.value}
              </p>
            </div>
          ))}
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Metode Uji</h3>
          <div className="flex flex-wrap gap-2">
            {testMethods.map((method) => (
              <span
                key={method}
                className="px-3 py-1.5 text-xs font-medium rounded-full bg-white dark:bg-secondaryDark border border-neutral-200 dark:border-neutral-800"
              >
                {method}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

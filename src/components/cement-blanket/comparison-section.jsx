import { cementBlanketData } from "@/lib/cementBlanketData";
import { SectionHeader } from "./section-header";

const { comparison } = cementBlanketData;

export function ComparisonSection() {
  return (
    <section id="comparison" className="margin spacing">
      <SectionHeader
        label="Perbandingan"
        title={comparison.title}
        description="Lihat bagaimana Cement Blanket unggul dibanding metode konstruksi konvensional."
      />

      <div className="overflow-x-auto rounded-main border border-neutral-200 dark:border-neutral-800">
        <table className="w-full min-w-[800px] text-sm">
          <thead>
            <tr className="bg-neutral-100 dark:bg-neutral-800">
              <th className="px-4 py-3 text-left font-semibold">Metode</th>
              <th className="px-4 py-3 text-left font-semibold">
                Kecepatan Instalasi
              </th>
              <th className="px-4 py-3 text-left font-semibold">Keahlian</th>
              <th className="px-4 py-3 text-left font-semibold">Peralatan</th>
              <th className="px-4 py-3 text-left font-semibold">Limbah</th>
              <th className="px-4 py-3 text-left font-semibold">
                Ketergantungan Cuaca
              </th>
              <th className="px-4 py-3 text-left font-semibold">
                Efisiensi Biaya
              </th>
            </tr>
          </thead>
          <tbody>
            {comparison.competitors.map((row) => (
              <tr
                key={row.method}
                className={`border-t border-neutral-200 dark:border-neutral-800 ${
                  row.highlight
                    ? "bg-mainColor/5 dark:bg-otherColor/10 font-medium"
                    : "hover:bg-neutral-50 dark:hover:bg-neutral-900/30"
                }`}
              >
                <td
                  className={`px-4 py-3 ${
                    row.highlight
                      ? "font-bold text-mainColor dark:text-otherColor"
                      : ""
                  }`}
                >
                  {row.method}
                  {row.highlight && (
                    <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-otherColor/20 text-otherColorDark dark:text-otherColor">
                      Rekomendasi
                    </span>
                  )}
                </td>
                <td className="px-4 py-3">{row.installationSpeed}</td>
                <td className="px-4 py-3">{row.skillRequired}</td>
                <td className="px-4 py-3">{row.equipmentNeeded}</td>
                <td className="px-4 py-3">{row.wasteProduced}</td>
                <td className="px-4 py-3">{row.weatherDependency}</td>
                <td className="px-4 py-3">{row.costEfficiency}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

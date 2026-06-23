import { cementBlanketData } from "@/lib/cementBlanketData";
import { SectionHeader } from "./section-header";

const { specifications } = cementBlanketData;

const variantUseCases = {
  CB5: "Pipa, permukaan ringan",
  CB8: "Saluran air, drainase",
  CB13: "Slope protection, beban berat",
};

const extraSpecs = [
  {
    label: specifications.rollSize.label,
    value: specifications.rollSize.standard,
    note: specifications.rollSize.note,
  },
  {
    label: specifications.curingTime.label,
    value: `${specifications.curingTime.initial} · ${specifications.curingTime.full}`,
  },
  {
    label: "Kekuatan Tekan",
    value: specifications.compressiveStrength,
  },
  {
    label: "Masa Simpan",
    value: specifications.shelfLife,
  },
];

export function SpecificationsSection() {
  return (
    <section
      id="specifications"
      className="bg-lightColor/60 dark:bg-darkColor/60 spacing"
    >
      <div className="margin">
        <SectionHeader
          label="Spesifikasi"
          title="Spesifikasi Teknis"
          description="Tersedia dalam 3 varian ketebalan untuk berbagai kebutuhan aplikasi."
        />

        <div className="overflow-x-auto rounded-main border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-secondaryDark">
          <table className="w-full min-w-[640px] text-sm">
            <thead>
              <tr className="bg-mainColor/5 dark:bg-otherColor/10">
                <th className="px-4 py-3 text-left font-semibold">Varian</th>
                <th className="px-4 py-3 text-left font-semibold">Ketebalan</th>
                <th className="px-4 py-3 text-left font-semibold">
                  Setelah Mengeras
                </th>
                <th className="px-4 py-3 text-left font-semibold">Berat/m²</th>
                <th className="px-4 py-3 text-left font-semibold">
                  Ideal Untuk
                </th>
              </tr>
            </thead>
            <tbody>
              {specifications.thickness.variants.map((variant) => (
                <tr
                  key={variant.type}
                  className="border-t border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-900/50"
                >
                  <td className="px-4 py-3 font-bold text-mainColor dark:text-otherColor">
                    {variant.type}
                  </td>
                  <td className="px-4 py-3">{variant.thickness}</td>
                  <td className="px-4 py-3">{variant.finalThickness}</td>
                  <td className="px-4 py-3">
                    {specifications.weight[variant.type]}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {variantUseCases[variant.type]}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          {extraSpecs.map((spec) => (
            <div
              key={spec.label}
              className="p-4 bg-white dark:bg-secondaryDark rounded-secondary"
            >
              <p className="text-xs text-muted-foreground mb-1">{spec.label}</p>
              <p className="font-semibold text-sm">{spec.value}</p>
              {spec.note && (
                <p className="text-xs text-muted-foreground mt-1">{spec.note}</p>
              )}
            </div>
          ))}
        </div>

        <div className="mt-4 p-4 rounded-secondary bg-white dark:bg-secondaryDark text-sm">
          <span className="font-semibold">Serat: </span>
          {specifications.fiber}
          <span className="mx-2 text-muted-foreground">·</span>
          <span className="font-semibold">Aktivasi: </span>
          {specifications.waterActivation}
        </div>
      </div>
    </section>
  );
}

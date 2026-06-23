import { Award } from "lucide-react";
import { cementBlanketData } from "@/lib/cementBlanketData";
import { SectionHeader } from "./section-header";

const { certifications } = cementBlanketData;

export function CertificationsSection() {
  return (
    <section id="certifications" className="margin spacing">
      <SectionHeader
        label="Sertifikasi"
        title="Sertifikasi & Standar Internasional"
        description="Memenuhi standar kualitas global dan kompatibel dengan regulasi konstruksi Indonesia."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {certifications.map((cert) => (
          <div
            key={cert.name}
            className="p-5 text-center bg-lightColor dark:bg-darkColor rounded-main border border-neutral-200 dark:border-neutral-800"
          >
            <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-mainColor/10 dark:bg-otherColor/10 flex items-center justify-center">
              <Award className="h-7 w-7 text-mainColor dark:text-otherColor" />
            </div>
            <h3 className="font-bold mb-1">{cert.name}</h3>
            <p className="text-xs text-mainColor dark:text-otherColor font-medium mb-2">
              {cert.body}
            </p>
            <p className="text-sm text-muted-foreground">{cert.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

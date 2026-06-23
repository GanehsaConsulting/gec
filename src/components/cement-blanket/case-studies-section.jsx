"use client";

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { cementBlanketData } from "@/lib/cementBlanketData";
import { fadeUp } from "./constants";
import { SectionHeader } from "./section-header";

const { caseStudies } = cementBlanketData;

export function CaseStudiesSection() {
  return (
    <section
      id="case-studies"
      className="bg-lightColor/60 dark:bg-darkColor/60 spacing"
    >
      <div className="margin">
        <SectionHeader
          label="Studi Kasus"
          title="Proyek Nyata di Indonesia"
          description="Bukti kinerja Cement Blanket di berbagai kondisi lapangan."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {caseStudies.map((study, index) => (
            <motion.article
              key={study.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col bg-white dark:bg-secondaryDark rounded-main overflow-hidden"
            >
              <div className="p-5 md:p-6 flex flex-col flex-1">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-3">
                  <MapPin className="h-3.5 w-3.5" />
                  {study.location}
                </div>
                <h3 className="text-lg font-bold mb-4">{study.title}</h3>

                <div className="space-y-3 flex-1 text-sm">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-mainColor dark:text-otherColor mb-1">
                      Tantangan
                    </p>
                    <p className="text-muted-foreground">{study.challenge}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-mainColor dark:text-otherColor mb-1">
                      Solusi
                    </p>
                    <p className="text-muted-foreground">{study.solution}</p>
                  </div>
                  <div className="pt-3 border-t border-neutral-200 dark:border-neutral-700">
                    <p className="text-xs font-semibold uppercase tracking-wider text-otherColorDark dark:text-otherColor mb-1">
                      Hasil
                    </p>
                    <p className="font-medium">{study.result}</p>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

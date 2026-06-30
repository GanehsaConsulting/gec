"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { cementBlanketData } from "@/lib/cementBlanketData";
import { fadeUp } from "./constants";
import { SectionHeader } from "./section-header";

const { technology } = cementBlanketData;

export function TechnologySection() {
  return (
    <section id="technology" className="margin spacing">
      <SectionHeader
        label={technology.label}
        title={technology.title}
        description={technology.description}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="p-6 md:p-8 bg-lightColor dark:bg-darkColor rounded-main"
        >
          <p className="text-xs font-semibold uppercase tracking-wider text-mainColor dark:text-otherColor mb-2">
            {technology.subtitle}
          </p>
          <ul className="space-y-3 mt-4">
            {technology.features.map((feature) => (
              <li key={feature} className="flex items-start gap-2 text-sm">
                <CheckCircle2 className="h-4 w-4 text-mainColor dark:text-otherColor shrink-0 mt-0.5" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        <div className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">
            Struktur Material
          </p>
          {technology.materialLayers.map((layer, index) => (
            <motion.div
              key={layer.layer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              transition={{ delay: index * 0.1 }}
              className="p-4 md:p-5 bg-white dark:bg-secondaryDark rounded-secondary border border-neutral-200 dark:border-neutral-800"
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold text-mainColor dark:text-otherColor">
                  {layer.layer}
                </span>
                <span className="text-sm font-semibold">{layer.name}</span>
              </div>
              <p className="text-sm text-muted-foreground">{layer.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";
import { cementBlanketData } from "@/lib/cementBlanketData";
import { fadeUp } from "./constants";
import { SectionHeader } from "./section-header";

const { installation } = cementBlanketData;

export function InstallationSection() {
  return (
    <section id="installation" className="margin spacing">
      <SectionHeader
        label="Instalasi"
        title={installation.title}
        description={installation.description}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-3">
        {installation.steps.map((step, index) => (
          <motion.div
            key={step.step}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            transition={{ delay: index * 0.1 }}
            className="relative flex flex-col items-start p-5 bg-lightColor dark:bg-darkColor rounded-main"
          >
            <span className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-mainColor to-otherColor dark:from-otherColor dark:to-other2 mb-3">
              {String(step.step).padStart(2, "0")}
            </span>
            <h3 className="font-semibold mb-2">{step.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {step.description}
            </p>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 p-4 md:p-5 rounded-main bg-mainColor/5 dark:bg-otherColor/10 border border-mainColor/10 dark:border-otherColor/20 flex items-start gap-3">
        <TrendingUp className="h-5 w-5 text-mainColor dark:text-otherColor shrink-0 mt-0.5" />
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-mainColor dark:text-otherColor mb-1">
            Manfaat
          </p>
          <p className="text-sm font-medium">{installation.benefit}</p>
        </div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { cementBlanketData } from "@/lib/cementBlanketData";
import { fadeUp } from "./constants";
import { SectionHeader } from "./section-header";

const { howItWorks } = cementBlanketData;

export function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      className="bg-lightColor/60 dark:bg-darkColor/60 spacing"
    >
      <div className="margin">
        <SectionHeader
          label="Cara Kerja"
          title="Dari Lembaran Fleksibel ke Beton Solid"
          description="Proses instalasi sederhana dalam 5 langkah — tanpa campuran beton konvensional."
        />
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-3">
          {howItWorks.map((step, index) => (
            <motion.div
              key={step.step}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              transition={{ delay: index * 0.1 }}
              className="relative flex flex-col items-start p-5 bg-white dark:bg-secondaryDark rounded-main"
            >
              <span className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-mainColor to-otherColor dark:from-otherColor dark:to-other2 mb-3">
                {String(step.step).padStart(2, "0")}
              </span>
              <h3 className="font-semibold mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {step.description}
              </p>
              {index < howItWorks.length - 1 && (
                <div className="hidden md:block absolute -right-2 top-1/2 -translate-y-1/2 text-otherColor/40">
                  →
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

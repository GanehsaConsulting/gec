"use client";

import { motion } from "framer-motion";
import { Shield } from "lucide-react";
import { cementBlanketData } from "@/lib/cementBlanketData";
import { benefitIcons, fadeUp } from "./constants";
import { SectionHeader } from "./section-header";

const { keyBenefits } = cementBlanketData;

export function KeyBenefitsSection() {
  return (
    <section id="key-benefits" className="margin spacing">
      <SectionHeader
        label="Keunggulan"
        title="6 Keunggulan Utama Cement Blanket"
        description="Material konstruksi inovatif yang mengubah cara pekerjaan beton dilakukan di lapangan."
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {keyBenefits.map((benefit, index) => {
          const Icon = benefitIcons[index] || Shield;
          return (
            <motion.div
              key={benefit.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeUp}
              transition={{ delay: index * 0.08 }}
              className="group p-5 md:p-6 bg-lightColor dark:bg-darkColor rounded-main border border-transparent hover:border-mainColor/20 dark:hover:border-otherColor/20 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-full bg-mainColor/10 dark:bg-otherColor/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Icon className="h-6 w-6 text-mainColor dark:text-otherColor" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {benefit.description}
              </p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

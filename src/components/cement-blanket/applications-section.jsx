"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { cementBlanketData } from "@/lib/cementBlanketData";
import { applicationImages } from "./constants";
import { SectionHeader } from "./section-header";

const { applications } = cementBlanketData;

export function ApplicationsSection() {
  const [activeApp, setActiveApp] = useState(0);
  const active = applications[activeApp];

  return (
    <section id="applications" className="margin spacing">
      <SectionHeader
        label="Aplikasi"
        title="Solusi untuk Berbagai Kebutuhan Konstruksi"
        description="Dari perlindungan lereng hingga infrastruktur bawah tanah — Cement Blanket beradaptasi dengan medan yang sulit."
      />

      <div className="flex flex-wrap gap-2 mb-6">
        {applications.map((app, index) => (
          <button
            key={app.slug}
            type="button"
            onClick={() => setActiveApp(index)}
            className={`px-4 py-2 text-sm font-medium rounded-full transition-all ${
              activeApp === index
                ? "bg-mainColor text-white dark:bg-otherColor dark:text-otherColorDark"
                : "bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700"
            }`}
          >
            {app.category}
          </button>
        ))}
      </div>

      <motion.div
        key={activeApp}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center bg-lightColor dark:bg-darkColor rounded-main overflow-hidden"
      >
        <div className="relative h-56 sm:h-72 lg:h-full min-h-[380px]">
          <Image
            src={applicationImages[active.slug]}
            alt={active.category}
            fill
            className="object-cover"
          />
        </div>
        <div className="p-6 md:p-8">
          <h3 className="text-xl md:text-2xl font-bold mb-3">{active.category}</h3>
          <p className="text-muted-foreground mb-5 leading-relaxed">
            {active.description}
          </p>
          <ul className="space-y-2">
            {active.useCases.map((useCase) => (
              <li key={useCase} className="flex items-start gap-2 text-sm">
                <CheckCircle2 className="h-4 w-4 text-mainColor dark:text-otherColor shrink-0 mt-0.5" />
                <span>{useCase}</span>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {applications.map((app) => (
          <div
            key={app.slug}
            className="p-4 rounded-secondary border border-neutral-200 dark:border-neutral-800"
          >
            <h4 className="font-semibold text-sm mb-1">{app.category}</h4>
            <p className="text-xs text-muted-foreground line-clamp-2">
              {app.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cementBlanketData } from "@/lib/cementBlanketData";
import { SectionHeader } from "./section-header";

const { faqs } = cementBlanketData;

function FaqItem({ question, answer, isOpen, onToggle }) {
  return (
    <div className="self-start border border-neutral-200 dark:border-neutral-800 rounded-secondary overflow-hidden">
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 p-4 md:p-5 text-left hover:bg-neutral-50 dark:hover:bg-neutral-900/50 transition-colors"
      >
        <span className="font-semibold text-sm md:text-base">{question}</span>
        <ChevronDown
          className={`h-5 w-5 shrink-0 text-mainColor dark:text-otherColor transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        className={`grid transition-all duration-300 ${
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <p className="px-4 md:px-5 pb-4 md:pb-5 text-sm md:text-base text-muted-foreground leading-relaxed">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}

export function FaqSection() {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <section id="faq" className="bg-lightColor/60 dark:bg-darkColor/60 spacing">
      <div className="margin">
        <SectionHeader
          label="FAQ"
          title="Pertanyaan yang Sering Diajukan"
          description="Jawaban untuk pertanyaan umum seputar produk dan aplikasi Cement Blanket."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
          {faqs.map((faq, index) => (
            <FaqItem
              key={faq.question}
              question={faq.question}
              answer={faq.answer}
              isOpen={openFaq === index}
              onToggle={() => setOpenFaq(openFaq === index ? -1 : index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

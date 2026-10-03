"use client";

import { motion } from "framer-motion";
import steps from "@/data/steps.json";
import { SectionHeading } from "./SectionHeading";

export function ProcessSection() {
  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="container-site">
        <SectionHeading title="이사 진행 과정" description="신청부터 마무리까지 다섯 단계로 진행합니다." />
        <ol className="mt-12 grid md:grid-cols-5 md:gap-6">
          {steps.map((step, index) => (
            <motion.li
              key={step.title}
              className="grid grid-cols-[3rem_1fr] border-l border-line pb-8 pl-5 last:pb-0 md:block md:border-l-0 md:border-t-2 md:pb-0 md:pl-0 md:pt-6"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.45, delay: index * 0.12 }}
            >
              <span className="text-sm font-semibold tabular-nums text-primary">{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h3 className="text-lg font-bold text-ink md:mt-3">{step.title}</h3>
                <p className="mt-1.5 text-[15px] leading-relaxed text-ink-soft">{step.description}</p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}

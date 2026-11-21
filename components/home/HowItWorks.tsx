
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Search,
  ClipboardCheck,
  CreditCard,
  PackageCheck,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Find the Right Equipment",
    description:
      "Explore available equipment and use search or category filters to find what you need. Compare rental prices, locations, and availability.",
    icon: Search,
    details: ["Browse equipment listings", "Compare prices and details"],
  },
  {
    number: "02",
    title: "Review & Book",
    description:
      "Choose the equipment that fits your needs. Check its condition, rental terms, and availability before submitting your booking request.",
    icon: ClipboardCheck,
    details: ["Check rental conditions", "Select your rental period"],
  },
  {
    number: "03",
    title: "Confirm & Pay",
    description:
      "Complete the booking process and follow the payment instructions. Once the booking is confirmed, coordinate the pickup or delivery with the owner.",
    icon: CreditCard,
    details: ["Complete the payment", "Confirm pickup or delivery"],
  },
  {
    number: "04",
    title: "Use & Return",
    description:
      "Get your work done with the equipment. Return it according to the agreed rental terms and make sure it is ready for the next renter.",
    icon: PackageCheck,
    details: ["Use the equipment responsibly", "Return it on time"],
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.16,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 35 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: "easeOut" as const,
    },
  },
};

const HowItWorks = () => {
  return (
    <section className="relative overflow-hidden bg-[#F8F8F8] py-20 dark:bg-[#0B0B0B]">
      {/* Background decoration */}
      <div className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-[#F4B400]/10 blur-[120px]" />
      <div className="pointer-events-none absolute -right-32 bottom-10 h-80 w-80 rounded-full bg-[#F4B400]/10 blur-[130px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-14 max-w-2xl text-center"
        >
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#F4B400]/30 bg-[#F4B400]/10 px-4 py-2 text-sm font-semibold text-[#A87900] dark:text-[#F4B400]">
            <span className="h-2 w-2 rounded-full bg-[#F4B400]" />
            Simple & Hassle-Free
          </span>

          <h2 className="text-3xl font-bold tracking-tight text-[#0B0B0B] sm:text-4xl lg:text-5xl dark:text-white">
            How Does <span className="text-[#D99B00] dark:text-[#F4B400]">Gearora</span> Work?
          </h2>

          <p className="mt-5 text-base leading-7 text-gray-600 sm:text-lg dark:text-gray-400">
            Getting the equipment you need shouldn&apos;t be complicated.
            Follow four simple steps and get ready to bring your next project
            to life.
          </p>
        </motion.div>

        {/* Steps */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <motion.div
                key={step.number}
                variants={itemVariants}
                className="group relative"
              >
                {/* Connector */}
                {index !== steps.length - 1 && (
                  <div className="absolute left-[calc(100%+0.75rem)] top-12 z-10 hidden w-3 lg:block">
                    <ArrowRight className="h-5 w-5 text-[#D99B00]/60 dark:text-[#F4B400]/60" />
                  </div>
                )}

                <div className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-[#F4B400]/60 hover:shadow-xl hover:shadow-[#F4B400]/10 dark:border-white/10 dark:bg-[#151515] dark:hover:border-[#F4B400]/50">
                  {/* Step number */}
                  <div className="mb-7 flex items-center justify-between">
                    <span className="text-sm font-bold tracking-[0.2em] text-gray-400 dark:text-gray-500">
                      STEP {step.number}
                    </span>

                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F4B400]/15 text-[#B98200] transition-all duration-300 group-hover:rotate-6 group-hover:bg-[#F4B400] group-hover:text-[#0B0B0B] dark:text-[#F4B400] dark:group-hover:text-[#0B0B0B]">
                      <Icon className="h-7 w-7" strokeWidth={1.8} />
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="mb-3 text-xl font-bold text-[#0B0B0B] dark:text-white">
                    {step.title}
                  </h3>

                  <p className="mb-7 flex-1 text-sm leading-7 text-gray-600 dark:text-gray-400">
                    {step.description}
                  </p>

                  {/* Step checklist */}
                  <div className="space-y-3 border-t border-gray-100 pt-5 dark:border-white/10">
                    {step.details.map((detail) => (
                      <div key={detail} className="flex items-center gap-2.5">
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-[#D99B00] dark:text-[#F4B400]" />
                        <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                          {detail}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Bottom accent */}
                  <div className="absolute bottom-0 left-0 h-1 w-0 bg-[#F4B400] transition-all duration-500 group-hover:w-full" />
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12 flex flex-col items-center justify-between gap-6 rounded-2xl border border-[#F4B400]/20 bg-[#FFF9E8] p-6 sm:flex-row sm:p-8 dark:bg-[#151515]"
        >
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#F4B400]/20 text-[#A87900] dark:text-[#F4B400]">
              <ShieldCheck className="h-6 w-6" />
            </div>

            <div>
              <h3 className="text-lg font-bold text-[#0B0B0B] dark:text-white">
                Ready to get started?
              </h3>
              <p className="mt-1 text-sm leading-6 text-gray-600 dark:text-gray-400">
                Find the right equipment and make your next project easier.
              </p>
            </div>
          </div>

          <Link
            href="/equipments"
            className="inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-xl bg-[#F4B400] px-6 py-3.5 text-sm font-bold text-[#0B0B0B] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:bg-[#DFA300] hover:shadow-lg sm:w-auto"
          >
            Explore Equipment
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;

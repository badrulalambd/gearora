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
  Sparkles,
  ShieldCheck,
  Clock3,
} from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Find the Right Equipment",
    description:
      "Explore available equipment and use search or category filters to find what you need. Compare rental prices, locations, and availability.",
    checklist: [
      "Browse equipment listings",
      "Compare prices and details",
    ],
    icon: Search,
    color: "from-yellow-500/20 to-amber-500/5",
  },
  {
    number: "02",
    title: "Review & Book",
    description:
      "Choose the equipment that fits your needs. Check its condition, rental terms, and availability before submitting your booking request.",
    checklist: [
      "Check rental conditions",
      "Select your rental period",
    ],
    icon: ClipboardCheck,
    color: "from-orange-500/20 to-yellow-500/5",
  },
  {
    number: "03",
    title: "Confirm & Pay",
    description:
      "Complete the booking process and follow the payment instructions. Once the booking is confirmed, coordinate the pickup or delivery with the owner.",
    checklist: [
      "Complete the payment",
      "Confirm pickup or delivery",
    ],
    icon: CreditCard,
    color: "from-emerald-500/20 to-green-500/5",
  },
  {
    number: "04",
    title: "Use & Return",
    description:
      "Get your work done with the equipment. Return it according to the agreed rental terms and make sure it is ready for the next renter.",
    checklist: [
      "Use the equipment responsibly",
      "Return it on time",
    ],
    icon: PackageCheck,
    color: "from-blue-500/20 to-sky-500/5",
  },
];

const benefits = [
  {
    icon: ShieldCheck,
    title: "Know Before You Rent",
    description:
      "Review equipment details, condition, and rental terms before making your booking.",
  },
  {
    icon: Clock3,
    title: "Save Your Time",
    description:
      "Find the equipment you need without the hassle of searching through multiple sources.",
  },
  {
    icon: Sparkles,
    title: "Make Your Projects Easier",
    description:
      "Get access to the right tools and equipment for your projects, whenever you need them.",
  },
];

const HowItWorksPage = () => {
  return (
    <main className="overflow-hidden bg-background text-foreground">
      {/* ================= HERO SECTION ================= */}
      <section className="relative overflow-hidden bg-[#0B0B0B] px-4 py-24 text-white sm:px-6 lg:px-8">
        {/* Background effects */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(244,180,0,0.14),transparent_45%)]" />

        <div className="absolute inset-0 opacity-[0.07]">
          <div className="h-full w-full bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:40px_40px]" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative mx-auto max-w-5xl text-center"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#F4B400]/30 bg-[#F4B400]/10 px-4 py-2 text-sm font-medium text-[#F4B400]">
            <Sparkles size={16} />
            <span>Simple & Hassle-Free</span>
          </div>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            How Does{" "}
            <span className="text-[#F4B400]">Gearora</span> Work?
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-gray-400 sm:text-lg">
            Getting the equipment you need shouldn&apos;t be complicated.
            Follow four simple steps and get ready to bring your next
            project to life.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/equipments"
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-[#F4B400] px-7 py-3.5 font-semibold text-[#0B0B0B] transition-all duration-300 hover:bg-[#ffd044] hover:shadow-[0_0_30px_rgba(244,180,0,0.25)]"
            >
              Explore Equipment
              <ArrowRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>

            <Link
              href="/contact-us"
              className="inline-flex items-center justify-center rounded-xl border border-white/15 px-7 py-3.5 font-medium text-white transition-all duration-300 hover:border-[#F4B400]/50 hover:bg-white/5"
            >
              Need Help?
            </Link>
          </div>
        </motion.div>

        {/* Floating step indicators */}
        <div className="relative mx-auto mt-20 grid max-w-4xl grid-cols-2 gap-4 sm:grid-cols-4">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.2 + index * 0.15,
              }}
              className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 text-center backdrop-blur-sm transition-colors duration-300 hover:border-[#F4B400]/40 hover:bg-white/[0.07]"
            >
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-[#F4B400]/10 text-[#F4B400]">
                <step.icon size={22} />
              </div>

              <p className="mt-4 text-xs font-semibold tracking-[0.2em] text-[#F4B400]">
                STEP {step.number}
              </p>

              <p className="mt-2 text-sm font-semibold text-white sm:text-base">
                {step.title}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================= STEPS SECTION ================= */}
      <section className="relative bg-[#F8F8F8] py-20 dark:bg-[#111111] sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Section heading */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="mx-auto mb-16 max-w-2xl text-center"
          >
            <span className="inline-block rounded-full bg-[#F4B400]/15 px-4 py-2 text-sm font-semibold text-[#B88700] dark:text-[#F4B400]">
              <span className="text-[#B88700] dark:text-[#F4B400]">
                Simple & Hassle-Free
              </span>
            </span>

            <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              How Does Gearora Work?
            </h2>

            <p className="mt-5 text-base leading-8 text-gray-600 dark:text-gray-400 sm:text-lg">
              Getting the equipment you need shouldn&apos;t be complicated.
              Follow four simple steps and get ready to bring your next
              project to life.
            </p>
          </motion.div>

          {/* Timeline */}
          <div className="relative mx-auto max-w-5xl">
            {/* Desktop timeline line */}
            <div className="absolute left-8 top-0 hidden h-full w-px bg-[#F4B400]/30 md:left-1/2 md:block md:-translate-x-1/2" />

            <div className="space-y-12 md:space-y-16">
              {steps.map((step, index) => {
                const Icon = step.icon;
                const isEven = index % 2 === 0;

                return (
                  <motion.div
                    key={step.number}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className={`relative flex flex-col gap-6 md:flex-row md:items-center md:gap-12 ${
                      isEven ? "" : "md:flex-row-reverse"
                    }`}
                  >
                    {/* Timeline marker */}
                    <div className="absolute left-8 top-8 z-10 hidden h-14 w-14 -translate-x-1/2 items-center justify-center rounded-2xl border-4 border-[#F8F8F8] bg-[#F4B400] text-[#0B0B0B] shadow-lg dark:border-[#111111] md:flex md:left-1/2">
                      <Icon size={24} />
                    </div>

                    {/* Card */}
                    <div className="w-full md:w-[calc(50%-3rem)]">
                      <motion.div
                        whileHover={{ y: -5 }}
                        transition={{ duration: 0.3 }}
                        className="group relative overflow-hidden rounded-3xl border border-gray-200 bg-white p-7 shadow-sm transition-all duration-300 hover:border-[#F4B400]/50 hover:shadow-xl dark:border-white/10 dark:bg-[#171717] sm:p-9"
                      >
                        {/* Decorative gradient */}
                        <div
                          className={`pointer-events-none absolute right-0 top-0 h-40 w-40 rounded-full bg-gradient-to-bl ${step.color} blur-3xl opacity-70`}
                        />

                        <div className="relative">
                          {/* Step label */}
                          <div className="flex items-center justify-between">
                            <span className="rounded-full bg-[#F4B400]/15 px-4 py-2 text-xs font-bold tracking-[0.2em] text-[#B88700] dark:text-[#F4B400]">
                              STEP {step.number}
                            </span>

                            <span className="text-5xl font-black text-gray-100 dark:text-white/[0.04]">
                              {step.number}
                            </span>
                          </div>

                          {/* Mobile icon */}
                          <div className="mb-5 mt-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F4B400]/15 text-[#B88700] dark:text-[#F4B400] md:hidden">
                            <Icon size={26} />
                          </div>

                          <h3 className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl">
                            {step.title}
                          </h3>

                          <p className="mt-4 text-sm leading-7 text-gray-600 dark:text-gray-400 sm:text-base sm:leading-8">
                            {step.description}
                          </p>

                          {/* Checklist */}
                          <div className="mt-7 space-y-3">
                            {step.checklist.map((item) => (
                              <div
                                key={item}
                                className="flex items-center gap-3"
                              >
                                <CheckCircle2
                                  size={18}
                                  className="shrink-0 text-[#B88700] dark:text-[#F4B400]"
                                />
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                  {item}
                                </span>
                              </div>
                            ))}
                          </div>

                          {/* Hover accent */}
                          <div className="mt-8 h-1 w-12 rounded-full bg-[#F4B400] transition-all duration-300 group-hover:w-20" />
                        </div>
                      </motion.div>
                    </div>

                    {/* Empty opposite side */}
                    <div className="hidden w-[calc(50%-3rem)] md:block" />
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ================= BENEFITS SECTION ================= */}
      <section className="bg-white py-20 dark:bg-[#0B0B0B] sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mx-auto mb-14 max-w-2xl text-center"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#B88700] dark:text-[#F4B400]">
              Built Around Your Needs
            </p>

            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Renting Made{" "}
              <span className="text-[#B88700] dark:text-[#F4B400]">
                Easier
              </span>
            </h2>

            <p className="mt-5 text-base leading-8 text-gray-600 dark:text-gray-400">
              Gearora makes finding, booking, and renting equipment
              straightforward so you can focus on what matters most.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;

              return (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  whileHover={{ y: -6 }}
                  className="rounded-2xl border border-gray-200 bg-[#F8F8F8] p-7 transition-all duration-300 hover:border-[#F4B400]/50 hover:shadow-lg dark:border-white/10 dark:bg-[#151515] sm:p-8"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F4B400]/15 text-[#B88700] dark:text-[#F4B400]">
                    <Icon size={26} />
                  </div>

                  <h3 className="mt-6 text-xl font-bold">
                    {benefit.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-gray-600 dark:text-gray-400">
                    {benefit.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= CTA SECTION ================= */}
      <section className="relative overflow-hidden bg-[#0B0B0B] px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
        {/* Background glow */}
        <div className="absolute -left-32 top-0 h-72 w-72 rounded-full bg-[#F4B400]/10 blur-[100px]" />
        <div className="absolute -right-32 bottom-0 h-72 w-72 rounded-full bg-[#F4B400]/10 blur-[100px]" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative mx-auto max-w-4xl rounded-3xl border border-[#F4B400]/20 bg-gradient-to-br from-[#1A1A1A] to-[#111111] px-6 py-12 text-center sm:px-12 sm:py-16"
        >
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#F4B400] text-[#0B0B0B] shadow-[0_0_40px_rgba(244,180,0,0.15)]">
            <PackageCheck size={30} />
          </div>

          <h2 className="mt-7 text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
            Ready to Get Started?
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-gray-400 sm:text-lg">
            Find the right equipment for your next project. Browse
            available rentals, compare your options, and make things
            happen with Gearora.
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/equipments"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#F4B400] px-7 py-3.5 font-semibold text-[#0B0B0B] transition-all duration-300 hover:bg-[#ffd044] hover:shadow-[0_0_30px_rgba(244,180,0,0.2)] sm:w-auto"
            >
              Browse Equipment
              <ArrowRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>

            <Link
              href="/add-equipment"
              className="inline-flex w-full items-center justify-center rounded-xl border border-white/15 px-7 py-3.5 font-medium text-white transition-all duration-300 hover:border-[#F4B400]/50 hover:bg-white/5 sm:w-auto"
            >
              List Your Equipment
            </Link>
          </div>
        </motion.div>
      </section>
    </main>
  );
};

export default HowItWorksPage;
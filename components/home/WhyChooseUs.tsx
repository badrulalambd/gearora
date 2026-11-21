
"use client";

import { motion } from "framer-motion";
import {
  BadgeCheck,
  CalendarDays,
  CreditCard,
  Wallet,
  ShieldCheck,
  Zap,
  Sparkles,
  CheckCircle2,
  CircleDollarSign,
  Clock3,
  PackageCheck,
} from "lucide-react";

const benefits = [
  {
    number: "01",
    title: "Affordable Rental Prices",
    description:
      "Save more by renting instead of buying. Find equipment that fits your project and your budget without the burden of ownership.",
    icon: Wallet,
  },
  {
    number: "02",
    title: "Verified Equipment Owners",
    description:
      "Explore equipment listings with clear owner information, descriptions, and rental terms to help you make confident decisions.",
    icon: BadgeCheck,
  },
  {
    number: "03",
    title: "Flexible Rental Periods",
    description:
      "Rent on your schedule. Choose equipment for short-term tasks or longer projects with convenient rental options.",
    icon: CalendarDays,
  },
  {
    number: "04",
    title: "Secure Payments",
    description:
      "Enjoy a convenient payment experience designed to make booking and renting equipment simple and straightforward.",
    icon: CreditCard,
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: "easeOut" as const,
    },
  },
};

const WhyChooseUs = () => {
  return (
    <section className="relative overflow-hidden bg-[#F3F4F6] py-20 dark:bg-[#0B0B0B] sm:py-24">
      {/* Section Background Decorations */}
      <div className="pointer-events-none absolute -left-40 top-20 h-80 w-80 rounded-full bg-[#F4B400]/10 blur-[100px]" />
      <div className="pointer-events-none absolute -bottom-40 right-0 h-96 w-96 rounded-full bg-[#F4B400]/[0.06] blur-[110px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-14 max-w-3xl text-center"
        >
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#F4B400]/30 bg-[#F4B400]/10 px-4 py-2 text-sm font-semibold text-[#987000] dark:text-[#F4B400]">
            <Sparkles size={16} />
            Why Choose Us?
          </div>

          <h2 className="text-3xl font-bold tracking-tight text-[#0B0B0B] sm:text-4xl lg:text-5xl dark:text-white">
            Equipment Rental,
            <span className="block text-[#C89100] dark:text-[#F4B400]">
              Made Simple with Gearora.
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-gray-600 sm:text-lg dark:text-gray-400">
            Everything you need for a smarter, easier, and more convenient
            equipment rental experience.
          </p>
        </motion.div>

        {/* Main Dark Animated Panel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 25 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="group relative isolate overflow-hidden rounded-[28px] border border-[#333333] bg-[#0B0B0B] p-6 shadow-2xl shadow-black/10 sm:p-10 lg:p-14"
        >
          {/* Animated Yellow Glow */}
          <motion.div
            animate={{
              x: [0, 35, -15, 0],
              y: [0, -20, 15, 0],
              scale: [1, 1.15, 0.95, 1],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="pointer-events-none absolute -right-32 -top-40 -z-10 h-[420px] w-[420px] rounded-full bg-[#F4B400]/20 blur-[100px]"
          />

          <motion.div
            animate={{
              x: [0, -25, 20, 0],
              y: [0, 20, -10, 0],
              scale: [1, 0.9, 1.1, 1],
            }}
            transition={{
              duration: 14,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="pointer-events-none absolute -bottom-48 -left-32 -z-10 h-[400px] w-[400px] rounded-full bg-[#F4B400]/10 blur-[100px]"
          />

          {/* Subtle Grid Pattern */}
          <div
            className="pointer-events-none absolute inset-0 -z-10 opacity-[0.08]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)",
              backgroundSize: "42px 42px",
              maskImage: "linear-gradient(to bottom, black, transparent 90%)",
            }}
          />

          <div className="relative grid items-center gap-12 lg:grid-cols-[1fr_0.9fr]">
            {/* Left Side: Platform Benefits */}
            <motion.div
              initial={{ opacity: 0, x: -25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7 }}
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-[#F4B400]/30 bg-[#F4B400]/10 px-3.5 py-2 text-xs font-semibold uppercase tracking-wider text-[#F4B400]">
                <Sparkles size={14} />
                Why Choose Gearora?
              </div>

              <h3 className="mt-6 max-w-xl text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
                Everything You Need.
                <span className="text-[#F4B400]"> Nothing You Don&apos;t.</span>
              </h3>

              <p className="mt-5 max-w-lg text-sm leading-7 text-gray-400 sm:text-base">
                Gearora makes equipment rental easier with affordable
                prices, verified equipment owners, flexible rental
                periods, and secure payments. Get the right equipment
                without the cost and commitment of ownership.
              </p>

              {/* Four Platform Benefits */}
              <div className="mt-8 grid gap-5 sm:grid-cols-2">
                {[
                  {
                    icon: Wallet,
                    title: "Affordable Prices",
                    description: "Equipment rentals that fit your budget.",
                  },
                  {
                    icon: BadgeCheck,
                    title: "Verified Owners",
                    description: "More confidence when choosing equipment.",
                  },
                  {
                    icon: CalendarDays,
                    title: "Flexible Rentals",
                    description: "Rental options that fit your schedule.",
                  },
                  {
                    icon: ShieldCheck,
                    title: "Secure Payments",
                    description: "A convenient and secure payment experience.",
                  },
                ].map((item, index) => {
                  const Icon = item.icon;

                  return (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.45,
                        delay: index * 0.1,
                      }}
                      className="flex items-start gap-3"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F4B400]/15 text-[#F4B400]">
                        <Icon size={20} />
                      </div>

                      <div>
                        <h4 className="text-sm font-bold text-white">
                          {item.title}
                        </h4>
                        <p className="mt-1 text-xs leading-5 text-gray-400">
                          {item.description}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Decorative Bottom Line */}
              <div className="mt-10 flex items-center gap-3">
                <div className="h-1 w-14 rounded-full bg-[#F4B400]" />
                <div className="h-1 w-5 rounded-full bg-[#F4B400]/40" />
                <div className="h-1 w-2 rounded-full bg-[#F4B400]/20" />
              </div>
            </motion.div>

            {/* Right Side: Animated Gearora Visual */}
            <div className="relative mx-auto flex min-h-[340px] w-full max-w-[440px] items-center justify-center sm:min-h-[390px]">
              {/* Outer Orbit */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{
                  duration: 35,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute h-[270px] w-[270px] rounded-full border border-dashed border-[#F4B400]/25 sm:h-[350px] sm:w-[350px]"
              />

              {/* Inner Orbit */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{
                  duration: 28,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute h-[210px] w-[210px] rounded-full border border-[#F4B400]/15 sm:h-[270px] sm:w-[270px]"
              />

              {/* Center Circle */}
              <motion.div
                animate={{
                  scale: [1, 1.06, 1],
                  boxShadow: [
                    "0 0 25px rgba(244,180,0,0.08)",
                    "0 0 55px rgba(244,180,0,0.22)",
                    "0 0 25px rgba(244,180,0,0.08)",
                  ],
                }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative z-10 flex h-36 w-36 flex-col items-center justify-center rounded-full border border-[#F4B400]/50 bg-[#F4B400]/10 backdrop-blur-xl sm:h-44 sm:w-44"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F4B400] text-[#0B0B0B] sm:h-16 sm:w-16">
                  <PackageCheck size={34} strokeWidth={1.8} />
                </div>

                <span className="mt-3 text-sm font-bold tracking-wide text-white">
                  GEARORA
                </span>

                <span className="mt-1 text-[10px] uppercase tracking-[0.2em] text-[#F4B400]">
                  Rent Smarter
                </span>
              </motion.div>

              {/* Floating Card: Affordable Prices */}
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute left-0 top-8 z-20 flex items-center gap-3 rounded-2xl border border-white/10 bg-[#191919]/95 px-4 py-3 shadow-xl backdrop-blur-xl sm:left-2"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F4B400]/15 text-[#F4B400]">
                  <CircleDollarSign size={21} />
                </div>

                <div>
                  <p className="text-sm font-bold text-white">Save More</p>
                  <p className="text-xs text-gray-400">Budget friendly</p>
                </div>
              </motion.div>

              {/* Floating Card: Flexible Rentals */}
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{
                  duration: 4.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5,
                }}
                className="absolute bottom-10 right-0 z-20 flex items-center gap-3 rounded-2xl border border-white/10 bg-[#191919]/95 px-4 py-3 shadow-xl backdrop-blur-xl sm:right-0"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F4B400]/15 text-[#F4B400]">
                  <Clock3 size={21} />
                </div>

                <div>
                  <p className="text-sm font-bold text-white">
                    Your Schedule
                  </p>
                  <p className="text-xs text-gray-400">
                    Flexible rentals
                  </p>
                </div>
              </motion.div>

              {/* Floating Trust Indicator */}
              <motion.div
                animate={{ x: [0, 7, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.8,
                }}
                className="absolute bottom-2 left-4 z-20 flex items-center gap-2 rounded-xl border border-white/10 bg-[#191919]/95 px-3 py-2 shadow-lg backdrop-blur-xl"
              >
                <ShieldCheck size={17} className="text-[#F4B400]" />
                <span className="text-xs font-semibold text-gray-200">
                  Confidence in Every Rental
                </span>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;

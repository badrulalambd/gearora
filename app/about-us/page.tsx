

"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Handshake,
  Lightbulb,
  ShieldCheck,
  Target,
  Truck,
  Wrench,
  CircleDollarSign,
  Clock3,
  Users,
  PackageCheck,
} from "lucide-react";

const values = [
  {
    icon: ShieldCheck,
    title: "Trust & Transparency",
    description:
      "We believe every rental should be built on clear information, honest pricing, and confidence between renters and equipment owners.",
  },
  {
    icon: CircleDollarSign,
    title: "Affordable Access",
    description:
      "We make it easier to access the equipment you need without the financial burden of purchasing and maintaining everything yourself.",
  },
  {
    icon: Handshake,
    title: "Community First",
    description:
      "We connect people, encourage collaboration, and help equipment owners turn unused resources into valuable opportunities.",
  },
  {
    icon: Lightbulb,
    title: "Smart & Simple",
    description:
      "We focus on making equipment rental straightforward, convenient, and accessible through a user-friendly digital experience.",
  },
];

const benefits = [
  {
    icon: PackageCheck,
    title: "Find What You Need",
    description:
      "Discover equipment for your projects, business needs, events, and everyday tasks.",
  },
  {
    icon: CircleDollarSign,
    title: "Save More",
    description:
      "Rent instead of buying expensive equipment that you may only need temporarily.",
  },
  {
    icon: BadgeCheck,
    title: "Make Informed Choices",
    description:
      "Explore equipment descriptions, rental prices, conditions, and terms before making a decision.",
  },
  {
    icon: Clock3,
    title: "Rent on Your Terms",
    description:
      "Choose rental options that align with your needs and the equipment owner's rental terms.",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut" as const,
    },
  },
};

const AboutUsPage = () => {
  return (
    <main className="overflow-hidden bg-white dark:bg-[#0B0B0B]">
      {/* ================= HERO SECTION ================= */}
      <section className="relative overflow-hidden bg-[#0B0B0B] py-20 sm:py-28">
        {/* Background effects */}
        <div className="pointer-events-none absolute -left-40 top-0 h-96 w-96 rounded-full bg-[#F4B400]/10 blur-[130px]" />
        <div className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-[#F4B400]/10 blur-[130px]" />

        {/* Decorative grid */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.04]">
          <div
            className="h-full w-full"
            style={{
              backgroundImage:
                "linear-gradient(#F4B400 1px, transparent 1px), linear-gradient(90deg, #F4B400 1px, transparent 1px)",
              backgroundSize: "50px 50px",
            }}
          />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
            {/* Hero Content */}
            <motion.div
              initial={{ opacity: 0, x: -35 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >
              <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#F4B400]/30 bg-[#F4B400]/10 px-4 py-2 text-sm font-semibold text-[#F4B400]">
                <Wrench className="h-4 w-4" />
                About Gearora
              </span>

              <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
                Making Equipment Rental{" "}
                <span className="text-[#F4B400]">Simple & Accessible.</span>
              </h1>

              <p className="mt-6 max-w-xl text-base leading-8 text-gray-400 sm:text-lg">
                Gearora is built around a simple idea: you shouldn&apos;t have
                to own everything to get things done. We connect people
                with the equipment they need, making renting easier,
                smarter, and more convenient.
              </p>

              <div className="mt-9 flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/equipments"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#F4B400] px-6 py-3.5 text-sm font-bold text-[#0B0B0B] transition-all duration-300 hover:-translate-y-1 hover:bg-[#DFA300] hover:shadow-lg hover:shadow-[#F4B400]/20"
                >
                  Explore Equipment
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <Link
                  href="/contact-us"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 px-6 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:border-[#F4B400] hover:bg-[#F4B400]/10 hover:text-[#F4B400]"
                >
                  Get in Touch
                </Link>
              </div>

              {/* Highlights */}
              <div className="mt-10 flex flex-wrap gap-x-6 gap-y-4">
                {[
                  "Convenient Rentals",
                  "Flexible Options",
                  "Owner Connections",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#F4B400]/15">
                      <BadgeCheck className="h-3.5 w-3.5 text-[#F4B400]" />
                    </div>
                    <span className="text-xs font-medium text-gray-400 sm:text-sm">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Hero Visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, x: 30 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative mx-auto w-full max-w-lg"
            >
              <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#151515] p-5 sm:p-8">
                {/* Glow */}
                <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#F4B400]/15 blur-[100px]" />

                {/* Main visual */}
                <div className="relative flex min-h-[340px] flex-col items-center justify-center overflow-hidden rounded-2xl border border-[#F4B400]/10 bg-[#0B0B0B] p-6 sm:min-h-[400px]">
                  {/* Rings */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 35,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="absolute h-[300px] w-[300px] rounded-full border border-dashed border-[#F4B400]/20 sm:h-[350px] sm:w-[350px]"
                  />

                  <div className="absolute h-64 w-64 rounded-full border border-[#F4B400]/10 sm:h-72 sm:w-72" />

                  {/* Center */}
                  <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="relative z-10 flex h-32 w-32 flex-col items-center justify-center rounded-3xl border border-[#F4B400]/30 bg-[#F4B400] shadow-[0_0_60px_rgba(244,180,0,0.15)] sm:h-40 sm:w-40"
                  >
                    <Wrench className="h-12 w-12 text-[#0B0B0B] sm:h-14 sm:w-14" />
                    <span className="mt-3 text-xl font-extrabold text-[#0B0B0B]">
                      Gearora
                    </span>
                  </motion.div>

                  {/* Floating Cards */}
                  <motion.div
                    animate={{ y: [0, -6, 0] }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="absolute left-3 top-6 z-20 rounded-xl border border-white/10 bg-[#171717] p-3 shadow-xl sm:left-5 sm:top-10 sm:p-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F4B400]/15">
                        <PackageCheck className="h-5 w-5 text-[#F4B400]" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-white">
                          Find Equipment
                        </p>
                        <p className="text-xs text-gray-400">
                          Ready for your next project
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    animate={{ y: [0, 7, 0] }}
                    transition={{
                      duration: 3.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="absolute bottom-6 right-3 z-20 rounded-xl border border-white/10 bg-[#171717] p-3 shadow-xl sm:bottom-10 sm:right-5 sm:p-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-500/10">
                        <Handshake className="h-5 w-5 text-green-500" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-white">
                          Connect & Rent
                        </p>
                        <p className="text-xs text-gray-400">
                          Make things happen
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Bottom visual text */}
                <div className="relative mt-6 text-center">
                  <p className="text-sm font-medium text-gray-400">
                    <span className="text-[#F4B400]">Access more.</span>{" "}
                    Own less. Get things done.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================= OUR STORY ================= */}
      <section className="bg-[#F8F8F8] py-20 dark:bg-[#111111]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            {/* Story Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6 }}
            >
              <span className="mb-4 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.15em] text-[#B98200] dark:text-[#F4B400]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#F4B400]" />
                Our Story
              </span>

              <h2 className="text-3xl font-bold leading-tight text-[#0B0B0B] sm:text-4xl dark:text-white">
                Built Around a{" "}
                <span className="text-[#D99B00] dark:text-[#F4B400]">
                  Better Way
                </span>{" "}
                to Get Things Done.
              </h2>

              <div className="mt-6 space-y-5 text-sm leading-8 text-gray-600 sm:text-base dark:text-gray-400">
                <p>
                  Not every project requires owning expensive equipment.
                  Sometimes, the right tool for the right amount of time
                  is all you need to move forward.
                </p>

                <p>
                  We envisioned a platform where people could easily
                  discover equipment, connect with owners, and access
                  practical solutions without the unnecessary expense of
                  ownership.
                </p>

                <p>
                  That&apos;s the idea behind Gearora. We aim to make equipment
                  rental more convenient for people who need equipment and
                  more rewarding for those who have equipment to share.
                  By bringing both sides together, we want to make
                  resources more useful and opportunities more accessible.
                </p>
              </div>
            </motion.div>

            {/* Story Visual */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative"
            >
              <div className="relative overflow-hidden rounded-3xl bg-[#0B0B0B] p-6 sm:p-10">
                <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#F4B400]/15 blur-[100px]" />

                <div className="relative space-y-5">
                  {/* Item 1 */}
                  <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-[#151515] p-5">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[#F4B400]">
                      <Target className="h-7 w-7 text-[#0B0B0B]" />
                    </div>

                    <div>
                      <h3 className="font-bold text-white">
                        A Practical Solution
                      </h3>
                      <p className="mt-1 text-sm leading-6 text-gray-400">
                        Access equipment when it matters.
                      </p>
                    </div>
                  </div>

                  {/* Item 2 */}
                  <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-[#151515] p-5">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[#F4B400]/15">
                      <Users className="h-7 w-7 text-[#F4B400]" />
                    </div>

                    <div>
                      <h3 className="font-bold text-white">
                        A Connected Community
                      </h3>
                      <p className="mt-1 text-sm leading-6 text-gray-400">
                        Bring renters and owners together.
                      </p>
                    </div>
                  </div>

                  {/* Item 3 */}
                  <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-[#151515] p-5">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[#F4B400]/15">
                      <Truck className="h-7 w-7 text-[#F4B400]" />
                    </div>

                    <div>
                      <h3 className="font-bold text-white">
                        More Flexible Access
                      </h3>
                      <p className="mt-1 text-sm leading-6 text-gray-400">
                        Rent instead of investing in ownership.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================= MISSION & VISION ================= */}
      <section className="relative overflow-hidden bg-white py-20 dark:bg-[#0B0B0B]">
        <div className="pointer-events-none absolute left-1/2 top-0 h-80 w-80 -translate-x-1/2 rounded-full bg-[#F4B400]/10 blur-[120px]" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mx-auto mb-12 max-w-2xl text-center"
          >
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#F4B400]/30 bg-[#F4B400]/10 px-4 py-2 text-sm font-semibold text-[#A87900] dark:text-[#F4B400]">
              What Drives Us
            </span>

            <h2 className="text-3xl font-bold text-[#0B0B0B] sm:text-4xl dark:text-white">
              Our Mission & Vision
            </h2>

            <p className="mt-4 text-sm leading-7 text-gray-600 sm:text-base dark:text-gray-400">
              The principles behind what we&apos;re building and where we
              aspire to go.
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Mission */}
            <motion.div
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-[#F8F8F8] p-8 sm:p-10 dark:border-white/10 dark:bg-[#151515]"
            >
              <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#F4B400]/10 blur-[100px]" />

              <div className="relative">
                <div className="mb-7 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#F4B400] transition-transform duration-300 group-hover:rotate-6">
                  <Target className="h-8 w-8 text-[#0B0B0B]" />
                </div>

                <h3 className="text-2xl font-bold text-[#0B0B0B] dark:text-white">
                  Our Mission
                </h3>

                <p className="mt-5 text-sm leading-8 text-gray-600 sm:text-base dark:text-gray-400">
                  To make equipment rental accessible, convenient, and
                  practical by connecting people with the resources they
                  need and empowering equipment owners to make better use
                  of their assets.
                </p>
              </div>
            </motion.div>

            {/* Vision */}
            <motion.div
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-[#F8F8F8] p-8 sm:p-10 dark:border-white/10 dark:bg-[#151515]"
            >
              <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#F4B400]/10 blur-[100px]" />

              <div className="relative">
                <div className="mb-7 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#F4B400] transition-transform duration-300 group-hover:rotate-6">
                  <Lightbulb className="h-8 w-8 text-[#0B0B0B]" />
                </div>

                <h3 className="text-2xl font-bold text-[#0B0B0B] dark:text-white">
                  Our Vision
                </h3>

                <p className="mt-5 text-sm leading-8 text-gray-600 sm:text-base dark:text-gray-400">
                  To become a trusted destination for equipment rental,
                  where sharing resources helps people, businesses, and
                  communities accomplish more with less.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================= CORE VALUES ================= */}
      <section className="bg-[#F8F8F8] py-20 dark:bg-[#111111]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mx-auto mb-14 max-w-2xl text-center"
          >
            <span className="mb-4 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.15em] text-[#B98200] dark:text-[#F4B400]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#F4B400]" />
              Our Core Values
            </span>

            <h2 className="text-3xl font-bold text-[#0B0B0B] sm:text-4xl dark:text-white">
              What We Stand For
            </h2>

            <p className="mt-4 text-sm leading-7 text-gray-600 sm:text-base dark:text-gray-400">
              Every interaction and decision is guided by the values
              that shape the Gearora experience.
            </p>
          </motion.div>

          {/* Values Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {values.map((value) => {
              const Icon = value.icon;

              return (
                <motion.div
                  key={value.title}
                  variants={itemVariants}
                  className="group rounded-2xl border border-gray-200 bg-white p-7 transition-all duration-300 hover:-translate-y-2 hover:border-[#F4B400]/50 hover:shadow-xl hover:shadow-[#F4B400]/5 dark:border-white/10 dark:bg-[#151515]"
                >
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F4B400]/15 text-[#B98200] transition-all duration-300 group-hover:bg-[#F4B400] group-hover:text-[#0B0B0B] dark:text-[#F4B400]">
                    <Icon className="h-7 w-7" />
                  </div>

                  <h3 className="text-lg font-bold text-[#0B0B0B] dark:text-white">
                    {value.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-gray-600 dark:text-gray-400">
                    {value.description}
                  </p>

                  <div className="mt-6 h-1 w-10 rounded-full bg-[#F4B400] transition-all duration-300 group-hover:w-20" />
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ================= WHY GEARORA ================= */}
      <section className="relative overflow-hidden bg-[#0B0B0B] py-20">
        {/* Decoration */}
        <div className="pointer-events-none absolute -left-32 top-20 h-80 w-80 rounded-full bg-[#F4B400]/10 blur-[130px]" />
        <div className="pointer-events-none absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-[#F4B400]/10 blur-[130px]" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mx-auto mb-14 max-w-2xl text-center"
          >
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#F4B400]/30 bg-[#F4B400]/10 px-4 py-2 text-sm font-semibold text-[#F4B400]">
              Why Gearora?
            </span>

            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              More Than Just Equipment Rental
            </h2>

            <p className="mt-4 text-sm leading-7 text-gray-400 sm:text-base">
              We focus on the things that matter most when you need
              equipment: convenience, value, flexibility, and an easier
              way to get things done.
            </p>
          </motion.div>

          {/* Benefits */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {benefits.map((benefit) => {
              const Icon = benefit.icon;

              return (
                <motion.div
                  key={benefit.title}
                  variants={itemVariants}
                  className="group rounded-2xl border border-white/10 bg-[#151515] p-7 transition-all duration-300 hover:-translate-y-2 hover:border-[#F4B400]/50 hover:bg-[#191919]"
                >
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F4B400]/15 text-[#F4B400] transition-all duration-300 group-hover:bg-[#F4B400] group-hover:text-[#0B0B0B]">
                    <Icon className="h-7 w-7" />
                  </div>

                  <h3 className="text-lg font-bold text-white">
                    {benefit.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-gray-400">
                    {benefit.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="relative overflow-hidden bg-white py-20 dark:bg-[#0B0B0B]">
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#F4B400]/10 blur-[120px]" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-3xl bg-[#F4B400] p-8 sm:p-12 lg:p-16"
          >
            {/* CTA Decoration */}
            <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full border border-[#0B0B0B]/10" />
            <div className="pointer-events-none absolute -right-10 -top-10 h-52 w-52 rounded-full border border-[#0B0B0B]/10" />

            <div className="relative flex flex-col items-center justify-between gap-10 text-center lg:flex-row lg:text-left">
              <div className="max-w-2xl">
                <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#0B0B0B]/15 bg-[#0B0B0B]/5 px-4 py-2 text-sm font-bold text-[#0B0B0B]">
                  Let&apos;s Get Things Done
                </span>

                <h2 className="text-3xl font-extrabold leading-tight text-[#0B0B0B] sm:text-4xl lg:text-5xl">
                  Find the Equipment. Start Your Next Project.
                </h2>

                <p className="mt-5 text-sm leading-7 text-[#0B0B0B]/70 sm:text-base">
                  Explore available equipment or become an equipment
                  owner on Gearora. Your next opportunity starts here.
                </p>
              </div>

              <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row lg:shrink-0">
                <Link
                  href="/equipments"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0B0B0B] px-6 py-3.5 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[#1B1B1B] hover:shadow-lg"
                >
                  Browse Equipment
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <Link
                  href="/add-equipment"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#0B0B0B]/20 px-6 py-3.5 text-sm font-bold text-[#0B0B0B] transition-all duration-300 hover:-translate-y-1 hover:bg-[#0B0B0B]/5"
                >
                  List Your Equipment
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default AboutUsPage;

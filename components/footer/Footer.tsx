
"use client";

import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Camera,
  Mail,
  MapPin,
  Phone,
  X,
  Users,
  Wrench,
} from "lucide-react";
import { motion } from "framer-motion";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "Browse Equipment", href: "/equipments" },
    { name: "How It Works", href: "/how-it-works" },
    { name: "About Us", href: "/about-us" },
    { name: "Contact Us", href: "/contact-us" },
  ];

  const accountLinks = [
    { name: "My Bookings", href: "/#" },
    { name: "My Equipment", href: "/#" },
    { name: "List Your Equipment", href: "/#" },
    { name: "FAQs", href: "/#" },
  ];

  const socialLinks = [
    {
      name: "Facebook",
      href: "https://facebook.com",
      icon: Users,
    },
    {
      name: "Instagram",
      href: "https://instagram.com",
      icon: Camera,
    },
    {
      name: "LinkedIn",
      href: "https://linkedin.com",
      icon: Users,
    },
    {
      name: "Twitter",
      href: "https://twitter.com",
      icon: X,
    },
  ];

  return (
    <footer className="relative overflow-hidden bg-[#0B0B0B] text-white gap-12 border-t border-white/10">
      {/* Background Decorations */}
      <div className="pointer-events-none absolute -left-40 top-20 h-80 w-80 rounded-full bg-[#F4B400]/[0.07] blur-[120px]" />
      <div className="pointer-events-none absolute -right-40 bottom-20 h-96 w-96 rounded-full bg-[#F4B400]/[0.06] blur-[130px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Top CTA */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative -top-0 overflow-hidden rounded-2xl border border-[#F4B400]/20 bg-[#151515] p-7 sm:p-10 lg:flex lg:items-center lg:justify-between lg:gap-8"
        >
          <div className="pointer-events-none absolute -right-16 -top-24 h-64 w-64 rounded-full bg-[#F4B400]/10 blur-[90px]" />

          <div className="relative max-w-2xl">
            <span className="mb-3 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#F4B400]">
              <Wrench className="h-4 w-4" />
              Ready when you are
            </span>

            <h2 className="text-2xl font-bold leading-tight sm:text-3xl lg:text-4xl">
              Your Next Project Starts with the{" "}
              <span className="text-[#F4B400]">Right Equipment.</span>
            </h2>

            <p className="mt-3 text-sm leading-7 text-gray-400 sm:text-base">
              Find the equipment you need, rent with confidence, and get
              things done without the cost of ownership.
            </p>
          </div>

          <Link
            href="/equipments"
            className="relative mt-6 inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#F4B400] px-6 py-3.5 text-sm font-bold text-[#0B0B0B] transition-all duration-300 hover:-translate-y-1 hover:bg-[#DFA300] hover:shadow-lg hover:shadow-[#F4B400]/20 lg:mt-0"
          >
            Explore Equipment
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </motion.div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 gap-12 border-b border-white/10 pb-14 pt-8 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          {/* Brand Information */}
          <div className="lg:col-span-4">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#F4B400] text-[#0B0B0B]">
                <Wrench className="h-6 w-6" strokeWidth={2.5} />
              </div>

              <span className="text-2xl font-extrabold tracking-tight">
                Gear<span className="text-[#F4B400]">ora</span>
              </span>
            </Link>

            <p className="mt-6 max-w-sm text-sm leading-7 text-gray-400">
              Your trusted destination for convenient equipment rentals.
              Connect with equipment owners, find what you need, and make
              every project easier with Gearora.
            </p>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 lg:col-start-6">
            <h3 className="mb-6 text-base font-bold text-white">
              Quick Links
            </h3>

            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-2 text-sm text-gray-400 transition-colors duration-300 hover:text-[#F4B400]"
                  >
                    <span className="h-1 w-1 rounded-full bg-gray-600 transition-colors group-hover:bg-[#F4B400]" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Account Links */}
          <div className="lg:col-span-2">
            <h3 className="mb-6 text-base font-bold text-white">
              Your Account
            </h3>

            <ul className="space-y-4">
              {accountLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-2 text-sm text-gray-400 transition-colors duration-300 hover:text-[#F4B400]"
                  >
                    <span className="h-1 w-1 rounded-full bg-gray-600 transition-colors group-hover:bg-[#F4B400]" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div className="lg:col-span-2">
            <h3 className="mb-6 text-base font-bold text-white">
              Get in Touch
            </h3>

            <ul className="space-y-5">
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-[#F4B400]" />
                <a
                  href="mailto:support@gearora.com"
                  className="break-all text-sm text-gray-400 transition-colors hover:text-[#F4B400]"
                >
                  support@gearora.com
                </a>
              </li>

              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-[#F4B400]" />
                <a
                  href="tel:+8801000000000"
                  className="text-sm text-gray-400 transition-colors hover:text-[#F4B400]"
                >
                  +880 1000-000000
                </a>
              </li>

              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#F4B400]" />
                <span className="text-sm leading-6 text-gray-400">
                  Dhaka, Bangladesh
                </span>
              </li>
            </ul>

            <Link
              href="/contact-us"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#F4B400] transition-all hover:gap-3"
            >
              Contact Our Team
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="flex flex-col items-center justify-between gap-5 py-7 text-center sm:flex-row sm:text-left">
          <p className="text-xs leading-6 text-gray-500 sm:text-sm">
            © {currentYear}{" "}
            <span className="font-semibold text-white">Gearora</span>. All
            rights reserved.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
            <Link
              href="/privacy-policy"
              className="text-xs text-gray-500 transition-colors hover:text-[#F4B400] sm:text-sm"
            >
              Privacy Policy
            </Link>

            <Link
              href="/terms-and-conditions"
              className="text-xs text-gray-500 transition-colors hover:text-[#F4B400] sm:text-sm"
            >
              Terms & Conditions
            </Link>

            <span className="text-xs text-gray-500 sm:text-sm">
              Made for getting things done.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

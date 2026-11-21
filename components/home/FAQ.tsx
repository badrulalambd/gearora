
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  HelpCircle,
  MessageCircle,
  ShieldCheck,
} from "lucide-react";

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How can I rent equipment through Gearora?",
    answer:
      "Start by browsing the available equipment on Gearora. Select an item that meets your needs, review its rental price, condition, location, and rental terms, then follow the booking process. Once your booking is confirmed, coordinate the pickup or delivery details with the equipment owner.",
  },
  {
    question: "How are equipment rental prices determined?",
    answer:
      "Each equipment owner sets their own rental price based on the equipment type, condition, and rental duration. The listing displays the rental rate, such as hourly, daily, or weekly pricing, so you can compare options before booking.",
  },
  {
    question: "Can I choose how long I want to rent equipment?",
    answer:
      "Rental periods depend on the terms set by each equipment owner. Check the individual listing for available rental durations and contact the owner if you need clarification about a specific rental period.",
  },
  {
    question: "How do I know if equipment is available?",
    answer:
      "Check the equipment listing for its availability and booking information. If you need confirmation for a particular date, contact the equipment owner before completing your booking.",
  },
  {
    question: "How does payment work?",
    answer:
      "Follow the payment instructions provided during the booking process. Review the total rental cost and any additional charges or conditions before making a payment. Keep your payment confirmation for reference.",
  },
  {
    question: "Can I cancel an equipment booking?",
    answer:
      "Cancellation depends on the rental terms and the booking status. Review the cancellation conditions associated with your equipment listing or booking, and contact the owner or Gearora support if you need assistance.",
  },
  {
    question: "Can I list my own equipment for rent?",
    answer:
      "Yes! Gearora gives equipment owners an opportunity to list their available equipment. Create an account, add your equipment details, upload clear photos, set your rental price and terms, and submit your listing according to the platform's approval process.",
  },
  {
    question: "What happens if equipment is damaged during the rental?",
    answer:
      "You should inspect the equipment before accepting it and follow the owner's rental terms. If damage occurs during your rental period, inform the owner promptly and contact Gearora support if you need help resolving the issue.",
  },
];

const FAQ = () => {
  return (
    <section className="relative overflow-hidden bg-white py-20 dark:bg-[#0B0B0B]">
      {/* Background decorations */}
      <div className="pointer-events-none absolute -left-32 top-20 h-80 w-80 rounded-full bg-[#F4B400]/10 blur-[130px]" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-[#F4B400]/10 blur-[130px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-14 max-w-2xl text-center"
        >
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#F4B400]/30 bg-[#F4B400]/10 px-4 py-2 text-sm font-semibold text-[#A87900] dark:text-[#F4B400]">
            <HelpCircle className="h-4 w-4" />
            Frequently Asked Questions
          </span>

          <h2 className="text-3xl font-bold tracking-tight text-[#0B0B0B] sm:text-4xl lg:text-5xl dark:text-white">
            Got Questions?{" "}
            <span className="text-[#D99B00] dark:text-[#F4B400]">
              We&apos;ve Got Answers.
            </span>
          </h2>

          <p className="mt-5 text-base leading-7 text-gray-600 sm:text-lg dark:text-gray-400">
            Everything you need to know about renting and listing equipment
            on Gearora. Find quick answers to common questions below.
          </p>
        </motion.div>

        {/* FAQ Layout */}
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-start gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          {/* Left Contact Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-2xl bg-[#0B0B0B] p-7 text-white sm:p-9"
          >
            {/* Card decoration */}
            <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[#F4B400]/20 blur-[80px]" />

            <div className="relative">
              <div className="mb-7 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F4B400] text-[#0B0B0B]">
                <MessageCircle className="h-7 w-7" />
              </div>

              <h3 className="text-2xl font-bold leading-snug sm:text-3xl">
                Still Have Questions?
              </h3>

              <p className="mt-4 text-sm leading-7 text-gray-300">
                We&apos;re here to help. Whether you&apos;re renting equipment
                or listing your own, reach out to us and we&apos;ll help you
                find the information you need.
              </p>

              {/* Support Highlights */}
              <div className="my-8 space-y-4 border-t border-white/10 pt-6">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="h-5 w-5 shrink-0 text-[#F4B400]" />
                  <span className="text-sm text-gray-300">
                    Helpful rental guidance
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <MessageCircle className="h-5 w-5 shrink-0 text-[#F4B400]" />
                  <span className="text-sm text-gray-300">
                    Support for renters and owners
                  </span>
                </div>
              </div>

              {/* Contact Button */}
              <Link
                href="/contact-us"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#F4B400] px-6 py-3.5 text-sm font-bold text-[#0B0B0B] transition-all duration-300 hover:-translate-y-1 hover:bg-[#DFA300] hover:shadow-lg hover:shadow-[#F4B400]/20"
              >
                Contact Us
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>

          {/* FAQ Accordion */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="w-full"
          >
            <Accordion className="w-full space-y-3">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`faq-${index}`}
                  className="overflow-hidden rounded-xl border border-gray-200 bg-[#F8F8F8] px-5 transition-all duration-300 data-[open]:border-[#F4B400]/60 data-[open]:bg-[#FFF9E8] dark:border-white/10 dark:bg-[#151515] dark:data-[open]:bg-[#191919]"
                >
                  <AccordionTrigger className="flex w-full items-center justify-between gap-4 py-5 text-left text-sm font-semibold text-[#0B0B0B] transition-colors hover:text-[#B98200] sm:text-base dark:text-white dark:hover:text-[#F4B400]">
                    <span className="flex items-start gap-3">
                      <span className="mt-0.5 text-xs font-bold tracking-wider text-[#B98200] dark:text-[#F4B400]">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      {faq.question}
                    </span>
                  </AccordionTrigger>

                  <AccordionContent className="pb-5 pl-8 text-sm leading-7 text-gray-600 dark:text-gray-400">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;

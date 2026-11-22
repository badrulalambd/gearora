

"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  Mail,
  MapPin,
  Phone,
  Clock,
  MessageCircle,
  Send,
  Headphones,
  Sparkles,
} from "lucide-react";

const contactInfo = [
  {
    icon: Mail,
    title: "Email Us",
    description: "Have a question? Send us an email.",
    value: "support@gearora.com",
    href: "mailto:support@gearora.com",
  },
  {
    icon: Phone,
    title: "Call Us",
    description: "Talk to our team for assistance.",
    value: "+880 1000-000000",
    href: "tel:+8801000000000",
  },
  {
    icon: MapPin,
    title: "Our Location",
    description: "We're happy to connect with you.",
    value: "Dhaka, Bangladesh",
    href: null,
  },
  {
    icon: Clock,
    title: "Support Hours",
    description: "We're available to assist you.",
    value: "Saturday – Thursday",
    href: null,
  },
];

const ContactUsPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formMessage, setFormMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setFormMessage("");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsSubmitting(true);
    setFormMessage("");

    // Connect your contact form API here.
    // Example: await fetch("/api/contact", { method: "POST", ... })

    setIsSubmitting(false);
    setFormMessage(
      "The form is ready! Connect your contact API to start receiving messages."
    );
  };

  return (
    <main className="overflow-hidden bg-white dark:bg-[#0B0B0B]">
      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden bg-[#0B0B0B] py-20 sm:py-24">
        {/* Background effects */}
        <div className="pointer-events-none absolute -left-40 top-0 h-96 w-96 rounded-full bg-[#F4B400]/10 blur-[130px]" />
        <div className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-[#F4B400]/10 blur-[130px]" />

        {/* Grid pattern */}
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
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mx-auto max-w-3xl text-center"
          >
            <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#F4B400]/30 bg-[#F4B400]/10 px-4 py-2 text-sm font-semibold text-[#F4B400]">
              <MessageCircle className="h-4 w-4" />
              Contact Gearora
            </span>

            <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              Let&apos;s Talk About{" "}
              <span className="text-[#F4B400]">Your Next Project.</span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-gray-400 sm:text-lg">
              Need help finding equipment, managing a rental, or listing
              your own equipment? We&apos;re here to help you make things
              happen.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ================= CONTACT SECTION ================= */}
      <section className="relative overflow-hidden bg-[#F8F8F8] py-20 dark:bg-[#111111]">
        {/* Decoration */}
        <div className="pointer-events-none absolute -left-32 top-20 h-80 w-80 rounded-full bg-[#F4B400]/10 blur-[130px]" />
        <div className="pointer-events-none absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-[#F4B400]/10 blur-[130px]" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-start gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
            {/* ================= LEFT SIDE ================= */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              {/* Contact Information */}
              <div>
                <span className="mb-4 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.15em] text-[#B98200] dark:text-[#F4B400]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#F4B400]" />
                  Get in Touch
                </span>

                <h2 className="text-3xl font-bold leading-tight text-[#0B0B0B] sm:text-4xl dark:text-white">
                  We&apos;d Love to Hear from You.
                </h2>

                <p className="mt-5 text-sm leading-7 text-gray-600 sm:text-base dark:text-gray-400">
                  Whether you have a question, need assistance, or want
                  to learn more about Gearora, feel free to reach out.
                  Our team is ready to help.
                </p>
              </div>

              {/* Contact Info Cards */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {contactInfo.map((info) => {
                  const Icon = info.icon;

                  const content = (
                    <div className="group flex h-full items-start gap-4 rounded-2xl border border-gray-200 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#F4B400]/50 hover:shadow-lg hover:shadow-[#F4B400]/5 dark:border-white/10 dark:bg-[#151515]">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#F4B400]/15 text-[#B98200] transition-all duration-300 group-hover:bg-[#F4B400] group-hover:text-[#0B0B0B] dark:text-[#F4B400]">
                        <Icon className="h-5 w-5" />
                      </div>

                      <div className="min-w-0">
                        <h3 className="text-sm font-bold text-[#0B0B0B] dark:text-white">
                          {info.title}
                        </h3>

                        <p className="mt-1 text-xs leading-5 text-gray-500 dark:text-gray-400">
                          {info.description}
                        </p>

                        <p className="mt-3 break-words text-sm font-semibold text-[#B98200] dark:text-[#F4B400]">
                          {info.value}
                        </p>
                      </div>
                    </div>
                  );

                  return (
                    <div key={info.title}>
                      {info.href ? (
                        <a href={info.href}>{content}</a>
                      ) : (
                        content
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Support Card */}
              <div className="relative overflow-hidden rounded-2xl bg-[#0B0B0B] p-7 text-white sm:p-8">
                <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#F4B400]/15 blur-[100px]" />

                <div className="relative">
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F4B400] text-[#0B0B0B]">
                    <Headphones className="h-7 w-7" />
                  </div>

                  <h3 className="text-xl font-bold">
                    How Can We Help?
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-gray-400">
                    Our support team is here to help with your rental
                    questions, booking concerns, and equipment listings.
                  </p>

                  <Link
                    href="/#faqs"
                    className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#F4B400] transition-all duration-300 hover:gap-3"
                  >
                    Explore FAQs
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* ================= RIGHT SIDE FORM ================= */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative overflow-hidden rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8 lg:p-10 dark:border-white/10 dark:bg-[#151515]"
            >
              {/* Form decoration */}
              <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#F4B400]/10 blur-[100px]" />

              <div className="relative">
                {/* Form Heading */}
                <div className="mb-8">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#F4B400]/15 text-[#B98200] dark:text-[#F4B400]">
                    <Send className="h-5 w-5" />
                  </div>

                  <h2 className="text-2xl font-bold text-[#0B0B0B] sm:text-3xl dark:text-white">
                    Send Us a Message
                  </h2>

                  <p className="mt-3 text-sm leading-7 text-gray-600 dark:text-gray-400">
                    Fill out the form below and let us know how we can
                    assist you.
                  </p>
                </div>

                {/* Contact Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name & Email */}
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="name"
                        className="mb-2 block text-sm font-semibold text-[#0B0B0B] dark:text-white"
                      >
                        Full Name <span className="text-[#F4B400]">*</span>
                      </label>

                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                        required
                        autoComplete="name"
                        className="h-12 w-full rounded-xl border border-gray-200 bg-[#F8F8F8] px-4 text-sm text-[#0B0B0B] outline-none transition-all duration-300 placeholder:text-gray-400 focus:border-[#F4B400] focus:ring-2 focus:ring-[#F4B400]/20 dark:border-white/10 dark:bg-[#0B0B0B] dark:text-white dark:focus:border-[#F4B400]"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="mb-2 block text-sm font-semibold text-[#0B0B0B] dark:text-white"
                      >
                        Email Address{" "}
                        <span className="text-[#F4B400]">*</span>
                      </label>

                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        required
                        autoComplete="email"
                        className="h-12 w-full rounded-xl border border-gray-200 bg-[#F8F8F8] px-4 text-sm text-[#0B0B0B] outline-none transition-all duration-300 placeholder:text-gray-400 focus:border-[#F4B400] focus:ring-2 focus:ring-[#F4B400]/20 dark:border-white/10 dark:bg-[#0B0B0B] dark:text-white dark:focus:border-[#F4B400]"
                      />
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label
                      htmlFor="subject"
                      className="mb-2 block text-sm font-semibold text-[#0B0B0B] dark:text-white"
                    >
                      Subject <span className="text-[#F4B400]">*</span>
                    </label>

                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="What would you like to discuss?"
                      required
                      className="h-12 w-full rounded-xl border border-gray-200 bg-[#F8F8F8] px-4 text-sm text-[#0B0B0B] outline-none transition-all duration-300 placeholder:text-gray-400 focus:border-[#F4B400] focus:ring-2 focus:ring-[#F4B400]/20 dark:border-white/10 dark:bg-[#0B0B0B] dark:text-white dark:focus:border-[#F4B400]"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="message"
                      className="mb-2 block text-sm font-semibold text-[#0B0B0B] dark:text-white"
                    >
                      Your Message{" "}
                      <span className="text-[#F4B400]">*</span>
                    </label>

                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us more about how we can help..."
                      required
                      rows={6}
                      className="w-full resize-none rounded-xl border border-gray-200 bg-[#F8F8F8] px-4 py-3 text-sm text-[#0B0B0B] outline-none transition-all duration-300 placeholder:text-gray-400 focus:border-[#F4B400] focus:ring-2 focus:ring-[#F4B400]/20 dark:border-white/10 dark:bg-[#0B0B0B] dark:text-white dark:focus:border-[#F4B400]"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#F4B400] px-6 text-sm font-bold text-[#0B0B0B] transition-all duration-300 hover:-translate-y-1 hover:bg-[#DFA300] hover:shadow-lg hover:shadow-[#F4B400]/20 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
                  >
                    {isSubmitting ? (
                      "Sending..."
                    ) : (
                      <>
                        Send Message
                        <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </button>

                  {/* Form Status */}
                  {formMessage && (
                    <p
                      role="status"
                      className="rounded-xl border border-[#F4B400]/30 bg-[#F4B400]/10 p-4 text-sm leading-6 text-[#8A6500] dark:text-[#F4B400]"
                    >
                      {formMessage}
                    </p>
                  )}

                  <p className="text-center text-xs leading-6 text-gray-500 dark:text-gray-400">
                    By submitting this form, you agree to be contacted
                    regarding your inquiry.
                  </p>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================= BOTTOM CTA ================= */}
      <section className="bg-white pb-20 dark:bg-[#0B0B0B]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-2xl border border-[#F4B400]/20 bg-[#FFF9E8] p-7 sm:p-10 dark:bg-[#151515]"
          >
            <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-[#F4B400]/10 blur-[100px]" />

            <div className="relative flex flex-col items-center justify-between gap-6 text-center sm:flex-row sm:text-left">
              <div className="flex flex-col items-center gap-4 sm:flex-row">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#F4B400]/20 text-[#B98200] dark:text-[#F4B400]">
                  <Sparkles className="h-7 w-7" />
                </div>

                <div>
                  <h3 className="text-xl font-bold text-[#0B0B0B] dark:text-white">
                    Looking for the right equipment?
                  </h3>

                  <p className="mt-2 text-sm leading-7 text-gray-600 dark:text-gray-400">
                    Discover available equipment and find the right fit
                    for your next project.
                  </p>
                </div>
              </div>

              <Link
                href="/equipments"
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#F4B400] px-6 py-3.5 text-sm font-bold text-[#0B0B0B] transition-all duration-300 hover:-translate-y-1 hover:bg-[#DFA300] hover:shadow-lg"
              >
                Browse Equipment
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default ContactUsPage;

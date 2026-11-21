
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
    ArrowRight,
    CheckCircle2,
    ShieldCheck,
    Search,
    Star,
} from "lucide-react";

import { Button } from "@/components/ui/button";

const Banner = () => {
    return (
        // <section className="relative overflow-hidden bg-[#F8F8F8]">
        //     {/* Background Decorations */}
        //     <div className="absolute -left-32 top-20 h-72 w-72 rounded-full bg-[#F4B400]/10 blur-3xl" />
        //     <div className="absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-[#F4B400]/10 blur-3xl" />

        //     <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
        //         <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-12">

        //             {/* Left Content */}
        //             <motion.div
        //                 initial={{ opacity: 0, x: -40 }}
        //                 animate={{ opacity: 1, x: 0 }}
        //                 transition={{ duration: 0.8, ease: "easeOut" }}
        //                 className="relative z-10"
        //             >
        //                 {/* Badge */}
        //                 <motion.div
        //                     initial={{ opacity: 0, y: 15 }}
        //                     animate={{ opacity: 1, y: 0 }}
        //                     transition={{ delay: 0.2, duration: 0.6 }}
        //                     className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#F4B400]/30 bg-[#F4B400]/10 px-4 py-2"
        //                 >
        //                     <span className="h-2 w-2 animate-pulse rounded-full bg-[#F4B400]" />
        //                     <span className="text-xs font-bold uppercase tracking-[0.15em] text-[#8A6500]">
        //                         Your Trusted Rental Marketplace
        //                     </span>
        //                 </motion.div>

        //                 {/* Heading */}
        //                 <motion.h1
        //                     initial={{ opacity: 0, y: 25 }}
        //                     animate={{ opacity: 1, y: 0 }}
        //                     transition={{ delay: 0.3, duration: 0.7 }}
        //                     className="max-w-2xl font-[family-name:var(--font-space-grotesk)] text-4xl font-bold leading-[1.15] tracking-tight text-[#0B0B0B] sm:text-5xl lg:text-6xl"
        //                 >
        //                     The Right Equipment.
        //                     <span className="mt-2 block text-[#D99B00]">
        //                         Right When You Need It.
        //                     </span>
        //                 </motion.h1>

        //                 {/* Description */}
        //                 <motion.p
        //                     initial={{ opacity: 0, y: 20 }}
        //                     animate={{ opacity: 1, y: 0 }}
        //                     transition={{ delay: 0.45, duration: 0.7 }}
        //                     className="mt-7 max-w-xl text-base leading-8 text-gray-600 sm:text-lg"
        //                 >
        //                     Find, book, and rent quality equipment without
        //                     the hassle. Gearora connects you with trusted
        //                     equipment owners, making every project easier,
        //                     faster, and more affordable.
        //                 </motion.p>

        //                 {/* CTA Buttons */}
        //                 <motion.div
        //                     initial={{ opacity: 0, y: 20 }}
        //                     animate={{ opacity: 1, y: 0 }}
        //                     transition={{ delay: 0.6, duration: 0.7 }}
        //                     className="mt-9 flex flex-col gap-4 sm:flex-row"
        //                 >
        //                     {/* Explore Equipment */}
        //                     <Button
        //                         size="lg"
        //                         className="h-13 rounded-xl bg-[#F4B400] px-7 text-sm font-bold text-[#0B0B0B] shadow-lg shadow-[#F4B400]/20 transition-all duration-300 hover:-translate-y-1 hover:bg-[#E5A600] hover:shadow-xl"
        //                     >
        //                         <Link href="/equipments">
        //                             <span className="flex">Explore Equipment
        //                             <ArrowRight className="ml-2 h-4 w-4" />
        //                             </span>
        //                         </Link>
        //                     </Button>

        //                     {/* List Your Equipment */}
        //                     <Button
        //                         size="lg"
        //                         variant="outline"
        //                         className="h-13 rounded-xl border-2 border-[#E5A600] bg-transparent px-7 text-sm font-bold text-[#0B0B0B] transition-all duration-300 hover:-translate-y-1 hover:border-[#F4B400] hover:bg-[#F4B400] hover:text-[#0B0B0B]"
        //                     >
        //                         <Link href="/dashboard/owner/equipments/add-equipment">
        //                             List Your Equipment
        //                         </Link>
        //                     </Button>
        //                 </motion.div>

        //                 {/* Trust Indicators */}
        //                 <motion.div
        //                     initial={{ opacity: 0 }}
        //                     animate={{ opacity: 1 }}
        //                     transition={{ delay: 0.8, duration: 0.7 }}
        //                     className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4 border-t border-gray-200 pt-7"
        //                 >
        //                     <div className="flex items-center gap-2 text-sm font-medium text-gray-600">
        //                         <ShieldCheck className="h-5 w-5 text-[#D99B00]" />
        //                         Secure Rentals
        //                     </div>

        //                     <div className="flex items-center gap-2 text-sm font-medium text-gray-600">
        //                         <CheckCircle2 className="h-5 w-5 text-[#D99B00]" />
        //                         Easy Booking
        //                     </div>

        //                     <div className="flex items-center gap-2 text-sm font-medium text-gray-600">
        //                         <Star className="h-5 w-5 fill-[#F4B400] text-[#F4B400]" />
        //                         Trusted Platform
        //                     </div>
        //                 </motion.div>
        //             </motion.div>

        //             {/* Right Image */}
        //             <motion.div
        //                 initial={{ opacity: 0, scale: 0.92, x: 35 }}
        //                 animate={{ opacity: 1, scale: 1, x: 0 }}
        //                 transition={{
        //                     duration: 0.9,
        //                     delay: 0.25,
        //                     ease: "easeOut",
        //                 }}
        //                 className="relative mx-auto w-full max-w-xl lg:max-w-none"
        //             >
        //                 {/* Main Image */}
        //                 <div className="relative overflow-hidden rounded-[2rem] border-[6px] border-white shadow-2xl shadow-black/10">
        //                     <img
        //                         src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=90"
        //                         alt="Construction equipment at a professional construction site"
        //                         className="h-[380px] w-full object-cover sm:h-[480px] lg:h-[540px]"
        //                     />

        //                     {/* Image Overlay */}
        //                     <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        //                     {/* Image Bottom Content */}
        //                     <div className="absolute right-0 bottom-0 left-0 p-6 sm:p-8">
        //                         <p className="text-sm font-medium text-[#F4B400]">
        //                             BUILT FOR EVERY PROJECT
        //                         </p>

        //                         <h2 className="mt-2 text-2xl font-bold text-white sm:text-3xl">
        //                             Get the tools.
        //                             <br />
        //                             Get the job done.
        //                         </h2>
        //                     </div>
        //                 </div>

        //                 {/* Floating Card - Search */}
        //                 <motion.div
        //                     animate={{ y: [0, -10, 0] }}
        //                     transition={{
        //                         duration: 4,
        //                         repeat: Infinity,
        //                         ease: "easeInOut",
        //                     }}
        //                     className="absolute -left-5 top-12 hidden rounded-2xl border border-gray-100 bg-white p-4 shadow-xl sm:block lg:-left-10"
        //                 >
        //                     <div className="flex items-center gap-3">
        //                         <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#F4B400]/15">
        //                             <Search className="h-5 w-5 text-[#B98100]" />
        //                         </div>

        //                         <div>
        //                             <p className="text-xs text-gray-500">
        //                                 Your next project
        //                             </p>

        //                             <p className="text-sm font-bold text-[#0B0B0B]">
        //                                 Starts with Gearora
        //                             </p>
        //                         </div>
        //                     </div>
        //                 </motion.div>

        //                 {/* Floating Card - Trust */}
        //                 <motion.div
        //                     animate={{ y: [0, 10, 0] }}
        //                     transition={{
        //                         duration: 4.5,
        //                         repeat: Infinity,
        //                         ease: "easeInOut",
        //                     }}
        //                     className="absolute -right-3 -bottom-7 rounded-2xl border border-gray-100 bg-white p-4 shadow-xl sm:-right-5 sm:p-5"
        //                 >
        //                     <div className="flex items-center gap-3">
        //                         <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#F4B400]">
        //                             <ShieldCheck className="h-6 w-6 text-[#0B0B0B]" />
        //                         </div>

        //                         <div>
        //                             <p className="text-sm font-bold text-[#0B0B0B]">
        //                                 Rent with Confidence
        //                             </p>

        //                             <p className="mt-1 text-xs text-gray-500">
        //                                 Simple. Secure. Reliable.
        //                             </p>
        //                         </div>
        //                     </div>
        //                 </motion.div>

        //                 {/* Decorative Yellow Shape */}
        //                 <div className="absolute -top-5 -right-5 -z-10 h-28 w-28 rounded-3xl bg-[#F4B400] sm:-top-7 sm:-right-7" />
        //             </motion.div>

        //         </div>
        //     </div>
        // </section>

        <section className="relative overflow-hidden bg-[#F8F8F8] dark:bg-[#0B0B0B]">
            {/* Background Decorations */}
            <div className="absolute -left-32 top-20 h-72 w-72 rounded-full bg-[#F4B400]/10 blur-3xl" />
            <div className="absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-[#F4B400]/10 blur-3xl" />

            <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
                <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-12">

                    {/* Left Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="relative z-10"
                    >
                        {/* Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.6 }}
                            className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#F4B400]/30 bg-[#F4B400]/10 px-4 py-2"
                        >
                            <span className="h-2 w-2 animate-pulse rounded-full bg-[#F4B400]" />
                            <span className="text-xs font-bold uppercase tracking-[0.15em] text-[#8A6500] dark:text-[#F4B400]">
                                Your Trusted Rental Marketplace
                            </span>
                        </motion.div>

                        {/* Heading */}
                        <motion.h1
                            initial={{ opacity: 0, y: 25 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.7 }}
                            className="max-w-2xl font-[family-name:var(--font-space-grotesk)] text-4xl font-bold leading-[1.15] tracking-tight text-[#0B0B0B] dark:text-white sm:text-5xl lg:text-6xl"
                        >
                            The Right Equipment.
                            <span className="mt-2 block text-[#D99B00] dark:text-[#F4B400]">
                                Right When You Need It.
                            </span>
                        </motion.h1>

                        {/* Description */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.45, duration: 0.7 }}
                            className="mt-7 max-w-xl text-base leading-8 text-gray-600 dark:text-gray-400 sm:text-lg"
                        >
                            Find, book, and rent quality equipment without
                            the hassle. Gearora connects you with trusted
                            equipment owners, making every project easier,
                            faster, and more affordable.
                        </motion.p>

                        {/* CTA Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6, duration: 0.7 }}
                            className="mt-9 flex flex-col gap-4 sm:flex-row"
                        >
                            {/* Explore Equipment */}
                            <Button
                                size="lg"
                                className="h-13 rounded-xl bg-[#F4B400] px-7 text-sm font-bold text-[#0B0B0B] shadow-lg shadow-[#F4B400]/20 transition-all duration-300 hover:-translate-y-1 hover:bg-[#E5A600] hover:shadow-xl"
                            >
                                <Link href="/equipments">
                                    <span className="flex">
                                        Explore Equipment
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </span>
                                </Link>
                            </Button>

                            {/* List Your Equipment */}
                            <Button
                                size="lg"
                                variant="outline"
                                className="h-13 rounded-xl border-2 border-[#E5A600] bg-transparent px-7 text-sm font-bold text-[#0B0B0B] transition-all duration-300 hover:-translate-y-1 hover:border-[#F4B400] hover:bg-[#F4B400] hover:text-[#0B0B0B] dark:border-[#F4B400]/70 dark:text-white dark:hover:border-[#F4B400] dark:hover:bg-[#F4B400] dark:hover:text-[#0B0B0B]"
                            >
                                <Link href="/dashboard/owner/equipments/add-equipment">
                                    List Your Equipment
                                </Link>
                            </Button>
                        </motion.div>

                        {/* Trust Indicators */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8, duration: 0.7 }}
                            className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4 border-t border-gray-200 dark:border-gray-800 pt-7"
                        >
                            <div className="flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                                <ShieldCheck className="h-5 w-5 text-[#D99B00] dark:text-[#F4B400]" />
                                Secure Rentals
                            </div>

                            <div className="flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                                <CheckCircle2 className="h-5 w-5 text-[#D99B00] dark:text-[#F4B400]" />
                                Easy Booking
                            </div>

                            <div className="flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                                <Star className="h-5 w-5 fill-[#F4B400] text-[#F4B400]" />
                                Trusted Platform
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Right Image */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.92, x: 35 }}
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        transition={{
                            duration: 0.9,
                            delay: 0.25,
                            ease: "easeOut",
                        }}
                        className="relative mx-auto w-full max-w-xl lg:max-w-none"
                    >
                        {/* Main Image */}
                        <div className="relative overflow-hidden rounded-[2rem] border-[6px] border-white dark:border-[#1F1F1F] shadow-2xl shadow-black/10 dark:shadow-black/40">
                            <img
                                src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=90"
                                alt="Construction equipment at a professional construction site"
                                className="h-[380px] w-full object-cover sm:h-[480px] lg:h-[540px]"
                            />

                            {/* Image Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                            {/* Image Bottom Content */}
                            <div className="absolute right-0 bottom-0 left-0 p-6 sm:p-8">
                                <p className="text-sm font-medium text-[#F4B400]">
                                    BUILT FOR EVERY PROJECT
                                </p>

                                <h2 className="mt-2 text-2xl font-bold text-white sm:text-3xl">
                                    Get the tools.
                                    <br />
                                    Get the job done.
                                </h2>
                            </div>
                        </div>

                        {/* Floating Card - Search */}
                        <motion.div
                            animate={{ y: [0, -10, 0] }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                            className="absolute -left-5 top-12 hidden rounded-2xl border border-gray-100 bg-white p-4 shadow-xl dark:border-[#2A2A2A] dark:bg-[#171717] sm:block lg:-left-10"
                        >
                            <div className="flex items-center gap-3">
                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#F4B400]/15">
                                    <Search className="h-5 w-5 text-[#B98100] dark:text-[#F4B400]" />
                                </div>

                                <div>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                        Your next project
                                    </p>

                                    <p className="text-sm font-bold text-[#0B0B0B] dark:text-white">
                                        Starts with Gearora
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Floating Card - Trust */}
                        <motion.div
                            animate={{ y: [0, 10, 0] }}
                            transition={{
                                duration: 4.5,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                            className="absolute -right-3 -bottom-7 rounded-2xl border border-gray-100 bg-white p-4 shadow-xl dark:border-[#2A2A2A] dark:bg-[#171717] sm:-right-5 sm:p-5"
                        >
                            <div className="flex items-center gap-3">
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#F4B400]">
                                    <ShieldCheck className="h-6 w-6 text-[#0B0B0B]" />
                                </div>

                                <div>
                                    <p className="text-sm font-bold text-[#0B0B0B] dark:text-white">
                                        Rent with Confidence
                                    </p>

                                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                        Simple. Secure. Reliable.
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Decorative Yellow Shape */}
                        <div className="absolute -top-5 -right-5 -z-10 h-28 w-28 rounded-3xl bg-[#F4B400] sm:-top-7 sm:-right-7" />
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default Banner;

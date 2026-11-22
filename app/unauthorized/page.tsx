
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
    ShieldAlert,
    ArrowLeft,
    Home,
    LockKeyhole,
    HardHat,
} from "lucide-react";

const UnauthorizedPage = () => {
    return (
        <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0B0B0B] px-5 py-16">

            {/* Background Decorations */}
            <div className="pointer-events-none absolute -left-40 top-10 h-96 w-96 rounded-full bg-[#F4B400]/10 blur-[120px]" />
            <div className="pointer-events-none absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-[#F4B400]/10 blur-[120px]" />

            {/* Main Content */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="relative z-10 mx-auto w-full max-w-2xl text-center"
            >
                {/* Animated Icon */}
                <motion.div
                    initial={{ scale: 0.7, rotate: -15 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{
                        duration: 0.7,
                        delay: 0.2,
                        type: "spring",
                        stiffness: 150,
                    }}
                    className="relative mx-auto mb-9 flex h-28 w-28 items-center justify-center rounded-[2rem] border border-[#F4B400]/30 bg-[#F4B400]/10 shadow-[0_0_60px_rgba(244,180,0,0.08)]"
                >
                    <ShieldAlert className="h-14 w-14 text-[#F4B400]" strokeWidth={1.5} />

                    <motion.span
                        animate={{ scale: [1, 1.15, 1], opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2.5, repeat: Infinity }}
                        className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full border-4 border-[#0B0B0B] bg-red-500"
                    >
                        <LockKeyhole className="h-3.5 w-3.5 text-white" />
                    </motion.span>
                </motion.div>

                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35, duration: 0.5 }}
                    className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#F4B400]/25 bg-[#F4B400]/10 px-4 py-2"
                >
                    <span className="h-2 w-2 rounded-full bg-[#F4B400]" />
                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#F4B400]">
                        Access Restricted · Error 403
                    </span>
                </motion.div>

                {/* Heading */}
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.45, duration: 0.6 }}
                    className="text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl"
                >
                    This Area Is
                    <span className="mt-2 block text-[#F4B400]">
                        Off Limits!
                    </span>
                </motion.h1>

                {/* Description */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.55, duration: 0.6 }}
                    className="mx-auto mt-6 max-w-lg text-sm leading-7 text-white/55 sm:text-base"
                >
                    Looks like you don&apos;t have permission to access this
                    page. Some equipment and rental management areas are
                    reserved for authorized users. Let&apos;s get you back
                    on track!
                </motion.p>

                {/* Home Button */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.65, duration: 0.6 }}
                    className="mt-9 flex justify-center"
                >
                    <Link
                        href="/"
                        className="group inline-flex h-12 items-center justify-center gap-2.5 rounded-xl bg-[#F4B400] px-7 text-sm font-bold text-[#0B0B0B] shadow-lg shadow-[#F4B400]/10 transition-all duration-300 hover:-translate-y-1 hover:bg-[#E5A600] hover:shadow-xl hover:shadow-[#F4B400]/20"
                    >
                        <Home className="h-4 w-4" />
                        Back to Homepage
                        <ArrowLeft className="h-4 w-4 rotate-180 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                </motion.div>

                {/* Bottom Branding */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.9, duration: 0.7 }}
                    className="mt-16 flex items-center justify-center gap-2 border-t border-white/10 pt-7"
                >
                    <HardHat className="h-5 w-5 text-[#F4B400]" />
                    <span className="text-sm font-bold tracking-wide text-white/70">
                        GEARORA
                    </span>
                    <span className="mx-1 text-white/20">|</span>
                    <span className="text-xs text-white/35">
                        Gear Up. Get More Done.
                    </span>
                </motion.div>
            </motion.div>
        </main>
    );
};

export default UnauthorizedPage;

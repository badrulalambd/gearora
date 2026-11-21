// import { getFeaturedEquipment } from "@/lib/api/equipment";
// import EquipmentCard from "../equipment/EquipmentCard";
// import { IEquipmentType } from "@/type/type";

// const FeaturedEquipment = async () => {
//     let featuredEquipmentData: IEquipmentType[] = []
//     featuredEquipmentData = await getFeaturedEquipment();

//     return (
//         <div className="p-5 md:p-10 mx-auto w-full max-w-7xl space-y-6">
//             <div>Featured Equipment</div>
//             <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
//                 {
//                     featuredEquipmentData.map((equipment) => <EquipmentCard 
//                     key={equipment._id}
//                     equipment={equipment}
//                     />)
//                 }
//             </div>
//         </div>
//     );
// };

// export default FeaturedEquipment;

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
    ArrowRight,
    Sparkles,
    PackageSearch,
    RefreshCw,
} from "lucide-react";

import EquipmentCard from "../equipment/EquipmentCard";
import { getFeaturedEquipment } from "@/lib/api/equipment";
import { IEquipmentType } from "@/type/type";

const FeaturedEquipment = () => {
    const [featuredEquipmentData, setFeaturedEquipmentData] = useState<
        IEquipmentType[]
    >([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchFeaturedEquipment = async () => {
            try {
                const data = await getFeaturedEquipment();
                setFeaturedEquipmentData(data);
            } catch (err) {
                console.error("Failed to fetch featured equipment:", err);
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        fetchFeaturedEquipment();
    }, []);

    // Animation variants
    const containerVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.15,
            },
        },
    };

    const itemVariants = {
        hidden: {
            opacity: 0,
            y: 35,
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut" as const,
            },
        },
    };

    return (
        <section className="relative overflow-hidden bg-background py-16 md:py-24">

            {/* Background Decorations */}
            <div className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-[#F4B400]/10 blur-3xl" />
            <div className="pointer-events-none absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-[#F4B400]/10 blur-3xl" />

            <div className="relative mx-auto w-full max-w-7xl space-y-12 px-5 sm:px-8 lg:px-10">

                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className="flex flex-col gap-7 md:flex-row md:items-end md:justify-between"
                >
                    {/* Heading */}
                    <div className="max-w-2xl space-y-5">

                        {/* Badge */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                            className="inline-flex items-center gap-2 rounded-full border border-[#F4B400]/30 bg-[#F4B400]/10 px-4 py-2"
                        >
                            <Sparkles className="h-4 w-4 text-[#B98100] dark:text-[#F4B400]" />

                            <span className="text-xs font-bold uppercase tracking-[0.15em] text-[#8A6500] dark:text-[#F4B400]">
                                Our Featured Equipment
                            </span>
                        </motion.div>

                        {/* Title */}
                        <h2 className="font-(family-name:--font-space-grotesk) text-3xl font-bold leading-[1.2] tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                            Find the Right Gear.
                        </h2>

                        {/* Description */}
                        <p className="max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">
                            Discover our latest equipment listings and find
                            everything you need for your next project.
                            Rent smarter, work better, and get things done
                            with Gearora.
                        </p>
                    </div>

                    {/* Explore Button */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                    >
                        <Link
                            href="/equipments"
                            className="group inline-flex h-12 items-center justify-center gap-2 rounded-xl border-2 border-[#F4B400] bg-transparent px-6 text-sm font-bold text-foreground transition-all duration-300 hover:-translate-y-1 hover:bg-[#F4B400] hover:text-[#0B0B0B] hover:shadow-lg hover:shadow-[#F4B400]/20"
                        >
                            Explore All Equipment

                            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </Link>
                    </motion.div>
                </motion.div>

                {/* Equipment Grid */}
                {loading ? (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                        {Array.from({ length: 6 }).map((_, index) => (
                            <div
                                key={index}
                                className="animate-pulse space-y-4 rounded-2xl border border-border bg-card p-4"
                            >
                                <div className="h-52 rounded-xl bg-muted" />
                                <div className="h-5 w-3/4 rounded bg-muted" />
                                <div className="h-4 w-1/2 rounded bg-muted" />
                                <div className="h-10 rounded-lg bg-muted" />
                            </div>
                        ))}
                    </div>
                ) : error ? (
                    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card/50 px-6 py-16 text-center">
                        <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-red-500/10">
                            <RefreshCw className="h-8 w-8 text-red-500" />
                        </div>

                        <h3 className="text-xl font-bold text-foreground">
                            Something Went Wrong
                        </h3>

                        <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
                            We couldn&apos;t load the featured equipment.
                            Please refresh the page and try again.
                        </p>
                    </div>
                ) : featuredEquipmentData.length > 0 ? (
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.1 }}
                        className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3"
                    >
                        {featuredEquipmentData.map((equipment) => (
                            <motion.div
                                key={equipment._id}
                                variants={itemVariants}
                                className="h-full"
                            >
                                <EquipmentCard equipment={equipment} />
                            </motion.div>
                        ))}
                    </motion.div>
                ) : (
                    /* Empty State */
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card/50 px-6 py-16 text-center"
                    >
                        <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#F4B400]/15">
                            <PackageSearch className="h-8 w-8 text-[#B98100] dark:text-[#F4B400]" />
                        </div>

                        <h3 className="text-xl font-bold text-foreground">
                            No Equipment Available Yet
                        </h3>

                        <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
                            We&apos;re preparing some great equipment listings.
                            Check back soon to find the perfect gear for your project.
                        </p>

                        <Link
                            href="/equipments"
                            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#F4B400] px-5 py-3 text-sm font-bold text-[#0B0B0B] transition-all duration-300 hover:-translate-y-1 hover:bg-[#E5A600] hover:shadow-lg"
                        >
                            Browse Equipment
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                    </motion.div>
                )}

            </div>
        </section>
    );
};

export default FeaturedEquipment;
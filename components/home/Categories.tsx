
"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
    ArrowUpRight,
    Boxes,
    Package,
    Sparkles,
} from "lucide-react";

import { getPopularEquipmentCategories } from "@/lib/api/equipment";
import Link from "next/link";

interface IEquipmentCategory {
    category: string;
    totalEquipment: number;
}

const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.08,
        },
    },
};

const cardVariants = {
    hidden: {
        opacity: 0,
        y: 25,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: "easeOut" as const,
        },
    },
};

const Categories = () => {
    const [equipmentCategories, setEquipmentCategories] = useState<
        IEquipmentCategory[]
    >([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const categories = await getPopularEquipmentCategories();
                setEquipmentCategories(categories);
            } catch (error) {
                console.error("Failed to fetch popular categories:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    return (
        <section className="relative overflow-hidden bg-[#F3F4F6] py-20 dark:bg-[#101010]">
            {/* Background Decorations */}
            <div className="pointer-events-none absolute -left-32 top-10 h-72 w-72 rounded-full bg-[#F4B400]/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-32 right-0 h-80 w-80 rounded-full bg-[#F97316]/5 blur-3xl" />

            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Section Heading */}
                <motion.div
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6 }}
                    className="mx-auto mb-12 max-w-2xl text-center"
                >
                    <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#F4B400]/30 bg-[#F4B400]/10 px-4 py-2 text-sm font-semibold text-[#9A7000] dark:text-[#F4B400]">
                        <Sparkles size={16} />
                        Explore by category
                    </div>

                    <h2 className="text-3xl font-bold tracking-tight text-[#0B0B0B] sm:text-4xl lg:text-5xl dark:text-white">
                        Find Exactly What You Need
                        <span className="mt-2 block text-[#D99B00] dark:text-[#F4B400]">
                            Explore Popular Categories
                        </span>
                    </h2>

                    <p className="mt-5 text-base leading-7 text-gray-600 sm:text-lg dark:text-gray-400">
                        From everyday essentials to professional equipment, discover
                        the right gear for every project, passion, and purpose.
                    </p>
                </motion.div>

                {/* Categories Grid */}
                {loading ? (
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {Array.from({ length: 8 }).map((_, index) => (
                            <div
                                key={index}
                                className="h-36 animate-pulse rounded-2xl border border-gray-200 bg-white dark:border-[#292929] dark:bg-[#191919]"
                            />
                        ))}
                    </div>
                ) : equipmentCategories.length > 0 ? (
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.15 }}
                        className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3"
                    >
                        {equipmentCategories.map((item, index) => (
                            <motion.div
                                key={item.category}
                                variants={cardVariants}
                                whileHover={{ y: -7 }}
                                className="group relative overflow-hidden rounded-2xl border border-gray-200/80 bg-white p-6 shadow-sm transition-all duration-300 hover:border-[#F4B400]/60 hover:shadow-xl hover:shadow-[#F4B400]/10 dark:border-[#292929] dark:bg-[#191919] dark:hover:border-[#F4B400]/50"
                            >
                                {/* Decorative Number */}
                                <span className="absolute -right-2 -top-5 text-7xl font-black text-gray-100 transition-colors duration-300 group-hover:text-[#F4B400]/10 dark:text-white/[0.035] dark:group-hover:text-[#F4B400]/10">
                                    {String(index + 1).padStart(2, "0")}
                                </span>

                                <div className="relative flex items-start justify-between">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#F4B400]/15 text-[#A87900] transition-colors duration-300 group-hover:bg-[#F4B400] group-hover:text-[#0B0B0B] dark:text-[#F4B400] dark:group-hover:text-[#0B0B0B]">
                                        <Boxes size={23} strokeWidth={1.8} />
                                    </div>

                                    <Link href={`/equipments`}>
                                        <ArrowUpRight
                                            size={20}
                                            className="text-gray-400 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[#D99B00] dark:text-gray-500 dark:group-hover:text-[#F4B400]"
                                        />
                                    </Link>
                                </div>

                                <div className="relative mt-6">
                                    <h3 className="text-lg font-bold text-[#0B0B0B] transition-colors duration-300 group-hover:text-[#B98100] dark:text-white dark:group-hover:text-[#F4B400]">
                                        {item.category}
                                    </h3>

                                    <div className="mt-3 flex items-center gap-2">
                                        <Package
                                            size={15}
                                            className="text-gray-500 dark:text-gray-400"
                                        />
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            <span className="font-semibold text-[#0B0B0B] dark:text-gray-200">
                                                {item.totalEquipment}
                                            </span>{" "}
                                            {item.totalEquipment === 1 ? "Equipment" : "Equipment Items"}
                                        </p>
                                    </div>
                                </div>

                                {/* Bottom Accent */}
                                <div className="absolute bottom-0 left-0 h-1 w-0 bg-[#F4B400] transition-all duration-300 group-hover:w-full" />
                            </motion.div>
                        ))}
                    </motion.div>
                ) : (
                    <div className="rounded-2xl border border-dashed border-gray-300 py-14 text-center dark:border-gray-700">
                        <Boxes
                            size={36}
                            className="mx-auto mb-3 text-gray-400 dark:text-gray-500"
                        />
                        <h3 className="text-lg font-semibold text-[#0B0B0B] dark:text-white">
                            No categories available yet
                        </h3>
                        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                            Popular equipment categories will appear here soon.
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Categories;

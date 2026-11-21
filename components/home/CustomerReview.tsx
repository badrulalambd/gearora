
"use client";

import { motion } from "framer-motion";
import {
    ArrowRight,
    ArrowUpRight,
    Quote,
    Sparkles,
    Star,
    Users,
} from "lucide-react";

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";

import { Card, CardContent } from "@/components/ui/card";

const reviews = [
    {
        id: 1,
        name: "Sarah Ahmed",
        role: "Small Business Owner",
        initials: "SA",
        rating: 5,
        date: "October 2026",
        review:
            "Gearora made finding equipment for my small business incredibly easy. The rental process was smooth, the pricing was reasonable, and the equipment arrived in excellent condition.",
        color: "bg-purple-500/15 text-purple-400",
    },
    {
        id: 2,
        name: "Tanvir Hasan",
        role: "Construction Manager",
        initials: "TH",
        rating: 5,
        date: "September 2026",
        review:
            "I needed construction equipment for a short-term project and Gearora helped me find exactly what I was looking for. It saved us both time and money. Definitely a convenient platform.",
        color: "bg-blue-500/15 text-blue-400",
    },
    {
        id: 3,
        name: "Nusrat Jahan",
        role: "Event Organizer",
        initials: "NJ",
        rating: 5,
        date: "September 2026",
        review:
            "Finding reliable equipment for events used to be stressful. With Gearora, I can explore options, compare rental prices, and arrange everything much more easily.",
        color: "bg-pink-500/15 text-pink-400",
    },
    {
        id: 4,
        name: "Rakib Hossain",
        role: "Freelance Photographer",
        initials: "RH",
        rating: 4,
        date: "August 2026",
        review:
            "I rented photography equipment for a client project without having to invest in expensive gear. The experience was straightforward, and having flexible rental periods was a big plus.",
        color: "bg-green-500/15 text-green-400",
    },
    {
        id: 5,
        name: "Farhana Rahman",
        role: "Interior Designer",
        initials: "FR",
        rating: 5,
        date: "August 2026",
        review:
            "What I like most about Gearora is the flexibility. I can find the equipment I need for specific projects without worrying about long-term ownership costs. A really useful service!",
        color: "bg-orange-500/15 text-orange-400",
    },
    {
        id: 6,
        name: "Imran Kabir",
        role: "Independent Contractor",
        initials: "IK",
        rating: 5,
        date: "July 2026",
        review:
            "A great solution for anyone who needs equipment occasionally. The platform makes discovering rental options simple, and the overall experience feels convenient and well organized.",
        color: "bg-cyan-500/15 text-cyan-400",
    },
];

const CustomerReview = () => {
    return (
        <section className="relative overflow-hidden bg-[#F4B400]/10 py-20 dark:bg-[#101010]">
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
                        Customer Stories
                    </div>

                    <h2 className="text-3xl font-bold tracking-tight text-[#0B0B0B] sm:text-4xl lg:text-5xl dark:text-white">
                        Trusted by People
                        <span className="mt-2 block text-[#D99B00] dark:text-[#F4B400]">
                            Who Get Things Done
                        </span>
                    </h2>

                    <p className="mt-5 text-base leading-7 text-gray-600 sm:text-lg dark:text-gray-400">
                        Discover how Gearora makes equipment rental simpler,
                        more affordable, and more convenient for everyday
                        projects and professional needs.
                    </p>
                </motion.div>

                {/* Reviews Slider */}
                <div className="relative px-1 sm:px-3">
                    <Carousel
                        opts={{
                            align: "start",
                            loop: true,
                        }}
                        className="w-full"
                    >
                        <CarouselContent className="-ml-5">
                            {reviews.map((review, index) => (
                                <CarouselItem
                                    key={review.id}
                                    className="pl-5 md:basis-1/2 xl:basis-1/3"
                                >
                                    <motion.div
                                        initial={{ opacity: 0, y: 25 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, amount: 0.2 }}
                                        transition={{
                                            duration: 0.5,
                                            delay: index * 0.08,
                                        }}
                                        className="h-full"
                                    >
                                        <Card className="group relative h-full overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#F4B400]/60 hover:shadow-xl hover:shadow-[#F4B400]/10 dark:border-[#292929] dark:bg-[#191919] dark:hover:border-[#F4B400]/50">
                                            <CardContent className="flex h-full flex-col p-6 sm:p-7">
                                                {/* Quote Icon */}
                                                <div className="mb-6 flex items-center justify-between">
                                                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#F4B400]/15 text-[#B98100] dark:text-[#F4B400]">
                                                        <Quote
                                                            size={23}
                                                            fill="currentColor"
                                                            strokeWidth={1.5}
                                                        />
                                                    </div>

                                                    <div className="flex items-center gap-0.5 rounded-full bg-[#F4B400]/10 px-3 py-1.5 text-[#B98100] dark:text-[#F4B400]">
                                                        {Array.from({
                                                            length: review.rating,
                                                        }).map((_, i) => (
                                                            <Star
                                                                key={i}
                                                                size={14}
                                                                fill="currentColor"
                                                            />
                                                        ))}
                                                    </div>
                                                </div>

                                                {/* Review Text */}
                                                <p className="flex-1 text-[15px] leading-7 text-gray-600 dark:text-gray-300">
                                                    &ldquo;{review.review}&rdquo;
                                                </p>

                                                {/* Bottom Accent */}
                                                <div className="my-6 h-px w-full bg-gray-100 dark:bg-[#303030]" />

                                                {/* Customer Information */}
                                                <div className="flex items-center justify-between gap-3">
                                                    <div className="flex min-w-0 items-center gap-3">
                                                        <div
                                                            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-sm font-bold ${review.color}`}
                                                        >
                                                            {review.initials}
                                                        </div>

                                                        <div className="min-w-0">
                                                            <h3 className="truncate text-sm font-bold text-[#0B0B0B] dark:text-white">
                                                                {review.name}
                                                            </h3>
                                                            <p className="mt-1 truncate text-xs text-gray-500 dark:text-gray-400">
                                                                {review.role}
                                                            </p>
                                                        </div>
                                                    </div>

                                                    <div className="hidden text-right sm:block">
                                                        <p className="text-[11px] text-gray-400">
                                                            Reviewed
                                                        </p>
                                                        <p className="mt-1 text-xs font-medium text-gray-500 dark:text-gray-400">
                                                            {review.date}
                                                        </p>
                                                    </div>
                                                </div>

                                                {/* Hover Accent */}
                                                <div className="absolute bottom-0 left-0 h-1 w-0 bg-[#F4B400] transition-all duration-500 group-hover:w-full" />
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>

                        {/* Slider Controls */}
                        <div className="mt-8 flex items-center justify-center gap-3">
                            <CarouselPrevious className="static h-11 w-11 translate-y-0 rounded-full border border-gray-300 bg-white text-[#0B0B0B] shadow-sm transition-all hover:border-[#F4B400] hover:bg-[#F4B400] hover:text-[#0B0B0B] dark:border-[#383838] dark:bg-[#191919] dark:text-white dark:hover:border-[#F4B400] dark:hover:bg-[#F4B400] dark:hover:text-[#0B0B0B]" />

                            <CarouselNext className="static h-11 w-11 translate-y-0 rounded-full border border-gray-300 bg-white text-[#0B0B0B] shadow-sm transition-all hover:border-[#F4B400] hover:bg-[#F4B400] hover:text-[#0B0B0B] dark:border-[#383838] dark:bg-[#191919] dark:text-white dark:hover:border-[#F4B400] dark:hover:bg-[#F4B400] dark:hover:text-[#0B0B0B]" />
                        </div>
                    </Carousel>
                </div>
            </div>
        </section>
    );
};

export default CustomerReview;

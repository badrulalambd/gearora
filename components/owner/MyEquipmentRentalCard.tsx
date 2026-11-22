"use client"

import { IEquipmentType } from "@/type/type"
import { Package, DollarSign, Boxes, Tag } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

interface MyEquipmentCardProps {
    equipment: IEquipmentType
}

const MyEquipmentRentalCard = ({ equipment }: MyEquipmentCardProps) => {

    return (

        <Card className="group relative overflow-hidden rounded-2xl border border-[#E8C65A]/30 bg-gradient-to-br from-[#FFF9E6] via-[#FFF4CC] to-[#FFF0B3] shadow-md shadow-yellow-900/5 transition-all duration-300 hover:-translate-y-1 hover:border-[#F4B400]/60 hover:shadow-xl hover:shadow-yellow-900/10 dark:border-white/10 dark:bg-gradient-to-br dark:from-[#171717] dark:via-[#111111] dark:to-[#0B0B0B] dark:shadow-black/20 dark:hover:border-[#F4B400]/40 dark:hover:shadow-[#F4B400]/5">

            {/* Decorative Accent */}
            <div className="absolute -right-12 -top-12 h-36 w-36 rounded-full bg-[#F4B400]/10 blur-3xl transition-all duration-500 group-hover:bg-[#F4B400]/20 dark:bg-[#F4B400]/[0.06] dark:group-hover:bg-[#F4B400]/10" />

            <CardContent className="relative p-0">

                {/* Card Header */}
                <div className="flex flex-col gap-4 border-b border-[#D9B94F]/25 p-5 sm:flex-row sm:items-center sm:justify-between dark:border-white/[0.07]">

                    <div className="flex min-w-0 items-center gap-3">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#F4B400]/30 bg-[#F4B400]/15 text-[#A87500] shadow-inner shadow-[#F4B400]/10 transition-all duration-300 group-hover:scale-105 group-hover:bg-[#F4B400]/25 dark:border-[#F4B400]/20 dark:bg-[#F4B400]/10 dark:text-[#F4B400] dark:group-hover:bg-[#F4B400]/20">
                            <Package className="h-6 w-6" />
                        </div>

                        <div className="min-w-0">
                            <h3 className="truncate text-base font-bold tracking-tight text-[#29220F] sm:text-lg dark:text-white">
                                {equipment.name}
                            </h3>

                            <p className="mt-1 flex items-center gap-1.5 text-xs font-medium text-[#897744] dark:text-gray-400">
                                <span className="h-1.5 w-1.5 rounded-full bg-[#D99B00]" />
                                {equipment.category}
                            </p>
                        </div>
                    </div>

                    {/* Status */}
                    <Badge
                        variant="outline"
                        className="w-fit shrink-0 rounded-full border-[#D6A900]/40 bg-[#F4B400]/15 px-3 py-1 text-xs font-semibold capitalize text-[#956900] dark:border-[#F4B400]/25 dark:bg-[#F4B400]/10 dark:text-[#F4B400]"
                    >
                        <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-[#D99B00] dark:bg-[#F4B400]" />
                        {equipment.status}
                    </Badge>
                </div>

                {/* Card Details */}
                <div className="grid grid-cols-2 gap-3 p-5 sm:grid-cols-3">

                    {/* Rental Price */}
                    <div className="col-span-2 rounded-xl border border-[#E8C65A]/40 bg-gradient-to-br from-[#FFF0B8] to-[#FFE9A0] p-4 shadow-sm shadow-yellow-900/5 sm:col-span-1 dark:border-[#F4B400]/15 dark:bg-gradient-to-br dark:from-[#F4B400]/10 dark:to-[#F4B400]/[0.04]">
                        <div className="mb-2 flex items-center gap-2">
                            <DollarSign className="h-4 w-4 text-[#A87500] dark:text-[#F4B400]" />
                            <p className="text-xs font-medium text-[#897744] dark:text-gray-400">
                                Rental Price
                            </p>
                        </div>

                        <p className="text-2xl font-extrabold tracking-tight text-[#946500] dark:text-[#F4B400]">
                            ${equipment.rentalPrice}
                        </p>

                        <p className="mt-1 text-xs text-[#9B895D] dark:text-gray-500">
                            Per {equipment.rentalType}
                        </p>
                    </div>

                    {/* Quantity */}
                    <div className="rounded-xl border border-[#E8C65A]/30 bg-white/40 p-4 transition-colors duration-300 group-hover:bg-white/60 dark:border-white/[0.07] dark:bg-white/[0.03] dark:group-hover:bg-white/[0.05]">
                        <div className="mb-2 flex items-center gap-2">
                            <Boxes className="h-4 w-4 text-[#A87500] dark:text-gray-400" />
                            <p className="text-xs font-medium text-[#897744] dark:text-gray-400">
                                Available
                            </p>
                        </div>

                        <p className="text-2xl font-bold text-[#29220F] dark:text-white">
                            {equipment.quantity}
                        </p>

                        <p className="mt-1 text-xs text-[#9B895D] dark:text-gray-500">
                            Units in stock
                        </p>
                    </div>

                    {/* Category */}
                    <div className="col-span-2 rounded-xl border border-[#E8C65A]/30 bg-white/40 p-4 transition-colors duration-300 group-hover:bg-white/60 sm:col-span-1 dark:border-white/[0.07] dark:bg-white/[0.03] dark:group-hover:bg-white/[0.05]">
                        <div className="mb-2 flex items-center gap-2">
                            <Tag className="h-4 w-4 text-[#A87500] dark:text-gray-400" />
                            <p className="text-xs font-medium text-[#897744] dark:text-gray-400">
                                Category
                            </p>
                        </div>

                        <p className="text-sm font-bold text-[#29220F] dark:text-white">
                            {equipment.category}
                        </p>

                        <p className="mt-1 text-xs text-[#9B895D] dark:text-gray-500">
                            Equipment type
                        </p>
                    </div>
                </div>

                {/* Bottom Accent */}
                <div className="h-0.5 w-0 bg-[#D99B00] transition-all duration-500 group-hover:w-full dark:bg-[#F4B400]" />

            </CardContent>
        </Card>



    )
}

export default MyEquipmentRentalCard

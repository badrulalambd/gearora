"use client"

import { Heart, CalendarDays } from "lucide-react"

const EquipmentActions = () => {
  const handleAddToFavorites = () => {
    console.log("Add to Favorites clicked")
  }

  const handleBookEquipment = () => {
    console.log("Book Equipment clicked")
  }

  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <button
        onClick={handleAddToFavorites}
        className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-xl border border-border bg-card p-3 md:p-4 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
      >
        <Heart className="size-4 text-[#B98100] dark:text-[#F4B400]" />
        Add to Favorites
      </button>

      <button
        onClick={handleBookEquipment}
        className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-[#F4B400] p-3 md:p-4 text-sm font-bold text-[#0B0B0B] transition-colors hover:bg-[#E5A600]"
      >
        <CalendarDays className="size-4" />
        Book Equipment
      </button>
    </div>
  )
}

export default EquipmentActions
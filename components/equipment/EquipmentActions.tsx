"use client"

import { useEffect, useState } from "react"
import { Heart, CalendarDays } from "lucide-react"
import Link from "next/link"
import toast from "react-hot-toast"

import { useSession } from "@/lib/auth-client"
import { addFavorite, getFavorites } from "@/lib/action/favorites"

const EquipmentActions = ({ id }: { id: string | undefined }) => {
  const { data } = useSession()
  const user = data?.user
  const [added, setAdded] = useState(false)
  const [saving, setSaving] = useState(false)

  //Show the saved state when this equipment is already in the customer's list
  useEffect(() => {
    const email = user?.email
    if (!email || !id) return
    let cancelled = false

    getFavorites(email).then((favorites) => {
      if (
        !cancelled &&
        favorites.some((favorite) => favorite.equipmentId === id)
      ) {
        setAdded(true)
      }
    })

    return () => {
      cancelled = true
    }
  }, [user?.email, id])

  const handleAddToFavorites = async () => {
    if (!user) {
      toast.error("Please sign in to save favorites.")
      return
    }
    if (!id) return
    if (added) {
      toast("Already in your favorites.")
      return
    }

    try {
      setSaving(true)
      const res = await addFavorite({
        customerId: user.id,
        customerEmail: user.email,
        equipmentId: id,
      })

      if (res?.success) {
        setAdded(true)
        toast.success("Added to favorites.")
      } else {
        toast.error(res?.message || "Failed to add to favorites.")
      }
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <button
        onClick={handleAddToFavorites}
        disabled={saving}
        className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-xl border border-border bg-card p-3 text-sm font-semibold text-foreground transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-60 md:p-4"
      >
        <Heart
          className={`size-4 text-[#B98100] dark:text-[#F4B400] ${added ? "fill-current" : ""}`}
        />
        {added ? "Added to Favorites" : "Add to Favorites"}
      </button>

      <Link href={`/booking/${id}`}>
        <button className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-[#F4B400] p-3 text-sm font-bold text-[#0B0B0B] transition-colors hover:bg-[#E5A600] md:p-4">
          <CalendarDays className="size-4" />
          Book Equipment
        </button>
      </Link>
    </div>
  )
}

export default EquipmentActions

"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { LoaderCircle, Trash2 } from "lucide-react"
import toast from "react-hot-toast"

import { deleteFavorite } from "@/lib/action/favorites"

const DeleteFavoriteButton = ({ favoriteId }: { favoriteId: string }) => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleDelete = async () => {
    try {
      setLoading(true)
      const res = await deleteFavorite(favoriteId)

      if (res?.success) {
        toast.success("Removed from favorites.")
        router.refresh()
      } else {
        toast.error(res?.message || "Failed to remove from favorites.")
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-red-500/30 bg-red-500/10 px-3 text-sm font-semibold text-red-600 transition-colors hover:bg-red-500/20 disabled:cursor-not-allowed disabled:opacity-60 dark:text-red-400"
    >
      {loading ? (
        <LoaderCircle className="size-4 animate-spin" />
      ) : (
        <Trash2 className="size-4" />
      )}
      Delete
    </button>
  )
}

export default DeleteFavoriteButton

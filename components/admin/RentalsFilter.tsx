"use client"

import { usePathname, useRouter } from "next/navigation"
import { Filter } from "lucide-react"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const filterItems: Record<string, string> = {
  all: "All",
  Pending: "Pending",
  Approved: "Approved",
  Rejected: "Rejected",
}

//Equipment status filter — pushes the value into the URL so the server page
//re-queries the backend with it.
const RentalsFilter = ({ status }: { status: string }) => {
  const router = useRouter()
  const pathname = usePathname()

  const handleValueChange = (value: string | null) => {
    router.push(value === "all" ? pathname : `${pathname}?status=${value}`)
  }

  return (
    <div className="flex items-center gap-2">
      <Filter className="size-4 text-muted-foreground" />
      <span className="text-sm text-muted-foreground">Status</span>
      <Select
        items={filterItems}
        value={status || "all"}
        onValueChange={handleValueChange}
      >
        <SelectTrigger
          aria-label="Filter rentals by equipment status"
          className="h-9 w-36 rounded-lg border-border bg-background"
        >
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          <SelectItem value="Pending">Pending</SelectItem>
          <SelectItem value="Approved">Approved</SelectItem>
          <SelectItem value="Rejected">Rejected</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}

export default RentalsFilter

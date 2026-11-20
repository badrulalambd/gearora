"use client"

import type { FormEvent } from "react"
import { useRouter } from "next/navigation"
import {
  ArrowUpDown,
  Banknote,
  LayoutGrid,
  RotateCcw,
  Search,
  Tag,
  Wallet,
} from "lucide-react"

import { FormField } from "@/components/dashboard/FormField"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

/** Current filter state, mirrored from the page's searchParams (URL = source of truth). */
export interface EquipmentFilterValues {
  search: string
  category: string
  rentalType: string
  minPrice: string
  maxPrice: string
  availability: string
  sort: string
}

const ALL = "all"
const DEFAULT_SORT = "newest"

const rentalTypes = [
  { value: "hourly", label: "Hourly" },
  { value: "daily", label: "Daily" },
  { value: "weekly", label: "Weekly" },
  { value: "monthly", label: "Monthly" },
]

const availabilityOptions = [
  { value: "available", label: "Available" },
  { value: "out-of-stock", label: "Out of Stock" },
]

const sortOptions = [
  { value: "newest", label: "Recently Added" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
]

const selectTriggerClasses =
  "w-full data-[size=default]:h-11 focus-visible:border-[#F4B400]/60 focus-visible:ring-[#F4B400]/25"

const priceInputClasses =
  "h-11 focus-visible:border-[#F4B400]/60 focus-visible:ring-[#F4B400]/25"

// Base UI renders the raw value in <SelectValue /> unless `items` maps
// values to display labels.
const rentalTypeItems: Record<string, string> = {
  all: "All Rental Types",
  ...Object.fromEntries(rentalTypes.map((t) => [t.value, t.label])),
}

const availabilityItems: Record<string, string> = {
  all: "Any Availability",
  ...Object.fromEntries(availabilityOptions.map((o) => [o.value, o.label])),
}

const sortItems: Record<string, string> = Object.fromEntries(
  sortOptions.map((o) => [o.value, o.label])
)

interface EquipmentFiltersProps {
  values: EquipmentFilterValues
  /** Distinct categories of approved equipment, from the backend. */
  categories: string[]
}

const EquipmentFilters = ({ values, categories }: EquipmentFiltersProps) => {
  const router = useRouter()

  // Keep a category from the URL visible even if it no longer exists.
  const categoryOptions =
    values.category && !categories.includes(values.category)
      ? [values.category, ...categories]
      : categories

  const categoryItems: Record<string, string> = {
    all: "All Categories",
    ...Object.fromEntries(categoryOptions.map((c) => [c, c])),
  }

  /**
   * Build the search URL from the filter state and navigate — the server page
   * reads it from searchParams and passes it to the backend API call.
   */
  const applyFilters = (next: EquipmentFilterValues) => {
    const query = new URLSearchParams()

    const search = next.search.trim()
    if (search) query.set("search", search)
    if (next.category) query.set("category", next.category)
    if (next.rentalType) query.set("rentalType", next.rentalType)
    if (next.minPrice.trim()) query.set("minPrice", next.minPrice.trim())
    if (next.maxPrice.trim()) query.set("maxPrice", next.maxPrice.trim())
    if (next.availability) query.set("availability", next.availability)
    if (next.sort && next.sort !== DEFAULT_SORT) query.set("sort", next.sort)

    const queryString = query.toString()
    router.push(queryString ? `/equipments?${queryString}` : "/equipments")
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    applyFilters({
      ...values,
      search: String(formData.get("search") ?? ""),
      minPrice: String(formData.get("minPrice") ?? ""),
      maxPrice: String(formData.get("maxPrice") ?? ""),
    })
  }

  const handleSelectChange = (
    key: keyof EquipmentFilterValues,
    value: unknown
  ) => {
    const raw = String(value ?? "")
    // The "all" sentinel and the default sort are omitted from the URL.
    const mapped = key === "sort" ? raw : raw === ALL ? "" : raw

    applyFilters({ ...values, [key]: mapped } as EquipmentFilterValues)
  }

  const hasActiveFilters = Boolean(
    values.search ||
    values.category ||
    values.rentalType ||
    values.minPrice ||
    values.maxPrice ||
    values.availability ||
    (values.sort && values.sort !== DEFAULT_SORT)
  )

  return (
    <Card className="shadow-sm">
      <CardContent className="space-y-4 p-4 sm:p-5">
        {/* Search by name or location */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col gap-2 sm:flex-row">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                key={values.search}
                id="search"
                name="search"
                type="text"
                defaultValue={values.search}
                placeholder="Search by equipment name or location..."
                className="h-11 pl-9 focus-visible:border-[#F4B400]/60 focus-visible:ring-[#F4B400]/25"
              />
            </div>
            <Button
              type="submit"
              className="h-11 gap-2 bg-[#F4B400] px-6 text-sm font-bold text-[#0B0B0B] shadow-lg shadow-[#F4B400]/20 hover:bg-[#E5A600]"
            >
              <Search className="size-4" />
              Search
            </Button>
          </div>

          {/* Filters + sorting */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <FormField label="Category" icon={LayoutGrid} htmlFor="category">
              <Select
                key={values.category}
                items={categoryItems}
                defaultValue={values.category || ALL}
                onValueChange={(value) => handleSelectChange("category", value)}
              >
                <SelectTrigger id="category" className={selectTriggerClasses}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={ALL}>All Categories</SelectItem>
                  {categoryOptions.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormField>

            <FormField label="Rental Type" icon={Tag} htmlFor="rentalType">
              <Select
                key={values.rentalType}
                items={rentalTypeItems}
                defaultValue={values.rentalType || ALL}
                onValueChange={(value) =>
                  handleSelectChange("rentalType", value)
                }
              >
                <SelectTrigger id="rentalType" className={selectTriggerClasses}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={ALL}>All Rental Types</SelectItem>
                  {rentalTypes.map((rentalType) => (
                    <SelectItem key={rentalType.value} value={rentalType.value}>
                      {rentalType.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormField>

            <FormField
              label="Availability"
              icon={Wallet}
              htmlFor="availability"
            >
              <Select
                key={values.availability}
                items={availabilityItems}
                defaultValue={values.availability || ALL}
                onValueChange={(value) =>
                  handleSelectChange("availability", value)
                }
              >
                <SelectTrigger
                  id="availability"
                  className={selectTriggerClasses}
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={ALL}>Any Availability</SelectItem>
                  {availabilityOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormField>

            <FormField label="Min Price" icon={Banknote} htmlFor="minPrice">
              <Input
                key={values.minPrice}
                id="minPrice"
                name="minPrice"
                type="number"
                min="0"
                step="any"
                defaultValue={values.minPrice}
                placeholder="Min $"
                className={priceInputClasses}
              />
            </FormField>

            <FormField label="Max Price" icon={Banknote} htmlFor="maxPrice">
              <Input
                key={values.maxPrice}
                id="maxPrice"
                name="maxPrice"
                type="number"
                min="0"
                step="any"
                defaultValue={values.maxPrice}
                placeholder="Max $"
                className={priceInputClasses}
              />
            </FormField>

            <FormField label="Sort By" icon={ArrowUpDown} htmlFor="sort">
              <Select
                key={values.sort}
                items={sortItems}
                defaultValue={values.sort || DEFAULT_SORT}
                onValueChange={(value) => handleSelectChange("sort", value)}
              >
                <SelectTrigger id="sort" className={selectTriggerClasses}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {sortOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormField>
          </div>

          {/* Actions */}
          {hasActiveFilters && (
            <div className="flex items-center justify-end gap-3 border-t border-border pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/equipments")}
                className="h-9 gap-1.5 px-3"
              >
                <RotateCcw className="size-3.5" />
                Clear all
              </Button>
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  )
}

export default EquipmentFilters

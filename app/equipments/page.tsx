import Link from "next/link"
import { LayoutGrid, SearchX, ServerCrash } from "lucide-react"

import EquipmentCard from "@/components/equipment/EquipmentCard"
import EquipmentFilters, {
  type EquipmentFilterValues,
} from "@/components/equipment/EquipmentFilters"
import { Button } from "@/components/ui/button"
import { getAllEquipments, getEquipmentCategories } from "@/lib/api/equipment"
import { IEquipmentType } from "@/type/type"

interface AllEquipmentPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

/** Only keep the first string value for each known filter param. */
const readParam = (value: string | string[] | undefined) =>
  typeof value === "string" ? value.trim() : ""

const AllEquipmentPage = async ({ searchParams }: AllEquipmentPageProps) => {
  const params = await searchParams

  const values: EquipmentFilterValues = {
    search: readParam(params.search),
    category: readParam(params.category),
    rentalType: readParam(params.rentalType),
    minPrice: readParam(params.minPrice),
    maxPrice: readParam(params.maxPrice),
    availability: readParam(params.availability),
    sort: readParam(params.sort),
  }

  // Build the API query from the URL params — filtering, searching and
  // sorting all happen on the backend.
  const query = new URLSearchParams()
  if (values.search) query.set("search", values.search)
  if (values.category) query.set("category", values.category)
  if (values.rentalType) query.set("rentalType", values.rentalType)
  if (values.minPrice) query.set("minPrice", values.minPrice)
  if (values.maxPrice) query.set("maxPrice", values.maxPrice)
  if (values.availability) query.set("availability", values.availability)
  if (values.sort) query.set("sort", values.sort)

  let equipments: IEquipmentType[] = []
  let categories: string[] = []
  let serverError = false

  try {
    equipments = await getAllEquipments(query)
  } catch (error) {
    console.error("Failed to fetch equipments:", error)
    serverError = true
  }

  // The category dropdown is a nicety — fall back to empty if it fails.
  if (!serverError) {
    try {
      categories = await getEquipmentCategories()
    } catch (error) {
      console.error("Failed to fetch equipment categories:", error)
    }
  }

  // Backend server error fallback
  if (serverError) {
    return (
      <div className="p-5 md:p-10 mx-auto w-full max-w-5xl">
        <div className="flex min-h-100 flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card px-6 py-12 text-center">
          <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-red-500/10">
            <ServerCrash className="h-8 w-8 text-red-500" />
          </div>

          <h2 className="text-xl font-bold text-foreground sm:text-2xl">
            Unable to Connect to Server
          </h2>

          <p className="mt-3 max-w-md text-sm leading-6 text-muted-foreground">
            We&apos;re having trouble loading the equipment list right now.
            Please try again in a moment.
          </p>

          <Button
            render={<Link href="/equipments" />}
            nativeButton={false}
            className="mt-6 bg-[#F4B400] font-bold text-[#0B0B0B] hover:bg-[#E5A600]"
          >
            Try Again
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="p-5 md:p-10 mx-auto w-full max-w-7xl space-y-6">
      {/* Page heading */}
      <div className="flex items-start gap-4">
        <span className="rounded-xl bg-[#F4B400]/15 p-3">
          <LayoutGrid className="size-6 text-[#B98100] dark:text-[#F4B400]" />
        </span>
        <div className="min-w-0">
          <h1 className="font-(family-name:--font-space-grotesk) text-2xl font-bold text-foreground sm:text-3xl">
            All Equipment
          </h1>
          <p className="mt-1.5 max-w-2xl text-sm leading-6 text-muted-foreground">
            Browse approved equipment from trusted owners. Search, filter, and
            sort to find the right gear for your project.
          </p>
        </div>
      </div>

      {/* Search, filters & sorting — updates the URL, fetched from the backend */}
      <EquipmentFilters values={values} categories={categories} />

      {/* Results */}
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">
            {equipments.length}
          </span>{" "}
          {equipments.length === 1 ? "equipment" : "equipments"} found
        </p>
      </div>

      {equipments.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card px-6 py-16 text-center">
          <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#F4B400]/15">
            <SearchX className="h-8 w-8 text-[#B98100] dark:text-[#F4B400]" />
          </div>

          <h2 className="text-xl font-bold text-foreground">
            No Equipment Found
          </h2>

          <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
            We couldn&apos;t find any equipment matching your search. Try
            adjusting your filters or search for something else.
          </p>

          <Button
            render={<Link href="/equipments" />}
            nativeButton={false}
            className="mt-6 bg-[#F4B400] font-bold text-[#0B0B0B] hover:bg-[#E5A600]"
          >
            Clear Filters
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {equipments.map((equipment) => (
            <EquipmentCard key={equipment._id} equipment={equipment} />
          ))}
        </div>
      )}
    </div>
  )
}

export default AllEquipmentPage

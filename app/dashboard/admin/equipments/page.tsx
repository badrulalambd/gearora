import { headers } from "next/headers"
import { LayoutGrid } from "lucide-react"

import {
  AccessDenied,
  NoRecords,
  UnableToConnect,
} from "@/components/admin/AdminPageStates"
import EquipmentsTable from "@/components/admin/EquipmentsTable"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { getAdminEquipments } from "@/lib/api/equipment"
import { auth } from "@/lib/auth"
import { IEquipmentType } from "@/type/type"

const AllEquipmentPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session || session.user.role !== "admin") {
    return <AccessDenied signedIn={Boolean(session)} />
  }

  let equipments: IEquipmentType[] = []
  let serverError = false

  try {
    equipments = await getAdminEquipments()
  } catch (error) {
    console.error("Failed to fetch equipments:", error)
    serverError = true
  }

  if (serverError) {
    return (
      <UnableToConnect
        subject="the equipment list"
        href="/dashboard/admin/equipments"
      />
    )
  }

  return (
    <div className="space-y-6">
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
            Review every listing, approve or reject it, edit its details, or
            remove it permanently.
          </p>
        </div>
      </div>

      {equipments.length === 0 ? (
        <NoRecords
          title="No Equipment Yet"
          message="Listings submitted by owners will show up here for review."
          icon={
            <LayoutGrid className="size-8 text-[#B98100] dark:text-[#F4B400]" />
          }
        />
      ) : (
        <Card className="shadow-sm">
          <CardHeader className="border-b border-border pb-4">
            <CardTitle className="font-(family-name:--font-space-grotesk) text-lg font-semibold">
              Equipment Listings
            </CardTitle>
            <CardDescription className="mt-1">
              {equipments.length}{" "}
              {equipments.length === 1 ? "listing" : "listings"} in total.
            </CardDescription>
          </CardHeader>

          <CardContent className="p-4 sm:p-5">
            <EquipmentsTable equipments={equipments} />
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default AllEquipmentPage

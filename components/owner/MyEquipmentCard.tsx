"use client"

import { IEquipmentType } from "@/type/type"
import { Eye, Trash2, Package } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { deleteEquipment } from "@/lib/action/equipment"
import EquipmentUpdateDialog from "@/components/owner/EquipmentUpdateDialog"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import Link from "next/link"

interface MyEquipmentCardProps {
  equipment: IEquipmentType
}

const MyEquipmentCard = ({ equipment }: MyEquipmentCardProps) => {
  const router = useRouter()

  const handleDelete = async () => {
    const id: string | undefined = equipment._id
    const result = await deleteEquipment(id)
    console.log("Delete equipment:", result)
    if (result.deletedCount > 0) {
      toast.success("Equipment is deleted successfully.")
      router.refresh()
    }
  }

  return (
    <Card className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:shadow-md">
      <CardContent className="p-0">
        {/* Card Header */}
        <div className="flex flex-col gap-4 border-b border-border p-4 sm:p-5 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#F4B400]/15 text-[#B98100] dark:text-[#F4B400]">
              <Package className="h-5 w-5" />
            </div>

            <div>
              <h3 className="text-base font-bold text-foreground sm:text-lg">
                {equipment.name}
              </h3>

              <p className="mt-1 text-xs text-muted-foreground">
                {equipment.category}
              </p>
            </div>
          </div>

          {/* Status */}
          <Badge
            variant="outline"
            className="w-fit rounded-full border-yellow-500/30 bg-yellow-500/10 px-3 py-1 text-yellow-700 dark:text-yellow-400"
          >
            {equipment.status}
          </Badge>
        </div>

        {/* Card Details */}
        <div className="grid grid-cols-2 gap-4 p-4 sm:p-5 md:grid-cols-3">
          {/* Rental Price */}
          <div className="space-y-1">
            <p className="text-xs font-medium text-muted-foreground">
              Rental Price
            </p>

            <p className="text-lg font-bold text-foreground">
              ${equipment.rentalPrice}
              <span className="ml-1 text-xs font-normal text-muted-foreground">
                /{equipment.rentalType}
              </span>
            </p>
          </div>

          {/* Quantity */}
          <div className="space-y-1">
            <p className="text-xs font-medium text-muted-foreground">
              Available Quantity
            </p>

            <p className="text-lg font-bold text-foreground">
              {equipment.quantity}
            </p>
          </div>

          {/* Category */}
          <div className="col-span-2 space-y-1 md:col-span-1">
            <p className="text-xs font-medium text-muted-foreground">
              Category
            </p>

            <p className="text-sm font-semibold text-foreground">
              {equipment.category}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border bg-muted/30 p-4 sm:px-5">
          <p className="text-xs text-muted-foreground">Manage your equipment</p>

          <div className="flex items-center gap-2">
            {/* View Details */}
            <Link href={`/equipments/${equipment._id}`}>
              <Button
                variant="outline"
                size="sm"
                className="h-9 rounded-lg border-border bg-background px-3"
              >
                <Eye className="mr-1.5 h-4 w-4" />
                <span className="hidden sm:inline">View Details</span>
              </Button>
            </Link>

            {/* Update */}
            <EquipmentUpdateDialog equipment={equipment} />

            {/* Delete */}
            <Button
              variant="outline"
              size="sm"
              onClick={handleDelete}
              className="h-9 rounded-lg border-border bg-background px-3 text-destructive"
            >
              <Trash2 className="mr-1.5 h-4 w-4" />
              Delete
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default MyEquipmentCard

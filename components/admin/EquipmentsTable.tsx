"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Check, ChevronDown, Package, Pencil, Trash2, X } from "lucide-react"
import toast from "react-hot-toast"

import ConfirmDialog from "@/components/admin/ConfirmDialog"
import { statusBadgeClasses } from "@/components/admin/statusBadgeClasses"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import EquipmentUpdateDialog from "@/components/owner/EquipmentUpdateDialog"
import { deleteEquipment, updateEquipmentStatus } from "@/lib/action/equipment"
import { IEquipmentType } from "@/type/type"

const EquipmentsTable = ({ equipments }: { equipments: IEquipmentType[] }) => {
  const router = useRouter()
  const [updating, setUpdating] = useState<IEquipmentType | null>(null)
  const [deleting, setDeleting] = useState<IEquipmentType | null>(null)

  //Approve / Reject → backend status update, then re-read from the database.
  const handleStatus = async (
    equipment: IEquipmentType,
    status: "Approved" | "Rejected"
  ) => {
    try {
      await updateEquipmentStatus(equipment._id, status)
      toast.success(`${equipment.name} is now ${status}.`)
      router.refresh()
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to update status."
      )
    }
  }

  const handleDelete = async () => {
    if (!deleting) {
      return
    }

    try {
      const result = await deleteEquipment(deleting._id)

      if (!result?.deletedCount) {
        throw new Error("Failed to delete equipment.")
      }

      toast.success(`${deleting.name} has been deleted.`)
      setDeleting(null)
      router.refresh()
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to delete equipment."
      )
      setDeleting(null)
    }
  }

  return (
    <>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Equipment</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Owner</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {equipments.map((equipment) => (
              <TableRow key={equipment._id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    {equipment.image ? (
                      <Image
                        src={equipment.image}
                        alt={equipment.name}
                        width={44}
                        height={44}
                        className="size-11 shrink-0 rounded-lg object-cover"
                      />
                    ) : (
                      <span className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-muted">
                        <Package className="size-5 text-muted-foreground" />
                      </span>
                    )}
                    <div className="min-w-0">
                      <p className="truncate font-semibold text-foreground">
                        {equipment.name}
                      </p>
                      <p className="truncate text-xs text-muted-foreground">
                        {equipment.brand} {equipment.model}
                      </p>
                    </div>
                  </div>
                </TableCell>

                <TableCell className="text-muted-foreground">
                  {equipment.category}
                </TableCell>

                <TableCell>
                  <p className="font-medium text-foreground">
                    {equipment.ownerName}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {equipment.ownerEmail}
                  </p>
                </TableCell>

                <TableCell className="font-semibold text-foreground">
                  ${equipment.rentalPrice}
                  <span className="text-xs font-normal text-muted-foreground">
                    /{equipment.rentalType}
                  </span>
                </TableCell>

                <TableCell>
                  <Badge className={statusBadgeClasses[equipment.status]}>
                    {equipment.status}
                  </Badge>
                </TableCell>

                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger
                      type="button"
                      className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-border bg-background px-3 text-sm font-semibold text-foreground hover:bg-muted"
                    >
                      Actions
                      <ChevronDown className="size-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        disabled={equipment.status === "Approved"}
                        onClick={() => handleStatus(equipment, "Approved")}
                      >
                        <Check className="text-emerald-600 dark:text-emerald-400" />
                        Approve
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        disabled={equipment.status === "Rejected"}
                        onClick={() => handleStatus(equipment, "Rejected")}
                      >
                        <X className="text-red-600 dark:text-red-400" />
                        Reject
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => setUpdating(equipment)}>
                        <Pencil />
                        Update
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        variant="destructive"
                        onClick={() => setDeleting(equipment)}
                      >
                        <Trash2 />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Edit popup opened from the Actions dropdown */}
      {updating && (
        <EquipmentUpdateDialog
          key={updating._id}
          equipment={updating}
          open
          showTrigger={false}
          onOpenChange={(open) => {
            if (!open) setUpdating(null)
          }}
        />
      )}

      {/* Permanent delete only after this confirmation popup */}
      <ConfirmDialog
        open={deleting !== null}
        onOpenChange={(open) => {
          if (!open) setDeleting(null)
        }}
        title="Delete this equipment?"
        description={
          deleting
            ? `${deleting.name} will be permanently removed from the platform. This action cannot be undone.`
            : ""
        }
        confirmLabel="Delete Equipment"
        onConfirm={handleDelete}
      />
    </>
  )
}

export default EquipmentsTable

"use client"

import { useState } from "react"
import type { FormEvent } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import toast from "react-hot-toast"
import {
  DollarSign,
  FileText,
  Image as ImageIcon,
  LayoutGrid,
  LoaderCircle,
  MapPin,
  Package,
  Pencil,
  Save,
  ShieldCheck,
  Tag,
  Upload,
} from "lucide-react"

import { FormField } from "@/components/dashboard/FormField"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { updateEquipment } from "@/lib/action/equipment"
import { cn } from "@/lib/utils"
import { IEquipmentType } from "@/type/type"

const categories = [
  "Construction",
  "Power Tools",
  "Hand Tools",
  "Lifting & Access",
  "Vehicles & Transport",
  "Electrical & Lighting",
  "Plumbing & Water",
  "Safety & PPE",
  "Other",
]

const rentalTypes = [
  { value: "daily", label: "Daily" },
  { value: "weekly", label: "Weekly" },
  { value: "monthly", label: "Monthly" },
]

const conditions = ["New", "Like New", "Good", "Fair", "Poor"]

const fieldClasses =
  "h-11 focus-visible:border-[#F4B400]/60 focus-visible:ring-[#F4B400]/25"

const selectClasses =
  "w-full data-[size=default]:h-11 focus-visible:border-[#F4B400]/60 focus-visible:ring-[#F4B400]/25"

const textareaClasses =
  "min-h-24 focus-visible:border-[#F4B400]/60 focus-visible:ring-[#F4B400]/25"

interface EquipmentUpdateDialogProps {
  equipment: IEquipmentType
  /** Controlled open state — lets the admin Actions dropdown open the dialog. */
  open?: boolean
  onOpenChange?: (open: boolean) => void
  /** Set to false when the caller renders its own way to open the dialog. */
  showTrigger?: boolean
}

const EquipmentUpdateDialog = ({
  equipment,
  open: controlledOpen,
  onOpenChange,
  showTrigger = true,
}: EquipmentUpdateDialogProps) => {
  const router = useRouter()

  const [internalOpen, setInternalOpen] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [imageFileName, setImageFileName] = useState<string | null>(null)

  const isControlled = controlledOpen !== undefined
  const open = isControlled ? controlledOpen : internalOpen

  const imgbbAPI = `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      setImageFileName(null)
    }
    if (!isControlled) {
      setInternalOpen(nextOpen)
    }
    onOpenChange?.(nextOpen)
  }

  const handleUpdate = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (submitting) {
      return
    }
    setSubmitting(true)

    try {
      const formData = new FormData(event.currentTarget)
      const image = formData.get("image") as File

      // Keep the current photo unless a new one was picked.
      let imageUrl = equipment.image

      if (image && image.size > 0) {
        const imageFormData = new FormData()
        imageFormData.append("image", image)

        const response = await fetch(imgbbAPI, {
          method: "POST",
          body: imageFormData,
        })

        const imageData = await response.json()

        if (!response.ok || !imageData.success) {
          throw new Error("Image upload failed. Please try again.")
        }

        imageUrl = imageData.data.url
      }

      // Owner (user) information is intentionally left out of the payload.
      const payload: Partial<IEquipmentType> = {
        name: formData.get("name") as string,
        description: formData.get("description") as string,
        category: formData.get("category") as string,
        brand: formData.get("brand") as string,
        model: formData.get("model") as string,
        location: formData.get("location") as string,
        rentalPrice: Number(formData.get("rentalPrice")),
        rentalType: formData.get("rentalType") as IEquipmentType["rentalType"],
        quantity: Number(formData.get("quantity")),
        condition: formData.get("condition") as IEquipmentType["condition"],
        image: imageUrl,
        rentalTerms: formData.get("rentalTerms") as string,
        status: equipment.status,
      }

      const result = await updateEquipment(equipment._id, payload)

      if (result?.error) {
        toast.error(result.error)
        return
      }

      toast.success("Equipment is updated successfully.")
      handleOpenChange(false)
      router.refresh()
    } catch (error) {
      console.error("Error updating equipment:", error)

      toast.error(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      )
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      {showTrigger && (
        <DialogTrigger
          render={
            <Button
              variant="outline"
              size="sm"
              className="h-9 rounded-lg border-border bg-background px-3"
            />
          }
        >
          <Pencil className="mr-1.5 h-4 w-4" />
          Update
        </DialogTrigger>
      )}

      <DialogContent className="flex max-h-[calc(100dvh-2rem)] flex-col gap-0 overflow-hidden p-0 sm:max-w-xl">
        <DialogHeader className="border-b border-border px-4 pt-5 pr-10 pb-4 sm:px-6">
          <div className="flex items-center gap-3">
            <span className="rounded-lg bg-[#F4B400]/15 p-2.5">
              <Pencil className="size-5 text-[#B98100] dark:text-[#F4B400]" />
            </span>
            <div className="min-w-0">
              <DialogTitle className="font-(family-name:--font-space-grotesk) text-lg font-semibold">
                Update Equipment
              </DialogTitle>
              <DialogDescription className="mt-1.5">
                Review and edit the listing details below.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <form onSubmit={handleUpdate} className="flex min-h-0 flex-1 flex-col">
          <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4 sm:px-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <FormField
                label="Equipment Name"
                icon={Tag}
                htmlFor="update-name"
                required
                className="sm:col-span-2"
              >
                <Input
                  id="update-name"
                  name="name"
                  type="text"
                  placeholder="e.g. Hydraulic Excavator"
                  autoComplete="off"
                  required
                  defaultValue={equipment.name}
                  className={fieldClasses}
                />
              </FormField>

              <FormField
                label="Description"
                icon={FileText}
                htmlFor="update-description"
                required
                className="sm:col-span-2"
                hint="Describe condition, accessories, delivery options, etc."
              >
                <Textarea
                  id="update-description"
                  name="description"
                  placeholder="Describe the equipment, its features and any usage notes…"
                  required
                  defaultValue={equipment.description}
                  className={textareaClasses}
                />
              </FormField>

              <FormField
                label="Category"
                icon={LayoutGrid}
                htmlFor="update-category"
                required
              >
                <Select
                  name="category"
                  required
                  defaultValue={equipment.category}
                >
                  <SelectTrigger id="update-category" className={selectClasses}>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormField>

              <FormField
                label="Brand"
                icon={Tag}
                htmlFor="update-brand"
                required
              >
                <Input
                  id="update-brand"
                  name="brand"
                  type="text"
                  placeholder="e.g. Bosch"
                  autoComplete="off"
                  required
                  defaultValue={equipment.brand}
                  className={fieldClasses}
                />
              </FormField>

              <FormField label="Model" icon={Tag} htmlFor="update-model">
                <Input
                  id="update-model"
                  name="model"
                  type="text"
                  placeholder="e.g. GSB 13-60 RE"
                  autoComplete="off"
                  defaultValue={equipment.model}
                  className={fieldClasses}
                />
              </FormField>

              <FormField
                label="Location"
                icon={MapPin}
                htmlFor="update-location"
                required
              >
                <Input
                  id="update-location"
                  name="location"
                  type="text"
                  placeholder="e.g. Dhaka, Bangladesh"
                  autoComplete="off"
                  required
                  defaultValue={equipment.location}
                  className={fieldClasses}
                />
              </FormField>

              <FormField
                label="Rental Price"
                icon={DollarSign}
                htmlFor="update-rentalPrice"
                required
                hint="Price per selected rental period."
              >
                <Input
                  id="update-rentalPrice"
                  name="rentalPrice"
                  type="number"
                  min={0}
                  step="0.01"
                  placeholder="e.g. 45.00"
                  required
                  defaultValue={equipment.rentalPrice}
                  className={fieldClasses}
                />
              </FormField>

              <FormField
                label="Rental Type"
                icon={Tag}
                htmlFor="update-rentalType"
                required
              >
                <Select
                  name="rentalType"
                  required
                  defaultValue={equipment.rentalType}
                >
                  <SelectTrigger
                    id="update-rentalType"
                    className={selectClasses}
                  >
                    <SelectValue placeholder="Select a rental type" />
                  </SelectTrigger>
                  <SelectContent>
                    {rentalTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormField>

              <FormField
                label="Available Quantity"
                icon={Package}
                htmlFor="update-quantity"
                required
              >
                <Input
                  id="update-quantity"
                  name="quantity"
                  type="number"
                  min={1}
                  step={1}
                  placeholder="e.g. 5"
                  required
                  defaultValue={equipment.quantity}
                  className={fieldClasses}
                />
              </FormField>

              <FormField
                label="Equipment Condition"
                icon={ShieldCheck}
                htmlFor="update-condition"
                required
              >
                <Select
                  name="condition"
                  required
                  defaultValue={equipment.condition}
                >
                  <SelectTrigger
                    id="update-condition"
                    className={selectClasses}
                  >
                    <SelectValue placeholder="Select condition" />
                  </SelectTrigger>
                  <SelectContent>
                    {conditions.map((condition) => (
                      <SelectItem key={condition} value={condition}>
                        {condition}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormField>

              <FormField
                label="Equipment Image"
                icon={ImageIcon}
                htmlFor="update-image"
                className="sm:col-span-2"
                hint="Upload a new photo to replace the current one."
              >
                <div className="flex items-center gap-3">
                  {equipment.image && (
                    <Image
                      src={equipment.image}
                      alt={equipment.name}
                      width={64}
                      height={64}
                      className="h-16 w-16 shrink-0 rounded-lg border border-border object-cover"
                    />
                  )}

                  <label
                    htmlFor="update-image"
                    className="flex h-16 flex-1 cursor-pointer flex-col items-center justify-center gap-1.5 rounded-xl border-2 border-dashed border-border bg-muted/30 px-3 text-center transition-colors hover:border-[#F4B400]/60 hover:bg-[#F4B400]/5"
                  >
                    <span
                      className={cn(
                        "flex items-center gap-1.5 text-sm font-medium text-foreground",
                        imageFileName && "text-[#B98100] dark:text-[#F4B400]"
                      )}
                    >
                      <Upload className="size-4" />
                      {imageFileName ?? "Click to replace photo"}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      PNG, JPG or WEBP
                    </span>
                    <input
                      id="update-image"
                      name="image"
                      type="file"
                      accept="image/*"
                      className="sr-only"
                      onChange={(event) =>
                        setImageFileName(event.target.files?.[0].name ?? null)
                      }
                    />
                  </label>
                </div>
              </FormField>

              <FormField
                label="Rental Terms and Conditions"
                icon={FileText}
                htmlFor="update-rentalTerms"
                className="sm:col-span-2"
              >
                <Textarea
                  id="update-rentalTerms"
                  name="rentalTerms"
                  placeholder="e.g. Security deposit required, no off-road use, delivery not included…"
                  defaultValue={equipment.rentalTerms}
                  className={textareaClasses}
                />
              </FormField>

              <FormField
                label="Status"
                icon={ShieldCheck}
                className="sm:col-span-2"
              >
                <div className="flex h-11 items-center gap-2.5 rounded-lg border border-input bg-transparent px-2.5">
                  <span className="size-2 animate-pulse rounded-full bg-[#F4B400]" />
                  <Badge className="bg-[#F4B400]/15 text-[#B98100] hover:bg-[#F4B400]/15 dark:text-[#F4B400]">
                    {equipment.status}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    Managed by admin
                  </span>
                </div>
              </FormField>
            </div>
          </div>

          <DialogFooter className="mx-0 mb-0 rounded-none p-4 sm:px-6">
            <DialogClose
              render={
                <Button
                  variant="outline"
                  type="button"
                  className="h-11 w-full sm:w-auto"
                />
              }
            >
              Cancel
            </DialogClose>

            <Button
              type="submit"
              disabled={submitting}
              className="h-11 w-full gap-2 bg-[#F4B400] px-6 text-sm font-bold text-[#0B0B0B] shadow-lg shadow-[#F4B400]/20 hover:bg-[#E5A600] sm:w-auto"
            >
              {submitting ? (
                <LoaderCircle className="size-4 animate-spin" />
              ) : (
                <Save className="size-4" />
              )}
              Update the changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default EquipmentUpdateDialog

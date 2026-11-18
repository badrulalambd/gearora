"use client"

import { useState } from "react"
import type { FormEvent, ReactNode } from "react"
import Link from "next/link"
import {
  DollarSign,
  FileText,
  Image as ImageIcon,
  LayoutGrid,
  MapPin,
  Package,
  Plus,
  ShieldCheck,
  Tag,
  Upload,
  User,
  type LucideIcon,
} from "lucide-react"

import { FormField } from "@/components/dashboard/FormField"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useSession } from "@/lib/auth-client"
import { cn } from "@/lib/utils"

const categories = [
  "Construction",
  "Power Tools",
  "Hand Tools",
  "Lifting & Access",
  "Earthmoving",
  "Vehicles & Transport",
  "Electrical & Lighting",
  "Plumbing & Water",
  "Scaffolding",
  "Safety & PPE",
  "Surveying & Measurement",
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

interface SectionCardProps {
  icon: LucideIcon
  title: string
  description: string
  children: ReactNode
}

const SectionCard = ({
  icon: Icon,
  title,
  description,
  children,
}: SectionCardProps) => (
  <Card className="shadow-sm">
    <CardHeader className="border-b border-border pb-4">
      <div className="flex items-center gap-3">
        <span className="rounded-lg bg-[#F4B400]/15 p-2.5">
          <Icon className="size-5 text-[#B98100] dark:text-[#F4B400]" />
        </span>
        <div className="min-w-0">
          <CardTitle className="font-[family-name:var(--font-space-grotesk)] text-lg font-semibold">
            {title}
          </CardTitle>
          <CardDescription className="mt-1">{description}</CardDescription>
        </div>
      </div>
    </CardHeader>
    <CardContent>{children}</CardContent>
  </Card>
)

const AddOwnerEquipmentPage = () => {
  const { data: session } = useSession()
  const [imageFileName, setImageFileName] = useState<string | null>(null)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    // Everything the form carries: text fields, selects (via hidden inputs),
    // hidden fields (status/ownerId) and the image as a File object.
    const formData = new FormData(event.currentTarget)
    const payload = Object.fromEntries(formData.entries())

    // TODO: upload `payload.image` (File) to imgbb, swap it for the CDN URL,
    // then POST the payload to your Express REST API (MongoDB insert).
    console.log("Add equipment form data:", payload)
  }

  return (
    <div className="mx-auto w-full max-w-5xl space-y-6">
      {/* Page heading */}
      <div className="flex items-start gap-4">
        <span className="rounded-xl bg-[#F4B400]/15 p-3">
          <Plus className="size-6 text-[#B98100] dark:text-[#F4B400]" />
        </span>
        <div className="min-w-0">
          <h1 className="font-[family-name:var(--font-space-grotesk)] text-2xl font-bold text-foreground sm:text-3xl">
            Add New Equipment
          </h1>
          <p className="mt-1.5 max-w-2xl text-sm leading-6 text-muted-foreground">
            Fill in the details below to list your equipment on GearOra. New
            listings stay in pending status until they are reviewed.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 1 — Basic information */}
        <SectionCard
          icon={FileText}
          title="Basic Information"
          description="What the equipment is and where it is located."
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <FormField
              label="Equipment Name"
              icon={Tag}
              htmlFor="name"
              required
              className="sm:col-span-2"
            >
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="e.g. Hydraulic Excavator"
                autoComplete="off"
                required
                className={fieldClasses}
              />
            </FormField>

            <FormField
              label="Description"
              icon={FileText}
              htmlFor="description"
              required
              className="sm:col-span-2"
              hint="Describe condition, accessories, delivery options, etc."
            >
              <Textarea
                id="description"
                name="description"
                placeholder="Describe the equipment, its features and any usage notes…"
                required
                className={textareaClasses}
              />
            </FormField>

            <FormField
              label="Category"
              icon={LayoutGrid}
              htmlFor="category"
              required
            >
              <Select name="category" required>
                <SelectTrigger id="category" className={selectClasses}>
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

            <FormField label="Brand" icon={Tag} htmlFor="brand" required>
              <Input
                id="brand"
                name="brand"
                type="text"
                placeholder="e.g. Bosch"
                autoComplete="off"
                required
                className={fieldClasses}
              />
            </FormField>

            <FormField label="Model" icon={Tag} htmlFor="model">
              <Input
                id="model"
                name="model"
                type="text"
                placeholder="e.g. GSB 13-60 RE"
                autoComplete="off"
                className={fieldClasses}
              />
            </FormField>

            <FormField
              label="Location"
              icon={MapPin}
              htmlFor="location"
              required
            >
              <Input
                id="location"
                name="location"
                type="text"
                placeholder="e.g. Dhaka, Bangladesh"
                autoComplete="off"
                required
                className={fieldClasses}
              />
            </FormField>
          </div>
        </SectionCard>

        {/* 2 — Pricing & availability */}
        <SectionCard
          icon={DollarSign}
          title="Pricing & Availability"
          description="How much it rents for and how many units you have."
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <FormField
              label="Rental Price"
              icon={DollarSign}
              htmlFor="rentalPrice"
              required
              hint="Price per selected rental period."
            >
              <Input
                id="rentalPrice"
                name="rentalPrice"
                type="number"
                min={0}
                step="0.01"
                placeholder="e.g. 45.00"
                required
                className={fieldClasses}
              />
            </FormField>

            <FormField
              label="Rental Type"
              icon={Tag}
              htmlFor="rentalType"
              required
            >
              <Select name="rentalType" required>
                <SelectTrigger id="rentalType" className={selectClasses}>
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
              htmlFor="quantity"
              required
            >
              <Input
                id="quantity"
                name="quantity"
                type="number"
                min={1}
                step={1}
                placeholder="e.g. 5"
                required
                className={fieldClasses}
              />
            </FormField>

            <FormField
              label="Equipment Condition"
              icon={ShieldCheck}
              htmlFor="condition"
              required
            >
              <Select name="condition" required>
                <SelectTrigger id="condition" className={selectClasses}>
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
          </div>
        </SectionCard>

        {/* 3 — Image & terms */}
        <SectionCard
          icon={ImageIcon}
          title="Image & Rental Terms"
          description="A photo of the equipment and your rental conditions."
        >
          <div className="space-y-4">
            <FormField
              label="Equipment Image"
              icon={ImageIcon}
              htmlFor="image"
              hint="Uploaded to imgbb when the form is submitted."
            >
              <label
                htmlFor="image"
                className="flex h-40 cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border bg-muted/30 px-4 text-center transition-colors hover:border-[#F4B400]/60 hover:bg-[#F4B400]/5"
              >
                <span className="rounded-full bg-[#F4B400]/15 p-3">
                  <Upload className="size-5 text-[#B98100] dark:text-[#F4B400]" />
                </span>
                <span
                  className={cn(
                    "text-sm font-medium text-foreground",
                    imageFileName && "text-[#B98100] dark:text-[#F4B400]"
                  )}
                >
                  {imageFileName ?? "Click to upload equipment photo"}
                </span>
                <span className="text-xs text-muted-foreground">
                  PNG, JPG or WEBP
                </span>
                <input
                  id="image"
                  name="image"
                  type="file"
                  accept="image/*"
                  className="sr-only"
                  onChange={(event) =>
                    setImageFileName(event.target.files?.[0]?.name ?? null)
                  }
                />
              </label>
            </FormField>

            <FormField
              label="Rental Terms and Conditions"
              icon={FileText}
              htmlFor="rentalTerms"
              className="sm:col-span-2"
            >
              <Textarea
                id="rentalTerms"
                name="rentalTerms"
                placeholder="e.g. Security deposit required, no off-road use, delivery not included…"
                className={textareaClasses}
              />
            </FormField>
          </div>
        </SectionCard>

        {/* 4 — Status & owner */}
        <SectionCard
          icon={ShieldCheck}
          title="Status & Owner"
          description="Listing status and who is responsible for it."
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <FormField label="Status" icon={ShieldCheck}>
              <div className="flex h-11 items-center gap-2.5 rounded-lg border border-input bg-transparent px-2.5">
                <span className="size-2 animate-pulse rounded-full bg-[#F4B400]" />
                <Badge className="bg-[#F4B400]/15 text-[#B98100] hover:bg-[#F4B400]/15 dark:text-[#F4B400]">
                  Pending
                </Badge>
                <span className="text-xs text-muted-foreground">
                  Set on submission
                </span>
              </div>
              <input type="hidden" name="status" value="Pending" />
            </FormField>

            <FormField label="Owner Name" icon={User} htmlFor="ownerName">
              <Input
                id="ownerName"
                name="ownerName"
                type="text"
                readOnly
                value={session?.user?.name ?? ""}
                placeholder="—"
                className={cn(fieldClasses, "cursor-default")}
              />
            </FormField>

            <FormField
              label="Owner Email"
              icon={User}
              htmlFor="ownerEmail"
              className="sm:col-span-2"
            >
              <Input
                id="ownerEmail"
                name="ownerEmail"
                type="email"
                readOnly
                value={session?.user?.email ?? ""}
                placeholder="—"
                className={cn(fieldClasses, "cursor-default")}
              />
            </FormField>

            <input
              type="hidden"
              name="ownerId"
              value={session?.user?.id ?? ""}
            />
          </div>
        </SectionCard>

        {/* Actions */}
        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-end">
          <Button
            variant="outline"
            render={<Link href="/dashboard/owner" />}
            nativeButton={false}
            className="h-11 w-full px-6 sm:w-auto"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="h-11 w-full gap-2 bg-[#F4B400] px-6 text-sm font-bold text-[#0B0B0B] shadow-lg shadow-[#F4B400]/20 hover:bg-[#E5A600] sm:w-auto"
          >
            <Plus className="size-4" />
            Add Equipment
          </Button>
        </div>
      </form>
    </div>
  )
}

export default AddOwnerEquipmentPage

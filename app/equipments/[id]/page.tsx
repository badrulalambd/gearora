import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import {
  ArrowLeft,
  Box,
  FileText,
  Mail,
  MapPin,
  Package,
  ScrollText,
  ShieldCheck,
  UserRound,
  Wrench,

} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { getEquipmentById } from "@/lib/api/equipment"
import { IEquipmentType } from "@/type/type"
import EquipmentActions from "@/components/equipment/EquipmentActions"

interface EquipmentDetailPageProps {
  params: Promise<{ id: string }>
}

const specItems = (equipment: IEquipmentType) => [
  { label: "Category", value: equipment.category, icon: Package },
  { label: "Brand", value: equipment.brand, icon: Box },
  { label: "Model", value: equipment.model, icon: Wrench },
  { label: "Condition", value: equipment.condition, icon: ShieldCheck },
  {
    label: "Available Quantity",
    value: String(equipment.quantity),
    icon: Box,
  },
]

const EquipmentDetailPage = async ({ params }: EquipmentDetailPageProps) => {
  const { id } = await params

  let equipment: IEquipmentType | null = null
  let serverError = false

  try {
    equipment = await getEquipmentById(id)
  } catch (error) {
    console.error("Failed to fetch equipment:", error)
    serverError = true
  }

  if (serverError) {
    return (
      <div className="py-5 md:py-10 px-5 mx-auto w-full max-w-5xl">
        <div className="flex min-h-100 flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card px-6 py-12 text-center">
          <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-red-500/10">
            <Package className="h-8 w-8 text-red-500" />
          </div>

          <h2 className="text-xl font-bold text-foreground sm:text-2xl">
            Unable to Load Equipment
          </h2>

          <p className="mt-3 max-w-md text-sm leading-6 text-muted-foreground">
            We&apos;re having trouble loading this equipment right now. Please
            try again in a moment.
          </p>

          <Link
            href="/equipments"
            className="mt-6 inline-flex h-9 items-center gap-2 rounded-lg bg-[#F4B400] px-4 text-sm font-bold text-[#0B0B0B] transition-colors hover:bg-[#E5A600]"
          >
            <ArrowLeft className="size-4" />
            Back to all equipment
          </Link>
        </div>
      </div>
    )
  }

  if (!equipment) notFound()

  const available = equipment.quantity > 0

  return (
    <div className="py-5 md:py-10 px-5 md:px-5 mx-auto w-full max-w-6xl space-y-6">
      {/* Back link */}
      <Link
        href="/equipments"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-[#B98100] dark:hover:text-[#F4B400]"
      >
        <ArrowLeft className="size-4" />
        Back to all equipment
      </Link>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border bg-muted">
          {equipment.image ? (
            <Image
              src={equipment.image}
              alt={equipment.name}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          ) : (
            <span className="flex h-full w-full items-center justify-center">
              <Package className="size-16 text-muted-foreground" />
            </span>
          )}

          <div className="absolute top-4 left-4 flex flex-wrap gap-2">
            <Badge className="bg-[#F4B400]/15 text-[#B98100] hover:bg-[#F4B400]/15 dark:text-[#F4B400]">
              {equipment.category}
            </Badge>
            {available ? (
              <Badge className="bg-emerald-500/15 text-emerald-600 hover:bg-emerald-500/15 dark:text-emerald-400">
                Available
              </Badge>
            ) : (
              <Badge className="bg-red-500/15 text-red-600 hover:bg-red-500/15 dark:text-red-400">
                Out of Stock
              </Badge>
            )}
          </div>
        </div>

        {/* Summary */}
        <div className="flex flex-col gap-5">
          <div>
            <h1 className="font-(family-name:--font-space-grotesk) text-2xl font-bold text-foreground sm:text-3xl">
              {equipment.name}
            </h1>
            <p className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
              <MapPin className="size-4 shrink-0 text-[#B98100] dark:text-[#F4B400]" />
              {equipment.location}
            </p>
          </div>

          {/* Price */}
          <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
            <p className="text-xs font-medium text-muted-foreground">
              Rental Price
            </p>
            <p className="mt-1 text-3xl font-bold text-foreground">
              ${equipment.rentalPrice}
              <span className="ml-1.5 text-sm font-normal text-muted-foreground">
                / {equipment.rentalType}
              </span>
            </p>
            <p
              className={
                available
                  ? "mt-3 flex items-center gap-1.5 text-sm font-medium text-emerald-600 dark:text-emerald-400"
                  : "mt-3 flex items-center gap-1.5 text-sm font-medium text-red-600 dark:text-red-400"
              }
            >
              <span
                className={
                  available
                    ? "size-2 animate-pulse rounded-full bg-emerald-500"
                    : "size-2 animate-pulse rounded-full bg-red-500"
                }
              />
              {available
                ? `${equipment.quantity} unit${equipment.quantity === 1 ? "" : "s"} available now`
                : "Currently out of stock"}
            </p>
          </div>

          {/* Specs */}
          <div className="grid grid-cols-2 gap-4 rounded-2xl border border-border bg-card p-5 shadow-sm sm:grid-cols-3">
            {specItems(equipment).map((spec) => (
              <div key={spec.label} className="space-y-1.5">
                <p className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                  <spec.icon className="size-3.5 text-[#B98100] dark:text-[#F4B400]" />
                  {spec.label}
                </p>
                <p className="truncate text-sm font-semibold text-foreground">
                  {spec.value || "—"}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Description & rental terms */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="shadow-sm">
          <CardHeader className="border-b border-border pb-4">
            <div className="flex items-center gap-3">
              <span className="rounded-lg bg-[#F4B400]/15 p-2.5">
                <FileText className="size-5 text-[#B98100] dark:text-[#F4B400]" />
              </span>
              <div className="min-w-0">
                <CardTitle className="font-(family-name:--font-space-grotesk) text-lg font-semibold">
                  Description
                </CardTitle>
                <CardDescription className="mt-1">
                  What this equipment offers.
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm leading-6 whitespace-pre-wrap text-muted-foreground">
              {equipment.description || "No description provided."}
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="border-b border-border pb-4">
            <div className="flex items-center gap-3">
              <span className="rounded-lg bg-[#F4B400]/15 p-2.5">
                <ScrollText className="size-5 text-[#B98100] dark:text-[#F4B400]" />
              </span>
              <div className="min-w-0">
                <CardTitle className="font-(family-name:--font-space-grotesk) text-lg font-semibold">
                  Rental Terms
                </CardTitle>
                <CardDescription className="mt-1">
                  Conditions that apply to this rental.
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm leading-6 whitespace-pre-wrap text-muted-foreground">
              {equipment.rentalTerms || "No rental terms provided."}
            </p>
          </CardContent>
        </Card>
      </div>
      {/* Owner Information */}
      <Card className="shadow-sm">
        <CardHeader className="border-b border-border pb-4">
          <div className="flex items-center gap-3">
            <span className="rounded-lg bg-[#F4B400]/15 p-2.5">
              <UserRound className="size-5 text-[#B98100] dark:text-[#F4B400]" />
            </span>

            <div className="min-w-0">
              <CardTitle className="font-(family-name:--font-space-grotesk) text-lg font-semibold">
                Owner Information
              </CardTitle>

              <CardDescription className="mt-1">
                Contact details of the equipment owner.
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <p className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
              <UserRound className="size-3.5 text-[#B98100] dark:text-[#F4B400]" />
              Owner Name
            </p>

            <p className="text-sm font-semibold text-foreground">
              {equipment.ownerName || "—"}
            </p>
          </div>

          <div className="space-y-1.5">
            <p className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
              <Mail className="size-3.5 text-[#B98100] dark:text-[#F4B400]" />
              Owner Email
            </p>

            <p className="break-all text-sm font-semibold text-foreground">
              {equipment.ownerEmail || "—"}
            </p>
          </div>
        </CardContent>
      </Card>
      {/* Equipment Actions */}
      <EquipmentActions />
    </div>
  )
}

export default EquipmentDetailPage

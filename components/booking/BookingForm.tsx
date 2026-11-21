"use client"

import { useState } from "react"
import {
  Calculator,
  CalendarDays,
  CheckCircle2,
  CreditCard,
  LoaderCircle,
  MapPin,
  MessageSquareText,
  Package,
  Phone,
} from "lucide-react"
import toast from "react-hot-toast"

import { FormField } from "@/components/dashboard/FormField"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { createBooking } from "@/lib/action/booking"
import { IEquipmentType, TCommonApiResponse } from "@/type/type"

interface BookingFormProps {
  equipment: IEquipmentType
  customerEmail: string
  customerId?: string
}

const inputClasses =
  "h-11 focus-visible:border-[#F4B400]/60 focus-visible:ring-[#F4B400]/25"

const textareaClasses =
  "focus-visible:border-[#F4B400]/60 focus-visible:ring-[#F4B400]/25"

const today = () => new Date().toISOString().slice(0, 10)

//Same simple duration calculation as the server
const durationUnits = (
  rentalType: string,
  startDate: string,
  endDate: string
) => {
  const days = Math.max(
    1,
    Math.ceil(
      (new Date(endDate).getTime() - new Date(startDate).getTime()) / 86400000
    )
  )
  if (rentalType === "weekly") return { days, units: Math.ceil(days / 7) }
  if (rentalType === "monthly") return { days, units: Math.ceil(days / 30) }
  return { days, units: days }
}

const BookingForm = ({
  equipment,
  customerEmail,
  customerId,
}: BookingFormProps) => {
  const [form, setForm] = useState({
    startDate: "",
    endDate: "",
    quantity: "1",
    contactNumber: "",
    deliveryAddress: "",
    notes: "",
  })
  const [calculation, setCalculation] = useState<{
    days: number
    units: number
    total: number
  } | null>(null)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const available = equipment.quantity > 0

  const handleChange =
    (key: keyof typeof form) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((previous) => ({ ...previous, [key]: event.target.value }))
      //Any change invalidates the previous total
      setCalculation(null)
      setError("")
    }

  const validate = (): string => {
    if (!available) return "This equipment is currently out of stock."
    if (!form.startDate) return "Please select a rental start date."
    if (form.startDate < today())
      return "Rental start date cannot be in the past."
    if (!form.endDate) return "Please select a rental end date."
    if (form.endDate < form.startDate)
      return "Rental end date must be on or after the start date."

    const quantity = Number.parseInt(form.quantity, 10)
    if (!Number.isFinite(quantity) || quantity < 1)
      return "Please enter a valid quantity."
    if (quantity > equipment.quantity)
      return `Only ${equipment.quantity} unit(s) are available for this equipment.`

    if (!form.contactNumber.trim()) return "Please enter a contact number."
    if (!form.deliveryAddress.trim()) return "Please enter a delivery address."
    return ""
  }

  const handleCalculate = () => {
    const validationError = validate()
    if (validationError) {
      setError(validationError)
      setCalculation(null)
      return
    }

    const { days, units } = durationUnits(
      equipment.rentalType,
      form.startDate,
      form.endDate
    )
    const quantity = Number.parseInt(form.quantity, 10)
    const total = equipment.rentalPrice * units * quantity

    setError("")
    setCalculation({ days, units, total })
  }

  const handleBookNow = async () => {
    const validationError = validate()
    if (validationError) {
      setError(validationError)
      return
    }
    if (!calculation) {
      setError("Please calculate the total rental amount first.")
      return
    }

    try {
      setLoading(true)
      const res = (await createBooking({
        equipmentId: equipment._id,
        customerEmail,
        customerId,
        startDate: form.startDate,
        endDate: form.endDate,
        quantity: Number.parseInt(form.quantity, 10),
        contactNumber: form.contactNumber,
        deliveryAddress: form.deliveryAddress,
        notes: form.notes,
      })) as TCommonApiResponse<{ redirectUrl: string }> | undefined

      if (res?.success) {
        toast.success("Redirecting to payment...")
        window.location.href = res.data.redirectUrl
      } else {
        toast.error(res?.message || "Failed to start checkout.")
      }
    } catch (err) {
      console.error(err)
      toast.error("Something went wrong.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-5">
      {/* Availability */}
      <p
        className={
          available
            ? "flex items-center gap-2 text-sm font-medium text-emerald-600 dark:text-emerald-400"
            : "flex items-center gap-2 text-sm font-medium text-red-600 dark:text-red-400"
        }
      >
        <Package className="size-4" />
        {available
          ? `${equipment.quantity} unit(s) available for this rental`
          : "Currently out of stock"}
      </p>

      {/* Booking fields */}
      <div className="grid gap-4 sm:grid-cols-2">
        <FormField
          label="Rental Start Date"
          icon={CalendarDays}
          htmlFor="startDate"
          required
        >
          <Input
            id="startDate"
            type="date"
            min={today()}
            value={form.startDate}
            onChange={handleChange("startDate")}
            className={inputClasses}
          />
        </FormField>

        <FormField
          label="Rental End Date"
          icon={CalendarDays}
          htmlFor="endDate"
          required
        >
          <Input
            id="endDate"
            type="date"
            min={form.startDate || today()}
            value={form.endDate}
            onChange={handleChange("endDate")}
            className={inputClasses}
          />
        </FormField>

        <FormField
          label={`Required Quantity (max ${equipment.quantity})`}
          icon={Package}
          htmlFor="quantity"
          required
        >
          <Input
            id="quantity"
            type="number"
            min={1}
            max={equipment.quantity}
            value={form.quantity}
            onChange={handleChange("quantity")}
            className={inputClasses}
          />
        </FormField>

        <FormField
          label="Contact Number"
          icon={Phone}
          htmlFor="contactNumber"
          required
        >
          <Input
            id="contactNumber"
            type="tel"
            placeholder="e.g. +880 1712-345678"
            value={form.contactNumber}
            onChange={handleChange("contactNumber")}
            className={inputClasses}
          />
        </FormField>

        <FormField
          label="Delivery Address"
          icon={MapPin}
          htmlFor="deliveryAddress"
          required
          className="sm:col-span-2"
        >
          <Input
            id="deliveryAddress"
            type="text"
            placeholder="Where should the equipment be delivered?"
            value={form.deliveryAddress}
            onChange={handleChange("deliveryAddress")}
            className={inputClasses}
          />
        </FormField>

        <FormField
          label="Additional Notes"
          icon={MessageSquareText}
          htmlFor="notes"
          className="sm:col-span-2"
        >
          <Textarea
            id="notes"
            rows={3}
            placeholder="Anything the owner should know (optional)"
            value={form.notes}
            onChange={handleChange("notes")}
            className={textareaClasses}
          />
        </FormField>
      </div>

      {error && (
        <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-2.5 text-sm font-medium text-red-600 dark:text-red-400">
          {error}
        </p>
      )}

      {/* Total calculation */}
      <div className="space-y-3 rounded-xl border border-border bg-muted/30 p-4">
        <Button
          type="button"
          variant="outline"
          onClick={handleCalculate}
          className="h-10 gap-2 border-[#F4B400]/50 font-semibold text-[#B98100] hover:bg-[#F4B400]/10 hover:text-[#B98100] dark:text-[#F4B400]"
        >
          <Calculator className="size-4" />
          Calculate Total
        </Button>

        {calculation && (
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg bg-[#F4B400]/10 px-4 py-3">
            <div className="text-sm text-muted-foreground">
              <p>
                {calculation.days} day{calculation.days === 1 ? "" : "s"} rental
                · {calculation.units} × {equipment.rentalType} × {form.quantity}{" "}
                unit{form.quantity === "1" ? "" : "s"}
              </p>
              <p className="mt-0.5 flex items-center gap-1.5 font-medium text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="size-3.5" />
                Available for the selected dates
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs font-medium text-muted-foreground">
                Total Rental Amount
              </p>
              <p className="text-2xl font-bold text-foreground">
                ${calculation.total}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Pay with Stripe */}
      <Button
        type="button"
        onClick={handleBookNow}
        disabled={loading || !calculation}
        className="h-12 w-full rounded-xl bg-[#F4B400] text-base font-bold text-[#0B0B0B] shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#DFA300] hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
      >
        {loading ? (
          <>
            <LoaderCircle className="size-4 animate-spin" />
            Processing...
          </>
        ) : (
          <>
            <CreditCard className="size-4" />
            Book Now
          </>
        )}
      </Button>

      <p className="text-center text-xs text-muted-foreground">
        You&apos;ll be redirected to Stripe to pay securely by card.
      </p>
    </div>
  )
}

export default BookingForm

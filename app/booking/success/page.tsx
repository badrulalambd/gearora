import Link from "next/link"
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  Package,
  ReceiptText,
  XCircle,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { confirmBooking } from "@/lib/action/booking"
import { IBookingType } from "@/type/type"

interface SuccessPageProps {
  searchParams: Promise<{ session_id?: string }>
}

const formatDate = (value: string) =>
  new Date(value).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })

const SuccessPage = async ({ searchParams }: SuccessPageProps) => {
  const { session_id } = await searchParams

  let booking: IBookingType | null = null

  if (session_id) {
    try {
      const res = await confirmBooking(session_id)
      if (res?.success) booking = res.data.booking
    } catch (error) {
      console.error("Failed to confirm booking:", error)
    }
  }

  // Payment session missing or could not be confirmed
  if (!booking) {
    return (
      <div className="mx-auto w-full max-w-2xl px-5 py-12">
        <Card className="shadow-sm">
          <CardHeader className="border-b border-border pb-4 text-center">
            <span className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-500/10">
              <XCircle className="h-9 w-9 text-red-500" />
            </span>
            <CardTitle className="font-(family-name:--font-space-grotesk) text-2xl font-bold">
              Unable to Confirm Payment
            </CardTitle>
            <CardDescription className="mt-2 text-sm leading-6">
              We couldn&apos;t find a completed payment for this session. If you
              just paid, please check again in a moment.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-3 p-6 sm:flex-row sm:justify-center">
            <Button
              render={<Link href="/equipments" />}
              nativeButton={false}
              className="rounded-xl bg-[#F4B400] font-semibold text-black hover:bg-[#DFA300]"
            >
              Browse Equipment
            </Button>
            <Button
              render={<Link href="/dashboard/customer/my-rentals" />}
              nativeButton={false}
              variant="outline"
              className="rounded-xl font-semibold"
            >
              View My Rentals
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="mx-auto w-full max-w-2xl px-5 py-12">
      <Card className="shadow-sm">
        {/* Success header */}
        <CardHeader className="border-b border-border pb-6 text-center">
          <span className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10">
            <CheckCircle2 className="h-9 w-9 text-emerald-500" />
          </span>
          <CardTitle className="font-(family-name:--font-space-grotesk) text-2xl font-bold">
            Payment Successful!
          </CardTitle>
          <CardDescription className="mt-2 text-sm leading-6">
            Your booking has been confirmed and saved. A copy of the payment
            details is recorded with your rental.
          </CardDescription>
        </CardHeader>

        {/* Booking summary */}
        <CardContent className="space-y-4 p-6">
          <div className="flex items-center justify-between gap-3 rounded-xl border border-border bg-muted/30 p-4">
            <div className="flex min-w-0 items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#F4B400]/15">
                <Package className="h-5 w-5 text-[#B98100] dark:text-[#F4B400]" />
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-foreground">
                  {booking.equipmentName || "Equipment"}
                </p>
                <p className="mt-0.5 flex items-center gap-1.5 text-xs text-muted-foreground">
                  <CalendarDays className="size-3.5" />
                  {formatDate(booking.startDate)} –{" "}
                  {formatDate(booking.endDate)}
                </p>
              </div>
            </div>
            <Badge className="shrink-0 bg-emerald-500/15 text-emerald-600 hover:bg-emerald-500/15 dark:text-emerald-400">
              Confirmed
            </Badge>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[#F4B400]/30 bg-[#F4B400]/10 p-4">
            <div className="flex items-center gap-2 text-sm font-medium text-foreground">
              <ReceiptText className="size-4 text-[#B98100] dark:text-[#F4B400]" />
              Total Paid
            </div>
            <p className="text-xl font-bold text-foreground">
              ${booking.totalAmount}
            </p>
          </div>

          {booking.transactionId && (
            <p className="text-center text-xs break-all text-muted-foreground">
              Transaction ID:{" "}
              <span className="font-mono">{booking.transactionId}</span>
            </p>
          )}

          {/* Actions */}
          <div className="flex flex-col gap-3 pt-2 sm:flex-row">
            <Button
              render={<Link href="/dashboard/customer/my-rentals" />}
              nativeButton={false}
              className="flex-1 rounded-xl bg-[#F4B400] font-bold text-[#0B0B0B] hover:bg-[#E5A600]"
            >
              View My Rentals
            </Button>
            <Button
              render={<Link href={`/equipments/${booking.equipmentId}`} />}
              nativeButton={false}
              variant="outline"
              className="flex-1 gap-1.5 rounded-xl font-semibold"
            >
              <ArrowLeft className="size-4" />
              Back to Equipment
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default SuccessPage

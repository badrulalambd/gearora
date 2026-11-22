import { headers } from "next/headers"
import Image from "next/image"
import { CalendarDays, UserRound } from "lucide-react"

import {
  AccessDenied,
  NoRecords,
  UnableToConnect,
} from "@/components/admin/AdminPageStates"
import RentalsFilter from "@/components/admin/RentalsFilter"
import { statusBadgeClasses } from "@/components/admin/statusBadgeClasses"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { getAllBookings } from "@/lib/action/booking"
import { auth } from "@/lib/auth"
import { IAdminBookingType } from "@/type/type"

interface AllRentalsPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

//Only these equipment statuses are valid backend filter values.
const STATUSES = ["Pending", "Approved", "Rejected"]

const readParam = (value: string | string[] | undefined) =>
  typeof value === "string" ? value.trim() : ""

const formatDate = (value: string) =>
  new Date(value).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })

const AllRentalsPage = async ({ searchParams }: AllRentalsPageProps) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session || session.user.role !== "admin") {
    return <AccessDenied signedIn={Boolean(session)} />
  }

  const params = await searchParams
  const requested = readParam(params.status)
  const status = STATUSES.includes(requested) ? requested : ""

  //The backend applies the filter while reading from the database.
  let bookings: IAdminBookingType[] = []
  let serverError = false

  try {
    bookings = await getAllBookings(status)
  } catch (error) {
    console.error("Failed to fetch bookings:", error)
    serverError = true
  }

  if (serverError) {
    return (
      <UnableToConnect
        subject="rental records"
        href="/dashboard/admin/rentals"
      />
    )
  }

  return (
    <div className="space-y-6">
      {/* Page heading */}
      <div className="flex items-start gap-4">
        <span className="rounded-xl bg-[#F4B400]/15 p-3">
          <CalendarDays className="size-6 text-[#B98100] dark:text-[#F4B400]" />
        </span>
        <div className="min-w-0">
          <h1 className="font-(family-name:--font-space-grotesk) text-2xl font-bold text-foreground sm:text-3xl">
            All Rentals
          </h1>
          <p className="mt-1.5 max-w-2xl text-sm leading-6 text-muted-foreground">
            Monitor every rental booking with customer, owner, payment and
            booking details.
          </p>
        </div>
      </div>

      {/* Result count + backend status filter */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">
            {bookings.length}
          </span>{" "}
          {bookings.length === 1 ? "rental" : "rentals"} found
        </p>
        {/* Filter on the all rentals page */}
        <RentalsFilter status={status} />
      </div>

      {bookings.length === 0 ? (
        <NoRecords
          title="No Rentals Found"
          message={
            status
              ? `There are no rentals for equipment with ${status} status.`
              : "Rental bookings will show up here as soon as customers start booking equipment."
          }
          icon={
            <CalendarDays className="size-8 text-[#B98100] dark:text-[#F4B400]" />
          }
        />
      ) : (
        <Card className="shadow-sm">
          <CardHeader className="border-b border-border pb-4">
            <CardTitle className="font-(family-name:--font-space-grotesk) text-lg font-semibold">
              Rental Bookings
            </CardTitle>
            <CardDescription className="mt-1">
              {status
                ? `Showing equipment with ${status} status.`
                : "Showing all equipment statuses."}
            </CardDescription>
          </CardHeader>

          <CardContent className="p-4 sm:p-5">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer Information</TableHead>
                    <TableHead>Owner Information</TableHead>
                    <TableHead>Equipment Name</TableHead>
                    <TableHead>Rental Duration</TableHead>
                    <TableHead>Booking Amount</TableHead>
                    <TableHead>Payment Status</TableHead>
                    <TableHead>Booking Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {bookings.map((booking) => (
                    <TableRow key={booking._id}>
                      {/* Customer */}
                      <TableCell>
                        <div className="flex items-center gap-3">
                          {booking.customerImage ? (
                            <Image
                              src={booking.customerImage}
                              alt={booking.customerName || "Customer"}
                              width={36}
                              height={36}
                              className="size-9 shrink-0 rounded-full object-cover"
                            />
                          ) : (
                            <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-muted">
                              <UserRound className="size-4 text-muted-foreground" />
                            </span>
                          )}
                          <div className="min-w-0">
                            <p className="truncate font-semibold text-foreground">
                              {booking.customerName}
                            </p>
                            <p className="truncate text-xs text-muted-foreground">
                              {booking.customerEmail}
                            </p>
                          </div>
                        </div>
                      </TableCell>

                      {/* Owner */}
                      <TableCell>
                        <p className="font-semibold text-foreground">
                          {booking.ownerName || "—"}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {booking.ownerEmail}
                        </p>
                      </TableCell>

                      {/* Equipment */}
                      <TableCell>
                        <div className="flex items-center gap-3">
                          {booking.equipmentImage ? (
                            <Image
                              src={booking.equipmentImage}
                              alt={booking.equipmentName || "Equipment"}
                              width={44}
                              height={44}
                              className="size-11 shrink-0 rounded-lg object-cover"
                            />
                          ) : (
                            <span className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-muted">
                              <CalendarDays className="size-5 text-muted-foreground" />
                            </span>
                          )}
                          <div className="min-w-0">
                            <p className="truncate font-semibold text-foreground">
                              {booking.equipmentName}
                            </p>
                            {booking.equipmentStatus && (
                              <Badge
                                className={
                                  statusBadgeClasses[booking.equipmentStatus]
                                }
                              >
                                {booking.equipmentStatus}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </TableCell>

                      {/* Rental duration */}
                      <TableCell className="text-muted-foreground">
                        <span className="text-foreground">
                          {formatDate(booking.startDate)} –{" "}
                          {formatDate(booking.endDate)}
                        </span>
                        {booking.durationUnits ? (
                          <span className="block text-xs">
                            {booking.durationUnits} × {booking.rentalType}
                          </span>
                        ) : null}
                      </TableCell>

                      {/* Booking amount */}
                      <TableCell className="font-semibold text-foreground">
                        ${booking.totalAmount}
                      </TableCell>

                      {/* Payment status */}
                      <TableCell>
                        <Badge
                          className={
                            booking.paymentStatus === "confirmed"
                              ? "bg-emerald-500/15 text-emerald-600 hover:bg-emerald-500/15 dark:text-emerald-400"
                              : "bg-amber-500/15 text-amber-600 hover:bg-amber-500/15 dark:text-amber-400"
                          }
                        >
                          {booking.paymentStatus === "confirmed"
                            ? "Paid"
                            : "Pending"}
                        </Badge>
                      </TableCell>

                      {/* Booking status */}
                      <TableCell>
                        <Badge
                          className={
                            booking.status === "confirmed"
                              ? "bg-emerald-500/15 text-emerald-600 hover:bg-emerald-500/15 dark:text-emerald-400"
                              : "bg-amber-500/15 text-amber-600 hover:bg-amber-500/15 dark:text-amber-400"
                          }
                        >
                          {booking.status === "confirmed"
                            ? "Confirmed"
                            : "Pending"}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default AllRentalsPage

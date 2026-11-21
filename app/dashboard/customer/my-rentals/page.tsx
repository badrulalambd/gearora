import Image from "next/image"
import Link from "next/link"
import { headers } from "next/headers"
import { AlertTriangle, CalendarDays, Package, ServerCrash } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
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
import { getMyRentals } from "@/lib/action/booking"
import { auth } from "@/lib/auth"
import { IBookingType } from "@/type/type"

const formatDate = (value: string) =>
  new Date(value).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })

const MyRentalsPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) {
    return (
      <div className="flex min-h-100 flex-col items-center justify-center rounded-2xl border border-border bg-card p-8 text-center">
        <AlertTriangle className="mb-4 h-12 w-12 text-[#F4B400]" />
        <h2 className="text-xl font-bold text-foreground">
          Authentication Required
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Please log in to view your rentals.
        </p>
        <Button
          render={<Link href="/sign-in" />}
          nativeButton={false}
          className="mt-6 bg-[#F4B400] text-black hover:bg-[#DFA300]"
        >
          Sign In
        </Button>
      </div>
    )
  }

  let rentals: IBookingType[] = []
  let serverError = false

  try {
    rentals = await getMyRentals(session.user.email)
  } catch (error) {
    console.error("Failed to fetch rentals:", error)
    serverError = true
  }

  // Backend server error fallback
  if (serverError) {
    return (
      <div className="flex min-h-100 flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card px-6 py-12 text-center">
        <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-red-500/10">
          <ServerCrash className="h-8 w-8 text-red-500" />
        </div>

        <h2 className="text-xl font-bold text-foreground sm:text-2xl">
          Unable to Connect to Server
        </h2>

        <p className="mt-3 max-w-md text-sm leading-6 text-muted-foreground">
          We&apos;re having trouble loading your rentals right now. Please try
          again in a moment.
        </p>
      </div>
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
            My Rentals
          </h1>
          <p className="mt-1.5 max-w-2xl text-sm leading-6 text-muted-foreground">
            Rental bookings you&apos;ve confirmed, with payment and rental
            details.
          </p>
        </div>
      </div>

      {/* Empty state */}
      {rentals.length === 0 ? (
        <div className="flex min-h-80 flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card px-6 py-12 text-center">
          <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#F4B400]/15">
            <Package className="h-8 w-8 text-[#B98100] dark:text-[#F4B400]" />
          </div>

          <h2 className="text-xl font-bold text-foreground sm:text-2xl">
            No Rentals Yet
          </h2>

          <p className="mt-3 max-w-md text-sm leading-6 text-muted-foreground">
            You haven&apos;t booked any equipment yet. Find something you need
            and book it — your confirmed rentals will show up here.
          </p>

          <Button
            render={<Link href="/equipments" />}
            nativeButton={false}
            className="mt-6 rounded-xl bg-[#F4B400] font-semibold text-black hover:bg-[#DFA300]"
          >
            Browse Equipment
          </Button>
        </div>
      ) : (
        /* Confirmed rentals table */
        <Card className="shadow-sm">
          <CardHeader className="border-b border-border pb-4">
            <CardTitle className="font-(family-name:--font-space-grotesk) text-lg font-semibold">
              Confirmed Rentals
            </CardTitle>
            <CardDescription className="mt-1">
              {rentals.length} {rentals.length === 1 ? "rental" : "rentals"}{" "}
              confirmed by you.
            </CardDescription>
          </CardHeader>

          <CardContent className="p-4 sm:p-5">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Equipment</TableHead>
                  <TableHead>Rental Period</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rentals.map((rental) => (
                  <TableRow key={rental._id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        {rental.equipmentImage ? (
                          <Image
                            src={rental.equipmentImage}
                            alt={rental.equipmentName || "Equipment"}
                            width={44}
                            height={44}
                            className="size-11 shrink-0 rounded-lg object-cover"
                          />
                        ) : (
                          <span className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-muted">
                            <Package className="size-5 text-muted-foreground" />
                          </span>
                        )}
                        <span className="font-semibold text-foreground">
                          {rental.equipmentName || "Equipment"}
                        </span>
                      </div>
                    </TableCell>

                    <TableCell className="text-muted-foreground">
                      {formatDate(rental.startDate)} –{" "}
                      {formatDate(rental.endDate)}
                    </TableCell>

                    <TableCell className="font-semibold text-foreground">
                      {rental.quantity}
                    </TableCell>

                    <TableCell className="font-semibold text-foreground">
                      ${rental.totalAmount}
                    </TableCell>

                    <TableCell>
                      <Badge className="bg-emerald-500/15 text-emerald-600 hover:bg-emerald-500/15 dark:text-emerald-400">
                        Confirmed
                      </Badge>
                    </TableCell>

                    <TableCell className="text-right">
                      <Button
                        render={
                          <Link href={`/equipments/${rental.equipmentId}`} />
                        }
                        nativeButton={false}
                        size="sm"
                        className="h-9 rounded-lg bg-[#F4B400] px-3 text-sm font-bold text-[#0B0B0B] hover:bg-[#E5A600]"
                      >
                        View Detail
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default MyRentalsPage

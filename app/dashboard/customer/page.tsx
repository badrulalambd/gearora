import Link from "next/link"
import Image from "next/image"
import { headers } from "next/headers"
import {
  Bookmark,
  CalendarDays,
  Clock,
  DollarSign,
  LayoutDashboard,
  Package,
} from "lucide-react"

import {
  AccessDenied,
  UnableToConnect,
} from "@/components/admin/AdminPageStates"
import DashboardHeading from "@/components/dashboard/DashboardHeading"
import MonthlyChart from "@/components/dashboard/MonthlyChart"
import StatCard from "@/components/dashboard/StatCard"
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
import { getCustomerStats } from "@/lib/api/stats"
import { auth } from "@/lib/auth"
import { ICustomerStats } from "@/type/type"

const formatDate = (value: string) =>
  new Date(value).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })

const CustomerDashboardPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) {
    return <AccessDenied message="Please log in to view your dashboard." />
  }

  let stats: ICustomerStats | null = null
  let serverError = false

  try {
    stats = await getCustomerStats(session.user.email)
  } catch (error) {
    console.error("Failed to fetch customer stats:", error)
    serverError = true
  }

  if (serverError || !stats) {
    return (
      <UnableToConnect subject="your dashboard" href="/dashboard/customer" />
    )
  }

  const firstName = session.user.name?.split(" ")[0] || "there"
  const favorites = stats.favorites.slice(0, 6)
  const rentals = stats.rentals.slice(0, 6)

  return (
    <div className="space-y-6">
      <DashboardHeading
        icon={LayoutDashboard}
        title={`Welcome back, ${firstName}`}
        description="Here's a snapshot of your saved equipment and rental activity."
      />

      {/* Key metrics */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Saved Equipment"
          value={stats.totalFavorites}
          hint="Bookmarked for later"
          icon={Bookmark}
          accent="gold"
        />
        <StatCard
          label="Total Rentals"
          value={stats.totalRentals}
          hint="Booking requests you made"
          icon={CalendarDays}
          accent="blue"
        />
        <StatCard
          label="Pending Requests"
          value={stats.pendingRentals}
          hint="Awaiting confirmation"
          icon={Clock}
          accent="amber"
        />
        <StatCard
          label="Total Spent"
          value={`$${stats.totalSpent.toLocaleString()}`}
          hint="On confirmed rentals"
          icon={DollarSign}
          accent="green"
        />
      </div>

      {/* Rental activity trend */}
      <MonthlyChart
        title="Rentals per Month"
        description="Your confirmed rentals over the last 6 months."
        data={stats.monthlyRentals}
      />

      {/* Saved equipment */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="font-(family-name:--font-space-grotesk) text-lg font-bold text-foreground">
              Saved Equipment
            </h2>
            <p className="text-sm text-muted-foreground">
              Gear you bookmarked for later.
            </p>
          </div>
          <Button
            render={<Link href="/dashboard/customer/saved-rentals" />}
            nativeButton={false}
            variant="outline"
            size="sm"
            className="h-9 rounded-lg"
          >
            View all
          </Button>
        </div>

        {favorites.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card px-6 py-10 text-center">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F4B400]/15">
              <Bookmark className="size-7 text-[#B98100] dark:text-[#F4B400]" />
            </div>
            <h3 className="text-lg font-bold text-foreground">
              No Saved Equipment Yet
            </h3>
            <p className="mt-2 max-w-md text-sm text-muted-foreground">
              Browse equipment and add it to your favorites to keep it here.
            </p>
            <Button
              render={<Link href="/equipments" />}
              nativeButton={false}
              className="mt-5 rounded-xl bg-[#F4B400] font-semibold text-black hover:bg-[#E5A600]"
            >
              Browse Equipment
            </Button>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {favorites.map((favorite) => (
              <Link
                key={favorite._id}
                href={`/equipments/${favorite.equipmentId}`}
                className="group overflow-hidden rounded-xl border border-border bg-card transition-colors hover:border-[#F4B400]/60"
              >
                <div className="relative aspect-video bg-muted">
                  {favorite.equipmentImage ? (
                    <Image
                      src={favorite.equipmentImage}
                      alt={favorite.equipmentName}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <span className="flex h-full items-center justify-center">
                      <Package className="size-8 text-muted-foreground" />
                    </span>
                  )}
                </div>
                <div className="p-3">
                  <p className="truncate text-sm font-semibold text-foreground group-hover:text-[#F4B400]">
                    {favorite.equipmentName}
                  </p>
                  <div className="mt-1.5 flex items-center justify-between gap-2">
                    <span className="truncate text-xs text-muted-foreground">
                      {favorite.category}
                    </span>
                    <span className="shrink-0 text-sm font-bold text-foreground">
                      ${favorite.rentalPrice}
                      <span className="text-xs font-normal text-muted-foreground">
                        /{favorite.rentalType}
                      </span>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Rental history */}
      <Card className="shadow-sm">
        <CardHeader className="border-b border-border pb-4">
          <CardTitle className="font-(family-name:--font-space-grotesk) text-lg font-semibold">
            My Rentals
          </CardTitle>
          <CardDescription className="mt-1">
            Your most recent booking activity.
          </CardDescription>
        </CardHeader>

        <CardContent className="p-4 sm:p-5">
          {rentals.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card px-6 py-10 text-center">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F4B400]/15">
                <CalendarDays className="size-7 text-[#B98100] dark:text-[#F4B400]" />
              </div>
              <h3 className="text-lg font-bold text-foreground">
                No Rentals Yet
              </h3>
              <p className="mt-2 max-w-md text-sm text-muted-foreground">
                You haven&apos;t booked any equipment yet — your bookings will
                appear here.
              </p>
              <Button
                render={<Link href="/equipments" />}
                nativeButton={false}
                className="mt-5 rounded-xl bg-[#F4B400] font-semibold text-black hover:bg-[#E5A600]"
              >
                Find Equipment
              </Button>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Equipment</TableHead>
                      <TableHead>Rental Period</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
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
                                width={40}
                                height={40}
                                className="size-10 shrink-0 rounded-lg object-cover"
                              />
                            ) : (
                              <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted">
                                <Package className="size-4 text-muted-foreground" />
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
                          ${rental.totalAmount}
                        </TableCell>

                        <TableCell>
                          <Badge
                            className={
                              rental.status === "confirmed"
                                ? "bg-emerald-500/15 text-emerald-600 hover:bg-emerald-500/15 dark:text-emerald-400"
                                : "bg-amber-500/15 text-amber-600 hover:bg-amber-500/15 dark:text-amber-400"
                            }
                          >
                            {rental.status === "confirmed"
                              ? "Confirmed"
                              : "Pending"}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <Button
                render={<Link href="/dashboard/customer/my-rentals" />}
                nativeButton={false}
                size="sm"
                className="mt-4 h-9 rounded-lg bg-[#F4B400] px-4 text-sm font-bold text-[#0B0B0B] hover:bg-[#E5A600]"
              >
                View All Rentals
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default CustomerDashboardPage

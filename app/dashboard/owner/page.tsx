import Link from "next/link"
import { headers } from "next/headers"
import {
  BadgeCheck,
  Building2,
  DollarSign,
  Package,
  TrendingUp,
  Wallet,
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
import { getOwnerStats } from "@/lib/api/stats"
import { auth } from "@/lib/auth"
import { IOwnerStats } from "@/type/type"

const formatDate = (value: string) =>
  new Date(value).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })

const OwnerDashboardPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (
    !session ||
    (session.user.role !== "owner" && session.user.role !== "admin")
  ) {
    return (
      <AccessDenied
        signedIn={Boolean(session)}
        message={
          session
            ? "This area is restricted to equipment owner accounts."
            : "Please log in with an equipment owner account to view this page."
        }
      />
    )
  }

  let stats: IOwnerStats | null = null
  let serverError = false

  try {
    stats = await getOwnerStats(session.user.email)
  } catch (error) {
    console.error("Failed to fetch owner stats:", error)
    serverError = true
  }

  if (serverError || !stats) {
    return <UnableToConnect subject="your dashboard" href="/dashboard/owner" />
  }

  const thisMonthEarnings =
    stats.monthlyEarnings[stats.monthlyEarnings.length - 1]?.value ?? 0

  return (
    <div className="space-y-6">
      <DashboardHeading
        icon={Building2}
        title="Owner Overview"
        description="Track your rental business performance — listings, bookings and earnings in one place."
      />

      {/* Key metrics */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Total Listed Equipment"
          value={stats.totalEquipment}
          hint="Equipment you have listed"
          icon={Package}
          accent="blue"
        />
        <StatCard
          label="Completed Rentals"
          value={stats.completedRentals}
          hint="Confirmed bookings on your gear"
          icon={BadgeCheck}
          accent="green"
        />
        <StatCard
          label="Total Earnings"
          value={`$${stats.totalEarnings.toLocaleString()}`}
          hint="From all completed rentals"
          icon={DollarSign}
          accent="gold"
        />
        <StatCard
          label="Monthly Earnings"
          value={`$${thisMonthEarnings.toLocaleString()}`}
          hint="Earned this month"
          icon={TrendingUp}
          accent="violet"
        />
      </div>

      {/* Monthly earnings trend */}
      <MonthlyChart
        title="Monthly Earnings"
        description="Earnings from completed rentals over the last 6 months."
        data={stats.monthlyEarnings}
        format="currency"
      />

      {/* Latest booking activity */}
      <Card className="shadow-sm">
        <CardHeader className="border-b border-border pb-4">
          <CardTitle className="font-(family-name:--font-space-grotesk) text-lg font-semibold">
            Recent Rentals
          </CardTitle>
          <CardDescription className="mt-1">
            Latest booking activity on your equipment.
          </CardDescription>
        </CardHeader>

        <CardContent className="p-4 sm:p-5">
          {stats.recentBookings.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card px-6 py-10 text-center">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F4B400]/15">
                <Wallet className="size-7 text-[#B98100] dark:text-[#F4B400]" />
              </div>
              <h3 className="text-lg font-bold text-foreground">
                No Rentals Yet
              </h3>
              <p className="mt-2 max-w-md text-sm text-muted-foreground">
                When customers book your equipment, the rentals will show up
                here.
              </p>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Customer</TableHead>
                      <TableHead>Equipment</TableHead>
                      <TableHead>Rental Period</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {stats.recentBookings.map((booking) => (
                      <TableRow key={booking._id}>
                        <TableCell>
                          <p className="font-semibold text-foreground">
                            {booking.customerName}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {booking.customerEmail}
                          </p>
                        </TableCell>

                        <TableCell className="font-medium text-foreground">
                          {booking.equipmentName}
                        </TableCell>

                        <TableCell className="text-muted-foreground">
                          {formatDate(booking.startDate)} –{" "}
                          {formatDate(booking.endDate)}
                        </TableCell>

                        <TableCell className="font-semibold text-foreground">
                          ${booking.totalAmount}
                        </TableCell>

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

              <Button
                render={<Link href="/dashboard/owner/rentals" />}
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

export default OwnerDashboardPage

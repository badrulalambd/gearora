import Link from "next/link"
import { headers } from "next/headers"
import {
  BadgeCheck,
  CalendarDays,
  Clock,
  DollarSign,
  LayoutDashboard,
  Package,
  Users,
} from "lucide-react"
import { cn } from "cn"

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
import { getAdminStats } from "@/lib/api/stats"
import { auth } from "@/lib/auth"
import { IAdminStats } from "@/type/type"

const AdminDashboardPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session || session.user.role !== "admin") {
    return <AccessDenied signedIn={Boolean(session)} />
  }

  let stats: IAdminStats | null = null
  let serverError = false

  try {
    stats = await getAdminStats()
  } catch (error) {
    console.error("Failed to fetch admin stats:", error)
    serverError = true
  }

  if (serverError || !stats) {
    return <UnableToConnect subject="your dashboard" href="/dashboard/admin" />
  }

  const pendingBookings = stats.totalBookings - stats.completedRentals
  const bookingRows = [
    {
      label: "Confirmed",
      count: stats.completedRentals,
      bar: "bg-emerald-500",
      text: "text-emerald-600 dark:text-emerald-400",
    },
    {
      label: "Pending",
      count: pendingBookings,
      bar: "bg-amber-500",
      text: "text-amber-600 dark:text-amber-400",
    },
  ]

  return (
    <div className="space-y-6">
      <DashboardHeading
        icon={LayoutDashboard}
        title="Admin Overview"
        description="Monitor GearOra's platform performance — users, equipment, bookings and revenue, all in one place."
      />

      {/* Key metrics */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <StatCard
          label="Total Users"
          value={stats.totalUsers}
          hint="Registered accounts"
          icon={Users}
          accent="gold"
        />
        <StatCard
          label="Total Equipment"
          value={stats.totalEquipments}
          hint="Listings on the platform"
          icon={Package}
          accent="blue"
        />
        <StatCard
          label="Total Bookings"
          value={stats.totalBookings}
          hint="All-time rental requests"
          icon={CalendarDays}
          accent="violet"
        />
        <StatCard
          label="Pending Approvals"
          value={stats.pendingApprovals}
          hint="Equipment awaiting review"
          icon={Clock}
          accent="amber"
        />
        <StatCard
          label="Completed Rentals"
          value={stats.completedRentals}
          hint="Confirmed and paid bookings"
          icon={BadgeCheck}
          accent="green"
        />
        <StatCard
          label="Total Revenue"
          value={`$${stats.totalRevenue.toLocaleString()}`}
          hint="Collected from payments"
          icon={DollarSign}
          accent="green"
        />
      </div>

      {/* Monthly bookings + status breakdown */}
      <div className="grid gap-5 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <MonthlyChart
            title="Monthly Bookings"
            description="Booking requests received over the last 6 months."
            data={stats.monthlyBookings}
          />
        </div>

        <Card className="shadow-sm">
          <CardHeader className="border-b border-border pb-4">
            <CardTitle className="font-(family-name:--font-space-grotesk) text-lg font-semibold">
              Booking Status
            </CardTitle>
            <CardDescription className="mt-1">
              {stats.totalBookings} bookings recorded so far.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5 p-4 sm:p-5">
            {bookingRows.map((row) => {
              const percent = stats.totalBookings
                ? Math.round((row.count / stats.totalBookings) * 100)
                : 0

              return (
                <div key={row.label}>
                  <div className="flex items-center justify-between gap-3 text-sm">
                    <span className="font-medium text-foreground">
                      {row.label}
                    </span>
                    <span className={cn("font-semibold", row.text)}>
                      {row.count} · {percent}%
                    </span>
                  </div>
                  <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-muted">
                    <div
                      className={cn("h-full rounded-full", row.bar)}
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>
              )
            })}
          </CardContent>
        </Card>
      </div>

      {/* Listings waiting for review */}
      <Card className="shadow-sm">
        <CardHeader className="border-b border-border pb-4">
          <CardTitle className="font-(family-name:--font-space-grotesk) text-lg font-semibold">
            Pending Approvals
          </CardTitle>
          <CardDescription className="mt-1">
            Newest listings waiting for your review.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-4 sm:p-5">
          {stats.pendingEquipments.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              Nothing is waiting for review right now.
            </p>
          ) : (
            <ul className="divide-y divide-border">
              {stats.pendingEquipments.map((equipment) => (
                <li
                  key={equipment._id}
                  className="flex items-center justify-between gap-3 py-3 first:pt-0 last:pb-0"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-foreground">
                      {equipment.name}
                    </p>
                    <p className="truncate text-xs text-muted-foreground">
                      {equipment.category}
                      {equipment.ownerName ? ` · ${equipment.ownerName}` : ""}
                    </p>
                  </div>
                  <Badge className="bg-amber-500/15 text-amber-600 hover:bg-amber-500/15 dark:text-amber-400">
                    Pending
                  </Badge>
                </li>
              ))}
            </ul>
          )}

          <Button
            render={<Link href="/dashboard/admin/equipments" />}
            nativeButton={false}
            size="sm"
            className="mt-4 h-9 rounded-lg bg-[#F4B400] px-4 text-sm font-bold text-[#0B0B0B] hover:bg-[#E5A600]"
          >
            Review Equipment
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

export default AdminDashboardPage

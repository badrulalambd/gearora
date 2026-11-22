import type { LucideIcon } from "lucide-react"

import { cn } from "cn"

import { Card, CardContent } from "@/components/ui/card"

type StatAccent = "gold" | "green" | "blue" | "amber" | "red" | "violet"

const accentClasses: Record<StatAccent, string> = {
  gold: "bg-[#F4B400]/15 text-[#B98100] dark:text-[#F4B400]",
  green: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
  blue: "bg-sky-500/15 text-sky-600 dark:text-sky-400",
  amber: "bg-amber-500/15 text-amber-600 dark:text-amber-400",
  red: "bg-red-500/15 text-red-600 dark:text-red-400",
  violet: "bg-violet-500/15 text-violet-600 dark:text-violet-400",
}

interface StatCardProps {
  label: string
  value: string | number
  hint?: string
  icon: LucideIcon
  accent?: StatAccent
}

//Single KPI tile shared by the admin, owner and customer dashboards.
const StatCard = ({
  label,
  value,
  hint,
  icon: Icon,
  accent = "gold",
}: StatCardProps) => (
  <Card className="shadow-sm">
    <CardContent className="flex items-start justify-between gap-4 p-4 sm:p-5">
      <div className="min-w-0">
        <p className="text-xs font-semibold tracking-[0.12em] text-muted-foreground uppercase">
          {label}
        </p>
        <p className="mt-2 truncate font-(family-name:--font-space-grotesk) text-2xl font-bold text-foreground sm:text-3xl">
          {value}
        </p>
        {hint ? (
          <p className="mt-1.5 truncate text-xs text-muted-foreground">
            {hint}
          </p>
        ) : null}
      </div>
      <span className={cn("shrink-0 rounded-xl p-3", accentClasses[accent])}>
        <Icon className="size-5" />
      </span>
    </CardContent>
  </Card>
)

export default StatCard

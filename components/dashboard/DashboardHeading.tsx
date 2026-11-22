import type { LucideIcon } from "lucide-react"

interface DashboardHeadingProps {
  icon: LucideIcon
  title: string
  description: string
}

//Page title block used at the top of every dashboard page.
const DashboardHeading = ({
  icon: Icon,
  title,
  description,
}: DashboardHeadingProps) => (
  <div className="flex items-start gap-4">
    <span className="rounded-xl bg-[#F4B400]/15 p-3">
      <Icon className="size-6 text-[#B98100] dark:text-[#F4B400]" />
    </span>
    <div className="min-w-0">
      <h1 className="font-(family-name:--font-space-grotesk) text-2xl font-bold text-foreground sm:text-3xl">
        {title}
      </h1>
      <p className="mt-1.5 max-w-2xl text-sm leading-6 text-muted-foreground">
        {description}
      </p>
    </div>
  </div>
)

export default DashboardHeading

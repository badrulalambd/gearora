//Shared badge colors for the equipment status (Pending / Approved / Rejected).
export const statusBadgeClasses: Record<string, string> = {
  Pending:
    "bg-amber-500/15 text-amber-600 hover:bg-amber-500/15 dark:text-amber-400",
  Approved:
    "bg-emerald-500/15 text-emerald-600 hover:bg-emerald-500/15 dark:text-emerald-400",
  Rejected: "bg-red-500/15 text-red-600 hover:bg-red-500/15 dark:text-red-400",
}

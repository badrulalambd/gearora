import Link from "next/link"
import { ExternalLink } from "lucide-react"

import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <SidebarInset className="min-w-0 bg-background">
        {/* Sticky bar sits directly under the sticky site header (h-16 / lg:h-20). */}
        <header className="sticky top-16 z-30 flex h-14 shrink-0 items-center gap-3 border-b border-white/10 bg-[#0B0B0B]/95 px-4 backdrop-blur-md sm:px-6 lg:top-20">
          <SidebarTrigger className="text-gray-300 hover:bg-white/10 hover:text-[#F4B400] focus-visible:ring-[#F4B400]/40" />
          <div className="flex items-center gap-2.5">
            <span className="size-2 rounded-full bg-[#F4B400]" />
            <span className="text-sm font-semibold text-white">
              GearOra Dashboard
            </span>
          </div>
          <Link
            href="/"
            className="ml-auto inline-flex h-8 shrink-0 items-center gap-1.5 rounded-lg border border-white/10 px-3 text-xs font-medium text-gray-300 transition-colors hover:border-[#F4B400]/50 hover:text-[#F4B400]"
          >
            <ExternalLink className="size-3.5" />
            View site
          </Link>
        </header>
        <div className="flex-1 p-4 sm:p-6 lg:p-8">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default DashboardLayout

"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  useSidebar,
} from "@/components/ui/sidebar"
import { Badge } from "@/components/ui/badge"
import { useSession } from "@/lib/auth-client"
import { usePathname } from "next/navigation"
import {
  Bookmark,
  Briefcase,
  Building2,
  LayoutDashboard,
  Plus,
  Settings,
  Users,
  X,
  type LucideIcon,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

type MenuItem = {
  name: string
  url: string
  icon: LucideIcon
}

const menuItemsByRole: Record<"customer" | "owner" | "admin", MenuItem[]> = {
  customer: [
    { name: "Dashboard", url: "/dashboard/customer", icon: LayoutDashboard },
    { name: "My Rentals", url: "/dashboard/customer/rentals", icon: Briefcase },
    { name: "Favorites", url: "/dashboard/customer/saved", icon: Bookmark },
    { name: "Profile", url: "/dashboard/customer/profile", icon: Settings },
  ],
  owner: [
    { name: "Dashboard", url: "/dashboard/owner", icon: LayoutDashboard },
    {
      name: "Add Equipment",
      url: "/dashboard/owner/equipments/add-equipment",
      icon: Plus,
    },
    {
      name: "My Equipment",
      url: "/dashboard/owner/equipments",
      icon: Building2,
    },
    {
      name: "My Equipment Rental",
      url: "/dashboard/owner/rentals",
      icon: Briefcase,
    },
    { name: "Profile", url: "/dashboard/owner/profile", icon: Settings },
  ],
  admin: [
    { name: "Dashboard", url: "/dashboard/admin", icon: LayoutDashboard },
    { name: "All Users", url: "/dashboard/admin/users", icon: Users },
    {
      name: "All Equipment",
      url: "/dashboard/admin/equipments",
      icon: Briefcase,
    },
    { name: "All Rentals", url: "/dashboard/admin/rentals", icon: Building2 },
    { name: "My Profile", url: "/dashboard/admin/profile", icon: Settings },
  ],
}

const menuItemClassName =
  "h-10 gap-3 rounded-lg px-3 text-sm text-gray-300 hover:bg-white/5 hover:text-white active:bg-white/10 active:text-white data-active:bg-[#F4B400]/15 data-active:font-semibold data-active:text-[#F4B400] data-active:hover:bg-[#F4B400]/20 data-active:hover:text-[#F4B400]"

export function DashboardSidebar() {
  const { data: session, isPending } = useSession()
  const { isMobile, setOpenMobile } = useSidebar()
  const pathname = usePathname()

  const role: keyof typeof menuItemsByRole =
    session?.user?.role === "owner" || session?.user?.role === "admin"
      ? session.user.role
      : "customer"

  const closeMobileSidebar = () => {
    if (isMobile) {
      setOpenMobile(false)
    }
  }

  return (
    // pt clears the sticky site header above the fixed sidebar (desktop only;
    // on mobile the sidebar renders as a Sheet overlaying the header).
    <Sidebar className="border-r border-white/10 pt-16 lg:pt-20">
      {/* Profile */}
      <SidebarHeader className="gap-3 bg-[#0B0B0B] p-4">
        <div className="flex w-full items-center gap-3">
          <Image
            src={
              session?.user?.image ??
              "https://images.unsplash.com/photo-1511367461989-f85a21fda167?q=80&w=1331&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D"
            }
            width={80}
            height={80}
            alt="Profile"
            className="size-14 shrink-0 rounded-full object-cover ring-2 ring-[#F4B400]/70"
          />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-white">
              {isPending ? "Loading…" : session?.user?.name || "Guest User"}
            </p>
            <Badge className="mt-1.5 bg-[#F4B400]/15 text-[#F4B400] capitalize hover:bg-[#F4B400]/15">
              {role}
            </Badge>
            {session?.user?.email && (
              <p className="mt-1 truncate text-xs text-gray-500">
                {session.user.email}
              </p>
            )}
          </div>
          {/* Close button is only visible in the mobile sheet overlay. */}
          <button
            type="button"
            onClick={closeMobileSidebar}
            aria-label="Close sidebar"
            className="inline-flex size-8 shrink-0 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-white/10 hover:text-white md:hidden"
          >
            <X className="size-4" />
          </button>
        </div>
      </SidebarHeader>

      <SidebarSeparator className="bg-white/10" />

      <SidebarContent className="bg-[#0B0B0B]">
        <SidebarGroup>
          <SidebarGroupLabel className="px-4 text-xs font-semibold tracking-[0.15em] text-gray-500 uppercase">
            Menu
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItemsByRole[role].map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton
                    render={<Link href={item.url} />}
                    isActive={pathname === item.url}
                    tooltip={item.name}
                    onClick={closeMobileSidebar}
                    className={menuItemClassName}
                  >
                    <item.icon />
                    <span>{item.name}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}

"use client"

import { useEffect, useState, useSyncExternalStore } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useTheme } from "next-themes"
import { LayoutDashboard, LogIn, LogOut, Menu, Moon, Sun, UserPlus, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { authClient, useSession } from "@/lib/auth-client"
import toast from "react-hot-toast"

const menuItems = [
  { label: "Home", href: "/" },
  { label: "All Equipment", href: "/equipments" },
  { label: "About Us", href: "/about-us" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "Contact Us", href: "/contact-us" },
]

const emptySubscribe = () => () => { }

const Navbar = () => {
  const pathname = usePathname()
  const { resolvedTheme, setTheme } = useTheme()
  const [menuOpen, setMenuOpen] = useState(false)
  const router = useRouter();

  const { data: session } = authClient.useSession();
  const user = session?.user;
  console.log("User Session: ", user);

  // Detect hydration without setState-in-effect: false during SSR,
  // true on the client afterwards (avoids a theme-icon mismatch).
  const hydrated = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  )

  // While the mobile menu is open: lock body scroll, close on Escape,
  // and close automatically when the viewport grows to desktop size.
  useEffect(() => {
    if (!menuOpen) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false)
    }
    const media = window.matchMedia("(min-width: 1024px)")
    const onDesktop = (event: MediaQueryListEvent) => {
      if (event.matches) setMenuOpen(false)
    }

    document.body.style.overflow = "hidden"
    document.addEventListener("keydown", onKeyDown)
    media.addEventListener("change", onDesktop)

    return () => {
      document.body.style.overflow = ""
      document.removeEventListener("keydown", onKeyDown)
      media.removeEventListener("change", onDesktop)
    }
  }, [menuOpen])

  const isDark = hydrated ? resolvedTheme === "dark" : true

  const isActive = (href: string) =>
    href === "/"
      ? pathname === "/"
      : pathname === href || pathname.startsWith(`${href}/`)

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("Logout successful!")
          router.push("/sign-in"); // redirect to login page
        },
      },
    });
  }

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0B0B0B]/95 backdrop-blur-md">
      <div className="relative mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:h-20 lg:px-8">
        {/* Logo - left */}
        <Link
          href="/"
          aria-label="GearOra home"
          className="flex shrink-0 items-center"
        >
          <Image
            src="/images/logo.png"
            alt="GearOra logo"
            width={1851}
            height={560}
            priority
            className="h-8 w-auto lg:h-9"
          />
        </Link>

        {/* Menu - center (desktop) */}
        <nav
          aria-label="Main"
          className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-7 lg:flex xl:gap-9"
        >
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative text-sm font-medium text-gray-300 transition-colors duration-200 after:absolute after:-bottom-1.5 after:left-0 after:h-0.5 after:w-0 after:rounded-full after:bg-[#F4B400] after:transition-all after:duration-300 hover:text-[#F4B400] hover:after:w-full",
                isActive(item.href) &&
                "font-semibold text-[#F4B400] after:w-full"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Actions - right */}
        <div className="flex items-center gap-1.5 sm:gap-2.5">
          {/* Dark / light toggle */}
          <button
            type="button"
            onClick={() => setTheme(isDark ? "light" : "dark")}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            className="inline-flex size-9 items-center justify-center rounded-lg border border-white/10 text-gray-300 transition-colors duration-200 hover:border-[#F4B400]/50 hover:bg-[#F4B400]/10 hover:text-[#F4B400] lg:size-10"
          >
            {isDark ? (
              <Moon className="h-[18px] w-[18px]" />
            ) : (
              <Sun className="h-[18px] w-[18px]" />
            )}
          </button>

          {/* Login / Register - desktop */}
          <div className="hidden items-center gap-2 lg:flex">
            {
              user ?
                <>
                  <Button
                    variant="ghost"
                    render={<Link href="/dashboard" />}
                    nativeButton={false}
                    className="h-10 gap-2 border border-transparent px-4 text-sm font-medium text-gray-300 hover:bg-[#F4B400]/10 hover:text-[#F4B400]"
                  >
                    <LayoutDashboard className="h-4 w-4" />
                    Dashboard
                  </Button>

                  <Button
                    onClick={handleLogout}
                    nativeButton={false}
                    className="h-10 gap-2 bg-[#F4B400] px-5 text-sm font-bold text-[#0B0B0B] shadow-lg shadow-[#F4B400]/20 hover:bg-[#E5A600]"
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </Button>
                </>
                :
                <>
                  <Button
                    variant="ghost"
                    render={<Link href="/sign-in" />}
                    nativeButton={false}
                    className="h-10 gap-2 border border-transparent px-4 text-sm font-medium text-gray-300 hover:bg-[#F4B400]/10 hover:text-[#F4B400]"
                  >
                    <LogIn className="h-4 w-4" />
                    Login
                  </Button>

                  <Button
                    render={<Link href="/sign-up" />}
                    nativeButton={false}
                    className="h-10 gap-2 bg-[#F4B400] px-5 text-sm font-bold text-[#0B0B0B] shadow-lg shadow-[#F4B400]/20 hover:bg-[#E5A600]"
                  >
                    <UserPlus className="h-4 w-4" />
                    Register
                  </Button>
                </>
            }
          </div>

          {/* Hamburger - mobile & tablet */}
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className="inline-flex size-9 items-center justify-center rounded-lg border border-white/10 text-gray-300 transition-colors duration-200 hover:border-[#F4B400]/50 hover:bg-[#F4B400]/10 hover:text-[#F4B400] lg:hidden"
          >
            {menuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile & tablet menu panel */}
      {menuOpen && (
        <div
          id="mobile-menu"
          className="border-t border-white/10 bg-[#0B0B0B] shadow-2xl shadow-black/40 lg:hidden"
        >
          <nav aria-label="Mobile" className="flex flex-col px-4 py-3 sm:px-6">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className={cn(
                  "rounded-lg px-3 py-3 text-sm font-medium text-gray-300 transition-colors duration-200 hover:bg-[#F4B400]/10 hover:text-[#F4B400]",
                  isActive(item.href) &&
                  "bg-[#F4B400]/10 font-semibold text-[#F4B400]"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Login / Register - under the menu items */}
          <div className="flex flex-col gap-3 border-t border-white/10 px-4 py-4 sm:px-6">
            <Button
              variant="ghost"
              render={<Link href="/sign-in" />}
              nativeButton={false}
              onClick={() => setMenuOpen(false)}
              className="h-11 w-full gap-2 border border-[#F4B400]/50 bg-transparent text-sm font-semibold text-[#F4B400] hover:bg-[#F4B400]/10 hover:text-[#F4B400]"
            >
              <LogIn className="h-4 w-4" />
              Login
            </Button>

            <Button
              render={<Link href="/sign-up" />}
              nativeButton={false}
              onClick={() => setMenuOpen(false)}
              className="h-11 w-full gap-2 bg-[#F4B400] text-sm font-bold text-[#0B0B0B] shadow-lg shadow-[#F4B400]/20 hover:bg-[#E5A600]"
            >
              <UserPlus className="h-4 w-4" />
              Register
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar

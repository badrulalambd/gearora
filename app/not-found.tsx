import type { Metadata } from "next"
import Link from "next/link"
import { House, PackageSearch, SearchX } from "lucide-react"

import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Page Not Found (404) | Gearora",
  description:
    "The page you're looking for doesn't exist. Head back to the homepage to find quality equipment for rent.",
}

const quickLinks = [
  { label: "About Us", href: "/about-us" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "Contact Us", href: "/contact-us" },
]

/**
 * Root not-found page — handles both `notFound()` calls and any URL that
 * doesn't match a route. Renders inside the root layout (Navbar + Footer).
 */
export default function NotFound() {
  return (
    <section className="relative flex min-h-[calc(100svh_-_6rem)] items-center justify-center overflow-hidden px-5 py-16">
      {/* Background glows — mirrors the Banner / AuthShell sections */}
      <div className="absolute top-20 -left-32 h-72 w-72 rounded-full bg-[#F4B400]/10 blur-3xl" />
      <div className="absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-[#F4B400]/10 blur-3xl" />

      <div className="relative w-full max-w-lg text-center">
        {/* Icon chip — matches the site's empty / error state pattern */}
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#F4B400]/15">
          <SearchX className="h-8 w-8 text-[#B98100] dark:text-[#F4B400]" />
        </span>

        <h1 className="mt-6 font-(family-name:--font-space-grotesk) text-2xl font-bold text-foreground sm:text-3xl">
          Page Not Found
        </h1>

        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-muted-foreground sm:text-base">
          Error 404 — the page you&apos;re looking for doesn&apos;t exist, was
          moved, or the link may be broken. Let&apos;s get you back to the right
          gear.
        </p>

        {/* Actions */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button
            render={<Link href="/" />}
            nativeButton={false}
            className="h-11 rounded-xl bg-[#F4B400] px-6 font-bold text-[#0B0B0B] shadow-lg shadow-[#F4B400]/20 hover:bg-[#E5A600]"
          >
            <House className="h-4 w-4" />
            Back to Home
          </Button>
          <Button
            render={<Link href="/equipments" />}
            nativeButton={false}
            variant="outline"
            className="h-11 rounded-xl px-6 font-semibold"
          >
            <PackageSearch className="h-4 w-4" />
            Browse Equipment
          </Button>
        </div>

        {/* Quick links */}
        <div className="mt-10 border-t border-border pt-6">
          <p className="text-xs font-bold tracking-[0.15em] text-muted-foreground uppercase">
            Quick Links
          </p>
          <div className="mt-3 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {quickLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-foreground transition-colors hover:text-[#B98100] dark:hover:text-[#F4B400]"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

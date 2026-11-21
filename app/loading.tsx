import { Settings } from "lucide-react"

/**
 * Global loading UI — the root `loading.tsx` wraps every route's page and
 * nested layout in a single Suspense boundary, so this shows while any
 * page streams in. Navbar and Footer stay visible above/below it.
 */
export default function Loading() {
  return (
    <section className="relative flex min-h-[calc(100svh_-_6rem)] items-center justify-center overflow-hidden px-5 py-16">
      {/* Background glows — mirrors the Banner / AuthShell sections */}
      <div className="absolute top-20 -left-32 h-72 w-72 rounded-full bg-[#F4B400]/10 blur-3xl" />
      <div className="absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-[#F4B400]/10 blur-3xl" />

      <div
        role="status"
        className="relative flex flex-col items-center text-center"
      >
        <span className="sr-only">Loading page…</span>

        {/* Spinner ring with brand gear */}
        <div className="relative flex h-24 w-24 items-center justify-center">
          <span className="absolute inset-0 animate-spin rounded-full border-[3px] border-[#F4B400]/25 border-t-[#F4B400] motion-reduce:animate-none" />
          <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#F4B400]/15">
            <Settings className="h-8 w-8 text-[#B98100] dark:text-[#F4B400]" />
          </span>
        </div>

        {/* Brand badge — same style as the Banner badge */}
        <div className="mt-7 inline-flex items-center gap-2 rounded-full border border-[#F4B400]/30 bg-[#F4B400]/10 px-4 py-2">
          <span className="h-2 w-2 animate-pulse rounded-full bg-[#F4B400] motion-reduce:animate-none" />
          <span className="text-xs font-bold tracking-[0.15em] text-[#B98100] uppercase dark:text-[#F4B400]">
            Your Trusted Rental Marketplace
          </span>
        </div>

        <h1 className="mt-6 font-(family-name:--font-space-grotesk) text-2xl font-bold text-foreground sm:text-3xl">
          Loading your gear…
        </h1>

        <p className="mt-3 max-w-md text-sm leading-6 text-muted-foreground sm:text-base">
          Hang tight — we&apos;re gathering the latest equipment, prices, and
          availability from trusted owners.
        </p>

        {/* Bouncing dots */}
        <div className="mt-8 flex items-center gap-2" aria-hidden="true">
          {[0, 1, 2].map((index) => (
            <span
              key={index}
              className="h-2.5 w-2.5 animate-bounce rounded-full bg-[#F4B400] motion-reduce:animate-none"
              style={{ animationDelay: `${index * 150}ms` }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

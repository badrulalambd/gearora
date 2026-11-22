import Link from "next/link"
import type { ReactNode } from "react"
import { ServerCrash, ShieldAlert } from "lucide-react"

import { Button } from "@/components/ui/button"

//Shown on admin routes when the visitor isn't signed in or isn't an admin.
export const AccessDenied = ({
  signedIn = false,
  title,
  message,
}: {
  signedIn?: boolean
  title?: string
  message?: string
}) => (
  <div className="flex min-h-100 flex-col items-center justify-center rounded-2xl border border-border bg-card p-8 text-center">
    <ShieldAlert className="mb-4 h-12 w-12 text-[#F4B400]" />
    <h2 className="text-xl font-bold text-foreground">
      {title ?? (signedIn ? "Access Denied" : "Authentication Required")}
    </h2>
    <p className="mt-2 max-w-md text-sm text-muted-foreground">
      {message ??
        (signedIn
          ? "This area is restricted to administrator accounts."
          : "Please log in with an administrator account to view this page.")}
    </p>
    <Button
      render={<Link href="/sign-in" />}
      nativeButton={false}
      className="mt-6 bg-[#F4B400] text-black hover:bg-[#DFA300]"
    >
      Sign In
    </Button>
  </div>
)

//Fallback when the backend server can't be reached.
export const UnableToConnect = ({
  subject,
  href,
}: {
  subject: string
  href: string
}) => (
  <div className="flex min-h-100 flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card px-6 py-12 text-center">
    <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-red-500/10">
      <ServerCrash className="h-8 w-8 text-red-500" />
    </div>

    <h2 className="text-xl font-bold text-foreground sm:text-2xl">
      Unable to Connect to Server
    </h2>

    <p className="mt-3 max-w-md text-sm leading-6 text-muted-foreground">
      We&apos;re having trouble loading {subject} right now. Please try again in
      a moment.
    </p>

    <Button
      render={<Link href={href} />}
      nativeButton={false}
      className="mt-6 bg-[#F4B400] font-bold text-[#0B0B0B] hover:bg-[#E5A600]"
    >
      Try Again
    </Button>
  </div>
)

//Shared empty state for the admin tables.
export const NoRecords = ({
  title,
  message,
  icon,
}: {
  title: string
  message: string
  icon: ReactNode
}) => (
  <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card px-6 py-16 text-center">
    <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#F4B400]/15">
      {icon}
    </div>

    <h2 className="text-xl font-bold text-foreground">{title}</h2>

    <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
      {message}
    </p>
  </div>
)

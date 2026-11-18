"use client"

import { useState } from "react"
import type { FormEvent } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Loader2, LogIn, Mail } from "lucide-react"
import { toast } from "react-hot-toast"

import { AuthShell } from "@/components/auth/AuthShell"
import { AuthField, PasswordField } from "@/components/auth/AuthField"
import { GoogleButton } from "@/components/auth/GoogleButton"
import { Button } from "@/components/ui/button"
import { signIn } from "@/lib/auth-client"

const SignInPage = () => {
  const router = useRouter()
  const [pending, setPending] = useState(false)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const email = String(formData.get("email") ?? "").trim()
    const password = String(formData.get("password") ?? "")

    if (!email || !password) {
      toast.error("Please fill in all fields.")
      return
    }

    setPending(true)

    const { error } = await signIn.email({ email, password })

    if (error) {
      toast.error(error.message || "Invalid email or password.")
      setPending(false)
      return
    }

    toast.success("Login successful!")
    router.push("/")
  }

  return (
    <AuthShell
      title="Welcome back"
      subtitle="Log in to continue renting the right gear."
      footer={
        <>
          New to GearOra?{" "}
          <Link
            href="/sign-up"
            className="font-semibold text-[#F4B400] hover:underline"
          >
            Register
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <AuthField
          id="email"
          name="email"
          type="email"
          label="Email Address"
          icon={Mail}
          placeholder="you@example.com"
          autoComplete="email"
          required
        />

        <PasswordField
          id="password"
          name="password"
          placeholder="Enter your password"
          autoComplete="current-password"
          required
        />

        <Button
          type="submit"
          disabled={pending}
          className="mt-1 h-11 w-full gap-2 bg-[#F4B400] text-sm font-bold text-[#0B0B0B] shadow-lg shadow-[#F4B400]/20 hover:bg-[#E5A600] disabled:opacity-60"
        >
          {pending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <LogIn className="h-4 w-4" />
          )}
          {pending ? "Logging in…" : "Login"}
        </Button>
      </form>

      {/* Divider */}
      <div className="my-5 flex items-center gap-3">
        <span className="h-px flex-1 bg-white/10" />
        <span className="text-xs font-medium tracking-widest text-gray-500 uppercase">
          or
        </span>
        <span className="h-px flex-1 bg-white/10" />
      </div>

      <GoogleButton />
    </AuthShell>
  )
}

export default SignInPage

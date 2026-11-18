"use client"

import { useState } from "react"
import type { FormEvent } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Image as ImageIcon, Loader2, Mail, User, UserPlus } from "lucide-react"
import { toast } from "react-hot-toast"

import { AuthShell } from "@/components/auth/AuthShell"
import { AuthField, PasswordField } from "@/components/auth/AuthField"
import { GoogleButton } from "@/components/auth/GoogleButton"
import { Button } from "@/components/ui/button"
import { signUp } from "@/lib/auth-client"

type Role = "customer" | "owner" | "admin"

const SignUpPage = () => {
  const router = useRouter()
  const [pending, setPending] = useState(false)
  const [role, setRole] = useState<Role>("customer")

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const name = String(formData.get("name") ?? "").trim()
    const email = String(formData.get("email") ?? "").trim()
    const photoUrl = String(formData.get("photoUrl") ?? "").trim()
    const password = String(formData.get("password") ?? "")

    if (!name || !email || !password) {
      toast.error("Please fill in all required fields.")
      return
    }

    // Password rules: an uppercase letter, a lowercase letter, and 6+ characters.
    const failedRules: string[] = []
    if (password.length < 6) failedRules.push("at least 6 characters")
    if (!/[a-z]/.test(password)) failedRules.push("a lowercase letter")
    if (!/[A-Z]/.test(password)) failedRules.push("an uppercase letter")

    if (failedRules.length > 0) {
      toast.error(`Password must include ${failedRules.join(", ")}.`)
      return
    }

    setPending(true)

    const { error } = await signUp.email({
      name,
      email,
      password,
      ...(photoUrl ? { image: photoUrl } : {}),
      role,
    })

    if (error) {
      toast.error(error.message || "Could not create your account.")
      setPending(false)
      return
    }

    toast.success("Account created successfully! Welcome to GearOra.")
    router.push("/sign-in")
  }

  

  return (
    <AuthShell
      title="Create your account"
      subtitle="Join GearOra and start renting the right gear for every project."
      footer={
        <>
          Already have an account?{" "}
          <Link
            href="/sign-in"
            className="font-semibold text-[#F4B400] hover:underline"
          >
            Login
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <AuthField
          id="name"
          name="name"
          type="text"
          label="Full Name"
          icon={User}
          placeholder="John Doe"
          autoComplete="name"
          required
        />

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

        <AuthField
          id="photoUrl"
          name="photoUrl"
          type="url"
          label="Photo URL"
          icon={ImageIcon}
          placeholder="https://example.com/photo.jpg"
        />

        <PasswordField
          id="password"
          name="password"
          placeholder="Create a password"
          autoComplete="new-password"
          hint="Must contain an uppercase letter, a lowercase letter, and be at least 6 characters."
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
            <UserPlus className="h-4 w-4" />
          )}
          {pending ? "Creating account…" : "Register"}
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

export default SignUpPage

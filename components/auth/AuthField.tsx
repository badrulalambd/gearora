"use client"

import { useState } from "react"
import type { ComponentType, InputHTMLAttributes, ReactNode } from "react"
import { Eye, EyeOff, Lock } from "lucide-react"

import { cn } from "@/lib/utils"

type FieldIcon = ComponentType<{ className?: string }>

const inputBase =
  "h-11 w-full rounded-lg border border-white/10 bg-black/40 pl-10 pr-4 text-sm text-white placeholder:text-gray-500 outline-none transition-colors focus:border-[#F4B400]/60 focus:ring-2 focus:ring-[#F4B400]/20 disabled:opacity-60"

interface AuthFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  icon: FieldIcon
}

const AuthField = ({
  label,
  icon: Icon,
  id,
  className,
  ...props
}: AuthFieldProps) => (
  <div className="space-y-1.5">
    <label htmlFor={id} className="block text-sm font-medium text-gray-300">
      {label}
    </label>
    <div className="relative">
      <Icon className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-500" />
      <input id={id} className={cn(inputBase, className)} {...props} />
    </div>
  </div>
)

interface PasswordFieldProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type"
> {
  label?: string
  hint?: ReactNode
}

const PasswordField = ({
  label = "Password",
  id,
  className,
  hint,
  ...props
}: PasswordFieldProps) => {
  const [visible, setVisible] = useState(false)

  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="block text-sm font-medium text-gray-300">
        {label}
      </label>
      <div className="relative">
        <Lock className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-500" />
        <input
          id={id}
          type={visible ? "text" : "password"}
          className={cn(inputBase, "pr-12", className)}
          {...props}
        />
        <button
          type="button"
          onClick={() => setVisible((current) => !current)}
          aria-label={visible ? "Hide password" : "Show password"}
          className="absolute top-1/2 right-1.5 inline-flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-md text-gray-500 transition-colors hover:text-[#F4B400]"
        >
          {visible ? (
            <EyeOff className="h-4 w-4" />
          ) : (
            <Eye className="h-4 w-4" />
          )}
        </button>
      </div>
      {hint && <p className="text-xs text-gray-500">{hint}</p>}
    </div>
  )
}

export { AuthField, PasswordField }

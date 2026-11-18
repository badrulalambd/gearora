import type { ComponentType, ReactNode } from "react"

import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

type FieldIcon = ComponentType<{ className?: string }>

interface FormFieldProps {
  label: string
  icon?: FieldIcon
  htmlFor?: string
  required?: boolean
  hint?: ReactNode
  className?: string
  children: ReactNode
}

const FormField = ({
  label,
  icon: Icon,
  htmlFor,
  required,
  hint,
  className,
  children,
}: FormFieldProps) => {
  return (
    <div className={cn("space-y-2", className)}>
      <Label htmlFor={htmlFor} className="gap-1.5 text-sm text-foreground">
        {Icon && (
          <Icon className="size-4 shrink-0 text-[#B98100] dark:text-[#F4B400]" />
        )}
        {label}
        {required && <span className="text-destructive">*</span>}
      </Label>
      {children}
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
    </div>
  )
}

export { FormField }

"use client"

import { useRef, useState } from "react"
import type { ChangeEvent, FormEvent, ReactNode } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import {
  AlertTriangle,
  Image as ImageIcon,
  LoaderCircle,
  Mail,
  MapPin,
  Phone,
  Save,
  Upload,
  User,
  type LucideIcon,
} from "lucide-react"

import { FormField } from "@/components/dashboard/FormField"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { updateUserDetail } from "@/lib/action/users"
import { useSession } from "@/lib/auth-client"
import { cn } from "@/lib/utils"

const fieldClasses =
  "h-11 focus-visible:border-[#F4B400]/60 focus-visible:ring-[#F4B400]/25"

const textareaClasses =
  "min-h-24 focus-visible:border-[#F4B400]/60 focus-visible:ring-[#F4B400]/25"

interface SectionCardProps {
  icon: LucideIcon
  title: string
  description: string
  children: ReactNode
}

const SectionCard = ({
  icon: Icon,
  title,
  description,
  children,
}: SectionCardProps) => (
  <Card className="shadow-sm">
    <CardHeader className="border-b border-border pb-4">
      <div className="flex items-center gap-3">
        <span className="rounded-lg bg-[#F4B400]/15 p-2.5">
          <Icon className="size-5 text-[#B98100] dark:text-[#F4B400]" />
        </span>
        <div className="min-w-0">
          <CardTitle className="font-(family-name:--font-space-grotesk) text-lg font-semibold">
            {title}
          </CardTitle>
          <CardDescription className="mt-1">{description}</CardDescription>
        </div>
      </div>
    </CardHeader>
    <CardContent>{children}</CardContent>
  </Card>
)

const ProfileForm = () => {
  const { data, isPending, refetch } = useSession()
  const router = useRouter()
  const [pending, setPending] = useState(false)
  const [imageFileName, setImageFileName] = useState<string | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const imgbbAPI = `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`

  const user = data?.user

  const heading = (
    <div className="flex items-start gap-4">
      <span className="rounded-xl bg-[#F4B400]/15 p-3">
        <User className="size-6 text-[#B98100] dark:text-[#F4B400]" />
      </span>
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2.5">
          <h1 className="font-(family-name:--font-space-grotesk) text-2xl font-bold text-foreground sm:text-3xl">
            Profile Settings
          </h1>
          {user?.role && (
            <Badge className="bg-[#F4B400]/15 text-[#B98100] capitalize hover:bg-[#F4B400]/15 dark:text-[#F4B400]">
              {user.role}
            </Badge>
          )}
        </div>
        <p className="mt-1.5 max-w-2xl text-sm leading-6 text-muted-foreground">
          Manage your personal information. Your email address is used to sign
          in and cannot be changed.
        </p>
      </div>
    </div>
  )

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null

    if (previewUrl) URL.revokeObjectURL(previewUrl)
    setPreviewUrl(file ? URL.createObjectURL(file) : null)
    setImageFileName(file?.name ?? null)
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!user || pending) return

    const formData = new FormData(event.currentTarget)
    const name = String(formData.get("name") ?? "").trim()
    const phone = String(formData.get("phone") ?? "").trim()
    const address = String(formData.get("address") ?? "").trim()
    const image = formData.get("image") as File | null

    if (!name) {
      toast.error("Name is required.")
      return
    }

    setPending(true)

    try {
      let imageUrl: string | undefined

      // Upload image to ImgBB if a new photo was selected.
      if (image && image.size > 0) {
        const imageFormData = new FormData()
        imageFormData.append("image", image)

        const response = await fetch(imgbbAPI, {
          method: "POST",
          body: imageFormData,
        })

        const imageData = await response.json()

        if (!response.ok || !imageData.success) {
          throw new Error("Image upload failed. Please try again.")
        }

        imageUrl = imageData.data.url
      }

      await updateUserDetail(user.id, {
        name,
        phone,
        address,
        ...(imageUrl ? { image: imageUrl } : {}),
      })

      toast.success("Profile updated successfully.")

      await refetch()
      router.refresh()

      // Drop the local preview so the avatar falls back to the saved image.
      if (previewUrl) URL.revokeObjectURL(previewUrl)
      setPreviewUrl(null)
      setImageFileName(null)
      if (fileInputRef.current) fileInputRef.current.value = ""
    } catch (error) {
      console.error("Error updating profile:", error)

      toast.error(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      )
    } finally {
      setPending(false)
    }
  }

  const avatarSrc = previewUrl ?? user?.image ?? null

  if (isPending) {
    return (
      <div className="mx-auto w-full max-w-5xl space-y-6">
        {heading}
        <div className="rounded-2xl border border-border bg-card p-6">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
            <div className="flex flex-col items-center gap-3">
              <div className="size-32 animate-pulse rounded-full bg-muted" />
              <div className="h-9 w-36 animate-pulse rounded-lg bg-muted" />
            </div>
            <div className="grid flex-1 gap-4 sm:grid-cols-2">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="space-y-2">
                  <div className="h-4 w-24 animate-pulse rounded bg-muted" />
                  <div className="h-11 animate-pulse rounded-lg bg-muted" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="mx-auto w-full max-w-5xl space-y-6">
        {heading}
        <div className="flex min-h-100 flex-col items-center justify-center rounded-2xl border border-border bg-card p-8 text-center">
          <AlertTriangle className="mb-4 h-12 w-12 text-[#F4B400]" />
          <h2 className="text-xl font-bold text-foreground">
            Authentication Required
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Please log in to view your profile.
          </p>
          <Button
            render={<Link href="/sign-in" />}
            nativeButton={false}
            className="mt-6 bg-[#F4B400] text-black hover:bg-[#DFA300]"
          >
            Sign In
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto w-full max-w-5xl space-y-6">
      {heading}

      <form onSubmit={handleSubmit} className="space-y-6">
        <SectionCard
          icon={User}
          title="Profile Information"
          description="Update your name, contact details, and profile photo."
        >
          <div className="grid gap-6 lg:grid-cols-[220px_1fr]">
            {/* Profile image */}
            <FormField
              label="Profile Image"
              icon={ImageIcon}
              htmlFor="image"
              hint="Uploaded to imgbb when you save."
              className="flex flex-col items-center lg:items-stretch"
            >
              <div className="relative mx-auto aspect-square w-32 overflow-hidden rounded-full border-2 border-[#F4B400]/40 bg-muted lg:mx-0 lg:w-full">
                {avatarSrc ? (
                  <Image
                    src={avatarSrc}
                    alt={user.name ?? "Profile photo"}
                    width={220}
                    height={220}
                    unoptimized={Boolean(previewUrl)}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="flex h-full w-full items-center justify-center">
                    <User className="size-12 text-[#B98100] dark:text-[#F4B400]" />
                  </span>
                )}
              </div>

              <label
                htmlFor="image"
                className="mt-4 flex cursor-pointer flex-col items-center gap-1.5 rounded-xl border-2 border-dashed border-border bg-muted/30 px-3 py-3 text-center transition-colors hover:border-[#F4B400]/60 hover:bg-[#F4B400]/5"
              >
                <span
                  className={cn(
                    "flex items-center gap-1.5 text-sm font-medium text-foreground",
                    imageFileName && "text-[#B98100] dark:text-[#F4B400]"
                  )}
                >
                  <Upload className="size-4" />
                  {imageFileName ?? "Change photo"}
                </span>
                <span className="text-xs text-muted-foreground">
                  PNG, JPG or WEBP
                </span>
                <input
                  ref={fileInputRef}
                  id="image"
                  name="image"
                  type="file"
                  accept="image/*"
                  className="sr-only"
                  onChange={handleImageChange}
                />
              </label>
            </FormField>

            {/* Fields */}
            <div className="grid gap-4 sm:grid-cols-2">
              <FormField label="Name" icon={User} htmlFor="name" required>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  required
                  defaultValue={user.name ?? ""}
                  placeholder="Your full name"
                  className={fieldClasses}
                />
              </FormField>

              <FormField
                label="Email"
                icon={Mail}
                htmlFor="email"
                hint="Used to sign in and cannot be changed."
              >
                <Input
                  id="email"
                  name="email"
                  type="email"
                  readOnly
                  value={user.email}
                  placeholder="—"
                  className={cn(fieldClasses, "cursor-default")}
                />
              </FormField>

              <FormField label="Phone Number" icon={Phone} htmlFor="phone">
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  defaultValue={user.phone ?? ""}
                  placeholder="e.g. +880 1XXX-XXXXXX"
                  className={fieldClasses}
                />
              </FormField>

              <FormField
                label="Address"
                icon={MapPin}
                htmlFor="address"
                className="sm:col-span-2"
              >
                <Textarea
                  id="address"
                  name="address"
                  defaultValue={user.address ?? ""}
                  placeholder="e.g. House 12, Road 5, Dhanmondi, Dhaka"
                  className={textareaClasses}
                />
              </FormField>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-6 flex justify-end border-t border-border pt-5">
            <Button
              type="submit"
              disabled={pending}
              className="h-11 w-full gap-2 bg-[#F4B400] px-6 text-sm font-bold text-[#0B0B0B] shadow-lg shadow-[#F4B400]/20 hover:bg-[#E5A600] sm:w-auto"
            >
              {pending ? (
                <LoaderCircle className="size-4 animate-spin" />
              ) : (
                <Save className="size-4" />
              )}
              {pending ? "Updating..." : "Update profile"}
            </Button>
          </div>
        </SectionCard>
      </form>
    </div>
  )
}

export default ProfileForm

"use client"

import { useState } from "react"
import { LoaderCircle, TriangleAlert } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface ConfirmDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description: string
  confirmLabel?: string
  onConfirm: () => void | Promise<void>
}

//Shared confirmation popup — the delete action only runs after Confirm.
const ConfirmDialog = ({
  open,
  onOpenChange,
  title,
  description,
  confirmLabel = "Delete",
  onConfirm,
}: ConfirmDialogProps) => {
  const [pending, setPending] = useState(false)

  const handleConfirm = async () => {
    if (pending) {
      return
    }
    setPending(true)

    try {
      await onConfirm()
    } finally {
      setPending(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <span className="rounded-lg bg-red-500/10 p-2.5">
              <TriangleAlert className="size-5 text-red-600 dark:text-red-400" />
            </span>
            <div className="min-w-0">
              <DialogTitle className="font-(family-name:--font-space-grotesk) text-lg font-semibold">
                {title}
              </DialogTitle>
              <DialogDescription className="mt-1.5">
                {description}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            disabled={pending}
            onClick={() => onOpenChange(false)}
            className="h-11 w-full sm:w-auto"
          >
            Cancel
          </Button>
          <Button
            type="button"
            disabled={pending}
            onClick={handleConfirm}
            className="h-11 w-full gap-2 bg-red-600 px-6 text-sm font-bold text-white hover:bg-red-700 sm:w-auto"
          >
            {pending && <LoaderCircle className="size-4 animate-spin" />}
            {confirmLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default ConfirmDialog

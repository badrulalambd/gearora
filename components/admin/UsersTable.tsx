"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Trash2, UserRound } from "lucide-react"
import toast from "react-hot-toast"

import ConfirmDialog from "@/components/admin/ConfirmDialog"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { deleteUserAccount, updateUserRole } from "@/lib/action/users"
import { IUserType } from "@/type/type"

const roleItems: Record<string, string> = {
  customer: "Customer",
  owner: "Owner",
  admin: "Admin",
}

const formatDate = (value: string) =>
  new Date(value).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })

const UsersTable = ({ users }: { users: IUserType[] }) => {
  const router = useRouter()
  const [deleting, setDeleting] = useState<IUserType | null>(null)

  //Role dropdown → backend update. The value stays controlled, so a failed
  //request leaves the visible role untouched.
  const handleRoleChange = async (value: string | null, user: IUserType) => {
    if (!value || value === user.role) {
      return
    }
    const role = value as IUserType["role"]

    try {
      await updateUserRole(user._id, role)
      toast.success(`${user.name} is now ${roleItems[role]}.`)
      router.refresh()
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to update role."
      )
    }
  }

  const handleDelete = async () => {
    if (!deleting) {
      return
    }

    try {
      await deleteUserAccount(deleting._id)
      toast.success(`${deleting.name} has been deleted.`)
      setDeleting(null)
      router.refresh()
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to delete user."
      )
      setDeleting(null)
    }
  }

  return (
    <>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Registration Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user._id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    {user.image ? (
                      <Image
                        src={user.image}
                        alt={user.name}
                        width={36}
                        height={36}
                        className="size-9 shrink-0 rounded-full object-cover"
                      />
                    ) : (
                      <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-muted">
                        <UserRound className="size-4 text-muted-foreground" />
                      </span>
                    )}
                    <span className="font-semibold text-foreground">
                      {user.name}
                    </span>
                  </div>
                </TableCell>

                <TableCell className="text-muted-foreground">
                  {user.email}
                </TableCell>

                <TableCell>
                  <Select
                    items={roleItems}
                    value={user.role}
                    onValueChange={(value) => handleRoleChange(value, user)}
                  >
                    <SelectTrigger
                      aria-label={`Role of ${user.name}`}
                      className="h-9 w-32 rounded-lg border-border bg-background"
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="customer">Customer</SelectItem>
                      <SelectItem value="owner">Owner</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>

                <TableCell className="text-muted-foreground">
                  {formatDate(user.createdAt)}
                </TableCell>

                <TableCell className="text-right">
                  {user.role !== "admin" ? (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setDeleting(user)}
                      className="h-9 gap-1.5 rounded-lg border-red-500/30 bg-red-500/10 px-3 text-sm font-semibold text-red-600 hover:bg-red-500/20 hover:text-red-600 dark:text-red-400"
                    >
                      <Trash2 className="size-4" />
                      Delete
                    </Button>
                  ) : (
                    <span className="text-xs text-muted-foreground">
                      Admin account
                    </span>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <ConfirmDialog
        open={deleting !== null}
        onOpenChange={(open) => {
          if (!open) setDeleting(null)
        }}
        title="Delete this user?"
        description={
          deleting
            ? `${deleting.name} (${deleting.email}) will be permanently removed. This action cannot be undone.`
            : ""
        }
        confirmLabel="Delete User"
        onConfirm={handleDelete}
      />
    </>
  )
}

export default UsersTable

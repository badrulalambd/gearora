import { headers } from "next/headers"
import { UsersRound } from "lucide-react"

import {
  AccessDenied,
  NoRecords,
  UnableToConnect,
} from "@/components/admin/AdminPageStates"
import UsersTable from "@/components/admin/UsersTable"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { getUsers } from "@/lib/api/users"
import { auth } from "@/lib/auth"
import { IUserType } from "@/type/type"

const AllUsersPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session || session.user.role !== "admin") {
    return <AccessDenied signedIn={Boolean(session)} />
  }

  let users: IUserType[] = []
  let serverError = false

  try {
    users = await getUsers()
  } catch (error) {
    console.error("Failed to fetch users:", error)
    serverError = true
  }

  if (serverError) {
    return (
      <UnableToConnect subject="your users" href="/dashboard/admin/users" />
    )
  }

  return (
    <div className="space-y-6">
      {/* Page heading */}
      <div className="flex items-start gap-4">
        <span className="rounded-xl bg-[#F4B400]/15 p-3">
          <UsersRound className="size-6 text-[#B98100] dark:text-[#F4B400]" />
        </span>
        <div className="min-w-0">
          <h1 className="font-(family-name:--font-space-grotesk) text-2xl font-bold text-foreground sm:text-3xl">
            All Users
          </h1>
          <p className="mt-1.5 max-w-2xl text-sm leading-6 text-muted-foreground">
            Every registered account on GearOra. Change a user&apos;s role from
            the dropdown or remove a customer/owner account.
          </p>
        </div>
      </div>

      {users.length === 0 ? (
        <NoRecords
          title="No Users Yet"
          message="Once people register on GearOra, their accounts will show up here."
          icon={
            <UsersRound className="size-8 text-[#B98100] dark:text-[#F4B400]" />
          }
        />
      ) : (
        <Card className="shadow-sm">
          <CardHeader className="border-b border-border pb-4">
            <CardTitle className="font-(family-name:--font-space-grotesk) text-lg font-semibold">
              Registered Users
            </CardTitle>
            <CardDescription className="mt-1">
              {users.length} {users.length === 1 ? "account" : "accounts"}{" "}
              registered.
            </CardDescription>
          </CardHeader>

          <CardContent className="p-4 sm:p-5">
            <UsersTable users={users} />
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default AllUsersPage

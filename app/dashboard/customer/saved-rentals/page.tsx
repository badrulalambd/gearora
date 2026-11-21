import Image from "next/image"
import Link from "next/link"
import { headers } from "next/headers"
import { AlertTriangle, Bookmark, MapPin, Package } from "lucide-react"

import DeleteFavoriteButton from "@/components/equipment/DeleteFavoriteButton"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { getFavorites } from "@/lib/action/favorites"
import { auth } from "@/lib/auth"

const SavedRentalsPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) {
    return (
      <div className="flex min-h-100 flex-col items-center justify-center rounded-2xl border border-border bg-card p-8 text-center">
        <AlertTriangle className="mb-4 h-12 w-12 text-[#F4B400]" />
        <h2 className="text-xl font-bold text-foreground">
          Authentication Required
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Please log in to view your saved equipment.
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
  }

  const favorites = await getFavorites(session.user.email)

  return (
    <div className="space-y-6">
      {/* Page heading */}
      <div className="flex items-start gap-4">
        <span className="rounded-xl bg-[#F4B400]/15 p-3">
          <Bookmark className="size-6 text-[#B98100] dark:text-[#F4B400]" />
        </span>
        <div className="min-w-0">
          <h1 className="font-(family-name:--font-space-grotesk) text-2xl font-bold text-foreground sm:text-3xl">
            Saved Equipment
          </h1>
          <p className="mt-1.5 max-w-2xl text-sm leading-6 text-muted-foreground">
            Equipment you&apos;ve saved for later. Remove anything you no longer
            need.
          </p>
        </div>
      </div>

      {/* Empty state */}
      {favorites.length === 0 ? (
        <div className="flex min-h-80 flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card px-6 py-12 text-center">
          <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#F4B400]/15">
            <Bookmark className="h-8 w-8 text-[#B98100] dark:text-[#F4B400]" />
          </div>

          <h2 className="text-xl font-bold text-foreground sm:text-2xl">
            No Saved Equipment Yet
          </h2>

          <p className="mt-3 max-w-md text-sm leading-6 text-muted-foreground">
            Browse equipment and click &quot;Add to Favorites&quot; to keep it
            here for later.
          </p>

          <Button
            render={<Link href="/equipments" />}
            nativeButton={false}
            className="mt-6 rounded-xl bg-[#F4B400] font-semibold text-black hover:bg-[#DFA300]"
          >
            Browse Equipment
          </Button>
        </div>
      ) : (
        /* Saved equipment table */
        <Card className="shadow-sm">
          <CardHeader className="border-b border-border pb-4">
            <CardTitle className="font-(family-name:--font-space-grotesk) text-lg font-semibold">
              My Favorites
            </CardTitle>
            <CardDescription className="mt-1">
              {favorites.length} {favorites.length === 1 ? "item" : "items"}{" "}
              saved to your list.
            </CardDescription>
          </CardHeader>

          <CardContent className="p-4 sm:p-5">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Equipment</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {favorites.map((favorite) => (
                  <TableRow key={favorite._id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        {favorite.equipmentImage ? (
                          <Image
                            src={favorite.equipmentImage}
                            alt={favorite.equipmentName}
                            width={44}
                            height={44}
                            className="size-11 shrink-0 rounded-lg object-cover"
                          />
                        ) : (
                          <span className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-muted">
                            <Package className="size-5 text-muted-foreground" />
                          </span>
                        )}
                        <Link href={`/equipments/${favorite.equipmentId}`}>
                          <span className="font-semibold text-foreground">
                            {favorite.equipmentName}
                          </span>
                        </Link>
                      </div>
                    </TableCell>

                    <TableCell>
                      <Badge className="bg-[#F4B400]/15 text-[#B98100] hover:bg-[#F4B400]/15 dark:text-[#F4B400]">
                        {favorite.category}
                      </Badge>
                    </TableCell>

                    <TableCell className="font-semibold text-foreground">
                      ${favorite.rentalPrice}
                      <span className="ml-1 text-xs font-normal text-muted-foreground">
                        /{favorite.rentalType}
                      </span>
                    </TableCell>

                    <TableCell className="text-muted-foreground">
                      <span className="inline-flex items-center gap-1.5">
                        <MapPin className="size-3.5 shrink-0 text-[#B98100] dark:text-[#F4B400]" />
                        {favorite.location}
                      </span>
                    </TableCell>

                    <TableCell className="text-right">
                      <DeleteFavoriteButton favoriteId={favorite._id} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default SavedRentalsPage

import Image from "next/image"
import Link from "next/link"
import { Eye, MapPin, Package } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { IEquipmentType } from "@/type/type"

interface EquipmentCardProps {
  equipment: IEquipmentType
}

const EquipmentCard = ({ equipment }: EquipmentCardProps) => {
  const available = equipment.quantity > 0

  return (
    <Card className="group overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <CardContent className="p-0">
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden bg-muted">
          {equipment.image ? (
            <Image
              src={equipment.image}
              alt={equipment.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <span className="flex h-full w-full items-center justify-center">
              <Package className="size-12 text-muted-foreground" />
            </span>
          )}

          {/* Category */}
          <div className="absolute top-3 left-3">
            <Badge className="bg-[#F4B400]/15 text-[#B98100] hover:bg-[#F4B400]/15 dark:text-[#F4B400]">
              {equipment.category}
            </Badge>
          </div>

          {/* Availability status */}
          <div className="absolute top-3 right-3">
            {available ? (
              <Badge className="bg-emerald-500/15 text-emerald-600 hover:bg-emerald-500/15 dark:text-emerald-400">
                Available
              </Badge>
            ) : (
              <Badge className="bg-red-500/15 text-red-600 hover:bg-red-500/15 dark:text-red-400">
                Out of Stock
              </Badge>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="space-y-3 p-4">
          <h3 className="line-clamp-1 text-base font-bold text-foreground">
            {equipment.name}
          </h3>

          <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <MapPin className="size-4 shrink-0 text-[#B98100] dark:text-[#F4B400]" />
            {equipment.location}
          </p>

          <div className="flex items-end justify-between gap-3 border-t border-border pt-3">
            <p className="text-xl font-bold text-foreground">
              ${equipment.rentalPrice}
              <span className="ml-1 text-xs font-normal text-muted-foreground">
                /{equipment.rentalType}
              </span>
            </p>

            <Button
              render={<Link href={`/equipments/${equipment._id}`} />}
              nativeButton={false}
              size="sm"
              className="h-9 rounded-lg bg-[#F4B400] px-3 text-sm font-bold text-[#0B0B0B] hover:bg-[#E5A600]"
            >
              <Eye className="size-4" />
              View Details
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default EquipmentCard

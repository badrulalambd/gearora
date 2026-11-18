import Navbar from "@/components/header/Navbar"
import Categories from "@/components/home/Categories"
import CustomerReview from "@/components/home/CustomerReview"
import FeaturedEquipment from "@/components/home/FeaturedEquipment"
import WhyChooseUs from "@/components/home/WhyChooseUs"
import { Button } from "@/components/ui/button"

export default function Page() {
  return (
    <div>
      <Navbar />
      <FeaturedEquipment />
      <Categories />
      <WhyChooseUs />
      <CustomerReview />
    </div>
  )
}

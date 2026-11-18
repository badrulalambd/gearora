import Navbar from "@/components/header/Navbar"
import Banner from "@/components/home/Banner"
import Categories from "@/components/home/Categories"
import CustomerReview from "@/components/home/CustomerReview"
import FeaturedEquipment from "@/components/home/FeaturedEquipment"
import WhyChooseUs from "@/components/home/WhyChooseUs"

export default function Page() {
  return (
    <div>
      <Navbar />
      <Banner />
      <FeaturedEquipment />
      <Categories />
      <WhyChooseUs />
      <CustomerReview />
    </div>
  )
}

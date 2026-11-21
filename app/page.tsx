import Banner from "@/components/home/Banner"
import Categories from "@/components/home/Categories"
import CustomerReview from "@/components/home/CustomerReview"
import FAQ from "@/components/home/FAQ"
import FeaturedEquipment from "@/components/home/FeaturedEquipment"
import HowItWorks from "@/components/home/HowItWorks"
import WhyChooseUs from "@/components/home/WhyChooseUs"

export default function Page() {
  return (
    <div>
      <Banner />
      <FeaturedEquipment />
      <Categories />
      <WhyChooseUs />
      <CustomerReview />
      <HowItWorks />
      <FAQ />
    </div>
  )
}

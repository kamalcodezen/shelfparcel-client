import Banner from "@/components/modules/home/Banner";
import FeaturedBooks from "@/components/modules/home/FeaturedBooks";
import HeroMarquee from "@/components/modules/home/HeroMarquee";


export default function HomePage() {
  return (
    <>
      <Banner />
      <HeroMarquee />
      <FeaturedBooks/>
    </>
  );
}
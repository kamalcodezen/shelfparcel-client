import Banner from "@/components/modules/home/Banner";
import FeaturedBooks from "@/components/modules/home/FeaturedBooks";
import HeroMarquee from "@/components/modules/home/HeroMarquee";
import HowItWorks from "@/components/modules/home/HowItWorks";
import PopularCategories from "@/components/modules/home/PopularCategories";
import TopLibrarians from "@/components/modules/home/TopLibrarians";


export default function HomePage() {
  return (
    <>
      <Banner />
      <HeroMarquee />
      <FeaturedBooks />
      <HowItWorks />
      <TopLibrarians />
      {/* <StatsSection /> */}
      <PopularCategories />

    </>
  );
}
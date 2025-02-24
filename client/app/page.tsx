import FeaturedProducts from "@/components/home/FeaturedProducts";
import { HeroCarousel } from "@/components/home/HeroCarousel";
import Products from "@/components/home/Products";

const Homepage = () => {
  return (
    <>
      {/* <h1 className="text-xl">Homepage</h1> */}
      <HeroCarousel />
      {/* <Products /> */}
      <FeaturedProducts />
    </>
  );
};

export default Homepage;

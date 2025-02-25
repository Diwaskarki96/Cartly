import FeaturedProducts from "@/components/home/FeaturedProducts";
import { HeroCarousel } from "@/components/home/HeroCarousel";
import ProductByCategory from "@/components/home/ProductByCategory";
import Products from "@/components/home/Products";

const Homepage = () => {
  return (
    <>
      {/* <h1 className="text-xl">Homepage</h1> */}
      <HeroCarousel />
      {/* <Products /> */}
      <ProductByCategory />
      <FeaturedProducts />
    </>
  );
};

export default Homepage;

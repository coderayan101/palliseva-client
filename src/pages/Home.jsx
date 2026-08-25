import BestSeller from "../components/BestSeller";
import BottomBanner from "../components/BottomBanner";
import Categories from "../components/Categories";
import Features from "../components/Features";
import MainBanner from "../components/MainBanner";
import NewsLetter from "../components/NewsLetter";
import ProductsButton from "../components/ProductsButton";

const Home = () => {
  return (
    <>
      <MainBanner />
      <div className="px-6 md:px-16 lg:px-24 xl:px-20">
        <Features />
        <Categories />
        <BestSeller />
        {/* <ProductsButton /> */}
        <BottomBanner />
        {/* <NewsLetter /> */}
      </div>
    </>
  );
};

export default Home;

import { useState } from "react";
import { useAppContext } from "../context/AppContext";
import ProductCart from "./ProductCart";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

import { ChevronLeft, ChevronRight, Leaf, ShoppingBag } from "lucide-react";

const BestSeller = () => {
  const { products, navigate } = useAppContext();

  const [activeCategory, setActiveCategory] = useState("Vegetables");

  const categories = [
    {
      name: "Vegetables",
      label: "সবজি",
      icon: <Leaf size={20} />,
    },
    {
      name: "Essentials",
      label: "নিত্যপ্রয়োজনীয় পণ্য",
      icon: <ShoppingBag size={20} />,
    },
  ];

  const filteredProducts = products.filter((product) => {
    if (activeCategory === "Vegetables") {
      return product.category !== "Vegetable";
    }

    return product.category === "Fruits";
  });

  return (
    <section className="mt-8 md:mt-16">
      {/* Heading */}
      <div className="text-center">
   
        <div className="flex flex-col items-center justify-center w-full md:mb-8">
          {/* Leaves + text */}
          <div className="flex items-center gap-3">
            <Leaf className="text-primary" />
            <p className="text-lg md:text-2xl font-bold text-center">
              আমাদের পণ্য সমূহ
            </p>
            <Leaf className="text-primary scale-x-[-1]" />
          </div>
          {/* Underline */}
          <div className="w-16 h-0.5 bg-primary rounded-full mt-1"></div>
        </div>

        {/* Tabs */}

        {/* <div className="flex justify-center mt-8 gap-4 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => setActiveCategory(cat.name)}
              className={`flex items-center gap-2 px-3 md:px-12 py-3 rounded-2xl font-semibold transition text-sm md:text-sm

              ${
                activeCategory === cat.name
                  ? "bg-primary text-white"
                  : "bg-[#F7F6EF] text-black"
              }
              
              `}
            >
              {cat.icon}

              {cat.label}
            </button>
          ))}
        </div> */}
      </div>

      {/* Products */}

      <div className="relative mt-6">
        <button className="best-prev absolute -left-4 md:-left-7 top-1/2 -translate-y-1/2 z-20 w-8 md:w-12 h-8 md:h-12 rounded-full bg-white shadow-lg border flex items-center justify-center">
          <ChevronLeft />
        </button>

        <button className="best-next absolute -right-4 md:-right-7 top-1/2 -translate-y-1/2 z-20 w-8 md:w-12 h-8 md:h-12 rounded-full bg-white shadow-lg border flex items-center justify-center">
          <ChevronRight />
        </button>

        <Swiper
          modules={[Navigation]}
          navigation={{
            prevEl: ".best-prev",
            nextEl: ".best-next",
          }}
          spaceBetween={20}
          breakpoints={{
            0: {
              slidesPerView: 2,
            },
            640: {
              slidesPerView: 3,
            },
            1024: {
              slidesPerView: 6,
            },
          }}
        >
          {filteredProducts.map((product) => (
            <SwiperSlide key={product._id}>
              <ProductCart product={product} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* View All */}

      <div className="flex justify-center mt-10">
        <button
          onClick={() => navigate("/products")}
          className="border-2 border-primary text-primary px-10 py-3 rounded-full font-semibold hover:bg-primary hover:text-white transition"
        >
          সব পণ্য দেখুন
        </button>
      </div>
    </section>
  );
};

export default BestSeller;

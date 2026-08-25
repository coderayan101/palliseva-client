import { categories, subCategories } from "../assets/assets";
import { useAppContext } from "../context/AppContext";

const Categories = () => {
  const { navigate } = useAppContext();

  return (
    <div className="mt-8 md:mt-12 px-4 md:px-8">
      {/* Header Section */}
      <div className="flex flex-col items-center justify-center w-full mb-8 md:mb-12">
        <div className="relative">
          <h2 className="text-2xl md:text-4xl font-extrabold text-gray-800 tracking-tight">
            ক্যাটাগরিস
          </h2>
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-green-400 to-emerald-600 rounded-full"></div>
        </div>
        <p className="text-gray-500 mt-4 text-sm md:text-base">
          আপনার পছন্দের ক্যাটাগরি বেছে নিন
        </p>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 md:gap-6">
        {categories.map((category, index) => (
          <div
            key={index}
            className="group relative cursor-pointer bg-white rounded-2xl p-4 md:p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
            onClick={() => {
              const categorySubCategories = subCategories[category.path];

              if (categorySubCategories?.length > 0) {
                navigate(
                  `/products/${category.path.toLowerCase()}/${categorySubCategories[0].path.toLowerCase()}`,
                );
              } else {
                navigate(`/products/${category.path.toLowerCase()}`);
              }

              scrollTo(0, 0);
            }}
          >
            {/* Decorative gradient blob */}
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-green-100 to-emerald-200 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>
            
            {/* Image Container */}
            <div className="relative flex justify-center mb-4">
              <div className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 p-[3px] shadow-md group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.text}
                    className="w-full h-full object-cover rounded-full group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
              </div>
              
              {/* Hover indicator */}
              <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-1 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full transition-all duration-300 group-hover:w-12"></div>
            </div>

            {/* Category Name */}
            <p className="text-center text-sm md:text-base font-semibold text-gray-700 group-hover:text-green-600 transition-colors duration-300">
              {category.text}
            </p>

            {/* Arrow indicator */}
            <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-0 translate-x-2">
              <svg className="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import ProductCart from "../components/ProductCart";

const AllProducts = () => {
  
  const {products, searchQuery} = useAppContext();
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    if(searchQuery.length > 0) {
        setFilteredProducts(products.filter(
            product => product.name.toLowerCase().includes(searchQuery.toLowerCase())
        ))} else {
            setFilteredProducts(products);
        }
  }, [products, searchQuery]);

  return (
    <div className="mt-6 md:mt-10 flex flex-col px-6 md:px-16 lg:px-24 xl:px-36">
        <div className="flex flex-col items-end w-max">
            <p className="text-lg md:text-2xl font-bold uppercase">সমস্ত প্রকার শাকসবজি</p>
            <div className="w-16 h-0.5 bg-primary rounded-full"></div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5 md:gap-6 lg:grid-cols-6 mt-6 mb-6">
            {filteredProducts.map((product, index)=>(
                <ProductCart key={index} product={product} />
            ))}
        </div>
    </div>
  )
}

export default AllProducts;
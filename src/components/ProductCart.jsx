import { useState } from "react";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

const ProductCart = ({ product }) => {
  const { currency, addToCart, removeFromCart, cartItems, navigate } =
    useAppContext();

  return (
    product && (
      <div
        onClick={() => {
          if (product.inStock) {
            navigate(
              `/products/${product.category.toLowerCase()}/product/${product._id}`,
            );
            scrollTo(0, 0);
          }
        }}
        className="border border-gray-500/20 rounded-2xl px-2 md:px-2 pb-3 bg-white min-w-26 max-w-56 w-full"
      >
        <div className="relative group cursor-pointer flex items-center justify-center px-2">
          <img
            className="group-hover:scale-112 transition max-w-26 md:max-w-36"
            src={product.image[0]}
            alt={product.name}
          />
          {!product.inStock && (
            <span className="absolute top-2 left-2 bg-red-600 text-white text-[10px] md:text-xs px-2 py-1 rounded-full font-semibold">
              Out of Stock
            </span>
          )}
        </div>
        <div className="text-gray-500/60 text-sm text-center">
          {/* <p>{product.category}</p> */}
          <p className="text-gray-700 font-semibold text-lg truncate w-full">
            {product.name}
          </p>
          <p className="text-gray-700 font-medium text-sm truncate w-full mt-2">
            {product.weight}
          </p>
          <p className="md:text-xl text-base font-medium text-primary mt-2">
            {currency}
            {product.offerPrice}{" "}
            <span className="text-gray-500/60 md:text-sm text-xs line-through">
              {currency}
              {product.price}
            </span>
          </p>

          <div className="flex items-end justify-between">
            <div
              onClick={(e) => {
                e.stopPropagation();
              }}
              className="text-primary m-auto"
            >
              {!product.inStock ? (
                <button
                  disabled
                  className="mt-5 w-full bg-gray-400 text-white rounded-xl py-3 px-3 md:px-5 font-medium cursor-not-allowed text-[12px] md:text-[14px]"
                >
                  Out of Stock
                </button>
              ) : !cartItems[product._id] ? (
                <button
                  className="mt-5 w-full bg-primary hover:bg-primary/90 text-white rounded-xl py-3 px-3 md:px-5 flex items-center justify-center gap-2 font-medium transition text-[12px] md:text-[14px]"
                  onClick={() => addToCart(product._id)}
                >
                  <img src={assets.cart_icon} alt="cart_icon" />
                  অর্ডার করুন
                </button>
              ) : (
                <div className="mt-5 w-full bg-primary hover:bg-primary/90 text-white rounded-xl py-[11px] flex items-center justify-center gap-2 font-medium transition">
                  <button
                    onClick={() => {
                      removeFromCart(product._id);
                    }}
                    className="w-full cursor-pointer text-md px-3 md:px-5 h-full"
                  >
                    -
                  </button>
                  <span className="w-5 text-center text-[12px] md:text-[14px]">
                    {cartItems[product._id]}
                  </span>
                  <button
                    onClick={() => {
                      addToCart(product._id);
                    }}
                    className="w-full cursor-pointer text-md px-3 md:px-5 h-full"
                  >
                    +
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default ProductCart;

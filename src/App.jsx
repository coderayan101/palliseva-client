import Navbar from "./components/Navbar";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import { Toaster } from "react-hot-toast";
import Footer from "./components/Footer";
import { useAppContext } from "./context/AppContext";
import Login from "./components/Login";
import AllProducts from "./pages/AllProducts";
import ProductCategory from "./pages/ProductCategory";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import AddAddress from "./pages/AddAddress";
import MyOrders from "./pages/MyOrders";
import TopBar from "./components/TopBar";

import SellerLogin from "./components/seller/SellerLogin";
import SellerLayout from "./pages/seller/SellerLayout";
import AddProduct from "./pages/seller/AddProduct";
import ProductList from "./pages/seller/ProductList";
import EditProduct from "./pages/seller/EditProduct";
import Orders from "./pages/seller/Orders";
import Loading from "./components/Loading";
import About from "./pages/About";
import MobileBottomNav from "./components/MobileBottomNav";
import Account from "./pages/Account";

const App = () => {

  const isSellerPath = useLocation().pathname.includes("seller");
  const {showUserLogin, isSeller} = useAppContext();

  return (
    <div className="text-default min-h-screen text-gray-700 bg-white">
    <div className="sticky top-0 z-50">
      {isSellerPath ? null : <TopBar />}
      {isSellerPath ? null : <Navbar />} 
    </div>
      {showUserLogin ? <Login /> : null}

      <Toaster />

      <div className={`${isSellerPath ? "" : ""}`}>
        {/* px-6 md:px-16 lg:px-24 xl:px-36 */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<AllProducts />} />
          <Route path="/about" element={<About />} />
          <Route path="/account" element={<Account />} />
          <Route path="/products/:category/:subcategory" element={<ProductCategory />} />
          <Route path="/products/:category" element={<ProductCategory />} />
          <Route path="/products/:category/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/add-address" element={<AddAddress />} />
          <Route path="/my-orders" element={<MyOrders />} />
          <Route path="/loader" element={<Loading />} />
          <Route path="/seller" element={isSeller ? <SellerLayout /> : <SellerLogin />}>
            <Route index element={isSeller ? <AddProduct /> : null} />
            <Route path="product-list" element={<ProductList />} />
            <Route path="edit-product/:id" element={<EditProduct />} />
            <Route path="orders" element={<Orders />} />
          </Route>
        </Routes>
      </div>

      {!isSellerPath && <Footer />}

        {/* Mobile bottom navigation (mobile only) */}
        {!isSellerPath && <MobileBottomNav />}
    </div>
  )
}

export default App;
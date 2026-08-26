import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import { Search } from "lucide-react";
import toast from "react-hot-toast";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  const {
    user,
    setUser,
    setShowUserLogin,
    navigate,
    searchQuery,
    setSearchQuery,
    getCartCount,
    axios,
  } = useAppContext();

  const logout = async () => {
    try {
      const { data } = await axios.get("/api/user/logout");

      if (data.success) {
        toast.success(data.message);
        setUser(null);
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (searchQuery.length > 0) {
      navigate("/products");
    }
  }, [searchQuery]);

  useEffect(() => {
    const handleClickOutside = () => setProfileOpen(false);

    if (profileOpen) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [profileOpen]);

  return (
    <nav className="flex items-center justify-between py-2 md:py-3 px-6 md:px-10 lg:px-16 bg-white shadow-sm sticky top-0 z-50">
      {/* Logo */}
      <NavLink
        to="/"
        onClick={() => setOpen(false)}
        className="flex items-center gap-3"
      >
        <img src="/palli-seva.png" alt="" className="w-14" />
        <span className="text-2xl font-bold text-primary">পল্লীসেবা</span>
      </NavLink>

      {/* Desktop / Tablet Menu */}
      <div className="hidden sm:flex items-center gap-8">
        {/* Menu Links */}
        <NavLink to="/">
          {({ isActive }) => (
            <div
              className={`relative group pb-1 ${
                isActive ? "text-primary" : "text-gray-700"
              }`}
            >
              Home
              <span
                className={`absolute left-0 -bottom-0.5 h-[2px] bg-primary transition-all duration-300 ${
                  isActive ? "w-full" : "w-0 group-hover:w-full"
                }`}
              />
            </div>
          )}
        </NavLink>

        <NavLink to="/products">
          {({ isActive }) => (
            <div
              className={`relative group pb-1 ${
                isActive ? "text-primary" : "text-gray-700"
              }`}
            >
              All Product
              <span
                className={`absolute left-0 -bottom-0.5 h-[2px] bg-primary transition-all duration-300 ${
                  isActive ? "w-full" : "w-0 group-hover:w-full"
                }`}
              />
            </div>
          )}
        </NavLink>

        <NavLink to="/about">
          {({ isActive }) => (
            <div
              className={`relative group pb-1 ${
                isActive ? "text-primary" : "text-gray-700"
              }`}
            >
              About Us
              <span
                className={`absolute left-0 -bottom-0.5 h-[2px] bg-primary transition-all duration-300 ${
                  isActive ? "w-full" : "w-0 group-hover:w-full"
                }`}
              />
            </div>
          )}
        </NavLink>

        {/* Search */}
        <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
          <input
            onChange={(e) => setSearchQuery(e.target.value)}
            className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500"
            type="text"
            placeholder="Search products"
          />
          <img src={assets.search_icon} alt="search" className="w-4 h-4" />
        </div>

        {/* Cart */}
        <div
          onClick={() => navigate("/cart")}
          className="relative cursor-pointer"
        >
          <img
            src={assets.nav_cart_icon}
            alt="cart"
            className="w-6 opacity-80"
          />
          <button className="absolute -top-2 -right-3 text-xs text-white bg-primary w-[18px] h-[18px] rounded-full">
            {getCartCount()}
          </button>
        </div>

        {/* Login / Profile */}
        {!user ? (
          <button
            onClick={() => setShowUserLogin(true)}
            className="cursor-pointer px-8 py-2 bg-primary hover:bg-primary-dull transition text-white rounded-full"
          >
            Login
          </button>
        ) : (
          <div className="relative">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setProfileOpen(!profileOpen);
              }}
              className="focus:outline-none"
            >
              <img
                src={assets.profile_icon}
                className="w-10 cursor-pointer"
                alt="profile"
              />
            </button>

            {profileOpen && (
              <ul className="absolute top-12 right-0 bg-white shadow-lg border border-gray-200 py-2.5 w-36 rounded-md text-sm z-50">
                <li
                  onClick={() => {
                    setProfileOpen(false);
                    navigate("/my-orders");
                  }}
                  className="p-2 pl-3 hover:bg-primary/10 cursor-pointer"
                >
                  My Orders
                </li>

                <li
                  onClick={() => {
                    setProfileOpen(false);
                    logout();
                  }}
                  className="p-2 pl-3 hover:bg-primary/10 cursor-pointer"
                >
                  Logout
                </li>
              </ul>
            )}
          </div>
        )}
      </div>
      
      {/* Mobile Right Side */}
      <div className="flex items-center gap-5 sm:hidden">
        {showMobileSearch ? (
          <div className="flex items-center border border-gray-300 rounded-full px-2 py-2 w-30">
            <Search className="w-4 h-4 text-gray-500" />
            <input
              type="text"
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="পণ্য খুঁজুন"
              className="w-full bg-transparent outline-none text-sm ml-2"
              autoFocus
            />
            <button
              onClick={() => setShowMobileSearch(false)}
              className="text-gray-500 ml-2"
            >
              ✕
            </button>
          </div>
        ) : (
          <button
            onClick={() => setShowMobileSearch(true)}
            className="text-gray-700"
            aria-label="Search"
          >
            <Search className="w-6 h-6" />
          </button>
        )}
      

        {/* Cart */}
        <div
          onClick={() => navigate("/cart")}
          className="relative cursor-pointer"
        >
          <img
            src={assets.nav_cart_icon}
            alt="cart"
            className="w-6 opacity-80"
          />
          <button className="absolute -top-2 -right-3 text-xs text-white bg-primary w-[18px] h-[18px] rounded-full">
            {getCartCount()}
          </button>
        </div>

        {/* Menu */}
        <button className="hidden" onClick={() => setOpen(!open)} aria-label="Menu">
          <img src={assets.menu_icon} alt="menu" />
        </button>
      </div>

      {/* Mobile Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/30 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-[72px] right-0 h-[calc(100vh-72px)] w-64 bg-white shadow-xl border-l border-gray-200 transform transition-transform duration-300 z-50 md:hidden ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col p-5 gap-4 text-sm">
          <NavLink to="/" onClick={() => setOpen(false)}>
            Home
          </NavLink>

          <NavLink to="/products" onClick={() => setOpen(false)}>
            All Product
          </NavLink>

          {user && (
            <NavLink to="/my-orders" onClick={() => setOpen(false)}>
              My Orders
            </NavLink>
          )}

          <NavLink to="/about" onClick={() => setOpen(false)}>
            About Us
          </NavLink>

          {!user ? (
            <button
              onClick={() => {
                setOpen(false);
                setShowUserLogin(true);
              }}
              className="px-6 py-2 mt-2 bg-primary text-white rounded-full"
            >
              Login
            </button>
          ) : (
            <button
              onClick={() => {
                setOpen(false);
                logout();
              }}
              className="px-6 py-2 mt-2 bg-primary text-white rounded-full"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

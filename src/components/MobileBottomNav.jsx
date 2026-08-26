import { NavLink } from "react-router-dom";
import { House, ShoppingCart, Package, User } from "lucide-react";
import { useAppContext } from "../context/AppContext";

const MobileBottomNav = () => {
  const { getCartCount } = useAppContext();

  const linkClass = ({ isActive }) =>
    `flex flex-col items-center justify-center text-[11px] ${
      isActive ? "text-white font-semibold" : "text-white/80"
    }`;

  return (
    <nav className="fixed inset-x-0 -bottom-2 z-50 bg-green border-t border-primary lg:hidden py-">
      <div className="grid grid-cols-4 h-16 pb-[env(safe-area-inset-bottom)]">
        
        <NavLink to="/" className={linkClass}>
          <House className="w-5 h-5 mb-1" />
          <span>Home</span>
        </NavLink>

        <NavLink to="/my-orders" className={linkClass}>
          <Package className="w-5 h-5 mb-1" />
          <span>Orders</span>
        </NavLink>

        <NavLink to="/cart" className={linkClass}>
          <div className="relative">
            <ShoppingCart className="w-5 h-5 mb-1" />
            {getCartCount() > 0 && (
              <span className="absolute -top-2 -right-2 bg-white text-primary text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
                {getCartCount()}
              </span>
            )}
          </div>
          <span>Cart</span>
        </NavLink>

        <NavLink to="/account" className={linkClass}>
          <User className="w-5 h-5 mb-1" />
          <span>Account</span>
        </NavLink>
      </div>
    </nav>
  );
};

export default MobileBottomNav;

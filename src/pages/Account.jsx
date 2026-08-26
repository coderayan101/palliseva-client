import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import { Package, MapPin, LogOut, ChevronRight } from "lucide-react";
import toast from "react-hot-toast";

const Account = () => {
  const { user, setUser, setShowUserLogin, axios, navigate } = useAppContext();

  const handleLogout = async () => {
    try {
      const { data } = await axios.get("/api/user/logout");

      if (data.success) {
        setUser(null);
        navigate("/");
        toast.success("Logged out successfully");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6">
      {!user ? (
        <div className="max-w-sm w-full text-center">
          <img
            src={assets.account_login}
            alt="Login"
            className="w-64 mx-auto"
          />

          <h2 className="text-3xl font-bold mt-6">Hello, There</h2>

          <p className="text-gray-500 mt-3">
            Please sign in or sign up and enjoy the experience.
          </p>

          <button
            onClick={() => setShowUserLogin(true)}
            className="w-full mt-8 bg-primary text-white py-3 rounded-xl font-semibold"
          >
            Login / Sign Up
          </button>
        </div>
      ) : (
        <div className="max-w-md w-full">
          {/* Profile Card */}
          <div className="flex justify-center mb-4">
            <img
              src={assets.profile_icon}
              alt="Profile"
              className="w-24 h-24 rounded-full border-4 border-white shadow-lg object-cover"
            />
          </div>
          <div className="bg-primary text-white rounded-2xl p-6 shadow">
            <h2 className="text-2xl font-bold">Hello, {user.name}</h2>

            <p className="mt-2 text-white/90">{user.email}</p>
          </div>

          {/* Menu */}
          <div className="mt-6 bg-white rounded-2xl shadow border overflow-hidden">
            {/* Orders */}
            {/* <button
              onClick={() => navigate("/my-order")}
              className="w-full flex items-center justify-between px-5 py-4 hover:bg-gray-50"
            >
              <div className="flex items-center gap-3">
                <Package className="w-5 h-5 text-primary" />
                <span>My Orders</span>
              </div>

              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button> */}

            {/* Address */}
            {/* <button className="w-full flex items-center justify-between px-5 py-4 border-t hover:bg-gray-50">
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-primary" />
                <span>Saved Addresses</span>
              </div>

              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button> */}

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-between px-5 py-4 border-t text-red-600 hover:bg-red-50"
            >
              <div className="flex items-center gap-3">
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </div>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Account;

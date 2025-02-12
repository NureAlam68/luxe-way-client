import { Link, NavLink } from "react-router-dom";
import logo from "../assets/hotel.svg";
import "./Navbar.css";
import useAuth from "../hookes/useAuth";
import toggle_light from "../assets/night.png";
import toggle_dark from "../assets/day.png";
import { useEffect, useState } from "react";
import { BiLogOut } from "react-icons/bi";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const links = (
    <>
      <li className="hover:text-[#c2772c]">
        <NavLink to="/">Home</NavLink>
      </li>
      <li className="hover:text-[#c2772c]">
        <NavLink to="/rooms">Rooms</NavLink>
      </li>
      {user && (
        <li className="hover:text-[#c2772c]">
          <NavLink to="/myBookings">My Bookings</NavLink>
        </li>
      )}
      <li className="hover:text-[#c2772c]">
        <NavLink to="/aboutUs">About Us</NavLink>
      </li>
      <li className="hover:text-[#c2772c]">
        <NavLink to="/contactUs">Contact Us</NavLink>
      </li>
    </>
  );

  return (
    <div className="pt-16">
      <div className="fixed top-0 left-0 w-full bg-[#e9e6e3] dark:bg-black shadow-sm z-50 dark:border-b dark:border-b-slate-600">
        <div className="navbar px-4 lg:gap-2 md:px-8 2xl:px-0 rounded-[16px] py-2 md:py-4 max-w-[1400px] mx-auto">
          <div className="navbar-start">
            <div className="dropdown z-50">
              <div
                tabIndex={0}
                role="button"
                className="lg:hidden mr-4"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 dark:text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </div>
              <ul
                tabIndex={0}
                className="menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow dark:bg-[#f0d5ba]"
              >
                {links}
              </ul>
            </div>
            <Link
              to="/"
              className="text-[20px] md:text-[28px] lg:text-[32px] font-bold flex items-center gap-1"
            >
              <img className="h-5 lg:h-7" src={logo} alt="" />
              <span className="dark:text-white">LuxeWay</span>
            </Link>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu-horizontal lg:text-sm xl:text-base font-medium space-x-5 xl:space-x-8 dark:text-white">
              {links}
            </ul>
          </div>
          <div className="navbar-end">
            <img
              onClick={() => {
                toggleTheme();
              }}
              src={theme == "light" ? toggle_light : toggle_dark}
              alt=""
              className="w-8 cursor-pointer mr-5"
            />
            {user ? (
              <div className="dropdown dropdown-end z-50">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="w-10 rounded-full">
                    <img alt="profile" src={user.photoURL} />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow dark:bg-black"
                >
                  <li className="bg-gray-200 dark:bg-[#C19B76] dark:text-black rounded-lg font-semibold">
                    <Link to="/" onClick={logOut}>
                      <span className="flex items-center">
                        <BiLogOut className="w-4 h-4 mr-2" />
                        Sign out
                      </span>
                    </Link>
                  </li>
                </ul>
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-1 text-lg font-medium text-white bg-gradient-to-r from-[#C19B76] to-[#A67C5B] overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg ml-3 rounded-lg"
                >
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

import { Link, NavLink } from "react-router-dom";
import logo from "../assets/hotel.svg";
import "./Navbar.css";
import useAuth from "../hookes/useAuth";

const Navbar = () => {
  const { user, logOut } = useAuth();

  const links = (
    <>
      <li className="hover:text-[#C19B76]">
        <NavLink to="/">Home</NavLink>
      </li>
      <li className="hover:text-[#C19B76]">
        <NavLink to="/rooms">Rooms</NavLink>
      </li>
      <li className="hover:text-[#C19B76]">
        <NavLink to="/myBookings">My Bookings</NavLink>
      </li>
    </>
  );

  return (
    <div className="pt-16">
      <div className="fixed top-0 left-0 w-full bg-[#e9e6e3] shadow-sm z-50">
        <div className="navbar lg:gap-2 md:px-10 lg:px-5 xl:px-0 rounded-[16px] py-2 md:py-4 max-w-[1400px] mx-auto">
          <div className="navbar-start">
            <div className="dropdown z-50">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost lg:hidden"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
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
                className=" menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
              >
                {links}
              </ul>
            </div>
            <Link
              to="/"
              className="text-[20px] md:text-[28px] lg:text-[32px] font-bold flex items-center gap-1"
            >
              <img className="h-5 lg:h-7" src={logo} alt="" />
              <span>LuxeWay</span>
            </Link>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className=" menu-horizontal lg:text-sm xl:text-base font-medium space-x-5 xl:space-x-8">
              {links}
            </ul>
          </div>
          <div className="navbar-end">
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
                  className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                >
                  <li className="bg-gray-200 rounded-lg font-semibold">
                    <Link to="/" onClick={logOut}>
                      Logout
                    </Link>
                  </li>
                </ul>
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-1 bg-black hover:bg-[#C19B76] text-white font-bold ml-3"
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

import { useEffect, useContext, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { HSStaticMethods, HSTooltip } from "preline";
import {
  Bars3Icon,
  UserCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Logo } from "@components";
import { MainContext } from "@hooks";
import DarkModeBtn from "./DarkModeBtn";
import Navbar from "./Navbar";
import { getRoleId } from "@/services";

export function Header() {
  const [cookies, setCookie, removeCookie] = useCookies(["token", "user"]);
  const [roleID, setRoleID] = useState(null);
  const { data, setData } = useContext(MainContext);
  const navigate = useNavigate();
  const [isTransparent, setIsTransparent] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation();

  const logout = () => {
    if (cookies.user?.isKeepLogin) {
      removeCookie("user");
      setCookie("token", cookies.token, { path: "/" });
    } else {
      removeCookie("user");
      removeCookie("token");
    }
    setRoleID(null); // Reset roleID when user logs out
    setData({ isLogin: false });
    navigate("/", { replace: true });
  };

  async function fetchRoleID() {
    const roleIDFromAPI = await getRoleId(cookies.token);
    setRoleID(roleIDFromAPI);
    console.log(roleIDFromAPI);
  }

  useEffect(() => {
    if (data.isLogin) {
      fetchRoleID();
    }
  }, [data.isLogin]);

  useEffect(() => {
    setTimeout(() => {
      HSStaticMethods.autoInit();
    }, 100);
  });

  useEffect(() => {
    const handleScroll = () => {
      const video = document.querySelector("video");
      const videoHeight = video ? video.clientHeight : window.innerHeight;
      const scrollPosition = window.scrollY;
      const isInHeroSection = scrollPosition < videoHeight;
      setIsTransparent(isInHeroSection);
      setIsVisible(scrollPosition >= videoHeight);
    };

    if (location.pathname === "/") {
      window.addEventListener("scroll", handleScroll);
      handleScroll(); // Check the scroll position when the component mounts
    } else {
      setIsVisible(true);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [location.pathname]);

  return (
    <header
      className={`fixed top-0 z-20 w-full transition-all duration-500 transform ${
        location.pathname === "/"
          ? isVisible
            ? "translate-y-0"
            : "-translate-y-full"
          : "translate-y-0"
      } ${
        location.pathname === "/"
          ? isTransparent
            ? "bg-transparent"
            : "bg-white dark:bg-gray-800"
          : "bg-white dark:bg-gray-800"
      }`}
    >
      <nav
        className="relative w-full flex flex-wrap md:grid md:grid-cols-12 basis-full items-center px-4 md:px-6 lg:px-8 mx-auto"
        aria-label="navbar"
      >
        <div className="md:col-span-3">
          <a
            className="flex-none rounded-xl text-xl inline-block font-semibold focus:outline-none focus:opacity-80"
            href="/"
            aria-label="logo"
          >
            <Logo
              className="w-14 h-auto text-gray-900 dark:text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </a>
        </div>

        <div className="flex items-center gap-x-2 ms-auto py-1 md:ps-6 md:order-3 md:col-span-3">
          {data.isLogin ? (
            <div className="hs-dropdown relative inline-flex">
              <button
                id="hs-dropdown-custom-icon-trigger"
                type="button"
                className="hs-dropdown-toggle flex justify-center items-center size-9 text-sm font-semibold z-30 rounded-lg bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
              >
                <UserCircleIcon
                  className="flex-none size-5 text-gray-700 dark:text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </button>
              <div
                className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden w-fit bg-white shadow-md rounded-lg p-2 mt-2 dark:bg-gray-800 dark:border dark:border-gray-700"
                aria-labelledby="hs-dropdown-custom-icon-trigger"
              >
                <Link
                  className="flex items-center w-full gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700"
                  to="/my-profile"
                >
                  Hồ sơ của tôi
                </Link>
                {roleID === 1 ? (
                  <Link
                    className="flex items-center w-full gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700"
                    to="/dashboard"
                  >
                    Dashboard
                  </Link>
                ) : roleID === 4 || roleID === 5 || roleID === 6 ? (
                  <Link
                    className="flex items-center w-full gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700"
                    to="/yeu-cau"
                  >
                    Quản lý đơn hàng
                  </Link>
                ) : (
                  <Link
                    className="flex items-center w-full gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700"
                    to="/don-hang"
                  >
                    Đơn hàng của tôi
                  </Link>
                )}

                <button
                  className="flex items-center w-full gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700"
                  type="button"
                  onClick={logout}
                >
                  Đăng xuất
                </button>
              </div>
            </div>
          ) : (
            <>
              <NavLink
                to="/login"
                className="py-2 px-4 inline-flex items-center gap-x-2 font-medium rounded-md text-gray-900 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:hover:bg-gray-700 dark:focus:ring-gray-800 dark:text-white"
              >
                Đăng nhập
              </NavLink>
              <NavLink
                to="/signup"
                className="py-2 px-4 inline-flex items-center gap-x-2 font-medium rounded-md bg-blue-600 text-white hover:bg-blue-500 transition disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-blue-500 dark:hover:bg-blue-500 dark:focus:bg-blue-500"
              >
                Đăng ký
              </NavLink>
            </>
          )}
          <div className="md:hidden">
            <button
              type="button"
              className="hs-collapse-toggle size-10 flex justify-center items-center text-sm font-semibold rounded-lg text-gray-900 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-gray-700"
              data-hs-collapse="#navbar-collapse-with-animation"
              aria-controls="navbar-collapse-with-animation"
              aria-label="Toggle navigation"
            >
              <Bars3Icon
                className="hs-collapse-open:hidden flex-shrink-0 size-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <XMarkIcon
                className="hs-collapse-open:block hidden flex-shrink-0 size-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </button>
          </div>
          <DarkModeBtn />
        </div>
        <Navbar isTransparent={isTransparent} />
      </nav>
    </header>
  );
}

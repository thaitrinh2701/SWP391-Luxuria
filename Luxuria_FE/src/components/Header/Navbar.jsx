import { NavLink, useLocation } from "react-router-dom";

function NavbarItem({ title, path, isTransparent }) {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <NavLink
      className={({ isActive }) =>
        `md:text-xs xl:text-base transition-colors duration-200 transform font-medium sm:mx-1.5 relative w-fit sm:block after:block after:content-[''] after:absolute after:h-[3px] after:w-full after:transition after:duration-300 after:origin-left ${
          isActive ||
          (path === "/tin-tuc" && location.pathname.split("/")[1] === "post") ||
          (path === "/my-profile" &&
            location.pathname.split("/")[1] === "my-profile") ||
          (isHomePage &&
            (location.pathname.split("/")[1] === "faq" ||
              location.pathname.split("/")[1] === "dashboard" ||
              location.pathname.split("/")[1] === "policy" ||
              location.pathname.split("/")[1] === "privacy-policy" ||
              location.pathname.split("/")[1] === "return-policy"))
            ? "text-blue-600 dark:text-white after:scale-x-100"
            : isTransparent && isHomePage
            ? "text-white"
            : "text-gray-900 dark:text-gray-200 dark:hover:text-gray-50 hover:text-blue-600 after:scale-x-0 after:hover:scale-x-100"
        }`
      }
      to={path}
    >
      <span>{title}</span>
    </NavLink>
  );
}

function Navbar({ isTransparent }) {
  const defaultNavbar = [
    { title: "Trang chủ", path: "/" },
    { title: "Trang sức", path: "/trang-suc" },
    { title: "Tin tức", path: "/tin-tuc" },
    { title: "Gia công", path: "/gia-cong" },
    { title: "Giá vàng", path: "/gia-vang" },
  ];

  return (
    <div
      id="navbar-collapse-with-animation"
      className="hs-collapse hidden transition-all duration-300 basis-full grow md:block md:w-auto md:basis-auto md:order-2 md:col-span-6"
    >
      <div className="flex flex-col gap-y-4 gap-x-0 mt-5 md:flex-row md:justify-center md:items-center md:gap-y-0 md:gap-x-7 md:mt-0">
        {defaultNavbar.map((item) => (
          <NavbarItem
            key={item.title}
            title={item.title}
            path={item.path}
            isTransparent={isTransparent}
          />
        ))}
      </div>
    </div>
  );
}

export default Navbar;

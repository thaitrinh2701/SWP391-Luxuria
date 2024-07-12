import { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

function NavbarItem({ title, path, icon, children }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleMouseEnter = () => {
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div
      className="relative"
      ref={dropdownRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <NavLink
        to={path}
        className={({ isActive }) =>
          `md:text-xs xl:text-base transition-colors duration-200 transform font-medium sm:mx-1.5 relative w-fit sm:block after:block after:content-[''] after:absolute after:h-[3px] after:w-full after:transition after:duration-300 after:origin-left cursor-pointer text-lg flex items-center ${
            isActive && title !== "Trang sức" ? "text-blue-500 after:bg-blue-500" : "text-gray-700 dark:text-white after:bg-transparent"
          }`
        }
      >
        {title}
        {icon && <FontAwesomeIcon icon={icon} className="ml-2" />}{" "}
      </NavLink>

      {children && isOpen && (
        <div className="absolute left-0 mt-1 bg-white shadow-lg rounded-md py-2 w-40 z-10 transition ease-in-out duration-300 dark:bg-[#1F2937]">
          {children}
        </div>
      )}
    </div>
  );
}

function Navbar({ isTransparent }) {
  const defaultNavbar = [
    { title: "Trang chủ", path: "/" },
    {
      title: "Trang sức",
      icon: faChevronDown,
      children: [
        { title: "Nhẫn", path: "/trang-suc/1" },
        { title: "Bông tai", path: "/trang-suc/2" },
        { title: "Vòng", path: "/trang-suc/3" },
        { title: "Vòng tay", path: "/trang-suc/4" },
        { title: "Vòng cổ", path: "/trang-suc/5" },
        { title: "Mặt dây chuyền", path: "/trang-suc/6" },
      ],
    },
    { title: "Tin tức", path: "/tin-tuc" },
    { title: "Gia công", path: "/gia-cong" },
    { title: "Giá vàng", path: "/gia-vang" },
    { title: "Về chúng tôi", path: "/about-us" },
  ];

  return (
    <div
      id="navbar-collapse-with-animation"
      className="hs-collapse hidden transition-all duration-300 basis-full grow md:block md:w-auto md:basis-auto md:order-2 md:col-span-6"
    >
      <div className="flex flex-col gap-y-4 gap-x-0 mt-5 md:flex-row md:justify-center md:items-center md:gap-y-0 md:gap-x-7 md:mt-0 dark:text-white">
        {defaultNavbar.map((item) => (
          <NavbarItem
            key={item.title}
            title={item.title}
            path={item.path}
            isTransparent={isTransparent}
            icon={item.icon}
          >
            {item.children &&
              item.children.map((child) => (
                <NavLink
                  key={child.title}
                  to={child.path}
                  className="block rounded px-4 py-2 text-gray-700 hover:bg-blue-100 dark:bg-[#1F2937] dark:text-white dark:hover:bg-[#374151] dark:hover:text-white hover:text-gray-900 transition ease-in-out duration-200 text-sm"
                >
                  {child.title}
                </NavLink>
              ))}
          </NavbarItem>
        ))}
      </div>
    </div>
  );
}

export default Navbar;

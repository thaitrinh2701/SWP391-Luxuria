import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  ChevronDoubleRightIcon,
  UserCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { faCartShopping, faPlus, faList } from "@fortawesome/free-solid-svg-icons";
import { useRole } from "@/hooks/roleProvider";

export function Sidebar() {
  const roleID = useRole();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (isOpen) {
      setIsOpen(false);
    }
  }, [location]);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex h-full">
      <button
        type="button"
        className="lg:hidden text-gray-500 hover:text-gray-600 p-2 fixed top-16 left-2 z-50"
        aria-label="Toggle navigation"
        onClick={toggleSidebar}
      >
        <span className="sr-only">Toggle Navigation</span>
        {isOpen ? (
          <XMarkIcon className="w-6 h-6" />
        ) : (
          <ChevronDoubleRightIcon className="w-6 h-6" />
        )}
      </button>
      <div
        className={`fixed inset-0 z-40 flex flex-col lg:static lg:flex-col lg:w-72 lg:h-full lg:min-h-screen bg-white dark:bg-[#1F2937] border-r border-gray-200 dark:border-[#1F2937] transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex-1 p-6 overflow-y-auto">
          <div className="flex items-center justify-between mb-6 lg:hidden">
            <Link
              className="text-xl font-semibold text-gray-900 dark:text-white"
              to="/"
            >
              Luxuria
            </Link>
            <button
              type="button"
              className="text-gray-500 hover:text-gray-600"
              aria-label="Close navigation"
              onClick={toggleSidebar}
            >
              <span className="sr-only">Close Navigation</span>
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>
          <div className="hidden lg:block mb-6">
            <Link
              className="text-xl font-semibold text-gray-900 dark:text-white"
              to="/"
            >
              Luxuria
            </Link>
          </div>
          <div className="space-y-1.5">
            <ul className="space-y-1.5">
              <li>
                <NavLink
                  className={({ isActive }) =>
                    `flex items-center gap-3.5 py-2 px-2.5 text-sm rounded-lg hover:bg-gray-100 dark:hover:bg-[#374151] ${
                      isActive
                        ? "bg-gray-200 dark:bg-[#374151] text-gray-900 dark:text-white"
                        : "text-gray-700 dark:text-neutral-400"
                    }`
                  }
                  to="/my-profile"
                >
                  <UserCircleIcon className="w-5 h-5" />
                  Thông tin của tôi
                </NavLink>
              </li>
              {(roleID === 2 || roleID === 3) && (
                <li>
                  <NavLink
                    className={({ isActive }) =>
                      `flex items-center gap-3.5 py-2 px-2.5 text-sm rounded-lg hover:bg-gray-100 dark:hover:bg-[#374151] ${
                        isActive
                          ? "bg-gray-200 dark:bg-[#374151] text-gray-900 dark:text-white"
                          : "text-gray-700 dark:text-neutral-400"
                      }`
                    }
                    to="/don-hang"
                  >
                    <FontAwesomeIcon
                      icon={faCartShopping}
                      className="w-5 h-5"
                    />
                    Đơn đặt hàng
                  </NavLink>
                </li>
              )}
              {(roleID === 2 ||
                roleID === 3 ||
                roleID === 4 ||
                roleID === 5 ||
                roleID === 6) && (
                <li>
                  <NavLink
                    className={({ isActive }) =>
                      `flex items-center gap-3.5 py-2 px-2.5 text-sm rounded-lg hover:bg-gray-100 dark:hover:bg-[#374151] ${
                        isActive
                          ? "bg-gray-200 dark:bg-[#374151] text-gray-900 dark:text-white"
                          : "text-gray-700 dark:text-neutral-400"
                      }`
                    }
                    to="/yeu-cau"
                  >
                    <FontAwesomeIcon icon={faPlus} className="w-5 h-5" />
                    Yêu cầu
                  </NavLink>
                </li>
              )}
              {(
                roleID === 6) && (
                <li>
                  <NavLink
                    className={({ isActive }) =>
                      `flex items-center gap-3.5 py-2 px-2.5 text-sm rounded-lg hover:bg-gray-100 dark:hover:bg-[#374151] ${
                        isActive
                          ? "bg-gray-200 dark:bg-[#374151] text-gray-900 dark:text-white"
                          : "text-gray-700 dark:text-neutral-400"
                      }`
                    }
                    to="/tien-do"
                  >
                    <FontAwesomeIcon icon={faList} className="w-5 h-5" />
                    Tiến độ
                  </NavLink>
                </li>
              )}
            </ul>
          </div>
        </div>
        <div className="px-6 pb-6">
          <a
            className="text-blue-500 dark:text-blue-400"
            href="https://facebook.com/nhat.lonhh"
            target="_blank"
            rel="noopener noreferrer"
          >
            Facebook
          </a>
        </div>
      </div>
    </div>
  );
}

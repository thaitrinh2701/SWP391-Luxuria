import { NavLink } from "react-router-dom";
import { FOOTER_LIST } from "@utils/constant";
import { Logo } from "@components";

export function Footer() {
  return (
    <footer className="w-full bg-white dark:bg-gray-800 z-[60]">
      <div className="mx-auto max-w-screen-2xl">
        <div className="flex flex-row items-center justify-between px-8 py-2.5">
          <Logo
            className="w-20 h-auto text-gray-900 dark:text-white"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <div className="flex flex-row grow w-full max-w-md items-center justify-around order-last">
            {FOOTER_LIST.mainList.map((item, index) => (
              <div key={index}>
                <p className="font-medium text-gray-900 dark:text-white">
                  {item.title}
                </p>
                <ul className="mt-2 space-y-1">
                  {item.children.map((link, index) => (
                    <li key={index}>
                      <NavLink
                        to={link.url}
                        className={({ isActive }) =>
                          `transition font-semibold text-sm ${
                            isActive
                              ? "text-blue-500"
                              : "text-gray-700 hover:text-blue-500 dark:text-gray-200"
                          }`
                        }
                      >
                        {link.title}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-2.5 border-t border-gray-400">
          <div className="sm:flex sm:justify-between sm:items-center px-8 py-1.5">
            <p className="text-xs text-gray-600 dark:text-gray-300">
              &copy; 2024. Luxuria. Đã bảo lưu mọi quyền.
            </p>
            <ul className="flex flex-wrap justify-between items-center gap-4 sm:mt-0 lg:justify-end">
              {FOOTER_LIST.subList.map((item, index) => (
                <li key={index}>
                  <NavLink
                    to={item.url}
                    className={({ isActive }) => `
                   transition font-semibold text-xs ${
                     isActive
                       ? "text-blue-500"
                       : "text-gray-600 hover:text-blue-500 dark:text-gray-200"
                   }
                  `}
                  >
                    {item.title}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

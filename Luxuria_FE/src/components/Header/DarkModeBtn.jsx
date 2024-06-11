import { useState } from "react";
import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";
import { useDarkMode } from "@hooks";

function DarkModeBtn() {
  const [colorTheme, setTheme] = useDarkMode();
  const [isDarkMode, setIsDarkMode] = useState(
    colorTheme === "light" ? true : false
  );
  return (
    <div
      data-nosnippet
      className="flex items-center rounded-lg h-fit w-fit justify-end sm:justify-normal ml-6 bg-transparent sm:hover:bg-gray-200 sm:dark:hover:bg-gray-700 group order-last"
    >
      <button
        type="button"
        className="block p-1.5"
        onClick={() => {
          setTheme(isDarkMode == true ? "light" : "dark");
          setIsDarkMode(!isDarkMode);
        }}
        aria-label="Toggle dark mode"
      >
        {isDarkMode ? (
          <SunIcon
            className="size-5 text-gray-700 group-hover:text-blue-600 font-medium dark:text-gray-400 dark:group-hover:text-gray-200 group-hover:rotate-180 duration-300"
            strokeWidth={2}
            aria-label="light mode"
          />
        ) : (
          <MoonIcon
            className="size-5 text-gray-700 group-hover:text-blue-600 font-medium dark:text-gray-400 dark:group-hover:text-gray-200 group-hover:rotate-[360deg] duration-500"
            strokeWidth={2}
            aria-label="dark mode"
          />
        )}
      </button>
    </div>
  );
}

export default DarkModeBtn;

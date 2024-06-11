import { useEffect } from "react";
import { HSOverlay, HSStaticMethods } from "preline";
import { XMarkIcon } from "@heroicons/react/24/outline";

export function Modal({ id, isHeader, title, children }) {
  useEffect(() => {
    setTimeout(() => {
      HSStaticMethods.autoInit();
      HSOverlay.autoInit();
    }, 300);
  }, []);
  return (
    <div
      id={id}
      className="hs-overlay hidden size-full fixed top-0 start-0 z-30 overflow-x-hidden overflow-y-auto pointer-events-none"
    >
      <div className="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto min-h-[calc(100%-3.5rem)] flex items-center">
        <div className="w-full flex flex-col bg-white border shadow-sm rounded-md pointer-events-auto dark:bg-gray-800 dark:border-gray-700 dark:shadow-gray-700/70">
          {isHeader && (
            <div className="flex justify-between items-center py-3 px-4">
              <h3 className="font-semibold text-base uppercase text-gray-800 dark:text-white">
                {title}
              </h3>
              <button
                type="button"
                className="flex justify-center items-center size-7 text-sm font-semibold rounded-lg border border-transparent text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-gray-700"
                data-hs-overlay={`#${id}`}
              >
                <span className="sr-only">Close</span>
                <XMarkIcon
                  className="flex-shrink-0 size-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </button>
            </div>
          )}
          {children}
        </div>
      </div>
    </div>
  );
}

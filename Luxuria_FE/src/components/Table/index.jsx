import { useEffect } from "react";
import { HSOverlay, HSStaticMethods } from "preline";

export function Table({ isCheckbox, isEditable, headers, children }) {
  useEffect(() => {
    setTimeout(() => {
      HSStaticMethods.autoInit();
      HSOverlay.autoInit();
    }, 300);
  }, []);
  return (
    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
      <thead className="bg-gray-50 dark:bg-gray-800">
        <tr>
          {isCheckbox && (
            <th scope="col" className="ps-6 py-3 text-start">
              <label htmlFor="hs-at-with-checkboxes-main" className="flex">
                <input
                  type="checkbox"
                  className="shrink-0 border-gray-300 rounded text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-800 dark:border-gray-600 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                  id="hs-at-with-checkboxes-main"
                />
                <span className="sr-only">Checkbox</span>
              </label>
            </th>
          )}

          {/* <th scope="col" className="ps-6 lg:ps-3 xl:ps-0 pe-6 py-3 text-start"> */}
          {headers.map((item, index) => (
            <th
              key={index}
              scope="col"
              className={`py-3 text-start ${
                index === 0 ? "ps-4 w-16" : "px-6"
              }`}
            >
              <div className="flex items-center gap-x-2">
                <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                  {item.title}
                </span>
              </div>
            </th>
          ))}

          {isEditable && <th scope="col" className="px-6 py-3 text-end"></th>}
        </tr>
      </thead>

      <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
        {children}
      </tbody>
    </table>
  );
}

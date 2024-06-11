import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";
import { StatusIcon } from "@components";

export function Card({ isTooltip, tooltipMsg, title, value, previousValue }) {
  return (
    <div className="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-gray-800 dark:border-gray-700">
      <div className="p-4 md:p-5">
        <div className="flex items-center gap-x-2">
          <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-500">
            {title}
          </p>
          {isTooltip && (
            <div className="hs-tooltip">
              <div className="hs-tooltip-toggle">
                <QuestionMarkCircleIcon
                  className="flex-shrink-0 size-4 text-gray-500 dark:text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <span
                  className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-10 py-1 px-2 bg-gray-900 text-xs font-medium text-white rounded shadow-sm dark:bg-gray-700"
                  role="tooltip"
                >
                  {tooltipMsg}
                </span>
              </div>
            </div>
          )}
        </div>

        <div className="mt-1 flex items-center gap-x-2">
          <h3 className="text-xl sm:text-2xl font-medium text-gray-800 dark:text-gray-200">
            {value}
          </h3>
          {previousValue && <StatusIcon previousValue={previousValue} />}
        </div>
      </div>
    </div>
  );
}

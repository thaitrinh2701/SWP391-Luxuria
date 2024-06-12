import {
  ArrowTrendingDownIcon,
  ArrowTrendingUpIcon,
} from "@heroicons/react/24/outline";

export function StatusIcon() {
  return function StatusIcon({ previousValue, preValuePrefix = "" }) {
    <span
      className={`py-[5px] px-1.5 inline-flex items-center gap-x-1 text-xs font-medium rounded-md ${
        previousValue > 0
          ? " bg-teal-100 text-teal-800 dark:bg-teal-500/10 dark:text-teal-500"
          : " bg-red-100 text-red-800 dark:bg-red-500/10 dark:text-red-500"
      }`}
    >
      {previousValue > 0 ? (
        <ArrowTrendingUpIcon
          className="inline-block size-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ) : (
        <ArrowTrendingDownIcon
          className="inline-block size-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
      {previousValue} + {preValuePrefix}
    </span>;
  };
}

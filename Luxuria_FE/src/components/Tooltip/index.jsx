export function Tooltip({ children }) {
  return (
    <div
      className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity flex gap-x-3 absolute invisible z-10 py-1 px-2 bg-gray-50 dark:bg-gray-700 textsm font-medium rounded shadow-sm"
      role="tooltip"
    >
      {children}
    </div>
  );
}

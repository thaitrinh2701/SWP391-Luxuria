import { XMarkIcon } from "@heroicons/react/24/outline";

export function EmptyState({
  title = "Không có dữ liệu!",
  message = "Vui lòng kiểm tra kết nối Internet!",
}) {
  return (
    <div className="mx-auto flex h-[60vh] w-full items-center border bg-white text-center sm:mx-0  sm:rounded-lg dark:border-gray-700 dark:bg-gray-900">
      <div className="mx-auto flex w-full flex-col px-4 py-4 sm:py-8">
        <div className="mx-auto rounded-full p-1 text-gray-800 sm:p-2 bg-gray-50 dark:bg-gray-800 dark:text-white">
          <XMarkIcon
            fill="none"
            strokeWidth="2"
            stroke="currentColor"
            className="size-7"
          />
        </div>
        <h1 className="mt-3 text-base font-medium text-gray-800 sm:text-lg sm:font-normal dark:text-white">
          {title}
        </h1>
        <p className="mt-2 whitespace-pre-line text-sm text-gray-500 antialiased hover:subpixel-antialiased sm:text-base dark:text-gray-400">
          {message}
        </p>
      </div>
    </div>
  );
}

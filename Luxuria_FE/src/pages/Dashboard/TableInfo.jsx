import { useState } from "react";
import { Table, Tooltip, EmptyState } from "@components";
import { DASHBOARD_CONFIG, DASHBOARD_TABLE_HEADERS } from "@utils/constant";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  DocumentMagnifyingGlassIcon,
  ExclamationCircleIcon,
  PencilSquareIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";

function TableBody({ data, onButtonClick }) {
  const successClass =
    "bg-teal-50 text-teal-700 rounded-full dark:bg-teal-500/5 dark:text-teal-500";
  const warningClass =
    "bg-orange-50 text-orange-700 rounded-full dark:bg-orange-500/5 dark:text-orange-500";
  const errorClass =
    "bg-red-50 text-red-700 rounded-full dark:bg-red-500/5 dark:text-red-500";
  const pendingClass =
    "bg-blue-50 text-blue-700 rounded-full dark:bg-blue-500/5 dark:text-blue-500";

  return data.map((item, index) => (
    <tr key={index}>
      <td className="whitespace-nowrap w-16 p-4">
        <div className="flex items-center gap-x-3">
          <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">
            #{item.request?.id}
          </span>
        </div>
      </td>
      <td className="whitespace-nowrap p-4">
        <div className="flex items-center gap-x-3">
          <div className="flex-grow">
            <span className="block text-sm font-semibold text-gray-800 dark:text-gray-200 truncate max-w-56">
              {item.request?.user?.fullName}
            </span>
            <span className="block text-sm text-gray-500 dark:text-gray-500 truncate max-w-56">
              {item.request?.user?.email}
            </span>
            <Tooltip>
              <div className="p-2">
                <span className="block text-sm font-semibold text-gray-800 dark:text-gray-200">
                  {item.request?.user?.fullName}
                </span>
                <span className="block text-sm font-medium text-gray-600 dark:text-gray-400">
                  {item.request?.user?.email}
                </span>
              </div>
            </Tooltip>
          </div>
        </div>
      </td>
      <td className="whitespace-nowrap p-4">
        <div className="flex-grow">
          <span className="block text-sm font-semibold text-gray-800 dark:text-gray-200 truncate max-w-52">
            {item.product?.name}
          </span>
          <span className="block text-sm text-gray-500 dark:text-gray-500 truncate max-w-52">
            {item.product?.description}
          </span>
          <Tooltip>
            <div className="p-2">
              <span className="block text-sm font-semibold text-gray-800 dark:text-gray-200">
                {item.product?.name}
              </span>
              <span className="block text-sm font-medium text-gray-600 dark:text-gray-400">
                {item.product?.description}
              </span>
            </div>
          </Tooltip>
        </div>
      </td>
      <td className="whitespace-nowrap p-4">
        <div className="flex items-center gap-x-3">
          <span
            className={`text-xs ${
              item.process?.id === 7
                ? "text-green-500 dark:text-green-500"
                : "text-gray-600 dark:text-gray-400"
            }`}
          >
            {item.process?.id}/7
          </span>
          <div className="flex w-full h-1.5 bg-gray-200 rounded-full overflow-hidden dark:bg-gray-700">
            <div
              className={`flex justify-center ${
                item.process?.id === 7
                  ? "bg-green-600 w-full"
                  : item.process?.id === 6
                  ? "bg-blue-600"
                  : item.process?.id >= 3
                  ? "bg-orange-600"
                  : "bg-gray-600 dark:bg-gray-400"
              }`}
              role="progressbar"
              style={{ width: `${(item.process?.id / 7) * 100}%` }}
              aria-valuenow={(item.process?.id / 7) * 100}
              aria-valuemin="0"
              aria-valuemax="100"
            ></div>
          </div>
        </div>
      </td>
      <td className="whitespace-nowrap p-4">
        <span
          className={`py-1 px-1.5 inline-flex items-center gap-x-1 text-xs font-medium ${
            item.state?.id === 3 || item.state?.id === 10
              ? errorClass
              : item.state?.id === 8
              ? pendingClass
              : item.state?.id === 9
              ? successClass
              : warningClass
          }`}
        >
          {item.state?.id === 3 || item.state?.id === 10 ? (
            <XCircleIcon className="size-5" />
          ) : item.state?.id === 8 || item.state?.id === 9 ? (
            <CheckCircleIcon className="size-5" />
          ) : (
            <ExclamationCircleIcon className="size-5" />
          )}
          <span className="truncate w-full max-w-[4.5rem] pr-1">
            {item.state?.name}
          </span>
        </span>
        <Tooltip>
          <span
            className={`py-1 px-1.5 inline-flex items-center gap-x-1 ${
              item.state?.id === 3 || item.state?.id === 10
                ? errorClass
                : item.state?.id === 8
                ? pendingClass
                : item.state?.id === 9
                ? successClass
                : warningClass
            }`}
          >
            {item.state?.id === 3 || item.state?.id === 10 ? (
              <XCircleIcon className="size-5" />
            ) : item.state?.id === 8 || item.state?.id === 9 ? (
              <CheckCircleIcon className="size-5" />
            ) : (
              <ExclamationCircleIcon className="size-5" />
            )}
            <span className="truncate w-full pr-1">{item.state?.name}</span>
          </span>
        </Tooltip>
      </td>
      <td className="whitespace-nowrap p-4">
        <span className="text-sm text-gray-600 dark:text-gray-400">
          {new Date(item.orderCreatedAt || "01/01/1970").toLocaleString(
            "vi-VN",
            { timeZone: "Asia/Ho_Chi_Minh" }
          )}
        </span>
      </td>
      <td className="whitespace-nowrap p-4">
        <button
          className="flex items-center justify-center dark:text-gray-400 text-gray-600 cursor-pointer"
          type="button"
          data-hs-overlay="#info-modal"
          onClick={() => onButtonClick(item)}
        >
          <DocumentMagnifyingGlassIcon className="size-5" />
        </button>
      </td>
    </tr>
  ));
}

function TableInfo({ title, subTitle, data, onButtonClick }) {
  const [pages, setPages] = useState(0);

  return (
    <>
      {data !== undefined ? (
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden dark:bg-gray-800 dark:border-gray-700">
          <div className="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-b border-gray-200 dark:border-gray-700">
            <div>
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                {title}
              </h2>
              {subTitle && (
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {subTitle}
                </p>
              )}
            </div>
          </div>

          <Table
            isCheckbox={false}
            isEditable={true}
            headers={DASHBOARD_TABLE_HEADERS}
          >
            <TableBody data={data} onButtonClick={onButtonClick} />
          </Table>

          <div className="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-t border-gray-200 dark:border-gray-700">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <span className="font-semibold text-gray-800 dark:text-gray-200">
                  {data.length}
                </span>{" "}
                đơn hàng
              </p>
            </div>

            {data.length > DASHBOARD_CONFIG.MAX_PRODUCT && (
              <div className="inline-flex gap-x-2">
                <button
                  type="button"
                  disabled={pages === 0}
                  onClick={() => setPages(pages - 1)}
                  className="py-1.5 px-2 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800"
                >
                  <ArrowLeftIcon className="flex-shrink-0 size-5" />
                  Quay lại
                </button>

                <button
                  type="button"
                  disabled={pages * DASHBOARD_CONFIG.MAX_PRODUCT >= data.length}
                  onClick={() => setPages(pages + 1)}
                  className="py-1.5 px-2 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800"
                >
                  Tiếp theo
                  <ArrowRightIcon className="flex-shrink-0 size-5" />
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <EmptyState />
      )}
    </>
  );
}

export default TableInfo;

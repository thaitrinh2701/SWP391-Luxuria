import { useState } from "react";
import {
  ClipboardDocumentIcon,
  ClipboardDocumentCheckIcon,
} from "@heroicons/react/24/outline";
function ModalItem({ id, title, value, isModify = false, handleChange }) {
  const [isCopy, setIsCopy] = useState(false);
  return (
    <>
      <label className="text-sm font-semibold leading-7 text-gray-700 dark:text-gray-200">
        {title}
      </label>
      {isModify ? (
        <input
          className="mt-1 flex h-fit w-full items-center justify-between rounded-sm bg-opacity-50 px-3 py-2 text-base leading-6 text-gray-700 outline outline-1 dark:outline-gray-700 outline-gray-200 transition-colors duration-200 ease-in-out dark:text-white bg-gray-100 dark:bg-gray-700"
          value={value}
          onChange={handleChange}
          id={id}
          name={id}
          type="text"
        />
      ) : (
        <div className="mt-1 flex h-fit w-full items-center justify-between rounded-sm bg-opacity-50 px-3 py-2 text-base leading-6 text-gray-700 outline outline-1 dark:outline-gray-700 outline-gray-200 transition-colors duration-200 ease-in-out dark:text-white">
          {typeof value === "boolean" ? (
            <span
              className={`block px-2 w-full font-semibold rounded-sm text-center dark:bg-gray-800 max-w-fit ${
                value
                  ? "text-emerald-500 bg-emerald-100/60"
                  : "text-red-500 bg-red-100/60"
              }`}
            >
              {value ? "Đã liên hệ" : "Chưa liên hệ"}
            </span>
          ) : (
            <>
              <span className="text-gray-900 dark:text-white mr-2">
                {value}
              </span>
              <button
                className="block transition-all transform duration-300"
                onClick={() => {
                  navigator.clipboard.writeText(value);
                  setIsCopy(true);
                  setTimeout(() => {
                    setIsCopy(false);
                  }, 4000);
                }}
              >
                {isCopy ? (
                  <ClipboardDocumentCheckIcon
                    className="h-5 w-5 flex-shrink-0 text-blue-500 transition-colors duration-300"
                    strokeWidth={2}
                  />
                ) : (
                  <ClipboardDocumentIcon
                    className="h-5 w-5 flex-shrink-0 text-gray-500 dark:text-gray-400 hover:text-blue-500 transition-colors duration-300"
                    strokeWidth={2}
                  />
                )}
              </button>
            </>
          )}
        </div>
      )}
    </>
  );
}

export default ModalItem;

import toast from "react-hot-toast";
import {
  CheckCircleIcon,
  InformationCircleIcon,
  ExclamationCircleIcon,
  XCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

export function Toast(
  id,
  type,
  title,
  subtitle,
  isProgress,
  progress,
  timeTotal,
  timeLeft,
  duration = 2500
) {
  // const textClass = {
  //   default: "text-gray-800 dark:text-gray-100",
  //   info: "text-blue-500 dark:text-blue-400",
  //   success: "text-green-500 dark:text-green-400",
  //   warning: "text-orange-500 dark:text-orange-400",
  //   error: "text-red-500 dark:text-red-400",
  // };

  const bgClass = {
    default: "bg-white dark:bg-gray-800",
    info: "bg-blue-500 dark:bg-blue-400",
    success: "bg-green-500 dabrk:bg-green-400",
    warning: "bg-orange-500 dark:bg-orange-400",
    error: "bg-red-500 dark:bg-red-400",
  };

  const containerClass = {
    default: "bg-white border-gray-400",
    info: "bg-blue-50 border-blue-500",
    success: "bg-green-50 border-green-500",
    warning: "bg-orange-50 border-orange-500",
    error: "bg-red-50 border-red-500",
  };

  toast.custom(
    (t) => (
      <div
        className={`flex flex-row grow items-center justify-center z-[5] w-fit mx-auto ${
          t.visible ? "relative top-2" : "-top-96 hidden"
        }`}
      >
        <div
          role="alert"
          className={`min-w-fit max-w-xs relative rounded sm:rounded-md shadow-lg dark:bg-gray-700 dark:border-gray-700 cursor-default
          ${
            type === "info"
              ? containerClass.info
              : type === "success"
              ? containerClass.success
              : type === "warning"
              ? containerClass.warning
              : type === "error"
              ? containerClass.error
              : containerClass.default
          }
          `}
        >
          <div className={subtitle ? "flex p-4" : "flex"}>
            <div
              className={`text-white rounded-s sm:rounded-s-md ${
                subtitle
                  ? "flex-shrink-0"
                  : "flex items-center justify-center p-2 w-12"
              } ${
                type === "info"
                  ? bgClass.info
                  : type === "success"
                  ? bgClass.success
                  : type === "warning"
                  ? bgClass.warning
                  : type === "error"
                  ? bgClass.error
                  : bgClass.default
              }`}
            >
              {type === "success" && (
                <CheckCircleIcon className="size-6" strokeWidth={2} />
              )}
              {type === "info" && (
                <InformationCircleIcon className="size-6" strokeWidth={2} />
              )}
              {type === "warning" && (
                <ExclamationCircleIcon className="size-6" strokeWidth={2} />
              )}
              {type === "error" && (
                <XCircleIcon className="size-6" strokeWidth={2} />
              )}
            </div>

            <div
              className={`flex grow ms-3 me-6 ${
                subtitle ? "" : "pe-6 items-center"
              }`}
            >
              <h3 className="text-gray-800 font-medium text-sm dark:text-white">
                {title}
              </h3>

              {subtitle && (
                <div className="mt-2 flex flex-col gap-x-3">
                  <span className="block mb-1.5 text-xs text-gray-500 dark:text-neutral-400">
                    {isProgress ? progress + " - " + timeLeft : subtitle}
                  </span>
                  {isProgress && (
                    <div
                      className="flex w-full h-1 bg-gray-200 rounded-full overflow-hidden dark:bg-gray-700"
                      role="progressbar"
                      aria-valuenow={progress}
                      aria-valuemin="0"
                      aria-valuemax="100"
                    >
                      <div
                        className="flex flex-col justify-center overflow-hidden bg-blue-600 text-xs text-white text-center whitespace-nowrap dark:bg-gray-200"
                        style={{ width: progress + "%" }}
                      ></div>
                    </div>
                  )}
                </div>
              )}

              <button
                type="button"
                className={`absolute inline-flex flex-shrink-0 justify-center items-center size-5 rounded-lg text-gray-800 opacity-50 hover:opacity-100 focus:outline-none focus:opacity-100 dark:text-white ${
                  subtitle ? "top-3 end-3" : "end-0 mx-3"
                }`}
                onClick={() => {
                  toast.dismiss(id);
                  setTimeout(() => {
                    toast.remove(id);
                  }, 250);
                }}
              >
                <span className="sr-only">Close</span>
                <XMarkIcon className="size-4 flex-shrink-0" />
              </button>
            </div>
          </div>
        </div>
      </div>
    ),
    { id: id, position: "top-center", duration: duration }
  );
}

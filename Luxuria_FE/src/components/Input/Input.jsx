import { forwardRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { PASSWORD_REQUIRED } from "@utils/constant";
import {
  HSTogglePassword,
  HSInputNumber,
  HSStrongPassword,
  HSStaticMethods,
} from "preline";
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  EyeIcon,
  EyeSlashIcon,
} from "@heroicons/react/24/outline";

const styles = {
  default:
    "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus:border-blue-500 focus:ring-blue-500 dark:focus:ring-blue-600",
  success:
    "bg-green-50 dark:bg-gray-800 border-green-300 dark:border-green-700 focus:border-green-500 focus:ring-green-500 dark:focus:ring-green-600",
  error:
    "bg-red-50 dark:bg-gray-800 border-red-300 dark:border-red-700 focus:border-red-500 focus:ring-red-500 dark:focus:ring-red-600",
};

function PasswordRequiredList() {
  return (
    <>
      <h4 className="mt-3 text-sm font-semibold text-gray-800 dark:text-white">
        Mật khẩu phải bao gồm:
      </h4>
      <ul className="space-y-1 text-sm text-gray-500 dark:text-neutral-500">
        {PASSWORD_REQUIRED.map((item) => (
          <li
            key={item["rule-text"]}
            data-hs-strong-password-hints-rule-text={item["rule-text"]}
            className="text-red-600 hs-strong-password-active:text-green-600 flex flex-row items-start gap-x-2"
          >
            <span className="hidden" data-check="">
              <CheckCircleIcon
                className="flex-shrink-0 size-4 mt-0.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </span>
            <span data-uncheck="">
              <ExclamationCircleIcon
                className="flex-shrink-0 size-4 mt-0.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </span>
            <span>{item["text"]}</span>
          </li>
        ))}
      </ul>
    </>
  );
}

export const Input = forwardRef(
  (
    {
      id,
      label,
      type = "text",
      placeholder,
      isRequired = false,
      isError,
      msg,
      isSubmitted,
      isResetable = false,
      ...rest
    },
    ref
  ) => {
    useEffect(() => {
      setTimeout(() => {
        HSStaticMethods.autoInit();
        HSStrongPassword.autoInit();
        HSTogglePassword.autoInit();
        HSInputNumber.autoInit();
      }, 100);
    }, []);

    let togglePassword = JSON.stringify({
      target: `#${id}`,
    });

    return (
      <div data-hs-input-number="">
        <label
          htmlFor={type === "textarea" ? "hs-autoheight-textarea" : id}
          className={`text-base font-medium text-gray-700 dark:text-gray-200 ${
            isResetable && type === "password"
              ? "flex justify-between items-center"
              : "block"
          }`}
        >
          <p>
            {label}
            {isRequired && <span className="text-red-500"> *</span>}
          </p>
          {isResetable && (
            <Link
              className="text-sm text-blue-600 decoration-2 hover:underline font-medium"
              to="/reset-password"
            >
              Quên mật khẩu?
            </Link>
          )}
        </label>
        <div className={type === "password" ? "relative flex-1" : "relative"}>
          {type === "textarea" ? (
            <textarea
              id="hs-autoheight-textarea"
              className={`p-3 mt-2 block w-full rounded-md text-sm text-gray-900 dark:text-gray-200 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:ring-1 border placeholder-gray-700 dark:placeholder-gray-500 ${
                isRequired && isSubmitted
                  ? isError
                    ? styles.error
                    : styles.success
                  : styles.default
              }`}
              rows="3"
              placeholder={placeholder}
            ></textarea>
          ) : (
            <input
              autoComplete="true"
              type={type === "number" ? "text" : type}
              id={id}
              name={id}
              placeholder={placeholder}
              className={`h-10 mt-1.5 py-2.5 px-3 block w-full rounded-md border focus:outline-none focus:ring-1 text-sm text-gray-900 shadow-sm dark:text-gray-200 disabled:opacity-50 disabled:pointer-events-none placeholder-gray-600 dark:placeholder-gray-400 ${
                isRequired && isSubmitted
                  ? isError
                    ? styles.error
                    : styles.success
                  : styles.default
              }`}
              ref={ref}
              {...rest}
            />
          )}
          {isSubmitted && (
            <div
              className={`absolute inset-y-0 flex items-center pointer-events-none ${
                type === "password" ? "end-10" : "end-3"
              }`}
            >
              {isRequired ? (
                isError?.message ? (
                  <ExclamationCircleIcon
                    className="flex-shrink-0 size-5 text-red-500"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                ) : (
                  <CheckCircleIcon
                    className="flex-shrink-0 size-5 text-green-500"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                )
              ) : null}
            </div>
          )}
          {type === "password" && (
            //? Reference: https://preline.co/docs/strong-password.html
            <>
              <button
                type="button"
                data-hs-toggle-password={togglePassword}
                className="absolute inset-y-0 end-3 flex items-center cursor-pointer mt-0.5"
              >
                <EyeIcon
                  className="hidden flex-shrink-0 size-5 text-gray-600 hs-password-active:block"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <EyeSlashIcon
                  className="flex-shrink-0 size-5 text-gray-600 hs-password-active:hidden"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </button>

              {/* Popover */}
              {/*
               //* Popover will show only in the signin page and not show the popover of confirm_password input
               //* remove && id != "confirm_password" if you want to show popover for confirm_password input
               */}
              {id === "password" && (
                <div
                  id="password-popover"
                  //* id={`${id}-popover`}    //* uncomment this and comment code above if you want to show popover for confirm_password input
                  className="hidden absolute z-10 w-full max-w-md bg-white shadow-md border border-gray-300 rounded-lg p-4 dark:bg-gray-700 dark:border dark:border-gray-700 dark:divide-gray-700"
                >
                  <div
                    id="hs-strong-password-in-popover"
                    data-hs-strong-password='{
                      "target":"#password",
                      "hints":"#password-popover",
                      "stripClasses":"hs-strong-password:opacity-100 hs-strong-password-accepted:bg-green-500 h-1.5 flex-auto rounded-full bg-blue-500 opacity-50 mx-1",
                      "mode":"popover",
                      "specialCharactersSet":"!@#$%^&*"
                      }'
                    className="flex mt-2 -mx-1"
                  ></div>
                  <PasswordRequiredList />
                </div>
              )}
            </>
          )}
        </div>
        {type !== "textarea" && (
          <p
            id={`${id}-error`}
            className={`text-xs italic mt-1 h-3.5 ${
              isError ? "text-red-600" : "text-green-600"
            }`}
          >
            {isError
              ? isError?.message
              : isSubmitted && type !== "textarea" && msg}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

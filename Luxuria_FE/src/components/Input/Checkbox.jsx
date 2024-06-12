import { forwardRef } from "react";

export const Checkbox = forwardRef(
  ({ id, isRequired = false, isError, msg, children, ...rest }, ref) => {
    return (
      <>
        <div className="flex flex-row items-start">
          <input
            id={id}
            name={id}
            type="checkbox"
            className="size-4 shrink-0 mt-1.5 border-gray-200 rounded text-blue-600 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
            ref={ref}
            {...rest}
          />
          <div className="ms-3">
            <label htmlFor={id} className="text-sm dark:text-white">
              {children}
              {isRequired && <span className="text-red-500"> *</span>}
            </label>
          </div>
        </div>
        <p
          id={`${id}-error`}
          className="text-xs italic mt-1 h-3.5 text-red-600"
        >
          {isError && msg}
        </p>
      </>
    );
  }
);

Checkbox.displayName = "Checkbox";

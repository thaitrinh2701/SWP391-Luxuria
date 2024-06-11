import { forwardRef } from "react";

export const Select = forwardRef(
  (
    {
      id,
      label,
      placeholder,
      options,
      isRequired = false,
      isError,
      msg,
      isSubmitted,
      ...rest
    },
    ref
  ) => {
    const dataHSSelect = JSON.stringify({
      placeholder: placeholder || "Vui lòng chọn một mục...",
      toggleTag: "<button type='button'></button>",
      toggleClasses:
        "hs-select-disabled:pointer-events-none hs-select-disabled:opacity-50 relative h-10 mt-1.5 py-2.5 px-3 border focus:ring-1 hs-error:bg-red-50 hs-error:dark:bg-red-200 hs-error:border-red-200 hs-error:dark:border-red-700 hs-error:focus:border-red-500 hs-error:focus:ring-red-500 hs-success:bg-green-50 hs-success:dark:bg-green-200 hs-success:border-green-200 hs-success:dark:border-green-700 hs-success:focus:border-green-500 hs-success:focus:ring-green-500 flex text-nowrap w-full cursor-pointer bg-white border border-gray-200 rounded-md text-start text-sm focus:border-blue-500 focus:ring-blue-500 before:absolute before:inset-0 before:z-[1] dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400",
      dropdownClasses:
        "mt-2 z-50 w-full max-h-72 p-1 space-y-0.5 bg-white border border-gray-200 rounded-lg overflow-hidden overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 dark:bg-neutral-900 dark:border-neutral-700",
      optionClasses:
        "py-2 px-4 w-full text-sm text-gray-800 cursor-pointer hover:bg-gray-100 rounded-lg focus:outline-none focus:bg-gray-100 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:text-neutral-200 dark:focus:bg-neutral-800",
      optionTemplate:
        '<div class="flex justify-between items-center w-full"><span data-title></span><span class="hidden hs-selected:block"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="flex-shrink-0 size-3.5 text-blue-600 dark:text-blue-500"><path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5"/></svg></span></div>',
      extraMarkup: [
        '<div class="hidden hs-error:block absolute top-1/2 end-10 -translate-y-1/2"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="flex-shrink-0 size-5 text-red-500"><path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg></div>',
        '<div class="hidden hs-success:flex absolute inset-y-0 end-10 items-center pointer-events-none"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="flex-shrink-0 size-5 text-green-500"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg></div>',
        '<div class="absolute top-1/2 end-3 -translate-y-1/2"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="flex-shrink-0 size-5 text-gray-500"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" /></svg></div>',
      ],
    });
    return (
      <div className={`${isError ? "error" : isSubmitted ? "success" : ""}`}>
        <label
          htmlFor={id}
          className="block text-base font-medium text-gray-700 dark:text-gray-200"
        >
          {label}
          {isRequired && <span className="text-red-500"> *</span>}
        </label>
        <select
          id={id}
          name={id}
          data-hs-select={dataHSSelect}
          className="hidden"
          ref={ref}
          {...rest}
        >
          {/* <option>{placeholder}</option> */}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        <p
          id={`${id}-error`}
          className={`text-xs italic mt-1 mb-2 h-3.5 ${
            isError ? "text-red-600" : "text-green-600"
          }`}
        >
          {isError ? isError?.message : isSubmitted && msg}
        </p>
      </div>
    );
  }
);

Select.displayName = "Select";

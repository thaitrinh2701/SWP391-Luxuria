import React, { useState } from "react";

function CategoryFilter({ onFilterChange }) {
  const [filters, setFilters] = useState({
    types: {
      "Vàng 14K": false,
      "Vàng 18K": false,
      "Vàng 23K": false,
      "Vàng kiểu Ý 750": false,
    },
    stones: {
      "Có đính": false,
      "Không đính": false,
    },
  });

  const handleCheckboxChange = (category, item) => {
    setFilters((prevFilters) => {
      const newFilters = {
        ...prevFilters,
        [category]: {
          ...prevFilters[category],
          [item]: !prevFilters[category][item],
        },
      };
      onFilterChange(newFilters);
      return newFilters;
    });
  };

  return (
    <div className="my-auto lg:w-1/3 p-4">
      <details
        open
        className="m-10 max-w-md w-screen overflow-hidden rounded-lg border border-gray-200 open:shadow-lg text-gray-700"
      >
        <summary className="flex cursor-pointer select-none items-center justify-between bg-gray-100 px-5 py-3 lg:hidden">
          <span className="text-sm font-medium">Toggle Filters</span>
          <svg
            className="h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </summary>
        <form className="flex flex-col gap-6 p-5 border-t border-gray-200 lg:border-t-0">
          <fieldset className="w-full">
            <legend className="block w-full bg-gray-50 px-5 py-3 text-xs font-medium">
              Loại vàng
            </legend>
            <div className="space-y-2 px-5 py-6">
              {Object.keys(filters.types).map((type) => (
                <div className="flex items-center" key={type}>
                  <input
                    id={type}
                    type="checkbox"
                    name={type}
                    checked={filters.types[type]}
                    onChange={() => handleCheckboxChange("types", type)}
                    className="h-5 w-5 rounded border-gray-300 focus:ring-blue-500"
                  />
                  <label htmlFor={type} className="ml-3 text-sm font-medium">
                    {type}
                  </label>
                </div>
              ))}
            </div>
          </fieldset>
          <fieldset className="w-full">
            <legend className="block w-full bg-gray-50 px-5 py-3 text-xs font-medium">
              Đá
            </legend>
            <div className="space-y-2 px-5 py-6">
              {Object.keys(filters.stones).map((stone) => (
                <div className="flex items-center" key={stone}>
                  <input
                    id={stone}
                    type="checkbox"
                    name={stone}
                    checked={filters.stones[stone]}
                    onChange={() => handleCheckboxChange("stones", stone)}
                    className="h-5 w-5 rounded border-gray-300 focus:ring-blue-500"
                  />
                  <label htmlFor={stone} className="ml-3 text-sm font-medium">
                    {stone}
                  </label>
                </div>
              ))}
            </div>
          </fieldset>
        </form>
        <div className="flex justify-between border-t border-gray-200 px-5 py-3">
          <button
            name="reset"
            type="button"
            className="rounded text-xs font-medium text-gray-600 underline hover:text-gray-800"
            onClick={() =>
              setFilters({
                types: {
                  "Vàng 14K": false,
                  "Vàng 18K": false,
                  "Vàng 23K": false,
                  "Vàng kiểu Ý 750": false,
                },
                stones: {
                  "Có đính": false,
                  "Không đính": false,
                },
              })
            }
          >
            Reset All
          </button>
        </div>
      </details>
    </div>
  );
}

export default CategoryFilter;

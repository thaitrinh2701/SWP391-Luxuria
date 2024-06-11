import React from "react";

function TrangSucSidebar({ sortBy, setSortBy }) {
  return (
    <div className="w-full md:w-1/4 p-4 bg-gray-100 dark:bg-[#374151] fixed md:relative h-full md:h-auto top-0 left-0 md:left-auto z-10 md:z-auto">
      <h2 className="text-xl font-bold mb-4 dark:text-white">Sort By</h2>
      <ul className="space-y-2">
        <li>
          <button
            className={`w-full text-left px-4 py-2 rounded ${
              sortBy === "name"
                ? "bg-blue-600 text-white"
                : "bg-white dark:bg-gray-700 dark:text-white"
            }`}
            onClick={() => setSortBy("name")}
          >
            Name
          </button>
        </li>
        <li>
          <button
            className={`w-full text-left px-4 py-2 rounded ${
              sortBy === "priceAsc"
                ? "bg-blue-600 text-white"
                : "bg-white dark:bg-gray-700 dark:text-white"
            }`}
            onClick={() => setSortBy("priceAsc")}
          >
            Price: Low to High
          </button>
        </li>
        <li>
          <button
            className={`w-full text-left px-4 py-2 rounded ${
              sortBy === "priceDesc"
                ? "bg-blue-600 text-white"
                : "bg-white dark:bg-gray-700 dark:text-white"
            }`}
            onClick={() => setSortBy("priceDesc")}
          >
            Price: High to Low
          </button>
        </li>
      </ul>
    </div>
  );
}

export default TrangSucSidebar;

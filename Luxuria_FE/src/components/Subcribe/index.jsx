import React from "react";

function Subcribe() {
  return (
    <section
      id="subcribe"
      className="bg-white py-20 dark:bg-[#111827] dark:text-white"
    >
      <div className="p-20 max-w-6xl py-10 px-4 sm:px-6 lg:px-8 lg:py-16 mx-auto">
        <div className="max-w-xl text-center mx-auto container">
          <div className="mb-5">
            <h2 className="text-4xl font-bold border-b-4 border-blue-600 inline-block pb-2">
              Sign up to our newsletter
            </h2>
          </div>
          <form>
            <div className="mt-5 lg:mt-8 flex flex-col items-center gap-2 sm:flex-row sm:gap-3">
              <div className="w-full">
                <label htmlFor="hero-input" className="sr-only">
                  Search
                </label>
                <input
                  type="text"
                  id="hero-input"
                  name="hero-input"
                  className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                  placeholder="Enter your email"
                />
              </div>
              <a
                className="w-full sm:w-auto whitespace-nowrap py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                href="#"
              >
                Subscribe
              </a>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Subcribe;

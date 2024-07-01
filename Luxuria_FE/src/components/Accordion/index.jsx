import { ChevronUpIcon } from "@heroicons/react/24/outline";

export function Accordion({ id, title, message }) {
  return (
    <div
      className={`hs-accordion hs-accordion-active:bg-white mr-4 bg-gray-100 rounded-md p-4 dark:hs-accordion-active:bg-gray-800 outline-none dark:bg-gray-800 ${
        id === 0 ? "active" : ""
      }`}
      id={`hs-basic-with-title-and-arrow-stretched-heading-${id}`}
    >
      <button
        className="hs-accordion-toggle group pb-3 inline-flex items-center justify-between gap-x-3 w-full md:text-lg font-semibold text-start text-gray-800 rounded-lg transition hover:text-blue-600 dark:text-gray-200 dark:hover:text-gray-200 hs-accordion-active:text-blue-500 outline-none dark:bg-gray-800"
        aria-controls={`hs-basic-with-title-and-arrow-stretched-collapse-${id}`}
      >
        <span className="flex-1 text-center">{title}</span>
        <ChevronUpIcon
          className="hs-accordion-active:rotate-180 hs-accordion-active:text-blue-500 transition-transform duration-200 block flex-shrink-0 size-5 text-gray-600 group-hover:text-gray-500 dark:text-gray-400"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
      </button>
      <div
        id={`hs-basic-with-title-and-arrow-stretched-collapse-${id}`}
        className={`hs-accordion-content w-full overflow-hidden transition-[height] duration-300 ${
          id === 0 ? "" : "hidden"
        }`}
        aria-labelledby={`hs-basic-with-title-and-arrow-stretched-heading-${id}`}
      >
        {Array.isArray(message) ? (
          <>
            <p className="text-gray-800 dark:text-gray-200 md:text-base p-2">
              <b className="text-xl">{message[0]}</b>
            </p>
            <ul className="list-disc pl-5 text-gray-800 dark:text-gray-200 text-sm md:text-base p-2">
              {message.slice(1).map((msg, id) => (
                <li key={id} className="mb-2 ml-3 text-xl">
                  {msg}
                </li>
              ))}
            </ul>
          </>
        ) : (
          <p className="text-gray-800 dark:text-gray-200 text-sm md:text-base p-2">
            {message}
          </p>
        )}
      </div>
    </div>
  );
}

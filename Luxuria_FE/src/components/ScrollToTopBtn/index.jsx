import { ArrowUpIcon } from "@heroicons/react/24/outline";
import { useScrollToTop } from "@hooks/useScrollToTop";

export function ScrollToTopBtn() {
  const { shown, scrollToTop } = useScrollToTop(300);

  return (
    <button
      data-nosnippet
      aria-label="scroll to top button"
      className={`z-20 size-8 transition-transform duration-200 flex fixed right-4 md:bottom-12 bottom-20 bg-blue-500 rounded text-white justify-center items-center shadow shadow-gray-500 dark:shadow-none ${
        shown ? "scale-100" : "scale-0"
      }`}
      onClick={scrollToTop}
    >
      <ArrowUpIcon className="size-5" strokeWidth={2} />
    </button>
  );
}

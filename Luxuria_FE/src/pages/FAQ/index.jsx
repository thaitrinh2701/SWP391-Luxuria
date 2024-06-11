import { useEffect } from "react";
import { Accordion } from "@components";
import { FAQ_LISTS } from "@utils/constant";
import { HSAccordion } from "preline";

function FaQ() {
  useEffect(() => {
    setTimeout(() => {
      HSAccordion.autoInit();
    }, 100);
  }, []);
  return (
    <div className="w-full mt-[4.5rem] pb-6 md:pb-12 px-4 sm:px-6 mx-auto dark:bg-gray-900 bg-gray-50">
      <div className="max-w-2xl mx-auto text-center mb-10">
        <h1 className="text-center text-blue-600 dark:text-white text-lg lg:text-xl xl:text-2xl uppercase font-bold mb-2 mt-4 whitespace-pre-line sm:whitespace-normal animate__animated animate__zoomIn animate__faster">
          Câu hỏi thường gặp
        </h1>
        <p className="mt-1 text-gray-600 dark:text-gray-400 text-sm">
          Nơi giải đáp những câu hỏi thường gặp
        </p>
      </div>
      <div className="hs-accordion-group max-w-4xl mx-auto space-y-3 mb-24 sm:mb-0 cursor-default select-none">
        {FAQ_LISTS.map((item) => (
          <Accordion
            key={item.id}
            id={item.id}
            title={item.title}
            message={item.message}
          />
        ))}
      </div>
    </div>
  );
}

export default FaQ;

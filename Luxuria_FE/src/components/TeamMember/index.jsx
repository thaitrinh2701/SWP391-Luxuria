import React from "react";

function TeamSection() {
  return (
    <section
      id="team"
      className="bg-white py-20 dark:bg-[#1F2937] dark:text-white"
    >
      {/* Team */}
      <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        {/* Title */}
        <div className="max-w-2xl mx-auto text-center mb-10 lg:mb-14">
          <h2 className="text-4xl font-inter font-bold border-b-4 border-blue-600 inline-block pb-2">
            Đội ngũ của chúng tôi
          </h2>
        </div>
        {/* End Title */}
        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          <div className="text-center">
            <img
              className="rounded-xl sm:h-48 sm:w-48 lg:h-60 lg:w-60 mx-auto"
              src="tct.jpg"
              alt="Image Description"
            />
            <div className="mt-2 sm:mt-4">
              <h3 className="text-sm font-medium text-gray-800 sm:text-base lg:text-lg dark:text-neutral-200">
                Trịnh Công Thái
              </h3>
              <p className="text-xs text-gray-600 sm:text-sm lg:text-base dark:text-neutral-400">
                Team Leader
              </p>
            </div>
          </div>
          {/* End Col */}
          <div className="text-center">
            <img
              className="rounded-xl sm:h-48 sm:w-48 lg:h-60 lg:w-60 mx-auto"
              src="cpnl.jpg"
              alt="Image Description"
            />
            <div className="mt-2 sm:mt-4">
              <h3 className="text-sm font-medium text-gray-800 sm:text-base lg:text-lg dark:text-neutral-200">
                Chu Phan Nhật Long
              </h3>
              <p className="text-xs text-gray-600 sm:text-sm lg:text-base dark:text-neutral-400">
                Frontend Developer
              </p>
            </div>
          </div>
          <div className="text-center">
            <img
              className="rounded-xl sm:h-48 sm:w-48 lg:h-60 lg:w-60 mx-auto"
              src="pnv.jpg"
              alt="Image Description"
            />
            <div className="mt-2 sm:mt-4">
              <h3 className="text-sm font-medium text-gray-800 sm:text-base lg:text-lg dark:text-neutral-200">
                Phạm Nguyên Vũ
              </h3>
              <p className="text-xs text-gray-600 sm:text-sm lg:text-base dark:text-neutral-400">
                Frontend Developer
              </p>
            </div>
          </div>
          {/* End Col */}
          <div className="text-center">
            <img
              className="rounded-xl sm:h-48 sm:w-48 lg:h-60 lg:w-60 mx-auto"
              src="lvdl.jpg"
              alt="Image Description"
            />
            <div className="mt-2 sm:mt-4">
              <h3 className="text-sm font-medium text-gray-800 sm:text-base lg:text-lg dark:text-neutral-200">
                Lê Vũ Đức Lương
              </h3>
              <p className="text-xs text-gray-600 sm:text-sm lg:text-base dark:text-neutral-400">
                Backend Developer
              </p>
            </div>
          </div>
          {/* End Col */}
          {/* End Col */}
        </div>
        {/* End Grid */}
      </div>
      {/* End Team */}
    </section>
  );
}

export default TeamSection;

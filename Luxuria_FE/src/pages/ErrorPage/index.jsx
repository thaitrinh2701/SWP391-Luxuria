import { useNavigate } from "react-router-dom";
import { HomeIcon } from "@heroicons/react/24/outline";
import { ErrorImg } from "@components";

function ErrorPage() {
  const navigate = useNavigate();
  return (
    <main className="relative flex justify-end flex-col mt-[4.5rem]">
      <ErrorImg className="text-gray-50 dark:text-gray-900 bg-contain bg-no-repeat h-[50vh] w-[80vw] lg:w-[50vw] mx-auto my-0 bg-center" />
      <div className="text-center pb-2 font-bold text-2xl xl:text-3xl bg-clip-text bg-gradient-to-tr from-blue-600 to-purple-400 text-transparent uppercase">
        <span>Trang không tồn tại</span>
        <div className="mt-4 flex justify-center items-center flex-row">
          <button
            className="w-fit sm:w-auto py-2.5 px-3.5 flex flex-row justify-center items-center gap-x-2 text-sm font-semibold rounded border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
            type="button"
            onClick={() => navigate("/", { replace: true })}
          >
            <HomeIcon
              className="flex-shrink-0 size-5 my-auto"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <span>Trang chủ</span>
          </button>
        </div>
      </div>
    </main>
  );
}

export default ErrorPage;

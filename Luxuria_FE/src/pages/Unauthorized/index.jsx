import { useNavigate } from "react-router-dom";
function Unauthorized() {
  const navigate = useNavigate();

  return (
    <section className="flex items-center h-full p-16 mt-[4.5rem] dark:bg-gray-50 dark:text-gray-800">
      <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
        <div className="max-w-md text-center">
          <h2 className="mb-8 font-extrabold text-9xl dark:text-gray-400">
            <span className="sr-only">Error</span>401
          </h2>
          <p className="text-2xl font-semibold md:text-3xl">Ưhy ảe you hể?</p>
          <p className="mt-4 mb-8 dark:text-gray-600">
            Có vẻ như bạn không có quyền truy cập trang này.
          </p>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-8 py-2 font-semibold rounded dark:bg-violet-600 dark:text-gray-50"
          >
            Quay lại
          </button>
        </div>
      </div>
    </section>
  );
}

export default Unauthorized;

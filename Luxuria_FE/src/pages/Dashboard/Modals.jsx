import HSOverlay from "@preline/overlay";
import { Modal } from "@components";
import {
  ExclamationTriangleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

function Modals() {
  return (
    <>
      <Modal id={"info-modal"} isHeader={true} title={"Thông tin chi tiết"}>
        <div className="flex justify-end items-center gap-x-2 py-3 px-4 border-t dark:border-gray-700">
          <button
            type="button"
            className="py-2 px-3 inline-flex items-center text-sm font-semibold rounded border border-red-400 bg-red-50 hover:bg-red-500 text-red-500 hover:text-white shadow-sm dark:bg-transparent dark:border-red-500 dark:hover:bg-red-500 dark:hover:text-white dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-red-600"
            data-hs-overlay="#delete-modal"
          >
            <span className="block">Xóa đơn hàng</span>
          </button>
          <button
            type="button"
            className="py-2 px-3 inline-flex items-center text-sm font-semibold rounded border border-blue-400 bg-blue-500 text-white shadow-sm dark:border-blue-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-blue-600 dark:bg-transparent dark:hover:bg-blue-500 dark:hover:text-white"
            data-hs-overlay="#edit-modal"
          >
            <span className="block">Thay đổi thông tin</span>
          </button>
        </div>
      </Modal>
      <Modal id={"edit-modal"} isHeader={true} title={"Thay đổi thông tin"}>
        <div className="flex justify-end items-center gap-x-2 py-3 px-4 border-t dark:border-gray-700">
          <button
            type="button"
            className="py-2 px-3 inline-flex items-center text-sm font-semibold rounded border border-red-400 bg-red-50 hover:bg-red-500 text-red-500 hover:text-white shadow-sm dark:bg-transparent dark:border-red-500 dark:hover:bg-red-500 dark:hover:text-white dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-red-600"
            data-hs-overlay="#edit-modal"
            onClick={() => {
              HSOverlay.open("#info-modal");
            }}
          >
            <span className="block">Hủy thay đổi</span>
          </button>
          <button
            type="button"
            className="py-2 px-3 inline-flex items-center text-sm font-semibold rounded border border-green-400 bg-green-500 text-white shadow-sm dark:border-green-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-green-600 dark:bg-transparent dark:hover:bg-green-500 dark:hover:text-white"
            data-hs-overlay="#edit-modal"
          >
            <span className="block">Cập nhật thông tin</span>
          </button>
        </div>
      </Modal>
      <Modal id={"delete-modal"} isHeader={false} title={""}>
        <div className="relative flex flex-col bg-white shadow-lg rounded-md max-w-xl dark:bg-gray-800">
          <div className="absolute top-2 end-2">
            <button
              type="button"
              className="flex justify-center items-center size-7 text-sm font-semibold rounded-lg border border-transparent text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:border-transparent dark:hover:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
              data-hs-overlay="#delete-modal"
            >
              <span className="sr-only">Close</span>
              <XMarkIcon className="flex-shrink-0 size-5" strokeWidth={2} />
            </button>
          </div>

          <div className="p-6 text-center overflow-y-auto">
            <span className="mb-4 inline-flex justify-center items-center size-16 rounded-full bg-orange-100">
              <ExclamationTriangleIcon className="flex-shrink-0 size-10 text-orange-500" />
            </span>

            <h3 className="mb-2 text-2xl font-bold text-gray-800 dark:text-gray-200">
              Xóa thông tin đơn hàng
            </h3>
            <p className="dark:text-gray-300 text-gray-700 whitespace-pre-line">
              {`Bạn có chắc chắn muốn xóa thông tin đơn hàng này?\nHành động này không thể hoàn tác!`}
            </p>

            <div className="mt-8 flex justify-center items-center space-x-6">
              <button
                className="py-2 px-3 inline-flex items-center text-sm font-semibold rounded border border-red-400 bg-red-500 text-white shadow-sm dark:bg-transparent dark:border-red-500 dark:hover:bg-red-500 dark:hover:text-white dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-red-600"
                data-hs-overlay="#delete-modal"
                onClick={() => {
                  console.log("Phai xoa thong tin don hang!!!!");
                }}
                type="button"
              >
                <span className="block">Xóa thông tin</span>
              </button>
              <button
                type="button"
                className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded border border-gray-300 bg-gray-200 text-gray-800 shadow-sm hover:bg-gray-50 dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                data-hs-overlay="#delete-modal"
                onClick={() => {
                  HSOverlay.open("#info-modal");
                }}
              >
                <span className="block">Quay lại</span>
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default Modals;

import { convertConstraintName, formatMoney } from "@/services/getHelper";
import { Modal } from "@components";
import { Divider } from "antd";
import { useState, useEffect } from "react";

function Modals({ modalData }) {
  const [categoryName, setCategoryName] = useState("");
  const [gemsName, setGemsName] = useState("");
  const [goldName, setGoldName] = useState("");

  const formatDate = (date) => {
    return new Date(date).toLocaleString("vi-VN", {
      timeZone: "Asia/Ho_Chi_Minh",
    });
  };

  const base64Data = modalData?.productImages?.[0]?.value || null;
  const logo = base64Data ? `data:image/jpeg;base64,${base64Data}` : "";
  const imageUrls =
    modalData?.productImages?.map(
      (image) => `data:image/jpeg;base64,${image.value}`
    ) || [];

  useEffect(() => {
    const updateConstraintName = async () => {
      const categoryName = modalData?.product?.category?.name;
      const gemsName = modalData?.product?.gem?.name;
      const goldName = modalData?.product?.gold?.name;

      if (categoryName) {
        const convertedName = await convertConstraintName(categoryName);
        setCategoryName(convertedName);
      }
      if (gemsName) {
        const convertedGemsName = await convertConstraintName(gemsName);
        setGemsName(convertedGemsName);
      }
      if (goldName) {
        const convertedGoldName = await convertConstraintName(goldName);
        setGoldName(convertedGoldName);
      }
    };

    if (modalData) {
      updateConstraintName();
    }
  }, [modalData]);

  if (!modalData) return null;

  return (
    <>
      <Modal
        id={"info-modal"}
        isHeader={true}
        title={"Thông tin chi tiết"}
        className="w-full max-w-screen-lg mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg"
      >
        <div className="flex flex-row py-6 px-4 gap-6">
          {/* Thông tin khách hàng */}
          <div className="w-1/2">
            <h1 className="text-2xl font-bold text-center mb-4 text-gray-800 dark:text-gray-100">
              Thông tin khách hàng
            </h1>
            <Divider className="hs-dark-mode-active:bg-gray-400" />
            {modalData.request && (
              <div className="space-y-3">
                <h3 className="font-medium text-gray-700 dark:text-gray-300">
                  Họ và tên:
                  <span className="font-normal ml-1 text-gray-900 dark:text-gray-200">
                    {modalData.request.user.fullName}
                  </span>
                </h3>
                <h3 className="font-medium text-gray-700 dark:text-gray-300">
                  Số điện thoại:
                  <span className="font-normal ml-1 text-gray-900 dark:text-gray-200">
                    {modalData.request.user.phoneNumber}
                  </span>
                </h3>
                <h3 className="font-medium text-gray-700 dark:text-gray-300">
                  Email:
                  <span className="font-normal ml-1 text-gray-900 dark:text-gray-200">
                    {modalData.request.user.email}
                  </span>
                </h3>
                <h3 className="font-medium text-gray-700 dark:text-gray-300">
                  Mã yêu cầu:
                  <span className="font-normal ml-1 text-gray-900 dark:text-gray-200">
                    #{modalData.id}
                  </span>
                </h3>
                <h3 className="font-medium text-gray-700 dark:text-gray-300">
                  Đơn được tạo vào ngày:
                  <span className="font-normal ml-1 text-gray-900 dark:text-gray-200">
                    {formatDate(modalData.orderCreatedAt)}
                  </span>
                </h3>
              </div>
            )}
          </div>

          {/* Thông tin sản phẩm */}
          <div className="w-1/2">
            <div className="flex flex-col items-center mb-6">
              <img
                src={logo || "../logo.png"}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "../logo.png";
                }}
                className="w-32 h-32 object-cover rounded-lg border border-gray-300 dark:border-gray-600"
                alt="Product Image"
              />
              <div className="mt-6 text-center">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                  #{modalData?.id}__{modalData?.product?.name}
                </h1>
                <p
                  className={`mt-2 text-sm ${
                    modalData?.state &&
                    (modalData?.state?.id === 8 ||
                      modalData?.state?.id === 9 ||
                      modalData?.state?.id === 5)
                      ? "text-green-500"
                      : modalData?.state && modalData?.state?.id === 3
                      ? "text-red-500"
                      : "text-yellow-500"
                  }`}
                >
                  {modalData?.state &&
                    (modalData?.state?.id === 8 ||
                    modalData?.state?.id === 9 ||
                    modalData?.state?.id === 5
                      ? "Approved"
                      : modalData?.state?.id === 3
                      ? "Rejected"
                      : "Pending")}
                </p>
              </div>
            </div>
            <Divider className="bg-gray-300 hs-dark-mode-active:bg-gray-400" />
            {modalData?.product && (
              <div className="space-y-3">
                <h3 className="font-medium text-gray-700 dark:text-gray-300">
                  Loại trang sức:
                  <span className="font-normal ml-1 text-gray-900 dark:text-gray-200">
                    {categoryName}
                  </span>
                </h3>
                <h3 className="font-medium text-gray-700 dark:text-gray-300">
                  Loại đá:
                  <span className="font-normal ml-1 text-gray-900 dark:text-gray-200">
                    {gemsName}
                  </span>
                </h3>
                <h3 className="font-medium text-gray-700 dark:text-gray-300">
                  Chất liệu:
                  <span className="font-normal ml-1 text-gray-900 dark:text-gray-200">
                    {goldName}
                  </span>
                </h3>
                <h3 className="font-medium text-gray-700 dark:text-gray-300">
                  Kích thước:
                  <span className="font-normal ml-1 text-gray-900 dark:text-gray-200">
                    {modalData.product.size}
                  </span>
                </h3>
                <div className="flex flex-col md:flex-row items-center gap-4">
                  <h3 className="font-medium text-gray-700 dark:text-gray-300">
                    Bản thiết kế:
                  </h3>
                  <div className="flex flex-row gap-2 flex-wrap">
                    {imageUrls.length > 0 ? (
                      imageUrls.map((url, index) => (
                        <img
                          key={index}
                          src={url}
                          alt={`Product Image ${index + 1}`}
                          className="w-32 h-32 object-cover rounded-lg border border-gray-300 dark:border-gray-600"
                        />
                      ))
                    ) : (
                      <p className="ml-3 text-gray-600 dark:text-gray-400">
                        Chưa có bản thiết kế
                      </p>
                    )}
                  </div>
                </div>
                <h3 className="font-medium text-gray-700 dark:text-gray-300">
                  Giá vàng:
                  <span className="font-normal ml-1 text-gray-900 dark:text-gray-200">
                    {formatMoney(modalData.product.goldPrice)}
                  </span>
                </h3>
                <h3 className="font-medium text-gray-700 dark:text-gray-300">
                  Giá đá:
                  <span className="font-normal ml-1 text-gray-900 dark:text-gray-200">
                    {formatMoney(modalData.product.gemPrice)}
                  </span>
                </h3>
                <h3 className="font-medium text-gray-700 dark:text-gray-300">
                  Tiền công:
                  <span className="font-normal ml-1 text-gray-900 dark:text-gray-200">
                    {formatMoney(modalData.product.manufacturingFee)}
                  </span>
                </h3>
                <h3 className="font-medium text-gray-700 dark:text-gray-300">
                  Tổng giá tiền:
                  <span className="font-normal ml-1 text-green-500 dark:text-green-400">
                    {formatMoney(modalData.product?.totalPrice)}
                  </span>
                </h3>
              </div>
            )}
          </div>
        </div>
      </Modal>
    </>
  );
}

export default Modals;

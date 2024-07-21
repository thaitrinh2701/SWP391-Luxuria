import React from "react";
import { Modal, Button } from "antd";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { Toast } from "../Toast";
import { formatMoney } from "@/services/getHelper";

const PayPalModal = ({
  isOpen,
  onClose,
  price,
  onSuccess,
  id,
  cusName,
  orderCreated,
  productName,
}) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("vi-VN");
  };
  return (
    <Modal
      // title="Thanh toán"
      visible={isOpen}
      onCancel={onClose}
      footer={[
        <Button key="close" onClick={onClose} type="primary" danger>
          Đóng
        </Button>,
      ]}
    >
      <div className="relative flex flex-col bg-white shadow-lg rounded-xl pointer-events-auto dark:bg-neutral-800">
        <div className="relative overflow-hidden min-h-32 bg-gray-900 text-center rounded-t-xl dark:bg-neutral-950">
          {/* Close Button */}
          <div className="absolute top-2 end-2">
            <button
              type="button"
              className="inline-flex flex-shrink-0 justify-center items-center size-8 rounded-lg text-gray-500 hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all text-sm dark:text-neutral-500 dark:focus:ring-neutral-700 dark:focus:ring-offset-gray-800"
              onClick={onClose}
            >
              <span className="sr-only">Close</span>
              <svg
                className="flex-shrink-0 size-4"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>
          </div>
          {/* End Close Button */}

          {/* SVG Background Element */}
          <figure className="absolute inset-x-0 bottom-0 -mb-px">
            <svg
              preserveAspectRatio="none"
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              viewBox="0 0 1920 100.1"
            >
              <path
                fill="currentColor"
                className="fill-white dark:fill-neutral-800"
                d="M0,0c0,0,934.4,93.4,1920,0v100.1H0L0,0z"
              ></path>
            </svg>
          </figure>
          {/* End SVG Background Element */}
        </div>

        <div className="relative z-10 -mt-12">
          {/* Icon */}
          <span className="mx-auto flex justify-center items-center size-[62px] rounded-full border border-gray-200 bg-white text-gray-700 shadow-sm dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400">
            <svg
              className="flex-shrink-0 size-6"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M1.92.506a.5.5 0 0 1 .434.14L3 1.293l.646-.647a.5.5 0 0 1 .708 0L5 1.293l.646-.647a.5.5 0 0 1 .708 0L7 1.293l.646-.647a.5.5 0 0 1 .708 0L9 1.293l.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .801.13l.5 1A.5.5 0 0 1 15 2v12a.5.5 0 0 1-.053.224l-.5 1a.5.5 0 0 1-.8.13L13 14.707l-.646.647a.5.5 0 0 1-.708 0L11 14.707l-.646.647a.5.5 0 0 1-.708 0L9 14.707l-.646.647a.5.5 0 0 1-.708 0L7 14.707l-.646.647a.5.5 0 0 1-.708 0L5 14.707l-.646.647a.5.5 0 0 1-.708 0L3 14.707l-.646.647a.5.5 0 0 1-.801-.13l-.5-1A.5.5 0 0 1 1 14V2a.5.5 0 0 1 .053-.224l.5-1a.5.5 0 0 1 .367-.27zm.217 1.338L2 2.118v11.764l.137.274.51-.51a.5.5 0 0 1 .707 0l.646.647.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.509.509.137-.274V2.118l-.137-.274-.51.51a.5.5 0 0 1-.707 0L12 1.707l-.646.647a.5.5 0 0 1-.708 0L10 1.707l-.646.647a.5.5 0 0 1-.708 0L8 1.707l-.646.647a.5.5 0 0 1-.708 0L6 1.707l-.646.647a.5.5 0 0 1-.708 0L4 1.707l-.646.647a.5.5 0 0 1-.708 0l-.509-.51z" />
              <path d="M3 4.5a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5zm8-6a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5z" />
            </svg>
          </span>
          {/* End Icon */}
        </div>

        {/* Body */}
        <div className="p-4 sm:p-7 overflow-y-auto">
          <div className="text-center">
            <h2 className="block text-2xl font-bold text-gray-800 dark:text-gray-200">
              Thanh toán hóa đơn
            </h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Hoàn thành thanh toán hóa đơn của bạn thông qua PayPal
            </p>
          </div>

          {/* Invoice Details */}
          <div className="mt-4 p-4 border border-gray-300 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
              Chi tiết hóa đơn
            </h3>
            <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              <p>Số hóa đơn: #{id}</p>
              <p>Ngày: {formatDate(orderCreated)}</p>
              <p>Khách hàng: {cusName}</p>
            </div>
            <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              <p>Sản phẩm: {productName}</p>
              <p>Giá: {formatMoney(price * 25600)}</p>
            </div>
            <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              <p>Tổng cộng: {formatMoney(price * 25600)} </p>
            </div>
            <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              <p>Phương thương thanh toán: Paypal </p>
            </div>
          </div>

          {/* PayPal Button */}
          <div className="mt-6">
            <PayPalButtons
              style={{ layout: "vertical", color: "blue" }}
              createOrder={(data, actions) => {
                return actions.order.create({
                  purchase_units: [
                    {
                      amount: {
                        value: price,
                      },
                    },
                  ],
                });
              }}
              onApprove={(data, actions) => {
                return actions.order.capture().then((details) => {
                  onSuccess();
                  Toast.success(
                    `Thanh toán thành công, ${details.payer.name.given_name}`
                  );
                  onClose();
                });
              }}
              onError={() => {
                Toast.error("Thanh toán thất bại. Vui lòng thử lại sau.");
              }}
            />
          </div>
        </div>
        {/* End Body */}
      </div>
    </Modal>
  );
};

export default PayPalModal;

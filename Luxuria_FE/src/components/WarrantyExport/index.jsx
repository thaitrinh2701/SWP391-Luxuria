import React from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileExport } from "@fortawesome/free-solid-svg-icons";
import { useCookies } from "react-cookie";
import axios from "axios";
import { Button } from "@mui/material";
import { Toast } from "../Toast";

const WarrantyExport = ({ orderDetail }) => {
  const API_CREATE_WARRANTY = import.meta.env.VITE_API_CREATE_WARRANTY_ENDPOINT;
  const [cookies] = useCookies(["user", "token"]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const createWarrantyToServer = async () => {
    const requestData = {
      product_id: orderDetail.order.product.id,
      user_id: orderDetail.order.request.user.id,
    };

    try {
      const response = await axios.post(API_CREATE_WARRANTY, requestData, {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
      });
      console.log("Create warranty response:", response.data);
      Toast("warranty_success", "success", "Tạo phiếu bảo hành thành công!");
    } catch (error) {
      console.error("Error:", error);

      if (error.response) {
        if (error.response.status === 400) {
          console.error("Server Response:", error.response.data);
        } else if (error.response.status === 403) {
          console.error("Server Response:", error.response.data);
        } else {
          console.log("error", "Lỗi kết nối tới máy chủ!");
        }
      } else {
        console.log("error", "Lỗi kết nối tới máy chủ!");
      }
    }
  };

  const handleExportWarranty = async () => {
    const template = document.getElementById("warranty-template");
    if (!template) {
      console.error("Template not found");
      return;
    }

    template.style.display = "block";

    document.getElementById(
      "warranty-code"
    ).innerText = `#${orderDetail.order.id}`;
    document.getElementById("customer-name").innerText =
      orderDetail.order.request.user.fullName;
    document.getElementById("customer-phone").innerText =
      orderDetail.order.request.user.phoneNumber;
    document.getElementById("customer-email").innerText =
      orderDetail.order.request.user.email;
    document.getElementById("product-code").innerText =
      orderDetail.order.product.id;
    document.getElementById("product-name").innerText =
      orderDetail.order.product.name;
    document.getElementById("warranty-period").innerText = "6 tháng";

    const imgElement = document.querySelector(
      "#warranty-template > .warranty-items > img"
    );
    if (imgElement) {
      imgElement.src = "../public/background-warranty-image.png";

      imgElement.onload = () => {
        setTimeout(() => {
          html2canvas(template, { useCORS: true })
            .then((canvas) => {
              const imgData = canvas.toDataURL("image/png");
              const pdf = new jsPDF();
              pdf.addImage(imgData, "PNG", 0, 0);
              pdf.save("warranty.pdf");
              template.style.display = "none";
            })
            .catch((error) => {
              console.error("Error capturing the template:", error);
            });
        }, 100); // Điều chỉnh thời gian chờ nếu cần
      };
    } else {
      console.error("Image element not found");
    }

    await createWarrantyToServer();
  };

  return (
    <>
      <Button
        variant="outlined"
        color="primary"
        size="small"
        style={{ padding: "4px 6px", fontSize: "0.75rem" }}
        onClick={handleExportWarranty}
      >
        <FontAwesomeIcon icon={faFileExport} />
      </Button>
      <div
        id="warranty-template"
        style={{ display: "none", fontFamily: "Arial, sans-serif" }}
        className="warranty-template text-black dark:text-white p-12 border border-gray-300 shadow-lg rounded-lg bg-white dark:bg-gray-800"
      >
        <div className="warranty-items relative overflow-hidden min-h-32 text-center">
          {/* Image Element for Background */}
          <img
            src="https://preline.co/assets/svg/examples/abstract-bg-1.svg"
            alt="Background"
            className="absolute inset-0 mt-4 w-full h-full object-cover"
          />
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
        </div>

        <div className="relative z-10 -mt-12">
          {/* Icon */}
          <span className="mx-auto flex justify-center items-center size-[62px] rounded-full border border-gray-200 bg-white text-gray-700 shadow-sm dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400">
            <svg
              className="size-6"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M1.92.506a.5.5 0 0 1 .434.14L3 1.293l.646-.647a.5.5 0 0 1 .708 0L5 1.293l.646-.647a.5.5 0 0 1 .708 0L7 1.293l.646-.647a.5.5 0 0 1 .708 0L9 1.293l.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .801.13l.5 1A.5.5 0 0 1 15 2v12a.5.5 0 0 1-.053.224l-.5 1a.5.5 0 0 1-.8.13L13 14.707l-.646.647a.5.5 0 0 1-.708 0L11 14.707l-.646.647a.5.5 0 0 1-.708 0L9 14.707l-.646.647a.5.5 0 0 1-.708 0L7 14.707l-.646.647a.5.5 0 0 1-.708 0L5 14.707l-.646.647a.5.5 0 0 1-.708 0l-.646-.647-.646.647a.5.5 0 0 1-.801-.13l-.5-1A.5.5 0 0 1 1 14V2a.5.5 0 0 1 .053-.224l.5-1a.5.5 0 0 1 .367-.27Z" />
            </svg>
          </span>
        </div>

        <div className="mt-6 text-black dark:text-white">
          <h1 className="text-5xl font-bold mb-9 text-center">
            Phiếu Bảo Hành
          </h1>
          <p className="mb-2 text-xl">
            Mã Đơn Hàng:{" "}
            <span id="warranty-code" className="font-semibold"></span>
          </p>
          <p className="mb-2 text-xl">
            Tên Khách Hàng:{" "}
            <span id="customer-name" className="font-semibold"></span>
          </p>
          <p className="mb-2 text-xl">
            Số Điện Thoại:{" "}
            <span id="customer-phone" className="font-semibold"></span>
          </p>
          <p className="mb-2 text-xl">
            Email: <span id="customer-email" className="font-semibold"></span>
          </p>
          <p className="mb-2 text-xl">
            Mã Sản Phẩm:{" "}
            <span id="product-code" className="font-semibold"></span>
          </p>
          <p className="mb-2 text-xl">
            Tên Sản Phẩm:{" "}
            <span id="product-name" className="font-semibold"></span>
          </p>
          <p className="mb-2 text-xl">
            Thời Hạn Bảo Hành:{" "}
            <span id="warranty-period" className="font-semibold"></span>
          </p>
        </div>

        <div className="mt-6">
          <h2 className="text-2xl font-semibold mb-4">Quy Định Bảo Hành</h2>
          <ul className="list-disc ml-6 space-y-2 text-xl">
            <li>Chỉ bảo hành các lỗi kỹ thuật từ nhà sản xuất.</li>
            <li>Không bảo hành các hư hỏng do người dùng gây ra.</li>
            <li>Thời gian bảo hành là 6 tháng kể từ ngày giao hàng.</li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default WarrantyExport;

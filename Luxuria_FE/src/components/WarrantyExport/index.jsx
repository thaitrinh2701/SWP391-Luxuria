import React, { useEffect } from "react";
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
    document.getElementById("delivery-date").innerText = formatDate(
      orderDetail.order.orderCreatedAt
    );
    document.getElementById("warranty-period").innerText = "6 tháng";
    const imgElement = document.querySelector("#warranty-template img");
    imgElement.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...";

    html2canvas(template, { useCORS: true }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(imgData, "PNG", 0, 0);
      pdf.save("warranty.pdf");
      template.style.display = "none";
    });

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
        style={{ display: "none" }}
        className="warranty-template text-black dark:text-white p-6 border border-gray-300 shadow-md rounded-lg bg-white dark:bg-gray-800"
      >
        <div className="flex items-center mb-6">
          <img
            src="https://cdn.discordapp.com/attachments/1237673903212462091/1249069349893967922/logo.png?ex=6665f5fb&is=6664a47b&hm=baafb048242cb4d75b83bcf90b57ecaa0fd72f6e5bdca35b17d2988a193104a7&"
            alt="logo"
            className="w-24 h-24 mr-4"
          />
          <div>
            <h1 className="text-3xl font-semibold mb-2">Phiếu Bảo Hành</h1>
            <p className="mb-1">
              Mã Đơn Hàng:{" "}
              <span id="warranty-code" className="font-semibold"></span>
            </p>
            <p className="mb-1">
              Tên Khách Hàng:{" "}
              <span id="customer-name" className="font-semibold"></span>
            </p>
            <p className="mb-1">
              Số Điện Thoại:{" "}
              <span id="customer-phone" className="font-semibold"></span>
            </p>
            <p className="mb-1">
              Email: <span id="customer-email" className="font-semibold"></span>
            </p>
            <p className="mb-1">
              Mã Sản Phẩm:{" "}
              <span id="product-code" className="font-semibold"></span>
            </p>
            <p className="mb-1">
              Tên Sản Phẩm:{" "}
              <span id="product-name" className="font-semibold"></span>
            </p>
            <p className="mb-1">
              Ngày Giao Hàng:{" "}
              <span id="delivery-date" className="font-semibold"></span>
            </p>
            <p className="mb-1">
              Thời Hạn Bảo Hành:{" "}
              <span id="warranty-period" className="font-semibold"></span>
            </p>
          </div>
        </div>
        <div>
          <h2 className="text-lg font-semibold mb-2">Quy Định Bảo Hành</h2>
          <ul className="list-disc ml-5 space-y-1">
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

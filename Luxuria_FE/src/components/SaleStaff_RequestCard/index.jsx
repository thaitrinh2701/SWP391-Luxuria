import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";
import { Button } from "@mui/material";
import { Toast } from "../Toast";

const SaleStaffRequestCard = ({
  requestID,
  createdAt,
  username,
  email,
  phone_number,
  isSaleStaffApproved,
}) => {
  const [isApproved, setIsApproved] = useState(false);
  const [isCancelled, setIsCancelled] = useState(false);
  const API_APPROVE_REQUEST = import.meta.env.VITE_API_APPROVE_REQUEST_ENDPOINT;
  const [cookies] = useCookies(["user", "token"]);

  const approveRequest = async (requestID, approvalStatus) => {
    try {
      const response = await axios.put(
        `${API_APPROVE_REQUEST}/${requestID}/${approvalStatus}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
        }
      );
      const filterRequest = response.data.filter(
        (request) => request.active !== false
      );
      console.log("Request approved:", filterRequest);
      setIsApproved(approvalStatus);
    } catch (error) {
      console.error("Error approving request:", error);
    }
  };

  useEffect(() => {
    if (isSaleStaffApproved) {
      setIsApproved(true);
    }
  }, [isSaleStaffApproved]);

  const handleApproval = () => {
    approveRequest(requestID, true);
    setIsApproved(true);
    Toast("approve", "success", "Đã duyệt yêu cầu thành công");
  };

  const handleCancel = () => {
    approveRequest(requestID, false);
    setIsApproved(false);
    console.log(isSaleStaffApproved);
    Toast("declined", "success", "Đã từ chối yêu cầu thành công");
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleString("vi-VN");
    return formattedDate;
  };

  return (
    <div className="transition-transform transform hover:scale-102">
      <div className="mt-6 border border-gray-200 p-4 rounded-lg space-y-3 dark:border-neutral-700 bg-white dark:bg-neutral-800 shadow-sm hover:shadow-lg transition-shadow max-w-5xl">
        <div className="hidden sm:grid sm:grid-cols-4">
          <div className="sm:col-span-2 text-xs text-gray-900 font-extrabold uppercase dark:text-neutral-400">
            MÃ YÊU CẦU: {requestID}
          </div>
          <div className="sm:col-span-2 text-xs text-gray-900 font-extrabold uppercase dark:text-neutral-400">
            Thời gian tạo request
          </div>
        </div>
        <div className="hidden sm:block border-b border-gray-200 dark:border-neutral-700" />
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
          <div className="col-span-full sm:col-span-2">
            <p className="font-medium text-gray-800 dark:text-neutral-200">
              Người dùng: {username}
            </p>
          </div>
        </div>
        <div className="sm:hidden border-b border-gray-200 dark:border-neutral-700" />
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
          <div className="col-span-full sm:col-span-2">
            <p className="font-medium text-gray-800 dark:text-neutral-200">
              Email: {email}
            </p>
          </div>
          <p className="text-gray-800 dark:text-neutral-200">
            {formatDate(createdAt)}
          </p>
          <div className="flex gap-3 flex-row-reverse">
            {!isApproved && !isCancelled && (
              <>
                <Button
                  variant="outlined"
                  color="error"
                  size="small"
                  style={{ padding: "4px 8px", fontSize: "0.75rem" }}
                  onClick={handleCancel}
                >
                  TỪ CHỐI
                </Button>
                <Button
                  variant="outlined"
                  color="success"
                  size="small"
                  style={{ padding: "4px 8px", fontSize: "0.75rem" }}
                  onClick={handleApproval}
                >
                  ĐỒNG Ý
                </Button>
              </>
            )}

            {isApproved && (
              <div>
                <Link to={`/tao-don-hang/${requestID}`}>
                  <Button
                    variant="outlined"
                    color="primary"
                    size="small"
                    className="px-2 py-1 text-xs min-[320px]:px-4 min-[320px]:py-2 min-[320px]:text-sm"
                  >
                    Tạo đơn hàng
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
        <div className="sm:hidden border-b border-gray-200 dark:border-neutral-700" />
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
          <div className="col-span-full sm:col-span-2">
            <p className="font-medium text-gray-800 dark:text-neutral-200">
              SĐT: {phone_number}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SaleStaffRequestCard;

import { Button } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useCookies } from "react-cookie";
import "preline";

const RequestDetailCard = ({ requestID, createdAt, salesStaffApproved }) => {
  const API_CUSTOMER_CANCEL_REQUEST = import.meta.env
    .VITE_API_CUSTOMER_CANCEL_REQUEST_ENDPOINT;
  const [cookies] = useCookies(["user", "token"]);
  const [isCancelRequest, setIsCancelRequest] = useState(false);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("vi-VN");
  };

  const cancelRequest = async () => {
    try {
      const response = await axios.put(
        `${API_CUSTOMER_CANCEL_REQUEST}/${requestID}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
        }
      );
      console.log("Cancel Request: ", response.data);
      setIsCancelRequest(true);
    } catch (error) {
      console.error("Error submitting price quote: ", error);
    }
  };

  const getStatusMessage = () => {
    return salesStaffApproved ? "Vui lòng chờ tạo đơn hàng" : "Đang chờ duyệt";
  };

  return (
    <div className="container mx-auto p-4">
      {!isCancelRequest && (
        <div className="mt-6 border border-gray-200 p-4 rounded-lg max-w-5xl dark:border-neutral-700">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 sm:gap-6">
            <div className="text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">
              MÃ YÊU CẦU
            </div>
            <div className="text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">
              THỜI GIAN
            </div>
            <div className="text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">
              TRẠNG THÁI
            </div>
          </div>

          <div className="border-b border-gray-200 dark:border-neutral-700 my-2"></div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 sm:gap-6">
            <div>
              <h5 className="text-xs font-medium text-gray-500 uppercase dark:text-neutral-500 sm:hidden">
                MÃ YÊU CẦU
              </h5>
              <p className="font-medium text-gray-800 dark:text-neutral-200">
                #{requestID}
              </p>
            </div>
            <div>
              <h5 className="text-xs font-medium text-gray-500 uppercase dark:text-neutral-500 sm:hidden">
                THỜI GIAN
              </h5>
              <p className="text-gray-800 dark:text-neutral-200">
                {formatDate(createdAt)}
              </p>
            </div>
            <div>
              <h5 className="text-xs font-medium text-gray-500 uppercase dark:text-neutral-500 sm:hidden">
                TRẠNG THÁI
              </h5>
              <p className="text-gray-800 font-medium dark:text-neutral-200">
                {getStatusMessage()}
              </p>
            </div>
            <div className="text-center sm:text-end">
              <Button
                variant="outlined"
                color="error"
                size="small"
                className="bg-red-600 text-white hover:bg-red-700"
                onClick={cancelRequest}
              >
                HỦY YÊU CẦU
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RequestDetailCard;

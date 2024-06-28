import { Button } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useCookies } from "react-cookie";

const RequestDetailCard = ({ requestID, createdAt, salesStaffApproved }) => {
  const API_CUSTOMER_CANCEL_REQUEST = import.meta.env
    .VITE_API_CUSTOMER_CANCEL_REQUEST_ENDPOINT;
  const [cookies] = useCookies(["user", "token"]);
  const [isCancelRequest, setIsCancelRequest] = useState(false);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleString("vi-VN");
    return formattedDate;
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

  const checkStatus = () => {
    if (salesStaffApproved) {
      return <>Vui lòng chờ tạo đơn hàng</>;
    }
    return (
      <div>
        <p>Đang chờ duyệt</p>
      </div>
    );
  };

  return (
    <div>
      {!isCancelRequest && (
        <div className="flex flex-row max-w-screen rounded-lg overflow-hidden shadow-lg transform transition-transform hover:scale-102 my-8 py-9 bg-gray-100 dark:bg-neutral-800 dark:text-white">
          <div className="flex flex-col w-full h-auto p-4">
            <div className="flex justify-between items-center">
              <div className="flex-1 text-center">
                <div className="font-bold text-xl mb-2">
                  MÃ YÊU CẦU: #{requestID}
                </div>
              </div>

              <div className="flex-1 text-center">
                <p className="font-bold text-xl mb-5">Thời gian tạo yêu cầu</p>
                <p>{formatDate(createdAt)}</p>
              </div>

              <div className="flex-1 text-center">
                <p className="font-bold text-xl mb-5">Trạng thái</p>
                <p>{checkStatus()}</p>
              </div>

              <div className="flex-1 text-center">
                <Button
                  variant="outlined"
                  color="error"
                  size="small"
                  onClick={cancelRequest}
                >
                  HỦY YÊU CẦU
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RequestDetailCard;

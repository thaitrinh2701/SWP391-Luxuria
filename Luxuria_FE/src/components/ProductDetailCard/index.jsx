import { getRoleId } from "@/services";
import { convertConstraintName, formatMoney } from "@/services/getHelper";
import { Button } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import { Toast } from "../Toast";
import PayPalModal from "../PaypalModal";
import { Flex, Modal } from "antd";
import TextArea from "antd/es/input/TextArea";

const ProductDetailCard = ({
  productName,
  category,
  orderID,
  requestID,
  process,
  processID,
  state,
  stateID,
  isCustomerApproved,
  productPrice,
  cusName,
  dateCreated,
}) => {
  const [isSubmitPrice, setIsSubmitPrice] = useState(false);
  const [isApproved, setIsApproved] = useState(false);
  const [processState, setProcessState] = useState("");
  const [isAcceptPrice, setIsAcceptPrice] = useState(false);
  const [isCompleteOrder, setIsCompleteOrder] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [roleID, setRoleID] = useState(null);
  const [newPrice, setNewPrice] = useState(0);
  const [cookies] = useCookies(["user", "token"]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [description, setDescription] = useState("");
  const [isOpenModalManager, setIsModalOpenManager] = useState(false);

  // Function to fetch roleID and set the state
  async function fetchRoleID() {
    const roleIDFromAPI = await getRoleId(cookies.token);
    setRoleID(roleIDFromAPI);
    console.log(roleIDFromAPI);
  }

  const API_SUBMIT_PRICE_QUOTE = import.meta.env
    .VITE_API_SUBMIT_PRICE_QUOTE_ENDPOINT;
  const API_SUBMIT_MANAGER_PRICE_QUOTE = import.meta.env
    .VITE_API_MANAGER_ACCEPT_PRICE_QUOTE_ENDPOINT;
  const API_CUSTOMER_ACCEPT_PRICE_QUOTE = import.meta.env
    .VITE_API_CUSTOMER_ACCEPT_PRICE_QUOTE_ENDPOINT;
  const API_COMPLETE_ORDER = import.meta.env.VITE_API_COMPLETE_ORDER_ENDPOINT;

  const handleApproval = () => {
    setIsModalOpen(true);
  };

  const handleOk = (approvalStatus, description) => {
    if (roleID === 6 && stateID === 2 && approvalStatus === false) {
      managerAcceptPriceQuote(false, description);
    }
    if (roleID === 2 && stateID === 4 && approvalStatus === false) {
      customerAcceptPriceQuote(false, description);
    }
  };

  const handleCancel = () => {
    setIsModalOpenManager(false);
  };

  const handleOnChangeOfModal = (e) => {
    setDescription(e.target.value);
  };

  const handleRejection = () => {
    setIsModalOpenManager(true);
  };

  const handleManagerAcceptPriceQuote = () => {
    managerAcceptPriceQuote(true);
  };

  const handleDeclinePriceQuote = () => {
    // managerAcceptPriceQuote(false);
    setIsModalOpenManager(true);
  };

  useEffect(() => {
    function convertVNDtoUSD(price) {
      let newPrice = price / 25600;
      return newPrice.toFixed(2);
    }
    setNewPrice(convertVNDtoUSD(productPrice));
  }, [newPrice]);

  const completeOrder = async () => {
    try {
      const response = await axios.put(
        `${API_COMPLETE_ORDER}/${orderID}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
        }
      );
      setIsCompleteOrder(true);
      Toast("complete_order", "success", "Hoàn thành đơn hàng thành công!");
      console.log("Complete Order: ", response.data);
      window.location.reload();
    } catch (error) {
      console.error("Error complete order: ", error);
    }
  };

  const handleSubmitPriceQuote = async () => {
    try {
      const response = await axios.put(
        `${API_SUBMIT_PRICE_QUOTE}/${orderID}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
        }
      );
      console.log("Submit Price: ", response.data);
      setIsSubmitPrice(true);
      window.location.reload(); // Refresh the page
    } catch (error) {
      console.error("Error submitting price quote: ", error);
    }
  };

  const managerAcceptPriceQuote = async (approvalStatus, description) => {
    const requestData = {
      order_id: orderID,
      response: approvalStatus,
    };
    if (approvalStatus === false) {
      requestData.description = description;
    }
    try {
      const response = await axios.put(
        `${API_SUBMIT_MANAGER_PRICE_QUOTE}`,
        requestData,
        {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
        }
      );
      console.log("Accept Price: ", response.data);
      setIsAcceptPrice(approvalStatus);
      window.location.reload();
    } catch (error) {
      console.error("Error accepting price quote: ", error);
    }
  };

  const customerAcceptPriceQuote = async (approvalStatus, description) => {
    const requestData = {
      order_id: orderID,
      response: approvalStatus,
    };
    if (approvalStatus === false) {
      requestData.description = description;
    }
    try {
      const response = await axios.put(
        `${API_CUSTOMER_ACCEPT_PRICE_QUOTE}`,
        requestData,
        {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
        }
      );
      console.log("Accept Price: ", response.data);
      setIsAcceptPrice(approvalStatus);
      Toast("accept_price", "success", "Chấp nhận báo giá thành công!");
      window.location.reload();
    } catch (error) {
      console.error("Error accepting price quote: ", error);
    }
  };

  useEffect(() => {
    console.log("");
    if (isCustomerApproved) {
      setIsApproved(true);
      setProcessState("approved");
    }
    fetchRoleID();
  }, [isCustomerApproved]);

  useEffect(() => {
    const updateConstraintName = async () => {
      const categoryName = category;
      if (categoryName) {
        const convertedName = await convertConstraintName(categoryName);
        setCategoryName(convertedName);
      }
    };
    updateConstraintName();
  }, [category]);

  const handlePaymentSuccess = () => {
    customerAcceptPriceQuote(true);
    setIsApproved(true);
    setProcessState("approved");
  };

  return (
    <div className="transition-transform transform hover:scale-105 w-full h-auto">
      <div className="mt-6 border border-gray-200 p-3 rounded-lg space-y-3 dark:border-neutral-700 dark:bg-gray-800 shadow-sm hover:shadow-lg transition-shadow">
        <Link to={`/chi-tiet-don-hang/${orderID}`}>
          <div className="grid grid-cols-3 gap-4">
            <div className="flex justify-center">
              <img
                src="./logo-transparent.png"
                className="w-40 h-40 object-cover"
                alt="Product"
              />
            </div>
            <div>
              <div className="mt-[5%]">
                <h2 className="text-lg font-bold text-gray-900 dark:text-neutral-200">
                  {productName}
                </h2>
                <p className="text-sm text-gray-600 dark:text-neutral-400">
                  <span className="text-lg font-bold">
                    Mã đơn hàng: {orderID}
                  </span>
                </p>
                <p className="text-sm text-gray-600 dark:text-neutral-400">
                  <span className="text-lg font-bold">
                    Mã yêu cầu: {requestID}
                  </span>
                </p>
                <p className="text-sm text-gray-600 dark:text-neutral-400">
                  <span className="text-lg font-bold">
                    Loại trang sức: {categoryName}
                  </span>
                </p>
              </div>
            </div>
            <div>
              <div className="mt-[10%]">
                <h2 className="text-lg font-bold text-gray-900 dark:text-neutral-200 text-center">
                  Tình trạng
                </h2>
                <p
                  className={`text-center text-lg ${
                    stateID === 8 || stateID === 9
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {state}
                </p>
              </div>
            </div>
          </div>
        </Link>
        <div className="border-t border-gray-200 dark:border-neutral-700 mt-4 pt-2">
          <div className="flex justify-between items-center">
            <span
              className={`text-xl ${
                processState === "approved"
                  ? "text-green-500"
                  : processState === "rejected"
                  ? "text-red-500"
                  : "text-yellow-500"
              }`}
            >
              {(roleID === 3 || roleID === 6 || roleID === 2) &&
              (stateID === 1 || stateID === 2 || stateID === 4)
                ? `Giá tiền: ${formatMoney(productPrice)}`
                : stateID === 3
                ? "Bị từ chối"
                : stateID === 5 ||
                  stateID === 6 ||
                  stateID === 7 ||
                  stateID === 8 ||
                  stateID === 9
                ? `Giá tiền: ${formatMoney(productPrice)}`
                : "Giá tiền: Đang chờ duyệt"}
              {processState === "rejected" && " - Rejected"}
              {processState === "pending" && " - Pending"}
            </span>

            <div className="flex space-x-3">
              {!isCustomerApproved &&
                !isApproved &&
                roleID !== 3 &&
                roleID === 2 &&
                (stateID === 4 || stateID === 6) && (
                  <>
                    <Button
                      variant="outlined"
                      color="success"
                      size="small"
                      style={{ padding: "4px 8px", fontSize: "0.75rem" }}
                      onClick={handleApproval}
                    >
                      ĐỒNG Ý
                    </Button>

                    <Button
                      variant="outlined"
                      color="error"
                      size="small"
                      style={{ padding: "4px 8px", fontSize: "0.75rem" }}
                      onClick={handleRejection}
                    >
                      TỪ CHỐI
                    </Button>
                  </>
                )}

              {(isCustomerApproved || isApproved) && (
                <Link to={`/chi-tiet-don-hang/${orderID}`}>
                  <Button
                    variant="outlined"
                    color="primary"
                    size="small"
                    style={{ padding: "4px 8px", fontSize: "0.75rem" }}
                  >
                    Xem đơn hàng
                  </Button>
                </Link>
              )}
              {!isSubmitPrice &&
                isAcceptPrice === false &&
                roleID === 6 &&
                stateID === 2 && (
                  <>
                    <Button
                      variant="outlined"
                      color="success"
                      size="small"
                      style={{ padding: "4px 8px", fontSize: "0.75rem" }}
                      onClick={handleManagerAcceptPriceQuote}
                    >
                      ĐỒNG Ý
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      size="small"
                      style={{ padding: "4px 8px", fontSize: "0.75rem" }}
                      onClick={handleDeclinePriceQuote}
                    >
                      TỪ CHỐI
                    </Button>
                  </>
                )}
              {!isSubmitPrice &&
                roleID === 3 &&
                processID === 1 &&
                (stateID === 3 || stateID === 1) && (
                  <>
                    <Link to={`/chinh-sua-don-hang/${orderID}`}>
                      <Button
                        variant="outlined"
                        color="primary"
                        size="small"
                        style={{ padding: "4px 8px", fontSize: "0.75rem" }}
                      >
                        CHỈNH SỬA ĐƠN HÀNG
                      </Button>
                    </Link>
                    <Button
                      variant="outlined"
                      color="primary"
                      size="small"
                      style={{ padding: "4px 8px", fontSize: "0.75rem" }}
                      onClick={handleSubmitPriceQuote}
                    >
                      Báo giá
                    </Button>
                  </>
                )}
              {isCompleteOrder === false && roleID === 3 && stateID === 8 && (
                <Button
                  variant="outlined"
                  color="success"
                  size="small"
                  style={{ padding: "4px 8px", fontSize: "0.75rem" }}
                  onClick={completeOrder}
                >
                  Hoàn thành đơn hàng
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      <PayPalModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        price={newPrice}
        onSuccess={handlePaymentSuccess}
        productName={productName}
        id={orderID}
        cusName={cusName}
        orderCreated={dateCreated}
      />
      <Modal
        title="Lý do từ chối"
        open={isOpenModalManager}
        onOk={() => handleOk(false, description)}
        onCancel={handleCancel}
      >
        <div className="mb-10">
          <Flex vertical gap={32}>
            <TextArea
              showCount
              maxLength={100}
              placeholder="..."
              value={description}
              onChange={handleOnChangeOfModal}
            />
          </Flex>
        </div>
      </Modal>
    </div>
  );
};

export default ProductDetailCard;

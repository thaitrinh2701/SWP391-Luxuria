import { Input, Sidebar, Toast } from "@/components";
import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useForm } from "react-hook-form";
import { Divider, Flex, Image, Modal, Steps, Typography } from "antd";
import UploadPics from "@/components/Upload";
import axios from "axios";
import { getRoleId } from "@/services";
import WarrantyExport from "@/components/WarrantyExport";
import { convertConstraintName, formatMoney } from "@/services/getHelper";
import Stepper from "@/components/Stepper";
import MyStepper from "@/components/Stepper";
import toast from "react-hot-toast";
import PayPalModal from "@/components/PaypalModal";
import StepperDetail from "@/components/StepperDetail";
import TextArea from "antd/es/input/TextArea";

const CustomerOrderProductDetail = () => {
  const { orderID } = useParams(); // Sử dụng destructuring để lấy orderID
  const [cookies] = useCookies(["user", "token"]);
  const [newPrice, setNewPrice] = useState(0);
  const [stateID, setStateID] = useState(null);

  const token = cookies.token;
  const API_SUBMIT_PRICE_QUOTE = import.meta.env
    .VITE_API_SUBMIT_PRICE_QUOTE_ENDPOINT;
  const API_VIEW_ORDER_DETAIL = import.meta.env
    .VITE_API_VIEW_ORDER_DETAIL_CUSTOMER_ENDPOINT;
  const API_SUBMIT_MANAGER_PRICE_QUOTE = import.meta.env
    .VITE_API_MANAGER_ACCEPT_PRICE_QUOTE_ENDPOINT;
  const API_CUSTOMER_ACCEPT_PRICE_QUOTE = import.meta.env
    .VITE_API_CUSTOMER_ACCEPT_PRICE_QUOTE_ENDPOINT;
  const API_CUSTOMER_ACCEPT_DESIGN = import.meta.env
    .VITE_API_CUSTOMER_ACCEPT_DESIGN_ENDPOINT;
  const API_COMPLETE_PRODUCT = import.meta.env
    .VITE_API_COMPLETE_PRODUCT_ENDPOINT;
  const API_GET_ORDER_HISTORIES = import.meta.env
    .VITE_API_GET_ORDER_HISTORIES_ENDPOINT;
  const API_COMPLETE_ORDER = import.meta.env.VITE_API_COMPLETE_ORDER_ENDPOINT;

  const [isModalDetailVisible, setIsModalDetailVisible] = useState(false);

  const [categoryName, setCategoryName] = useState("");
  const [gemsName, setGemsName] = useState("");
  const [goldName, setGoldName] = useState("");
  const [nameWhoAccepted, setWhoNameAccepted] = useState("");
  const [orderHistory, setOrderHistory] = useState([]);
  const [roleID, setRoleID] = useState(null);
  const [fileList, setFileList] = useState([]);
  const [orderDetail, setOrderDetail] = useState(null);
  const [isSubmitPrice, setIsSubmitPrice] = useState(false);
  const [isAcceptPrice, setIsAcceptPrice] = useState(false);
  const [isAcceptDesign, setIsAcceptDesign] = useState(false);
  const [isSubmitDesign, setIsSubmitDesign] = useState(false);
  const [isCompleteProduct, setIsCompleteProduct] = useState(false);
  const [isCompleteOrder, setIsCompleteOrder] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOpenModalManager, setIsModalOpenManager] = useState(false);
  const [description, setDescription] = useState("");
  const [descriptionList, setDescriptionList] = useState([]);

  const productPrice = orderDetail?.order?.product?.totalPrice;

  const navigate = useNavigate();
  async function fetchRoleID() {
    const roleIDFromAPI = await getRoleId(cookies.token);
    setRoleID(roleIDFromAPI);
    console.log("Role ID:", roleIDFromAPI);
    console.log("Description list: ", descriptionList);
  }
  const showModalDetail = () => {
    setIsModalDetailVisible(true);
  };

  const handleOkDetail = () => {
    setIsModalDetailVisible(false);
  };
  const handleCancelDetail = () => {
    setIsModalDetailVisible(false);
  };

  const handleOnChangeOfModal = (e) => {
    setDescription(e.target.value);
  };

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
      Toast("create_success", "success", "Đã hoàn thành đơn hàng");
      console.log("Complete Order: ", response.data);
    } catch (error) {
      console.error("Error complete order: ", error);
    }
  };

  const getOrderHistories = async () => {
    try {
      const response = await axios.get(
        `${API_GET_ORDER_HISTORIES}/${orderID}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setStateID(response.data);
      const sortedOrderHistory = response.data.sort((a, b) => b.id - a.id);

      const mostRecentDescription =
        sortedOrderHistory.length > 0 ? sortedOrderHistory[0].description : "";

      // Update the state with the most recent description
      setOrderHistory(mostRecentDescription);
      console.log("Order histories fetched: ", response.data);
    } catch (error) {
      console.error("Error fetching order histories: ", error);
    }
  };

  const getOrderFullName = async () => {
    try {
      const response = await axios.get(
        `${API_GET_ORDER_HISTORIES}/${orderID}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Order full names fetched: ", response.data);
      // Duyệt qua mảng và trích xuất fullName từ mỗi user
      setDescriptionList(response.data);

      const fullNames = response.data.map((item) => item.full_name);
      // Giả sử setWhoNameAccepted có thể nhận một mảng các fullName
      setWhoNameAccepted(fullNames);

      console.log("Order full names fetched: ", fullNames);
    } catch (error) {
      console.error("Error fetching order full names: ", error);
    }
  };

  const getOrderDetail = async () => {
    try {
      console.log("orderID:", orderID); // Kiểm tra giá trị orderID
      if (!orderID) {
        throw new Error("Order ID is missing");
      }
      const response = await axios.get(`${API_VIEW_ORDER_DETAIL}/${orderID}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setOrderDetail(response.data);
      console.log("Order details fetched:", response.data);
    } catch (error) {
      console.error("Error fetching order details:", error);
    }
  };

  useEffect(() => {
    fetchRoleID();
  }, []);

  useEffect(() => {
    getOrderHistories();
  }, []);

  useEffect(() => {
    getOrderFullName();
    console.log(nameWhoAccepted);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      console.log("Product Price: ", productPrice);
      function convertVNDtoUSD(price) {
        let newPrice = price / 25600;
        return newPrice.toFixed(2);
      }
      setNewPrice(convertVNDtoUSD(productPrice));
      console.log("New Price: ", newPrice);
    }, 2000);
  }, [productPrice]);

  useEffect(() => {
    getOrderDetail();
  }, []);

  useEffect(() => {
    const updateConstraintName = async () => {
      const categoryName = orderDetail?.order?.product?.category?.name;
      const gemsName = orderDetail?.order?.product?.gem?.name;
      const goldName = orderDetail?.order?.product?.gold?.name;
      if (categoryName) {
        const convertedName = await convertConstraintName(categoryName);
        setCategoryName(convertedName);
      }
      if (gemsName) {
        const convertedGemsName = await convertConstraintName(gemsName);
        setGemsName(convertedGemsName);
      }
      if (goldName) {
        const convertedGemsName = await convertConstraintName(goldName);
        setGoldName(convertedGemsName);
      }
    };
    updateConstraintName();
  }, [orderDetail]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted },
  } = useForm();
  const base64Data =
    orderDetail &&
    orderDetail.productImages &&
    orderDetail.productImages[0]?.value // Optional chaining here
      ? orderDetail.productImages[0].value
      : null;

  const logo = base64Data ? `data:image/jpeg;base64,${base64Data}` : "";
  const imageUrls =
    orderDetail && orderDetail.productImages
      ? orderDetail.productImages.map(
          (image) => `data:image/jpeg;base64,${image.value}`
        )
      : [];

  const handleCustomerAcceptDesign = () => {
    customerAcceptDesign(true);
  };

  const handleCustomerDeclineDesign = () => {
    setIsModalOpenManager(true);
  };

  const handleCancel = () => {
    setIsModalOpenManager(false);
  };

  const handleAcceptPriceQuote = () => {
    acceptPriceQuote(true);
  };

  const handleDeclinePriceQuote = () => {
    setIsModalOpenManager(true);
  };

  const handleCheckoutProduct = () => {
    setIsModalOpen(true);
  };

  const handlePaymentSuccess = () => {
    customerAcceptPriceQuote(true);
    navigate("/don-hang");
    Toast("accept_price", "success", "Chấp nhận báo giá thành công!");
  };

  const handleOk = (approvalStatus, description) => {
    if (
      roleID === 6 &&
      orderDetail.order.state?.id === 2 &&
      approvalStatus === false
    ) {
      acceptPriceQuote(false, description);
    } else if (
      roleID === 2 &&
      orderDetail.order.state?.id === 4 &&
      approvalStatus === false
    ) {
      customerAcceptPriceQuote(false, description);
    } else if (
      roleID === 2 &&
      orderDetail.order.state?.id === 6 &&
      approvalStatus === false
    ) {
      customerAcceptDesign(false, description);
    }
  };

  const handleCompleteProduct = async () => {
    try {
      const response = await axios.put(
        `${API_COMPLETE_PRODUCT}/${orderID}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Complete Product: ", response.data);
      Toast("complete_product", "success", "Đã hoàn thành sản phẩm!");
      navigate("/yeu-cau");
      setIsCompleteProduct(true);
    } catch (error) {
      console.error("Error completing product: ", error);
      Toast("complete_err", "error", "Có lỗi khi hoàn thành sản phẩm");
    }
  };

  const handleDownloadPicture = () => {
    imageUrls.forEach((url, index) => {
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `image_${index + 1}.jpeg`);
      link.style.display = "none";

      document.body.appendChild(link);

      link.click();

      document.body.removeChild(link);
    });
  };

  const customerAcceptDesign = async (approvalStatus, description) => {
    const requestData = {
      order_id: orderID,
      response: approvalStatus,
    };
    if (approvalStatus === false) {
      requestData.description = description;
    }
    try {
      const response = await axios.put(
        `${API_CUSTOMER_ACCEPT_DESIGN}`,
        requestData,
        {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
        }
      );
      setIsAcceptDesign(approvalStatus);
      if (approvalStatus) {
        Toast("accept_design", "success", "Chấp nhận thiết kế thành công!");
      } else {
        Toast("decline_design", "success", "Từ chối thiết kế thành công!");
      }
      window.location.reload();

      console.log("Accept design: ", response.data);
    } catch (error) {
      console.error("Error accepting design: ", error);
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
      Toast("submit_price", "success", "Đã gửi báo giá thành công!");
    } catch (error) {
      console.error("Error submitting price quote: ", error);
    }
  };

  const handleButtonClick = (approvalStatus) => {
    if (roleID === 3 && orderDetail.order.state?.id === 1) {
      handleSubmitPriceQuote();
      isSubmitPrice(true);
    } else if (
      roleID === 6 &&
      orderDetail.order.state?.id === 2 &&
      approvalStatus
    ) {
      handleAcceptPriceQuote();
    } else if (
      roleID === 6 &&
      orderDetail.order.state?.id === 2 &&
      approvalStatus === false
    ) {
      handleDeclinePriceQuote();
    } else if (
      roleID === 2 &&
      orderDetail.order.state?.id === 4 &&
      approvalStatus
    ) {
      handleCheckoutProduct();
    } else if (
      roleID === 2 &&
      orderDetail.order.state?.id === 4 &&
      approvalStatus === false
    ) {
      setIsModalOpenManager(true);
    } else if (
      roleID === 2 &&
      orderDetail.order.state?.id === 6 &&
      approvalStatus
    ) {
      handleCustomerAcceptDesign(true);
    } else if (
      roleID === 2 &&
      orderDetail.order.state?.id === 6 &&
      approvalStatus === false
    ) {
      handleCustomerDeclineDesign();
    } else if (roleID === 5 && orderDetail.order.state?.id === 7) {
      handleCompleteProduct();
    }
  };

  const acceptPriceQuote = async (approvalStatus, description) => {
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
      navigate("/yeu-cau");
    } catch (error) {
      console.error("Error accepting price quote: ", error);
    }
  };

  const customerAcceptPriceQuote = async (approvalStatus) => {
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
      setIsAcceptPrice(true);
      window.location.reload();
    } catch (error) {
      console.error("Error accepting price quote: ", error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleString("vi-VN");
    return formattedDate;
  };

  if (!orderDetail) {
    return <div>Loading...</div>; // Add a loading state
  }

  return (
    <div className="flex flex-row dark:bg-[#111827] dark:text-white">
      <Sidebar />
      <div className="w-full h-full flex justify-center items-center my-auto">
        <div className="flex flex-col lg:flex-row gap-5 w-full max-w-6xl">
          <div className="bg-white dark:bg-gray-700 p-5 w-full lg:w-1/3 rounded-lg shadow-md">
            <div className="w-full mt-10">
              <Typography variant="h4" className="text-center font-bold mb-5">
                Thông tin khách hàng
              </Typography>
              <Divider className="bg-gray-400 dark:bg-gray-600" />
              {orderDetail?.order?.request && (
                <div className="space-y-4 mt-5">
                  <Typography variant="h6" className="font-medium">
                    Họ và tên:
                    <span className="font-normal ml-1">
                      {orderDetail.order.request.user.fullName}
                    </span>
                  </Typography>
                  <Typography variant="h6" className="font-medium">
                    Số điện thoại:
                    <span className="font-normal ml-1">
                      {orderDetail.order.request.user.phoneNumber}
                    </span>
                  </Typography>
                  <Typography variant="h6" className="font-medium">
                    Email:
                    <span className="font-normal ml-1">
                      {orderDetail.order.request.user.email}
                    </span>
                  </Typography>
                  <Typography variant="h6" className="font-medium">
                    Mã yêu cầu:
                    <span className="font-normal ml-1">
                      #{orderDetail.order.id}
                    </span>
                  </Typography>
                  <Typography variant="h6" className="font-medium">
                    Đơn được tạo vào ngày:
                    <span className="font-normal ml-1">
                      {formatDate(orderDetail.order.orderCreatedAt)}
                    </span>
                  </Typography>
                </div>
              )}
            </div>
          </div>
          <div className="bg-white dark:bg-gray-700 w-full lg:w-2/3 p-6 rounded-lg shadow-md">
            <MyStepper />
            <form>
              <div className="flex flex-col sm:flex-row items-center mb-6">
                <img
                  src={logo}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "../logo.png";
                  }}
                  className="w-28 h-28"
                  alt="Product Image"
                />
                <div className="sm:ml-6 mt-6 sm:mt-0 text-center sm:text-left">
                  <h1 className="text-2xl font-bold">
                    #{orderDetail.order.id}__
                    {orderDetail.order.product &&
                      orderDetail.order.product.name}
                  </h1>
                  <p
                    className={`mt-2 text-sm ${
                      orderDetail.order.state &&
                      (orderDetail.order.state.id === 8 ||
                        orderDetail.order.state.id === 9 ||
                        orderDetail.order.state.id === 5)
                        ? "text-green-500"
                        : orderDetail.order.state &&
                          orderDetail.order.state.id === 3
                        ? "text-red-500"
                        : "text-yellow-500"
                    }`}
                  >
                    {orderDetail.order.state &&
                      (orderDetail.order.state.id === 8 ||
                      orderDetail.order.state.id === 9 ||
                      orderDetail.order.state.id === 5
                        ? "Approved"
                        : orderDetail.order.state.id === 3
                        ? "Rejected"
                        : "Pending")}
                  </p>
                </div>
              </div>
              <div className="flex flex-col lg:flex-row gap-6 text-gray-800 dark:text-gray-200">
                {orderDetail.order.product && (
                  <div className="w-full lg:w-1/2 space-y-3">
                    <h3 className="font-medium">
                      Loại trang sức:
                      <span className="font-normal ml-1">{categoryName}</span>
                    </h3>
                    <h3 className="font-medium">
                      Loại đá:{" "}
                      <span className="font-normal ml-1">{gemsName}</span>
                    </h3>
                    <h3 className="font-medium">
                      Chất liệu:{" "}
                      <span className="font-normal ml-1">{goldName}</span>
                    </h3>
                    <h3 className="font-medium">
                      Kích thước:{" "}
                      <span className="font-normal ml-1">
                        {orderDetail.order.product.size}
                      </span>
                      (cm)
                    </h3>
                    <h3 className="font-medium">
                      Yêu cầu:
                      <span className="font-normal ml-1">
                        {orderDetail.order.product.description}
                      </span>
                    </h3>
                    <div className="flex items-center">
                      <h3 className="font-medium">Bản thiết kế:</h3>
                      {roleID != 4 && (
                        <div className="flex flex-row gap-2">
                          {imageUrls.length > 0 ? (
                            imageUrls.map((url, index) => (
                              <img
                                key={index}
                                src={url}
                                alt={`Product Image ${index + 1}`}
                                className="w-28 h-28 object-cover ml-3"
                              />
                            ))
                          ) : (
                            <p className="ml-3"> Chưa có bản thiết kế </p>
                          )}
                        </div>
                      )}
                      {roleID === 4 && !isSubmitDesign && (
                        <div className="ml-3">
                          <UploadPics
                            fileList={fileList}
                            setFileList={setFileList}
                            orderID={orderID}
                          />
                        </div>
                      )}
                    </div>
                    {roleID === 5 && (
                      <div className="ml-[45%]">
                        <Button onClick={handleDownloadPicture}>
                          Tải xuống
                        </Button>
                      </div>
                    )}
                    <Divider className="bg-gray-300 hs-dark-mode-active: bg-gray-400" />
                    <h3 className="font-medium">
                      Giá vàng:
                      <span className="font-normal ml-1">
                        {formatMoney(orderDetail.order.product.goldPrice)}
                      </span>
                    </h3>
                    <h3 className="font-medium">
                      Giá đá:
                      <span className="font-normal ml-1">
                        {formatMoney(orderDetail.order.product.gemPrice)}
                      </span>
                    </h3>

                    <h3 className="font-medium">
                      Tiền công:
                      <span className="font-normal ml-1">
                        {formatMoney(
                          orderDetail.order.product.manufacturingFee
                        )}
                      </span>
                    </h3>

                    <h3 className="font-medium">
                      Tổng giá tiền:
                      <span className="font-normal ml-1 text-green-500">
                        {formatMoney(orderDetail?.order?.product?.totalPrice)}
                      </span>
                    </h3>
                  </div>
                )}
              </div>
              {isSubmitPrice === false &&
                roleID === 3 &&
                orderDetail.order.state?.id === 1 && (
                  <div className="flex justify-end mt-6">
                    <Button
                      variant="outlined"
                      color="primary"
                      size="small"
                      style={{ padding: "4px 8px", fontSize: "0.75rem" }}
                      onClick={handleSubmitPriceQuote}
                    >
                      Báo giá
                    </Button>
                  </div>
                )}
              {(isAcceptPrice === false || isAcceptDesign === false) &&
                (roleID === 6 || roleID === 2) &&
                (orderDetail.order.state?.id === 4 ||
                  orderDetail.order.state?.id === 2 ||
                  orderDetail.order.state?.id === 6) && (
                  <div className="flex justify-end mt-6 gap-3">
                    <Button
                      variant="outlined"
                      color="success"
                      size="small"
                      style={{ padding: "4px 8px", fontSize: "0.75rem" }}
                      onClick={() => handleButtonClick(true)}
                    >
                      ĐỒNG Ý
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      size="small"
                      style={{ padding: "4px 8px", fontSize: "0.75rem" }}
                      onClick={() => handleButtonClick(false)}
                    >
                      TỪ CHỐI
                    </Button>
                  </div>
                )}
              {isCompleteProduct === false &&
                roleID === 5 &&
                orderDetail.order.state?.id === 7 && (
                  <div className="flex justify-end mt-6 gap-3">
                    <Button
                      variant="outlined"
                      color="success"
                      size="small"
                      style={{ padding: "4px 8px", fontSize: "0.75rem" }}
                      onClick={() => handleButtonClick()}
                    >
                      HOÀN THÀNH
                    </Button>
                  </div>
                )}
            </form>
            <div className="flex gap-2 mt-3">
              {isCompleteOrder === false &&
                roleID === 3 &&
                orderDetail.order.state.id === 8 && (
                  <Button
                    variant="outlined"
                    color="success"
                    size="small"
                    style={{ padding: "4px 6px", fontSize: "0.75rem" }}
                    onClick={completeOrder}
                  >
                    HOÀN THÀNH ĐƠN HÀNG
                  </Button>
                )}
              {(roleID === 2 || roleID === 3) &&
                (orderDetail.order.state.id === 8 ||
                  orderDetail.order.state.id === 9) && (
                  <WarrantyExport orderDetail={orderDetail} />
                )}
            </div>
            <Button onClick={showModalDetail}>
              Chi tiết tình trạng đơn hàng
            </Button>
            <Modal
              title="Chi tiết"
              visible={isModalDetailVisible}
              onOk={handleOkDetail}
              onCancel={handleCancelDetail}
              footer={null}
            >
              <StepperDetail
                name={nameWhoAccepted}
                description={descriptionList}
                stateID={stateID}
              />
            </Modal>
          </div>
        </div>
      </div>

      <PayPalModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        price={newPrice}
        onSuccess={handlePaymentSuccess}
        id={orderDetail.order.id}
        cusName={orderDetail.order.request.user.fullName}
        orderCreated={orderDetail.order.orderCreatedAt}
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

export default CustomerOrderProductDetail;

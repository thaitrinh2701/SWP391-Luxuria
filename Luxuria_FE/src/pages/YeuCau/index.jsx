import { Toast } from "@/components";
import ProductDetailCard from "@/components/ProductDetailCard";
import RequestDetailCard from "@/components/RequestDetailCard";
import SaleStaffRequestCard from "@/components/SaleStaff_RequestCard";
import { getRoleId } from "@/services";
import { Tabs, Sidebar } from "@components";
import { USER_ROLES } from "@utils/constant";
import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

function YeuCau() {
  const [cookies] = useCookies(["user", "token"]);
  const [roleID, setRoleID] = useState(null);
  const token = cookies.token;
  const API_VIEW_ALL_REQUEST_SALES_STAFF = import.meta.env
    .VITE_API_VIEW_ALL_REQUEST_ENDPOINT;
  const API_VIEW_ALL_STAFF = import.meta.env
    .VITE_API_VIEW_ALL_ORDER_ALL_STAFF_ENDPOINT;
  const API_GET_ALL_REQUEST_CUSTOMER = import.meta.env
    .VITE_API_GET_ALL_REQUEST_CUSTOMER_ENDPOINT;

  const [requests, setRequests] = useState([]);
  const [orderList, setOrderList] = useState([]);

  async function fetchRoleID() {
    const roleIDFromAPI = await getRoleId(cookies.token);
    setRoleID(roleIDFromAPI);
    console.log("Role ID:", roleIDFromAPI);
  }

  const getAllRequestsCustomer = async () => {
    try {
      const response = await axios.get(API_GET_ALL_REQUEST_CUSTOMER, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const activeRequests = response.data.filter((request) => request.active);
      setRequests(activeRequests);
      Toast(
        "fetch_orders_success",
        "success",
        "Lấy dữ liệu yêu cầu thành công"
      );
      console.log("Requests fetched:", activeRequests);
    } catch (error) {
      if (error.response && error.response.status === 403) {
        console.error(
          "Access denied. You are not authorized to access this resource."
        );
      } else {
        console.error("Error fetching requests:", error);
      }
    }
  };

  const getAllRequests = async () => {
    try {
      const response = await axios.get(API_VIEW_ALL_REQUEST_SALES_STAFF, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const activeRequests = response.data.filter(
        (request) => request.active === true
      );
      setRequests(activeRequests);
      Toast(
        "fetch_orders_success",
        "success",
        "Lấy dữ liệu yêu cầu thành công"
      );

      console.log("Requests:", activeRequests);
    } catch (error) {
      console.error("Error fetching requests:", error);
    }
  };

  const getAllOrders = async () => {
    try {
      const response = await axios.get(API_VIEW_ALL_STAFF, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Orders fetched:", response.data);

      // Lọc các phần tử không phải là null
      const filteredOrders = response.data.filter((order) => order !== null);
      //Lọc order theo từng role ID
      if (roleID === USER_ROLES.MANAGER) {
        const managerFilteredOrders = filteredOrders.filter(
          (order) => order.process.id === 1
        );
        setOrderList(managerFilteredOrders);
        console.log("Manager orders:", managerFilteredOrders);
      } else if (roleID === USER_ROLES.DESIGN_STAFF) {
        const designStaffFilteredOrders = filteredOrders.filter(
          (order) => order.process.id === 3
        );
        setOrderList(designStaffFilteredOrders);
        console.log("Design staff orders:", designStaffFilteredOrders);
      } else if (roleID === USER_ROLES.PRODUCTION_STAFF) {
        const productionStaffFilteredOrders = filteredOrders.filter(
          (order) => order.process.id === 5
        );
        setOrderList(productionStaffFilteredOrders);
        console.log("Production staff orders:", productionStaffFilteredOrders);
      } else {
        setOrderList(filteredOrders);
        console.log("Other roles orders:", filteredOrders);
      }
      Toast(
        "fetch_orders_success",
        "success",
        "Lấy dữ liệu đơn hàng thành công"
      );
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    fetchRoleID();
    Toast("fetching_pending", "info", "Đang tải tất cả yêu cầu...");
  }, []);

  useEffect(() => {
    if (roleID === null) return;
    if (roleID === 3) {
      getAllRequests();
    } else if (
      roleID === 1 ||
      roleID === 3 ||
      roleID === 4 ||
      roleID === 5 ||
      roleID === 6
    ) {
      getAllOrders();
    } else if (roleID === 2) {
      getAllRequestsCustomer();
    }
  }, [roleID]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-[auto,1fr] gap-10">
      <Sidebar />
      <div className="px-10 py-6 bg-white flex flex-col mt-1 w-full md:w-[100%] dark:bg-[#111827]">
        <div className="mt-10 h-full">
          {USER_ROLES.SALE_STAFF === roleID &&
            requests.map((request_item) => (
              <SaleStaffRequestCard
                key={request_item.id}
                requestID={request_item.id}
                createdAt={request_item.createdAt}
                username={request_item.user.fullName}
                email={request_item.user.email}
                phone_number={request_item.user.phoneNumber}
                isSaleStaffApproved={request_item.salesStaffApproved}
              />
            ))}

          {(USER_ROLES.MANAGER === roleID ||
            USER_ROLES.DESIGN_STAFF === roleID ||
            USER_ROLES.PRODUCTION_STAFF === roleID) &&
            orderList.map((order) => (
              <ProductDetailCard
                key={order.id}
                requestID={order.request.id}
                orderID={order.id}
                productName={order.product.name}
                category={order.product.category.name}
                process={order.process.name}
                state={order.state.name}
                stateID={order.state.id}
                isCustomerApproved={order.customerApproved}
                productPrice={order.product.totalPrice}
              />
            ))}

          {USER_ROLES.CUSTOMER === roleID &&
            requests.map((request) => (
              <RequestDetailCard
                key={request.id}
                requestID={request.id}
                createdAt={request.createdAt}
                salesStaffApproved={request.salesStaffApproved}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

export default YeuCau;

import axios from "axios";
import { useEffect, useState } from "react";
import ProductDetailCard from "../ProductDetailCard";
import { useCookies } from "react-cookie";
import { USER_ROLES } from "@utils/constant";
import { getRoleId } from "@/services";
import { Toast } from "../Toast";

const STATES = [
  { id: 0, name: "Tất cả đơn hàng" },
  { id: 1, name: "Chờ báo giá" },
  { id: 2, name: "Chờ Manager phê duyệt báo giá" },
  { id: 3, name: "Bị từ chối" },
  { id: 4, name: "Chờ Customer chấp nhận báo giá" },
  { id: 5, name: "Chờ bản thiết kế 3D trang sức" },
  { id: 6, name: "Chờ phê duyệt bản thiết kế 3D trang sức" },
  { id: 7, name: "Chờ gia công trang sức" },
  { id: 8, name: "Đã hoàn thành gia công" },
  { id: 9, name: "Hoàn thành" },
];

export function Tabs() {
  const [activeTab, setActiveTab] = useState(0);
  const [cookies] = useCookies(["user", "token"]);
  const token = cookies.token;
  const [roleID, setRoleID] = useState(null);
  const [orderList, setOrderList] = useState([]);

  // Function to fetch roleID and set the state
  async function fetchRoleID() {
    const roleIDFromAPI = await getRoleId(cookies.token);
    setRoleID(roleIDFromAPI);
    console.log("Role ID:", roleIDFromAPI);
  }

  const API_VIEW_ALL_ORDERS_CUSTOMER = import.meta.env
    .VITE_API_VIEW_ORDER_CUSTOMER_ENDPOINT;
  const API_VIEW_ALL_STAFF = import.meta.env
    .VITE_API_VIEW_ALL_ORDER_ALL_STAFF_ENDPOINT;

  const getAllOrders = async () => {
    if (roleID === null) return;

    const API_ENDPOINT =
      roleID === USER_ROLES.CUSTOMER
        ? API_VIEW_ALL_ORDERS_CUSTOMER
        : API_VIEW_ALL_STAFF;

    try {
      const response = await axios.get(API_ENDPOINT, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Orders fetched:", response.data);

      // Filter out null orders
      const filteredOrders = response.data.filter(
        (order) => order !== null && order.active === true
      );
      Toast(
        "fetch_orders_success",
        "success",
        "Lấy dữ liệu đơn hàng thành công"
      );
      setOrderList(filteredOrders);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    fetchRoleID();
  }, []);

  useEffect(() => {
    if (roleID !== null) {
      Toast("fetching_pending", "info", "Đang tải đơn hàng...");
      getAllOrders();
    }
  }, [roleID]);

  return (
    <div>
      <nav
        className="relative mt-3 z-0 flex border rounded-xl overflow-hidden dark:border-[#1f2937]"
        aria-label="Tabs"
        role="tablist"
      >
        {STATES.map((state) => (
          <button
            key={state.id}
            type="button"
            className={`hs-tab-active:border-b-blue-600 hs-tab-active:text-gray-900 dark:hs-tab-active:text-white relative  dark:hs-tab-active:border-b-blue-600 min-w-0 flex-1 bg-white first:border-s-0 border-s border-b-2 py-4 px-4 text-gray-500 hover:text-gray-700 text-sm font-medium text-center overflow-hidden hover:bg-gray-50 focus:z-10 focus:outline-none focus:text-blue-600 disabled:opacity-50 disabled:pointer-events-none dark:bg-[#1F2937] dark:border-l-neutral-700 dark:border-b-neutral-700 dark:text-neutral-400 dark:hover:bg-[#211f37] dark:hover:text-neutral-400 ${
              activeTab === state.id ? "active" : ""
            }`}
            id={`bar-with-underline-item-${state.id}`}
            data-hs-tab={`#bar-with-underline-${state.id}`}
            aria-controls={`bar-with-underline-${state.id}`}
            role="tab"
            onClick={() => setActiveTab(state.id)}
          >
            {state.name}
          </button>
        ))}
      </nav>

      <div className="mt-3">
        {STATES.map((state) => (
          <div
            key={state.id}
            id={`bar-with-underline-${state.id}`}
            className={activeTab === state.id ? "" : "hidden"}
            role="tabpanel"
            aria-labelledby={`bar-with-underline-item-${state.id}`}
          >
            {(USER_ROLES.CUSTOMER === roleID ||
              USER_ROLES.MANAGER === roleID ||
              USER_ROLES.SALE_STAFF === roleID ||
              USER_ROLES.DESIGN_STAFF === roleID) &&
              orderList
                .filter(
                  (order) => state.id === 0 || order.state.id === state.id
                )
                .map((order) => (
                  <ProductDetailCard
                    key={order.id}
                    requestID={order.request.id}
                    orderID={order.id}
                    productName={order.product.name}
                    category={order.product.category.name}
                    process={order.process.name}
                    processID={order.process.id}
                    state={order.state.name}
                    stateID={order.state.id}
                    isCustomerApproved={order.customerApproved}
                    productPrice={order.product.totalPrice}
                    fullName={order.request.user.fullName}
                    email={order.request.user.email}
                    orderCreatedAt={order.orderCreatedAt}
                    gemName={order.product.gem.name}
                    gold={order.product.gold.name}
                    size={order.product.size}
                    dateCreated={order.orderCreatedAt}
                    cusName={order.request.user.fullName}
                  />
                ))}
          </div>
        ))}
      </div>
    </div>
  );
}

import axios from "axios";
import { useEffect, useState } from "react";
import ProductDetailCard from "../ProductDetailCard";
import { useCookies } from "react-cookie";
import { USER_ROLES } from "@utils/constant";
import { getRoleId } from "@/services";

export function Tabs() {
  const [activeTab, setActiveTab] = useState(1);
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
      const filteredOrders = response.data.filter((order) => order !== null);
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
      getAllOrders();
    }
  }, [roleID]);

  return (
    <div>
      <div className="mt-3">
        <div
          id="bar-with-underline-1"
          className={activeTab === 1 ? "" : "hidden"}
          role="tabpanel"
          aria-labelledby="bar-with-underline-item-1"
        >
          {(USER_ROLES.CUSTOMER === roleID ||
            USER_ROLES.MANAGER === roleID ||
            USER_ROLES.SALE_STAFF === roleID ||
            USER_ROLES.DESIGN_STAFF === roleID) &&
            orderList.map((order) => (
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
              />
            ))}
        </div>
      </div>
    </div>
  );
}

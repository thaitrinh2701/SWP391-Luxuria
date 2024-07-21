import React, { useState, useEffect } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useParams } from "react-router-dom";
import { Typography, List, ListItem, ListItemText } from "@mui/material";

const StepperDetail = ({ name, description, stateID }) => {
  const [cookies] = useCookies(["token"]);
  const [orderDetail, setOrderDetail] = useState(null); // Set initial state to null
  const { orderID } = useParams();

  const API_VIEW_ORDER_DETAIL = import.meta.env
    .VITE_API_VIEW_ORDER_DETAIL_CUSTOMER_ENDPOINT;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("vi-VN");
  };

  const convertStateIdToName = (stateId) => {
    switch (stateId) {
      case 1:
        return "Chờ báo giá";
      case 2:
        return "Chờ Manager phê duyệt báo giá";
      case 3:
        return "Bị từ chối";
      case 4:
        return "Chờ Customer chấp nhận báo giá";
      case 5:
        return "Chờ bản thiết kế 3D trang sức";
      case 6:
        return "Chờ phê duyệt bản thiết kế 3D trang sức";
      case 7:
        return "Chờ gia công trang sức";
      case 8:
        return "Đã hoàn thành gia công";
      case 9:
        return "Hoàn thành";
      default:
        return "Khác";
    }
  };

  const getOrderDetail = async () => {
    try {
      if (!orderID) {
        throw new Error("Order ID is missing");
      }
      const response = await axios.get(`${API_VIEW_ORDER_DETAIL}/${orderID}`, {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
          "Content-Type": "application/json",
        },
      });

      console.log("Order data: ", response.data);
      setOrderDetail(response.data);
    } catch (error) {
      console.error("Error fetching order details:", error);
    }
  };

  useEffect(() => {
    getOrderDetail();
  }, [orderID, cookies.token]);

  if (!orderDetail) {
    return <Typography>Loading...</Typography>;
  }

  const { order } = orderDetail;

  return (
    <div style={{ maxWidth: "600px", margin: "auto" }}>
      <List>
        {stateID.map((item, index) => (
          <ListItem key={index} alignItems="flex-start">
            <ListItemText
              primary={`${formatDate(item.date_time)} - ${
                item.full_name || "Unknown"
              }`}
              secondary={`${item.description || ""} - ${
                item.state_id ? convertStateIdToName(item.state_id) : "Unknown"
              }`}
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default StepperDetail;

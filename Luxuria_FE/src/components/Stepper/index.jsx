import React, { useState, useEffect } from "react";
import { Stepper, Step, StepLabel, Typography } from "@mui/material";
import axios from "axios";
import { getRoleId } from "@/services";
import { useCookies } from "react-cookie";
import { useParams } from "react-router-dom";

const MyStepper = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [currentStepId, setCurrentStepId] = useState(null);
  const [roleID, setRoleID] = useState(null);
  const [cookies] = useCookies(["user", "token"]);
  const [orderDetail, setOrderDetail] = useState(null);
  const { orderID } = useParams();

  const steps = [
    { id: 1, name: "Chờ phê duyệt báo giá" },
    { id: 2, name: "Chờ khách hàng chấp nhận báo giá" },
    { id: 3, name: "Chờ bản thiết kế 3D" },
    { id: 4, name: "Chờ khách hàng chấp nhận bản thiết kế 3D" },
    { id: 5, name: "Chờ gia công trang súc" },
    { id: 6, name: "Nhận trang sức" },
    { id: 7, name: "Hoàn thành" },
  ];

  const API_VIEW_ORDER_DETAIL = import.meta.env
    .VITE_API_VIEW_ORDER_DETAIL_CUSTOMER_ENDPOINT;

  async function fetchRoleID() {
    const roleIDFromAPI = await getRoleId(cookies.token);
    setRoleID(roleIDFromAPI);
    console.log("Role ID:", roleIDFromAPI);
  }

  const getOrderDetail = async () => {
    try {
      console.log("orderID:", orderID); // Kiểm tra giá trị orderID
      if (!orderID) {
        throw new Error("Order ID is missing");
      }
      const response = await axios.get(`${API_VIEW_ORDER_DETAIL}/${orderID}`, {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
          "Content-Type": "application/json",
        },
      });
      const orderData = response.data;
      setOrderDetail(orderData);
      console.log("Order data: ", orderData);
      setCurrentStepId(orderData.order.process.id);
    } catch (error) {
      console.error("Error fetching order details:", error);
    }
  };

  useEffect(() => {
    fetchRoleID();
  }, []);

  useEffect(() => {
    getOrderDetail();
  }, [orderID]);

  useEffect(() => {
    if (currentStepId) {
      const stepIndex = steps.findIndex((step) => step.id === currentStepId);
      if (stepIndex !== -1) {
        setActiveStep(stepIndex);
      }
    }
  }, [currentStepId]);

  return (
    <div>
      {currentStepId === null ? (
        <Typography>Loading...</Typography>
      ) : (
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((step, index) => (
            <Step key={step.id} completed={index <= activeStep}>
              <StepLabel>
                <span className="dark:text-white text-center">{step.name}</span>
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      )}
    </div>
  );
};

export default MyStepper;

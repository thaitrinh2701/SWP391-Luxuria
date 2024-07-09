import React from "react";
import { Modal, Button } from "antd";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { Toast } from "../Toast";

const PayPalModal = ({ isOpen, onClose, price, onSuccess }) => {
  return (
    <Modal
      title="Thanh toán"
      visible={isOpen}
      onCancel={onClose}
      footer={[
        <Button key="close" onClick={onClose} type="primary" danger>
          Đóng
        </Button>,
      ]}
    >
      <PayPalButtons
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: price, // Số tiền thanh toán
                },
              },
            ],
          });
        }}
        onApprove={(data, actions) => {
          return actions.order.capture().then((details) => {
            Toast("purchase_success", "success", "Thanh toán thành công!");
            if (onSuccess) onSuccess();
          });
        }}
        onCancel={() => {
          Toast("purchase_cancel", "error", "Bạn đã hủy thanh toán!");
        }}
      />
    </Modal>
  );
};

export default PayPalModal;

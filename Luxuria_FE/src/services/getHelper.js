import axios from "axios";
import { USER_ROLES, DUMMY_GOLD_PRICE_DATA } from "@utils/constant";
import { getOrdersRevenueAndProductChartDatas } from "@services";

export async function getRoleId(token) {
  const API = import.meta.env.VITE_API_TOKEN_AUTH;
  try {
    let result = await axios.get(API, {
      headers: { Authorization: "Bearer " + token },
    });
    return result.data?.id || USER_ROLES.CUSTOMER; //* default value of customer_role_id
  } catch (e) {
    console.error(e);
    return USER_ROLES.CUSTOMER; //* default value of customer_role_id
  }
}

export async function convertConstraintName(constraintName) {
  switch (constraintName) {
    case "ring":
      return "Nhẫn";
    case "necklace":
      return "Vòng cổ";
    case "bracelet":
      return "Vòng tay";
    case "earrings":
      return "Bông tai";
    case "pendant":
      return "Mặt dây chuyền";
    case "bangles":
      return "Dây chuyền";
    case "none":
      return "Không có";
    case "diamond":
      return "Kim cương";
    case "colored gemstones":
      return "Đá quý màu";
    case "jade":
      return "Ngọc";
    case "pearl":
      return "Ngọc trai";
    case "artificial pearl":
      return "Ngọc trai nhân tạo";
    case "24k gold":
      return "Vàng 24K";
    case "18k gold":
      return "Vàng 18K";
    case "14k gold":
      return "Vàng 14K";
    case "16k gold":
      return "Vàng 16K";
    case "other":
      return "Khác";
  }
}

export async function getGoldPrice() {
  const from_date = "06/01/2024";
  const to_date = "06/30/2024";
  const API = `/api/CMCWPCoreAPI/api/public-service/get-gold-info-chart?from_date=${from_date}&to_date=${to_date}`;
  try {
    let result = await axios.get(API);
    return result.data?.item || [];
  } catch (e) {
    console.error(e);
    return DUMMY_GOLD_PRICE_DATA;
  }
}

export async function getDashboardDatas(token) {
  const API = import.meta.env.VITE_API_ORDER_ENDPOINT;
  try {
    let result = await axios.get(API, {
      headers: { Authorization: "Bearer " + token },
    });
    let chartDatas = getOrdersRevenueAndProductChartDatas(result.data);
    let tableDatas = result.data;
    return {
      success: (chartDatas || tableDatas) !== undefined ? true : false,
      data: (chartDatas || tableDatas) !== undefined ? true : null,
      message:
        (chartDatas || tableDatas) !== undefined
          ? "Lấy dữ liệu thành công!"
          : "Có lỗi khi lấy dữ liệu!",
      card: {
        data: null,
      },
      chart: chartDatas,
      table: tableDatas,
    };

    // return result.data || [];
  } catch (e) {
    console.error(e);
    return {
      success: null,
      data: null,
      message: "Lỗi kết nối tới máy chủ!",
      card: {
        data: null,
      },
      chart: null,
      table: null,
    };
  }
}

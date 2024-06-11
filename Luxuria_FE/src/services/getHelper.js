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

export async function getGoldPrice() {
  const API = import.meta.env.VITE_API_GOLDRATE_ENDPOINT;
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

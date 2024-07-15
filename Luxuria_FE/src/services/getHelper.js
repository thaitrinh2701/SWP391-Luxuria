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

/** 
 * minimumFractionDigits: Thiết lập số chữ số thập phân tối thiểu để hiển thị. Nếu số tiền có ít chữ số thập phân hơn giá trị này, nó sẽ được điền thêm bằng số 0.
   maximumFractionDigits: Thiết lập số chữ số thập phân tối đa để hiển thị. Nếu số tiền có nhiều chữ số thập phân hơn giá trị này, nó sẽ được làm tròn.
*/
export const formatMoney = (amount) => {
  const formattedNumber = new Intl.NumberFormat("vn-VN", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);

  return `${formattedNumber}đ`;
};

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

export async function convertRoleName(constraintName) {
  switch (constraintName) {
    case "admin":
      return "Admin";
    case "customer":
      return "Customer";
    case "sales_staff":
      return "Sales Staff";
    case "design_staff":
      return "Design Staff";
    case "production_staff":
      return "Production Staff";
    case "manager":
      return "Manager";
    case "other":
      return "Khác";
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

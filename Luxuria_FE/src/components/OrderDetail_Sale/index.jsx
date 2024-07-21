import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate, useParams } from "react-router-dom";
import { Sidebar, Input, Toast } from "@components";
import { Divider } from "antd";
import { Button } from "@mui/material";
import { ORDER_DETAIL_FORMAT, SALESTAFF_CALCULATION } from "@utils/constant";

const OrderDetailSale = () => {
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    watch,
    formState: { errors },
  } = useForm();
  const { orderID, requestID } = useParams();
  const [cookies] = useCookies(["user", "token"]);
  const token = cookies.token;
  const API = import.meta.env.VITE_API_CREATE_ORDER_ENDPOINT;
  const [productCost, setProductCost] = useState(0);
  const [orderDetail, setOrderDetail] = useState(null);
  const [orderStateID, setOrderStateID] = useState(null); // State to track the order state ID
  const [selectValue, setSelectValue] = useState(""); // State to track the selected value
  const [products, setProducts] = useState([]); // State to store fetched products
  const navigate = useNavigate();
  const API_VIEW_ORDER_DETAIL = import.meta.env
    .VITE_API_VIEW_ORDER_DETAIL_CUSTOMER_ENDPOINT;
  const API_SUBMIT_NEW_ORDER = import.meta.env
    .VITE_API_SUBMIT_NEW_ORDER_ENDPOINT;
  const API_GET_PRODUCT_DETAIL = import.meta.env
    .VITE_API_GET_PRODUCT_DETAIL_ENDPOINT;

  const getOrderDetail = async () => {
    try {
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
      console.log("Order detail:", response.data);
      // Populate form fields with API data
      setValue("name", response.data.order.product.name);
      setValue("category_id", response.data.order.product.category.id);
      setValue("size", response.data.order.product.size);
      setValue("gold_id", response.data.order.product.gold.id);
      setValue("gem_id", response.data.order.product.gem.id);
      setValue("description", response.data.order.product.description);
      setValue("gold_price", response.data.order.product.goldPrice);
      setValue("gold_weight", response.data.order.product.goldWeight);
      setValue(
        "manufacturing_fee",
        response.data.order.product.manufacturingFee
      );
      setValue("gem_price", response.data.order.product.gemPrice);
      // Set order state ID
      setOrderStateID(response.data.order.state.id);
    } catch (error) {
      console.error("Error fetching order details:", error);
    }
  };
  const fetchAllProducts = async () => {
    try {
      const response = await axios.get(`${API_GET_PRODUCT_DETAIL}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setProducts(response.data);
      console.log("Fetched products: ", response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleSelectChange = async (event) => {
    const id = event.target.value;
    setSelectValue(id);
    try {
      const response = await axios.get(`${API_GET_PRODUCT_DETAIL}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const product = response.data;
      console.log("Select change data: ", product);
      setSelectValue(product.id);

      // Fill the form fields with the selected product data
      setValue("name", product.name);
      setValue("category_id", product.category.id);
      setValue("size", product.size);
      setValue("gold_id", product.gold.id);
      setValue("gem_id", product.gem.id);
      setValue("description", product.description);
      setValue("gold_price", product.goldPrice);
      setValue("gold_weight", product.goldWeight);
      setValue("manufacturing_fee", product.manufacturingFee);
      setValue("gem_price", product.gemPrice);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const submitNewOrder = async (data) => {
    const userId = cookies.user?.id;

    if (!userId) {
      Toast("login_err", "error", "Vui lòng đăng nhập để chỉnh sửa đơn!");
      navigate("/login");
      return;
    }

    const requestData = {
      name: data.name,
      category_id: data.category_id,
      size: data.size,
      gold_id: data.gold_id,
      gold_price: parseFloat(data.gold_price),
      gold_weight: parseFloat(data.gold_weight),
      gem_id: data.gem_id,
      gem_price: parseFloat(data.gem_price),
      manufacturing_fee: parseFloat(data.manufacturing_fee),
      total_price: parseFloat(productCost),
      description: data.description,
    };

    try {
      const response = await axios.post(
        `${API_SUBMIT_NEW_ORDER}/${orderID}`,
        requestData,
        {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
        }
      );
      Toast("processing", "info", "Đang xử lý đơn...");
      if (response.status === 200) {
        Toast("create_success", "success", "Chỉnh sửa đơn hàng thành công!");
        navigate("/don-hang");
      } else {
        Toast("create_err", "error", "Chỉnh sửa đơn hàng thất bại!");
      }
    } catch (error) {
      console.error("Error:", error);

      if (error.response) {
        if (error.response.status === 400) {
          Toast("send_err", "error", "Dữ liệu gửi đi không hợp lệ!");
          console.error("Server Response:", error.response.data);
        } else if (error.response.status === 403) {
          Toast("send_err", "error", "Bạn không có quyền truy cập!");
          console.error("Server Response:", error.response.data);
        } else {
          Toast("send_err", "error", "Lỗi kết nối tới máy chủ!");
        }
      } else {
        Toast("connect_err", "error", "Lỗi kết nối tới máy chủ!");
      }
    }
  };

  useEffect(() => {
    if (orderID) {
      getOrderDetail();
    }
  }, [orderID]);

  useEffect(() => {
    fetchAllProducts();
  }, []);

  const onSubmit = async (data) => {
    const userId = cookies.user?.id;

    if (!userId) {
      Toast("login_err", "error", "Vui lòng đăng nhập để gửi đơn!");
      navigate("/login");
      return;
    }

    const requestData = {
      name: data.name,
      category_id: data.category_id,
      size: data.size,
      gold_id: data.gold_id,
      gold_price: parseFloat(data.gold_price),
      gold_weight: parseFloat(data.gold_weight),
      gem_id: data.gem_id,
      gem_price: parseFloat(data.gem_price),
      manufacturing_fee: parseFloat(data.manufacturing_fee),
      total_price: parseFloat(productCost),
      description: data.description,
    };

    try {
      const response = await axios.post(`${API}/${requestID}`, requestData, {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
      });
      Toast("processing", "info", "Đang xử lý đơn...");
      if (response.status === 200) {
        Toast("create_success", "success", "Tạo đơn hàng thành công!");
        navigate("/yeu-cau");
      } else {
        Toast("create_err", "error", "Tạo đơn hàng thất bại!");
      }
    } catch (error) {
      console.error("Error:", error);

      if (error.response) {
        if (error.response.status === 400) {
          Toast("send_err", "error", "Dữ liệu gửi đi không hợp lệ!");
          console.error("Server Response:", error.response.data);
        } else if (error.response.status === 403) {
          Toast("send_err", "error", "Bạn không có quyền truy cập!");
          console.error("Server Response:", error.response.data);
        } else {
          Toast("send_err", "error", "Lỗi kết nối tới máy chủ!");
        }
      } else {
        Toast("send_err", "error", "Lỗi kết nối tới máy chủ!");
      }
    }
  };

  const handleCalculation = () => {
    const data = getValues();
    const MAX_VALUE = 100000000;
    const MIN_VALUE = 0;
    if (
      (data.gold_price > MIN_VALUE && data.gold_price < MAX_VALUE) ||
      (data.gold_weight > MIN_VALUE && data.gold_weight < MAX_VALUE) ||
      (data.manufacturing_fee > MIN_VALUE &&
        data.manufacturing_fee < MAX_VALUE) ||
      (data.gem_price > MIN_VALUE && data.gem_price < MAX_VALUE)
    ) {
      const giaVangThoiDiem = parseFloat(data.gold_price) || 0;
      const trongLuongSanPham = parseFloat(data.gold_weight) || 0;
      const tienCong = parseFloat(data.manufacturing_fee) || 0;
      const tienDa = parseFloat(data.gem_price) || 0;

      const giaVonSanPham =
        giaVangThoiDiem * trongLuongSanPham + tienCong + tienDa;
      setProductCost(giaVonSanPham);
    } else {
      Toast("calculation_err", "error", "Vui lòng nhập giá trị hợp lệ!");
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="p-8 mt-[2%] flex-grow">
        <div className="bg-white rounded-lg my-12 shadow-md p-8 dark:bg-gray-800">
          <div className="flex items-center mb-8">
            <div>
              {orderDetail?.order?.state.id != 3 && (
                <p className="font-semibold text-lg dark:text-white">
                  Mã yêu cầu: {requestID}
                </p>
              )}
              {orderDetail?.order?.state.id === 3 && (
                <p className="font-semibold text-lg dark:text-white">
                  Mã đơn hàng: {orderID}
                </p>
              )}
            </div>
          </div>
          <Divider />
          <div>
            <div className="flex flex-col lg:flex-row gap-6">
              <form
                onSubmit={handleSubmit((data) => {
                  if (orderStateID === 3) {
                    submitNewOrder(data);
                  } else {
                    onSubmit(data);
                  }
                })}
                className="space-y-4 z-50 w-full lg:w-1/2"
              >
                <div className="col-span-1 sm:col-span-2">
                  <label className="block font-medium">Chọn sản phẩm</label>
                  <select
                    id="selectBox"
                    className="mt-3 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    {...register("product")}
                    value={selectValue}
                    onChange={handleSelectChange}
                  >
                    <option value="">Chọn sản phẩm</option>
                    {products.map((product) => (
                      <option key={product.id} value={product.id}>
                        {product.id} - {product.name}
                      </option>
                    ))}
                  </select>
                  {errors.product && (
                    <span className="text-red-500">
                      {errors.product.message}
                    </span>
                  )}
                </div>
                {ORDER_DETAIL_FORMAT.map((item) => (
                  <div key={item.id}>
                    <div className="font-medium">
                      {item.label}
                      {item.rules.required && (
                        <span className="text-red-500 ml-1">*</span>
                      )}
                    </div>
                    {item.type === "select" ? (
                      <select
                        id={item.id}
                        name={item.name}
                        className="mt-3 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        {...register(item.id, {
                          required: item.rules.required || false,
                          onChange: (e) => {
                            setValue(item.id, e.target.value);
                            watch(item.id);
                          },
                        })}
                        disabled={orderStateID === 3}
                      >
                        <option value="">{item.placeholder}</option>
                        {item.options.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type={item.type}
                        id={item.id}
                        name={item.name}
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        {...register(item.id, {
                          required: item.rules.required || false,
                          pattern: item.rules.pattern
                            ? {
                                value: item.rules.pattern.value,
                                message: item.rules.pattern.message,
                              }
                            : undefined,
                          minLength: item.rules.minLength
                            ? {
                                value: item.rules.minLength.value,
                                message: `Minimum length is ${item.rules.minLength.value}`,
                              }
                            : undefined,
                        })}
                        disabled={orderStateID === 3} // Conditionally disable based on orderStateID
                      />
                    )}
                    {errors[item.id] && (
                      <span className="text-red-600">
                        {errors[item.id].message}
                      </span>
                    )}
                  </div>
                ))}
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-600"
                >
                  {orderDetail?.order?.state?.id === 3 ? "Lưu" : "Xác nhận"}
                </button>
              </form>

              <div className="border border-l-gray-300 rounded" />
              <div className="w-full lg:w-1/2">
                {SALESTAFF_CALCULATION.map((item) => (
                  <div key={item.id}>
                    <h3 className="font-medium">
                      {item.label}:
                      {item.isRequired && (
                        <span className="text-red-500 ml-1">*</span>
                      )}
                    </h3>
                    <Input {...register(item.name, item.rules)} />
                    <div>
                      {errors[item.name] && (
                        <span className="text-red-600">
                          {errors[item.name]?.message}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
                <h3 className="font-medium mt-[25%]">
                  Giá vốn sản phẩm: <span>{productCost} VNĐ</span>
                </h3>
                <Button onClick={handleCalculation}>Tính giá tiền</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailSale;

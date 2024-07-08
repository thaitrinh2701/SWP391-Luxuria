import { Table, EmptyState } from "@components";
import { DASHBOARD_TABLE_HEADERS } from "@utils/constant";
import Sidebar from "../Sidebar";
import { useCallback, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { getDashboardDatas } from "@/services";
import { Toast } from "@/components";
import { Button } from "@mui/material";
import ProductTable from "./Table";
import axios from "axios";

function ProductManagement() {
  const [data, setData] = useState();

  const [cookies] = useCookies(["token"]);

  const API_GET_ALL_PRODUCT = import.meta.env
    .VITE_API_GET_ALL_PRODUCTS_ENDPOINT;

  const getProductsFromAPI = async () => {
    try {
      const response = await axios.get(API_GET_ALL_PRODUCT);

      Toast("dashboard_info", "success", "Lấy thông tin thành công");
      setData(response.data);
      console.log("Product: ", response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    Toast("dashboard_info", "info", "Đang lấy thông tin...");
    getProductsFromAPI();
    console.log(data);
  }, []);

  return (
    <>
      <Sidebar />
      <div className="p-4 md:p-5 min-h-[410px] flex flex-col bg-white border shadow-sm rounded-xl dark:bg-gray-800 dark:border-gray-700 gap-y-4">
        <div className="w-full lg:ps-64">
          <div className="mt-10"></div>
          {data !== undefined ? (
            <div className="flex flex-col">
              <div className="-m-1.5 overflow-x-auto">
                <div className="p-1.5 mt-5  min-w-full inline-block align-middle">
                  <ProductTable data={data} />
                </div>
              </div>
            </div>
          ) : (
            <EmptyState />
          )}
        </div>
      </div>
    </>
  );
}

export default ProductManagement;

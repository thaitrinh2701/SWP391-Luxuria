import { Table, EmptyState } from "@components";
import { DASHBOARD_TABLE_HEADERS } from "@utils/constant";
import Sidebar from "../Sidebar";
import { useCallback, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { getDashboardDatas } from "@/services";
import { Toast } from "@/components";
import { Button } from "@mui/material";
import axios from "axios";
import UserTable from "./Table";

function UserManagement() {
  const [data, setData] = useState();

  // const [cookies] = useCookies(["token"]);
  const [cookies] = useCookies(["user", "token"]);

  const API_GET_ALL_USER = import.meta.env.VITE_API_GET_ALL_USER_ENDPOINT;

  const getUserFromAPI = async () => {
    try {
      const response = await axios.get(API_GET_ALL_USER, {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
      });

      const filteredData = response.data.filter(
        (user) => user.id !== cookies.user.id
      );

      setData(filteredData);
      Toast(
        "dashboard_info",
        "success",
        "Lấy thông tin người dùng thành công!"
      );
      console.log("User List:", response.data);
    } catch (error) {
      console.error("Error fetching user list:", error);
    }
  };

  useEffect(() => {
    Toast("dashboard_info", "info", "Đang lấy thông tin...");
    getUserFromAPI();
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
                  <UserTable data={data} />
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

export default UserManagement;

/* eslint-disable no-unused-vars */
import { useCookies } from "react-cookie";
import { Button, Divider } from "antd";
import { Sidebar } from "@components";
import { USER_ROLES } from "@utils/constant";
import { Link, useNavigate } from "react-router-dom";
import { Toast } from "@/components";
import { useState } from "react";

function MyProfile() {
  const [cookies] = useCookies(["user, token"]);
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  if (!cookies.user.id) {
    Toast("login_err", "error", "Vui lòng đăng nhập để chỉnh sửa đơn!");
    setIsLoggedIn(false);
    navigate("/login");
  }
  return (
    <div>
      {isLoggedIn && (
        <div className="grid grid-cols-1 md:grid-cols-[auto,1fr] gap-10">
          <Sidebar />
          <div className="px-10 py-6 bg-white flex flex-col mt-24 w-3/5 dark:bg-[#111827] min-[320px]:w-full">
            <h1 className="text-3xl font-bold mb-4 text-[#434343] dark:text-white">
              HỒ SƠ CỦA TÔI
            </h1>
            <h4 className="text-gray-600 text-lg mb-4 dark:text-white">
              Quản lý thông tin hồ sơ để bảo mật tài khoản
            </h4>
            <Divider className="dark:bg-white" />
            <div className="my-4">
              <p className="text-lg font-semibold dark:text-white">
                Tên: {cookies.user?.full_name}
              </p>
              <p className="text-lg font-semibold dark:text-white">
                Email: {cookies.user?.email}
              </p>
              <p className="text-lg font-semibold dark:text-white">
                Số điện thoại: {cookies.user?.phone_number}
              </p>
            </div>
            <div className="flex gap-3">
              <Link to="/my-profile/sua-ho-so">
                <Button className="max-w-min" type="primary">
                  Chỉnh sửa
                </Button>
              </Link>
              <Link to="/my-profile/doi-mat-khau">
                <Button className="max-w-min" type="primary">
                  Đổi mật khẩu
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyProfile;

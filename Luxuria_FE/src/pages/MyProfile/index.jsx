/* eslint-disable no-unused-vars */
import { useCookies } from "react-cookie";
import { Button, Divider } from "antd";
import { Sidebar } from "@components";
import { Link, useNavigate } from "react-router-dom";
import { Toast } from "@/components";
import { useState } from "react";

function MyProfile() {
  const [cookies] = useCookies(["user", "token"]);
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  if (!cookies.user?.id) {
    Toast("login_err", "error", "Vui lòng đăng nhập để chỉnh sửa đơn!");
    setIsLoggedIn(false);
    navigate("/login");
  }

  return (
    <div className="flex">
      <Sidebar />
      {isLoggedIn && (
        <div className="flex-1 flex items-center justify-center min-h-screen bg-gray-100 dark:bg-[#111827] px-4 py-6">
          <div className="bg-white shadow overflow-hidden sm:rounded-lg px-6 py-6 sm:px-8 dark:bg-[#111827] w-full max-w-4xl">
            <div className="px-6 py-4 sm:px-8">
              <h1 className="text-2xl lg:text-3xl font-bold xl:text-4xl text-gray-900 dark:text-white uppercase">
                Hồ sơ của tôi
              </h1>
              <p className="mt-2 text-lg text-gray-600 dark:text-gray-200">
                Quản lý thông tin hồ sơ để bảo mật tài khoản
              </p>
            </div>
            <Divider className="dark:bg-white" />
            <div className="border-t border-gray-200">
              <dl>
                <div className="bg-gray-50 px-6 py-4 sm:grid sm:grid-cols-3 sm:gap-6 sm:px-8">
                  <dt className="text-base font-semibold text-gray-500 dark:text-gray-400">
                    Họ và tên
                  </dt>
                  <dd className="mt-1 text-base font-medium text-gray-900 sm:mt-0 sm:col-span-2 dark:text-white">
                    {cookies.user?.full_name}
                  </dd>
                </div>
                <div className="bg-white px-6 py-4 sm:grid sm:grid-cols-3 sm:gap-6 sm:px-8">
                  <dt className="text-base font-semibold text-gray-500 dark:text-gray-400">
                    Email
                  </dt>
                  <dd className="mt-1 text-base font-medium text-gray-900 sm:mt-0 sm:col-span-2 dark:text-white">
                    {cookies.user?.email.replace(
                      /(\w{3})[\w.-]+(\w{3}@[a-z]+\.[a-z.]+)/,
                      "$1******$2"
                    )}
                  </dd>
                </div>
                <div className="bg-gray-50 px-6 py-4 sm:grid sm:grid-cols-3 sm:gap-6 sm:px-8">
                  <dt className="text-base font-semibold text-gray-500 dark:text-gray-400">
                    Số điện thoại
                  </dt>
                  <dd className="mt-1 text-base font-medium text-gray-900 sm:mt-0 sm:col-span-2 dark:text-white">
                    {cookies.user?.phone_number.replace(
                      /(\d{3})\d{4,5}(\d{3})/,
                      "$1****$2"
                    )}
                  </dd>
                </div>
                <div className="bg-gray-50 px-6 py-4 sm:grid sm:grid-cols-3 sm:gap-6 sm:px-8">
                  <dt className="text-base font-semibold text-gray-500 dark:text-gray-400">
                    Mật khẩu
                  </dt>
                  <dd className="mt-1 text-base font-medium text-gray-900 sm:mt-0 sm:col-span-2 dark:text-white">
                    ************
                  </dd>
                </div>
              </dl>
            </div>
            <div className="flex gap-4 mt-6">
              <Link to="/my-profile/sua-ho-so">
                <Button className="max-w-min" type="primary" size="large">
                  Chỉnh sửa
                </Button>
              </Link>
              <Link to="/my-profile/doi-mat-khau">
                <Button className="max-w-min" type="primary" size="large">
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

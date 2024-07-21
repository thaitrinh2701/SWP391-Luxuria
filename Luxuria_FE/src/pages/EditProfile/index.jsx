import React, { useEffect } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Input, Sidebar, Toast } from "@/components";
import { EDIT_PROFILE_FORMAT } from "@/utils/constant";
import { Button, Divider } from "antd";

const EditProfile = () => {
  const API_EDIT_PROFILE = import.meta.env.VITE_API_EDIT_PROFILE_ENDPOINT;
  const API_GET_PROFILE = import.meta.env.VITE_API_GET_PROFILE_ENDPOINT;
  const [cookies] = useCookies(["user", "token"]);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors, isValid, isSubmitted },
  } = useForm({
    defaultValues: {
      email: "",
      login_password: "",
      keepLogin: false,
    },
  });

  useEffect(() => {
    const fetchProfileData = async () => {
      const userId = cookies.user.id;

      if (!userId) {
        Toast("login_err", "error", "Vui lòng đăng nhập để chỉnh sửa đơn!");
        navigate("/login");
        return;
      }

      try {
        setValue("fullname", cookies.user.full_name);
        setValue("phone", cookies.user.phone_number);
      } catch (error) {
        console.error("Error fetching profile data:", error);
        Toast("connect_err", "error", "Lỗi kết nối tới máy chủ!");
      }
    };

    fetchProfileData();
  }, [cookies, navigate, setValue]);

  const onSubmit = async (data) => {
    const userId = cookies.user?.id;

    if (!userId) {
      Toast("login_err", "error", "Vui lòng đăng nhập để chỉnh sửa đơn!");
      navigate("/login");
      return;
    }

    const requestData = {
      full_name: data.fullname,
      phone_number: data.phone,
    };

    try {
      const response = await axios.put(
        `${API_EDIT_PROFILE}/${userId}`,
        requestData,
        {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
        }
      );

      Toast("processing", "info", "Đang xử lý đơn...");

      if (response.status === 200) {
        Toast("edit_profile_success", "success", "Chỉnh sửa hồ sơ thành công!");
        navigate("/my-profile");
      } else {
        Toast("edit_profile_err", "error", "Chỉnh sửa hồ sơ thất bại!");
      }
    } catch (error) {
      console.error("Error:", error);

      if (error.response) {
        if (error.response.status === 400) {
          Toast("send_err", "error", "Dữ liệu gửi đi không hợp lệ!");
        } else if (error.response.status === 403) {
          Toast("send_err", "error", "Bạn không có quyền truy cập!");
        } else {
          Toast("send_err", "error", "Lỗi gửi tới máy chủ!");
        }
      } else {
        Toast("connect_err", "error", "Lỗi kết nối tới máy chủ!");
      }
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-[auto,1fr] gap-10">
      <Sidebar />
      <div className="px-10 py-6 bg-white flex flex-col mt-24 w-3/5 dark:bg-[#111827] min-[320px]:w-full">
        <h1 className="text-3xl font-bold mb-4 text-[#434343] dark:text-white">
          Sửa hồ sơ
        </h1>
        <h4 className="text-gray-600 text-lg mb-4 dark:text-white">
          Chỉnh sửa thông tin trong hồ sơ
        </h4>
        <Divider className="dark:bg-white" />
        <div className="my-4 max-w-xl">
          <form onSubmit={handleSubmit(onSubmit)}>
            {EDIT_PROFILE_FORMAT.map((item) => (
              <div
                className={`col-span-full h-24 ${
                  item.isFullWidth ? "" : "sm:col-span-4"
                }`}
                key={item.id}
              >
                <Input
                  id={item.id}
                  label={item.label}
                  isRequired={item.isRequired}
                  placeholder={item.placeholder}
                  isError={errors[item.id]}
                  msg={item.validMsg}
                  type={item.type}
                  isSubmitted={isSubmitted}
                  aria-invalid={errors[item.id] ? "true" : "false"}
                  inputMode={item.inputMode}
                  {...register(item.id, {
                    required: item.rules.required || false,
                    pattern: {
                      value: item.rules.pattern?.value || /\S/,
                      message: item.rules.pattern?.message || "Không hợp lệ",
                    },
                    minLength: { value: item.rules.minLength?.value || 1 },
                    maxLength: { value: item.rules.maxLength?.value || 50 },
                  })}
                />
              </div>
            ))}
            <button className="inline-flex items-center justify-center shrink-0 rounded-md border border-blue-600 bg-blue-600 py-2 px-6 text-lg font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500 dark:hover:bg-blue-700 dark:hover:text-white">
              Xác nhận
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;

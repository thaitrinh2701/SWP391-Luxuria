import { Input, Sidebar, Toast } from "@/components";
import { CHANGE_PASSWORD_FORMAT } from "@/utils/constant";
import { Divider } from "antd";
import { data } from "autoprefixer";
import axios from "axios";
import React from "react";
import { useCookies } from "react-cookie";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
  const [cookies] = useCookies(["user, token"]);
  const navigate = useNavigate();
  const {
    register,
    trigger,
    getValues,
    handleSubmit,
    setError,
    formState: { errors, isValid, isSubmitted, touchedFields },
  } = useForm({
    defaultValues: {
      full_name: "",
      email: "",
      phone_number: "",
      address: "",
      password: "",
      confirm_password: "",
      accept: false,
    },
  });
  const API_CHANGE_PASSWORD = import.meta.env.VITE_API_CHANGE_PASSWORD_ENDPOINT;
  const onSubmit = async (data) => {
    const requestData = {
      new_password: data.password,
    };
    try {
      const response = await axios.put(API_CHANGE_PASSWORD, requestData, {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
      });
      console.log("Response: ", response);
      if (response.status === 200) {
        Toast("reset_password_success", "success", "Đổi mật khẩu thành công!");
        navigate("/my-profile");
      } else {
        Toast("reset_password_err", "error", "Đổi mật khẩu thất bại!");
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
  return (
    <div className="grid grid-cols-1 md:grid-cols-[auto,1fr] gap-10">
      <Sidebar />
      <div className="px-10 py-6 bg-white flex flex-col mt-24 w-3/5 dark:bg-[#111827] min-[320px]:w-full">
        <h1 className="text-3xl font-bold mb-4 text-[#434343] dark:text-white">
          Đổi mật khẩu
        </h1>
        <h4 className="text-gray-600 text-lg mb-4 dark:text-white">
          Vui lòng nhập mật khẩu mới của bạn.
        </h4>
        <Divider className="dark:bg-white" />
        <div className="my-4 max-w-xl">
          <form onSubmit={handleSubmit(onSubmit)}>
            {CHANGE_PASSWORD_FORMAT.map((item) => (
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
                    validate: (value) => {
                      if (item.id === "confirm_password") {
                        return (
                          (value === getValues("password") && value != "") ||
                          item.rules.validate
                        );
                      }
                    },
                    onChange: async () => {
                      if (
                        item.id === "password" &&
                        touchedFields[item.rules.validate]
                      ) {
                        await trigger(item.rules.validate); //* manually trigger validation for edge case: confirm password -> password
                      }
                    },
                  })}
                />
              </div>
            ))}
            <button className="inline-flex items-center justify-center shrink-0 rounded-md border border-blue-600 bg-blue-600 py-2 px-6 text-lg font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500 dark:hover:bg-blue-700 dark:hover:text-white">
              Đổi mật khẩu
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;

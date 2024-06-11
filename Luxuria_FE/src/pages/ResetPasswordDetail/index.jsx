import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { HSStaticMethods } from "preline";
import { Toast } from "@components";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

function ResetPasswordDetail() {
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");

  const API_RESET_PASSWORD = import.meta.env.VITE_API_RESET_PASSWORD_ENDPOINT;

  useEffect(() => {
    // You can use the email parameter as needed
    console.log("Email:", email);
  }, [email]);

  useEffect(() => {
    setTimeout(() => {
      HSStaticMethods.autoInit();
    }, 100);
  }, []);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const password = watch("password");

  const onSubmit = async (data) => {
    try {
      console.log("Sending request to: ", `${API_RESET_PASSWORD}${email}`);
      console.log("Headers: ", {
        newPassword: password,
        // Authorization: `Bearer ${cookies.token}`, // Uncomment nếu cần token xác thực
      });
      const response = await axios.put(`${API_RESET_PASSWORD}${email}`, null, {
        headers: {
          newPassword: password,
        },
      });
      console.log("Response: ", response);
      if (response.status === 200) {
        Toast("reset_password_success", "success", "Đổi mật khẩu thành công!");
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
    <div className="mt-[10%] w-full max-w-md sm:max-w-lg lg:max-w-2xl mx-auto bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-neutral-900 dark:border-neutral-700 min-[320px]:my-auto">
      <div className="p-4 sm:p-7">
        <div className="mt-5">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-5">
              <h1 className="font-bold text-xl">Đổi mật khẩu</h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Vui lòng nhập mật khẩu mới của bạn.
              </p>
            </div>

            <div className="grid gap-y-4">
              {/* Mật khẩu */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm mb-2 dark:text-white"
                >
                  Mật khẩu
                </label>
                <div className="relative">
                  <input
                    type="password"
                    id="password"
                    {...register("password", {
                      required: "Mật khẩu là bắt buộc",
                      minLength: {
                        value: 8,
                        message: "Yêu cầu 8 ký tự trở lên",
                      },
                    })}
                    className={`py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600 ${
                      errors.password ? "border-red-500" : ""
                    }`}
                    aria-describedby="password-error"
                  />
                  {errors.password && (
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <svg
                        className="w-5 h-5 text-red-500"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                        aria-hidden="true"
                      >
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                      </svg>
                    </div>
                  )}
                </div>
                {errors.password && (
                  <p className="text-xs text-red-600 mt-2" id="password-error">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Xác nhận mật khẩu */}
              <div>
                <label
                  htmlFor="confirm-password"
                  className="block text-sm mb-2 dark:text-white"
                >
                  Xác nhận mật khẩu
                </label>
                <div className="relative">
                  <input
                    type="password"
                    id="confirm-password"
                    {...register("confirmPassword", {
                      required: "Xác nhận mật khẩu là bắt buộc",
                      validate: (value) =>
                        value === password || "Mật khẩu không khớp",
                    })}
                    className={`py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600 ${
                      errors.confirmPassword ? "border-red-500" : ""
                    }`}
                    aria-describedby="confirm-password-error"
                  />
                  {errors.confirmPassword && (
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <svg
                        className="w-5 h-5 text-red-500"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                        aria-hidden="true"
                      >
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                      </svg>
                    </div>
                  )}
                </div>
                {errors.confirmPassword && (
                  <p
                    className="text-xs text-red-600 mt-2"
                    id="confirm-password-error"
                  >
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
              >
                Gửi
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ResetPasswordDetail;

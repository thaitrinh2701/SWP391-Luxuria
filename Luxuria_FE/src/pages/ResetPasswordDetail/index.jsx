import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { HSStaticMethods } from "preline";
import { Toast } from "@components";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { Input } from "@/components";
import { CHANGE_PASSWORD_FORMAT } from "@/utils/constant";

function ResetPasswordDetail() {
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");
  const navigate = useNavigate();

  const API_RESET_PASSWORD = import.meta.env.VITE_API_RESET_PASSWORD_ENDPOINT;

  useEffect(() => {
    console.log("Email:", email);
  }, [email]);

  useEffect(() => {
    setTimeout(() => {
      HSStaticMethods.autoInit();
    }, 100);
  }, []);

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

  const onSubmit = async (data) => {
    try {
      const response = await axios.put(`${API_RESET_PASSWORD}${email}`, null, {
        headers: {
          newPassword: data.password,
        },
      });
      console.log("Response: ", response);
      if (response.status === 200) {
        Toast("reset_password_success", "success", "Đổi mật khẩu thành công!");
        navigate("/login");
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
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ResetPasswordDetail;

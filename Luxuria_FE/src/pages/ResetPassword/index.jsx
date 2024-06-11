import { HSStaticMethods } from "preline";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Input, Toast } from "@components";
import axios from "axios";

function ResetPassword() {
  const API_FORGOT_PASSWORD = import.meta.env.VITE_API_FORGOT_PASSWORD_ENDPOINT;

  useEffect(() => {
    setTimeout(() => {
      HSStaticMethods.autoInit();
    }, 100);
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitted },
  } = useForm({
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data) => {
    const requestData = {
      email: data.email,
    };

    try {
      const response = await axios.post(API_FORGOT_PASSWORD, requestData);
      console.log("Response:", response);
      if (response.status === 200) {
        Toast(
          "forgot_password_success",
          "success",
          "Vui lòng kiểm tra mail để đặt lại mật khẩu!"
        );
      } else {
        Toast(
          "forgot_password_err",
          "error",
          "Đã có lỗi xảy ra, vui lòng thử lại!"
        );
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
    <div className="my-auto w-full mx-auto max-w-xl lg:max-w-2xl bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-gray-900 dark:border-gray-700">
      <div className="p-4 sm:p-7">
        <div className="mx-auto max-w-lg text-center">
          <h1 className="text-2xl font-bold sm:text-3xl text-gray-900 dark:text-white">
            Đặt lại mật khẩu
          </h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-neutral-400">
            {"Bạn nhớ mật khẩu đăng nhập? "}
            <Link
              className="text-blue-600 decoration-[1.5px] hover:underline underline-offset-2 font-medium dark:text-blue-500"
              to="/login"
            >
              Đăng nhập
            </Link>
            {" ngay!"}
          </p>
        </div>

        <div className="mt-5">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-y-4">
              <Input
                id={"email"}
                label={"Email đăng ký"}
                isRequired={true}
                placeholder={"Nhập email đăng ký"}
                isError={errors.email}
                msg={"Email hợp lệ"}
                type={"text"}
                isSubmitted={isSubmitted}
                aria-invalid={errors.email ? "true" : "false"}
                inputMode={"email"}
                {...register("email", {
                  required: "Email không được để trống",
                  pattern: {
                    value:
                      /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i,
                    message: "Email không hợp lệ",
                  },
                  minLength: { value: 1 },
                })}
              />

              <button
                type="submit"
                className="w-full py-2 px-4 inline-flex justify-center items-center gap-x-2 font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
              >
                Đặt lại mật khẩu
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { Input, Checkbox, Toast } from "@components";
import { SIGNUP_FORMAT } from "@utils/constant";
import { postSignup } from "@services";
import { HSTooltip, HSStaticMethods } from "preline";

function Signup() {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      HSStaticMethods.autoInit();
      HSTooltip.autoInit();
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
    if (isValid) {
      Toast("signup_info", "info", "Đang xử lý đăng ký...");
      let response = await postSignup(data);

      switch (response.success) {
        case false:
          switch (response.data) {
            case null:
              Toast("signup_err", "error", response.message);
              break;
            default:
              Toast("signup_warn", "warning", response.message);
              setError("email", {
                type: "required",
                message: response.data,
              });
              break;
          }
          break;
        case true:
          Toast("signup_success", "success", response.message);
          navigate("/login");
          break;
      }
    }
  };

  return (
    <section className="lg:grid lg:min-h-screen lg:grid-cols-12 mt-[4.5rem]">
      <aside className="relative block h-16 lg:order-first lg:col-span-5 xl:col-span-7 lg:h-full">
        <img
          alt="cover"
          src="https://images.unsplash.com/photo-1617195737496-bc30194e3a19?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
          className="absolute inset-0 h-full w-full object-cover object-center bg-center bg-no-repeat"
        />
      </aside>

      <main className="flex items-center justify-center px-8 lg:px-10 xl:px-12 py-8 lg:col-span-7 xl:col-span-5">
        <div className="max-w-lg lg:max-w-xl w-full">
          <div className="mx-auto max-w-lg text-center">
            <h1 className="text-2xl font-bold sm:text-3xl text-gray-900 dark:text-white">
              Đăng ký
            </h1>

            <p className="mt-2 text-sm text-gray-500 dark:text-gray-200">
              Tạo tài khoản mới để bắt đầu mua sắm ngay hôm nay
            </p>
          </div>
          <div className="my-5">
            <div className="py-3 flex items-center text-xs text-gray-500 dark:text-gray-300 uppercase before:flex-1 before:border-t before:border-gray-300 before:me-6 after:flex-1 after:border-t after:border-gray-300 after:ms-6 dark:before:border-gray-600 dark:after:border-gray-600">
              Hoặc
            </div>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="mt-1 grid grid-cols-8 auto-rows-auto gap-x-6"
            >
              {SIGNUP_FORMAT.map((item) => (
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
                    msg={errors[item.id] ? item.validMsg : ""}
                    type={item.type}
                    isSubmitted={isSubmitted}
                    aria-invalid={errors[item.id] ? "true" : "false"}
                    inputMode={item.inputMode}
                    {...register(item.id, {
                      required: item.rules.required,
                      pattern: item.rules.pattern,
                      minLength: item.rules.minLength,
                      maxLength: item.rules.maxLength,
                      validate: (value) => {
                        if (item.id === "confirm_password") {
                          return (
                            value === getValues("password") ||
                            "Mật khẩu xác nhận không khớp"
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

              {/* Checkbox */}
              <div className="col-span-full flex flex-col">
                <Checkbox
                  id={"accept"}
                  isRequired={true}
                  isError={errors.accept}
                  msg={errors.accept?.message}
                  aria-invalid={errors.accept ? "true" : "false"}
                  {...register("accept", {
                    required:
                      "Vui lòng đồng ý với điều khoản sử dụng và chính sách bảo mật",
                  })}
                >
                  <span>
                    {"Bằng việc tạo tài khoản, bạn đã đồng ý với các "}
                    <Link
                      to="/statement"
                      className="text-gray-700 underline underline-offset-1 dark:text-gray-200 hover:text-blue-600"
                    >
                      Điều kiện & Điều khoản sử dụng
                    </Link>
                    {" và "}
                    <Link
                      to="/privacy-policy"
                      className="text-gray-700 underline underline-offset-1 dark:text-gray-200 hover:text-blue-600"
                    >
                      Chính sách bảo mật thông tin
                    </Link>
                    {" của chúng tôi"}
                  </span>
                </Checkbox>
              </div>

              <div className="col-start-3 col-span-4 flex flex-col items-center sm:gap-y-4 mt-4">
                <button className="inline-flex items-center justify-center shrink-0 rounded-md border border-blue-600 bg-blue-600 py-2 px-6 text-lg font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500 dark:hover:bg-blue-700 dark:hover:text-white">
                  Tạo tài khoản
                </button>

                <p className="text-sm text-gray-500 sm:mt-0 dark:text-gray-400">
                  {"Bạn đã có tài khoản? "}
                  <Link
                    to="/login"
                    className="text-blue-600 decoration-[1.5px] hover:underline underline-offset-2 font-medium dark:text-blue-500"
                  >
                    Đăng nhập
                  </Link>

                  {" ngay!"}
                </p>
              </div>
            </form>
          </div>
        </div>
      </main>
    </section>
  );
}

export default Signup;

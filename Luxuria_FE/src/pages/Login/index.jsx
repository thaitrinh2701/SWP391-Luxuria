import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useCookies } from "react-cookie";
import { Input, Checkbox, Toast } from "@components";
import { MainContext } from "@hooks";
import { LOGIN_FORMAT, USER_ROLES } from "@utils/constant";
import { postLogin } from "@services";
import { HSStaticMethods } from "preline";

function Login() {
  useEffect(() => {
    setTimeout(() => {
      HSStaticMethods.autoInit();
    }, 100);
  }, []);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.form?.pathname || "/";
  const { setData } = useContext(MainContext);
  const [cookies, setCookie] = useCookies(["user", "token"]);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid, isSubmitted },
  } = useForm({
    defaultValues: {
      email: "",
      login_password: "",
      keepLogin: false,
    },
  });

  const onSubmit = async (data) => {
    if (isValid) {
      Toast("login_info", "info", "Đang xử lý đăng nhập...");
      console.log(data);

      let response = await postLogin(data);

      switch (response.success) {
        case false:
          switch (response.data) {
            case null:
              Toast("login_err", "error", response.message);
              break;
            default:
              Toast("login_warn", "warning", response.message);
              setError("email", {
                type: "required",
                message: response.data,
              });
              setError("login_password", {
                type: "required",
                message: response.data,
              });
              break;
          }
          break;
        case true:
          Toast("login_success", "success", response.message);
          setCookie(
            "user",
            {
              isLogin: true,
              id: response.data?.userResponse?.id,
              full_name: response.data?.userResponse?.full_name,
              email: response.data?.userResponse?.email,
              phone_number: response.data?.userResponse?.phone_number,
              isKeepLogin: data.isKeepLogin,
            },
            { sameSite: "strict", path: "/" }
          );
          setCookie("token", response.data?.token, {
            sameSite: "strict",
            path: "/",
          });
          setData({ isLogin: true });
          switch (response.data.userResponse?.role_id) {
            case USER_ROLES.ADMIN:
              navigate("/dashboard", { replace: true });
              break;
            case USER_ROLES.SALE_STAFF:
              navigate("/my-profile", { replace: true });
              break;
            case USER_ROLES.MANAGER:
              navigate("/yeu-cau", { replace: true });
              break;
            case USER_ROLES.DESIGN_STAFF:
              navigate("/my-profile", { replace: true });
              break;
            case USER_ROLES.PRODUCTION_STAFF:
              navigate("/my-profile", { replace: true });
              break;
            default:
              navigate(from, { replace: true });
              break;
          }
          break;
      }
    }
  };

  return (
    <section className="lg:grid lg:h-full lg:grid-cols-12 mt-[4.5rem]">
      <aside className="relative block h-16 lg:order-first lg:col-span-5 xl:col-span-7 lg:h-full min-[320px]:mb-[50%] :">
        <img
          alt="cover"
          src="https://static.vecteezy.com/system/resources/previews/022/899/918/non_2x/jewelry-ring-with-diamonds-and-precious-stones-ai-generated-free-photo.jpg"
          className="absolute inset-0 w-full object-cover object-center bg-center bg-no-repeat"
        />
      </aside>

      <main className="flex items-center justify-center px-8 lg:px-10 xl:px-12 py-8 lg:col-span-7 xl:col-span-5">
        <div className="max-w-lg lg:max-w-xl w-full">
          <div className="mx-auto max-w-lg text-center">
            <h1 className="text-2xl font-bold sm:text-3xl text-gray-900 dark:text-white">
              Đăng nhập
            </h1>

            <p className="mt-2 text-sm text-gray-600 dark:text-gray-200">
              {"Bạn chưa có tài khoản? "}
              <Link
                className="text-blue-600 decoration-[1.5px] hover:underline underline-offset-2 font-medium dark:text-blue-500"
                to="/signup"
              >
                Đăng ký
              </Link>
              {" ngay!"}
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
              {LOGIN_FORMAT.map((item) => (
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
                    isResetable={item.isResetable || false}
                    aria-invalid={errors[item.id] ? "true" : "false"}
                    inputMode={item.inputMode}
                    {...register(item.id, {
                      required: item.rules.required || false,
                      pattern: {
                        value: item.rules.pattern?.value || /\S/,
                        message: item.rules.pattern?.message || "Không hợp lệ",
                      },
                      minLength: { value: item.rules.minLength?.value || 1 },
                    })}
                  />
                </div>
              ))}
              {/* Checkbox */}
              <div className="col-span-full flex flex-col">
                <Checkbox id={"remember"} isRequired={false}>
                  <span>Ghi nhớ đăng nhập</span>
                </Checkbox>
              </div>

              <div className="col-start-3 col-span-4 flex flex-col items-center sm:gap-y-4 mt-4">
                <button className="inline-flex items-center justify-center shrink-0 rounded-md border border-blue-600 bg-blue-600 py-2 px-6 text-lg font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500 dark:hover:bg-blue-700 dark:hover:text-white">
                  Đăng nhập
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </section>
  );
}

export default Login;

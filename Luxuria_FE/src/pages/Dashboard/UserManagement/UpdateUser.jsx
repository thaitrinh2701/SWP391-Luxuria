import { useEffect } from "react";
import { useForm } from "react-hook-form";
import Sidebar from "../Sidebar";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Toast } from "@/components";
import { UPDATE_USER_FORMAT } from "@/utils/constant";

function UpdateUser() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const location = useLocation();
  const item = location.state.item;
  const [cookies] = useCookies(["user", "token"]);
  const { id } = useParams();
  const navigate = useNavigate();
  console.log("Item: ", item);

  const API_UPDATE_USER = import.meta.env.VITE_API_UPDATE_USER_ENDPOINT;

  useEffect(() => {
    if (item) {
      setValue("fullname", item.fullName);
      setValue("phone", item.phoneNumber);
      setValue("role_id", item.role.id);
      setValue("password", item.password);
    }
  }, [item, setValue]);

  const onSubmit = async (data) => {
    const userData = {
      full_name: data.fullname,
      phone_number: data.phone,
      role_id: data.role_id,
      password: data.password,
    };

    try {
      const response = await axios.put(`${API_UPDATE_USER}/${id}`, userData, {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
      });
      console.log("Update User: ", response.data);

      Toast("submit_success", "success", "Cập nhật người dùng thành công");
      navigate("/quan-ly-tai-khoan");
    } catch (error) {
      Toast("submit_err", "error", "Cập nhật người dùng thất bại");
      console.error("Error updating user: ", error);
    }
  };

  return (
    <>
      <Sidebar />
      <div className="md:p-5 mt-28 min-h-[410px] flex flex-col bg-white border shadow-sm dark:bg-[#111827] dark:border-gray-700 gap-y-4">
        <div className="w-full lg:ps-64">
          <h1 className="text-2xl font-semibold dark:text-white">
            Cập nhật người dùng
          </h1>
          <h2 className="text-lg text-gray-500 dark:text-gray-300">
            Mã người dùng: {id}
          </h2>
          <hr className="my-4" />

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-8">
            {UPDATE_USER_FORMAT.map((item) => (
              <div key={item.id}>
                <label
                  htmlFor={item.id}
                  className="font-medium dark:text-white"
                >
                  {item.label}
                  {item.rules.required && (
                    <span className="text-red-500 ml-1">*</span>
                  )}
                </label>
                {item.type === "select" ? (
                  <select
                    id={item.id}
                    name={item.name}
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    {...register(item.id, {
                      required: item.rules.required || false,
                    })}
                  >
                    {item.options.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={item.type}
                    id={item.id}
                    name={item.name}
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    {...register(item.id, {
                      required: item.rules.required || false,
                      pattern: item.rules.pattern
                        ? {
                            value: item.rules.pattern.value,
                            message: item.rules.pattern.message,
                          }
                        : undefined,
                      minLength: item.rules.minLength
                        ? {
                            value: item.rules.minLength.value,
                            message: `Độ dài tối thiểu là ${item.rules.minLength.value}`,
                          }
                        : undefined,
                    })}
                  />
                )}
                {errors[item.id] && (
                  <span className="text-red-600 block mt-1">
                    {errors[item.id].message}
                  </span>
                )}
              </div>
            ))}
            <button
              type="submit"
              className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800"
            >
              Cập nhật người dùng
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default UpdateUser;

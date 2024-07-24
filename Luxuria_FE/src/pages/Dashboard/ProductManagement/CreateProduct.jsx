import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Sidebar from "../Sidebar";
import UploadPics from "@/components/Upload";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { Toast } from "@/components";
import { ADMIN_DETAIL_FORMAT } from "@/utils/constant";

function CreateProduct() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [cookies] = useCookies(["user", "token"]);
  const navigate = useNavigate();
  const API_CREATE_PRODUCT = import.meta.env.VITE_API_CREATE_PRODUCT_ENDPOINT;
  const API_UPLOAD_IMAGES = import.meta.env
    .VITE_API_UPDATE_IMAGE_PRODUCT_ENDPOINT; // Your image upload endpoint

  const [images, setImages] = useState([]);

  const onSubmit = async (data) => {
    try {
      // Step 1: Send product data as JSON
      const productResponse = await axios.post(
        API_CREATE_PRODUCT,
        {
          name: data.name,
          category_id: data.category_id,
          size: data.size,
          gold_id: data.gold_id,
          gold_price: 0,
          gold_weight: 0,
          gem_id: data.gem_id,
          gem_price: 0,
          manufacturing_fee: 0,
          total_price: 0,
          description: data.description,
          is_original: true,
        },
        {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
            "Content-Type": "application/json",
          },
        }
      );

      // Extract product ID from the response
      const { product_id } = productResponse.data;

      // Step 2: Upload images if there are any
      if (images.length > 0 && product_id) {
        const formData = new FormData();
        images.forEach((image) => {
          formData.append("files", image);
        });

        await axios.put(`${API_UPLOAD_IMAGES}/${product_id}`, formData, {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
            "Content-Type": "multipart/form-data",
          },
        });
      }

      Toast("submit_success", "success", "Tạo sản phẩm thành công");
      navigate("/quan-ly-san-pham");
    } catch (error) {
      Toast("submit_err", "error", "Tạo sản phẩm thất bại");
      console.error("Error submitting product: ", error);
    }
  };

  const handleImageChange = (images) => {
    const imageFiles = images.map((image) => image.originFileObj);
    setImages(imageFiles);
  };

  return (
    <>
      <Sidebar />
      <div className="md:p-5 mt-20 min-h-[410px] flex flex-col container max-w-7xl mx-auto dark:bg-[#111827] dark:border-gray-700 gap-y-4">
        <div className="w-full lg:ps-64">
          <h1 className="text-2xl font-semibold dark:text-white text-center md:text-left">
            Tạo sản phẩm
          </h1>
          <hr className="my-4" />

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4 mt-8 max-w-xs mx-auto md:max-w-full"
          >
            {ADMIN_DETAIL_FORMAT.map((item) => (
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
                    <option value="">{item.placeholder}</option>
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

            <div>
              <span className="font-semibold">Ảnh</span>
              <UploadPics onChange={handleImageChange} />
            </div>

            <div className="flex justify-center items-center">
              <button
                type="submit"
                className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800"
              >
                Tạo sản phẩm
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default CreateProduct;

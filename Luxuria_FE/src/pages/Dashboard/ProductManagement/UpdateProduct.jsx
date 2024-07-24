import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Sidebar from "../Sidebar";
import UploadPics from "@/components/Upload";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Toast } from "@/components";
import { ADMIN_DETAIL_FORMAT, ORDER_DETAIL_FORMAT } from "@/utils/constant";

function UpdateProduct() {
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
  const [formData, setFormData] = useState({
    images: [], // Initial state for images
  });
  console.log("Item: ", item);

  const API_UPDATE_PRODUCT = import.meta.env.VITE_API_UPDATE_PRODUCT_ENDPOINT;
  const API_UPDATE_PRODUCT_IMAGE = import.meta.env
    .VITE_API_UPDATE_IMAGE_PRODUCT_ENDPOINT;

  useEffect(() => {
    if (item) {
      setValue("name", item.product.name);
      setValue("category_id", item.product.category.id);
      setValue("size", item.product.size);
      setValue("gold_id", item.product.gold.id);
      setValue("gem_id", item.product.gem.id);
      setValue("description", item.product.description);
    }
  }, [item, setValue]);

  const onSubmit = async (data) => {
    const productData = {
      name: data.name,
      category_id: data.category_id,
      size: data.size,
      gold_id: data.gold_id,
      gem_id: data.gem_id,
      description: data.description,
      is_original: true,
    };

    try {
      // Step 1: Update product information
      const response = await axios.put(
        `${API_UPDATE_PRODUCT}/${id}`,
        productData,
        {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
        }
      );
      console.log("Update Product: ", response.data);

      // Step 2: Update product images
      const formDataImages = new FormData();
      formData.images.forEach((image, index) => {
        formDataImages.append("files", image); // Append each image to FormData
      });

      // Log FormData content
      for (let pair of formDataImages.entries()) {
        console.log(pair[0] + ", " + pair[1]);
      }

      const imageResponse = await axios.put(
        `${API_UPDATE_PRODUCT_IMAGE}/${id}`,
        formDataImages,
        {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Update Product Images: ", imageResponse.data);

      Toast("submit_success", "success", "Cập nhật sản phẩm thành công");
      navigate("/quan-ly-san-pham");
    } catch (error) {
      Toast("submit_err", "error", "Cập nhật sản phẩm thất bại");
      console.error("Error updating product: ", error);
    }
  };

  const handleImageChange = (images) => {
    const imageFiles = images.map((image) => image.originFileObj);

    setFormData((prevData) => ({
      ...prevData,
      images: imageFiles,
    }));
  };

  return (
    <>
      <Sidebar />
      <div className="md:p-5 min-h-[410px] container mx-auto my-auto flex flex-col gap-y-4">
        <div className="w-full lg:ps-64">
          <h1 className="text-2xl font-semibold dark:text-white">
            Cập nhật sản phẩm
          </h1>
          <h2 className="text-lg text-gray-500 dark:text-gray-300">
            Mã sản phẩm: {id}
          </h2>
          <hr className="my-4" />

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-8">
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
              <span className="font-semibold dark:text-white">Ảnh</span>{" "}
              <UploadPics onChange={handleImageChange} />
            </div>
            <button
              type="submit"
              className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800"
            >
              Cập nhật sản phẩm
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default UpdateProduct;

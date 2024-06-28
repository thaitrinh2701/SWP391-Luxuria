import { ORDER_DETAIL_FORMAT, SALESTAFF_CALCULATION } from "@/utils/constant";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Sidebar from "../Sidebar";
import UploadPics from "@/components/Upload";
import { Button } from "@mui/material";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { Input, Toast } from "@/components";

function CreateProduct() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [cookies] = useCookies(["user", "token"]);
  const navigate = useNavigate();
  const API_CREATE_PRODUCT = import.meta.env.VITE_API_CREATE_PRODUCT_ENDPOINT;
  const onSubmit = async (data) => {
    const requestData = {
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
    };

    try {
      const response = await axios.post(API_CREATE_PRODUCT, requestData, {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
      });
      console.log("Submit Product: ", response.data);
      Toast("submit_success", "success", "Tạo sản phẩm thành công");
      navigate("/quan-ly-san-pham");
    } catch (error) {
      Toast("submit_err", "error", "Tạo sản phẩm thất bại");
      console.error("Error submitting product: ", error);
    }
  };
  return (
    <>
      <Sidebar />
      <div className="md:p-5 mt-24 min-h-[410px] flex flex-col bg-white border shadow-sm dark:bg-gray-800 dark:border-gray-700 gap-y-4">
        <div className="w-full lg:ps-64">
          <h1 className="text-2xl font-semibold">Tạo sản phẩm</h1>
          <hr className="my-4" />

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-8">
            {ORDER_DETAIL_FORMAT.map((item) => (
              <div key={item.id}>
                <label htmlFor={item.id} className="font-medium">
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

            <button
              type="submit"
              className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800"
            >
              Tạo sản phẩm
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default CreateProduct;

import { useEffect, useState } from "react";
import { Table, Loader } from "@components";
import { DUMMY_GOLD_PRICE_DATA, GIAVANG_TABLE_HEADERS } from "@utils/constant";
import axios from "axios";
// import "./GiaVang.scss";

function GiaVang() {
  const [data, setData] = useState([]);

  async function getGoldPrice() {
    const API = import.meta.env.VITE_API_GOLDRATE_ENDPOINT;
    try {
      let result = await axios.get(API);
      console.log("Gold price: ", result.data.DataList.Data);
      setData(result.data.DataList.Data || []);
    } catch (e) {
      console.error(e);
      setData(DUMMY_GOLD_PRICE_DATA);
    }
  }

  useEffect(() => {
    getGoldPrice();
  }, []);

  return (
    <div className="flex flex-col mt-[4.5rem]">
      <div className="overflow-x-auto">
        <div className="p-1.5 min-w-full inline-flex items-center justify-center align-middle">
          <div className="w-3/5 bg-white border border-gray-200 shadow-sm overflow-hidden dark:bg-gray-800 dark:border-gray-700">
            <div className="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-b border-gray-200 dark:border-gray-700">
              <div>
                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                  Giá vàng hôm nay
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Tỉ suất giá vàng hôm nay
                </p>
              </div>
            </div>

            <Table
              isCheckbox={false}
              isEditable={false}
              headers={GIAVANG_TABLE_HEADERS}
            >
              {data.map((item, index) => {
                const dateKey = `@d_${item["@row"]}`;
                const karatKey = `@k_${item["@row"]}`;
                const nameKey = `@n_${item["@row"]}`;
                const buyPriceKey = `@pb_${item["@row"]}`;
                const sellPriceKey = `@ps_${item["@row"]}`;

                return (
                  <tr
                    key={index}
                    className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-800 dark:even:bg-gray-700"
                  >
                    <td className="size-px whitespace-nowrap w-16">
                      <div className="ps-4 py-3 text-start">
                        <span className="text-sm text-gray-600 dark:text-gray-300">
                          {item[dateKey]}
                        </span>
                      </div>
                    </td>
                    <td className="size-px whitespace-nowrap">
                      <div className="px-6 py-3 text-start">
                        <span className="text-sm text-gray-600 dark:text-gray-300">
                          {item[karatKey]}
                        </span>
                      </div>
                    </td>
                    <td className="size-px whitespace-nowrap">
                      <div className="px-6 py-3 text-start">
                        <span className="text-sm text-gray-600 dark:text-gray-300">
                          {item[nameKey]}
                        </span>
                      </div>
                    </td>
                    <td className="size-px whitespace-nowrap">
                      <div className="px-6 py-3 text-start">
                        <span className="text-sm text-gray-600 dark:text-gray-300">
                          {new Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          }).format(item[buyPriceKey])}
                        </span>
                      </div>
                    </td>
                    <td className="size-px whitespace-nowrap">
                      <div className="px-6 py-3 text-start">
                        <span className="text-sm text-gray-600 dark:text-gray-300">
                          {new Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          }).format(item[sellPriceKey])}
                        </span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GiaVang;

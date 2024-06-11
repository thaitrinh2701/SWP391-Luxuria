import { useEffect, useState } from "react";
import { Table, Loader } from "@components";
import { getGoldPrice } from "@services";
import { GIAVANG_TABLE_HEADERS } from "@utils/constant";
// import "./GiaVang.scss";

function GiaVang() {
  const [data, setData] = useState([]);
  useEffect(() => {
    (async () => {
      let result = await getGoldPrice();
      setData(result);
    })();
  }, []);

  return data.length > 0 ? (
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
                  Tỉ suất giá vàng SCJ hôm nay
                </p>
              </div>
            </div>

            <Table
              // data={data}
              isCheckbox={false}
              isEditable={false}
              headers={GIAVANG_TABLE_HEADERS}
            >
              {data.map((item, index) => (
                <tr
                  key={index}
                  className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-800 dark:even:bg-gray-700"
                >
                  <td className="size-px whitespace-nowrap w-16">
                    <div className="ps-4 py-3 text-start">
                      <span className="text-sm text-gray-600 dark:text-gray-300">
                        {new Date(
                          item.DATES || "01/01/1970"
                        ).toLocaleDateString("vi-VN", {
                          timeZone: "Asia/Ho_Chi_Minh",
                        })}
                      </span>
                    </div>
                  </td>
                  <td className="size-px whitespace-nowrap">
                    <div className="px-6 py-3 text-start">
                      <span className="text-sm text-gray-600 dark:text-gray-300">
                        {new Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(item.RATE_BUY)}
                      </span>
                    </div>
                  </td>
                  <td className="size-px whitespace-nowrap">
                    <div className="px-6 py-3 text-start">
                      <span className="text-sm text-gray-600 dark:text-gray-300">
                        {new Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(item.RATE_SELL)}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </Table>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Loader />
  );
}

export default GiaVang;

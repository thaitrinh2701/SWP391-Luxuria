import { useEffect, useState } from "react";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";
import { Popconfirm } from "antd";
import { Toast } from "@/components";
import axios from "axios";
import { useCookies } from "react-cookie";
import ReactPaginate from "react-paginate";
import "/css/Table.css";
import { convertConstraintName } from "@/services/getHelper";

function ProductData({ item }) {
  const API_DELETE_PRODUCT = import.meta.env.VITE_API_DELETE_PRODUCT_ENDPOINT;
  const [categoryName, setCategoryName] = useState("");

  const [cookies] = useCookies(["token"]);
  const navigate = useNavigate();

  const deleteProduct = async (id) => {
    console.log(id);
    try {
      const response = await axios.delete(`${API_DELETE_PRODUCT}/${id}`, {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
      });
      console.log("Delete Product: ", response.data);
      Toast("delete_success", "success", "Xóa sản phẩm thành công");
      window.location.reload();
    } catch (error) {
      console.error("Error deleting product: ", error);
      Toast("delete_err", "error", "Có lỗi khi xóa sản phẩm");
    }
  };
  const confirm = (e) => {
    console.log(e);
    deleteProduct(item.product.id);
  };
  const cancel = (e) => {
    console.log(e);
  };

  const handleClick = () => {
    navigate(`/cap-nhat-san-pham/${item.product.id}`, { state: { item } });
  };

  useEffect(() => {
    const updateConstraintName = async () => {
      const categoryName = item.product.category.name;
      if (categoryName) {
        const convertedName = await convertConstraintName(categoryName);
        setCategoryName(convertedName);
      }
    };
    updateConstraintName();
  }, [categoryName]);
  return (
    <>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">
        {item.product.id}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">
        {item.product.name}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">
        {categoryName}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">
        <div className="flex gap-3">
          <button
            className="dark:text-gray-400 text-gray-600 cursor-pointer"
            type="button"
            data-hs-overlay="#info-modal"
            onClick={handleClick}
          >
            <PencilSquareIcon
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </button>

          <Popconfirm
            title="Xóa sản phẩm"
            description="Bạn có muốn xóa sản phẩm này không?"
            onConfirm={confirm}
            onCancel={cancel}
            okText="Đồng ý"
            cancelText="Từ chối"
          >
            <button
              className="dark:text-gray-400 text-gray-600 cursor-pointer"
              type="button"
              data-hs-overlay="#info-modal"
            >
              <TrashIcon
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </button>
          </Popconfirm>
        </div>
      </td>
    </>
  );
}

function TableBody({ data }) {
  return (
    <>
      {data.map((item, index) => (
        <tr key={index}>
          <ProductData item={item} />
        </tr>
      ))}
    </>
  );
}

function ProductTable({ data }) {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  const offset = currentPage * itemsPerPage;
  const currentPageData = data.slice(offset, offset + itemsPerPage);

  return (
    <div className="flex flex-col">
      <div className="-m-1.5 overflow-x-auto">
        <div className="p-1.5 min-w-full inline-block align-middle">
          <div className="flex justify-start my-auto mb-3">
            <Link to="/tao-san-pham">
              <button className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800">
                Tạo sản phẩm
              </button>
            </Link>
          </div>
          <div className="border rounded-lg overflow-hidden dark:border-neutral-700">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
              <thead className="bg-gray-50 w-full dark:bg-neutral-700">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-400"
                  >
                    MÃ SẢN PHẨM
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-400"
                  >
                    TÊN SẢN PHẨM
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-400"
                  >
                    DANH MỤC
                  </th>{" "}
                  <th
                    scope="col"
                    className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-400"
                  >
                    {""}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:bg-[#111827] dark:divide-neutral-700">
                <TableBody data={currentPageData} />
              </tbody>
            </table>
          </div>
          <ReactPaginate
            previousLabel={<ArrowLeftIcon className="w-5 h-5" />}
            nextLabel={<ArrowRightIcon className="w-5 h-5" />}
            breakLabel={"..."}
            breakClassName={"break-me"}
            pageCount={Math.ceil(data.length / itemsPerPage)}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            containerClassName={"pagination"}
            activeClassName={"active"}
            pageClassName={"page-item"}
            pageLinkClassName={"page-link"}
            previousClassName={"page-item"}
            previousLinkClassName={"page-link"}
            nextClassName={"page-item"}
            nextLinkClassName={"page-link"}
          />
        </div>
      </div>
    </div>
  );
}

export default ProductTable;

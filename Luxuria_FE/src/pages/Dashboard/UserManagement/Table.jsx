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
import { useState, useEffect } from "react";
import { convertRoleName } from "@/services/getHelper";
import ReactPaginate from "react-paginate";

function UserData({ item, deleteUser }) {
  const navigate = useNavigate();
  const [roleName, setRoleName] = useState("");

  useEffect(() => {
    const fetchRoleName = async () => {
      const role = await convertRoleName(item.role.name);
      setRoleName(role);
    };

    fetchRoleName();
  }, [item.role.name]);

  const confirm = (e) => {
    console.log(e);
    deleteUser(item.id);
  };
  const cancel = (e) => {
    console.log(e);
  };

  const handleClick = () => {
    navigate(`/cap-nhat-tai-khoan/${item.id}`, { state: { item } });
  };

  return (
    <>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">
        {item.id}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">
        {item.fullName}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">
        {item.email}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">
        {item.phoneNumber}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">
        {roleName}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">
        {item.active ? "Active" : "Inactive"}
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
            title="Xóa người dùng"
            description="Bạn có muốn xóa người dùng này không?"
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

function TableBody({ data, deleteUser }) {
  return (
    <>
      {data.map((item, index) => (
        <tr key={index}>
          <UserData item={item} deleteUser={deleteUser} />
        </tr>
      ))}
    </>
  );
}

function UserTable({ data: initialData }) {
  const [data, setData] = useState(initialData);
  const API_DELETE_USER = import.meta.env.VITE_API_DELETE_USER_ENDPOINT;
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 6;

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  const offset = currentPage * itemsPerPage;
  const currentPageData = data.slice(offset, offset + itemsPerPage);
  const [cookies] = useCookies(["token"]);

  const deleteUser = async (id) => {
    console.log(id);
    try {
      const response = await axios.put(`${API_DELETE_USER}/${id}`, null, {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
      });
      console.log("Delete user: ", response.data);
      Toast("delete_success", "success", "Xóa người dùng thành công");
      setData(data.filter((user) => user.id !== id));
      window.location.reload();
    } catch (error) {
      console.error("Error deleting user: ", error);
      Toast("delete_err", "error", "Có lỗi khi xóa người dùng");
    }
  };

  return (
    <div className="flex flex-col">
      <div className="-m-1.5 overflow-x-auto">
        <div className="p-1.5 min-w-full inline-block align-middle">
          <div className="flex justify-start my-auto mb-3">
            <Link to="/tao-tai-khoan">
              <button className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800">
                Tạo người dùng
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
                    MÃ NGƯỜI DÙNG
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-400"
                  >
                    HỌ VÀ TÊN
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-400"
                  >
                    EMAIL
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-400"
                  >
                    PHONE
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-400"
                  >
                    VAI TRÒ
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-400"
                  >
                    ACTIVE
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-400"
                  >
                    {""}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-neutral-700 dark:bg-[#111827]">
                <TableBody data={currentPageData} deleteUser={deleteUser} />
              </tbody>
            </table>
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
    </div>
  );
}

export default UserTable;

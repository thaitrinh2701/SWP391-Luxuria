import { useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { HSSelect } from "preline";
import { Input, Checkbox, Toast } from "@components";
import { GIACONG_FORMAT } from "@utils/constant";
import { Divider } from "antd";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function GiaCong() {
  const API = import.meta.env.VITE_API_MAKE_REQUEST_ENDPOINT;
  const [cookies] = useCookies(["user, token"]);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      HSSelect.autoInit();
    }, 100);
  }, []);

  const {
    register,
    handleSubmit,
    isSubmitted,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    // Show SweetAlert confirmation dialog
    Swal.fire({
      title: "Bạn có chắc chắn là muốn gửi yêu cầu không?",
      text: "Bạn vẫn có thể hủy yêu cầu trước khi nhân viên duyệt yêu cầu!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "ĐỒNG Ý",
      cancelButtonText: "HỦY",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const userId = cookies.user?.id;

        if (!userId) {
          Toast("request_err", "error", "Vui lòng đăng nhập để gửi đơn!");
          navigate("/login");
          return;
        }

        const requestData = {
          user_id: userId,
          ...data,
        };

        console.log("Request Data:", requestData);

        try {
          const response = await axios.post(API, requestData, {
            headers: {
              Authorization: `Bearer ${cookies.token}`,
            },
          });
          if (response.status === 200) {
            Swal.fire({
              title: "Gửi yêu cầu thành công!",
              text: "Yêu cầu của bạn đã được nhân viên tiếp nhận!",
              icon: "success",
            });
          } else {
            Swal.fire({
              title: "Gửi yêu cầu thất bại!",
              text: "Có lỗi đã xảy ra!",
              icon: "error",
            });
          }
        } catch (error) {
          console.error("Error:", error);

          if (error.response) {
            if (error.response.status === 400) {
              Toast("send_error", "error", "Dữ liệu gửi đi không hợp lệ!");
              console.error("Server Response:", error.response.data);
            } else if (error.response.status === 403) {
              Toast("send_error", "error", "Bạn không có quyền truy cập!");
              console.error("Server Response:", error.response.data);
            } else {
              Toast("send_error", "error", "Lỗi kết nối tới máy chủ!");
            }
          } else {
            Toast("send_error", "error", "Lỗi kết nối tới máy chủ!");
          }
        }
      }
    });
  };
  return (
    <div className="mb-4 mx-auto max-w-7xl">
      <h1 className="text-white text-5xl text-center mt-6 mb-8 font-bold font-playfair bg-cover bg-no-repeat py-24 bg-[url('/gcts.webp')]">
        GIA CÔNG TRANG SỨC THEO YÊU CẦU
      </h1>
      <div className="px-6 lg:px-12 text-xl">
        <h2 className="text-gray-800 text-3xl font-semibold mb-4 hs-dark-mode-active:text-gray-100">
          Với hơn 10 năm thiết kế và gia công, đội ngũ thợ lành nghề của Luxuria
          sẽ tạo ra món trang sức quý khách luôn mong ước.
        </h2>
        <ul className="list-disc list-inside text-2xl text-gray-700 mb-6 hs-dark-mode-active:text-gray-100">
          <li>
            Gia công được mọi mặt hàng: nhẫn, vòng tay, lắc, bông tai, dây
            chuyền, mặt dây chuyền...
          </li>
          <li>
            Chất lượng và đảm bảo, với hơn 10 năm uy tín và kinh nghiệm từ đội
            ngũ thợ.
          </li>
        </ul>
        <h2 className="text-gray-800 text-3xl font-semibold mb-4 hs-dark-mode-active:text-gray-100">
          Quý khách hãy chuẩn bị trước:
        </h2>
        <ul className="list-disc list-inside text-gray-700 mb-6 hs-dark-mode-active:text-gray-100 text-2xl">
          <li className="my-2">
            <span className="font-bold">Mẫu</span>: hình ảnh, video, bản vẽ của
            sản phẩm.
          </li>
          <li className="font-bold my-2">Kích thước</li>
          <li className="font-bold">
            Loại vàng & màu sắc
            <ul className="list-disc list-inside text-gray-700 mb-3 hs-dark-mode-active:text-gray-100 text-2xl">
              <li className="font-normal ml-5 list-circle mt-2 my-2">
                Vàng 24k (999) - vàng
              </li>
              <li className="font-normal ml-5 list-circle my-2">
                Vàng 18k (750) - vàng, trắng, hồng
              </li>
              <li className="font-normal ml-5 list-circle my-2">
                Vàng 16k (670) - vàng, trắng
              </li>
              <li className="font-normal ml-5 list-circle my-2">
                Vàng 14k (610) - vàng, xi trắng
              </li>
            </ul>
          </li>
          <li>
            <span className="font-bold">Tiền đặt cọc</span> : bằng với tiền công
            gia công. Vì mỗi sản phẩm khác nhau, quý khách vui lòng liên hệ
            trước để được báo giá chính xác.
          </li>
          <h2 className="text-gray-800 text-3xl font-semibold mt-6 hs-dark-mode-active:text-gray-100">
            Thời gian đợi ước tính
          </h2>
          <ul className="list-disc list-inside my-2 text-gray-700 mb-6 hs-dark-mode-active:text-gray-100">
            <li className="mt-4 mb-1">
              <span className="font-bold">Sản phẩm đơn giản</span>: 7 - 10 ngày
            </li>
            <li className="my-2">
              <span className="font-bold ">Sản phẩm phức tạp</span>: 10 - 15
              ngày
            </li>
          </ul>
          <h2 className="text-2xl">
            Khi đã có đủ những chi tiết trên, quý khách hãy đến các cửa hàng của
            Luxuria để được nhân viên cùng xưởng thợ báo giá và tiến hành gia
            công. Đừng ngần ngại liên hệ qua Messenger và hotline 0727 727 727
            nếu quý khách cần hỗ trợ thêm.
          </h2>
        </ul>

        <div className="bg-gray-100 p-6 rounded-lg shadow-lg hs-dark-mode-active:bg-gray-500">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <button
              type="submit"
              className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-600 "
            >
              Gửi yêu cầu
            </button>
          </form>
        </div>

        <Divider className="hs-dark-mode-active: bg-gray-400" />
        <h2 className="text-gray-800 text-2xl font-semibold mb-4 hs-dark-mode-active:text-gray-100">
          Với phương châm: &quot;Giá cả Việt Nam, chất lượng quốc tế&quot;,
          Luxuria cam kết sẽ làm nên món trang sức hoàn hảo nhất cho quý khách.
        </h2>
      </div>
    </div>
  );
}

export default GiaCong;

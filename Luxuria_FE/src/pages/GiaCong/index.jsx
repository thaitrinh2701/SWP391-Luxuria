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
      title: "Bạn có chắc chắn là muốn đặt hàng không?",
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
              title: "Đặt hàng thành công!",
              text: "Yêu cầu của bạn đã được nhân viên tiếp nhận!",
              icon: "success",
            });
          } else {
            Toast("request_err", "error", "Gửi đơn thất bại!");
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
      <h1 className="text-white text-3xl text-center mt-6 mb-8 font-bold font-playfair bg-cover bg-no-repeat py-20 bg-[url('/gcts.webp')]">
        GIA CÔNG TRANG SỨC THEO YÊU CẦU
      </h1>
      <div className="px-6 lg:px-12 text-xl">
        <h2 className="text-gray-800 text-2xl font-semibold mb-4 hs-dark-mode-active:text-gray-100">
          Với hơn 10 năm thiết kế và gia công, đội ngũ thợ lành nghề của Luxuria
          sẽ tạo ra món trang sức quý khách luôn mong ước.
        </h2>
        <ul className="list-disc list-inside text-gray-700 mb-6 hs-dark-mode-active:text-gray-100">
          <li>
            Gia công được mọi mặt hàng: nhẫn, vòng tay, lắc, bông tai, dây
            chuyền, mặt dây chuyền...
          </li>
          <li>
            Chất lượng và đảm bảo, với hơn 10 năm uy tín và kinh nghiệm từ đội
            ngũ thợ.
          </li>
        </ul>
        <h2 className="text-gray-800 text-2xl font-semibold mb-4 hs-dark-mode-active:text-gray-100">
          Quý khách hãy chuẩn bị trước:
        </h2>
        <ul className="list-disc list-inside text-gray-700 mb-6 hs-dark-mode-active:text-gray-100">
          <li>
            <span className="font-bold">Mẫu</span>: hình ảnh, video, bản vẽ của
            sản phẩm.
          </li>
          <li className="font-bold">Kích thước</li>
          <li className="font-bold">
            Loại vàng & màu sắc
            <ul className="list-disc list-inside text-gray-700 mb-6 hs-dark-mode-active:text-gray-100">
              <li>24k gold (999) - vàng</li>
              <li>18k gold (750) - vàng, trắng, hồng</li>
              <li>Vàng 16K (670) - vàng, trắng</li>
              <li>14k gold (610) - vàng, xi trắng</li>
            </ul>
          </li>
          <li>
            <span className="font-bold">Tiền đặt cọc</span>: bằng với tiền công
            gia công. Vì mỗi sản phẩm khác nhau, quý khách vui lòng liên hệ
            trước để được báo giá chính xác.
          </li>
          <h2>
            Khi đã có đủ những chi tiết trên, quý khách hãy đến các cửa hàng của
            Luxuria để được nhân viên cùng xưởng thợ báo giá và tiến hành gia
            công. Đừng ngần ngại liên hệ qua Messenger và hotline 0727 727 727
            nếu quý khách cần hỗ trợ thêm.
          </h2>
        </ul>

        <div className="bg-gray-100 p-6 rounded-lg shadow-lg hs-dark-mode-active:bg-gray-500">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* {GIACONG_FORMAT.map((item, index) => (
              <Input
                key={index}
                id={item.id}
                label={item.label}
                isRequired={item.isRequired}
                placeholder={item.placeholder}
                isError={errors[item.id]}
                msg={item.validMsg}
                type={item.type}
                isSubmitted={isSubmitted}
                aria-invalid={errors[item.id] ? "true" : "false"}
                inputMode={item.inputMode}
                data-hs-input-number-input={""}
                defaultValue={item.defaultValue}
                {...register(item.id, {
                  valueAsNumber: item.rules?.valueAsNumber || false,
                  required: item.rules?.required || false,
                  pattern: {
                    value: item.rules?.pattern?.value || /\S/,
                    message: item.rules?.pattern?.message || "Không hợp lệ",
                  },
                  minLength: {
                    value: item.rules?.minLength?.value || 1,
                    message: item.rules?.minLength?.message || "Tối thiểu 1",
                  },
                  maxLength: {
                    value: item.rules?.maxLength?.value || 50,
                    message: item.rules?.maxLength?.message || "Tối đa 50",
                  },
                })}
              />
            ))} */}
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

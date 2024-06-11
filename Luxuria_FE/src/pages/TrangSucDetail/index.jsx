import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BAO_HANH_LIST, RING_LIST } from "@/utils/constant";
import { Divider } from "antd";
import { Accordion } from "@/components";
import HSAccordion from "@preline/accordion";

function TrangSucDetail() {
  const { productID } = useParams();
  const navigate = useNavigate();
  const product = RING_LIST.find((item) => item.productID === productID);
  if (!product) {
    navigate("/404");
  }
  useEffect(() => {
    setTimeout(() => {
      HSAccordion.autoInit();
    }, 100);
  }, []);

  return (
    <div className="py-20 flex justify-center">
      <div className="w-1/2">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2 font-playfair">
            {product.name}
          </h1>
          <p className="text-2xl font-playfair">Vật liệu: {product.material}</p>
          <p className="text-2xl font-playfair">Loại đá: {product.gems}</p>
          <Divider />
          <p className="text-2xl font-playfair">
            Mã sản phẩm: {product.productID}
          </p>
          <p className="text-2xl font-playfair">Cửa hàng: Luxuria</p>
          {/* Bạn có thể hiển thị thông tin khác của sản phẩm ở đây */}
          <span className="my-3 inline-block px-4 py-2 rounded border border-gray-400 bg-gray-200 text-gray-700">
            XIN QUÝ KHÁCH ĐẾN CỬA HÀNG ĐỂ MUA
          </span>
          <div className="w-full mt-[4.5rem] pb-6 md:pb-12 px-4 sm:px-6 mx-auto dark:bg-gray-900 bg-gray-50">
            <div className="hs-accordion-group max-w-4xl mx-auto space-y-3 mb-24 sm:mb-0 cursor-default select-none">
              {BAO_HANH_LIST.map((item) => (
                <Accordion
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  message={item.message}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="w-1/2 flex justify-center">
        <img src={product.image} alt={product.name} className="w-full h-full" />
      </div>
    </div>
  );
}

export default TrangSucDetail;

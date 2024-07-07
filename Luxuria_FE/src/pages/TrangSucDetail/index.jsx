import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { BAO_HANH_LIST, RING_LIST } from "@/utils/constant";
import { Divider } from "antd";
import { Accordion } from "@/components";
import HSAccordion from "@preline/accordion";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { convertConstraintName } from "@/services/getHelper";

function TrangSucDetail() {
  const { state } = useLocation();
  const data = state?.data;
  const navigate = useNavigate();
  const [thumbnailPosition, setThumbnailPosition] = useState("right");
  const [categoryName, setCategoryName] = useState("");
  const [gemsName, setGemsName] = useState("");
  const [goldName, setGoldName] = useState("");

  useEffect(() => {
    if (!data) {
      navigate("/404");
    }
  }, [data, navigate]);

  useEffect(() => {
    const updateConstraintName = async () => {
      const categoryName = data?.product?.category?.name;
      const gemsName = data?.product?.gem?.name;
      const goldName = data?.product?.gold?.name;
      if (categoryName) {
        const convertedName = await convertConstraintName(categoryName);
        setCategoryName(convertedName);
      }
      if (gemsName) {
        const convertedGemsName = await convertConstraintName(gemsName);
        setGemsName(convertedGemsName);
      }
      if (goldName) {
        const convertedGemsName = await convertConstraintName(goldName);
        setGoldName(convertedGemsName);
      }
    };
    updateConstraintName();
  }, [data]);

  useEffect(() => {
    const updateThumbnailPosition = () => {
      if (window.innerWidth < 768) {
        setThumbnailPosition("bottom");
      } else {
        setThumbnailPosition("right");
      }
    };
    updateThumbnailPosition();
    window.addEventListener("resize", updateThumbnailPosition);
    return () => window.removeEventListener("resize", updateThumbnailPosition);
  }, []);

  if (!data) {
    return null; // Ensure the function exits here to prevent rendering errors.
  }

  const images = data.productDataList?.map((item) => ({
    original: `data:image/jpeg;base64,${item.value}`,
    thumbnail: `data:image/jpeg;base64,${item.value}`,
  }));

  return (
    <div className="container mx-auto py-20 grid grid-cols-1 md:grid-cols-2 gap-10">
      <div className="p-5 text-xl dark:text-white">
        <h1 className="text-5xl font-bold mb-2 font-playfair">
          {data?.product?.name}
        </h1>
        <p className="text-2xl font-playfair">
          Mã sản phẩm: {data?.product?.id}
        </p>
        <p className="text-2xl font-playfair">Loại trang sức: {categoryName}</p>
        <Divider className="my-10" />

        <span className="tracking-wide my-1 max-w-xl text-center inline-block px-20 py-5 rounded-xl border border-gray-400 bg-gray-200 text-gray-700 font-bold text-xl hover:bg-gray-700 hover:text-gray-200 hover:transition-colors duration-700">
          XIN QUÝ KHÁCH ĐẾN CỬA HÀNG ĐỂ MUA
        </span>

        <ul className="text-xl font-playfair list-disc pl-5">
          <li className="my-8 text-2xl">Vật liệu: {goldName}</li>
          <li className="my-8 text-2xl">Loại đá: {gemsName}</li>
          <li className="my-8 text-2xl">Cửa hàng: Luxuria</li>
        </ul>

        <div className="p-10 max-w-xl border border-gray-300 mt-5">
          <h1 className="font-medium mb-3 text-center text-2xl underline">
            Ưu đãi
          </h1>
          <ul className="mt-8 text-xl">
            <b>Bảo trì & làm mới </b> miễn phí trong 6 tháng đầu! Tất cả sản
            phẩm được bảo trì, làm mới và đánh bóng miễn phí trong 6 tháng đầu.
          </ul>
          <ul className="mt-8 text-xl">
            <b>Khắc chữ miễn phí với một số mặt hàng!</b> Vàng kiểu Ý 750 và tất
            cả sản phẩm mua ở chi nhánh Luxuria được khắc chữ miễn phí.
          </ul>
        </div>

        <div className="max-w-[84%] mt-5">
          <div className="hs-accordion-group space-y-3">
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
      <div className="flex justify-center items-start flex-wrap">
        <ImageGallery
          items={images}
          showThumbnails={true}
          thumbnailPosition={thumbnailPosition}
          showFullscreenButton={false}
          showPlayButton={false}
          showBullets={false}
        />
      </div>
    </div>
  );
}

export default TrangSucDetail;

export function TrangSucDetailForHome() {
  const { productID } = useParams();
  const navigate = useNavigate();
  const product = RING_LIST.find((item) => item.productID === productID);

  useEffect(() => {
    setTimeout(() => {
      HSAccordion.autoInit();
    }, 100);
  }, []);

  if (!product) {
    navigate("/404");
    return null;
  }

  return (
    <div className="container mx-auto py-20 grid grid-cols-1 md:grid-cols-2 gap-10">
      <div className="p-5 text-xl">
        <h1 className="text-3xl font-bold mb-2 font-playfair dark:text-white">
          {product.name}
        </h1>
        <p className="text-2xl font-playfair dark:text-white">
          Mã sản phẩm: {product.productID}
        </p>
        <Divider className="my-10" />
        <span className="tracking-wide my-8 max-w-xl text-center inline-block px-20 py-10 rounded border border-gray-400 bg-gray-200 text-gray-700 font-bold text-2xl  hover:bg-gray-700 hover:text-gray-200 hover:transition-colors duration-700">
          XIN QUÝ KHÁCH ĐẾN CỬA HÀNG ĐỂ MUA
        </span>
        <ul className="text-xl font-playfair list-disc pl-5">
          <li className="my-8 text-2xl">Vật liệu: {product.material}</li>
          <li className="my-8 text-2xl">Loại đá: {product.gems}</li>
          <li className="my-8 text-2xl">Cửa hàng: Luxuria</li>
        </ul>
        <div className="p-10 max-w-xl border border-gray-300 mt-5 dark:text-white">
          <h1 className="font-medium mb-3 text-center text-2xl underline">
            Ưu đãi
          </h1>
          <ul className="mt-8 text-xl">
            <b>Bảo trì & làm mới </b> miễn phí trong 6 tháng đầu! Tất cả sản
            phẩm được bảo trì, làm mới và đánh bóng miễn phí trong 6 tháng đầu.
          </ul>
          <ul className="mt-8 text-xl">
            <b>Khắc chữ miễn phí với một số mặt hàng!</b> Vàng kiểu Ý 750 và tất
            cả sản phẩm mua ở chi nhánh Luxuria được khắc chữ miễn phí.
          </ul>
        </div>

        <div className="max-w-[84%] mt-5">
          <div className="hs-accordion-group space-y-3">
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
      <div className="flex justify-center items-start">
        <img
          src={product.image}
          alt={product.name}
          className="max-w-full max-h-full"
        />
      </div>
    </div>
  );
}

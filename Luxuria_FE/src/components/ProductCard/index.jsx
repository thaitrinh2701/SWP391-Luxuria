import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import axios from "axios";

function Products() {
  const API_GET_ALL_PRODUCT = import.meta.env
    .VITE_API_GET_ALL_PRODUCTS_BY_CATEGORY_ENDPOINT;
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const categoryIds = [1, 2, 3, 4, 5, 6];
  const navigate = useNavigate();

  const getProductsFromAPI = async () => {
    try {
      const responses = await Promise.all(
        categoryIds.map((categoryId) =>
          axios.get(`${API_GET_ALL_PRODUCT}/${categoryId}`)
        )
      );

      const allProducts = responses.flatMap((response) => response.data);

      const productsWithImages = allProducts
        .map((item) => {
          const productDataList = item.productDataList;
          let image = "";
          if (productDataList && productDataList.length > 0) {
            const base64Data = productDataList[0]?.value;
            image = base64Data ? `data:image/jpeg;base64,${base64Data}` : "";
          }
          return { ...item, image };
        })
        .filter((item) => item.product.id % 10 === 0);

      setData(productsWithImages);
      console.log("Data from API ", productsWithImages);
    } catch (error) {
      console.log("Error fetching products:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getProductsFromAPI();
  }, []);

  return (
    <section className="py-20 px-4 bg-gray-100 dark:bg-[#1F2937]">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold font-inter border-b-4 border-blue-600 inline-block pb-2 dark:text-white">
          Sản phẩm nổi bật
        </h2>
      </div>
      <div>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <Swiper
            slidesPerView={1}
            spaceBetween={10}
            loop={false}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 4,
                spaceBetween: 40,
              },
              1024: {
                slidesPerView: 5,
                spaceBetween: 50,
              },
            }}
            modules={[Autoplay, Pagination]}
            className="mySwiper w-full"
          >
            {data.map((item) => (
              <SwiperSlide key={item.id}>
                <ProductCard
                  name={item.product.name}
                  image={item.image}
                  link={`/trang-suc/${item.product.category.id}/${item.product.id}`}
                  data={item}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </section>
  );
}
export default Products;

export function ProductCard({ name, image, link, data }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(link, { state: { data } });
  };

  return (
    <div
      className="w-full sm:w-1/2 lg:w-full xl:full p-2"
      onClick={handleClick}
    >
      <div className="block h-full bg-white text-center rounded-lg overflow-hidden shadow-md transition-transform duration-300 ease-in-out transform hover:scale-105 dark:bg-[#1F2937] dark:text-white">
        <img
          src={image}
          alt={name}
          className="w-full h-48 sm:h-96 object-cover object-center"
        />
        <div className="p-4 sm:p-6">
          <h3 className="text-lg sm:text-xl font-semibold mb-2 font-playfair">
            {name}
          </h3>
        </div>
      </div>
    </div>
  );
}

import React from "react";
import { Link, useNavigate } from "react-router-dom";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
// import required modules
import { Pagination, Autoplay } from "swiper/modules";

function Products() {
  return (
    <section className="py-20 px-4 bg-gray-100 dark:bg-[#1F2937]">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold font-inter border-b-4 border-blue-600 inline-block pb-2 dark:text-white">
          Sản phẩm nổi bật
        </h2>
      </div>
      <div>
        <Swiper
          slidesPerView={1}
          spaceBetween={10}
          loop={true}
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
          className="mySwiper w-ful"
        >
          {/* Adding SwiperSlide elements */}
          <SwiperSlide>
            <ProductCard
              name="Nhẫn cưới vàng bản móc máy Vàng kiểu Ý 750"
              image="https://www.baotinkk.com/cdn/shop/products/NJ190720089_16-20-44_e2570c3d-8c53-418a-898a-67685e2cbcc4_900x.jpg?v=1606914741"
              link={`/trang-suc/ring/NJ190720090`}
            />
          </SwiperSlide>
          <SwiperSlide>
            <ProductCard
              name="Nhẫn cưới vàng bản xi cát Vàng 18K"
              image="https://www.baotinkk.com/cdn/shop/products/NA190308005_16-09-08_543acc70-3ba8-4f6b-916f-759072f62f80_900x.jpg?v=1606913104"
              link={`/trang-suc/ring/NA190308002`}
            />
          </SwiperSlide>
          <SwiperSlide>
            <ProductCard
              name="Nhẫn cưới vàng bản xi cát Vàng 18K"
              image="https://www.baotinkk.com/cdn/shop/products/NA190308005_16-09-08_2fdd6f4e-131c-45c4-bc2c-97a30727042f_900x.jpg?v=1606913101"
              link={`/trang-suc/ring/NA190308002`}
            />
          </SwiperSlide>
          <SwiperSlide>
            <ProductCard
              name="Nhẫn cưới vàng bản lông voi Vàng 18K"
              image="https://www.baotinkk.com/cdn/shop/products/NA190830004_NA190830003_bd6c0777-d4f8-41dc-a92f-dc58cfa87d93_900x.jpg?v=1606914746"
              link={`/trang-suc/ring/NA150821111`}
            />
          </SwiperSlide>
          <SwiperSlide>
            <ProductCard
              name="Bông tai trắng kiểu Vàng kiểu Ý 750"
              image="https://www.baotinkk.com/cdn/shop/products/MJ190716043_-_16-44-08_0c5fa678-4e22-4f6b-982b-5b7a716bd815_900x.jpg?v=1602314026"
              link={`/trang-suc/ring/NA150821111`}
            />
          </SwiperSlide>
          <SwiperSlide>
            <ProductCard
              name="Nhẫn cưới vàng bản lông voi Vàng 18K"
              image="https://www.baotinkk.com/cdn/shop/products/NA190830004_NA190830003_bd6c0777-d4f8-41dc-a92f-dc58cfa87d93_900x.jpg?v=1606914746"
              link={`/trang-suc/ring/NA150821111`}
            />
          </SwiperSlide>
          <SwiperSlide>
            <ProductCard
              name="Nhẫn cưới vàng bản lông voi Vàng 18K"
              image="https://www.baotinkk.com/cdn/shop/products/NA190830004_NA190830003_bd6c0777-d4f8-41dc-a92f-dc58cfa87d93_900x.jpg?v=1606914746"
              link={`/trang-suc/ring/NA150821111`}
            />
          </SwiperSlide>
        </Swiper>
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
      <div className="block h-full bg-white text-center rounded-lg overflow-hidden shadow-md transition-transform duration-300 ease-in-out transform hover:scale-105 dark:bg-[#1F2937] dark:text-white h-full">
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

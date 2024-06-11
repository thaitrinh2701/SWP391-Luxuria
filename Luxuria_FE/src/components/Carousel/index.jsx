import { Swiper, SwiperSlide } from "swiper/react";
// import required modules
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import { BANNERS } from "@utils/constant";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
export function Carousel() {
  return (
    <div>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 4500,
          disableOnInteraction: false,
        }}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {BANNERS.map((banner, index) => (
          <SwiperSlide key={index}>
            <div className="flex justify-center items-center">
              <img src={banner.url} alt={banner.alt} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

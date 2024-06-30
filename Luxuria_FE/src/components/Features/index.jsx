import React from "react";

function Features() {
  return (
    <section
      id="features"
      className="container mx-auto py-20 dark:bg-[#111827] dark:text-white"
    >
      <div className="text-center mb-12">
        <h2 className="text-4xl font-inter font-bold border-b-4 border-blue-600 inline-block pb-2">
          Các điểm nổi bật
        </h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        <Feature
          title="Nguyên liệu chất lượng"
          description="Chỉ những vật liệu tốt nhất mới được sử dụng trong đồ trang sức của chúng tôi."
          image="https://cdn-icons-png.flaticon.com/512/3500/3500835.png"
          darkImage="./thumb.png"
        />
        <Feature
          title="Thiết kế độc nhất"
          description="Mỗi trang sức của chúng tôi là duy nhất và được làm thủ công với độ chính xác cao."
          image="./unique_design.svg"
          darkImage="./design-dark.png"
        />
        <Feature
          title="Sự hài lòng"
          description="Chúng tôi đảm bảo 100% về sản phẩm của mình mang đến sự hài lòng cho tất cả khách hàng."
          image="./pleased.svg"
          darkImage="./pleased-dark.png"
        />
        <Feature
          title="Hỗ trợ nhiệt tình"
          description="Đội ngũ của chúng tôi luôn sẵn sàng giúp đỡ và lắng nghe yêu cầu của bạn"
          image="https://cdn-icons-png.freepik.com/512/10108/10108195.png"
          darkImage="./idea.png"
        />
      </div>
    </section>
  );
}

export default Features;
function Feature({ title, description, image, darkImage }) {
  return (
    <div className="text-center p-8 border border-gray-200 rounded-lg">
      <img src={image} alt={title} className="mx-auto mb-4 w-24 h-24 block dark:hidden" />
      <img src={darkImage} alt={title} className="mx-auto mb-4 w-24 h-24 hidden dark:block" />
      <h3 className="text-2xl font-bold mb-4">{title}</h3>
      <p>{description}</p>
    </div>
  );
}

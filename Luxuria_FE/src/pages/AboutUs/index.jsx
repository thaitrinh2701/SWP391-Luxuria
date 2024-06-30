import "./AboutUs.scss";

function AboutUs() {
  return (
    <div className="AboutUs mt-10">
      <div className="text-center my-12">
        <h2 className="text-4xl font-inter font-bold border-b-4 border-blue-600 inline-block pb-2 dark:text-white">
          THÔNG TIN VỀ CHÚNG TÔI
        </h2>
      </div>
      <p className="text font-inter">
        Lời đầu tiên, cho phép Luxuria được gửi tới quý khách, quý thân nhân và
        bạn bè lời chúc sức khỏe, thành đạt và hạnh phúc. Sau một thời gian hoạt
        động, website đã có những bước tiến đáng kể cả về chất lượng và hình
        thức. Số lượng khách truy cập website trở thành khách hàng sử dụng dịch
        vụ thiết kế tăng lên đáng kể. Từ việc chăm chút nội dung cho website
        theo sở thích, Luxuria đã dần chinh phục khách hàng với những dịch vụ
        thiết kế sáng tạo uy tín và chất lượng. Tự tin với khả năng đáp ứng mọi
        yêu cầu thiết kế của khách hàng, Luxuria chính thức đem lại dịch vụ mài
        đá quý, bán đá quý, trang sức chuyên nghiệp từ đầu năm 2024. Sự ủng hộ
        và tin tưởng của khách hàng sẽ trở thành nguồn cảm hứng lớn lao cho
        Luxuria trong quá trình phác họa những ý tưởng thiết kế được trở thành
        hiện thực. Xin cám ơn sự tin tưởng và ủng hộ của quý khách trong thời
        gian qua.
        <p className="text-2">Trân trọng.</p>
      </p>
      <div className="map">
        <iframe
          title="Google Maps"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.610010537023!2d106.80730807565162!3d10.841127589311597!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752731176b07b1%3A0xb752b24b379bae5e!2sFPT%20University%20HCMC!5e0!3m2!1sen!2s!4v1715509845916!5m2!1sen!2s"
          width="800"
          height="600"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
}

export default AboutUs;

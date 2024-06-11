function MainPolicy() {
  return (
    <section
      data-nosnippet
      className="flex flex-col h-full mt-[4.5rem] mb-10 w-full overflow-y-hidden"
    >
      <h1 className="text-center text-blue-600 dark:text-white text-lg lg:text-xl xl:text-2xl uppercase font-bold mb-2 mt-4 whitespace-pre-line sm:whitespace-normal animate__animated animate__zoomIn animate__faster">
        Các chính sách chung
      </h1>
      <div className="shadow-none rounded flex w-full h-full animate__animated animate__slideInUp">
        <div className="px-6 py-2.5 mx-auto w-full max-w-6xl text-gray-900 dark:text-gray-100 leading-6">
          <div className="mb-8">
            <p className="antialiased hover:subpixel-antialiased text-left font-semibold text-base lg:text-lg mb-2 uppercase">
              Điều khoản chung
            </p>
            <ul className="list-disc list-inside space-y-1 lg:text-base text-sm mb-4">
              <li>
                Người mua và Luxuria đồng ý bồi thường và giữ cho Luxuria không
                bị thiệt hại, hoặc chống lại bất kỳ việc khiếu nại, kiện tụng,
                hoặc các nghĩa vụ/trách nhiệm, thiệt hại, tuyên bố, hình phạt,
                tiền phạt, các chi phí và phí tổn (bao gồm, nhưng không giới hạn
                bất kỳ chi phí giải quyết tranh chấp nào khác) có liên quan phát
                sinh từ hoặc có liên quan đến bất kỳ hành động nào của Luxuria
                theo các chính sách cụ thể.
              </li>
              <li>
                Thời gian Luxuria đảm bảo thực hiện bởi Luxuria, theo yêu cầu
                của người dùng, để hỗ trợ người dùng trong việc giải quyết các
                xung đột, tranh chấp, khiếu nại có thể phát sinh trong quá trình
                giao dịch trên Luxuria.
              </li>
              <li>
                Người dùng có thể liên hệ với nhau để thỏa thuận về việc giải
                quyết tranh chấp của họ hoặc báo cáo lên Luxuria hoặc cơ quan
                nhà nước có thẩm quyền để được hỗ trợ trong việc giải quyết bất
                kỳ tranh chấp xảy ra trước, trong hoặc sau thời gian Luxuria đảm
                bảo
              </li>
            </ul>
          </div>
          <div className="mb-2">
            <p className="antialiased hover:subpixel-antialiased text-left font-semibold text-sm lg:text-lg mb-2">
              Các thay đổi đối với chính sách chung này
            </p>
            <p className="antialiased hover:subpixel-antialiased mb-3 lg:text-base text-sm">
              Nếu chúng tôi quyết định thay đổi chính sách chung của mình, chúng
              tôi sẽ đăng các thay đổi ở đây. Nếu những thay đổi là quan trọng,
              chúng tôi cũng có thể chọn gửi email cho tất cả người dùng đã đăng
              ký của chúng tôi với các chi tiết mới
            </p>
            <p className="antialiased hover:subpixel-antialiased mt-6 mb-16 sm:mb-0 md:text-sm text-xs italic">
              Cập nhật lần cuối: ngày 06 tháng 06 năm 2024
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MainPolicy;

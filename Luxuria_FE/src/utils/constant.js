// constant.js
export const USER_ROLES = {
  ADMIN: 1,
  CUSTOMER: 2,
  SALE_STAFF: 3,
  DESIGN_STAFF: 4,
  PRODUCTION_STAFF: 5,
  MANAGER: 6,
};

export const PASSWORD_REQUIRED = [
  { "rule-text": "min-length", text: "Phải có ít nhất 6 ký tự" },
  { "rule-text": "lowercase", text: "Phải có ít nhất 1 ký tự thường" },
  { "rule-text": "uppercase", text: "Phải có ít nhất 1 ký tự hoa" },
  { "rule-text": "numbers", text: "Phải có ít nhất 1 ký tự số" },
  {
    "rule-text": "special-characters",
    text: "Phải có ít nhất 1 trong số những ký tự đặc biệt sau: !@#$%^&*",
  },
];

export const FOOTER_LIST = {
  mainList: [
    {
      title: "Dịch vụ",
      children: [
        { title: "Mua bán", url: "/" },
        { title: "Gia công", url: "/gia-cong" },
      ],
    },
    {
      title: "Thông tin",
      children: [
        { title: "Tin tức", url: "/tin-tuc" },
        { title: "Giá vàng", url: "/gia-vang" },
      ],
    },
    {
      title: "Pháp lý",
      children: [
        { title: "Chính sách hoàn trả", url: "/return-policy" },
        { title: "Chính sách bảo mật", url: "/privacy-policy" },
      ],
    },
  ],
  subList: [
    { title: "Câu hỏi thường gặp", url: "/faq" },
    { title: "Điều khoản sử dụng", url: "/policy" },
  ],
};

export const SIGNUP_FORMAT = [
  {
    id: "fullname",
    name: "fullname",
    label: "Họ và tên",
    placeholder: "Vũ Đinh Trọng Thắng",
    validMsg: "Họ và tên hợp lệ",
    type: "text",
    isFullWidth: false,
    isRequired: true,
    onChangeTriggerValue: "",
    options: [],
    inputMode: "text",
    rules: {
      required: "Họ và tên không được để trống",
      pattern: {
        value: /^[a-zA-ZÀ-ỹ\s]+$/gi,
        message: "Họ và tên không hợp lệ",
      },
      minLength: {
        value: 1,
      },
    },
  },
  {
    id: "phone",
    name: "phone",
    label: "Số điện thoại",
    placeholder: "0987654321",
    validMsg: "Số điện thoại hợp lệ",
    type: "text",
    isFullWidth: false,
    isRequired: true,
    onChangeTriggerValue: "confirm_password",
    options: [],
    inputMode: "tel",
    rules: {
      required: "Số điện thoại không được để trống",
      pattern: {
        value: /(84|0[3|5|7|8|9])+([0-9]{8})\b/g,
        message: "Số điện thoại không hợp lệ",
      },
      minLength: {
        value: 1,
      },
    },
  },
  {
    id: "email",
    name: "email",
    label: "Email",
    placeholder: "doanhbatduocem@gmail.com",
    validMsg: "Email hợp lệ",
    type: "text",
    isFullWidth: true,
    isRequired: true,
    onChangeTriggerValue: "confirm_password",
    options: [],
    inputMode: "email",
    rules: {
      required: "Email không được để trống",
      pattern: {
        value:
          /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i,
        message: "Email không hợp lệ",
      },
      minLength: {
        value: 1,
      },
    },
  },
  {
    id: "address",
    name: "address",
    label: "Địa chỉ",
    placeholder: "Số 7, Bách Khoa, Hai Bà Trưng, Hà Nội",
    validMsg: "Địa chỉ hợp lệ",
    type: "text",
    isFullWidth: true,
    isRequired: true,
    onChangeTriggerValue: "confirm_password",
    options: [],
    inputMode: "text",
    rules: {
      required: "Địa chỉ không được để trống",
      pattern: {
        value: /\S/,
        message: "Địa chỉ không hợp lệ",
      },
      minLength: { value: 1 },
    },
  },
  {
    id: "password",
    name: "password",
    label: "Mật khẩu",
    placeholder: "",
    validMsg: "Mật khẩu hợp lệ",
    type: "password",
    isFullWidth: false,
    isRequired: true,
    onChangeTriggerValue: "confirm_password",
    options: [],
    inputMode: "text",
    rules: {
      required: "Mật khẩu không được để trống",
      pattern: {
        value:
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/,
        message: "Mật khẩu không hợp lệ",
      },
      minLength: { value: 6, message: "Mật khẩu phải có tối thiểu 6 ký tự" },
    },
  },
  {
    id: "confirm_password",
    name: "confirm_password",
    label: "Nhập lại mật khẩu",
    placeholder: "",
    validMsg: "Mật khẩu nhập lại hợp lệ",
    type: "password",
    isFullWidth: false,
    isRequired: true,
    onChangeTriggerValue: "",
    options: [],
    inputMode: "text",
    rules: {
      required: "Mật khẩu nhập lại không được để trống",
      validate: "Mật khẩu nhập lại không khớp",
    },
  },
];

export const LOGIN_FORMAT = [
  {
    id: "email",
    name: "email",
    label: "Email đăng nhập",
    placeholder: "demo@gmail.com",
    validMsg: "Hợp lệ",
    type: "text",
    isFullWidth: true,
    isRequired: true,
    onChangeTriggerValue: "",
    options: [],
    inputMode: "email",
    rules: {
      required: "Email đăng nhập không được để trống",
      pattern: {
        value:
          /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i,
        message: "Email đăng nhập không hợp lệ",
      },
      minLength: {
        value: 1,
      },
    },
  },
  {
    id: "login_password",
    name: "login_password",
    label: "Mật khẩu",
    placeholder: "Password",
    validMsg: "Mật khẩu hợp lệ",
    type: "password",
    isFullWidth: true,
    isRequired: true,
    isResetable: true,
    onChangeTriggerValue: "",
    options: [],
    inputMode: "text",
    rules: {
      required: "Mật khẩu không được để trống",
      pattern: {
        value:
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/,
        message: "Mật khẩu không hợp lệ",
      },
      minLength: { value: 6, message: "Mật khẩu phải có tối thiểu 6 ký tự" },
    },
  },
];

export const GIACONG_FORMAT = [];

export const ORDER_DETAIL_FORMAT = [
  {
    id: "name",
    name: "name",
    label: "Tên trang sức",
    placeholder: "VD: Dây chuyền đính đá màu",
    validMsg: "Hợp lệ",
    type: "text",
    isFullWidth: false,
    isRequired: true,
    onChangeTriggerValue: "",
    options: [],
    inputMode: "text",
    rules: {
      required: "Không được để trống",
      pattern: {
        value: /^[a-zA-ZÀ-ỹ\s]+$/gi,
        message: "Không hợp lệ",
      },
      minLength: {
        value: 1,
      },
    },
  },
  {
    id: "category_id",
    name: "category_id",
    label: "Loại trang sức",
    placeholder: "--- Mẫu đặt ---",
    validMsg: "Hợp lệ",
    type: "select",
    isFullWidth: false,
    isRequired: true,
    onChangeTriggerValue: "",
    options: [
      { value: "1", label: "Nhẫn" },
      { value: "2", label: "Bông tai" },
      { value: "3", label: "Vòng tay" },
      { value: "4", label: "Lắc tay" },
      { value: "5", label: "Vòng cổ" },
      { value: "6", label: "Dây chuyền" },
    ],
    rules: {
      required: "Không được để trống",
    },
  },
  {
    id: "gold_id",
    name: "gold_id",
    label: "Loại vàng",
    placeholder: "--- Mẫu đặt ---",
    validMsg: "Hợp lệ",
    type: "select",
    isFullWidth: false,
    isRequired: true,
    onChangeTriggerValue: "",
    options: [
      { value: "4", label: "Vàng 14K" },
      { value: "3", label: "Vàng 16K" },
      { value: "2", label: "Vàng 18K" },
      { value: "1", label: "Vàng 24K" },
    ],
    rules: {
      required: "Không được để trống",
      pattern: {
        value: /^[a-zA-ZÀ-ỹ0-9\s]+$/gi,
        message: "Không hợp lệ",
      },
      minLength: {
        value: 1,
      },
    },
  },
  {
    id: "gem_id",
    name: "gem_id",
    label: "Loại đá",
    placeholder: "--- Mẫu đặt ---",
    validMsg: "Hợp lệ",
    type: "select",
    isFullWidth: false,
    isRequired: true,
    onChangeTriggerValue: "",
    options: [
      { value: "1", label: "Kim cương" },
      { value: "2", label: "Đá màu" },
      { value: "3", label: "Ngọc Bích" },
      { value: "4", label: "Ngọc" },
      { value: "5", label: "Ngọc nhân tạo" },
    ],
    rules: {
      required: "Không được để trống",
      pattern: {
        value: /^[a-zA-ZÀ-ỹ0-9\s]+$/gi,
        message: "Không hợp lệ",
      },
      minLength: {
        value: 1,
      },
    },
  },
  {
    id: "size",
    name: "size",
    label: "Kích thước",
    placeholder: "VD: 11.2, 12.3, 13.4",
    validMsg: "Hợp lệ",
    type: "text",
    isFullWidth: false,
    isRequired: true,
    onChangeTriggerValue: "",

    rules: {
      required: "Không được để trống",
    },
  },
  {
    id: "description",
    name: "description",
    label: "Yêu cầu",
    placeholder: "",
    validMsg: "Hợp lệ",
    type: "textarea",
    isFullWidth: true,
    isRequired: false,
    onChangeTriggerValue: "",
    options: [],
    rules: {},
  },
];

export const BANNERS = [
  {
    alt: "Jewelry",
    url: "https://cdn.pnj.io/images/promo/208/v1-tabsale-t5-24-chung-1972x640CTA.jpg",
  },
  {
    alt: "Jewelry",
    url: "https://cdn.pnj.io/images/promo/208/v1-tabsale-t5-24-chung-1972x640CTA.jpg",
  },
  {
    alt: "Jewelry",
    url: "https://cdn.pnj.io/images/promo/208/v1-tabsale-t5-24-chung-1972x640CTA.jpg",
  },
];

export const PRODUCT_CATEGORIES = [
  { id: 1, name: "Bông tai vàng", image: "bong-tai-vang.png" },
  { id: 2, name: "Dây chuyền vàng", image: "day-chuyen-vang.png" },
  { id: 3, name: "Nhẫn cưới", image: "nhan-cuoi.png" },
  { id: 4, name: "Nhẫn kim cương", image: "nhan-kim-cuong.png" },
  { id: 5, name: "Trang sức bạc", image: "trang-suc-bac.png" },
  { id: 6, name: "Trang sức vàng", image: "trang-suc-vang.png" },
  { id: 7, name: "Trang sức vàng", image: "trang-suc-vang.png" },
  { id: 8, name: "Trang sức vàng", image: "trang-suc-vang.png" },
];

export const PRODUCTS = [
  {
    id: 1,
    name: "Bông tai vàng 18k",
    description: "Bông tai vàng 18k",
    price: "1,000,000 đ",
    image: "bong-tai-vang.png",
  },
  {
    id: 2,
    name: "Nhẫn cưới",
    description: "Nhẫn cưới",
    price: "1,000,000 đ",
    image: "nhan-cuoi.png",
  },
  {
    id: 3,
    name: "Nhẫn cưới",
    description: "Nhẫn cưới",
    price: "1,000,000 đ",
    image: "nhan-cuoi.png",
  },
  {
    id: 4,
    name: "Nhẫn cưới",
    description: "Nhẫn cưới",
    price: "1,000,000 đ",
    image: "nhan-cuoi.png",
  },
  {
    id: 5,
    name: "Nhẫn cưới",
    description: "Nhẫn cưới",
    price: "1,000,000 đ",
    image: "nhan-cuoi.png",
  },
];

export const DUMMY_DASHBOARD_DATA = [
  {
    id: 5,
    request: {
      id: 2,
      user: {
        id: 4,
        fullName: "Lê Vũ Đức Lương",
        email: "test@gmail.com",
        phoneNumber: "0912345678",
        role: {
          id: 1,
          name: "admin",
        },
        active: true,
      },
      createdAt: "2024-05-30T14:03:45",
      active: true,
      salesStaffApproved: true,
    },
    product: {
      id: 3,
      name: "Nhẫn vàng đính kim cương",
      category: {
        id: 1,
        name: "ring",
      },
      size: 17.5,
      gold: {
        id: 1,
        name: "24k gold",
        description: "",
      },
      goldWeight: 727.69,
      gem: {
        id: 1,
        name: "diamond",
        description: "",
      },
      gemPrice: 1200000.0,
      manufacturingFee: 500000.0,
      totalPrice: 3000000.0,
      description: "Nhẫn siêu đẹp vip pro",
      original: false,
    },
    orderCreatedAt: "2024-05-30T21:03:25",
    process: {
      id: 1,
      name: "Sales staff gửi yêu cầu phê duyệt báo giá lên Manager",
    },
    state: {
      id: 1,
      name: "Chờ báo giá",
      description: "",
    },
    active: true,
    customerApproved: false,
  },
  {
    id: 6,
    request: {
      id: 3,
      user: {
        id: 10,
        fullName: "Customer 1",
        email: "customer1@gmail.com",
        phoneNumber: "0911111111",
        role: {
          id: 2,
          name: "customer",
        },
        active: true,
      },
      createdAt: "2024-05-30T21:01:33",
      active: true,
      salesStaffApproved: true,
    },
    product: {
      id: 4,
      name: "Nhẫn vàng đính kim cương",
      category: {
        id: 1,
        name: "ring",
      },
      size: 17.5,
      gold: {
        id: 1,
        name: "24k gold",
        description: "",
      },
      goldWeight: 727.69,
      gem: {
        id: 1,
        name: "diamond",
        description: "",
      },
      gemPrice: 1200000.0,
      manufacturingFee: 500000.0,
      totalPrice: 3000000.0,
      description: "Nhẫn siêu đẹp vip pro",
      original: false,
    },
    orderCreatedAt: "2024-05-30T21:03:48",
    process: {
      id: 2,
      name: "Chờ customer chấp nhận báo giá",
    },
    state: {
      id: 4,
      name: "Chờ Customer chấp nhận báo giá",
      description: "",
    },
    active: true,
    customerApproved: false,
  },
  {
    id: 7,
    request: {
      id: 4,
      user: {
        id: 11,
        fullName: "Customer 2",
        email: "customer2@gmail.com",
        phoneNumber: "0911111112",
        role: {
          id: 2,
          name: "customer",
        },
        active: true,
      },
      createdAt: "2024-05-30T21:08:19",
      active: true,
      salesStaffApproved: true,
    },
    product: {
      id: 5,
      name: "Nhẫn vàng đính kim cương",
      category: {
        id: 1,
        name: "ring",
      },
      size: 17.5,
      gold: {
        id: 1,
        name: "24k gold",
        description: "",
      },
      goldWeight: 727.69,
      gem: {
        id: 1,
        name: "diamond",
        description: "",
      },
      gemPrice: 1200000.0,
      manufacturingFee: 500000.0,
      totalPrice: 3000000.0,
      description: "Nhẫn siêu đẹp vip pro",
      original: false,
    },
    orderCreatedAt: "2024-05-30T21:09:01",
    process: {
      id: 3,
      name: "Design staff gửi bản thiết kế 3D cho Customer",
    },
    state: {
      id: 5,
      name: "Chờ bản thiết kế 3D trang sức",
      description: "",
    },
    active: true,
    customerApproved: true,
  },
  {
    id: 8,
    request: {
      id: 5,
      user: {
        id: 12,
        fullName: "Customer 3",
        email: "customer3@gmail.com",
        phoneNumber: "0911111113",
        role: {
          id: 2,
          name: "customer",
        },
        active: true,
      },
      createdAt: "2024-05-30T21:27:01",
      active: true,
      salesStaffApproved: true,
    },
    product: {
      id: 6,
      name: "Dây chuyền đính đá màu",
      category: {
        id: 5,
        name: "necklace",
      },
      size: 17.5,
      gold: {
        id: 1,
        name: "24k gold",
        description: "",
      },
      goldWeight: 727.69,
      gem: {
        id: 2,
        name: "colored gemstones",
        description: "",
      },
      gemPrice: 500000.0,
      manufacturingFee: 700000.0,
      totalPrice: 3000000.0,
      description: "Dây chuyền siêu đẹp vip pro",
      original: false,
    },
    orderCreatedAt: "2024-05-30T21:29:08",
    process: {
      id: 5,
      name: "Production staff gia công trang sức",
    },
    state: {
      id: 7,
      name: "Chờ gia công trang sức",
      description: "",
    },
    active: true,
    customerApproved: true,
  },
  {
    id: 9,
    request: {
      id: 6,
      user: {
        id: 13,
        fullName: "Customer 4",
        email: "customer4@gmail.com",
        phoneNumber: "0911111114",
        role: {
          id: 2,
          name: "customer",
        },
        active: true,
      },
      createdAt: "2024-05-30T21:30:33",
      active: true,
      salesStaffApproved: true,
    },
    product: {
      id: 7,
      name: "Dây chuyền đính đá màu",
      category: {
        id: 5,
        name: "necklace",
      },
      size: 17.5,
      gold: {
        id: 1,
        name: "24k gold",
        description: "",
      },
      goldWeight: 727.69,
      gem: {
        id: 2,
        name: "colored gemstones",
        description: "",
      },
      gemPrice: 500000.0,
      manufacturingFee: 700000.0,
      totalPrice: 3000000.0,
      description: "Dây chuyền siêu đẹp vip pro",
      original: false,
    },
    orderCreatedAt: "2024-05-30T21:31:25",
    process: {
      id: 6,
      name: "Sales staff bàn giao trang sức đã gia công cho customer",
    },
    state: {
      id: 8,
      name: "Đã hoàn thành gia công",
      description: "",
    },
    active: true,
    customerApproved: true,
  },
];

export const DUMMY_CHART_DATA = [
  {
    id: "hs-bar-chart",
    title: "Doanh thu",
    totalValue: "12000000",
    chartData: {
      options: {
        chart: {
          type: "bar",
          height: 300,
          toolbar: { show: false },
          zoom: { enabled: false },
        },
      },
      series: [
        {
          name: "Chosen Period",
          data: [
            23000, 44000, 55000, 57000, 56000, 61000, 58000, 63000, 60000,
            66000, 34000, 78000,
          ],
        },
        {
          name: "Last Period",
          data: [
            17000, 76000, 85000, 101000, 98000, 87000, 105000, 91000, 114000,
            94000, 67000, 66000,
          ],
        },
      ],
    },
  },
  {
    id: "hs-bar-chart",
    title: "Doanh thu",
    totalValue: "12000000",
    chartData: {
      options: {
        chart: {
          type: "bar",
          height: 300,
          toolbar: { show: false },
          zoom: { enabled: false },
        },
      },
      series: [
        {
          name: "Chosen Period",
          data: [
            23000, 44000, 55000, 57000, 56000, 61000, 58000, 63000, 60000,
            66000, 34000, 78000,
          ],
        },
        {
          name: "Last Period",
          data: [
            17000, 76000, 85000, 101000, 98000, 87000, 105000, 91000, 114000,
            94000, 67000, 66000,
          ],
        },
      ],
    },
  },
];

export const DUMMY_GOLD_PRICE_DATA = [
  {
    DATES: "05/17/2024",
    RATE_BUY: 87400000,
    RATE_SELL: 89500000,
  },
  {
    DATES: "05/18/2024",
    RATE_BUY: 87700000,
    RATE_SELL: 89800000,
  },
  {
    DATES: "05/20/2024",
    RATE_BUY: 89000000,
    RATE_SELL: 90500000,
  },
  {
    DATES: "05/21/2024",
    RATE_BUY: 88600000,
    RATE_SELL: 90400000,
  },
  {
    DATES: "05/22/2024",
    RATE_BUY: 88900000,
    RATE_SELL: 90500000,
  },
  {
    DATES: "05/23/2024",
    RATE_BUY: 87800000,
    RATE_SELL: 89600000,
  },
  {
    DATES: "05/24/2024",
    RATE_BUY: 87500000,
    RATE_SELL: 89300000,
  },
  {
    DATES: "05/27/2024",
    RATE_BUY: 87700000,
    RATE_SELL: 89300000,
  },
  {
    DATES: "05/28/2024",
    RATE_BUY: 88400000,
    RATE_SELL: 90000000,
  },
  {
    DATES: "05/29/2024",
    RATE_BUY: 88300000,
    RATE_SELL: 89900000,
  },
  {
    DATES: "05/30/2024",
    RATE_BUY: 84750000,
    RATE_SELL: 87500000,
  },
  {
    DATES: "05/31/2024",
    RATE_BUY: 83050000,
    RATE_SELL: 85950000,
  },
  {
    DATES: "06/01/2024",
    RATE_BUY: 80950000,
    RATE_SELL: 82750000,
  },
  {
    DATES: "06/03/2024",
    RATE_BUY: 77500000,
    RATE_SELL: 79500000,
  },
];

export const DASHBOARD_TABLE_HEADERS = [
  { title: "ID đơn hàng" },
  { title: "Khách hàng" },
  { title: "Sản phẩm" },
  { title: "Tiến trình" },
  { title: "Trạng thái" },
  { title: "Ngày tạo" },
];

export const GIAVANG_TABLE_HEADERS = [
  { title: "Thời gian" },
  { title: "Tỉ giá mua" },
  { title: "Tỉ giá bán" },
];

export const DASHBOARD_CONFIG = {
  MAX_PRODUCT: 10,
};
export const SALESTAFF_CALCULATION = [
  {
    id: "gold_price",
    name: "gold_price",
    label: "Giá vàng",
    placeholder: "",
    validMsg: "Hợp lệ",
    type: "text",
    isFullWidth: false,
    isRequired: true,
    onChangeTriggerValue: "",
    options: [],
    inputMode: "number",
    rules: {
      required: "Số điện thoại không được để trống",
      pattern: {
        value: /^\d{10,11}$/,
        message: "Số điện thoại không hợp lệ",
      },
      minLength: {
        value: 1,
      },
    },
  },
  {
    id: "gold_weight",
    name: "gold_weight",
    label: "Trọng lượng sản phẩm",
    placeholder: "",
    validMsg: "Hợp lệ",
    type: "text",
    isFullWidth: false,
    isRequired: true,
    onChangeTriggerValue: "",
    options: [],
    inputMode: "number",
    rules: {
      required: "Số điện thoại không được để trống",
      pattern: {
        value: /^\d{10,11}$/,
        message: "Số điện thoại không hợp lệ",
      },
      minLength: {
        value: 1,
      },
    },
  },
  {
    id: "manufacturing_fee",
    name: "manufacturing_fee",
    label: "Tiền công",
    placeholder: "",
    validMsg: "Hợp lệ",
    type: "text",
    isFullWidth: false,
    isRequired: true,
    onChangeTriggerValue: "",
    options: [],
    inputMode: "number",
    rules: {
      required: "Số điện thoại không được để trống",
      pattern: {
        value: /^\d{10,11}$/,
        message: "Số điện thoại không hợp lệ",
      },
      minLength: {
        value: 1,
      },
    },
  },
  {
    id: "gem_price",
    name: "gems_price",
    label: "Tiền đá",
    placeholder: "",
    validMsg: "Hợp lệ",
    type: "text",
    isFullWidth: false,
    isRequired: true,
    onChangeTriggerValue: "",
    options: [],
    inputMode: "number",
    rules: {
      required: "Số điện thoại không được để trống",
      pattern: {
        value: /^\d{10,11}$/,
        message: "Số điện thoại không hợp lệ",
      },
      minLength: {
        value: 1,
      },
    },
  },
];

export const FAQ_LISTS = [
  {
    id: 0,
    title: "Làm sao để để mua hàng?",
    message:
      "Khách hàng sau khi đặt đơn yêu cầu gia công, nhân viên chúng tôi sẽ liên lạc và làm việc với khách hàng để hoàn thiện sản phẩm.",
  },
  {
    id: 1,
    title: "Tôi có thể hủy/từ chối yêu cầu hay không?",
    message:
      "Bạn hoàn toàn có thể hủy yêu cầu trước khi sản phẩm được gia công. Tuy nhiên, sau khi sản phẩm được gia công, bạn không thể hủy yêu cầu, mọi chi phí phát sinh trong trường hợp này sẽ do khách hàng chi trả 100%.",
  },
  {
    id: 2,
    title: "Bao lâu kể từ khi yêu cầu thì bắt đầu gia công?",
    message:
      "Khách hàng sau khi xác nhận đơn hàng, chúng tôi sẽ bắt đầu gia công sản phẩm. Thời gian dự kiến 7-14 ngày.",
  },
  {
    id: 3,
    title: "Tôi có thể yêu cầu về cách đóng gói hay không?",
    message:
      "Bạn hoàn toàn có thể yêu cầu về cách chúng tôi đóng gói/vận chuyển. Mọi chi phí phát sinh sẽ do khách hàng chi trả 100% (xin lũi vì đã nghèo 🥲).",
  },
  {
    id: 4,
    title: "Tôi có thể bán sản phẩm hoàn thiện hay không?",
    message:
      "Bạn hoàn toàn có thể bán sản phẩm hoàn thiện. Chúng tôi sẽ hỗ trợ bạn trong việc bán sản phẩm.",
  },
];

export const RING_LIST = [
  {
    id: "ring",
    productID: "NJ190720090",
    material: "Vàng kiểu Ý 750",
    gems: "Không đính",
    name: "Nhẫn cưới vàng bản móc máy Vàng kiểu Ý 750",
    image:
      "https://www.baotinkk.com/cdn/shop/products/NJ190720089_16-20-44_e2570c3d-8c53-418a-898a-67685e2cbcc4_900x.jpg?v=1606914741",
  },
  {
    id: "ring",
    productID: "NA190308002",
    material: "Vàng 18K",
    gems: "Không đính",
    name: "Nhẫn cưới vàng bản xi cát Bảo Tín K&K Vàng 18K",
    image:
      "https://www.baotinkk.com/cdn/shop/products/NA190308005_16-09-08_543acc70-3ba8-4f6b-916f-759072f62f80_900x.jpg?v=1606913104",
  },
  {
    id: "ring",
    productID: "NA190308005",
    material: "Vàng 18K",
    gems: "Không đính",
    name: "Nhẫn cưới vàng bản lông voi Bảo Tín K&K Vàng 18K",
    image:
      "https://www.baotinkk.com/cdn/shop/products/NA190830004_-_NA190830003_15-50-22_900x.jpg?v=1606912799",
  },
  {
    id: "ring",
    productID: "NA190830003",
    material: "Vàng 18K",
    gems: "Kim cương",
    name: "Nhẫn cưới vàng hoa văn Bảo Tín K&K Vàng 18K đính Kim cương",
    image:
      "https://www.baotinkk.com/cdn/shop/products/NA150821110_16-10-08_05feba73-e032-4b25-b9a9-56b0ffc77238_900x.jpg?v=1606912794",
  },
  {
    id: "ring",
    productID: "NA190830004",
    material: "Vàng kiểu ý 750",
    gems: "Kim cương",
    name: "Nhẫn trắng xoàn tấm Bảo Tín K&K Vàng kiểu Ý 750 đính Kim cương",
    image:
      "https://www.baotinkk.com/cdn/shop/products/XJ190719033_16-25-02_a0b80d54-1eb7-49e3-88df-d85cec2ff1d7_900x.jpg?v=1606912784",
  },
  {
    id: "ring",
    productID: "NA150821111",
    material: "Vàng 18K",
    gems: "Không đính",
    name: "Nhẫn cưới vàng bản lông voi Bảo Tín K&K Vàng 18K",
    image:
      "https://www.baotinkk.com/cdn/shop/products/NA190830004_NA190830003_bd6c0777-d4f8-41dc-a92f-dc58cfa87d93_900x.jpg?v=1606914746",
  },
];

export const BAO_HANH_LIST = [
  {
    id: 0,
    title: "Mua hàng và thanh toán",
    message:
      "Mua hàng online hiện chưa được hỗ trợ. Quý khách hãy đến các cửa hàng của Luxuria để chọn mua sản phẩm. Hình thức thanh toán: Bảo Tín K&K chấp nhận tiền mặt, chuyển khoản, thẻ ATM nội địa, thẻ Visa và Mastercard",
  },
  {
    id: 1,
    title: "Bảo quản",
    message: `Quý khách hãy cẩn thận bảo quản để trang sức luôn bắt mắt và giữ được giá trị lâu dài. Hạn chế mang trang sức khi vận động mạnh, đi ngủ, tắm biển, xịt nước hoa...
 Dùng hộp nữ trang chuyên dụng để bảo quản trang sức.
 Dùng bàn chải hoặc vải mềm để làm sạch trang sức đã ngâm trong nước ấm.
 Định kì bảo trì & làm mới sản phẩm tại cửa hàng.


      `,
  },
];

export const EDIT_PROFILE_FORMAT = [
  {
    id: "fullname",
    name: "fullname",
    label: "Họ và tên",
    placeholder: "Vũ Đinh Trọng Thắng",
    validMsg: "Họ và tên hợp lệ",
    type: "text",
    isFullWidth: false,
    isRequired: true,
    onChangeTriggerValue: "",
    options: [],
    inputMode: "text",
    rules: {
      required: "Họ và tên không được để trống",
      pattern: {
        value: /^[a-zA-ZÀ-ỹ\s]+$/gi,
        message: "Họ và tên không hợp lệ",
      },
      minLength: {
        value: 1,
      },
    },
  },
  {
    id: "phone",
    name: "phone",
    label: "Số điện thoại",
    placeholder: "0987654321",
    validMsg: "Số điện thoại hợp lệ",
    type: "text",
    isFullWidth: false,
    isRequired: true,
    onChangeTriggerValue: "confirm_password",
    options: [],
    inputMode: "tel",
    rules: {
      required: "Số điện thoại không được để trống",
      pattern: {
        value: /(84|0[3|5|7|8|9])+([0-9]{8})\b/g,
        message: "Số điện thoại không hợp lệ",
      },
      minLength: {
        value: 1,
      },
    },
  },
];

export const CHANGE_PASSWORD_FORMAT = [
  {
    id: "password",
    name: "password",
    label: "Mật khẩu",
    placeholder: "",
    validMsg: "Mật khẩu hợp lệ",
    type: "password",
    isFullWidth: false,
    isRequired: true,
    onChangeTriggerValue: "confirm_password",
    options: [],
    inputMode: "text",
    rules: {
      required: "Mật khẩu không được để trống",
      pattern: {
        value:
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/,
        message: "Mật khẩu không hợp lệ",
      },
      minLength: { value: 6, message: "Mật khẩu phải có tối thiểu 6 ký tự" },
    },
  },
  {
    id: "confirm_password",
    name: "confirm_password",
    label: "Nhập lại mật khẩu",
    placeholder: "",
    validMsg: "Mật khẩu nhập lại hợp lệ",
    type: "password",
    isFullWidth: false,
    isRequired: true,
    onChangeTriggerValue: "",
    options: [],
    inputMode: "text",
    rules: {
      required: "Mật khẩu nhập lại không được để trống",
      validate: "Mật khẩu nhập lại không khớp",
    },
  },
];

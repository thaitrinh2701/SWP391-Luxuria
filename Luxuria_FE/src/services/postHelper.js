import axios from "axios";

export async function postSignup(data) {
  const API = import.meta.env.VITE_API_SIGNUP_ENDPOINT;
  const requests = {
    role_id: 2,
    full_name: data.fullname,
    email: data.email,
    phone_number: data.phone,
    password: data.password,
    // address: data.address,
    confirm_password: data.confirm_password,
  };

  try {
    const response = await axios.post(API, requests);
    switch (response.status) {
      case 200:
        return {
          success: true,
          data: response.data,
          message: "Đăng ký thành công!",
        };
      case 400:
        return {
          success: false,
          data: response.data,
          message: "Đăng ký thất bại!",
        };
    }
  } catch (error) {
    return {
      success: false,
      data: null,
      message: "Lỗi kết nối tới máy chủ!",
    };
  }
}

export async function postLogin(data) {
  const API = import.meta.env.VITE_API_LOGIN_ENDPOINT;

  const requests = {
    email: data.email,
    password: data.login_password,
  };

  try {
    const response = await axios.post(API, requests);
    switch (response.status) {
      case 200:
        return {
          success: true,
          data: response.data,
          message: "Đăng nhập thành công!",
        };
      case 400:
        return {
          success: false,
          data: response.data,
          message: "Đăng nhập thất bại!",
        };
    }
  } catch (error) {
    return {
      success: false,
      data: null,
      message: "Lỗi kết nối tới máy chủ!",
    };
  }
}

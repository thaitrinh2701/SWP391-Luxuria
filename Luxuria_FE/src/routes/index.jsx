import { lazy, Suspense } from "react";
import { useRoutes } from "react-router-dom";
import { Loader, ProtectedRoute } from "@components";
import { USER_ROLES } from "@utils/constant";
import ResetPasswordDetail from "@/pages/ResetPasswordDetail";
import EditProfile from "@/pages/EditProfile";
import ChangePassword from "@/pages/ChangePassword";
import { TrangSucDetailForHome } from "@pages/TrangSucDetail";
import ProductManagement from "@/pages/Dashboard/ProductManagement";
import CreateProduct from "@/pages/Dashboard/ProductManagement/CreateProduct";
import UpdateProduct from "@/pages/Dashboard/ProductManagement/UpdateProduct";
import UserManagement from "@/pages/Dashboard/UserManagement";
import CreateUser from "@/pages/Dashboard/UserManagement/CreateUser";
import UpdateUser from "@/pages/Dashboard/UserManagement/UpdateUser";
import Process from "@/pages/Process";

const BlogPostDetail = lazy(() => import("@components/BlogPostDetail"));

//* public components and pages
const Landing = lazy(() => import("@pages/Landing"));
const GiaCong = lazy(() => import("@pages/GiaCong"));
const GiaVang = lazy(() => import("@pages/GiaVang"));
const AboutUs = lazy(() => import("@pages/AboutUs"));
const Blog = lazy(() => import("@pages/Blog"));
const Signup = lazy(() => import("@pages/Signup"));
const Login = lazy(() => import("@pages/Login"));
const TrangSuc = lazy(() => import("@pages/TrangSuc"));
const TrangSucDetail = lazy(() => import("@pages/TrangSucDetail"));
//* miscellaneous
const Unauthorized = lazy(() => import("@pages/Unauthorized"));
const ErrorPage = lazy(() => import("@pages/ErrorPage"));
const ResetPassword = lazy(() => import("@pages/ResetPassword"));
const FaQ = lazy(() => import("@/pages/FAQ"));

const MainPolicy = lazy(() => import("@/pages/MainPolicy"));
const ReturnPolicy = lazy(() => import("@/pages/ReturnPolicy"));
const PrivacyPolicy = lazy(() => import("@/pages/PrivacyPolicy"));

//* protected components and pages
const DonHang = lazy(() => import("@pages/DonHang"));
const MyProfile = lazy(() => import("@pages/MyProfile"));
//* protected components and pages [private]
const Dashboard = lazy(() => import("@pages/Dashboard"));
const YeuCau = lazy(() => import("@pages/YeuCau"));
const OrderDetailSale = lazy(() => import("@components/OrderDetail_Sale"));
const CustomerOrderProductDetail = lazy(() =>
  import("@pages/CustomerOrderProductDetail")
);

export default function Routes() {
  let routes = useRoutes([
    {
      path: "/",
      element: (
        <Suspense fallback={<Loader />}>
          <Landing />
        </Suspense>
      ),
    },
    {
      path: "/trang-suc/:categoryId",
      element: (
        <Suspense fallback={<Loader />}>
          <TrangSuc />
        </Suspense>
      ),
    },
    {
      path: "/trang-suc/ring/:productID",
      element: (
        <Suspense fallback={<Loader />}>
          <TrangSucDetailForHome />
        </Suspense>
      ),
    },
    {
      path: `/trang-suc/:category_id/:id`,
      element: (
        <Suspense fallback={<Loader />}>
          <TrangSucDetail />
        </Suspense>
      ),
    },
    {
      path: "/tin-tuc",
      element: (
        <Suspense fallback={<Loader />}>
          <Blog />
        </Suspense>
      ),
    },
    {
      path: "/gia-cong",
      element: (
        <Suspense fallback={<Loader />}>
          <GiaCong />
        </Suspense>
      ),
    },
    {
      path: "/gia-vang",
      element: (
        <Suspense fallback={<Loader />}>
          <GiaVang />
        </Suspense>
      ),
    },
    {
      path: "/about-us",
      element: (
        <Suspense fallback={<Loader />}>
          <AboutUs />
        </Suspense>
      ),
    },
    {
      path: "/signup",
      element: (
        <Suspense fallback={<Loader />}>
          <Signup />
        </Suspense>
      ),
    },
    {
      path: "/login",
      element: (
        <Suspense fallback={<Loader />}>
          <Login />
        </Suspense>
      ),
    },
    {
      path: "/post/:slug",
      element: (
        <Suspense fallback={<Loader />}>
          <BlogPostDetail />
        </Suspense>
      ),
    },
    {
      path: "/reset-password",
      element: (
        <Suspense fallback={<Loader />}>
          <ResetPassword />
        </Suspense>
      ),
    },
    {
      path: "/reset-password-detail",
      element: (
        <Suspense fallback={<Loader />}>
          <ResetPasswordDetail />
        </Suspense>
      ),
    },
    {
      path: "/faq",
      element: (
        <Suspense fallback={<Loader />}>
          <FaQ />
        </Suspense>
      ),
    },
    {
      path: "/policy",
      element: (
        <Suspense fallback={<Loader />}>
          <MainPolicy />
        </Suspense>
      ),
    },
    {
      path: "/privacy-policy",
      element: (
        <Suspense fallback={<Loader />}>
          <PrivacyPolicy />
        </Suspense>
      ),
    },
    {
      path: "/return-policy",
      element: (
        <Suspense fallback={<Loader />}>
          <ReturnPolicy />
        </Suspense>
      ),
    },
    {
      path: "/my-profile",
      element: (
        <Suspense fallback={<Loader />}>
          <ProtectedRoute
            allowedRoles={[
              USER_ROLES.CUSTOMER,
              USER_ROLES.ADMIN,
              USER_ROLES.SALE_STAFF,
              USER_ROLES.PRODUCTION_STAFF,
              USER_ROLES.DESIGN_STAFF,
              USER_ROLES.MANAGER,
            ]}
          >
            <MyProfile />
          </ProtectedRoute>
        </Suspense>
      ),
    },
    {
      path: "/my-profile/sua-ho-so",
      element: (
        <Suspense fallback={<Loader />}>
          <ProtectedRoute
            allowedRoles={[
              USER_ROLES.CUSTOMER,
              USER_ROLES.ADMIN,
              USER_ROLES.SALE_STAFF,
              USER_ROLES.PRODUCTION_STAFF,
              USER_ROLES.DESIGN_STAFF,
              USER_ROLES.MANAGER,
            ]}
          >
            <EditProfile />
          </ProtectedRoute>
        </Suspense>
      ),
    },
    {
      path: "/my-profile/doi-mat-khau",
      element: (
        <Suspense fallback={<Loader />}>
          <ProtectedRoute
            allowedRoles={[
              USER_ROLES.CUSTOMER,
              USER_ROLES.ADMIN,
              USER_ROLES.SALE_STAFF,
              USER_ROLES.PRODUCTION_STAFF,
              USER_ROLES.DESIGN_STAFF,
              USER_ROLES.MANAGER,
            ]}
          >
            <ChangePassword />
          </ProtectedRoute>
        </Suspense>
      ),
    },
    {
      path: "/don-hang",
      element: (
        <Suspense fallback={<Loader />}>
          <ProtectedRoute
            allowedRoles={[
              USER_ROLES.CUSTOMER,
              USER_ROLES.ADMIN,
              USER_ROLES.SALE_STAFF,
            ]}
          >
            <DonHang />
          </ProtectedRoute>
        </Suspense>
      ),
    },
    {
      path: "/tien-do",
      element: (
        <Suspense fallback={<Loader />}>
          <ProtectedRoute
            allowedRoles={[
              USER_ROLES.MANAGER,
            ]}
          >
            <Process />
          </ProtectedRoute>
        </Suspense>
      ),
    },
    {
      path: "/dashboard",
      element: (
        <Suspense fallback={<Loader />}>
          <ProtectedRoute allowedRoles={[USER_ROLES.ADMIN]}>
            <Dashboard />
          </ProtectedRoute>
        </Suspense>
      ),
    },
    {
      path: "/quan-ly-san-pham",
      element: (
        <Suspense fallback={<Loader />}>
          <ProtectedRoute allowedRoles={[USER_ROLES.ADMIN]}>
            <ProductManagement />
          </ProtectedRoute>
        </Suspense>
      ),
    },
    {
      path: "/cap-nhat-san-pham/:id",
      element: (
        <Suspense fallback={<Loader />}>
          <ProtectedRoute allowedRoles={[USER_ROLES.ADMIN]}>
            <UpdateProduct />
          </ProtectedRoute>
        </Suspense>
      ),
    },
    {
      path: "/tao-san-pham",
      element: (
        <Suspense fallback={<Loader />}>
          <ProtectedRoute allowedRoles={[USER_ROLES.ADMIN]}>
            <CreateProduct />
          </ProtectedRoute>
        </Suspense>
      ),
    },
    {
      path: "/quan-ly-tai-khoan",
      element: (
        <Suspense fallback={<Loader />}>
          <ProtectedRoute allowedRoles={[USER_ROLES.ADMIN]}>
            <UserManagement />
          </ProtectedRoute>
        </Suspense>
      ),
    },
    {
      path: "/cap-nhat-tai-khoan/:id",
      element: (
        <Suspense fallback={<Loader />}>
          <ProtectedRoute allowedRoles={[USER_ROLES.ADMIN]}>
            <UpdateUser />
          </ProtectedRoute>
        </Suspense>
      ),
    },
    {
      path: "/tao-tai-khoan",
      element: (
        <Suspense fallback={<Loader />}>
          <ProtectedRoute allowedRoles={[USER_ROLES.ADMIN]}>
            <CreateUser />
          </ProtectedRoute>
        </Suspense>
      ),
    },
    {
      path: "/yeu-cau",
      element: (
        <Suspense fallback={<Loader />}>
          <ProtectedRoute
            allowedRoles={[
              USER_ROLES.SALE_STAFF,
              USER_ROLES.CUSTOMER,
              USER_ROLES.MANAGER,
              USER_ROLES.DESIGN_STAFF,
              USER_ROLES.PRODUCTION_STAFF,
            ]}
          >
            <YeuCau />
          </ProtectedRoute>
        </Suspense>
      ),
    },
    {
      path: "/tao-don-hang/:requestID",
      element: (
        <Suspense fallback={<Loader />}>
          <ProtectedRoute allowedRoles={[USER_ROLES.SALE_STAFF]}>
            <OrderDetailSale />
          </ProtectedRoute>
        </Suspense>
      ),
    },
    {
      path: "/chi-tiet-don-hang/:orderID",
      element: (
        <Suspense fallback={<Loader />}>
          <CustomerOrderProductDetail />
        </Suspense>
      ),
    },
    {
      path: "/chinh-sua-don-hang/:orderID",
      element: (
        <Suspense fallback={<Loader />}>
          <ProtectedRoute allowedRoles={[USER_ROLES.SALE_STAFF]}>
            <OrderDetailSale />
          </ProtectedRoute>
        </Suspense>
      ),
    },
    {
      path: "/unauthorized",
      element: (
        <Suspense fallback={<Loader />}>
          <Unauthorized />
        </Suspense>
      ),
    },
    {
      path: "*",
      element: (
        <Suspense fallback={<Loader />}>
          <ErrorPage />
        </Suspense>
      ),
    },
  ]);

  return routes;
}

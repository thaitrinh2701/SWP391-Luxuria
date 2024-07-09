import { useEffect, Suspense, useState } from "react";
import { HSStaticMethods } from "preline";
import { Toaster } from "react-hot-toast";
import { CookiesProvider, useCookies } from "react-cookie";
import Routes from "@routes";
import { MainContext } from "@hooks";
import { Loader, Header, Footer, ScrollToTopBtn } from "@components";
import { RoleProvider } from "./hooks/roleProvider";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

function App() {
  useEffect(() => {
    HSStaticMethods.autoInit();
  }, []);

  const [cookies] = useCookies(["user"]);
  const [data, setData] = useState({
    isLogin: cookies.user?.isLogin || false,
  });

  const initialOptions = {
    "client-id":
      "AbgjLfVlhlaANfy9YgVVJuo2FIKDMSppX3RJ_rJlImJPN8aPcfjGeOor8bT8vj8Skilav6HFrhVQAqi-", // Thay thế YOUR_CLIENT_ID bằng Client ID từ PayPal
    currency: "USD",
    intent: "capture",
  };

  return (
    <MainContext.Provider value={{ data, setData }}>
      <PayPalScriptProvider options={initialOptions}>
        <div className="min-h-screen w-full flex flex-col bg-white dark:bg-gray-900 select-none">
          <CookiesProvider defaultSetOptions={{ path: "/" }}>
            <RoleProvider>
              <Header />
              <Toaster />
              <div className="flex flex-col w-full h-full flex-grow flex-1 bg-gray-50 dark:bg-gray-900">
                <Suspense fallback={<Loader />}>
                  <Routes />
                </Suspense>
              </div>
              <Footer />
            </RoleProvider>
          </CookiesProvider>
        </div>
        <ScrollToTopBtn />
      </PayPalScriptProvider>
    </MainContext.Provider>
  );
}

export default App;

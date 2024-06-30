import { useEffect, Suspense, useState } from "react";

import { HSStaticMethods } from "preline";
import { Toaster } from "react-hot-toast";
import { CookiesProvider, useCookies } from "react-cookie";
import Routes from "@routes";
import { MainContext } from "@hooks";
import { Loader, Header, Footer, ScrollToTopBtn } from "@components";
import { RoleProvider } from "./hooks/roleProvider";

function App() {
  useEffect(() => {
    HSStaticMethods.autoInit();
  }, []);

  const [cookies] = useCookies(["user"]);
  const [data, setData] = useState({
    isLogin: cookies.user?.isLogin || false,
  });

  console.log(cookies.user?.isLogin);

  return (
    <MainContext.Provider value={{ data, setData }}>
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
    </MainContext.Provider>
  );
}

export default App;
import { useCallback, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { EmptyState, Toast, Card, Loader } from "@components";
import TableInfo from "./TableInfo";
import Modals from "./Modals";
import { getDashboardDatas } from "@services";
import HSOverlay from "@preline/overlay";
import { Sidebar } from "@components";

function Process() {
  const MinimizeData = [];
  const [data, setData] = useState();
  const [modalData, setModalData] = useState(null);
  const [cookies] = useCookies(["token"]);

  const getDatas = useCallback(async () => {
    let response = await getDashboardDatas(cookies.token);
    switch (response.success) {
      case false:
        switch (response.data) {
          case null:
            Toast("dashboard_err", "error", response.message);
            break;
          default:
            Toast("dashboard_warn", "warning", response.message);
            break;
        }
        setData(response);
        break;
      case true:
        Toast("dashboard_success", "success", response.message);
        setData(response);
        break;
    }
  }, [cookies.token]);

  const handleButtonClick = (data) => {
    setModalData(data);
    HSOverlay.open("#info-modal");
  };

  useEffect(() => {
    Toast("dashboard_info", "info", "Đang lấy thông tin...");
    getDatas();
  }, [getDatas]);

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-auto">
        {data !== undefined ? (
          <div className="p-4 sm:p-6 space-y-4 sm:space-y-6 mt-[4.5rem]">
            {MinimizeData.length > 0 && (
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {MinimizeData?.map((data, index) => (
                  <Card
                    key={index}
                    title={data.title}
                    value={data.value || 0}
                    previousValue={data.previousValue}
                    isTooltip={data.isTooltip}
                    tooltipMsg={data.tooltipMsg}
                  />
                ))}
              </div>
            )}
            {data.table !== undefined ? (
              <div className="flex flex-col">
                <div className="-m-1.5 overflow-x-auto">
                  <div className="p-1.5 min-w-full inline-block align-middle">
                    <TableInfo
                      title={"Đơn hàng"}
                      data={data.table}
                      onButtonClick={handleButtonClick}
                    />
                  </div>
                </div>
              </div>
            ) : (
              <EmptyState />
            )}
          </div>
        ) : (
          <Loader />
        )}
      </div>
      <Modals modalData={modalData} />
    </div>
  );
}

export default Process;

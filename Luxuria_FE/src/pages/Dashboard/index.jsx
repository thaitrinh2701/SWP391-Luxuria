import { useCallback, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { EmptyState, Toast, Card, Loader } from "@components";
import ChartInfo from "./ChartInfo";
import TableInfo from "./TableInfo";
import Modals from "./Modals";
import Sidebar from "./Sidebar";
import { getDashboardDatas } from "@services";
import HSOverlay from "@preline/overlay";

function Dashboard() {
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
    // Open the modal
    HSOverlay.open("#info-modal");
  };
  const base64Data =
    modalData && modalData.productImages && modalData.productImages[0]?.value // Optional chaining here
      ? modalData.productImages[0].value
      : null;
  const logo = base64Data ? `data:image/jpeg;base64,${base64Data}` : "";
  const imageUrls =
    modalData && modalData.productImages
      ? modalData.productImages.map(
          (image) => `data:image/jpeg;base64,${image.value}`
        )
      : [];

  useEffect(() => {
    Toast("dashboard_info", "info", "Đang lấy thông tin...");
    getDatas();
  }, [getDatas]);

  return (
    <>
      <Sidebar />
      {data !== undefined ? (
        <div className="w-full lg:ps-64">
          <div className="p-4 sm:p-6 space-y-4 sm:space-y-6 mt-[4.5rem]">
            {data !== undefined ? (
              <>
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

                {data.chart !== undefined ? (
                  <div className="grid lg:grid-cols-2 gap-4 sm:gap-6">
                    {data.chart?.map((chart, index) => (
                      <ChartInfo key={index} id={data.id} data={chart} />
                    ))}
                  </div>
                ) : (
                  <EmptyState />
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
              </>
            ) : (
              <EmptyState />
            )}
          </div>
        </div>
      ) : (
        <Loader />
      )}
      <Modals modalData={modalData} />
    </>
  );
}

export default Dashboard;

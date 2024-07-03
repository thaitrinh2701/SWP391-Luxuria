import Chart from "react-apexcharts";
import { StatusIcon, EmptyState } from "@components";

function ChartInfo({ id, data, previousData }) {
  return (
    <div className="p-4 md:p-5 min-h-[410px] flex flex-col bg-white border shadow-sm rounded-xl dark:bg-gray-800 dark:border-gray-700 gap-y-4 dark:text-white">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-sm text-gray-500 dark:text-gray-500">
            {data.title || ""}
          </h2>
          <p className="text-xl sm:text-2xl font-medium text-gray-800 dark:text-gray-200">
            {data.totalValue || ""}
          </p>
        </div>

        {previousData && <StatusIcon />}
      </div>

      {data !== undefined ? (
        <div id={id}>
          <Chart
            className="ms-0.5 mb-2 bg-white border border-gray-200 text-gray-800 rounded-lg shadow-md dark:bg-gray-800/30 dark:border-gray-700 dark:text-white"
            options={{
              chart: {
                toolbar: { show: false },
                zoom: { enabled: false },
                animations: { speed: 200 },
              },
              grid: {
                show: false,
                strokeDashArray: 5,
                yaxis: {
                  lines: { show: true },
                },
                xaxis: {
                  lines: { show: false },
                },
              },
              plotOptions: {
                bar: {
                  horizontal: false,
                  columnWidth: "55%",
                  borderRadius: 2,
                  endingShape: "rounded",
                  distributed: true,
                },
              },
              stroke: {
                show: true,
                width: data.type === "area" ? 5 : 2,
                curve: "smooth",
                colors: ["transparent"],
              },
              legend: { show: false },
              dataLabels: { enabled: false },
              colors: ["#2563eb", "#d1d5db"],
              fill: {
                opacity: 1,
                type: data.type === "area" ? "gradient" : "solid",
                gradient: {
                  type: "vertical",
                  shadeIntensity: 1,
                  opacityFrom: 0.98,
                  opacityTo: 1,
                },
              },
              title: {
                style: {
                  fontSize: "0.875rem",
                  lineHeight: "1.25rem",
                  fontWeight: "600",
                  fontFamily: "Be Vietnam Pro",
                  color: "#1F2937",
                  border: "none",
                  borderColor: "#E5E7EB",
                },
              },
              xaxis: {
                type: "category",
                tickPlacement: "on",
                categories: data.categories,
                axisBorder: { show: false },
                axisTicks: { show: false },
                crosshairs: { show: false },
                tooltip: { enabled: false },
                style: {
                  colors: "#A3AED0",
                  fontSize: "14px",
                  fontWeight: "500",
                },
                labels: {
                  style: {
                    color: "#9ca3af",
                    fontSize: "13px",
                    fontFamily: "Be Vietnam Pro",
                    fontWeight: 400,
                  },
                  offsetX: -2,
                  title: {
                    text: "",
                  },
                },
              },
              yaxis: {
                title: {
                  text: data.yText || "",
                  style: {
                    color: "#1f2937",
                    fontSize: "13px",
                    fontFamily: "Be Vietnam Pro",
                    fontWeight: 400,
                  },
                },
                lables: {
                  align: "left",
                  minWidth: 0,
                  maxWidth: 140,
                  style: {
                    colors: "#9ca3af",
                    fontSize: "13px",
                    fontFamily: "Be Vietnam Pro",
                    fontWeight: 400,
                  },
                  formatter: (value) => {
                    return value >= 1000 ? `$ ${value / 1000}k` : value;
                  },
                },
              },
              states: {
                hover: {
                  filter: {
                    type: "darken",
                    value: 0.9,
                  },
                },
              },
              tooltip: {
                theme: "dark",
                x: {
                  format: "MMMM yyyy",
                },
                y: {
                  formatter: function (val) {
                    return data.type === "area"
                      ? new Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(val)
                      : val;
                  },
                  onDatasetHover: {
                    style: {
                      fontSize: "12px",
                      fontFamily: "Be Vietnam Pro",
                    },
                  },
                },
              },
              responsive: [
                {
                  breakpoint: 568,
                  options: {
                    chart: {
                      height: 300,
                    },
                    plotOptions: {
                      bar: {
                        columnWidth: "14px",
                      },
                      stroke: {
                        width: 8,
                      },
                    },
                    labels: {
                      style: {
                        colors: "#9ca3af",
                        fontSize: "11px",
                        fontFamily: "Be Vietnam Pro",
                        fontWeight: 400,
                      },
                      offsetX: -2,
                      // formatter: (title) => title.slice(0, 3),
                    },
                    yaxis: {
                      labels: {
                        align: "left",
                        minWidth: 0,
                        maxWidth: 140,
                        style: {
                          colors: "#9ca3af",
                          fontSize: "11px",
                          fontFamily: "Be Vietnam Pro",
                          fontWeight: 400,
                        },
                        formatter: (value) =>
                          value >= 1000 ? `${value / 1000}k` : value,
                      },
                    },
                  },
                },
              ],
            }}
            series={data.series}
            type={data.type}
            height={300}
          />
        </div>
      ) : (
        <EmptyState />
      )}
    </div>
  );
}

export default ChartInfo;

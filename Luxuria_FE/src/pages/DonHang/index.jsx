import { Tabs, Sidebar } from "@components";
function DonHang() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[auto,1fr] gap-10 ">
      <Sidebar />
      <div className="px-10 py-6 bg-white flex flex-col mt-1 w-full md:w-[100%] dark:bg-[#111827] mt-3">
        <div className="mt-5 h-full">
          <Tabs />
        </div>
      </div>
    </div>
  );
}

export default DonHang;

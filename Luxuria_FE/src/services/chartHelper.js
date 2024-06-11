export const getOrdersRevenueAndProductChartDatas = (data) => {
  let _categories = [];
  let _totalRevenue = [0];
  let _totalOrdersPriod = [0];
  let _totalOrders = 0;
  let _totalPrice = 0;
  let _count = -1; //! start from -1 to get first date

  let prevDate = new Date("1999-12-31");
  data.map((item) => {
    if (item.orderCreatedAt !== undefined) {
      let orderDate = item.orderCreatedAt.split("T")[0];
      let date = new Date(orderDate);
      //! if orderDate not equal to current date (nextdate != current date)
      if (date.getTime() !== prevDate.getTime()) {
        date = date.toLocaleDateString("vi-VN", {
          month: "2-digit",
          day: "2-digit",
        });
        _categories.push(date);
        prevDate = new Date(orderDate);
        _count++; //! increase count to get next date and jump to next index of totalPrice
      }
      //! if product id valid, then have product total price
      if (item.product?.id !== undefined) {
        _totalPrice += Number(item.product?.totalPrice) || 0;
        _totalOrders++;
        _totalRevenue[_count] =
          (_totalRevenue[_count] !== undefined ? _totalRevenue[_count] : 0) +
          (item.product?.totalPrice !== undefined
            ? Number(item.product?.totalPrice)
            : 0);
        _totalOrdersPriod[_count] =
          (_totalOrdersPriod[_count] !== undefined
            ? _totalOrdersPriod[_count]
            : 0) + (item.product?.totalPrice !== undefined ? 1 : 0);
      }
    }
  });
  return [
    {
      id: "product-chart",
      type: "bar",
      title: "Số lượng đơn hàng",
      yText: "đơn hàng",
      totalValue: _totalOrders,
      categories: _categories,
      series: [
        {
          name: "Đơn hàng",
          data: _totalOrdersPriod,
        },
      ],
    },
    {
      id: "revenue-chart",
      type: "area",
      title: "Tổng doanh thu",
      yText: "VND",
      totalValue: new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(_totalPrice),
      categories: _categories,
      series: [
        {
          name: "Doanh thu",
          data: _totalRevenue,
        },
      ],
    },
  ];
};

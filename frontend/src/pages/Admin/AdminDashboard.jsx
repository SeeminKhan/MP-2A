import Chart from "react-apexcharts";
import { useGetUsersQuery } from "../../redux/api/usersApiSlice";
import {
  useGetTotalOrdersQuery,
  useGetTotalSalesByDateQuery,
  useGetTotalSalesQuery,
} from "../../redux/api/orderApiSlice";

import { useState, useEffect } from "react";
import Loader from "../../components/Loader";

const AdminDashboard = () => {
  const { data: sales, isLoading: loadingSales } = useGetTotalSalesQuery();
  const { data: customers, isLoading: loadingCustomers } = useGetUsersQuery();
  const { data: orders, isLoading: loadingOrders } = useGetTotalOrdersQuery();
  const { data: salesDetail } = useGetTotalSalesByDateQuery();

  const [state, setState] = useState({
    options: {
      chart: {
        type: "line",
        toolbar: {
          show: false,
        },
      },
      tooltip: {
        theme: "dark",
      },
      colors: ["#00E396"],
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
        width: 2,
      },
      title: {
        text: "Sales Trend",
        align: "left",
        style: {
          fontSize: "20px",
          fontWeight: "bold",
          color: "#333",
        },
      },
      grid: {
        borderColor: "#f1f1f1",
      },
      xaxis: {
        categories: [],
        title: {
          text: "Date",
        },
      },
      yaxis: {
        title: {
          text: "Sales",
        },
        min: 0,
      },
    },
    series: [{ name: "Sales", data: [] }],
  });

  useEffect(() => {
    if (salesDetail) {
      const formattedSalesDate = salesDetail.map((item) => ({
        x: item._id,
        y: item.totalSales,
      }));

      setState((prevState) => ({
        ...prevState,
        options: {
          ...prevState.options,
          xaxis: {
            categories: formattedSalesDate.map((item) => item.x),
          },
        },
        series: [{ name: "Sales", data: formattedSalesDate.map((item) => item.y) }],
      }));
    }
  }, [salesDetail]);

  return (
    <>
      <section className="mt-12 sm:mt-6 md:mt-[80px] lg:mt-[92px] p-4">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="lg:w-1/3 w-full flex flex-col gap-4">
            <div className="rounded-lg bg-gradient-to-r from-gray-800 to-gray-900 p-5 shadow-lg flex items-center">
              <div className="font-bold rounded-full w-[3rem] bg-stone-500 text-center p-3">
                $
              </div>
              <div className="ml-4">
                <p className="text-gray-300">Sales</p>
                <h1 className="text-2xl font-bold text-white">
                  {loadingSales ? <Loader /> : `₹ ${sales.totalSales.toFixed(2)}`}
                </h1>
              </div>
            </div>
            <div className="rounded-lg bg-gradient-to-r from-gray-800 to-gray-900 p-5 shadow-lg flex items-center">
              <div className="font-bold rounded-full w-[3rem] bg-stone-500 text-center p-3">
                👥
              </div>
              <div className="ml-4">
                <p className="text-gray-300">Customers</p>
                <h1 className="text-2xl font-bold text-white">
                  {loadingCustomers ? <Loader /> : customers?.length}
                </h1>
              </div>
            </div>
            <div className="rounded-lg bg-gradient-to-r from-gray-800 to-gray-900 p-5 shadow-lg flex items-center">
              <div className="font-bold rounded-full w-[3rem] bg-stone-500 text-center p-3">
                📦
              </div>
              <div className="ml-4">
                <p className="text-gray-300">All Orders</p>
                <h1 className="text-2xl font-bold text-white">
                  {loadingOrders ? <Loader /> : orders?.totalOrders}
                </h1>
              </div>
            </div>
          </div>
          <div className="lg:w-2/3 w-full">
            <Chart
              options={state.options}
              series={state.series}
              type="line"
              width="100%"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default AdminDashboard;

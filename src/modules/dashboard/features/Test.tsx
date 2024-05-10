import SearchSpecific from "@src/modules/shared/components/SearchSpecific/SearchSpecific";
import MyChartComponent from "../components/axis_labels/AxisLabel";
import StaticCircle from "../components/circle_statistic/CirecleStatic";
import LineChart from "../components/line_chart/Line_chart";
import { useMyStoresQuery } from "@src/modules/bookStores/service/storeApi";
import { DatePicker, Space } from "antd";
const { RangePicker } = DatePicker;
import { useState } from "react";
import StaticCard from "../components/statistic_card/Static_card";
import HighchartCard from "../components/Reduction/Reduction";
const statusData = [
  { name: "Done", percentage: 10, color: "#5BBCFF" },
  { name: "In Progress", percentage: 70, color: "#FFD1E3" },
  { name: "Completed", percentage: 20, color: "#FFFAB7" },
];
const data = [43, 30, 12, 10]; // Example data

export default function Dashboard() {
  const [selectedStore, setSelectedStore] = useState<string>();

  const { data: fetechedMyStores } = useMyStoresQuery();
  const MyStores = fetechedMyStores?.data?.docs;
  const stores_options = MyStores?.map((product: any) => ({
    label: product.name,
    value: product.id,
  }));

  const handleSelectChange = (value: any) => {
    setSelectedStore(value);
    console.log(selectedStore);
  };
  const optionsOfBooksSelling = {
    chart: {
      type: "bar",
    },
    title: {
      text: "Best-selling books",
    },
    xAxis: {
      categories: ["book1", "Book2", "Book3"], // Example categories
    },
    yAxis: {
      title: {
        text: "Values",
      },
    },
    series: [
      {
        data: [10, 20, 30], // Example data
      },
    ],
  };

  const optionsOfStoresSelling = {
    chart: {
      type: "bar",
    },
    title: {
      text: "Best-selling stores",
    },
    xAxis: {
      categories: ["Store1", "Store2", "Store3", "BLUESTORE", "best store"], // Example categories
    },
    yAxis: {
      title: {
        text: "Values",
      },
    },
    series: [
      {
        data: [9, 6, 1, 5, 7], // Example data
      },
    ],
  };

  return (
    <div className="Product-List">
      <h1>Dashboard</h1>
      <div className="container-analytic">
        <div className="vendor-analytic">
          <h1 className="title-analytic">Vendor Analytic</h1>
          <div className="static-card">
            <StaticCard
              numberOfStores={122}
              numberOfProducts={11}
              numberOfOrders={11}
            />
          </div>
          <HighchartCard reductionNumber={17} />

          <LineChart data={data} />
          <MyChartComponent options={optionsOfStoresSelling} />
        </div>

        <div className="store-analytic">
          <h1 className="title-analytic">Store Analytic</h1>
          <div className="params-store">
            <SearchSpecific
              options={stores_options}
              onChange={(value) => handleSelectChange(value)}
              placeHolder="Select Store"
            />
            <Space direction="vertical" size={12}>
              <RangePicker />
            </Space>
          </div>

          <MyChartComponent options={optionsOfBooksSelling} />
          <StaticCircle data={statusData} />
        </div>
      </div>
    </div>
  );
}

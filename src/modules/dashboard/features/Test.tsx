// Import necessary components and functions
import  { useState } from "react";
import { DatePicker, Space } from "antd";
import SearchSpecific from "@src/modules/shared/components/SearchSpecific/SearchSpecific";
import MyChartComponent from "../components/axis_labels/AxisLabel";
import StaticCircle from "../components/circle_statistic/CirecleStatic";
import LineChart from "../components/line_chart/Line_chart";
import StaticCard from "../components/statistic_card/Static_card";
import { useMyStoresQuery } from "@src/modules/bookStores/service/storeApi";
import Papa from "papaparse";

// Destructure RangePicker from DatePicker
const { RangePicker } = DatePicker;

// Define your component
export default function Dashboard() {
  const [_selectedStore, setSelectedStore] = useState<string>();
  const [_selectedDateVendor, setSelectedDateVendor] = useState<any[]>([]);
  const [_selectedDateShop, setSelectedDateShop] = useState<any[]>([]);
  const [csvData, setCsvData] = useState("");

  const { data: fetechedMyStores } = useMyStoresQuery();
  const MyStores = fetechedMyStores?.data?.docs;
  const stores_options = MyStores?.map((product: any) => ({
    label: product.name,
    value: product.id,
  }));

  const handleSelectChange = (value: any) => {
    setSelectedStore(value);
  };

  const handleVendorDateRangeChange = (_dates: any, dateStrings: [string, string]) => {
    setSelectedDateVendor(dateStrings);
  };

  const handleShopDateRangeChange = (_dates: any, dateStrings: [string, string]) => {
    setSelectedDateShop(dateStrings);
  };

  const generateCSV = () => {
    const csv = Papa.unparse({
      fields: ["Category", "Value" , "yes"],
      data: [
        ["Category 1", 10 , 5],
        ["Category 2", 20 , 5],
        // Add more data based on your dashboard
      ],
    });
    setCsvData(csv);
  };

  return (
    <div className="Product-List">
      <div className="header-analytics">
        <h1>Dashboard</h1>
        <a onClick={generateCSV} className="add-cat" href={`data:text/csv;charset=utf-8,${encodeURIComponent(csvData)}`} download="dashboard_data.csv">
          Download CSV
        </a> 
      </div>
      <div className="container-analytic">
        <div className="vendor-analytic">
          <h1 className="title-analytic">Vendor Analytic</h1>
          <Space direction="vertical" size={12}>
            <RangePicker onChange={handleVendorDateRangeChange} />
          </Space>
          <div className="static-card">
            <StaticCard
              numberOfStores={122}
              numberOfProducts={11}
              numberOfOrders={11}
            />
          </div>
          <LineChart data={[43, 30, 12, 10]} />
          <MyChartComponent options={{/* your options */}} />
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
              <RangePicker onChange={handleShopDateRangeChange} />
            </Space>
          </div>
          <MyChartComponent options={{/* your options */}} />
          <StaticCircle
            data={[
              { name: "Done", percentage: 22, color: "#DFF6FF" },
              { name: "In Progress", percentage: 30, color: "#3d6d6f" },
              { name: "Completed", percentage: 28, color: "#06283D" },
              { name: "Canceled", percentage: 20, color: "#5F5D9C" },
            ]}
          />
        </div>
      </div>
      {/* Or use this to create a download link */}
   
    </div>
  );
}


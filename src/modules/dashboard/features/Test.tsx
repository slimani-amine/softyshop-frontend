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
import Amount from "../components/amount/Amount";

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
      fields: ["vendor-periode","Total savings" ,  "Number Of Products" , "Number Of Orders" , "Number Of Stores" , "Top Store sellings"],
      data: [
        [`${_selectedDateVendor}`,Statics.StoreProfits, Statics.NumberOfProducts , Statics.NumberOfOrders , Statics.NumberOfStores , optionsOfStoresSelling.xAxis.categories[0]],
        // Add more data based on your dashboard
      ],
    });
    setCsvData(csv);
  };

  const generateCSVStore = () => {
    const csv = Papa.unparse({
      fields: ["store-periode","Total Profits", "Number of Total orders" , "In process percentage" , "Delivred Percentage" , "Cancled Percentage" , "completed Percecntage" , "Top Book selling" ],
      data: [
        [`${_selectedDateShop}`,Statics.StoreProfits ,  Statics.NumberOfProducts , Statics.NumberOfOrders , Statics.NumberOfStores , ordersStatics[0].percentage,ordersStatics[2].percentage,ordersStatics[2].percentage,ordersStatics[3].percentage , optionsOfBooksSelling.xAxis.categories[0]],
        // Add more data based on your dashboard
      ],
    });
    setCsvData(csv);
  };
  //store statics
  const Statics = {NumberOfProducts:1033 , NumberOfStores:23, NumberOfOrders:431 ,StoreProfits:3243}
  const optionsOfBooksSelling = {
    chart: {
        type: "bar",
    },
    title: {
        text: "Best-selling books",
    },
    xAxis: {
        categories: [
            "The Great Gatsby",
            "To Kill a Mockingbird",
            "1984",
            "Pride and Prejudice",
            "The Catcher in the Rye",
            "Lord of the Flies",
            "Brave New World",
            "The Grapes of Wrath"
        ], // Fictional book names in descending order
    },
    yAxis: {
        title: {
            text: "Number of Copies Sold",
        },
    },
    series: [
        {
            name: "Copies Sold",
            data: [250000, 200000, 180000, 150000, 120000, 100000, 90000, 80000], // Example data in descending order
        },
    ],
};
const ordersStatics=[
  { name: "Done", percentage: 22, color: "#DFF6FF" },
  { name: "In Progress", percentage: 30, color: "#3d6d6f" },
  { name: "Completed", percentage: 28, color: "#06283D" },
  { name: "Canceled", percentage: 20, color: "#5F5D9C" },
]


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
      <div className="header-analytics">
        <h1>Dashboard</h1>
        <div className="header-csv">
          <a onClick={generateCSV} className="add-cat" href={`data:text/csv;charset=utf-8,${encodeURIComponent(csvData)}`} download="dashboard_data.csv">
            Export Vendor CSV 
          </a> 
          <a onClick={generateCSVStore} className="add-cat" href={`data:text/csv;charset=utf-8,${encodeURIComponent(csvData)}`} download="dashboard_data.csv">
            Export Store CSV 
          </a> 
        </div>
      </div>
      <div className="container-analytic">
        <div className="vendor-analytic">
          <h1 className="title-analytic">Vendor Analytic</h1>
          <Space direction="vertical" size={12}>
            <RangePicker onChange={handleVendorDateRangeChange} />
          </Space>
          <div className="static-card">
            <StaticCard
              numberOfStores={Statics.NumberOfStores}
              numberOfProducts={Statics.NumberOfProducts}
              numberOfOrders={Statics.NumberOfOrders}
            />
            
          </div>
          <div className="center">
            <h1>My Savings</h1>
            <Amount amount={Statics.StoreProfits}/>
          </div>
          
          <LineChart data={[43, 30, 12, 10]} />
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
              <RangePicker onChange={handleShopDateRangeChange} />
            </Space>
          </div>
          <div className="center">
            <h1>Store profits</h1>
            <Amount amount={2072}/>
          </div>
          <MyChartComponent options={optionsOfBooksSelling} />
          <StaticCircle
            data={ordersStatics}
          />
        </div>
      </div>
      {/* Or use this to create a download link */}
   
    </div>
  );
}


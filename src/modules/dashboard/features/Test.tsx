// Import necessary components and functions
import  { useState } from "react";
import { DatePicker, Space } from "antd";
import MyChartComponent from "../components/axis_labels/AxisLabel";
import StaticCircle from "../components/circle_statistic/CirecleStatic";
import LineChart from "../components/line_chart/Line_chart";
import StaticCard from "../components/statistic_card/Static_card";
//import { useMyStoresQuery } from "@src/modules/bookStores/service/storeApi";
import { useAnalyticsQuery } from "../service/analyticsApi";
import Papa from "papaparse";
import Amount from "../components/amount/Amount";

// Destructure RangePicker from DatePicker
const { RangePicker } = DatePicker;

// Define your component
export default function Dashboard() {
  const [_selectedStore] = useState<string>();
  const [_selectedDateVendor, setSelectedDateVendor] = useState<any[]>([]);
  const [_selectedDateShop] = useState<any[]>([]);
  const [csvData, setCsvData] = useState("");


  /*const { data: fetechedMyStores } = useMyStoresQuery();
  const MyStores = fetechedMyStores?.data?.docs;
  const stores_options = MyStores?.map((product: any) => ({
    label: product.name,
    value: product.id,
  }));*/


  const {data : fetchedAnalytics} = useAnalyticsQuery({
    StartDate : _selectedDateVendor[0],
    EndDate : _selectedDateVendor[1]

  })
  // Extract data and storeSelling using optional chaining
  const data = fetchedAnalytics?.data?.result;
  const originalStoreSelling = data?.optionsOfStoresSelling;

  const names = originalStoreSelling?.map((store:any) => store.name);

// Extract numbers array
  const numbers = originalStoreSelling?.map((store:any) => store.numberOfOrders);
// percentage of orders 
const colors = ["#DFF6FF" , "#3d6d6f" ,"#3d6d6f","#5F5D9C"  ]
const ordersStatics=[
  { name: "delivred", percentage: 1, color: "#DFF6FF" },
  { name: "In Progress", percentage: 30, color: "#3d6d6f" },
  { name: "Completed", percentage: 28, color: "#06283D" },
  { name: "Canceled", percentage: 20, color: "#5F5D9C" },
]

console.log(data?.orderStatusPercentages, 'okkki')
const ordersPercentage = data?.orderStatusPercentages?.map((order:any , index: any) => ({
  name: order.name,
  percentage: order.percentage,
  color : colors[index]
  
}));
console.log(ordersPercentage , 'iiiiiiiiiii')

console.log(data, 'efezfzefzefezf')
console.log(ordersStatics,'orders')

  
  
  

  /*const handleSelectChange = (value: any) => {
    setSelectedStore(value);
  };*/

  const handleVendorDateRangeChange = (_dates: any, dateStrings: [string, string]) => {
    setSelectedDateVendor(dateStrings);
  };

 /* const handleShopDateRangeChange = (_dates: any, dateStrings: [string, string]) => {
    setSelectedDateShop(dateStrings);
  };*/

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
  const Statics = {NumberOfProducts:data?.numberOfProducts, NumberOfStores:data?.numberOfStores, NumberOfOrders:data?.numberofOrders,StoreProfits:data?.StoreProfits}

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



  const optionsOfStoresSelling = {
    chart: {
      type: "bar",
    },
    title: {
      text: "Best-selling stores",
    },
    xAxis: {
      categories: names, // Example categories
    },
    yAxis: {
      title: {
        text: "Values",
      },
    },
    series: [
      {
        data: numbers, // Example data
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
        </div>

        <div className="store-analytic">
        
        <MyChartComponent options={optionsOfStoresSelling} />
          <StaticCircle
            data={ordersPercentage}
          />
        </div>
      </div>
      {/* Or use this to create a download link */}
   
    </div>
  );
}


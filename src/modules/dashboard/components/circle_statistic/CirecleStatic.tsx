import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";

const StatusPieChart = ({ data }: any) => {
  // Create an array of data points for the pie chart
  const seriesData = data?.map(
    (status: { name: any; percentage: any; color: any }) => ({
      name: status.name,
      y: status.percentage,
      color: status.color, // Each status can have a different color
    }),
  );

  const options = {
    chart: {
      type: "pie",
    },
    title: {
      text: "Percentage of orders",
    },
    tooltip: {
      pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>",
    },
    plotOptions: {
      pie: {
        dataLabels: {
          enabled: false,
        },
        startAngle: 0,
        endAngle: 360,
        center: ["50%", "50%"],
        size: "100%",
        innerSize: "0%",
      },
    },
    series: [
      {
        name: "Status",
        data: seriesData,
      },
    ],
  };

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default StatusPieChart;

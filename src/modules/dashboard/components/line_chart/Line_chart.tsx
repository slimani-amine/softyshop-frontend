import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";

const LineChart = ({ data }: any) => {
  const options = {
    chart: {
      type: "line",
    },
    title: {
      text: "Profit curve",
    },
    series: [
      {
        data: data,
      },
    ],
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default LineChart;

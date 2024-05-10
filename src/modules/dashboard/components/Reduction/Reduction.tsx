import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import { Card } from "antd";

const HighchartCard = ({ reductionNumber }: any) => {
  const options = {
    // Highcharts options configuration here
    // Example options:
    chart: {
      type: "column",
    },
    title: {
      text: "Reduction Chart",
    },
    series: [
      {
        name: "Reduction",
        data: [reductionNumber],
      },
    ],
  };

  return (
    <Card>
      <HighchartsReact highcharts={Highcharts} options={options} />
      <div style={{ color: "green", fontSize: "20px" }}>
        {reductionNumber} % Reduction
      </div>
    </Card>
  );
};

export default HighchartCard;

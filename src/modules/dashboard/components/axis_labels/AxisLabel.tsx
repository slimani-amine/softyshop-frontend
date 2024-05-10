import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";

interface MyChartComponentProps {
  options: any;
}

const MyChartComponent: React.FC<MyChartComponentProps> = ({
  options,
}: any) => {
  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default MyChartComponent;

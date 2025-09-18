import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";
import { investments } from "../api/authApi";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
);

interface InvestmentChartsProps {
  response: (investments: any) => void;
}

const InvestmentCharts = ({ response }: InvestmentChartsProps) => {
  // const [distributionData, setDistributionData] = useState<any>(null);
  const [trendData, setTrendData] = useState(null);

  useEffect(() => {
    const fetchInvestments = async () => {
      const { data } = await investments();
      setTrendData(data.trendChart);
      // setDistributionData(data.distributionChart);
      response(data.investments);
    };
    fetchInvestments();
  }, []);

  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* {distributionData && (
        <div className="bg-white p-4 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-2">Investment Distribution</h2>
          <Pie data={distributionData} />
        </div>
      )} */}
      {trendData && (
        <div className="bg-white p-4 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-2">Investment Trend</h2>
          <Line data={trendData} />
        </div>
      )}
    </div>
  );
};

export default InvestmentCharts;

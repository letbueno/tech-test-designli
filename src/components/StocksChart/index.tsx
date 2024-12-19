import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useStockContext } from "../../contexts/stockContext";
import { Box, Typography } from "@mui/material";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const StocksChart: React.FC = () => {
  const { storedStocks } = useStockContext();
  const chartData = {
    labels: storedStocks.map((stock) => stock.s),
    datasets: [
      {
        label: "Stock Prices (USD)",
        data: storedStocks.map((stock) => stock.p),
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderWidth: 2,
        fontWeight: 600,
        tension: 0.2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top" as const,
      },
      title: {
        display: false,
        text: "Stockx Prices in USD",
      },
    },
  };

  return (
    <Box sx={{ mt: 6, mb: 6, width: "100%" }} alignSelf={"center"}>
      <Typography variant="h4" color="text.primary">
        Stocks Price in USD
      </Typography>
      <Line data={chartData} options={chartOptions} />
    </Box>
  );
};

export default StocksChart;

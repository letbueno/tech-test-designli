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
import { blue } from "@mui/material/colors";

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
        borderColor: blue[200],
        backgroundColor: `${blue[200]}33`,
        borderWidth: 2,
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
        labels: {
          color: "white",
        },
      },
      title: {
        display: false,
      },
    },
    scales: {
      x: {
        ticks: {
          color: "white",
        },
      },
      y: {
        ticks: {
          color: "white",
        },
      },
    },
  };

  return (
    <Box sx={{ mt: 6, mb: 6, width: "100%" }} alignSelf={"center"}>
      <Typography variant="h4" color="text.primary">
        Stock Prices in USD
      </Typography>
      <Line
        data={chartData}
        options={chartOptions}
        data-testid="chartjs-line-chart"
      />
    </Box>
  );
};

export default StocksChart;

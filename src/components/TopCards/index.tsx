import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";

import { useStockContext } from "../../assets/contexts/stockContext";

type TopCardProps = {
  name: string;
  currentPrice: number;
  priceAlert: number;
  percentageChange: number;
};

const TopCard: React.FC<TopCardProps> = ({
  name,
  currentPrice,
  priceAlert,
  percentageChange,
}) => {
  const textColor = currentPrice >= priceAlert ? "green" : "red";
  const percentageChangeColor = percentageChange >= 0 ? "green" : "red";

  return (
    <Card sx={{ boxShadow: 3, maxWidth: 300 }}>
      <CardContent>
        <Typography variant="subtitle1" color="text.primary">
          {name}
        </Typography>
        <Typography variant="h6" sx={{ color: textColor }}>
          {currentPrice.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
        </Typography>
        <Typography variant="subtitle2" sx={{ color: percentageChangeColor }}>
          {percentageChange >= 0 ? "+" : ""}
          {percentageChange.toFixed(2)}%
        </Typography>
      </CardContent>
    </Card>
  );
};

const TopCards: React.FC = () => {
  const { storedStocks, stockAlerts } = useStockContext();

  return (
    <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
      {storedStocks.map((stock) => {
        const priceAlert =
          stockAlerts.find(({ symbol: s }) => s === stock.s)?.priceAlert || 0;
        return (
          <Grid size={3} key={stock.s}>
            <TopCard
              key={stock.s}
              name={stock.s}
              currentPrice={stock.p}
              priceAlert={Number(priceAlert)}
              percentageChange={stock.v}
            />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default TopCards;

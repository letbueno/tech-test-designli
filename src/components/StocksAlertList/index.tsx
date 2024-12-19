import React from "react";
import { Box, Button, List, ListItem } from "@mui/material";
import { useStockContext } from "../../contexts/stockContext";

const StocksAlertList: React.FC = () => {
  const { stockAlerts, setStockAlerts } = useStockContext();

  const handleRemoveAlert = (stock: string) => {
    const newStockAlerts = stockAlerts.filter(
      (alert) => alert.symbol !== stock
    );
    setStockAlerts(newStockAlerts);
    localStorage.setItem("stockAlerts", JSON.stringify(newStockAlerts));
  };

  return (
    <Box>
      <h3>Existing Alerts:</h3>
      <List sx={{ padding: 0 }}>
        {stockAlerts.map((alert) => (
          <ListItem
            key={alert.symbol}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              height: 48,
              padding: 2,
            }}
          >
            <span>
              {alert.symbol}:{" "}
              {Number(alert.priceAlert).toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </span>
            <Button
              onClick={() => handleRemoveAlert(alert.symbol)}
              color="error"
              data-testid={`remove-alert-${alert.symbol}`}
            >
              X
            </Button>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default StocksAlertList;

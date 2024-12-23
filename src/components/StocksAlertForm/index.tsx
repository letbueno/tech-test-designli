import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";

import { useNotification } from "../../services/useNotification";
import StocksAlertList from "../StocksAlertList";
import { useStockContext } from "../../contexts/stockContext";
import { StockPriceAlert } from "../../types/StockPriceAlert";

const StocksAlertForm: React.FC = () => {
  const {
    selectedStock,
    setSelectedStock,
    stockAlerts,
    setStockAlerts,
    storedStocks,
  } = useStockContext();
  const { requestNotificationPermission } = useNotification();

  const [priceAlert, setpriceAlert] = useState<string>("");

  useEffect(() => {
    const savedAlerts = JSON.parse(localStorage.getItem("stockAlerts") || "[]");

    const savedpriceAlert =
      savedAlerts.find(
        (alert: StockPriceAlert) => alert.symbol === selectedStock
      )?.priceAlert || "";
    setpriceAlert(savedpriceAlert.toString());
  }, [selectedStock]);

  const handleSymbolChange = (event: SelectChangeEvent<string>) => {
    const newSelectedStock = event.target.value as string;
    setSelectedStock(newSelectedStock);
  };

  const handleSetpriceAlerts = () => {
    if (selectedStock && priceAlert !== "") {
      const newAlerts = [
        ...stockAlerts.filter((alert) => alert.symbol !== selectedStock),
        { symbol: selectedStock, priceAlert: Number(priceAlert) },
      ];

      setStockAlerts(newAlerts);
      localStorage.setItem("stockAlerts", JSON.stringify(newAlerts));
      requestNotificationPermission();
    }
  };
  const handlePriceChange = (value: string) => {
    const regex = /^\d*\.?\d*$/;
    if (value === "" || regex.test(value)) {
      setpriceAlert(value);
    }
  };

  return (
    <Container sx={{ minWidth: 300 }}>
      <Box
        component="form"
        onSubmit={(e) => {
          e.preventDefault();
          handleSetpriceAlerts();
        }}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Stock Symbol</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectedStock}
            onChange={handleSymbolChange}
            defaultValue=""
            label="Stock Symbol"
            data-testid="stock-symbol-select"
          >
            {storedStocks.map((stock) => (
              <MenuItem key={stock.s} value={stock.s}>
                {stock.s}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          label="Price alert"
          type="text"
          value={priceAlert}
          onChange={(e) => handlePriceChange(e.target.value)}
          fullWidth
        />
        <Button type="submit" variant="outlined" color="primary">
          Add price alert
        </Button>

        {stockAlerts && stockAlerts.length > 0 && <StocksAlertList />}
      </Box>
    </Container>
  );
};

export default StocksAlertForm;

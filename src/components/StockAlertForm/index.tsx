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
  Stack,
  TextField,
} from "@mui/material";
import { useStockContext } from "../../assets/contexts/stockContext";
import { useNotification } from "../../hooks/useNotification";
import { StockAlertPrice } from "../../types/StockAlertPrice";
import StocksAlertList from "../StocksAlertList";

const StockAlertForm: React.FC = () => {
  const {
    selectedStock,
    setSelectedStock,
    stockAlerts,
    setStockAlerts,
    storedStocks,
  } = useStockContext();
  const { requestNotificationPermission } = useNotification();

  const [alertPrice, setAlertPrice] = useState<string>("");

  useEffect(() => {
    const savedAlerts = JSON.parse(localStorage.getItem("stockAlerts") || "[]");

    const savedAlertPrice =
      savedAlerts.find(
        (alert: StockAlertPrice) => alert.symbol === selectedStock
      )?.alertPrice || "";
    setAlertPrice(savedAlertPrice.toString());
  }, [selectedStock]);

  const handleSymbolChange = (event: SelectChangeEvent<string>) => {
    const newSelectedStock = event.target.value as string;
    setSelectedStock(newSelectedStock);
  };

  const handleSetAlertPrices = () => {
    if (selectedStock && alertPrice !== "") {
      const newAlerts = [
        ...stockAlerts.filter((alert) => alert.symbol !== selectedStock),
        { symbol: selectedStock, alertPrice: Number(alertPrice) },
      ];

      setStockAlerts(newAlerts);
      localStorage.setItem("stockAlerts", JSON.stringify(newAlerts));
      requestNotificationPermission();
    }
  };
  const handlePriceChange = (value: string) => {
    const regex = /^\d*\.?\d*$/;
    if (value === "" || regex.test(value)) {
      setAlertPrice(value);
    }
  };

  return (
    <Container sx={{ minWidth: 300 }}>
      <Box
        component="form"
        onSubmit={(e) => {
          e.preventDefault();
          handleSetAlertPrices();
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
            label="Stock Symbol"
          >
            {storedStocks.map((stock) => (
              <MenuItem key={stock.s} value={stock.s}>
                {stock.s}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Stack direction="row" spacing={2}>
          <TextField
            label="Price Alert"
            type="text"
            value={alertPrice}
            onChange={(e) => handlePriceChange(e.target.value)}
            fullWidth
          />
          <Button type="submit" variant="contained" color="primary">
            Add alert price
          </Button>
        </Stack>

        <StocksAlertList />
      </Box>
    </Container>
  );
};

export default StockAlertForm;

import { Stock } from "../../types/Stock";

const API_KEY = import.meta.env.VITE_API_KEY;
const stocks = [
  "AAPL",
  "GOOGL",
  "MSFT",
  "TSLA",
  "BINANCE:BTCUSDT",
  "BINANCE:BNBUSDT",
  "BINANCE:DOTUSDT",
  "BINANCE:LTCUSDT",
  "BINANCE:LINKUSDT",
  "HITBTC:BTCUSD",
];
export function setupWebSocket(setStoredStocks: (stocks: Stock[]) => void) {
  const socket = new WebSocket(`wss://ws.finnhub.io?token=${API_KEY}`);

  socket.onopen = () => {
    stocks.forEach((stock: string) => {
      socket.send(JSON.stringify({ type: "subscribe", symbol: stock }));
    });
  };

  socket.onmessage = (event) => {
    const stocksData = JSON.parse(event.data).data;

    const storedStocks: Stock[] = JSON.parse(
      localStorage.getItem("webSocketData") || "[]"
    );

    stocksData?.forEach((newStock: Stock) => {
      const existingStockIndex = storedStocks.findIndex(
        (storedStock) => storedStock.s === newStock.s
      );

      if (existingStockIndex !== -1) {
        if (newStock.t > storedStocks[existingStockIndex].t) {
          storedStocks[existingStockIndex] = newStock;
        }
      } else {
        storedStocks.push(newStock);
      }
    });
    setStoredStocks(storedStocks);

    localStorage.setItem("webSocketData", JSON.stringify(storedStocks));
  };

  socket.onclose = () => {
    console.log("WebSocket closed");
  };

  socket.onerror = (error) => {
    console.error("WebSocket error:", error);
  };
}

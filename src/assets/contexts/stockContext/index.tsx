import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useNotification } from "../../../services/useNotification";
import { Stock } from "../../../types/Stock";
import { StockPriceAlert } from "../../../types/StockPriceAlert";
import { setupWebSocket } from "../../../services/useSocket";

export interface IStockContext {
  priceAlert?: number;
  stockAlerts: StockPriceAlert[];
  setStockAlerts: (alerts: StockPriceAlert[]) => Promise<void> | void;
  storedStocks: Stock[];
  setStoredStocks: (stocks: Stock[]) => Promise<void> | void;
  selectedStock: string;
  setSelectedStock: (stock: string) => Promise<void> | void;
}

export const StockContext = createContext<IStockContext>({} as IStockContext);
StockContext.displayName = "StockContext";

function StockProvider({ children }: { children: React.ReactNode }) {
  const [stockAlerts, setStockAlerts] = useState<StockPriceAlert[]>(
    JSON.parse(localStorage.getItem("stockAlerts") || "[]")
  );
  const [storedStocks, setStoredStocks] = useState(
    JSON.parse(localStorage.getItem("webSocketData") || "[]")
  );
  const [selectedStock, setSelectedStock] = useState<string>(
    JSON.parse(localStorage.getItem("webSocketData") || "[]")[0]?.s || ""
  );
  const [sentNotifications, setSentNotifications] = useState<
    Record<string, number>
  >({});

  const { showNotification } = useNotification();

  useEffect(() => {
    setupWebSocket(setStoredStocks);
    if (selectedStock === "") {
      setSelectedStock(storedStocks[0]?.s || "");
    }
  }, [setStoredStocks, storedStocks, selectedStock]);

  useEffect(() => {
    storedStocks.forEach((stock: Stock) => {
      const alert = stockAlerts.find(
        (alert: StockPriceAlert) => alert.symbol === stock.s
      );

      if (alert && stock.p < alert.priceAlert) {
        const lastNotification = sentNotifications[stock.s] || 0;
        if (Date.now() - lastNotification > 10000) {
          showNotification({
            title: `Stock Alert: ${stock.s}`,
            body: `Current price: ${stock.p.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}`,
          });
          setSentNotifications((prev) => ({
            ...prev,
            [stock.s]: Date.now(),
          }));
        }
      }
    });
  }, [storedStocks, stockAlerts, showNotification, sentNotifications]);

  const StockObject: IStockContext = useMemo(
    () => ({
      selectedStock,
      setSelectedStock,
      stockAlerts,
      setStockAlerts,
      storedStocks,
      setStoredStocks,
    }),
    [
      storedStocks,
      setStoredStocks,
      setStockAlerts,
      stockAlerts,
      selectedStock,
      setSelectedStock,
    ]
  );

  return (
    <StockContext.Provider value={StockObject}>
      {children}
    </StockContext.Provider>
  );
}

export default StockProvider;

export function useStockContext() {
  const context = useContext(StockContext);

  if (!context) {
    throw new Error("useStockContext must be used within a StockProvider");
  }

  return context;
}

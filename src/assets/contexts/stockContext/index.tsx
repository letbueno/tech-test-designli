import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useNotification } from "../../../hooks/useNotification";
import { Stock } from "../../../types/Stock";
import { StockAlertPrice } from "../../../types/StockAlertPrice";
import { setupWebSocket } from "../../../services/useSocket";

export interface IStockContext {
  alertPrice?: number;
  stockAlerts: StockAlertPrice[];
  setStockAlerts: (alerts: StockAlertPrice[]) => Promise<void> | void;
  storedStocks: Stock[];
  setStoredStocks: (stocks: Stock[]) => Promise<void> | void;
  selectedStock: string;
  setSelectedStock: (stock: string) => Promise<void> | void;
}

export const StockContext = createContext<IStockContext>({} as IStockContext);
StockContext.displayName = "StockContext";

function StockProvider({ children }: { children: React.ReactNode }) {
  const [stockAlerts, setStockAlerts] = useState<StockAlertPrice[]>(
    JSON.parse(localStorage.getItem("stockAlerts") || "[]")
  );

  const { showNotification } = useNotification();
  const [storedStocks, setStoredStocks] = useState(
    JSON.parse(localStorage.getItem("webSocketData") || "[]")
  );
  const [selectedStock, setSelectedStock] = useState<string>(
    storedStocks[0]?.s
  );

  const [sentNotifications, setSentNotifications] = useState<
    Record<string, number>
  >({});

  useEffect(() => {
    setupWebSocket(setStoredStocks);
  }, [setStoredStocks]);

  useEffect(() => {
    storedStocks.forEach((stock: Stock) => {
      const alert = stockAlerts.find(
        (alert: StockAlertPrice) => alert.symbol === stock.s
      );

      if (alert && stock.p < alert.alertPrice) {
        const lastNotification = sentNotifications[stock.s] || 0;
        if (Date.now() - lastNotification > 10000) {
          console.log("Notification sent");
          showNotification({
            title: `Stock Alert: ${stock.s}`,
            body: `Current price: ${stock.p}`,
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

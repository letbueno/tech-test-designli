import { render, screen } from "@testing-library/react";
import { vi, Mock } from "vitest";
import Home from ".";
import { useStockContext } from "../../contexts/stockContext";
import "@testing-library/jest-dom";

vi.mock("../../components/StockCards", () => ({
  __esModule: true,
  default: () => <div>Stock Cards</div>,
}));
vi.mock("../../components/StocksChart", () => ({
  __esModule: true,
  default: () => <div>Stocks Chart</div>,
}));

vi.mock("../../pages/Loading", () => ({
  __esModule: true,
  default: () => <div>Loading...</div>,
}));

vi.mock("../../contexts/stockContext", () => ({
  useStockContext: vi.fn(),
}));

describe("Home Component", () => {
  it("renders loading when storedStocks is empty", () => {
    (useStockContext as Mock).mockReturnValue({
      storedStocks: [],
      selectedStock: "AAPL",
    });

    render(<Home />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("renders the Stock Tracker and components when storedStocks is not empty", () => {
    const mockStoredStocks = [
      { s: "AAPL", p: 150, v: 1.5 },
      { s: "GOOGL", p: 2800, v: -2.3 },
    ];
    (useStockContext as Mock).mockReturnValue({
      storedStocks: mockStoredStocks,
      stockAlerts: [],
    });

    render(<Home />);

    expect(screen.getByText("Stock Tracker")).toBeInTheDocument();
    expect(screen.getByText("Stock Cards")).toBeInTheDocument();
    expect(screen.getByText("Stocks Chart")).toBeInTheDocument();
  });
});

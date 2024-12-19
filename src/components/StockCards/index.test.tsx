import React from "react";
import { render, screen } from "@testing-library/react";
import { Mock, vi } from "vitest";
import StockCards from ".";
import { useStockContext } from "../../contexts/stockContext";

vi.mock("../../contexts/stockContext", () => ({
  useStockContext: vi.fn(),
}));

describe("StockCards", () => {
  const mockStocks = [
    { s: "AAPL", p: 150, v: 2.5 },
    { s: "GOOGL", p: 2800, v: -1.2 },
  ];

  const mockStockAlerts = [
    { symbol: "AAPL", priceAlert: 145 },
    { symbol: "GOOGL", priceAlert: 2700 },
  ];

  beforeEach(() => {
    (useStockContext as Mock).mockReturnValue({
      storedStocks: mockStocks,
      stockAlerts: mockStockAlerts,
    });
  });

  test("renders a list of StockCards", () => {
    render(<StockCards />);

    expect(screen.getByText("AAPL")).toBeInTheDocument();
    expect(screen.getByText("$150.00")).toBeInTheDocument();
    expect(screen.getByText("+2.50%")).toBeInTheDocument();

    expect(screen.getByText("GOOGL")).toBeInTheDocument();
    expect(screen.getByText("$2,800.00")).toBeInTheDocument();
    expect(screen.getByText("-1.20%")).toBeInTheDocument();
  });

  test("applies price alerts to StockCards", () => {
    render(<StockCards />);

    expect(screen.getByText("+2.50%")).toHaveStyle("color: green");
    expect(screen.getByText("-1.20%")).toHaveStyle("color: red");
  });

  test("handles empty storedStocks gracefully", () => {
    (useStockContext as Mock).mockReturnValue({
      storedStocks: [],
      stockAlerts: [],
    });
    render(<StockCards />);
    expect(screen.queryByText("AAPL")).not.toBeInTheDocument();
    expect(screen.queryByText("GOOGL")).not.toBeInTheDocument();
  });
});

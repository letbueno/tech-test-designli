import { render, screen } from "@testing-library/react";
import { Mock, vi } from "vitest";
import StocksChart from ".";
import { useStockContext } from "../../contexts/stockContext";

vi.mock("../../contexts/stockContext", () => ({
  useStockContext: vi.fn(),
}));

vi.mock("react-chartjs-2", () => ({
  Line: () => <div data-testid="chartjs-line-chart"></div>,
}));
describe("StocksChart Component", () => {
  const mockStoredStocks = [
    { s: "AAPL", p: 145 },
    { s: "GOOGL", p: 2800 },
    { s: "MSFT", p: 299 },
  ];

  beforeEach(() => {
    (useStockContext as Mock).mockReturnValue({
      storedStocks: mockStoredStocks,
    });
  });

  it("renders the chart title", () => {
    render(<StocksChart />);
    expect(screen.getByText("Stock Prices in USD")).toBeInTheDocument();
  });

  it("renders legend and options correctly", () => {
    render(<StocksChart />);

    const chart = screen.getByTestId("chartjs-line-chart");
    expect(chart).toBeInTheDocument();

    const legendElement = screen.getByText(/Stock Prices in USD/);
    expect(legendElement).toBeInTheDocument();
  });
});

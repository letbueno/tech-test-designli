import { fireEvent, render, screen } from "@testing-library/react";
import { Mock, vi } from "vitest";
import StocksAlertList from ".";
import { useStockContext } from "../../contexts/stockContext";

vi.mock("../../contexts/stockContext", () => ({
  useStockContext: vi.fn(),
}));

describe("StocksAlertList Component", () => {
  it("should render the stock alerts and handle remove", () => {
    const mockStockAlerts = [
      { symbol: "AAPL", priceAlert: 150 },
      { symbol: "GOOGL", priceAlert: 2800 },
    ];
    const setStockAlertsMock = vi.fn();

    (useStockContext as Mock).mockReturnValue({
      stockAlerts: mockStockAlerts,
      setStockAlerts: setStockAlertsMock,
    });

    render(<StocksAlertList />);

    expect(screen.getByText("AAPL: $150.00")).toBeInTheDocument();
    expect(screen.getByText("GOOGL: $2,800.00")).toBeInTheDocument();

    expect(screen.getByTestId("remove-alert-AAPL")).toBeInTheDocument();

    const removeButton = screen.getByTestId("remove-alert-AAPL");
    fireEvent.click(removeButton);

    expect(setStockAlertsMock).toHaveBeenCalledWith([
      { symbol: "GOOGL", priceAlert: 2800 },
    ]);
  });
});

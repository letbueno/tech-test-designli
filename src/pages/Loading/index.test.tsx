import { render, screen } from "@testing-library/react";
import Loading from ".";

describe("Loading Component", () => {
  it("renders CircularProgress", () => {
    render(<Loading />);

    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });
});

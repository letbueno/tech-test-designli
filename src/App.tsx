import { createTheme, ThemeProvider } from "@mui/material";
import StockProvider from "./contexts/stockContext";
import Home from "./pages/Home";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <StockProvider>
        <Home />
      </StockProvider>
    </ThemeProvider>
  );
}

export default App;

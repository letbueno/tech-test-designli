import { Box, Container, Stack, Typography } from "@mui/material";
import StockCards from "../../components/StockCards";
import StocksAlertForm from "../../components/StocksAlertForm";
import StocksChart from "../../components/StocksChart";
import { useStockContext } from "../../contexts/stockContext";
import Loading from "../Loading";

function Home() {
  const { storedStocks } = useStockContext();

  if (storedStocks.length === 0) {
    return <Loading />;
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 6, justifyContent: "center" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
        gap={4}
      >
        <Typography variant="h4" color="text.primary">
          Stock Tracker Dashboard
        </Typography>
        <Stack
          direction="row"
          spacing={4}
          sx={{
            flexWrap: { xs: "wrap", md: "nowrap" },
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <StocksAlertForm />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <StockCards />
          </Box>
        </Stack>
        <StocksChart />
      </Box>
    </Container>
  );
}

export default Home;

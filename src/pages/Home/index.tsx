import { Box, Container, Stack, Typography } from "@mui/material";
import TopCards from "../../components/TopCards";
import StocksAlertForm from "../../components/StocksAlertForm";
import StocksChart from "../../components/StocksChart";
import { useStockContext } from "../../assets/contexts/stockContext";
import Loading from "../Loading";

function Home() {
  const { storedStocks } = useStockContext();

  if (storedStocks.length === 0) {
    return <Loading />;
  }

  return (
    <Container maxWidth="xl" sx={{ mt: 6, justifyContent: "center" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
        gap={4}
      >
        <Typography variant="h4" color="text.primary" align="center">
          Stock Tracker
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
              flex: 1,
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <StocksAlertForm />
          </Box>
          <Box
            sx={{
              flex: 2,
              display: "flex",
              flexDirection: "column",
              gap: 5,
            }}
          >
            <TopCards />
          </Box>
        </Stack>
        <StocksChart />
      </Box>
    </Container>
  );
}

export default Home;

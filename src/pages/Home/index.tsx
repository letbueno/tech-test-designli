import { Box, Container, Stack, Typography } from "@mui/material";
import TopCards from "../../components/TopCards";
import StockAlertForm from "../../components/StockAlertForm";
import StockChart from "../../components/StockChart";

function Home() {
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
        <Typography variant="h4" color="text.primary" sx={{ mb: 4 }}>
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
            <StockAlertForm />
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
        <StockChart />
      </Box>
    </Container>
  );
}

export default Home;

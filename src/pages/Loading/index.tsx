import React from "react";
import { CircularProgress, Container, Box } from "@mui/material";

const Loading: React.FC = () => {
  return (
    <Container>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    </Container>
  );
};

export default Loading;

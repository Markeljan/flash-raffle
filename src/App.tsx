import { Box } from "@mui/material";
import Nav from "./components/Nav";
import BoxButtons from "./components/BoxButtons";

function App() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: `linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)`,
        backgroundSize: "400%, 400%",
        animation: "gradient 15s ease infinite",
        maxWidth: "80%",
        margin: "0 auto",
      }}
    >
      <Nav />
      <BoxButtons />
    </Box>
  );
}

export default App;

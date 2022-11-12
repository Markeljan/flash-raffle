import EmojiPeopleIcon from "@mui/icons-material/EmojiPeople";
import PublicIcon from "@mui/icons-material/Public";
import { Box } from "@mui/material";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Nav from "./components/Nav";

function App() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 4,
        pl: 0,
        background: `linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)`,
        backgroundSize: "400%, 400%",
        animation: "gradient 15s ease infinite",
        height: "100vh",
      }}
    >
      <Nav />

      <Box sx={{ justifyContent: "center", alignItems: "center" }}>
        <EmojiPeopleIcon fontSize="large" />
        <PublicIcon fontSize="large" />
      </Box>
    </Box>
  );
}

export default App;

import EmojiPeopleIcon from "@mui/icons-material/EmojiPeople";
import PublicIcon from "@mui/icons-material/Public";
import { Box } from "@mui/material";
import { ConnectButton } from "@rainbow-me/rainbowkit";

function App() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        pr: 2,
        gap: 4,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "right",
          width: "100%",
        }}
      >
        <ConnectButton />
      </Box>

      <Box sx={{ justifyContent: "center", alignItems: "center" }}>
        <EmojiPeopleIcon fontSize="large" />
        <PublicIcon fontSize="large" />
      </Box>
    </Box>
  );
}

export default App;

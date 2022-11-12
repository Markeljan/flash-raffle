import EmojiPeopleIcon from "@mui/icons-material/EmojiPeople";
import PublicIcon from "@mui/icons-material/Public";
import { Box, Typography } from "@mui/material";
import LocalActivityOutlinedIcon from "@mui/icons-material/LocalActivityOutlined";
import HourglassTopOutlinedIcon from "@mui/icons-material/HourglassTopOutlined";
import DraftsOutlinedIcon from "@mui/icons-material/DraftsOutlined";
import LocalAtmOutlinedIcon from "@mui/icons-material/LocalAtmOutlined";
import ShuffleOnOutlinedIcon from "@mui/icons-material/ShuffleOnOutlined";
import PriceChangeOutlinedIcon from "@mui/icons-material/PriceChangeOutlined";
import Nav from "./components/Nav";

function App() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        background: `linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)`,
        backgroundSize: "400%, 400%",
        animation: "gradient 15s ease infinite",
      }}
    >
      <Nav />
      <Box display="flex" justifyContent="space-between" width="100%">
        <Box
          sx={{
            color: "#ffffff",
            background: "#000000",
            p: 8,
            width: "50%",
            border: "5px solid transparent",
            borderImage:
              "linear-gradient(to bottom right, #b827fc 0%, #2c90fc 25%, #b8fd33 50%, #fec837 75%, #fd1892 100%)",
            borderImageSlice: 1,
          }}
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Typography variant="h2" fontWeight={700}>
            <EmojiPeopleIcon sx={{ fontSize: "4rem" }} />
            {} Mint TIX {}
            <LocalActivityOutlinedIcon sx={{ fontSize: "4rem" }} />
          </Typography>

          <Typography variant="h5" fontWeight={500}>
            1 TIX = 1 entry
          </Typography>
        </Box>

        <Box
          sx={{
            color: "#E2442F",
            background: "#F1F333",
            p: 8,
            width: "50%",
            border: "5px solid transparent",
            borderImage:
              "linear-gradient(to bottom right, #b827fc 0%, #2c90fc 25%, #b8fd33 50%, #fec837 75%, #fd1892 100%)",
            borderImageSlice: 1,
          }}
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Typography variant="h2" fontWeight={700}>
            <HourglassTopOutlinedIcon sx={{ fontSize: "4rem" }} />
            {} Wait for a Raffle! {}
            <PublicIcon sx={{ fontSize: "4rem" }} />
          </Typography>

          <Typography variant="h5" fontWeight={500}>
            min 2 entrants
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          color: "#000000",
          background: "#90A8ED",
          py: 8,
          width: "100%",
          border: "5px solid transparent",
          boxSizing: "border-box",
          borderImage:
            "linear-gradient(to bottom right, #b827fc 0%, #2c90fc 25%, #b8fd33 50%, #fec837 75%, #fd1892 100%)",
          borderImageSlice: 1,
        }}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Typography variant="h2" fontWeight={700}>
          <DraftsOutlinedIcon sx={{ fontSize: "4rem" }} />
          {} Open Envelopes! {}
          <LocalAtmOutlinedIcon sx={{ fontSize: "4rem" }} />
        </Typography>

        <Typography variant="h5" fontWeight={500}>
          Exchange TIX for envelopes to earn Crypto or Sponsor NFT's!
        </Typography>
      </Box>
      <Box
        sx={{
          color: "#000000",
          background: "#23A094",
          py: 16,
          width: "100%",
          border: "5px solid transparent",
          boxSizing: "border-box",
          borderImage:
            "linear-gradient(to bottom right, #b827fc 0%, #2c90fc 25%, #b8fd33 50%, #fec837 75%, #fd1892 100%)",
          borderImageSlice: 1,
        }}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Typography variant="h2" fontWeight={700}>
          <ShuffleOnOutlinedIcon sx={{ fontSize: "4rem" }} />
          {} Current Draw {}
          <PriceChangeOutlinedIcon sx={{ fontSize: "4rem" }} />
        </Typography>
        <Typography variant="h5" fontWeight={500}>
          game status...
        </Typography>
        <Typography variant="h4" fontWeight={500}>
          ✉✉✉✉✉✉✉✉✉✉
        </Typography>
      </Box>
    </Box>
  );
}

export default App;

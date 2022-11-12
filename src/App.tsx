import EmojiPeopleIcon from "@mui/icons-material/EmojiPeople";
import PublicIcon from "@mui/icons-material/Public";
import { Box, Typography } from "@mui/material";
import LocalActivityOutlinedIcon from "@mui/icons-material/LocalActivityOutlined";
import HourglassTopOutlinedIcon from "@mui/icons-material/HourglassTopOutlined";
import DraftsOutlinedIcon from "@mui/icons-material/DraftsOutlined";
import LocalAtmOutlinedIcon from "@mui/icons-material/LocalAtmOutlined";
import Nav from "./components/Nav";

function App() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",

        pl: 0,
        background: `linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)`,
        backgroundSize: "400%, 400%",
        animation: "gradient 15s ease infinite",
        height: "100vh",
      }}
    >
      {/* 
      background-color: #302244;
  border: 5px solid transparent;
  border-image: linear-gradient(to bottom right, #b827fc 0%, #2c90fc 25%, #b8fd33 50%, #fec837 75%, #fd1892 100%);
  border-image-slice: 1;
   */}
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
            {} Buy TIX {}
            <LocalActivityOutlinedIcon sx={{ fontSize: "4rem" }} />
          </Typography>

          <Typography variant="h5" fontWeight={500}>
            1 TIX = 1 entry
          </Typography>
        </Box>

        <Box
          sx={{
            fontSize: "4rem",
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
            {} Wait for Raffle {}
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
          Envelops contain a random value of TIX
        </Typography>
      </Box>
    </Box>
  );
}

export default App;

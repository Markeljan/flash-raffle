import { Box, createTheme, ThemeProvider, Typography } from "@mui/material";
import EmojiPeopleIcon from "@mui/icons-material/EmojiPeople";
import PublicIcon from "@mui/icons-material/Public";
import LocalActivityOutlinedIcon from "@mui/icons-material/LocalActivityOutlined";
import HourglassTopOutlinedIcon from "@mui/icons-material/HourglassTopOutlined";
import DraftsOutlinedIcon from "@mui/icons-material/DraftsOutlined";
import LocalAtmOutlinedIcon from "@mui/icons-material/LocalAtmOutlined";
import ShuffleOnOutlinedIcon from "@mui/icons-material/ShuffleOnOutlined";
import PriceChangeOutlinedIcon from "@mui/icons-material/PriceChangeOutlined";

const theme = createTheme({
  palette: {
    primary: {
      main: "#ffffff",
    },
    secondary: {
      main: "#e73c7e",
    },
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          textTransform: "none",
          fontWeight: 700,
          fontSize: "1.8rem",
          padding: "1rem 2rem",
          "&:hover": {
            backgroundColor: "#ffffff",
            color: "#000000",
          },

          "&:active": {
            backgroundColor: "#000000",
            color: "#e73c7e",
          },
        },
      },
    },
  },
});

export default function BoXButtons() {
  return (
    <ThemeProvider theme={theme}>
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
            ["&:hover"]: {
              backgroundColor: "#ffffff",
              color: "#000000",
              boxShadow: "0 0 0 1rem rgba(0,123,255,.5),0 0 0 0.4rem rgba(0,123,255,.25)",
              zIndex: 1,
              cursor: "pointer",
            },
            ["&:active"]: {
              backgroundColor: "#000000",
              color: "#e73c7e",

              boxShadow: "0 0 0 1rem rgba(231,60,126, .5),0 0 0 0.4rem rgba(231,60,126, .5)",
              zIndex: 1,
            },
          }}
          onClick={() => console.log("clicked")}
          component="button"
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
          onClick={() => console.log("clicked")}
          sx={{
            color: "#E2442F",
            background: "#F1F333",
            p: 8,
            width: "50%",
            border: "5px solid transparent",
            borderImage:
              "linear-gradient(to bottom right, #b827fc 0%, #2c90fc 25%, #b8fd33 50%, #fec837 75%, #fd1892 100%)",
            borderImageSlice: 1,
            ["&:hover"]: {
              backgroundColor: "#E2442F",
              color: "#F1F333",
              boxShadow: "0 0 0 1rem rgba(0,123,255,.5),0 0 0 0.4rem rgba(0,123,255,.25)",
              zIndex: 1,
            },
            ["&:active"]: {
              backgroundColor: "#000000",
              color: "#e73c7e",

              boxShadow: "0 0 0 1rem rgba(231,60,126, .5),0 0 0 0.4rem rgba(231,60,126, .5)",
              zIndex: 1,
            },
          }}
          component="button"
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
          ["&:hover"]: {
            backgroundColor: "#000000",
            color: "#90A8ED",

            boxShadow: "0 0 0 1rem rgba(0,123,255,.5),0 0 0 0.4rem rgba(0,123,255,.25)",
            zIndex: 1,
          },
          ["&:active"]: {
            backgroundColor: "#000000",
            color: "#e73c7e",

            boxShadow: "0 0 0 1rem rgba(231,60,126, .5),0 0 0 0.4rem rgba(231,60,126, .5)",
            zIndex: 1,
          },
        }}
        component="button"
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
          ["&:hover"]: {
            backgroundColor: "#000000",
            color: "#23A094",

            boxShadow: "0 0 0 1rem rgba(0,123,255,.5),0 0 0 0.4rem rgba(0,123,255,.25)",
            zIndex: 1,
          },
          ["&:active"]: {
            backgroundColor: "#000000",
            color: "#e73c7e",

            boxShadow: "0 0 0 1rem rgba(231,60,126, .5),0 0 0 0.4rem rgba(231,60,126, .5)",
            zIndex: 1,
          },
        }}
        component="button"
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
    </ThemeProvider>
  );
}

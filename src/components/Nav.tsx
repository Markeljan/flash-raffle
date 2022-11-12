import { Box, Typography, Button } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { ConnectButton } from "@rainbow-me/rainbowkit";

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

export default function Nav() {
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{ background: `#e73c7e` }}
        display={"flex"}
        justifyContent="space-between"
        width={"100%"}
      >
        <Box display={"flex"}>
          <Button color="primary">FLASH RAFFLE</Button>
          <Button color="primary">Home</Button>
          <Button color="primary">Info</Button>
        </Box>

        <Box display={"flex"} justifyContent="flex-end" alignItems="center" px={2}>
          <ConnectButton />
        </Box>
      </Box>
    </ThemeProvider>
  );
}

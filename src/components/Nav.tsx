import { Box, Button } from "@mui/material";
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
            color: "#e73c7e",

            boxShadow: "0 0 0 1rem rgba(0,123,255,.5),0 0 0 0.4rem rgba(0,123,255,.25)",
            zIndex: 1,
            cursor: "pointer",
          },

          "&:active": {
            backgroundColor: "#000000",
            color: "#e73c7e",

            boxShadow: "0 0 0 1rem rgba(231,60,126, .5),0 0 0 0.4rem rgba(231,60,126, .5)",
            zIndex: 1,
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
        sx={{
          position: "sticky",
          top: 0,
          background: `#e73c7e`,
          border: "5px solid transparent",
          boxSizing: "border-box",
          borderImage:
            "linear-gradient(to bottom right, #b827fc 0%, #2c90fc 25%, #b8fd33 50%, #fec837 75%, #fd1892 100%)",
          borderImageSlice: 1,
        }}
        display={"flex"}
        justifyContent="space-between"
        width={"100%"}
      >
        <Box display={"flex"}>
          <Button color="primary">FLASH RAFFLE</Button>
          <Button color="primary">Info</Button>
        </Box>

        <Box
          sx={{
            ["&:hover"]: {
              boxShadow: "0 0 0 1rem rgba(0,123,255,.5),0 0 0 0.4rem rgba(0,123,255,.25)",
              zIndex: 1,
              cursor: "pointer",
            },
            ["&:active"]: {
              boxShadow: "0 0 0 1rem rgba(231,60,126, .5),0 0 0 0.4rem rgba(231,60,126, .5)",
              zIndex: 1,
              backgroundColor: "#000000",
            },
          }}
          display={"flex"}
          justifyContent="flex-end"
          alignItems="center"
          px={2}
        >
          <ConnectButton />
        </Box>
      </Box>
    </ThemeProvider>
  );
}

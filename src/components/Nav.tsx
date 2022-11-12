import { Box, Typography, Button } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

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
          padding: "0.5rem 1rem",
          "&:hover": {
            backgroundColor: "#ffffff",
            color: "#000000",
          },
        },
      },
    },
  },
});

export default function Nav() {
  return (
    <ThemeProvider theme={theme}>
      <Box display={"flex"} justifyContent="space-between">
        <Button color="primary">Home</Button>
        <Button color="primary">About</Button>
        <Button color="primary">Contact</Button>
      </Box>
    </ThemeProvider>
  );
}

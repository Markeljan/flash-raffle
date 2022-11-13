import { createTheme } from "@mui/material";

export const boxTheme = createTheme({
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
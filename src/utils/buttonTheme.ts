import { createTheme } from "@mui/material";

export const theme = createTheme({
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
              cursor: "pointer",
            },
  
            "&:active": {
              backgroundColor: "#000000",
              color: "#e73c7e",
  
              boxShadow: "0 0 0 1rem rgba(231,60,126, .5) inset,0 0 0 0.4rem rgba(231,60,126, .5) inset",
              zIndex: 1,
            },
          },
        },
      },
    },
  });
import { Box, Button } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CustomConnect } from "./CustomConnect";
import { theme } from "../utils/buttonTheme";

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
          zIndex: 100,
        }}
        display={"flex"}
        justifyContent="space-between"
        width={"100%"}
      >
        <Box display={"flex"}>
          <Button color="primary">FLASH RAFFLE</Button>
          <Button color="primary">Info</Button>
        </Box>

        <CustomConnect />
      </Box>
    </ThemeProvider>
  );
}

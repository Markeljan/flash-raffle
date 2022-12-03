import { Box, Button, LinearProgress, Stack } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { CustomConnect } from "./CustomConnect";
import { theme } from "../utils/buttonTheme";
import { useContext } from "react";
import { MainContext } from "../contexts/MainContext";

export default function Nav() {
  const { isLoading } = useContext(MainContext);
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
        flexDirection={"column"}
        justifyContent="space-between"
        width={"100%"}
      >
        {isLoading ? (
          <Stack sx={{ width: "100%" }}>
            <LinearProgress color="secondary" />
            <LinearProgress color="secondary" />
          </Stack>
        ) : (
          ""
        )}

        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box display={"flex"}>
            <Button color="primary">FLASH RAFFLE</Button>
            <Button
              href="https://docs.google.com/presentation/d/e/2PACX-1vR8zZx987PEMox7tlvVgUOHeqwTQHlq0lseTHo3XaK3hhCeaT8FZetqjJ5-QD92pXSU_QLmtQ_HW_l-/pub?start=false&loop=false&delayms=3000"
              target="_blank"
              rel="noopener noreferrer"
              color="primary"
            >
              Info
            </Button>
          </Box>

          <CustomConnect />
        </Box>
      </Box>
    </ThemeProvider>
  );
}

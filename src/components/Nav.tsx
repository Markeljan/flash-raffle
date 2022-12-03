import { Box, Button, LinearProgress, Stack } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { CustomConnect } from "./CustomConnect";
import { theme } from "../utils/buttonTheme";
import { useContext } from "react";
import { MainContext } from "../contexts/MainContext";

export default function Nav() {
  const { isLoading, totalDonated } = useContext(MainContext);
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
              href="https://community.optimism.io/docs/governance/#citizens-house"
              target="_blank"
              rel="noopener"
              color="primary"
            >
              Info
            </Button>
            <Button
              href="https://optimistic.etherscan.io/address/0x15dda60616ffca20371ed1659dbb78e888f65556#events"
              target="_blank"
              rel="noopener"
              color="primary"
            >
              {totalDonated} ETH Donated to retroPGF.eth
            </Button>
          </Box>

          <CustomConnect />
        </Box>
      </Box>
    </ThemeProvider>
  );
}

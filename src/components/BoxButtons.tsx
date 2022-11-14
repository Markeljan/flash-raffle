import { Box, LinearProgress, ThemeProvider, Typography } from "@mui/material";
import EmojiPeopleIcon from "@mui/icons-material/EmojiPeople";
import PublicIcon from "@mui/icons-material/Public";
import LocalActivityOutlinedIcon from "@mui/icons-material/LocalActivityOutlined";
import HourglassTopOutlinedIcon from "@mui/icons-material/HourglassTopOutlined";
import DraftsOutlinedIcon from "@mui/icons-material/DraftsOutlined";
import LocalAtmOutlinedIcon from "@mui/icons-material/LocalAtmOutlined";
import ShuffleOnOutlinedIcon from "@mui/icons-material/ShuffleOnOutlined";
import PriceChangeOutlinedIcon from "@mui/icons-material/PriceChangeOutlined";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import { useContext, useEffect, useState } from "react";
import { MainContext } from "../contexts/MainContext";
import { boxTheme } from "../utils/boxButtonTheme";
import Flippy, { FrontSide, BackSide } from "react-flippy";

export default function BoXButtons() {
  const { mintPrice, jackpot, address, FLASH_RAFFLE_WRITE, addTx, setLatestTxHash } =
    useContext(MainContext);

  const mintPriceHuman = mintPrice / 10 ** 18;
  const jackpotHuman = jackpot / 10 ** 18;

  async function handleMint() {
    const tx = await FLASH_RAFFLE_WRITE.safeMint(address, { value: mintPrice });
    setLatestTxHash(tx.hash);
  }

  return (
    <ThemeProvider theme={boxTheme}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "stretch",
          m: 0,
          p: 0,
        }}
      >
        <Box display="flex" width="100%" justifyContent={"center"}>
          <Box width="50%">
            <Flippy sx={{}} flipOnClick={true} flipDirection="vertical">
              <FrontSide
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "stretch",
                }}
              >
                <Box
                  sx={{
                    color: "#ffffff",
                    background: "#000000",
                    p: 8,
                    border: "5px solid transparent",
                    borderImage:
                      "linear-gradient(to bottom right, #b827fc 0%, #2c90fc 25%, #b8fd33 50%, #fec837 75%, #fd1892 100%)",
                    borderImageSlice: 1,
                    ["&:hover"]: {
                      backgroundColor: "#ffffff",
                      color: "#000000",
                      cursor: "pointer",
                    },
                    ["&:active"]: {
                      backgroundColor: "#000000",
                      color: "#e73c7e",

                      boxShadow:
                        "0 0 0 1rem rgba(231,60,126, .5) inset,0 0 0 0.4rem rgba(231,60,126, .5) inset",
                      zIndex: 1,
                    },
                  }}
                  // onClick={handleMint}
                  component="button"
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="center"
                  height="100%"
                >
                  <Typography variant="h2" fontWeight={700}>
                    <EmojiPeopleIcon sx={{ fontSize: "4rem" }} />
                    {} Mint TIX {}
                    <LocalActivityOutlinedIcon sx={{ fontSize: "4rem" }} />
                  </Typography>

                  <Typography variant="h5" fontWeight={500}>
                    1 mint = {mintPriceHuman} ALT = 5 TIX nfts
                  </Typography>
                </Box>
              </FrontSide>
              <BackSide style={{ display: "flex", flexDirection: "column", alignItems: "stretch" }}>
                <Box
                  sx={{
                    color: "#ffffff",
                    background: "#000000",
                    p: 8,
                    border: "5px solid transparent",
                    borderImage:
                      "linear-gradient(to bottom right, #b827fc 0%, #2c90fc 25%, #b8fd33 50%, #fec837 75%, #fd1892 100%)",
                    borderImageSlice: 1,
                    ["&:hover"]: {
                      backgroundColor: "#ffffff",
                      color: "#000000",
                      cursor: "pointer",
                    },
                    ["&:active"]: {
                      backgroundColor: "#000000",
                      color: "#e73c7e",

                      boxShadow:
                        "0 0 0 1rem rgba(231,60,126, .5) inset,0 0 0 0.4rem rgba(231,60,126, .5) inset",
                      zIndex: 1,
                    },
                  }}
                  // onClick={handleMint}
                  component="button"
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="center"
                  height="100%"
                >
                  <Typography variant="h2" fontWeight={700}>
                    <EmojiPeopleIcon sx={{ fontSize: "4rem" }} />
                    {} Mint TIX {}
                    <LocalActivityOutlinedIcon sx={{ fontSize: "4rem" }} />
                  </Typography>

                  <Typography variant="h5" fontWeight={500}>
                    1 mint = {mintPriceHuman} ALT = 5 TIX nfts
                  </Typography>
                </Box>
              </BackSide>
            </Flippy>
          </Box>
          <Box width="50%">
            <Flippy flipOnClick={true} flipDirection="vertical">
              <FrontSide
                style={{ display: "flex", flexDirection: "column", alignItems: "stretch" }}
              >
                <Box
                  onClick={() => console.log("clicked")}
                  sx={{
                    color: "#E2442F",
                    background: "#F1F333",
                    p: 8,
                    width: "100%",
                    border: "5px solid transparent",
                    borderImage:
                      "linear-gradient(to bottom right, #b827fc 0%, #2c90fc 25%, #b8fd33 50%, #fec837 75%, #fd1892 100%)",
                    borderImageSlice: 1,
                    ["&:hover"]: {
                      backgroundColor: "#E2442F",
                      color: "#F1F333",
                    },
                    ["&:active"]: {
                      backgroundColor: "#000000",
                      color: "#e73c7e",

                      boxShadow:
                        "0 0 0 1rem rgba(231,60,126, .5) inset,0 0 0 0.4rem rgba(231,60,126, .5) inset",
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
                    {} Track the jackpot {}
                    <PublicIcon sx={{ fontSize: "4rem" }} />
                  </Typography>

                  <Typography variant="h5" fontWeight={500}>
                    current Jackpot: {jackpotHuman} ALT
                  </Typography>
                </Box>
              </FrontSide>
              <BackSide style={{ display: "flex", flexDirection: "column", alignItems: "stretch" }}>
                <Box
                  onClick={() => console.log("clicked")}
                  sx={{
                    color: "#E2442F",
                    background: "#F1F333",
                    p: 8,
                    width: "100%",
                    border: "5px solid transparent",
                    borderImage:
                      "linear-gradient(to bottom right, #b827fc 0%, #2c90fc 25%, #b8fd33 50%, #fec837 75%, #fd1892 100%)",
                    borderImageSlice: 1,
                    ["&:hover"]: {
                      backgroundColor: "#E2442F",
                      color: "#F1F333",
                    },
                    ["&:active"]: {
                      backgroundColor: "#000000",
                      color: "#e73c7e",

                      boxShadow:
                        "0 0 0 1rem rgba(231,60,126, .5) inset,0 0 0 0.4rem rgba(231,60,126, .5) inset",
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
                    {} Track the jackpot {}
                    <PublicIcon sx={{ fontSize: "4rem" }} />
                  </Typography>

                  <Typography variant="h5" fontWeight={500}>
                    current Jackpot: {jackpotHuman} ALT
                  </Typography>
                </Box>
              </BackSide>
            </Flippy>
          </Box>
        </Box>

        <Box display="flex" width="100%">
          <Box width="35%">
            <Flippy flipOnClick={true} flipDirection="horizontal">
              <FrontSide style={{}}>
                {" "}
                <Box
                  sx={{
                    color: "#F1F333",
                    background: "#E2442F",
                    py: 8,
                    width: "100%",
                    border: "5px solid transparent",
                    boxSizing: "border-box",
                    borderImage:
                      "linear-gradient(to bottom right, #b827fc 0%, #2c90fc 25%, #b8fd33 50%, #fec837 75%, #fd1892 100%)",
                    borderImageSlice: 1,
                    ["&:hover"]: {
                      backgroundColor: "#F1F333",
                      color: "#E2442F",
                      cursor: "pointer",
                    },
                    ["&:active"]: {
                      backgroundColor: "#000000",
                      color: "#e73c7e",

                      boxShadow:
                        "0 0 0 1rem rgba(231,60,126, .5) inset,0 0 0 0.4rem rgba(231,60,126, .5) inset",
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
                    <LocalFireDepartmentIcon sx={{ fontSize: "4rem" }} />
                    {} Burn {}
                    <LocalActivityOutlinedIcon sx={{ fontSize: "4rem" }} />
                  </Typography>

                  <Typography variant="h5" fontWeight={500}>
                    Burn TIX to open an envelope
                  </Typography>

                  <Typography variant="h5" fontWeight={500}>
                    0? Tix 🔥ed.
                  </Typography>
                </Box>
              </FrontSide>
              <BackSide style={{}}>
                {" "}
                <Box
                  sx={{
                    color: "#F1F333",
                    background: "#E2442F",
                    py: 8,
                    width: "100%",
                    border: "5px solid transparent",
                    boxSizing: "border-box",
                    borderImage:
                      "linear-gradient(to bottom right, #b827fc 0%, #2c90fc 25%, #b8fd33 50%, #fec837 75%, #fd1892 100%)",
                    borderImageSlice: 1,
                    ["&:hover"]: {
                      backgroundColor: "#F1F333",
                      color: "#E2442F",
                      cursor: "pointer",
                    },
                    ["&:active"]: {
                      backgroundColor: "#000000",
                      color: "#e73c7e",

                      boxShadow:
                        "0 0 0 1rem rgba(231,60,126, .5) inset,0 0 0 0.4rem rgba(231,60,126, .5) inset",
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
                    <LocalFireDepartmentIcon sx={{ fontSize: "4rem" }} />
                    {} Burn {}
                    <LocalActivityOutlinedIcon sx={{ fontSize: "4rem" }} />
                  </Typography>

                  <Typography variant="h5" fontWeight={500}>
                    Burn TIX to open an envelope
                  </Typography>

                  <Typography variant="h5" fontWeight={500}>
                    0? Tix 🔥ed.
                  </Typography>
                </Box>
              </BackSide>
            </Flippy>
          </Box>

          <Box width="65%">
            <Flippy flipOnClick={true} flipDirection="vertical">
              <FrontSide style={{}}>
                {" "}
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
                    },
                    ["&:active"]: {
                      backgroundColor: "#000000",
                      color: "#e73c7e",

                      boxShadow:
                        "0 0 0 1rem rgba(231,60,126, .5) inset,0 0 0 0.4rem rgba(231,60,126, .5) inset",
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
                    {} Your Envelopes {}
                    <LocalAtmOutlinedIcon sx={{ fontSize: "4rem" }} />
                  </Typography>

                  <Typography variant="h5" fontWeight={500}>
                    Envelope history
                  </Typography>

                  <Typography variant="h5" fontWeight={500}>
                    [array of envelope rewards] {"envelopes"}
                  </Typography>
                </Box>
              </FrontSide>
              <BackSide style={{}}>
                {" "}
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
                    },
                    ["&:active"]: {
                      backgroundColor: "#000000",
                      color: "#e73c7e",

                      boxShadow:
                        "0 0 0 1rem rgba(231,60,126, .5) inset,0 0 0 0.4rem rgba(231,60,126, .5) inset",
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
                    {} Your Envelopes {}
                    <LocalAtmOutlinedIcon sx={{ fontSize: "4rem" }} />
                  </Typography>

                  <Typography variant="h5" fontWeight={500}>
                    Envelope history
                  </Typography>

                  <Typography variant="h5" fontWeight={500}>
                    [array of envelope rewards] {"envelopes"}
                  </Typography>
                </Box>
              </BackSide>
            </Flippy>
          </Box>
        </Box>
        <Flippy flipOnClick={true} flipDirection="vertical">
          <FrontSide style={{}}>
            {" "}
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
                },
                ["&:active"]: {
                  backgroundColor: "#000000",
                  color: "#e73c7e",

                  boxShadow:
                    "0 0 0 1rem rgba(231,60,126, .5) inset,0 0 0 0.4rem rgba(231,60,126, .5) inset",
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
          </FrontSide>
          <BackSide style={{ display: "flex", width: "100%" }}>
            {" "}
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
                },
                ["&:active"]: {
                  backgroundColor: "#000000",
                  color: "#e73c7e",

                  boxShadow:
                    "0 0 0 1rem rgba(231,60,126, .5) inset,0 0 0 0.4rem rgba(231,60,126, .5) inset",
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
          </BackSide>
        </Flippy>
      </Box>
    </ThemeProvider>
  );
}

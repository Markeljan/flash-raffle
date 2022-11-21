import { Box, LinearProgress, Link, ThemeProvider, Typography } from "@mui/material";
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
import { useContractEvent, useNetwork } from "wagmi";
import { FLASH_RAFFLE_ABI, FLASH_RAFFLE_ADDRESS } from "../constants/contractData";
import { altLayerDevnet, metisTestnet, bobaTestnet } from "../main";

export default function BoXButtons() {
  const {
    mintPrice,
    jackpot,
    address,
    FLASH_RAFFLE_READ,
    FLASH_RAFFLE_WRITE,
    addTx,
    setLatestTxHash,
    data,
  } = useContext(MainContext);

  const mintPriceHuman = mintPrice / 10 ** 18;
  const jackpotHuman = jackpot / 10 ** 18;
  const [openedEnvelopes, setOpenedEnvelopes] = useState([] as any);
  const [userEnvelopes, setUserEnvelopes] = useState([] as any);
  const [userTIX, setUserTIX] = useState([] as any);
  const [refresher, setRefresher] = useState(false);
  const [mailImage, setMailImage] = useState("url(/opened.png)");
  const [burnedCount, setBurnedCount] = useState(0);
  const [blockExplorer, setBlockExplorer] = useState("");
  const { chain } = useNetwork();

  useEffect(() => {
    if (chain?.id === 9990) {
      setBlockExplorer(altLayerDevnet.blockExplorers.default.url);
    } else if (chain?.id === 599) {
      setBlockExplorer(metisTestnet.blockExplorers.default.url);
    } else if (chain?.id === 4328) {
      setBlockExplorer(bobaTestnet.blockExplorers.default.url);
    }
  }, [chain]);

  const listening = useContractEvent({
    address: FLASH_RAFFLE_ADDRESS,
    abi: FLASH_RAFFLE_ABI,
    eventName: "Transfer",
    listener(node, label, owner) {
      setRefresher(!refresher);
    },
  });

  useEffect(() => {
    const getOpenedEnvelopes = async () => {
      const openedEnvelopes = await FLASH_RAFFLE_READ.getOpenedEnvelopes();
      const userEnvelopes = openedEnvelopes.filter((envelope: any) => {
        if (envelope.claimer === address) return envelope;
      });

      const burnedCount = await FLASH_RAFFLE_READ.addressToBurnedTIX(address);
      const userTIXarray = await FLASH_RAFFLE_READ.getTokensByAddress(address);

      setBurnedCount(burnedCount);

      setUserTIX(userTIXarray);

      setUserEnvelopes(userEnvelopes);
      setOpenedEnvelopes(openedEnvelopes);
    };
    FLASH_RAFFLE_READ && getOpenedEnvelopes();
  }, [FLASH_RAFFLE_READ, refresher, data]);

  async function handleMint() {
    const tx = await FLASH_RAFFLE_WRITE.safeMint(address, { value: mintPrice });
    setLatestTxHash(tx.hash);
  }

  async function handleClaim() {
    const tx = await FLASH_RAFFLE_WRITE.claimTIX(Number(userTIX[0]), { gasLimit: 3000000 });
    setLatestTxHash(tx.hash);
  }

  function drawLatestEnvelopes() {
    const latestEnvelopes = openedEnvelopes.slice(-5);
    return latestEnvelopes.map((envelope: any) => {
      return (
        <Box
          key={envelope.envelopeId + "allEnv"}
          sx={{
            border: "0px solid #000",
            background: mailImage,
            backgroundSize: "100% 100%",
            py: "30px",
            px: "20px",
          }}
        >
          <Typography variant="h6" sx={{}}>
            {(envelope.value / 10 ** 18).toFixed(5)} ETH
          </Typography>

          <Typography fontSize={"1.1rem"}>
            &nbsp; {envelope.status === 2 && "🎉JACKPOT!🎉"}
          </Typography>

          <Typography sx={{}}>
            <Link
              href={`${blockExplorer}/address/${envelope.claimer}`}
              target="_blank"
              rel="noopener"
              color="inherit"
            >
              {envelope.claimer.slice(0, 6)}..{envelope.claimer.slice(-6)}
            </Link>
          </Typography>
        </Box>
      );
    });
  }

  function drawLatestUserEnvelopes() {
    const latestUserEnvelopes = userEnvelopes.slice(-5);
    return latestUserEnvelopes.map((envelope: any) => {
      return (
        <Box
          key={envelope.envelopeId + "draw"}
          sx={{
            border: "0px solid #000",
            background: mailImage,
            backgroundSize: "100% 100%",
            py: "15px",
            px: "3px",
          }}
        >
          <Typography variant="h6" sx={{}}>
            {(envelope.value / 10 ** 18).toFixed(5)} ETH
          </Typography>

          <Typography fontSize={"1.1rem"}>
            &nbsp; {envelope.status === 2 && "🎉JACKPOT!🎉"}
          </Typography>
        </Box>
      );
    });
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
                  onClick={handleMint}
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
                  onClick={handleMint}
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
            <Flippy flipOnClick={false} flipDirection="vertical">
              <FrontSide
                style={{ display: "flex", flexDirection: "column", alignItems: "stretch" }}
              >
                <Box
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

        <Box display="flex">
          <Box width="35%">
            <Flippy style={{ display: "flex" }} flipOnClick={true} flipDirection="horizontal">
              <FrontSide style={{ display: "flex" }}>
                <Box
                  sx={{
                    color: "#F1F333",
                    background: "#E2442F",
                    py: 11,
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
                  onClick={handleClaim}
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
                    {Number(burnedCount)} Tix 🔥ed.
                  </Typography>
                </Box>
              </FrontSide>
              <BackSide style={{}}>
                <Box
                  sx={{
                    color: "#F1F333",
                    background: "#E2442F",
                    py: 11,
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
                  onClick={handleClaim}
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
            <Flippy flipOnClick={false} flipDirection="vertical">
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
                  gap={3}
                  onMouseEnter={() => {
                    setMailImage("url(/opened4.png)");
                  }}
                  onMouseLeave={() => {
                    setMailImage("url(/opened.png)");
                  }}
                  onMouseDown={() => {
                    setMailImage("url(/opened3.png)");
                  }}
                  onMouseUp={() => {
                    setMailImage("url(/opened2.png)");
                  }}
                >
                  <Typography variant="h2" fontWeight={700}>
                    <DraftsOutlinedIcon sx={{ fontSize: "4rem" }} />
                    {} Your claims {}
                    <LocalAtmOutlinedIcon sx={{ fontSize: "4rem" }} />
                  </Typography>

                  <Typography variant="h5" fontWeight={500}>
                    <Box display="flex" flexDirection="row" gap={2}>
                      {userEnvelopes.length > 1 && drawLatestUserEnvelopes()}
                    </Box>
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
                    {} Your envelopes {}
                    <LocalAtmOutlinedIcon sx={{ fontSize: "4rem" }} />
                  </Typography>

                  <Typography variant="h5" fontWeight={500}>
                    Envelope history
                  </Typography>

                  <Typography variant="h5" fontWeight={500}>
                    <Box sx={{ display: "flex" }}></Box>
                  </Typography>
                </Box>
              </BackSide>
            </Flippy>
          </Box>
        </Box>
        <Box>
          <Flippy flipOnClick={false} flipDirection="vertical">
            <FrontSide style={{}}>
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
                onMouseEnter={() => {
                  setMailImage("url(/opened2.png)");
                }}
                onMouseLeave={() => {
                  setMailImage("url(/opened.png)");
                }}
                onMouseDown={() => {
                  setMailImage("url(/opened3.png)");
                }}
                onMouseUp={() => {
                  setMailImage("url(/opened2.png)");
                }}
                component="button"
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                gap={8}
              >
                <Typography variant="h2" fontWeight={700}>
                  <ShuffleOnOutlinedIcon sx={{ fontSize: "4rem" }} />
                  {} Community Draws {}
                  <PriceChangeOutlinedIcon sx={{ fontSize: "4rem" }} />
                </Typography>

                <Typography variant="h4" fontWeight={500}>
                  <Box display="flex" gap={6}>
                    {openedEnvelopes.length > 1 && drawLatestEnvelopes()}
                  </Box>
                </Typography>
              </Box>
            </FrontSide>
            <BackSide style={{}}>
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
      </Box>
    </ThemeProvider>
  );
}

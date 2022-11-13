import { Box } from "@mui/material";
import Nav from "./components/Nav";
import BoxButtons from "./components/BoxButtons";
import { FLASH_RAFFLE_ABI, FLASH_RAFFLE_ADDRESS } from "./constants/contractData";
import { useContract, useProvider, useSigner } from "wagmi";
import { useEffect, useState } from "react";
import { MainContext } from "./contexts/MainContext";
import { useAddRecentTransaction } from "@rainbow-me/rainbowkit";

function App() {
  const provider = useProvider();
  const { data: signer } = useSigner();
  const FLASH_RAFFLE_READ = useContract({
    address: FLASH_RAFFLE_ADDRESS,
    abi: FLASH_RAFFLE_ABI,
    signerOrProvider: provider,
  });
  const FLASH_RAFFLE_WRITE = useContract({
    address: FLASH_RAFFLE_ADDRESS,
    abi: FLASH_RAFFLE_ABI,
    signerOrProvider: signer,
  });

  const addTx = useAddRecentTransaction();

  const [mintPrice, setMintPrice] = useState(0);
  const [jackpot, setJackpot] = useState(0);

  const contextData = {
    FLASH_RAFFLE_READ,
    FLASH_RAFFLE_WRITE,
    addTx,

    mintPrice,
    jackpot,
  };

  useEffect(() => {
    async function fetchContractData() {
      if (!FLASH_RAFFLE_READ) return;
      //start async calls
      const mintPricePromise = FLASH_RAFFLE_READ.mintPrice();
      const jackpotPromise = FLASH_RAFFLE_READ.jackpotValue();
      //wait for all async calls to finish
      const [mintPrice, jackpot] = await Promise.all([mintPricePromise, jackpotPromise]);
      //set states
      setMintPrice(mintPrice);
      setJackpot(jackpot);
    }

    FLASH_RAFFLE_READ && fetchContractData();
  }, [FLASH_RAFFLE_WRITE]);

  useEffect(() => {
    console.log("mintPrice", mintPrice);
    console.log("jackpot", jackpot);
  }, [mintPrice, jackpot]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: `linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)`,
        animation: "gradient 15s ease infinite",
        maxWidth: "80%",
        margin: "0 auto",
      }}
    >
      <Nav />
      <MainContext.Provider value={contextData}>
        <BoxButtons />
      </MainContext.Provider>
    </Box>
  );
}

export default App;

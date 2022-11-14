import { Box } from "@mui/material";
import Nav from "./components/Nav";
import BoxButtons from "./components/BoxButtons";
import { FLASH_RAFFLE_ABI, FLASH_RAFFLE_ADDRESS } from "./constants/contractData";
import { useAccount, useContract, useProvider, useSigner, useWaitForTransaction } from "wagmi";
import { useEffect, useState } from "react";
import { MainContext } from "./contexts/MainContext";
import { useAddRecentTransaction } from "@rainbow-me/rainbowkit";

function App() {
  const { address } = useAccount();
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

  const [latestTxHash, setLatestTxHash] = useState<any>();
  const { data, isError, isLoading } = useWaitForTransaction({
    hash: latestTxHash,
  });
  const addTx = useAddRecentTransaction();

  const [mintPrice, setMintPrice] = useState(0);
  const [jackpot, setJackpot] = useState(0);

  const contextData = {
    address,
    FLASH_RAFFLE_READ,
    FLASH_RAFFLE_WRITE,

    addTx,
    data,
    isError,
    isLoading,

    latestTxHash,
    setLatestTxHash,
    mintPrice,
    jackpot,
  };

  useEffect(() => {
    if (data && !isError) {
      setLatestTxHash(data?.transactionHash);
    }

    if (data && latestTxHash) {
      addTx({
        hash: latestTxHash,
        description: latestTxHash,
      });
    }
  }, [data]);

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
  }, [FLASH_RAFFLE_WRITE, data]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        justifyContent: "center",
        background: `linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)`,
        animation: "gradient 15s ease infinite",
        width: { xs: "100%", md: "90%", lg: "80%" },
        margin: "0 auto",
        mb: "100px",
      }}
    >
      <MainContext.Provider value={contextData}>
        <Nav />
        <BoxButtons />
      </MainContext.Provider>
    </Box>
  );
}

export default App;

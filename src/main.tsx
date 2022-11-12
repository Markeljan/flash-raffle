import ReactDOM from "react-dom/client";
import App from "./App";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import altlayer from "/src/assets/altlayer.ico";

export const altLayerDevnet = {
  id: 9990,
  name: "AltLayer Devnet",
  network: "altlayer-devnet",
  nativeCurrency: { name: "ALT", symbol: "ALT", decimals: 18 },
  rpcUrls: {
    default: "https://devnet-rpc.altlayer.io/",
  },
  blockExplorers: {
    default: {
      name: "altlayer explorer",
      url: "https://devnet-explorer.altlayer.io/",
    },
  },
  iconUrl: altlayer,
  testnet: true,
};

const { provider } = configureChains([altLayerDevnet], [publicProvider() as any]);

const { connectors } = getDefaultWallets({
  appName: "Flash Raffle",
  chains: [altLayerDevnet],
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <WagmiConfig client={wagmiClient}>
    <RainbowKitProvider chains={[altLayerDevnet]} coolMode>
      <App />
    </RainbowKitProvider>
  </WagmiConfig>
);

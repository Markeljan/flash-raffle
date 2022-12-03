import ReactDOM from "react-dom/client";
import App from "./App";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "@rainbow-me/rainbowkit/styles.css";
import { connectorsForWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { metaMaskWallet, injectedWallet } from "@rainbow-me/rainbowkit/wallets";
import { configureChains, createClient, WagmiConfig, chain } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { WebSocketProvider } from "@ethersproject/providers";

const { provider } = configureChains(
  [chain.optimism],
  [alchemyProvider({ apiKey: "I9I-K6j-kpt0pKOfHX1jkx7KcVcusEq5" })]
);

const connectors = connectorsForWallets([
  {
    groupName: "Supported Wallets",
    wallets: [
      injectedWallet({ chains: [chain.optimism] }),
      metaMaskWallet({ chains: [chain.optimism] }),
    ],
  },
]);

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

const customTheme: any = {
  fonts: {
    body: "Roboto, sans-serif",
  },
  radii: {
    actionButton: "0px",
    connectButton: "0px",
    menuButton: "0px",
    modal: "0px",
    modalMobile: "0px",
  },
  colors: {
    accentColor: "#e73c7e",
    accentColorForeground: "#ffffff",
    actionButtonBorder: "#ffffff",
    closeButton: "#ffffff",
    connectButtonText: "#ffffff",
    modalBackdrop: "rgba(0, 0, 0, 0.5)",
    modalBackground: "#e73c7e",
    modalBorder: "#ffffff",
    modalText: "#ffffff",
    modalTextDim: "#ffffff",
    modalTextSecondary: "#ffffff",
    selectedOptionBorder: "#ffffff",
    standby: "#ffffff",
  },
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <WagmiConfig client={wagmiClient}>
    <RainbowKitProvider
      chains={[chain.optimism]}
      coolMode
      theme={customTheme}
      showRecentTransactions
    >
      <App />
    </RainbowKitProvider>
  </WagmiConfig>
);

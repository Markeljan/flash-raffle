import ReactDOM from "react-dom/client";
import App from "./App";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "@rainbow-me/rainbowkit/styles.css";
import { connectorsForWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { metaMaskWallet, injectedWallet } from "@rainbow-me/rainbowkit/wallets";
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

export const metisTestnet = {
  id: 599,
  name: "Metis Goerli Testnet",
  network: "metis-goerli-testnet",
  nativeCurrency: { name: "tMetis", symbol: "Metis", decimals: 18 },
  rpcUrls: {
    default: "https://goerli.gateway.metisdevops.link",
  },
  blockExplorers: {
    default: {
      name: "MetisGoerli explorer",
      url: "https://goerli.explorer.metisdevops.link",
    },
  },
  iconUrl:
    "https://bafybeigfoc2kcz653wevlhsb37odh3pbwzt4cczziomwfglxi7pdmnfj44.ipfs.nftstorage.link/metis.png",
  testnet: true,
};

const { provider } = configureChains([altLayerDevnet, metisTestnet], [publicProvider() as any]);

const connectors = connectorsForWallets([
  {
    groupName: "Supported Wallets",
    wallets: [
      injectedWallet({ chains: [altLayerDevnet, metisTestnet] }),
      metaMaskWallet({ chains: [altLayerDevnet, metisTestnet] }),
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
      chains={[altLayerDevnet, metisTestnet]}
      coolMode
      theme={customTheme}
      showRecentTransactions
    >
      <App />
    </RainbowKitProvider>
  </WagmiConfig>
);

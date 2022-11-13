import { Button, ThemeProvider } from "@mui/material";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { theme } from "../utils/buttonTheme";

export const CustomConnect = () => {
  return (
    <ThemeProvider theme={theme}>
      <ConnectButton.Custom>
        {({ account, chain, openAccountModal, openChainModal, openConnectModal, mounted }) => {
          const ready = mounted;
          const connected = ready && account && chain;

          return (
            <div
              {...(!ready && {
                "aria-hidden": true,
                style: {
                  opacity: 0,
                  pointerEvents: "none",
                  userSelect: "none",
                },
              })}
            >
              {(() => {
                if (!connected) {
                  return <Button onClick={openConnectModal}>Connect Wallet</Button>;
                }

                if (chain.unsupported) {
                  return <Button onClick={openChainModal}>Wrong network</Button>;
                }

                return (
                  <div style={{ display: "flex", gap: 12 }}>
                    <Button
                      onClick={openChainModal}
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      {chain.hasIcon && (
                        <div
                          style={{
                            background: chain.iconBackground,
                            width: 12,
                            height: 12,
                            borderRadius: 999,
                            overflow: "hidden",
                            marginRight: 4,
                          }}
                        >
                          {chain.iconUrl && (
                            <img
                              alt={chain.name ?? "Chain icon"}
                              src={chain.iconUrl}
                              style={{ width: 12, height: 12 }}
                            />
                          )}
                        </div>
                      )}
                      {chain.name}
                    </Button>

                    <Button onClick={openAccountModal}>
                      {account.displayName}
                      {account.displayBalance ? ` (${account.displayBalance})` : ""}
                    </Button>
                  </div>
                );
              })()}
            </div>
          );
        }}
      </ConnectButton.Custom>
    </ThemeProvider>
  );
};

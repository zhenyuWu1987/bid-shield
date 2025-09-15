import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Wallet, Shield } from "lucide-react";

export const WalletConnect = () => {
  return (
    <div className="flex items-center gap-3">
      <ConnectButton.Custom>
        {({
          account,
          chain,
          openAccountModal,
          openChainModal,
          openConnectModal,
          authenticationStatus,
          mounted,
        }) => {
          // Note: If your app doesn't use authentication, you
          // can remove all 'authenticationStatus' checks
          const ready = mounted && authenticationStatus !== 'loading';
          const connected =
            ready &&
            account &&
            chain &&
            (!authenticationStatus ||
              authenticationStatus === 'authenticated');

          return (
            <div
              {...(!ready && {
                'aria-hidden': true,
                'style': {
                  opacity: 0,
                  pointerEvents: 'none',
                  userSelect: 'none',
                },
              })}
            >
              {(() => {
                if (!connected) {
                  return (
                    <button 
                      onClick={openConnectModal} 
                      type="button"
                      className="wallet-connect-btn"
                    >
                      <Wallet className="w-4 h-4 mr-2" />
                      Connect Wallet
                    </button>
                  );
                }

                if (chain.unsupported) {
                  return (
                    <button onClick={openChainModal} type="button" className="bg-red-500 text-white px-4 py-2 rounded-lg">
                      Wrong network
                    </button>
                  );
                }

                return (
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 bg-accent/10 text-accent px-3 py-2 rounded-lg">
                      <div className="w-2 h-2 bg-accent rounded-full"></div>
                      <span className="text-sm font-medium">
                        {account.displayName}
                      </span>
                    </div>
                    <button
                      onClick={openAccountModal}
                      type="button"
                      className="text-muted-foreground hover:text-foreground px-3 py-2 rounded-lg border border-border hover:border-foreground/20 transition-colors"
                    >
                      Account
                    </button>
                  </div>
                );
              })()}
            </div>
          );
        }}
      </ConnectButton.Custom>
      
      <div className="flex items-start gap-3 p-4 bg-accent/5 rounded-lg border border-accent/20">
        <Shield className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
        <div className="text-sm">
          <p className="font-medium text-accent mb-1">Secure Connection</p>
          <p className="text-muted-foreground">
            Your wallet connection is encrypted and secure. We never store your private keys.
          </p>
        </div>
      </div>
    </div>
  );
};
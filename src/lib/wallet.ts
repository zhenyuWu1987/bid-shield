import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { sepolia } from 'wagmi/chains';
import { config } from '../../config';

export const wagmiConfig = getDefaultConfig({
  appName: 'BidShield',
  projectId: config.walletConnectProjectId,
  chains: [sepolia],
  ssr: false,
});

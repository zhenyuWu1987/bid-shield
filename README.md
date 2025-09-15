# BidShield - Confidential Freelancer Bidding Platform

## Overview

BidShield is a revolutionary blockchain-powered platform that enables freelancers to submit confidential job proposals using fully homomorphic encryption (FHE). This ensures fair competition by preventing competitors from undercutting bids while maintaining complete privacy of proposal details.

## Key Features

- **Confidential Bidding**: Submit encrypted job proposals that remain sealed until the deadline
- **FHE Encryption**: Advanced fully homomorphic encryption protects sensitive bid data
- **Blockchain Security**: Smart contracts ensure bid integrity and fair reveal process
- **Wallet Integration**: Connect with popular crypto wallets for secure authentication
- **Fair Competition**: Simultaneous bid reveal prevents competitive undercutting

## Technology Stack

- **Frontend**: React 18, TypeScript, Vite
- **UI Components**: shadcn/ui, Radix UI, Tailwind CSS
- **Blockchain**: Ethereum (Sepolia testnet), FHEVM
- **Wallet Integration**: RainbowKit, Wagmi, Viem
- **Smart Contracts**: Solidity with FHE support

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Git
- A crypto wallet (MetaMask, WalletConnect, etc.)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/zhenyuWu1987/bid-shield.git
cd bid-shield
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Configure the following environment variables:
```
NEXT_PUBLIC_CHAIN_ID=11155111
NEXT_PUBLIC_RPC_URL=https://sepolia.infura.io/v3/b18fb7e6ca7045ac83c41157ab93f990
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=2ec9743d0d0cd7fb94dee1a7e6d33475
NEXT_PUBLIC_INFURA_API_KEY=b18fb7e6ca7045ac83c41157ab93f990
```

4. Start the development server:
```bash
npm run dev
```

5. Open [http://localhost:5173](http://localhost:5173) in your browser

## How It Works

### 1. Browse Jobs
- Discover high-quality projects from verified clients
- Filter by skills, budget, and timeline
- View detailed project requirements

### 2. Submit Sealed Bid
- Your proposal is encrypted using FHE on your device
- Encrypted bid is sealed in a smart contract
- No one can view your bid until the deadline

### 3. Fair Selection
- All sealed bids are revealed simultaneously
- Evaluation based on merit, not competition
- Transparent and fair selection process

## Security Features

- **AES-256 Encryption**: Military-grade encryption for bid data
- **Blockchain Sealing**: Smart contracts prevent tampering
- **Zero Knowledge**: Even platform operators cannot see bid contents
- **Wallet Security**: Identity tied to crypto wallet for maximum security

## Smart Contract

The platform uses FHE-enabled smart contracts to:
- Store encrypted bid data
- Manage bid sealing and reveal process
- Ensure fair competition
- Handle fund escrow and distribution

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support and questions:
- Create an issue in the GitHub repository
- Contact the development team
- Check the documentation

## Roadmap

- [ ] Multi-chain support
- [ ] Advanced FHE operations
- [ ] Mobile app development
- [ ] API for third-party integrations
- [ ] Reputation system
- [ ] Dispute resolution mechanism

---

Built with ❤️ using blockchain technology and FHE encryption.
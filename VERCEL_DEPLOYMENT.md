# Vercel Deployment Guide for BidShield

## Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **GitHub Repository**: Ensure your code is pushed to GitHub
3. **Environment Variables**: Prepare the required configuration

## Step-by-Step Deployment Process

### Step 1: Connect to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "New Project" or "Import Project"
3. Connect your GitHub account if not already connected
4. Select the `zhenyuWu1987/bid-shield` repository

### Step 2: Configure Project Settings

1. **Project Name**: `bid-shield` (or your preferred name)
2. **Framework Preset**: Select "Vite"
3. **Root Directory**: Leave as default (`.`)
4. **Build Command**: `npm run build`
5. **Output Directory**: `dist`
6. **Install Command**: `npm install`

### Step 3: Environment Variables Configuration

Add the following environment variables in Vercel dashboard:

```
VITE_CHAIN_ID=11155111
VITE_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_KEY
VITE_WALLET_CONNECT_PROJECT_ID=YOUR_WALLET_CONNECT_PROJECT_ID
VITE_INFURA_API_KEY=YOUR_INFURA_API_KEY
```

**Note**: Replace the placeholder values with your actual API keys:
- Get Infura API key from [infura.io](https://infura.io)
- Get WalletConnect Project ID from [cloud.walletconnect.com](https://cloud.walletconnect.com)

**How to add environment variables:**
1. In your Vercel project dashboard, go to "Settings"
2. Click on "Environment Variables"
3. Add each variable with the exact values above
4. Make sure to set them for "Production", "Preview", and "Development"

### Step 4: Build Configuration

Create a `vercel.json` file in your project root (optional but recommended):

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### Step 5: Deploy

1. Click "Deploy" button in Vercel dashboard
2. Wait for the build process to complete (usually 2-5 minutes)
3. Your app will be available at the provided Vercel URL

### Step 6: Custom Domain (Optional)

1. In your Vercel project dashboard, go to "Settings"
2. Click on "Domains"
3. Add your custom domain
4. Follow the DNS configuration instructions

## Important Configuration Notes

### Chain Configuration
- **Chain ID**: 11155111 (Sepolia Testnet)
- **RPC URL**: Using Infura for reliable connection
- **Alternative RPC**: 1rpc.io as backup

### Wallet Connect
- **Project ID**: Required for WalletConnect integration
- **Supported Wallets**: MetaMask, WalletConnect, Coinbase Wallet, etc.

### Security Considerations
- All sensitive data is encrypted using FHE
- Private keys are never stored on the platform
- Wallet connections are handled securely by RainbowKit

## Troubleshooting

### Common Issues

1. **Build Failures**
   - Check that all dependencies are in `package.json`
   - Ensure environment variables are set correctly
   - Verify Node.js version compatibility

2. **Wallet Connection Issues**
   - Verify WalletConnect Project ID is correct
   - Check that RPC URLs are accessible
   - Ensure proper network configuration

3. **Environment Variables Not Loading**
   - Make sure variables start with `VITE_` prefix
   - Check that variables are set for all environments
   - Redeploy after adding new variables

### Build Logs
- Check Vercel build logs for detailed error information
- Common issues include missing dependencies or incorrect paths

## Post-Deployment

### Testing
1. Test wallet connection functionality
2. Verify all UI components render correctly
3. Check responsive design on mobile devices
4. Test navigation and routing

### Monitoring
1. Set up Vercel Analytics (optional)
2. Monitor build performance
3. Check for any runtime errors

## Production Checklist

- [ ] Environment variables configured
- [ ] Build successful
- [ ] Wallet connection working
- [ ] All pages accessible
- [ ] Mobile responsive
- [ ] Custom domain configured (if applicable)
- [ ] Analytics set up (optional)

## Support

For deployment issues:
1. Check Vercel documentation
2. Review build logs
3. Verify environment configuration
4. Contact Vercel support if needed

---

**Deployment URL**: Your app will be available at `https://your-project-name.vercel.app`

**Repository**: https://github.com/zhenyuWu1987/bid-shield

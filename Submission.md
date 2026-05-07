# NFT Analytics & MetaMask Integration - Submission

## Overview
This project implements an NFT analytics API along with MetaMask wallet connection functionality using ethers.js and window.ethereum.

---

## 🚀 Implemented Features

### 1. NFT Analytics API
Created a REST API endpoint:
GET /token/nft-analytics


### Response Format:
```json
{
  "error": false,
  "data": {
    "totalNFTs": 0,
    "walletAddresses": []
  }
}
Functionality:
Fetches all NFT/token records from database using Sequelize
Calculates total number of NFTs
Extracts wallet addresses from NFT records
Filters and validates Ethereum addresses using ethers.js
Removes duplicate wallet addresses
Handles empty database case safely
2. Wallet Address Validation
Used ethers.js isAddress() utility
Ensures only valid Ethereum addresses are included in response
Prevents invalid blockchain data from API output
3. Error Handling
Standardized API error format:
{ "error": true, "message": "error description" }
Proper HTTP status codes used:
200 → Success response
500 → Server errors
Follows existing project structure in controllers and routes
4. MetaMask Wallet Integration

Implemented frontend wallet connection using:

window.ethereum detection
eth_requestAccounts for wallet connection
ethers.js compatible address handling
Flow:
User clicks "Connect Wallet"
MetaMask popup appears
User approves connection
Wallet address is retrieved and stored in state
UI updates with connected wallet
Edge Cases Handled:
MetaMask not installed
User rejects connection request
Account switching detection
Wallet disconnect handling
Page refresh persistence support (if applicable)
🔧 Tech Used
Node.js + Express
Sequelize (Database ORM)
ethers.js (Ethereum utilities)
MetaMask (window.ethereum)
React (Frontend integration)
📌 Notes
Focus was kept on NFT analytics + wallet connectivity
ethers.js used only for address validation and blockchain compatibility
Clean separation of controller, route, and frontend hook logic
API follows existing project structure and conventions


# BARK Actions and Blinks NFTs

Easily claim your exclusive BARK NFTs using our Blink and Action APIs. **BARK (Blockchain Asset and Reward Keeper)** is a platform designed to simplify and enhance interactions with blockchain-based assets, particularly on the Solana network. **BARK Blink** is a core feature of this platform, aimed at making blockchain actions more accessible and user-friendly.

## BARK Blink Description

**BARK Blink** streamlines key interactions on the Solana blockchain with a user-friendly interface. It facilitates various tasks such as sending messages, donating, staking tokens, and transferring assets. The goal of BARK Blink is to enhance the efficiency and accessibility of BARK Protocol’s blockchain operations for users.

## Key Features

1. **On-chain Memo**:
   - **Description**: Send simple text messages directly to the Solana blockchain using an SPL Memo. Useful for annotating transactions or recording messages permanently on-chain.

2. **Staking NFT**:
   - **Description**: Stake NFTs to a validator to help secure the Solana network and earn rewards.

3. **Transfer NFT and SPL Tokens**:
   - **Description**: Transfer BARK or SPL tokens, which are tokens built on the Solana network. This feature is currently optional and can be enabled for additional functionality.

4. **Mint an NFT**:
   - **Description**: Mint NFTs (Non-Fungible Tokens) on the Solana blockchain. This feature allows users to create unique digital collectibles. It is currently optional and can be enabled as needed.

5. **Donate**:
   - **Description**: Make donations to support causes or projects.

6. **Collection**:
   - **Description**: Manage your NFT collection across various services.

7. **Governance**:
   - **Description**: Participate in community or governance voting.

8. **Membership**:
   - **Description**: View and manage wallet settings and details.

## Logical Flow

1. **Landing Page**:
   - **Overview**: Users are welcomed with an introduction to BARK and its features.
   - **Call to Action**: Options to explore functionalities like sending memos, staking SOL, or transferring assets.

2. **Application Screenshots**:

   2.1. **UI/UX**
   ![UI Screenshot](.github/assets/screenshot.png)

   2.2. **Features**
   ![Transfer SOL Screenshot](.github/assets/features.png)

   2.3. **Action**
   ![Transaction Screenshot](.github/assets/transfer-sol.png)

3. **Feature Selection**:
   - Users select the action they wish to perform from a list of available features.
   - Each feature includes a description and an icon for easy identification.

4. **Execution of Actions**:
   - **On-chain Memo**: Input and submit a message to be recorded on-chain.
   - **Staking NFTs**: Choose a validator and specify the amount of SOL to stake. The platform processes the staking transaction.
   - **Transfer SPL Tokens**: Similar to native SOL transfers but for SPL tokens (if enabled).
   - **Mint an NFT**: Select a collection and mint a new NFT (if enabled).
   - **Donate**: Make a donation to a selected cause or project.
   - **Governance**: Participate in governance or community voting.
   - **Claim NFTs**: Access and adjust wallet settings and details.

5. **Confirmation and Feedback**:
   - Receive confirmation of transaction success or failure.
   - View transaction details and updated balances or records.

6. **Integration and User Experience**:
   - Designed for intuitive navigation and efficient task completion.
   - Provides additional resources or help options for users needing assistance.

## Installation

To get started with BARK Blink, follow these steps:

1. **Clone the Repository**

   ```bash
   git clone https://github.com/barkprotocol/bark-actions-nft.git
   ```

2. **Navigate to the Project Directory**

   ```bash
   cd bark-actions-nft
   ```

3. **Install Dependencies**

   ```bash
   npm install
   ```

   or

   ```bash
   yarn install
   ```

4. **Run the Development Server**

   ```bash
   npm run dev
   ```

   or

   ```bash
   yarn dev
   ```

   The app will be available at `http://localhost:3000`.

## Configuration

### Environment Variables

Ensure you have a `.env.local` file in the root of the project with the necessary configuration. For example:

```env
NEXT_PUBLIC_SOLANA_NETWORK=devnet
NEXT_PUBLIC_SOLANA_RPC_URL=https://api.devnet.solana.com
NEXT_PUBLIC_MINT_API_URL=https://api.actions.barkprotocol.net/mint // Example
```

Replace the values with your actual configuration details.

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Create a new Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- **Solana**: [Solana](https://solana.com) for the blockchain infrastructure.
- **Next.js**: [Next.js](https://nextjs.org) for the React framework.
- **Lucide Icons**: [Lucide Icons](https://lucide.dev) for the icon library.
- **React Icons**: [React Icons](https://react-icons.github.io/react-icons) for the social media icons.

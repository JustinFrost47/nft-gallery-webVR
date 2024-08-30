import { Button } from "@/components/ui/button"
import  {createMint, getOrCreateAssociatedTokenAccount, mintTo,  TOKEN_PROGRAM_ID} from '@solana/spl-token'
import {Keypair, Connection, clusterApiUrl, PublicKey } from'@solana/web3.js'

import bs58 from 'bs58'

// import React from 'react'

export default function MintNfts() {

  const createTokenMint = async () => {

	const payer = Keypair.fromSecretKey(bs58.decode(import.meta.env.VITE_PRIVATE_KEY ));


	const mintAthority = payer;

	const connection = new Connection(clusterApiUrl('devnet'));

	const mint = await createMint(
        connection,
        payer,
        mintAthority.publicKey,
        null,
        6,
		undefined,
		undefined,
		TOKEN_PROGRAM_ID
    );
    console.log('Mint created at', mint.toBase58());
	console.log(mint)
    return mint;


  }

  const mintNewTokens = async (mint :any , to : any , amount: number) => { 

	const payer = Keypair.fromSecretKey(bs58.decode(import.meta.env.VITE_PRIVATE_KEY ));



	const connection = new Connection(clusterApiUrl('devnet'), {
		commitment: "confirmed",
	  });


    const tokenAccount = await getOrCreateAssociatedTokenAccount(
        connection,
        payer,
        mint,
        new PublicKey(to)
      );

      console.log('Token account created at', tokenAccount.address.toBase58());
      await mintTo(
        connection,
        payer,
        mint,
        tokenAccount.address,
        payer,
        amount
      )
      console.log('Minted', amount, 'tokens to', tokenAccount.address.toBase58());
}

	const mintNfts = async () =>{



		const mint = await createTokenMint();
		await mintNewTokens(mint, import.meta.env.VITE_PUBLIC_KEY, 100); 

	}


  return (
    <div className="flex flex-row justify-center items-center min-h-96">
            <div className="nft-images ">
          
            </div>
            <Button onClick={mintNfts}>Mint</Button>
    </div>
  )
}

// const sampleReply = {
// 	"success": true,
// 	"data": {
// 		"data_type": "onchain",
// 		"tokens": [
// 			{
// 				"address": "Gu9VvQP4M77VHMkSiuqCbKRWqu9eky8LtWKKMSj72orm",
// 				"tokenAddress": "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
// 				"amount": 76228102,
// 				"decimals": 6,
// 				"owner": "9BKWqDHfHZh9j39xakYVMdr6hXmCLHH5VfCpeq2idU9L",
// 				"reputation": "ok",
// 				"priceUsdt": 0.999971,
// 				"tokenName": "USD Coin",
// 				"tokenSymbol": "USDC",
// 				"tokenIcon": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png",
// 				"balance": 76.228102,
// 				"value": 76.225891385042
// 			},
// 			{
// 				"address": "3jxGmsx7MpWZZ4AW5wKmXLzY2Li5SieAhvHWsbddmhcy",
// 				"tokenAddress": "2znw8JBTW1w2HBNiRwsTpbunjZVZ3uiGdHUt9M72i2oN",
// 				"amount": 2000000000,
// 				"decimals": 9,
// 				"owner": "9BKWqDHfHZh9j39xakYVMdr6hXmCLHH5VfCpeq2idU9L",
// 				"tokenName": "_eNFTGift.com",
// 				"tokenSymbol": "NFT",
// 				"tokenIcon": "https://www.phantomdownload.com/img.png",
// 				"balance": 2
// 			},
// 			{
// 				"address": "8r1bbLWKEZZvSxH3Q1bwC1t611oRm4k2AJ9VjKQsbvAu",
// 				"tokenAddress": "XzR7CUMqhDBzbAm4aUNvwhVCxjWGn1KEvqTp3Y8fFCD",
// 				"amount": 2000000000,
// 				"decimals": 9,
// 				"owner": "9BKWqDHfHZh9j39xakYVMdr6hXmCLHH5VfCpeq2idU9L",
// 				"reputation": "spam",
// 				"tokenName": "_eNFTGift.com",
// 				"tokenSymbol": "NFT",
// 				"tokenIcon": "https://raw.githubusercontent.com/xxmafiaxxx/doobietokens/main/scam.png",
// 				"balance": 2
// 			},
// 			{
// 				"address": "wLDh8PibLtnpt8HFCZ1udk8WBXvsCFcQSeYZTJ6HZno",
// 				"tokenAddress": "So11111111111111111111111111111111111111112",
// 				"amount": 1755000,
// 				"decimals": 9,
// 				"owner": "9BKWqDHfHZh9j39xakYVMdr6hXmCLHH5VfCpeq2idU9L",
// 				"reputation": "ok",
// 				"priceUsdt": 154.38,
// 				"tokenName": "Wrapped SOL",
// 				"tokenSymbol": "SOL",
// 				"tokenIcon": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png",
// 				"balance": 0.001755,
// 				"value": 0.2709369
// 			},
// 			{
// 				"address": "C2MdggmPUrGi8inyPTYgehBcNx4nXnr4FyxHJg8E2Pwh",
// 				"tokenAddress": "7wkuKBa3ysQiehvH41BFebZd6rLUhuEoQwGTinE3k4jw",
// 				"amount": 10000000000,
// 				"decimals": 6,
// 				"owner": "9BKWqDHfHZh9j39xakYVMdr6hXmCLHH5VfCpeq2idU9L",
// 				"tokenName": "luckybuy.online",
// 				"tokenSymbol": "CRYSTALS",
// 				"tokenIcon": "https://magiceden.io/_next/image?url=https%3A%2F%2Fnext.cdn.magiceden.dev%2F_next%2Fstatic%2Fmedia%2Fme_diamond_animated.fe0465d5.gif&w=96&q=75",
// 				"balance": 10000
// 			},
// 			{
// 				"address": "CkV3BhQ4x73tatnLCy2fmuUr2gUGEKHgeBE9n6YBTqP1",
// 				"tokenAddress": "DL23jAY3qCG7G9W1fSQETzMjLmwUL9hKmiwEedCDK9ww",
// 				"amount": 5000000000,
// 				"decimals": 9,
// 				"owner": "9BKWqDHfHZh9j39xakYVMdr6hXmCLHH5VfCpeq2idU9L",
// 				"reputation": "spam",
// 				"tokenName": "ClaimNFTGift.com",
// 				"tokenSymbol": "NFT",
// 				"tokenIcon": "",
// 				"balance": 5
// 			},
// 			{
// 				"address": "4NQzSczudGaK3FUhLASFLWiHxbseyKLSZgFT2awmQxHd",
// 				"tokenAddress": "Gxg1xWL2UsMAFTDDNqZeMYg4f3CkqcLCQrGbc7J9VAnc",
// 				"amount": 14000002,
// 				"decimals": 6,
// 				"owner": "9BKWqDHfHZh9j39xakYVMdr6hXmCLHH5VfCpeq2idU9L",
// 				"tokenName": "jupfinally.com 🎁 Airdrop",
// 				"tokenSymbol": "JUPDROP",
// 				"tokenIcon": "https://static.jup.ag/jup/icon.png",
// 				"balance": 14.000002
// 			},
// 			{
// 				"address": "3NvUR9K232z6mGPoQX8EXD4nz1sqGL7reQfeQEDd5R2L",
// 				"tokenAddress": "7atgF8KQo4wJrD5ATGX7t1V2zVvykPJbFfNeVf1icFv1",
// 				"amount": 288000000,
// 				"decimals": 2,
// 				"owner": "9BKWqDHfHZh9j39xakYVMdr6hXmCLHH5VfCpeq2idU9L",
// 				"reputation": "neutral",
// 				"priceUsdt": 9.39269e-7,
// 				"tokenName": "catwifhat",
// 				"tokenSymbol": "$CWIF",
// 				"tokenIcon": "https://bafkreigmg552j5o5qv5ra6hvg4by4qzjjichzsyaljhmyvwe5qkjphgxoi.ipfs.nftstorage.link",
// 				"balance": 2880000,
// 				"value": 2.70509472
// 			}
// 		],
// 		"count": 8
// 	},
// 	"metadata": {
// 		"tokens": {
// 			"So11111111111111111111111111111111111111112": {
// 				"token_address": "So11111111111111111111111111111111111111112",
// 				"token_name": "Wrapped SOL",
// 				"token_symbol": "SOL",
// 				"token_icon": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png",
// 				"token_decimals": 9,
// 				"token_type": "token",
// 				"holder": 586362,
// 				"price_usdt": 154.38,
// 				"extensions": {
// 					"coingeckoId": "solana",
// 					"serumV3Usdc": "9wFFyRfZBsuAha4YcuxcXLKwMxJR43S7fPfQLusDBzvT",
// 					"serumV3Usdt": "HWHvQhFmJB3NUcu1aihKmrKegfVxBEHzwVX6yZCKEsi1",
// 					"website": "https://solana.com/"
// 				},
// 				"reputation": "ok",
// 				"onchain_extensions": "",
// 				"sync_setting": {
// 					"isForceSync": 0,
// 					"disableAutoSync": 0
// 				}
// 			},
// 			"So11111111111111111111111111111111111111111": {
// 				"token_address": "So11111111111111111111111111111111111111111",
// 				"token_decimals": 9,
// 				"token_name": "SOL",
// 				"token_symbol": "SOL",
// 				"token_type": "token",
// 				"token_icon": "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png",
// 				"price_usdt": 154.38
// 			}
// 		},
// 		"accounts": {},
// 		"programs": {},
// 		"nftCollections": {},
// 		"nftMarketplaces": {}
// 	}
// }
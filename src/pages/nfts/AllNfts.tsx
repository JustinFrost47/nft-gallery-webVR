import { Button } from "@/components/ui/button"
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults'
import { mplTokenMetadata, fetchAllDigitalAssetByOwner } from '@metaplex-foundation/mpl-token-metadata'
import { PublicKey, Connection } from "@solana/web3.js"
import { TOKEN_PROGRAM_ID, AccountLayout } from '@solana/spl-token';

// import React from 'react'
const TOKEN_METADATA_PROGRAM_ID = new PublicKey(
  'TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb' // Update this with the correct program ID for program 22
);


export default function AllNfts() {

  const getNfts = async () => {
    // Use the RPC endpoint of your choice.
  const umi = createUmi(import.meta.env.VITE_RPC_URL).use(mplTokenMetadata())

  const connection = new Connection(import.meta.env.VITE_RPC_URL)
    // Convert the public key string to a PublicKey object
    const publicKey = new PublicKey(import.meta.env.VITE_PUBLIC_KEY);

    // Fetch token accounts by the owner
    const tokenAccounts = await connection.getTokenAccountsByOwner(publicKey, {
      programId: TOKEN_PROGRAM_ID,
    });



  const assets = await fetchAllDigitalAssetByOwner(umi, import.meta.env.VITE_PUBLIC_KEY)
  console.log("hi")
  console.log(tokenAccounts)


  }

  

  return (
    <div className="flex flex-row justify-center items-center min-h-96">
            <div className="nft-images ">
          
            </div>
            <Button onClick={getNfts}>Click me</Button>
    </div>
  )
}

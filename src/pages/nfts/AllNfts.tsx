import { useState } from "react";
import { Button } from "@/components/ui/button"
import { Connection, PublicKey } from "@solana/web3.js";
import { AccountLayout, getTokenMetadata } from "@solana/spl-token";
import axios from 'axios';

const TOKEN_2022_PROGRAM_ID = new PublicKey(
  'TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb' // Replace with the Token-2022 program ID if different
);

let tokens: any;

export default function AllNfts() {

  const [loading, setLoading] = useState(true);

  const getNfts = async () => {
    // Use the RPC endpoint of your choice.


    const connection = new Connection(import.meta.env.VITE_RPC_URL)
    // Convert the public key string to a PublicKey object
    const publicKey = import.meta.env.VITE_PUBLIC_KEY



    getTokenAccounts(publicKey, connection)



  }

  async function getTokenAccounts(wallet: string, connection: Connection) {
    try {
      const tokenAccounts = await connection.getTokenAccountsByOwner(new PublicKey(wallet), {
        programId: TOKEN_2022_PROGRAM_ID,
      });
      console.log(tokenAccounts)

      const tokensWithMetadata = await Promise.all(
        tokenAccounts.value.map(async (accountInfo) => {
          const accountData = AccountLayout.decode(accountInfo.account.data);
          const mintPublicKey = new PublicKey(accountData.mint);

          // Fetch metadata account for the token mint using findProgramAddressSync
          const metadata = await getTokenMetadata(
            connection,
            mintPublicKey, // Mint Account address
          );
          let metadataDetails = null;
          if (metadata && metadata.uri) {
            try {
              // Fetch additional metadata from the URI
              const response = await axios.get(metadata.uri);
              metadataDetails = response.data;
            } catch (uriError) {
              console.error('Failed to fetch metadata from URI:', uriError);
            }
          }

          return {
            mint: mintPublicKey.toString(),
            amount: accountData.amount.toString(),
            metadata: metadataDetails || metadata,
          };
        })
      );

      tokens = tokensWithMetadata
      console.log(tokens)
    } catch (error) {
      console.error('Failed to fetch tokens:', error);
    } finally {
      setLoading(false);
    }
  };



  return (
    <div>
      {loading ? (
        <p>Loading...
          <Button onClick={getNfts} />
        </p>
      ) : (
        <ul>
          {tokens.map((token: any, index: number) => (
            <li key={index}>
              <p>Mint: {token.mint}</p>
              <p>Amount: {token.amount}</p>
              <p>Metadata: {token.metadata ? token.metadata : 'No Metadata'}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );

}

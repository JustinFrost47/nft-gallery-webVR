import { useState, useEffect } from "react";
import ViewNft from "./ViewNft";
import VrGallery from "../3dGallery/VrGallery";
import IntroScreen from "../home/IntroScreen";


import { Connection, PublicKey } from "@solana/web3.js";
import { AccountLayout, getTokenMetadata } from "@solana/spl-token";
import axios from 'axios';

const TOKEN_2022_PROGRAM_ID = new PublicKey(
  'TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb' // Replace with the Token-2022 program ID if different
);

let tokens: any;

const defaultImage = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNK7-n-r_w_qCEIjsnu8VXMBamUkSmLUr9Eg&s"

export default function AllNfts() {

  const [loading, setLoading] = useState(true);
  const [view, setView] = useState(false)
  const [metaData, setMetadata] = useState({})
  const [mode, setMode] = useState("")



  useEffect(() => {

    const TokenData = async () => {
      getTokenAccounts()
    }

    TokenData()

  }, [])


  async function getTokenAccounts() {
    const connection : Connection = new Connection(import.meta.env.VITE_RPC_URL)
    const publicKey : string = import.meta.env.VITE_PUBLIC_KEY

    try {
      const tokenAccounts = await connection.getTokenAccountsByOwner(new PublicKey(publicKey), {
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

  const ShowViewer = (data : any) => {
    setMetadata(data)
    setView(true)
  }



  return (
    <div className="flex flex-column items-center justify-center">
      {loading ? (
        <p>Loading...
          
        </p>
      ) : (

        <>
        {mode && mode==="2d" && (
          // <div className='text-center text-5xl p-8 m-4 text-white'> Holo-Vista </div>
                  <div className=" w-10/12  min-h-96  flex flex-row items-center justify-center flex-wrap ">



          
                  {tokens.map((token: any, index: number) => (
                    <div key={index}>
                              <div onClick={() => ShowViewer(token)} className="min-h-80 w-72 bg-white m-8 rounded-2xl p-4 hover:shadow-2xl hover:cursor-pointer">
                  <img src={token.metadata.image || defaultImage} alt="Image" className=" w-64 min-h-72 rounded-2xl"  />
                  <div className=" text-center p-4">{token.metadata.name || "Unnamed"}</div>
                  
              </div>
              {view && <ViewNft view={view} setView={setView} metadata={metaData}/>}
              </div>
                  ))}
                
                  
                </div>
        )}
        {mode && mode==="3d" && (
          <VrGallery/>
        )}
        </>

      )}
      <IntroScreen mode={mode} setMode={setMode}/>
    </div>
  );

}

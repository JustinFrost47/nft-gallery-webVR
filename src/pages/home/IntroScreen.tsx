import { useState } from "react"
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton, WalletDisconnectButton } from "@solana/wallet-adapter-react-ui";
import SelectWalletOption from "./SelectWalletOption";


import '@solana/wallet-adapter-react-ui/styles.css'


interface IntroScreenProps {
    mode : string;
    setMode : any;
    walletMode: string;
    setWalletMode: (value: string) => void;
}



export default function IntroScreen({mode, setMode, walletMode, setWalletMode} : IntroScreenProps) {

    const {connected} = useWallet()

    const [showIntro, setShowIntro] = useState(true)


    const switchMode3D = () => {

        setShowIntro(!showIntro)
        setMode('3d')
        console.log(mode)
    }

    const switchMode2D = () => {

        setShowIntro(!showIntro)
        setMode('2d')

    }

    return (
        <>
        {showIntro && (
                    <div className="fixed inset-0 bg-gray-700   bg-opacity-50 flex justify-center items-center">
                    <div className="relative bg-[url('/2d.jpg')] bg-cover bg-center bg-no-repeat p-6 rounded-lg shadow-lg w-full  h-full flex flex-col items-center justify-center overflow-scroll">

                        <div className="text-6xl text-white p-8  ">HoloVista</div>
                        <div className="text-3xl text-white  p-8   ">Share and View NFTs in Style</div>

            {(walletMode==="wallet" && !connected) ? (
                                    <div className="w-full flex flex-row h-1/2">

                                    <div className=" w-1/2 transition ease-in-out delay-150 opacity-90 h-full bg-gradient-to-br  from-fuchsia-800 to-slate-800   m-4 rounded-xl flex flex-col items-center justify-center" >
                                    <div className="lg:text-3xl sm:text-lg p-2 m-4 ">  3D Gallery </div>
                                    <div className=" text-3xl mr-12">←</div>
            
                                    </div>
                                    <div className=" w-1/2  transition ease-in-out delay-150 opacity-90 h-full bg-gradient-to-br  from-slate-800 to-blue-800   m-4 rounded-xl flex flex-col items-center justify-center" >
                                    <div className="lg:text-3xl sm:text-lg p-2 m-4  ">2D Gallery  </div>
                                    <div className=" text-3xl mr-12">→</div>
                                    </div>
            
                                </div>
            ) : (
                <div className="w-full flex flex-row h-1/2">

                <div className=" w-1/2 transition ease-in-out delay-150 opacity-90 h-full bg-gradient-to-br  from-fuchsia-800 to-slate-800 hover:shadow-2xl hover:shadow-fuchsia-400 hover:cursor-pointer hower:shadow-2xl  m-4 rounded-xl flex flex-col items-center justify-center" onClick={() => switchMode3D()}>
                <div className="lg:text-3xl sm:text-lg p-2 m-4 ">  3D Gallery </div>
                <div className=" text-3xl mr-12">←</div>

                </div>
                <div className=" w-1/2  transition ease-in-out delay-150 opacity-90 h-full bg-gradient-to-br  from-slate-800 to-blue-800 hover:shadow-2xl hover:hover:shadow-blue-400 hover:cursor-pointer hower:shadow-2xl  m-4 rounded-xl flex flex-col items-center justify-center" onClick={() => switchMode2D()}>
                <div className="lg:text-3xl sm:text-lg p-2 m-4  ">2D Gallery  </div>
                <div className=" text-3xl mr-12">→</div>
                </div>

            </div>
            )}
                    


                    <div className="flex flex-col justify-center items-center">
                    <SelectWalletOption walletMode={walletMode} setWalletMode={setWalletMode} />
                    {walletMode==='demo' && (
                        <p className="m-2 text-sm">Viewing Sample NFTs from a Devnet Wallet</p>
                    )}
                    {walletMode==='wallet' && (
                        <div className="flex flex-row ">
                        <WalletMultiButton />
                        <span className=" w-4"></span>
                        {connected && <WalletDisconnectButton /> }
                        </div>

                    )}
                    </div>
                    </div>
        
                </div>
        )}
        </>
    )
}

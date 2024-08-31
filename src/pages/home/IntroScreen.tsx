import { useState } from "react"
import { Button } from "@/components/ui/button"

export default function IntroScreen() {

    const [showIntro, setShowIntro] = useState(true)

    return (
        <>
        {showIntro && (
                    <div className="fixed inset-0 bg-gray-700  bg-opacity-50 flex justify-center items-center">
                    <div className="relative  bg-gradient-to-br from-slate-800 to-fuchsia-800 p-6 rounded-lg shadow-lg w-full  h-full flex flex-col items-center justify-center ">

                        <div className="text-6xl text-white p-8 m-8 ">HoloVista</div>
                        <div className="text-3xl text-white  p-8 m-8 ">Share and View NFTs in Style</div>
                    <Button className=" m-8  " onClick={() => setShowIntro(!showIntro)}> Continue </Button>
                    <div className=" mt-20">Viewing Sample NFTs from a Devnet Wallet</div>
                    </div>
        
                </div>
        )}
        </>
    )
}

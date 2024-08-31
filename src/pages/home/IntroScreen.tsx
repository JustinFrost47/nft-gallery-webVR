import { useState } from "react"
import { Button } from "@/components/ui/button"

interface IntroScreenProps {
    mode : string;
    setMode : any;
}

export default function IntroScreen({mode, setMode} : IntroScreenProps) {

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
                    <div className="fixed inset-0 bg-gray-700  bg-opacity-50 flex justify-center items-center">
                    <div className="relative  bg-gradient-to-br from-slate-800 to-fuchsia-800 p-6 rounded-lg shadow-lg w-full  h-full flex flex-col items-center justify-center ">

                        <div className="text-6xl text-white p-8 m-8 ">HoloVista</div>
                        <div className="text-3xl text-white  p-8 m-8 ">Share and View NFTs in Style</div>
                    <Button className=" m-8  " onClick={() => switchMode3D()}> 3D </Button>
                    <Button className=" m-8  " onClick={() => switchMode2D()}> 2D </Button>
                    <div className=" mt-20">Viewing Sample NFTs from a Devnet Wallet</div>
                    </div>
        
                </div>
        )}
        </>
    )
}

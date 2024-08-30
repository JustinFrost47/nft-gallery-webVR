import AllNfts from './pages/nfts/AllNfts'
import IntroScreen from './pages/home/IntroScreen'
// import MintNfts from './pages/nfts/MintNfts'

import './App.css'

function App() {


  return (
    <div className=' w-full '>
      <div className='text-center text-5xl p-8 m-4 text-white'> NFT Gallery </div>
      <AllNfts/>
      
      <IntroScreen/>
    </div>
  )
}

export default App

// @ts-nocheck
// import  "aframe"
import { useEffect } from 'react';




const defaultImage = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNK7-n-r_w_qCEIjsnu8VXMBamUkSmLUr9Eg&s"
const framePosition = [
  "-4.5 3.42673 -14.37328", //snow
  "9.40154 3.42673 -1.30013",//dog
  "9.59621 3.42673 -8.45067", //tree
  "4.301 3.42673 -14.37328", //garden
  " -9.72057 3.427 -0.054",
  "-9.68111 3.42673 -8.75347 "  //beast

]

const rotationPositions = [
  "0 0 0",
  "0 -89.78535128597565 0",
  "0 -90.37492485716527 0 ",
  "0 0 0",
  "0 89.501 0",
  "0 90.73531531030257 0"
]

export default function VrGallery({metaData}) {

  useEffect(() => {
    const onAssetsLoaded = () => {
      metaData.forEach((_, index) => {
        const frame = document.getElementById(`frame${index}`);
        if (frame) {
          frame.setAttribute('material', `shader: flat; src: #picture${index}`);
        }
        const walls = document.querySelectorAll('.wall')
        walls.forEach((wall, index) => {
          wall.setAttribute('material', 'shader: flat; src: #wallTexture')
        })
        document.getElementById('ground')?.setAttribute('material', 'shader: flat; src: #floorTexture; repeat: 10 1')
        document.getElementById('ceiling')?.setAttribute('material', 'shader: flat; src: #wallTexture')
      });
    };

    // Add event listener for when all assets are loaded
    document.querySelector('a-assets').addEventListener('loaded', onAssetsLoaded);

    return () => {
      // Cleanup event listener on component unmount
      document.querySelector('a-assets').removeEventListener('loaded', onAssetsLoaded);
    };
  }, [metaData]);

  console.log(metaData)
  return (
    <a-scene environment="preset: forest" joystick>
      
      


      <a-assets>
      <img id='wallTexture' src="https://cdn.jsdelivr.net/gh/JustinFrost47/JustinFrost47/test_nfts/assets/wall-texture.jpeg" crossOrigin="anonymous"/>
      <img id='floorTexture' src="https://cdn.jsdelivr.net/gh/JustinFrost47/JustinFrost47/test_nfts/assets/floor-texture.webp" crossOrigin="anonymous" />
        {metaData.map((accounts, index) => (
          <img key={index} id={`picture${index}`} src={accounts.metadata.image || defaultImage} />
        ))}
        
      </a-assets>
        
      {metaData.map((accounts, index) => (
        <a-entity key={index} id={`frame${index}`} material={`shader: flat; src: #picture${index}`} rotation={rotationPositions[index]} geometry="height: 5; width: 5" position={framePosition[index]}></a-entity>
      ))}
      
        <a-entity class="wall" id="wall1"  material="shader: flat; color: #a13a03 " geometry="height: 7; width: 20" position="0 2.86802 -14.49"></a-entity>
        <a-entity class="wall" id="wall2" material="shader: flat; color: #a13a03 "  rotation="0 -90.509 0" geometry="height: 7; width: 20" position="-9.772 2.693 -4.677"></a-entity>
        <a-entity class="wall" id="wall3" material="shader: flat; color: #a13a03 "  rotation="0 -89.8644194617037 0" geometry="height: 7; width: 20" position="9.71391 3.01053 -4.73849"></a-entity>
        <a-entity class="wall" id="wall4" material="shader: flat; color: #a13a03 "  geometry="height: 7; width: 8" position="-6.3937 2.63401 4.76546"></a-entity>
        <a-entity class="wall" id="wall5" material="shader: flat; color: #a13a03 "  geometry="height: 7; width: 8" position="6.1868 3.03791 4.64547"></a-entity>


      <a-entity id="ground" scale="2.85835 2.90808 1.09738" rotation="270 0 0"   geometry="height: 7; width: 8" position="-0.02 -0.16787 -4.24439"></a-entity>
      <a-entity id="ceiling" scale="2.858 2.908 1.097" rotation="270 0 0" material="shader: flat; color: #a13a03 "  geometry="height: 7; width: 8" position="-0.02 6.80303 -4.244"></a-entity>

      <a-entity id="text" text="anchor: align; color: #a51d2d; value: Unleash Your NFTs Beyond 2D Shackles; width: 5" position="-3 0.54272 -3" scale="1.5 1.5 1.5"></a-entity>
      
      <a-entity id="rig" position="0 0.6 0">
      <a-camera id="camera"  position="0 1.6 0" look-controls="touchEnabled: true; pointerLockEnabled: true"  wasd-controls="acceleration: 30" >
        <a-cursor color="#FAFAFA"></a-cursor>
      </a-camera>
      </a-entity>
  </a-scene>
  )
}

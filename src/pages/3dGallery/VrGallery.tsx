// @ts-nocheck
// import  "aframe"
import { useEffect } from 'react';



const defaultImage = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNK7-n-r_w_qCEIjsnu8VXMBamUkSmLUr9Eg&s"
const framePosition = [
  "-5.662 3.42673 -14.37328", //snow
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
    <a-scene environment="preset: forest">
      <a-assets>
        {metaData.map((accounts, index) => (
          <img key={index} id={`picture${index}`} src={accounts.metadata.image || defaultImage} />
        ))}
      </a-assets>
        
      {metaData.map((accounts, index) => (
        <a-entity key={index} id={`frame${index}`} material={`shader: flat; src: #picture${index}`} rotation={rotationPositions[index]} geometry="height: 5; width: 5" position={framePosition[index]}></a-entity>
      ))}
      
        <a-entity id="wall1"  material="shader: flat; color: #a13a03 " geometry="height: 7; width: 20" position="0 2.86802 -14.49"></a-entity>
        <a-entity id="wall2" material="shader: flat; color: #a13a03 "  rotation="0 -90.509 0" geometry="height: 7; width: 20" position="-9.772 2.693 -4.677"></a-entity>
        <a-entity id="wall3" material="shader: flat; color: #a13a03 "  rotation="0 -89.8644194617037 0" geometry="height: 7; width: 20" position="9.71391 3.01053 -4.73849"></a-entity>
        <a-entity id="wall4" material="shader: flat; color: #a13a03 "  geometry="height: 7; width: 8" position="-6.3937 2.63401 4.76546"></a-entity>
        <a-entity id="wall5" material="shader: flat; color: #a13a03 "  geometry="height: 7; width: 8" position="6.1868 3.03791 4.64547"></a-entity>

        {/* <a-entity id="frame1" material="shader: flat; src: #picture1 " rotation="0 89.501 0" geometry="height: 5; width: 5" position="-9.72057 3.427 -0.054"></a-entity>
        <a-entity id="frame2" material="shader: flat; src: #picture1 " rotation="0 90.73531531030257 0" geometry="height: 5; width: 5" position="-9.68111 3.42673 -8.75347"></a-entity>
        <a-entity id="frame3" material="shader: flat; src: #picture1 " rotation="0 -89.78535128597565 0" geometry="height: 5; width: 5" position="9.40154 3.42673 -1.30013"></a-entity>
        <a-entity id="frame4" material="shader: flat; src: #picture1 " rotation="0 -90.37492485716527 0" geometry="height: 5; width: 5" position="9.59621 3.42673 -8.45067"></a-entity>
        <a-entity id="frame5" material="shader: flat; src: #picture1 " geometry="height: 5; width: 5" position="0.0179 3.42673 -14.37328"></a-entity> */}

      <a-entity id="text" text="value: Unleash Your NFTs Beyond 2D Shackles; color: #a51d2d; width: 5; anchor: align" position="-3 0.3 -3" scale="1.5 1.5 1.5"></a-entity>
      <a-camera id="camera" position="0 1.6 0.53061" >
        <a-cursor color="#FAFAFA"></a-cursor>
      </a-camera>
  </a-scene>
  )
}

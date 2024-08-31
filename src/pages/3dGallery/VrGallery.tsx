// @ts-nocheck
import  "aframe"

export default function VrGallery() {
  return (
    <a-scene environment="preset: forest">
    <a-assets>
      <img id="boxTexture" src="https://i.imgur.com/mYmmbrp.jpg"/>
    </a-assets>
    
    <a-box
      src="#boxTexture"
      position="0 2 -5"
      rotation="0 45 45"
      scale="2 2 2"
      animation__position="property: object3D.position.y; to: 2.2; dir: alternate; dur: 2000; loop: true"
      animation__mouseenter="property: scale; to: 2.3 2.3 2.3; dur: 300; startEvents: mouseenter"
      animation__mouseleave="property: scale; to: 2 2 2; dur: 300; startEvents: mouseleave"></a-box>
    
    <a-entity text="value: Hello, A-Frame; color: #FAFAFA; width: 5; anchor: align" position="-0.9 0.2 -3" scale="1.5 1.5 1.5"></a-entity>
    <a-camera>
      <a-cursor color="#FAFAFA"></a-cursor>
    </a-camera>
  </a-scene>
  )
}

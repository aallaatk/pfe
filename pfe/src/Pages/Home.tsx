
import { LatLngExpression } from "leaflet";
import BrowseTours from "../Components/BrowseTours";
import DjerbaMap from "../Components/DjerbaMap";
import GuiderSection from "../Components/GuiderSection";
import ImageSlider from "../Components/ImageSlider";

import WhyDjerba from "../Components/WhyDjerba";
import Steps from "../Components/Steps";
/* const declaration */
const DjerbaCoordinates: LatLngExpression = [33.7886, 10.8017];


  // Define contact information



function Home() {
  return (
    <>
    
      
      <ImageSlider/>
      <Steps/>
      <BrowseTours />
      <DjerbaMap center={DjerbaCoordinates} zoom={10} />
      
      
      <WhyDjerba/>
      <GuiderSection />
     
      </>
  )
}

export default Home

import { LatLngExpression } from "leaflet";
import BrowseTours from "../Components/BrowseTours";
import DjerbaMap from "../Components/DjerbaMap";
import Footer from "../Components/Footer";
import GuiderSection from "../Components/GuiderSection";
import Header from "../Components/Header";
import ImageSlider from "../Components/ImageSlider";
import TopContact from "../Components/TopContact";
import WhyDjerba from "../Components/WhyDjerba";
import Steps from "../Components/Steps";
/* const declaration */
const DjerbaCoordinates: LatLngExpression = [33.7886, 10.8017];


  // Define contact information
  const contactInfo = {
    phone: 21375123,
    email: "sleimiala@gmail.com",
    address: "rue ezz edine hanachi"
  };

function Home() {
  return (
    <>
     <TopContact {...contactInfo} />
      <Header />
      <ImageSlider/>
      <Steps/>
      <BrowseTours />
      <DjerbaMap center={DjerbaCoordinates} zoom={10} />
      
      
      <WhyDjerba/>
      <GuiderSection />
      <Footer {...contactInfo} /></>
  )
}

export default Home
import { LatLngExpression } from "leaflet";
import Header from '../Components/Header'; // Import the Header component
import BrowseTours from "../Components/BrowseTours";
import DjerbaMap from "../Components/DjerbaMap";
import GuiderSection from "../Components/GuiderSection";
import ImageSlider from "../Components/ImageSlider";
import WhyDjerba from "../Components/WhyDjerba";
import Steps from "../Components/Steps";
import Tour from "../Components/Tour";

const DjerbaCoordinates: LatLngExpression = [33.7886, 10.8017];

function Home() {
  return (
    <>
      <Header /> {/* Render the Header component only once */}
      <ImageSlider/>
      <Steps/>
      <BrowseTours />
      <DjerbaMap center={DjerbaCoordinates} zoom={0} />
      <WhyDjerba/>
      <GuiderSection />
      <Tour
  tourname="Tour Name"
  creator="Creator Name"
  date="Tour Date"
  price={100}
  image="path/to/image.jpg"
/>

    </>
  )
}

export default Home;

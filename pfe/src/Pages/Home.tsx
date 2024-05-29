
import BrowseTours from "../Components/BrowseTours";

import GuiderSection from "../Components/GuiderSection";
import ImageSlider from "../Components/ImageSlider";
import WhyDjerba from "../Components/WhyDjerba";
import Steps from "../Components/Steps";
import TopDestinations from "../Components/TopDestinations";
import CustomerFeedback from "../Components/CostumerFeedback";


function Home() {
  return (
    <>
      
      <ImageSlider/>
      <Steps/>
      <BrowseTours />
     <TopDestinations/>
    < CustomerFeedback/>
      <WhyDjerba/>
      <GuiderSection />

    </>
  )
}

export default Home;

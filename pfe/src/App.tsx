import BrowseTours from "./Components/BrowseTours";
import Footer from "./Components/Footer";
import GuiderSection from "./Components/GuiderSection";
import Header from "./Components/Header";
import ImageSlider from "./Components/ImageSlider";
import TopContact from "./Components/TopContact";

function App() {
  // Define contact information
  const contactInfo = {
    phone: 21375123,
    email: "sleimiala@gmail.com",
    address: "rue ezz edine hanachi"
  };

  return (
    <>
      <TopContact {...contactInfo} />
      <Header />
      <ImageSlider/>
      <GuiderSection />
      <BrowseTours />
      
      <Footer {...contactInfo} />
    </>
  );
}

export default App;

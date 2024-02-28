import Guider from "./Guider";
import image1 from '../assets/guider-1.jpg';
import image2 from '../assets/guider-2.jpg';
import image3 from '../assets/guider-3.jpg';
function GuiderSection() {
  return (
    <section >
      <div className="container mt-4">
        <div className="row">
          <div className="col">
            <h2 className="text-center" style={{color:'#040073',fontWeight:'bold',fontSize:'46px',letterSpacing:'0.5rem'}}>Our Guiders</h2>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-sm-6 col-md-4 d-flex">
            <Guider
              name={"Ahmed Khemiri"}
              rating={4.8}
              about={"Ahmed is an experienced adventure guide who leads thrilling expeditions through Djerba's off-the-beaten-path destinations. With a love for adrenaline-fueled activities like hiking, kayaking, and desert exploration, he promises an exhilarating and unforgettable journey for adventurous travelers seeking excitement and discovery."}
              age={34}
              languages={["arabe", "english", "french", "spanish", "japanese"]}
              email={"ahmed.khemiri@gmail.com"}
              gsm={21648733}
              id={"1"} img={image1}            />
          </div>
          <div className="col-sm-6 col-md-4 d-flex">
            <Guider
              name={"Fatima Ben Ali"}
              rating={4.6}
              about={"Fatima is a passionate historian with deep knowledge of Djerba's cultural heritage. She loves to share intriguing stories about the island's ancient sites and traditions, ensuring an immersive and memorable tour experience."}
              age={27}
              languages={["arabe", "french", "english", "italian"]}
              email={"fatima.benali@gmail.com"}
              gsm={55243952}
              id={"2"} img={image2}            />
          </div>
          <div className="col-sm-6 col-md-4 d-flex">
            <Guider
              name={"Mohamed Chakroun"}
              rating={4.5}
              about={" Mohamed is an adventurous nature enthusiast who specializes in eco-tours across Djerba's scenic landscapes. With his expertise in flora and fauna, he leads eco-conscious travelers on unforgettable journeys through the island's natural wonders."}
              age={31}
              languages={["arabe", "french", "english", "spanish"]}
              email={"mohamed.chakroun@yahoo.com"}
              gsm={22460300}
              id={"3"} img={image3}            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default GuiderSection;

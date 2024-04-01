
import ceo from '../assets/ceo.jpg'
function AboutUs() {
  return (
    <div className="container-fluid mt-5">
        <div className="row p-5" id="autop" >
            <h2 className="h1" style={{color:'#040073',fontWeight:'bold'}}>About Us</h2>
            <p style={{color:'#ffffffe6',fontSize:'18px'}}>Welcome to TH Djerba, your premier destination for exploring the breathtaking beauty and cultural richness of Djerba, Tunisia! Situated amidst the azure waters of the Mediterranean, Djerba beckons travelers with its alluring charm and timeless allure.
At TH Djerba, we are dedicated to crafting immersive travel experiences that allow you to delve deep into the soul of this enchanting island. With a passionate team of experts and insiders, we strive to unveil the hidden treasures of Djerba, from its sun-kissed beaches and ancient landmarks to its vibrant markets and authentic culinary delights.
Our commitment to sustainable tourism ensures that every journey with TH Djerba not only enriches your soul but also contributes positively to the preservation of Djerba's natural beauty and cultural heritage. By partnering with local guides and businesses, we aim to foster meaningful connections and create unforgettable memories for our travelers.
Join us on a voyage of discovery, where every moment is infused with the spirit of adventure and exploration. Let TH Djerba be your trusted companion as you embark on a journey to uncover the wonders of Tunisia's beloved island paradise.</p>
        </div>
        <div className="container-fluid mt-3  p-5" >
  <div className="row ">
    <div className="col-md-6 mt-3">
      <div className="row ">
        <div className="col-md-6" id="boxes" style={{background:'#0cead9'}}><span>2.6K</span><p>User currently</p></div>
        <div className="col-md-6  " id="boxes" style={{background:'#3acadf'}}><span>18</span><p>Tours per day</p></div>
      </div>
      <div className="row mt-3">
        <div className="col-md-6" id="boxes" style={{background:'#729efd'}}><span>6.1K</span><p> Completed tours</p></div>
        <div className="col-md-6" id="boxes" style={{background:'#8a64d6'}}><span>56</span><p>Active Guider</p></div>
      </div>
    </div>
    <div className="col-md-6 d-flex align-items-center justify-content-center mt-3">
  <div className="rounded overflow-hidden" style={{ width: '100%', height: '100%' }}>
    <img src={ceo} className="img-fluid" alt="ceo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
  </div>
</div>


  </div>
</div>

    </div>
  )
}

export default AboutUs
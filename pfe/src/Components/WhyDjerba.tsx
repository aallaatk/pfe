import beach from '../assets/beach.png';
import history from '../assets/history.png'
import cuisine from '../assets/cuisine.png'
import archi from '../assets/architecture.png'
import souk from '../assets/souk.png'
function WhyDjerba() {
  const imageSize = { width: '50px', height: '50px' }; // Define image size
  
  return (
    <section className="mt-3" id="why" style={{height:'auto'}}>
      <h2 className="text-center" style={{ color: '#040073', fontWeight: 'bold', fontSize: '46px', letterSpacing: '0.5rem' }}>Why Djerba</h2>
      <div className="container mt-5">
        <div className="row">
          <div className="col-sm-4 mt-3">
            <div className="text-center" style={{ ...imageSize, borderRadius: '50%', overflow: 'hidden', margin: '0 auto' }}>
              <img src={beach} alt="beach" style={{ ...imageSize, objectFit: 'cover' }} />
            </div>
            <h2>Beautiful Beaches</h2> 
            Djerba boasts stunning sandy beaches with crystal-clear waters, perfect for relaxation and water sports.
          </div>
          <div className="col-sm-4 mt-3">
            <div className="text-center" style={{ ...imageSize, borderRadius: '50%', overflow: 'hidden', margin: '0 auto' }}>
              <img src={history} alt="beach" style={{ ...imageSize, objectFit: 'cover' }} />
            </div>
            <h2>Rich History and Culture:</h2> 
            Explore the island's historical sites, such as the Ghriba Synagogue and El Ghriba Museum, and immerse yourself in its unique culture.
          </div>
          <div className="col-sm-4 mt-3">
            <div className="text-center" style={{ ...imageSize, borderRadius: '50%', overflow: 'hidden', margin: '0 auto' }}>
              <img src={cuisine} alt="beach" style={{ ...imageSize, objectFit: 'cover' }} />
            </div>
            <h2>Delicious Cuisine:</h2> 
            Indulge in authentic Tunisian cuisine, including fresh seafood dishes, flavorful tagines, and delectable pastries.
          </div>
        </div>
        <div className="row ">
          <div className="col-sm-6  mt-3">
            <div className="text-center" style={{ ...imageSize, borderRadius: '50%', overflow: 'hidden', margin: '0 auto' }}>
              <img src={archi} alt="beach" style={{ ...imageSize, objectFit: 'cover' }} />
            </div>
            <h2>Fascinating Architecture:</h2> 
            Admire the distinctive architecture of Djerba's mosques, fortresses, and traditional houses adorned with colorful tiles and intricate designs.
          </div>
          <div className="col-sm-6 mt-3">
            <div className="text-center" style={{ ...imageSize, borderRadius: '50%', overflow: 'hidden', margin: '0 auto' }}>
              <img src={souk} alt="beach" style={{ ...imageSize, objectFit: 'cover' }} />
            </div>
            <h2>Charming Souks:</h2> 
            Wander through the vibrant souks (markets) of Djerba, where you can shop for handcrafted goods, spices, and souvenirs while experiencing the local hustle and bustle.
          </div>
        </div>
      </div>
    </section>
  );
}

export default WhyDjerba;

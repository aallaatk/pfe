// Import images
import sayo from '../assets/El-Ghriba-Synagogue-Djerba-scaled.jpg';
import exp from '../assets/explore.jpg';
import sentido from '../assets/sentido.jpg';
import guellela from '../assets/guellala.jpg';



function Sites() {
  const imageData = [
    { src: sayo, alt: 'sayonage', title: 'El Ghriba synagogue' },
    { src: sentido, alt: '', title: 'Sentido Djerba Beach' },
    { src: guellela, alt: 'guellela', title: 'Musee de Guellala' },
    { src: exp, alt: '', title: 'Djerba Explore Park' }
  ];
  return (
    
      
      
      <div className="container mt-3" style={{ padding: '20px' }}>
        <div className="row">
          {imageData.map((image, index) => (
            <div key={index} className="col-sm-6 mt-3">
             
              <h2 className="text-center mt-2">{image.title}</h2>
              <div className="image-container mt-3">
                <img src={image.src} alt={image.alt} className="site-image" />
                <div className="info-button" >Info<i className="fa-solid fa-magnifying-glass m-1" style={{color: 'ffffff'}}></i></div>
              </div>
            </div>
          ))}
        </div>
      </div>
     
    
  );
}

export default Sites;

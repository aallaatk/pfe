import 'react-slideshow-image/dist/styles.css';
import { Fade } from 'react-slideshow-image';
import image1 from  '../assets/image-2.jpg'; 
import image2 from '../assets/image-1.jpg';
import image3 from '../assets/image-3.jpg';
import image4 from '../assets/image-4.jpg';
import image5 from '../assets/image-5.jpg';
import image6 from '../assets/image-6.jpg';
import Button from './Button';

const images: string[] = [
  image1,
  image2,
  image3,
  image4,
  image5,
  image6
];

const divStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '0px 20px',
  height: '600px',
  backgroundSize: 'cover', 
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  position: 'relative',
};

const overlayStyle: React.CSSProperties = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  textAlign: 'center',
  zIndex: 1,
  color: 'white',
};

const ImageSlider: React.FC = () => {
  return (
    <div className='slide-container'>
      <Fade>
        {images.map((image, index) => (
          <div key={index}>
            <div style={{ ...divStyle, backgroundImage: `url(${image})` }}>
              <div className="overlay-content" style={overlayStyle}>
                <h2>Discover Sites</h2>
                <p>dive into the beauty of djerba</p>
                <Button text={'browse sites >'} bclass={'btn btn-grad'} />
              </div>
            </div>
          </div>
        ))}
      </Fade>
    </div>
  );
}

export default ImageSlider;

import React from 'react';

import dest1 from '../assets/1.jpg';
import dest2 from '../assets/2.jpg';
import dest3 from '../assets/3.jpg';
import dest4 from '../assets/4.jpg';

const TopDestinations: React.FC = () => {
  const destinations = [
    { src: dest1, alt: 'Destination 1' },
    { src: dest2, alt: 'Destination 2' },
    { src: dest3, alt: 'Destination 3' },
    { src: dest4, alt: 'Destination 4' },
  ];

  return (
    <section className="container my-5">
      <h2 className="text-center mb-4" style={{ color: '#040073', fontWeight: 'bold', fontSize: '46px', letterSpacing: '0.5rem' }}>Top Destinations</h2>
      <div className="row">
        {destinations.map((destination, index) => (
          <div className="col-lg-3 col-md-6 mb-4" key={index}>
            <div className="d-flex justify-content-center">
              <img 
                src={destination.src} 
                alt={destination.alt} 
                className="rounded-circle" 
                style={{ width: '300px', height: '300px', objectFit: 'cover' }} 
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TopDestinations;

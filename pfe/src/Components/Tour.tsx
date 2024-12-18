
import React from 'react';
import Button from './Button';
import { Link } from 'react-router-dom';

interface TourProps {
  id: string; // Unique identifier for the tour
  tourname: string;
  creator: string;
  date: string | Date;
  price: number;
  
  imageUrl: string; // Cloudinary image URL
}

const Tour: React.FC<TourProps> = ({
  id,
  tourname,
  creator,
  date,
  price,
  
  imageUrl
}) => {
  const formattedDate =
    date instanceof Date ? date.toLocaleDateString() : typeof date === 'string' ? new Date(date).toLocaleDateString() : '';

  return (
    <div className="card" style={{ width: '22rem' }}>
      <img src={imageUrl} className="card-img-top" alt={tourname} style={{ height: '15rem', width: '100%', display: 'block' }} />
      <div className="card-body">
        <h5 className="card-title">{tourname}</h5>
        <h6 className="card-subtitle mb-2 text-muted">{creator}</h6>
        <p className="card-text">{formattedDate}</p>
     
        <p className="card-text">
          <span style={{ color: '#040073', fontWeight: 'bold', fontSize: '22px' }}>{price} dt</span> per person
        </p>
        {/* Use the tour's id in the Link's to prop */}
        <Link to={`/tour/${id}`}><Button text="More Info" bclass="btn btn-grad text-center" /></Link>

      </div>
    </div>
  );
};

export default Tour;

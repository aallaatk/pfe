import React from 'react';
import Button from './Button';

interface TourProps {
  tourname: string;
  creator:string;
  date: string | Date;
  price: number;
  description?: string;
  attendees?: number;
  location?: string;
  duration?: string;
  imageUrl: string; // Cloudinary image URL
}

const Tour: React.FC<TourProps> = ({ tourname, creator, date, price, description, attendees, location, duration, imageUrl }) => {
  const formattedDate =
    date instanceof Date ? date.toLocaleDateString() : typeof date === 'string' ? new Date(date).toLocaleDateString() : '';

  return (
    <div className="card" style={{ width: '18rem' }}>
      <img src={imageUrl} className="card-img-top" alt="Tour" />
      <div className="card-body">
        <h5 className="card-title">{tourname}</h5>
        <h6 className="card-subtitle mb-2 text-muted">{creator}</h6>
        <p className="card-text">{formattedDate}</p>
        {description && <p className="card-text">{description}</p>}
        {attendees && <p className="card-text">Attendees: {attendees}</p>}
        {location && <p className="card-text">Location: {location}</p>}
        {duration && <p className="card-text">Duration: {duration}</p>}
        <p className="card-text">
          <span style={{ color: '#040073', fontWeight: 'bold', fontSize: '22px' }}>{price} dt</span> per person
        </p>
        <Button text="More Info" bclass="btn btn-grad text-center" />
      </div>
    </div>
  );
};

export default Tour;

import React, { useEffect, useState } from 'react';
import { useParams, } from 'react-router-dom'; // Import Navigate and Link
import axios from 'axios';
import userIcon from '../assets/user.png';
import creatorIcon from '../assets/creator.png';
import calendarIcon from '../assets/calendar.png';
import priceIcon from '../assets/price.png';
import tourIcon from '../assets/tour.png';
import durationIcon from '../assets/duration.png';

interface TourDetailsProps {
  isAuthenticated: boolean;
  userId: string;
}

interface TourDetailsData {
  tourname: string;
  creator: string;
  date: string | Date;
  price: number;
  description?: string;
  attendees?: number;
  location?: string;
  duration?: string;
  imageUrl?: string;
}

const TourDetails: React.FC<TourDetailsProps> = ({ isAuthenticated, userId }) => {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState<boolean>(true);
  const [tourDetails, setTourDetails] = useState<TourDetailsData | null>(null);
  const [bookingStatus, setBookingStatus] = useState<string>('');
  const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false);


  useEffect(() => {
    const fetchTourDetails = async () => {
      try {
        const response = await axios.get<TourDetailsData>(`http://localhost:3000/api/tours/${id}`);
        setTourDetails(response.data);
      } catch (error) {
        console.error('Error fetching tour details:', error);
        setTourDetails(null);
      } finally {
        setLoading(false);
      }
    };

    fetchTourDetails();
  }, [id]);

  const handleBookNow = async () => {
    if (!isAuthenticated) {
      window.location.href = '/login';
      return;
    }
    try {
      const response = await axios.post(`http://localhost:3000/api/tours/book/${id}`, {
        userId: userId,
      });

      if (response.status === 200) {
        setBookingStatus('success');
        setShowSuccessMessage(true);
        setTimeout(() => setShowSuccessMessage(false), 2000); // Hide success message after 2 seconds
      } else {
        setBookingStatus('failed');
      }
    } catch (error) {
      console.error('Error booking tour:', error);
      setBookingStatus('failed');
    }
  };

  if (loading) {
    return <p className="text-center">Loading tour details...</p>;
  }

  if (!tourDetails) {
    return <p className="text-center">Tour not found</p>;
  }

  const formattedDate =
    tourDetails.date instanceof Date && !isNaN(tourDetails.date.getTime())
      ? tourDetails.date.toLocaleDateString()
      : typeof tourDetails.date === 'string'
      ? new Date(tourDetails.date).toLocaleDateString()
      : '';
      return (
        <div className="container mt-5">
          <h2 className="text-center mb-4">Tour Details</h2>
          {showSuccessMessage && (
        <div className="alert alert-success alert-dismissible fade show" role="alert">
          Tour booked successfully!
          <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
      )}
          <div className="row">
            <div className="col-md-6">
              <img
                src={tourDetails.imageUrl}
                className="img-fluid mb-4"
                alt="Tour"
                style={{ objectFit: 'cover', height: '450px', width: '100%' }}
              />
              {tourDetails.description && (
                <p className="card-text pt-4" style={{ color: 'black', fontSize: '18px' }}>
                  {tourDetails.description}
                </p>
              )}
            </div>
            <div className="col-md-6">
              <div className="card">
                <div className="card-body">
                  <h2 className="card-title text-center mb-3" style={{ fontWeight: 'bold', color: '#2b2881' }}>{tourDetails.tourname}</h2>
                  <div className="d-flex align-items-center mb-3">
                    <img src={creatorIcon} alt="Creator Icon" style={{ width: '30px', height: '30px', marginRight: '8px' }} />
                    <p className="card-text" style={{ color: '#2b2881', fontSize: '18px' }}>
                      Created by <span style={{ fontWeight: 'bold', fontSize: '20px', color: 'black' }}>
                        {tourDetails.creator}
                      </span>
                    </p>
                  </div>
                  <div className="d-flex align-items-center mb-3">
                    <img src={calendarIcon} alt="Calendar Icon" style={{ width: '30px', height: '30px', marginRight: '8px' }} />
                    <p className="card-text" style={{ color: '#2b2881', fontSize: '18px' }}>
                      Date: <span style={{ fontWeight: 'bold', color: 'black', fontSize: '20px' }}>{formattedDate}</span>
                    </p>
                  </div>
                  <div className="d-flex align-items-center mb-3">
                    <img src={priceIcon} alt="Price Icon" style={{ width: '30px', height: '30px', marginRight: '8px' }} />
                    <p className="card-text" style={{ color: '#2b2881', fontSize: '18px' }}>
                      Price: <span style={{ fontWeight: 'bold', color: 'black', fontSize: '20px' }}>{tourDetails.price} dt</span>
                    </p>
                  </div>
                  {tourDetails.attendees && (
                    <div className="d-flex align-items-center mb-3">
                      <img src={userIcon} alt="User Icon" style={{ width: '30px', height: '30px', marginRight: '8px' }} />
                      <p className="card-text" style={{ color: '#2b2881', fontSize: '18px' }}>
                        Attendees: <span style={{ fontWeight: 'bold', fontSize: '20px', color: 'black' }}>{tourDetails.attendees}</span>
                      </p>
                    </div>
                  )}
                  {tourDetails.location && (
                    <div className="d-flex align-items-center mb-3">
                      <img src={tourIcon} alt="Tour Icon" style={{ width: '30px', height: '30px', marginRight: '8px' }} />
                      <p className="card-text" style={{ color: '#2b2881', fontSize: '18px' }}>
                        Location: <span style={{ fontWeight: 'bold', fontSize: '20px', color: 'black' }}>{tourDetails.location}</span>
                      </p>
                    </div>
                  )}
                  {tourDetails.duration && (
                    <div className="d-flex align-items-center mb-3">
                       <img src={durationIcon} alt="Duration Icon" style={{ width: '30px', height: '30px', marginRight: '8px' }} />
                       <p className="card-text" style={{ color: '#2b2881', fontSize: '18px' }}>
Duration: <span style={{ fontWeight: 'bold', fontSize: '20px', color: 'black' }}>{tourDetails.duration}</span>
</p>
</div>
)}
{/* Additional tour properties can be rendered here /}
{redirect && <Navigate to="/login" />} {/ Conditionally redirect */}
<button 
        className='btn btn-grad p-3 mt-3' 
        style={{ color: 'white', fontWeight: 'bold' }} 
        onClick={handleBookNow}
        disabled={bookingStatus === 'pending'} // Disable button while booking is in progress
      >
        {bookingStatus === 'pending' ? 'Booking...' : 'BOOK NOW'}
      </button>
</div>
</div>
</div>
</div>
</div>
);
};

export default TourDetails;
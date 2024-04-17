import  { useState, useEffect } from 'react';
import axios from 'axios';
import Tour, { TourProps } from '../Components/Tour';


function Tours() {
  const [tours, setTours] = useState<TourProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await axios.get<TourProps[]>('http://localhost:3000/api/tours');

        if (Array.isArray(response.data)) {
          setTours(response.data);
        } else {
          console.error('API response is not an array:', response.data);
        }
      } catch (error) {
        console.error('Error fetching tours:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTours();
  }, []);

  return (
    <div className="container">
      <h2 className="text-center mt-2">Available Tours</h2>
      {loading ? (
        <p className="text-center mt-5">Loading...</p>
      ) : tours.length > 0 ? (
        <div className="row mt-5">
          {tours.map((tour, index) => (
            <div className="col-md-4" key={index}>
              <Tour
                key={index}
                tourname={tour.tourname}
                creator={tour.creator}
                date={tour.date}
                price={tour.price}
                description={tour.description ?? ''}
                attendees={tour.attendees ?? 0}
                location={tour.location ?? ''}
                duration={tour.duration ?? ''}
                imageUrl={tour.imageUrl} // Handle image type here
              />
            </div>
          ))}
        </div>
      ) : (
        <p style={{ fontWeight: 'bold', fontSize: '22px' }} className="text-center mt-5">
          No tours available
        </p>
      )}
    </div>
  );
}

export default Tours;

import React, { useState, useEffect } from "react";
import DashboardTourItem from "./DashboardTourItem";
import axios from "axios";
import { Link } from "react-router-dom";

interface Tour {
  tourname: string;
  creator: string;
  date: Date | string;
  price: number;
  description?: string;
  attendees?: number;
  location?: string;
  duration?: string;
  _id: string;
}

interface DashboardToursProps {
  userId: string; // Pass userId as a prop
}

const UserDashboardCreatedTours: React.FC<DashboardToursProps> = ({ userId }) => {
  const [tours, setTours] = useState<Tour[]>([]);

  useEffect(() => {
    fetchTours();
  }, []);
  
  const fetchTours = async () => {
    try {
      const response = await axios.get<Tour[]>(`http://localhost:3000/api/tours/user/${userId}`);
      setTours(response.data);
    } catch (error) {
      console.error("Error fetching tours:", error);
    }
  };
  
  const deleteTour = async (id: string) => {
    try {
      await axios.delete(`http://localhost:3000/api/tours/${id}`);
      setTours(prevTours => prevTours.filter(tour => tour._id !== id));
    } catch (error) {
      console.error("Error deleting tour:", error);
    }
  };

  const updateTour = async (updatedTour: Tour) => {
    try {
      const response = await axios.put<Tour>(`http://localhost:3000/api/tours/${updatedTour._id}`, updatedTour);
      const updatedTourFromResponse: Tour = {
        ...response.data,
        date: new Date(response.data.date).toLocaleDateString() // Format date properly
      };
      const updatedTours = tours.map(tour => (tour._id === updatedTour._id ? updatedTourFromResponse : tour));
      setTours(updatedTours);
    } catch (error) {
      console.error("Error updating tour:", error);
    }
  };

  return (
    <div className="tour-list">
      {tours.length === 0 ? (
        <p className="text-center">No tours available <br />
        <Link to="/tour/create"> create</Link> a tour now</p>
      ) : (
        tours.map(tour => (
          <DashboardTourItem
            key={tour._id}
            tour={tour}
            deleteTour={deleteTour}
            updateTour={updateTour}
          />
        ))
      )}
    </div>
  );
};

export default UserDashboardCreatedTours;

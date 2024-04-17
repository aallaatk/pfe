import React, { useState, useEffect } from "react";
import DashboardTourItem from "./DashboardTourItem";
import axios from "axios";

interface Tour {
  _id: string;
  tourname: string;
  creator: string;
  date: Date;
}

const DashboardTours: React.FC = () => {
  const [tours, setTours] = useState<Tour[]>([]);

  useEffect(() => {
    fetchTours();
  }, []);

  const fetchTours = async () => {
    try {
      const response = await axios.get("/api/tours");
      setTours(response.data);
    } catch (error) {
      console.error("Error fetching tours:", error);
    }
  };

  const deleteTour = async (id: string) => {
    try {
      await axios.delete(`/api/tours/${id}`);
      setTours(prevTours => prevTours.filter(tour => tour._id !== id));
    } catch (error) {
      console.error("Error deleting tour:", error);
    }
  };

  const updateTour = async (updatedTour: Tour) => {
    try {
      const response = await axios.put(`/api/tours/${updatedTour._id}`, updatedTour);
      const updatedTours = tours.map(tour => (tour._id === updatedTour._id ? response.data : tour));
      setTours(updatedTours);
    } catch (error) {
      console.error("Error updating tour:", error);
    }
  };

  return (
    <div className="tour-list">
      {tours.map(tour => (
        <DashboardTourItem key={tour._id} tour={tour} deleteTour={deleteTour} updateTour={updateTour} />
      ))}
    </div>
  );
};

export default DashboardTours;

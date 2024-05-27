import React, { useState } from "react";

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

interface DashboardTourItemProps {
  tour: Tour;
  deleteTour: (id: string) => void;
}

const DashboardTourItem: React.FC<DashboardTourItemProps> = ({ tour, deleteTour }) => {
  const [showDeletedMessage, setShowDeletedMessage] = useState(false);

  const handleDelete = () => {
    deleteTour(tour._id);
    setShowDeletedMessage(true); // Display deleted message
    setTimeout(() => setShowDeletedMessage(false), 2000); // Hide after 2 seconds
  };

  const formattedDate =
    tour.date instanceof Date
      ? tour.date.toLocaleDateString()
      : typeof tour.date === "string"
      ? new Date(tour.date).toLocaleDateString()
      : "";

  return (
    <div className="card my-3" style={{ maxWidth: "80%", margin: "0 auto" }}>
      <div className="card-body">
        {showDeletedMessage && (
          <div className="alert alert-danger alert-dismissible fade show" role="alert">
            Tour deleted successfully!
          </div>
        )}
        <div className="row">
          <div className="col-sm-6">
            <h3 className="card-title">{tour.tourname}</h3>
            <p className="card-text">Creator: {tour.creator}</p>
            <p className="card-text">Date: {formattedDate}</p>
          </div>
          <div className="col-sm-6 d-flex justify-content-end align-items-center">
            <button className="btn btn-danger" onClick={handleDelete}>
              Delete<i className="fa-solid fa-trash ms-2" style={{ color: '#ffffff' }}></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardTourItem;

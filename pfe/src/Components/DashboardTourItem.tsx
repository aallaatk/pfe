import React, { useState } from "react";

interface Tour {
  _id: string;
  tourname: string;
  creator: string;
  date: Date;
}

interface DashboardTourItemProps {
  tour: Tour;
  deleteTour: (id: string) => void;
  updateTour: (updatedTour: Tour) => void;
}

const DashboardTourItem: React.FC<DashboardTourItemProps> = ({ tour, deleteTour, updateTour }) => {
  const [editMode, setEditMode] = useState(false);
  const [updatedTourname, setUpdatedTourname] = useState(tour.tourname);
  const [updatedCreator, setUpdatedCreator] = useState(tour.creator);

  const handleDelete = () => {
    deleteTour(tour._id);
  };

  const handleSave = () => {
    // Construct updated tour object
    const updatedTour: Tour = {
      ...tour,
      tourname: updatedTourname,
      creator: updatedCreator
    };
    updateTour(updatedTour);
    setEditMode(false); // Exit edit mode
  };

  return (
    <div className="tour-item">
      {editMode ? (
        <div>
          <input
            type="text"
            value={updatedTourname}
            onChange={(e) => setUpdatedTourname(e.target.value)}
          />
          <input
            type="text"
            value={updatedCreator}
            onChange={(e) => setUpdatedCreator(e.target.value)}
          />
          <button onClick={handleSave}>Save</button>
          <button onClick={() => setEditMode(false)}>Cancel</button>
        </div>
      ) : (
        <div>
          <h3>{tour.tourname}</h3>
          <p>Creator: {tour.creator}</p>
          <p>Date: {tour.date.toDateString()}</p>
          <button onClick={() => setEditMode(true)}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </div>
      )}
    </div>
  );
};

export default DashboardTourItem;

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
  updateTour: (updatedTour: Tour) => void;
}

const DashboardTourItem: React.FC<DashboardTourItemProps> = ({ tour, deleteTour, updateTour }) => {
  const [editMode, setEditMode] = useState(false);
  const [updatedTour, setUpdatedTour] = useState<Tour>({ ...tour }); // Initialize updatedTour with the current tour details
  const [showSavedMessage, setShowSavedMessage] = useState(false);
  const [showDeletedMessage, setShowDeletedMessage] = useState(false);

  const handleDelete = () => {
    deleteTour(tour._id);
    setShowDeletedMessage(true); // Display deleted message
    setTimeout(() => setShowDeletedMessage(false), 2000); // Hide after 2 seconds
  };

  const handleSave = () => {
    updateTour(updatedTour);
    setShowSavedMessage(true); // Display saved message
    setEditMode(false); // Exit edit mode
    setTimeout(() => setShowSavedMessage(false), 2000); // Hide after 2 seconds
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUpdatedTour((prevTour) => ({
      ...prevTour,
      [name]: value,
    }));
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
        {showSavedMessage && (
          <div className="alert alert-success alert-dismissible fade show" role="alert">
            Changes saved successfully!
          </div>
        )}
        {showDeletedMessage && (
          <div className="alert alert-danger alert-dismissible fade show" role="alert">
            Tour deleted successfully!
          </div>
        )}
        {editMode ? (
          <div>
            {/* Render input fields for all editable properties */}
            <input
              type="text"
              className="form-control mb-2"
              name="tourname"
              value={updatedTour.tourname}
              onChange={handleChange}
            />
            <input
              type="text"
              className="form-control mb-2"
              name="creator"
              value={updatedTour.creator}
              onChange={handleChange}
            />
            <input
              type="text"
              className="form-control mb-2"
              name="date"
              value={updatedTour.date instanceof Date ? updatedTour.date.toISOString() : updatedTour.date}
              onChange={handleChange}
            />
            <input
              type="number"
              className="form-control mb-2"
              name="price"
              value={updatedTour.price}
              onChange={handleChange}
            />
            <textarea
              className="form-control mb-2"
              name="description"
              value={updatedTour.description ?? ""}
              onChange={handleChange}
            />
            <input
              type="number"
              className="form-control mb-2"
              name="attendees"
              value={updatedTour.attendees ?? ""}
              onChange={handleChange}
            />
            <input
              type="text"
              className="form-control mb-2"
              name="location"
              value={updatedTour.location ?? ""}
              onChange={handleChange}
            />
            <input
              type="text"
              className="form-control mb-2"
              name="duration"
              value={updatedTour.duration ?? ""}
              onChange={handleChange}
            />
            <div className="row">
              <div className="col-sm-6">
                <button className="btn btn-primary w-100 mb-2" onClick={handleSave}>
                  Save
                </button>
              </div>
              <div className="col-sm-6">
                <button className="btn btn-secondary w-100 mb-2" onClick={() => setEditMode(false)}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
         ) : (
          <div className="row">
            <div className="col-sm-6">
              <h3 className="card-title">{tour.tourname}</h3>
              <p className="card-text">Creator: {tour.creator}</p>
              <p className="card-text">Date: {formattedDate}</p>
            </div>
            <div className="col-sm-6 d-flex justify-content-end align-items-center">
              <button className="btn btn-primary me-2" onClick={() => setEditMode(true)}>
                Edit<i className="fa-solid fa-pen-to-square ms-2" style={{color: 'ffffff;'}}></i>
              </button>
              <button className="btn btn-danger" onClick={handleDelete}>
                 Delete<i className="fa-solid fa-trash ms-2" style={{ color: '#ffffff' }}></i>
                </button>

            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardTourItem;

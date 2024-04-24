import React, { useState } from "react";

interface SiteData {
  _id: string;
  sitename: string;
  sitelocation: string;
  description?: string; // Optional description field
}

interface DashboardSiteItemProps {
  site: SiteData;
  deleteSite: (id: string) => void;
  updateSite: (updatedSite: SiteData) => void;
}

const DashboardSiteItem: React.FC<DashboardSiteItemProps> = ({ site, deleteSite, updateSite }) => {
  const [editMode, setEditMode] = useState(false);
  const [updatedSite, setUpdatedSite] = useState<SiteData>({ ...site });
  const [showSavedMessage, setShowSavedMessage] = useState(false);
  const [showDeletedMessage, setShowDeletedMessage] = useState(false);

  const handleDelete = () => {
    deleteSite(site._id);
    setShowDeletedMessage(true);
    setTimeout(() => setShowDeletedMessage(false), 2000);
  };

  const handleSave = () => {
    updateSite(updatedSite);
    setShowSavedMessage(true);
    setEditMode(false);
    setTimeout(() => setShowSavedMessage(false), 2000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUpdatedSite((prevSite) => ({
      ...prevSite,
      [name]: value,
    }));
  };

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
            Site deleted successfully!
          </div>
        )}
        {editMode ? (
          <div>
            <input
              type="text"
              className="form-control mb-2"
              name="sitename"
              value={updatedSite.sitename}
              onChange={handleChange}
            />
            <input
              type="text"
              className="form-control mb-2"
              name="sitelocation"
              value={updatedSite.sitelocation}
              onChange={handleChange}
            />
            {/* Display description field in edit mode */}
            <textarea
              className="form-control mb-2"
              name="description"
              value={updatedSite.description ?? ""}
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
              <h3 className="card-title">{site.sitename}</h3>
              <p className="card-text">Location: {site.sitelocation}</p>
              {/* Display description when not in edit mode */}
              {site.description && <p className="card-text">Description: {site.description}</p>}
            </div>
            <div className="col-sm-6 d-flex justify-content-end align-items-center">
              <button className="btn btn-primary me-2" onClick={() => setEditMode(true)}>
                Edit
                <i className="fa-solid fa-pen-to-square ms-2" style={{ color: '#ffffff' }}></i>
              </button>
              <button className="btn btn-danger" onClick={handleDelete}>
                Delete
                <i className="fa-solid fa-trash ms-2" style={{ color: '#ffffff' }}></i>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardSiteItem;

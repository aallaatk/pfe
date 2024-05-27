import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Guider {
  _id: string;
  name: string;
  email: string;
  country: string;
  gsm: string;
  birthDate: string;
  isGuider: boolean;
  imageUrl?: string;
}

const GuiderInfoForm: React.FC = () => {
  const [guider, setGuider] = useState<Guider | null>(null);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editedGuider, setEditedGuider] = useState<Guider | null>(null);

  useEffect(() => {
    const fetchGuiderInfo = async () => {
      const guiderId = localStorage.getItem('userId');
      if (!guiderId) {
        setError('No guider ID found in local storage');
        return;
      }

      try {
        const response = await axios.get<Guider>(`http://localhost:3000/guiders/info/${guiderId}`);
        setGuider(response.data);
        setError('');
      } catch (error) {
        setError('Error fetching guider info');
        setGuider(null);
      }
    };

    fetchGuiderInfo();
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
    setEditedGuider(guider);
  };

  const handleSave = async () => {
    if (!editedGuider) return;

    try {
      await axios.put(`http://localhost:3000/guiders/update/${editedGuider._id}`, editedGuider);
      setIsEditing(false);
      setGuider(editedGuider);
      setError('');
    } catch (error) {
      setError('Error updating guider info');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedGuider(prevState => ({
      ...prevState!,
      [name]: value
    }));
  };

  return (
    <div className="container mt-5 text-center">
      {guider && (
        <div className="mt-3">
          <img src={guider.imageUrl} alt="Guider" className="img-fluid mt-3" style={{ width: '300px', height: '300px' }} />
          {isEditing ? (
            <>
              <h3>Edit Guider Details</h3>
              <form className="row g-3 justify-content-center">
                <div className="col-md-6">
                  <label htmlFor="name" className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={editedGuider?.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={editedGuider?.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="country" className="form-label">Country</label>
                  <input
                    type="text"
                    className="form-control"
                    id="country"
                    name="country"
                    value={editedGuider?.country}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="gsm" className="form-label">GSM</label>
                  <input
                    type="text"
                    className="form-control"
                    id="gsm"
                    name="gsm"
                    value={editedGuider?.gsm}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="birthDate" className="form-label">Birth Date</label>
                  <input
                    type="date"
                    className="form-control"
                    id="birthDate"
                    name="birthDate"
                    value={editedGuider?.birthDate}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-12">
                  <button type="button" className="btn btn-success" onClick={handleSave}>Save</button>
                  <button type="button" className="btn btn-danger ms-2" onClick={() => setIsEditing(false)}>Cancel</button>
                </div>
              </form>
            </>
          ) : (
            <>
              <h3>Guider Details</h3>
              <p><strong>ID:</strong> {guider._id}</p>
              <p><strong>Name:</strong> {guider.name}</p>
              <p><strong>Email:</strong> {guider.email}</p>
              <p><strong>Country:</strong> {guider.country}</p>
              <p><strong>GSM:</strong> {guider.gsm}</p>
              <p><strong>Birth Date:</strong> {new Date(guider.birthDate).toLocaleDateString()}</p>
              <button type="button" className="btn btn-primary" onClick={handleEdit}>Edit</button>
            </>
          )}
        </div>
      )}
      {error && <p className="text-danger mt-3">{error}</p>}
    </div>
  );
};

export default GuiderInfoForm;

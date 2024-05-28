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
    <div className="container mt-5">
      {guider && (
        <div className="card shadow-lg p-3 mb-5 bg-body rounded border border-secondary">
          <div className="card-body">
            <div className="text-center">
              <img 
                src={guider.imageUrl} 
                alt="Guider" 
                className="img-fluid rounded-circle mb-3 shadow" 
                style={{ width: '200px', height: '200px', objectFit: 'cover', border: '2px solid #dee2e6' }} 
              />
            </div>
            {isEditing ? (
              <>
                <h3 className="card-title text-center">Edit Guider Details</h3>
                <form className="row g-3">
                  <div className="col-md-6 d-flex flex-column align-items-center">
                    <div className="mb-3 w-75">
                      <label htmlFor="id" className="form-label">ID</label>
                      <input
                        type="text"
                        className="form-control border border-secondary shadow-sm"
                        id="id"
                        value={guider._id}
                        readOnly
                      />
                    </div>
                    <div className="mb-3 w-75">
                      <label htmlFor="name" className="form-label">Name</label>
                      <input
                        type="text"
                        className="form-control border border-secondary shadow-sm"
                        id="name"
                        name="name"
                        value={editedGuider?.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="mb-3 w-75">
                      <label htmlFor="email" className="form-label">Email</label>
                      <input
                        type="email"
                        className="form-control border border-secondary shadow-sm"
                        id="email"
                        name="email"
                        value={editedGuider?.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6 d-flex flex-column align-items-center">
                    <div className="mb-3 w-75">
                      <label htmlFor="country" className="form-label">Country</label>
                      <input
                        type="text"
                        className="form-control border border-secondary shadow-sm"
                        id="country"
                        name="country"
                        value={editedGuider?.country}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="mb-3 w-75">
                      <label htmlFor="gsm" className="form-label">GSM</label>
                      <input
                        type="text"
                        className="form-control border border-secondary shadow-sm"
                        id="gsm"
                        name="gsm"
                        value={editedGuider?.gsm}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="mb-3 w-75">
                      <label htmlFor="birthDate" className="form-label">Birth Date</label>
                      <input
                        type="date"
                        className="form-control border border-secondary shadow-sm"
                        id="birthDate"
                        name="birthDate"
                        value={editedGuider?.birthDate}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-12 text-center">
                    <button type="button" className="btn btn-success me-2 shadow" onClick={handleSave}>Save</button>
                    <button type="button" className="btn btn-danger shadow" onClick={() => setIsEditing(false)}>Cancel</button>
                  </div>
                </form>
              </>
            ) : (
              <>
                <h3 className="card-title text-center">Guider Details</h3>
                <div className="row">
                  <div className="col-md-6 d-flex flex-column align-items-center">
                    <p className="card-text"><strong>ID:</strong> {guider._id}</p>
                    <p className="card-text"><strong>Name:</strong> {guider.name}</p>
                    <p className="card-text"><strong>Email:</strong> {guider.email}</p>
                  </div>
                  <div className="col-md-6 d-flex flex-column align-items-center">
                    <p className="card-text"><strong>Country:</strong> {guider.country}</p>
                    <p className="card-text"><strong>GSM:</strong> {guider.gsm}</p>
                    <p className="card-text"><strong>Birth Date:</strong> {new Date(guider.birthDate).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="text-center">
                  <button type="button" className="btn btn-primary shadow" onClick={handleEdit}>Edit</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
      {error && <p className="text-danger text-center mt-3">{error}</p>}
    </div>
  );
}

export default GuiderInfoForm;

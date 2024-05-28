import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface User {
  _id: string;
  name: string;
  email: string;
  country: string;
  gsm: string;
  birthDate: string;
  isGuider: boolean;
  imageUrl?: string;
}

const UserInfoForm: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        setError('No user ID found in local storage');
        return;
      }

      try {
        const response = await axios.get<User>(`http://localhost:3000/info/user/${userId}`);
        setUser(response.data);
        setError('');
      } catch (error) {
        setError('Error fetching user info');
        setUser(null);
      }
    };

    fetchUserInfo();
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
    setEditedUser(user);
  };

  const handleSave = async () => {
    if (!editedUser) return;

    try {
      await axios.put(`http://localhost:3000/users/${editedUser._id}`, editedUser);
      setIsEditing(false);
      setUser(editedUser);
      setError('');
    } catch (error) {
      setError('Error updating user info');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedUser(prevState => ({
      ...prevState!,
      [name]: value
    }));
  };
return (
  <div className="container mt-5">
    {user && (
      <div className="card shadow-lg p-3 mb-5 bg-body rounded border border-secondary">
        <div className="card-body">
          <div className="text-center">
            <img 
              src={user.imageUrl} 
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
                      value={user._id}
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
                      value={editedUser?.name}
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
                      value={editedUser?.email}
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
                      value={editedUser?.country}
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
                      value={editedUser?.gsm}
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
                      value={editedUser?.birthDate}
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
                  <p className="card-text"><strong>ID:</strong> {user._id}</p>
                  <p className="card-text"><strong>Name:</strong> {user.name}</p>
                  <p className="card-text"><strong>Email:</strong> {user.email}</p>
                </div>
                <div className="col-md-6 d-flex flex-column align-items-center">
                  <p className="card-text"><strong>Country:</strong> {user.country}</p>
                  <p className="card-text"><strong>GSM:</strong> {user.gsm}</p>
                  <p className="card-text"><strong>Birth Date:</strong> {new Date(user.birthDate).toLocaleDateString()}</p>
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

  
};

export default UserInfoForm;

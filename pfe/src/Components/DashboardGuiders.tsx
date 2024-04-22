import  { useState, useEffect } from 'react';
import axios from 'axios';
import { User } from './DashboardUsers'; // Assuming Guider extends User as per your interface

function DashboardGuiders() {
  const [guiders, setGuiders] = useState<User[]>([]);
  const [editableFields, setEditableFields] = useState<{ [key: string]: boolean }>({});
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    fetchGuiders();
  }, []);

  const fetchGuiders = async () => {
    try {
      const response = await axios.get<User[]>('http://localhost:3000/guiders');
      setGuiders(response.data);
      setEditableFields({}); // Clear editable fields state
    } catch (error) {
      console.error('Error fetching guiders:', error);
    }
  };

  const handleEditGuider = (guiderId: string) => {
    // Toggle editable state for the selected guider
    setEditableFields((prevEditableFields) => ({
      ...prevEditableFields,
      [guiderId]: true
    }));
  };

  const handleSaveGuider = async (guiderId: string) => {
    const updatedGuider = guiders.find((guider) => guider._id === guiderId);
    if (updatedGuider) {
      try {
        await axios.put<User>(`http://localhost:3000/guiders/${guiderId}`, updatedGuider);
        fetchGuiders(); // Refresh guiders after successful update
        displayMessage('Changes saved');
      } catch (error) {
        console.error('Error updating guider:', error);
        displayMessage('Failed to save changes');
      }
    }

    // Disable editing mode after saving changes
    setEditableFields((prevEditableFields) => ({
      ...prevEditableFields,
      [guiderId]: false
    }));
  };

  const handleDeleteGuider = async (guiderId: string) => {
    try {
      await axios.delete(`http://localhost:3000/guiders/${guiderId}`);
      setGuiders(guiders.filter((guider) => guider._id !== guiderId)); // Remove the deleted guider from state
      displayMessage('Guider deleted');
    } catch (error) {
      console.error('Error deleting guider:', error);
      displayMessage('Failed to delete guider');
    }
  };

  const displayMessage = (messageText: string) => {
    setMessage(messageText);
    setTimeout(() => {
      setMessage(null); // Clear message after 2 seconds
    }, 2000);
  };

  const handleFieldChange = (guiderId: string, field: keyof User, value: string | boolean) => {
    setGuiders((prevGuiders) =>
      prevGuiders.map((prevGuider) =>
        prevGuider._id === guiderId ? { ...prevGuider, [field]: value } : prevGuider
      )
    );
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date instanceof Date ? date.toLocaleDateString() : '';
  };

  return (
    <div className='container '>
      <h2 className='text-center mt-4' style={{ fontWeight: 'bold' }}>Guiders</h2>
      {message && (
        <div className="alert alert-success" role="alert">
          {message}
        </div>
      )}
      <div className="table-responsive mt-4">
        <table className="table table-striped table-bordered table-hover text-center">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Country</th>
              <th>GSM</th>
              <th>Birth Date</th>
              <th>Is Guider</th>
              <th>CIN File</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {guiders.map((guider, index) => (
              <tr key={guider._id}>
                <td>{index + 1}</td>
                <td>
                  {editableFields[guider._id] ? (
                    <input
                      type="text"
                      className="form-control"
                      value={guider.name}
                      onChange={(e) => handleFieldChange(guider._id, 'name', e.target.value)}
                    />
                  ) : (
                    guider.name
                  )}
                </td>
                <td>
                  {editableFields[guider._id] ? (
                    <input
                      type="text"
                      className="form-control"
                      value={guider.email}
                      onChange={(e) => handleFieldChange(guider._id, 'email', e.target.value)}
                    />
                  ) : (
                    guider.email
                  )}
                </td>
                <td>
                  {editableFields[guider._id] ? (
                    <input
                      type="text"
                      className="form-control"
                      value={guider.country}
                      onChange={(e) => handleFieldChange(guider._id, 'country', e.target.value)}
                    />
                  ) : (
                    guider.country
                  )}
                </td>
                <td>
                  {editableFields[guider._id] ? (
                    <input
                      type="text"
                      className="form-control"
                      value={guider.gsm}
                      onChange={(e) => handleFieldChange(guider._id, 'gsm', e.target.value)}
                    />
                  ) : (
                    guider.gsm
                  )}
                </td>
                <td>
                  {editableFields[guider._id] ? (
                    <input
                      type="text"
                      className="form-control"
                      value={guider.birthDate}
                      onChange={(e) => handleFieldChange(guider._id, 'birthDate', e.target.value)}
                    />
                  ) : (
                    formatDate(guider.birthDate) // Format date using formatDate function
                  )}
                </td>
                <td>{guider.isGuider ? 'Yes' : 'No'}</td>
                <td>{guider.cinFile ? guider.cinFile : 'N/A'}</td>
                <td>
                  {editableFields[guider._id] ? (
                    <button className="btn btn-success me-1" onClick={() => handleSaveGuider(guider._id)}>
                      Save <i className="fa-solid fa-floppy-disk ms-1" style={{ color: '#ffffff' }}></i>
                    </button>
                  ) : (
                    <button className="btn btn-primary me-1" onClick={() => handleEditGuider(guider._id)}>
                      Edit <i className="fa-solid fa-pen-to-square ms-1" style={{ color: '#ffffff' }}></i>
                    </button>
                  )}
                  <button className="btn btn-danger" onClick={() => handleDeleteGuider(guider._id)}>
                    Delete <i className="fa-solid fa-trash ms-1" style={{ color: '#ffffff' }}></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DashboardGuiders;

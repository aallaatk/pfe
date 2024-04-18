


import { useState } from "react";
import emailjs from 'emailjs-com';

interface FormData {
  subject: string;
  name: string;
  gsm: string;
  email: string;
  content: string;
}

function Lcu() {
  const initialFormData: FormData = {
    subject: 'Inform about services',
    name: '',
    gsm: '',
    email: '',
    content: ''
  };

  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [showAlert, setShowAlert] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formDataToSend: Record<string, string> = {
      subject: formData.subject,
      name: formData.name,
      gsm: formData.gsm,
      email: formData.email,
      content: formData.content
    };

    try {
      const response = await emailjs.send('service_h3u77hp', 'template_w59pzgk', formDataToSend, 'CxNbbreN-XhMv4xrI')

      console.log('Email sent!', response);

      // Show success alert
      setShowAlert(true);

      // Reset form after 2 seconds
      setTimeout(() => {
        setFormData(initialFormData);
        setShowAlert(false);
      }, 2000);
    } catch (error) {
      console.error('Email error:', error);
      // Handle error state or display an error message
    }
  };

  return (
    <div className="container mt-5">
      {showAlert && (
        <div className="alert alert-success alert-dismissible fade show" role="alert">
          Form submitted successfully! Thank you.
        </div>
      )}
      <form className="row g-3" onSubmit={handleSubmit}>
        <div className="col-12">
          <label htmlFor="inputSubject" className="form-label">Subject</label>
          <select
            id="inputSubject"
            name='subject'
            className="form-select"
            value={formData.subject}
            onChange={handleChange}
          >
            <option value="Inform about services">Inform about services</option>
            <option value="Report an issue">Report an issue</option>
          </select>
        </div>
        <div className="col-md-6">
          <label htmlFor="inputName" className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            id="inputName"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="inputGSM" className="form-label">GSM</label>
          <input
            type="text"
            className="form-control"
            id="inputGSM"
            name="gsm"
            value={formData.gsm}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-12">
          <label htmlFor="inputEmail" className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            id="inputEmail"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-12">
          <label htmlFor="inputContent" className="form-label">Content</label>
          <textarea
            className="form-control"
            id="inputContent"
            rows={3}
            name="content"
            value={formData.content}
            onChange={handleChange}
            placeholder='Please feel free to express your feelings'
            required
          />
        </div>
        <button type="submit" className="btn btn-grad mt-4" style={{color:'white'}}>Submit</button>
      </form>
    </div>
  );
}

export default Lcu;





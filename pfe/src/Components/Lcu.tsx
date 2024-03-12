import { useState } from "react";

interface FormData {
    subject: string;
    name: string;
    gsm: string;
    email: string;
    content: string;
  }
  function Lcu() {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
  };
 
    const [formData, setFormData] = useState<FormData>({
        subject: '',
        name: '',
        gsm: '',
        email: '',
        content: ''
      });
    return (
        <form className="row g-3" onSubmit={handleSubmit}>
        <div className="col-12">
          <label htmlFor="inputSubject" className="form-label">Subject</label>
          <select
            id="inputSubject"
            name='subject'
            className="form-select"
            value={formData.subject}
            onChange={handleChange}>
            <option selected>Inform about services</option>
            <option>Report an issue</option>
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
            placeholder='Please feel free to express your feelings' required
          />
        </div>
      </form>
    )
  }
  
  export default Lcu
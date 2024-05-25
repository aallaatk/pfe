import  { ChangeEvent, FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import countryList from 'react-select-country-list';
import type { FormData,Country } from '../helpers/interfaces';

const Signup: React.FC = () => {
    const [imageFile, setImageFile] = useState<File | null>(null); // State for image file
    const [formData, setFormData] = useState<FormData>({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      country: '',
      gsm: '',
      birthDate: '',
      agreeToTerms: false,
      isGuider: false,
      imageUrl: '', // State to hold the uploaded image URL
    });
  
    const [errors, setErrors] = useState<string[]>([]);
    const navigate = useNavigate();
  
    const isValidGSM = (gsm: string) => {
      const gsmRegex = /^\d+$/;
      return gsmRegex.test(gsm);
    };
  
    const isValidEmail = (email: string) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };
  
    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files?.[0]) {
        const selectedFile = e.target.files[0];
        setImageFile(selectedFile); // Set the selected file to state
        setFormData({
          ...formData,
          imageUrl: URL.createObjectURL(selectedFile), // Store image preview URL
        });
      }
    };
  
    const handleChange = (
      e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
      const { name, value } = e.target;
      const isCheckbox = (e.target as HTMLInputElement).type === 'checkbox';
      setFormData({
        ...formData,
        [name]: isCheckbox ? (e.target as HTMLInputElement).checked : value,
      });
    };
  
    const handleCountryChange = (e: ChangeEvent<HTMLSelectElement>) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
    };
  
    const handleSignupTypeChange = (isGuider: boolean) => {
      setFormData({
        ...formData,
        isGuider,
      });
    };
  
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
  
      // Validate form fields
      const newErrors: string[] = [];
  
      if (!formData.name.trim()) {
        newErrors.push('Please enter your name.');
      }
  
      if (!formData.email.trim()) {
        newErrors.push('Please enter your email address.');
      } else if (!isValidEmail(formData.email)) {
        newErrors.push('Please enter a valid email address.');
      }
  
      if (!formData.password.trim()) {
        newErrors.push('Please enter a password.');
      }
  
      if (formData.password !== formData.confirmPassword) {
        newErrors.push('Passwords do not match!');
      }
  
      if (!formData.gsm.trim()) {
        newErrors.push('Please enter your GSM number.');
      } else if (!isValidGSM(formData.gsm)) {
        newErrors.push('Please enter a valid GSM number (numbers only).');
      }
  
      if (!formData.agreeToTerms) {
        newErrors.push('Please agree to the terms of use.');
      }
  
      setErrors(newErrors);
  
      if (newErrors.length > 0) {
        return;
      }
  
      try {
        const formDataForUpload = new FormData();
        if (imageFile) {
          formDataForUpload.append('file', imageFile); // Append image file to FormData
        }
  
        const cloudinaryCloudName = 'dpnba7vok';
        const uploadPreset = 'tuzria4w';
  
        const cloudinaryResponse = await axios.post(
          `https://api.cloudinary.com/v1_1/${cloudinaryCloudName}/image/upload`,
          formDataForUpload,
          {
            params: {
              upload_preset: uploadPreset,
            },
          }
        );
  
        console.log('Cloudinary Response:', cloudinaryResponse.data);
  
        // Prepare form data for signup request
        const newUserFormData: FormData = {
          ...formData,
          imageUrl: cloudinaryResponse.data.secure_url,
        };
  
        // Make signup request with user data including image URL
        const response = await axios.post(
          'http://localhost:3000/signup',
          newUserFormData
        );
  
        console.log('Signup successful:', response.data);
        navigate('/login');
      } catch (error) {
        console.error('Signup error:', error);
      }
    };
  
  
    
    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="bg-white p-3 rounded">
                        <h2 className="text-center mb-4" style={{ color: '#040073', fontWeight: 'bold', fontSize: '46px', letterSpacing: '0.5rem' }}>Sign Up</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="name"><strong>Full Name</strong></label>
                                <input
                                    type="text"
                                    placeholder='Enter Name'
                                    autoComplete='off'
                                    name='name'
                                    className={`form-control ${errors.includes("Please enter your name.") ? "is-invalid" : formData.name.trim() ? "is-valid" : ""}`}
                                    onChange={handleChange}
                                    value={formData.name}
                                />
                                {errors.includes("Please enter your name.") && <span className="invalid-feedback" style={{ color: 'red' }}>Please enter your name.</span>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email"><strong>Email</strong></label>
                                <input
                                    type="text"
                                    placeholder='Enter Email'
                                    autoComplete='off'
                                    name='email'
                                    className={`form-control ${errors.includes("Please enter your email address.") || errors.includes("Please enter a valid email address.") ? "is-invalid" : formData.email.trim() ? "is-valid" : ""}`}
                                    onChange={handleChange}
                                    value={formData.email}
                                />
                                {(errors.includes("Please enter your email address.") || errors.includes("Please enter a valid email address.")) && <span className="invalid-feedback" style={{ color: 'red' }}>{errors.includes("Please enter your email address.") ? "Please enter your email address." : "Please enter a valid email address."}</span>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="country"><strong>Country</strong></label>
                                <select
                                    name="country"
                                    className={`form-control ${errors.includes("Please select a country.") ? "is-invalid" : formData.country ? "is-valid" : ""}`}
                                    onChange={handleCountryChange}
                                    value={formData.country}
                                >
                                    <option value="">Select Country</option>
                                    {countryList().getData().map((country: Country) => (
                                        <option key={country.value} value={country.value}>
                                            {country.label}
                                        </option>
                                    ))}
                                </select>
                                {errors.includes("Please select a country.") && <span className="invalid-feedback" style={{ color: 'red' }}>Please select a country.</span>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="gsm"><strong>GSM</strong></label>
                                <input
                                    type="text"
                                    placeholder='Enter GSM'
                                    autoComplete='off'
                                    name='gsm'
                                    className={`form-control ${errors.includes("Please enter your GSM number.") || errors.includes("Please enter a valid GSM number (numbers only).") ? "is-invalid" : formData.gsm.trim() ? "is-valid" : ""}`}
                                    onChange={handleChange}
                                    value={formData.gsm}
                                />
                               
                               
                               {(errors.includes("Please enter your GSM number.") || errors.includes("Please enter a valid GSM number (numbers only).")) && <span className="invalid-feedback" style={{ color: 'red' }}>{errors.includes("Please enter your GSM number.") ? "Please enter your GSM number." : "Please enter a valid GSM number (numbers only)."}</span>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="birthDate"><strong>Birth Date</strong></label>
                                <input
                                    type="date"
                                    placeholder='Enter Birth Date'
                                    autoComplete='off'
                                    name='birthDate'
                                    className={`form-control ${errors.includes("Please enter your birth date.") ? "is-invalid" : formData.birthDate ? "is-valid" : ""}`}
                                    onChange={handleChange}
                                    value={formData.birthDate}
                                />
                                {errors.includes("Please enter your birth date.") && <span className="invalid-feedback" style={{ color: 'red' }}>Please enter your birth date.</span>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password"><strong>Password</strong></label>
                                <input
                                    type="password"
                                    placeholder='Enter Password'
                                    name='password'
                                    className={`form-control ${errors.includes("Please enter a password.") ? "is-invalid" : formData.password.trim() ? "is-valid" : ""}`}
                                    onChange={handleChange}
                                    value={formData.password}
                                />
                                {errors.includes("Please enter a password.") && <span className="invalid-feedback" style={{ color: 'red' }}>Please enter a password.</span>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="confirmPassword"><strong>Confirm Password</strong></label>
                                <input
                                    type="password"
                                    placeholder='Confirm Password'
                                    name='confirmPassword'
                                    className={`form-control ${errors.includes("Passwords do not match!") ? "is-invalid" : formData.confirmPassword === formData.password && formData.confirmPassword ? "is-valid" : ""}`}
                                    onChange={handleChange}
                                    value={formData.confirmPassword}
                                />
                                {errors.includes("Passwords do not match!") && <span className="invalid-feedback" style={{ color: 'red' }}>Passwords do not match!</span>}
                            </div>
                            <div className="mb-3 form-check">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="agreeToTerms"
                                    name="agreeToTerms"
                                    checked={formData.agreeToTerms}
                                    onChange={handleChange}
                                />
                                <label className="form-check-label" htmlFor="agreeToTerms">I agree to the terms of use</label>
                                {errors.includes("Please agree to the terms of use.") && <span className="invalid-feedback d-block" style={{ color: 'red' }}>Please agree to the terms of use.</span>}
                            </div>
                            <div className="mb-3 form-check">
                                <input
                                    type="radio"
                                    className="form-check-input"
                                    id="signupUser"
                                    name="signupType"
                                    checked={!formData.isGuider}
                                    onChange={() => handleSignupTypeChange(false)}
                                />
                                <label className="form-check-label" htmlFor="signupUser">Sign up as a User</label>
                            </div>
                            <div className="mb-3 form-check">
                                <input
                                    type="radio"
                                    className="form-check-input"
                                    id="signupGuider"
                                    name="signupType"
                                    checked={formData.isGuider}
                                    onChange={() => handleSignupTypeChange(true)}
                                />
                                <label className="form-check-label" htmlFor="signupGuider">Sign up as a Guider</label>
                            </div>
                            <div className="mb-3">
                <label htmlFor="image"><strong>Profile Picture</strong></label>
                <input type="file" accept="image/*" onChange={handleImageChange} />
                {formData.imageUrl && (
                  <img
                    src={formData.imageUrl}
                    alt="Profile Preview"
                    className="mt-3"
                    style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                  />
                )}
              </div>
                           
                           
                            <button className="btn btn-grad w-100" type="submit">Sign up</button>
                        </form>
                        <p className="text-center mt-3">Already have an account? <Link to="/login">Login</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Signup;

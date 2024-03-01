import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import Button from "../Components/Button";

interface FormData {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    agreeToTerms: boolean;
}

function Signup() {
    const [formData, setFormData] = useState<FormData>({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        agreeToTerms: false
    });
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Check if password matches confirm password
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }
        // Check if user agrees to terms
        if (!formData.agreeToTerms) {
            alert("Please agree to the terms of use.");
            return;
        }
        axios.post("http://localhost:3001/register", formData)
            .then(result => {
                console.log(result);
                navigate("/login");
            })
            .catch(err => console.log(err));
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement> ) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value
        });
    }
    

    return (
        <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
          <div className="bg-white p-3 rounded w-75">
            <h2 className="h1 text-center" style={{ color: '#040073', fontWeight: 'bold', fontSize: '46px', letterSpacing: '0.5rem' }}>Sign Up</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="name"><strong>Name</strong></label>
                <input type="text"
                  placeholder='Enter Name'
                  autoComplete='off'
                  name='name'
                  className='form-control rounded-0'
                  onChange={handleChange}
                  value={formData.name}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email"><strong>Email</strong></label>
                <input type="text"
                  placeholder='Enter Email'
                  autoComplete='off'
                  name='email'
                  className='form-control rounded-0'
                  onChange={handleChange}
                  value={formData.email}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password"><strong>Password</strong></label>
                <input type="password"
                  placeholder='Enter Password'
                  name='password'
                  className='form-control rounded-0'
                  onChange={handleChange}
                  value={formData.password}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="confirmPassword"><strong>Confirm Password</strong></label>
                <input type="password"
                  placeholder='Confirm Password'
                  name='confirmPassword'
                  className='form-control rounded-0'
                  onChange={handleChange}
                  value={formData.confirmPassword}
                />
              </div>
              <div className="mb-3 form-check">
                <input type="checkbox"
                  className="form-check-input"
                  id="agreeToTerms"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor="agreeToTerms">I agree to the terms of use</label>
              </div>
              <Button text={"Sign Up"} bclass={"btn btn-grad w-100"} />
            </form>
            <p>Already have an account?</p>
            <Link to="/login" className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none">
              Login
            </Link>
          </div>
        </div>
      );
}

export default Signup;

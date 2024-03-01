import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import Button from "../Components/Button";

function Login() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        axios.post("http://localhost:3001/login", { email, password })
            .then(result => {
                console.log(result);
                if (result.data === "Success") {
                    navigate("/home");
                } else {
                    navigate("/register");
                    alert("You are not registered to this service");
                }
            })
            .catch(err => console.log(err));
    }

   return (
  <div className="bg-secondary vh-100">
    <div className="container-fluid d-flex justify-content-center align-items-center h-100">
      <div className="bg-white p-3 rounded w-75">
        <h2 className="text-center">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email"><strong>Email</strong></label>
            <input type="text"
              placeholder='Enter Email'
              autoComplete='off'
              name='email'
              className='form-control rounded-0'
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password"><strong>Password</strong></label>
            <input type="password"
              placeholder='Enter Password'
              name='password'
              className='form-control rounded-0'
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {/* <button type="submit" className="btn btn-success w-100 rounded-0">
              Login
          </button> */}
          <Button text={"Login"} bclass={"btn btn-grad w-100"}/>
          {/* u should change button type to submit !!!!! */}
        </form>
        <p>Don't have an account?</p>
        <Link to="/signup" className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none">
          Sign Up
        </Link>
      </div>
    </div>
  </div>
);

      
}

export default Login;

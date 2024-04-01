import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';


function Login() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [rememberMe, setRememberMe] = useState<boolean>(false); 
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        axios.post("http://localhost:3000/login", { email, password, rememberMe }) 
            .then(result => {
                console.log(result);
                if (result.data === "Success") {
                    navigate("/home");
                } else {
                    navigate("/signup");
                    alert("You are not registered to this service");
                }
            })
            .catch(err => console.log(err));
    }

    return (
      <div className=" vh-100">
        <div className="container d-flex justify-content-center  h-100 mt-5">
          <div className="bg-white p-3 rounded w-75">
            <h2 className="text-center" style={{ color: '#040073', fontWeight: 'bold', fontSize: '46px', letterSpacing: '0.5rem' }}>Login</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="email"><strong>Email</strong></label>
                <input type="text"
                  placeholder='Enter Email'
                  autoComplete='off'
                  name='email'
                  className='form-control'
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password"><strong>Password</strong></label>
                <input type="password"
                  placeholder='Enter Password'
                  name='password'
                  className='form-control'
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="mb-3 form-check"> 
                <input 
                  type="checkbox" 
                  className="form-check-input" 
                  id="rememberMe" 
                  checked={rememberMe} 
                  onChange={(e) => setRememberMe(e.target.checked)} 
                />
                <label className="form-check-label" htmlFor="rememberMe">Remember Me</label>
              </div>
              <button className="btn btn-grad w-100" type="submit">Login</button>
            </form>
            <div className="text-center mt-3">
              <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
            </div>
          </div>
        </div>
      </div>
    );
    
}

export default Login;

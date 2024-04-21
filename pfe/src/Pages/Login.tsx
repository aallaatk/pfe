import React, { useState, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

const Login: React.FC = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const navigate = useNavigate();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            // Determine the login endpoint based on the provided email
            const endpoint = email.toLowerCase() === 'sleimiala@gmail.com' ? "/login/admin" : "/login/user";

            const response = await axios.post<{ token: string; user: { role: string } }>(
                `http://localhost:3000${endpoint}`,
                { email, password }
            );

            const { token, user } = response.data;

            // Store token and role in localStorage for authentication
            localStorage.setItem('token', token);
            localStorage.setItem('role', user.role);

            // Redirect user based on role
            navigate(user.role === 'admin' ? "/admin" : "/home");
        } catch (error) {
            console.error("Login failed:", error);
            alert("Login failed. Please check your credentials.");
        }
    };

    return (
        <div className="vh-100 d-flex align-items-center justify-content-center">
            <div className="bg-white p-4 rounded w-50">
                <h2 className="text-center mb-4" style={{ color: '#040073', fontWeight: 'bold' }}>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email"><strong>Email</strong></label>
                        <input
                            type="text"
                            placeholder="Enter Email"
                            autoComplete="off"
                            name="email"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password"><strong>Password</strong></label>
                        <input
                            type="password"
                            placeholder="Enter Password"
                            name="password"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button className="btn btn-primary w-100" type="submit">Login</button>
                </form>
                <div className="text-center mt-3">
                    <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Login;

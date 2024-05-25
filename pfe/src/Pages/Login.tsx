import React, { useState, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

interface LoginProps {
    onLogin: (role: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const authenticateUser = async () => {
        try {
            const endpoint = email.toLowerCase() === 'sleimiala@gmail.com' ? "/login/admin" : "/login/user";
            const response = await axios.post<{ token: string; user: { role: string } }>(
                `http://localhost:3000${endpoint}`,
                { email, password }
            );

            const { token, user } = response.data;
            localStorage.setItem('token', token);
            localStorage.setItem('role', user.role);

            return user.role;
        } catch (error) {
            throw new Error("Login failed. Please check your credentials.");
        }
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const role = await authenticateUser();
            onLogin(role);

            if (role === "admin") {
                navigate("/admin");
            } else if (role === "guider") { // Redirect guider to /guide route
                navigate("/guide");
            } else {
                navigate("/user");
            }
        } catch (error) {
            setError((error as Error).message);
        } finally {
            setIsLoading(false);
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
                    {error && (
                        <div className="alert alert-danger" role="alert">
                            {error}
                        </div>
                    )}
                    <button className="btn btn-primary w-100" type="submit" disabled={isLoading}>
                        {isLoading ? 'Logging in...' : 'Login'}
                    </button>
                </form>
                <div className="text-center mt-3">
                    <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Login;

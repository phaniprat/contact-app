import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const SignupForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(JSON.stringify({ "email":email, "password":password }));
        try {
          const response = await axios.post('http://localhost:3000/api/auth/signup', 
            { email, password },
            { headers: { 'Content-Type': 'application/json' } }
          );
          console.log(response.data);
            navigate('/login');
        } catch (error) {
            console.error('Signup error:', error);
        }
    };

    return (
        <div>
            <h2>Signup</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Sign Up</button>
            </form>

            <div>Already signedup? Proceed to <Link to="/login">login</Link></div>
        </div>
    );
};

export default SignupForm;

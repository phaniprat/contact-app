import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [otp, setOtp] = useState('');
    const [isOtpSent, setIsOtpSent] = useState(false);
    const navigate = useNavigate();

    const handleOtp = async (e) =>{
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/api/auth/send-otp', 
                { email },
                { headers: { 'Content-Type': 'application/json' } }
            );
            if(response){
                setIsOtpSent(true);
            }   
        } catch (error) {
            console.log('OTP sending failed: ' + error.response.data.message || error.message);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
       
        try {
    
            await axios.post('http://localhost:3000/api/auth/verify-otp', 
                { email, otp },
                { headers: { 'Content-Type': 'application/json' } }
            );
            

            const loginResponse = await axios.post('http://localhost:3000/api/auth/login', 
                { email, password },
                { headers: { 'Content-Type': 'application/json' } }
            );
            localStorage.setItem('userToken', loginResponse.data.token);
            navigate('/contact');
            
        } catch (error) {
            if (error.response && error.response.data) {
                 console.error('Error:', error.response.data.message);
            } else {
                console.error('Error:', error.message);
            }
        }
    };
    
    

    return (
        <div>
            <h2>Login</h2>
            {isOtpSent ? (
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Enter OTP:</label>
                        <input
                            type="text"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            
                        />
                    </div>
                    <button type="submit">Submit-otp</button>
                </form>
            ) : 
            <form onSubmit={handleOtp}>
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
                <button type="submit">Log In</button>
            </form>
}
        </div>
    );
};

export default LoginForm;

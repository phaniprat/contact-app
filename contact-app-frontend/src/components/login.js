import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isAuth, setIsAuth] = useState(false);
    const [otp, setOtp] = useState('');
    const [isOtpSent, setIsOtpSent] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) =>{
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

    const verifyOtp = async () => {
        try {
            return await axios.post('http://localhost:3000/api/auth/verify-otp', 
                { email, otp },
                { headers: { 'Content-Type': 'application/json' } }
            ).then(navigate('/contact'));
        } catch (error) {
            console.error('OTP verification Failed:', error);
        }
    }
    
    const handleOtp  = async (e) => {
        e.preventDefault();
        try {
        
            
            const response = await axios.post('http://localhost:3000/api/auth/login', 
                { email, password },
                { headers: { 'Content-Type': 'application/json' } }
            );
    
            localStorage.setItem('userToken', response.data.token);
            if(response){
                setIsAuth(true);
            }

        } catch (error) {
            console.error('Login error:', error.message || error);
        }
    };
    

    return (
        <div>
            <h2>Login</h2>
            {isAuth ? (
                <form onSubmit={isOtpSent? verifyOtp : handleSubmit}>
                    <div>
                        <label>Enter OTP:</label>
                        <input
                            type="text"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            
                        />
                    </div>
                    <button type="submit">{isOtpSent? "Submit" :"send OTP"}</button>
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

const nodemailer = require('nodemailer');
const crypto = require('crypto');
const User = require('../models/User'); 

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'kothuruphaneendrak@gmail.com',
        pass: 'hnfw xgiv bygf bbay' 
    },
});

const sendOtp = async (req, res) => {
    const { email } = req.body;
    try {
        const otp = crypto.randomInt(100000, 999999).toString();
        const otpExpiresIn = Date.now() + 300000;

        let user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }


        user.otp = otp;
        user.otpExpiresIn = otpExpiresIn; 
        await user.save();

        const mailOptions = {
            from: 'kothuruphaneendrak@gmail.com',
            to: email,
            subject: 'Your OTP for Verification',
            text: `Your OTP is: ${otp}. It is valid for 5 minutes.`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return res.status(500).json({ message: 'Error sending OTP', error });
            }
            res.status(200).json({ message: 'OTP sent successfully' });
        });

    } catch (error) {
        res.status(500).json({ message: 'Error Occured', error });
    }
};


const verifyOtp = async (req, res) => {
    const { email, otp } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        if (Date.now() > user.otpExpiresIn) {
            return res.status(400).json({ message: 'OTP has expired. Please request a new one.' });
        }


        if (otp === user.otp) {

            user.otp = null;
            user.otpExpiresIn = null;
            await user.save();

            res.status(200).json({ message: 'OTP verified successfully. Sign-in allowed.' });
        } else {
            res.status(400).json({ message: 'Invalid OTP. Please try again.' });
        }

    } catch (error) {
        res.status(500).json({ message: 'Error occured', error });
    }
};

module.exports = {
    sendOtp,
    verifyOtp
};

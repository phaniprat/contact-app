const nodemailer = require('nodemailer');
const crypto = require('crypto');

let otpStorage = {};

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'kothuruphaneendrak@gmail.com',
        pass: 'hnfw xgiv bygf bbay'
    },
});

const sendOtp = (req, res) => {
    const { email } = req.body;
    const otp = crypto.randomInt(100000, 999999).toString();
    otpStorage[email] = { otp, expiresIn: Date.now() + 300000 };

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
};

const verifyOtp = (req, res) => {
    const { email, otp } = req.body;

    if (!otpStorage[email]) {
        return res.status(400).json({ message: 'OTP not found. Please request a new one.' });
    }

    const { otp: storedOtp, expiresIn } = otpStorage[email];

    if (Date.now() > expiresIn) {
        delete otpStorage[email];
        return res.status(400).json({ message: 'OTP has expired. Please request a new one.' });
    }

    if (otp === storedOtp) {
        delete otpStorage[email];
        res.status(200).json({ message: 'OTP verified successfully. Sign-in allowed.' });
    } else {
        res.status(400).json({ message: 'Invalid OTP. Please try again.' });
    }
};

module.exports = {
    sendOtp,
    verifyOtp
};

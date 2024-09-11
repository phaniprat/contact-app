const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const key = "00a4c31bcbbbd4d1591eb964748ef30ff06d983d2d1860452e0293579086db58";

exports.signup = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const user = new User({
      email,
      password
    });
    await user.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};



exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'please signup' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'password incorrect' });
    }
    const token = jwt.sign({ userId: user._id }, key, { expiresIn: '1h' });
    res.status(200).json({ token , email });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

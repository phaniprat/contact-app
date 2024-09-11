const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const contactRoutes = require('./routes/contactRoutes');
const authRoutes = require('./routes/authRoutes')
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;


app.use(bodyParser.json());
app.use(cors());
app.use('/api/auth', authRoutes);
app.use('/api/contacts', contactRoutes);

mongoose.connect("mongodb+srv://phaneendrakumar:ztrKnM1SeymbcZ5T@cluster0.odbxg.mongodb.net/contacts?retryWrites=true&w=majority")
  .then(() => 
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    }))
  .catch(err => console.log(err));
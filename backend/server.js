const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const dns =require('dns')
dns.setServers(["1.1.1.1"])

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "*"
    
   
   
   
  })
)

//test

app.get("/", (req, res) => {
  res.send("Backend is running successfully 🚀");
});



app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/appointments', require('./routes/appointments'));
app.use('/api/admin', require('./routes/admin'));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

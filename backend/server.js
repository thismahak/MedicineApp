const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const medicineRoutes = require('./routes/medicinesRoutes');

dotenv.config();

const app = express();
app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:3000",  // allow frontend
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
app.use(express.json());

// ✅ Use Mongo URI from .env
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB Atlas'))
.catch((err) => console.error('MongoDB connection error:', err));

app.use('/api/medicines', medicineRoutes);

app.listen(5000, () => console.log('Server running on http://localhost:5000'));

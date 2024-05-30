const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');
const projectRoutes = require('./routes/projectRoutes');
const cors = require('cors');
const taskRoutes = require('./routes/taskRoutes');
const userRoutes = require('./routes/userRoutes');
const connectDB = require('./config/db');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET;

//Connect to MongoDB
connectDB();


//Middleware
app.use(express.json());
app.use(cors());

//Routes
app.use('/api/tasks', taskRoutes);
app.use('/api/users', userRoutes);
app.use('/api/projects', projectRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

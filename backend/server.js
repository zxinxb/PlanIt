import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/PlanIt';
mongoose
  .connect(MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  });

// Activity Schema and Model
const activitySchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 3 },
  description: { type: String, required: true, minlength: 10 },
  location: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  date: { type: String, required: true, validate: /^\d{4}-\d{2}-\d{2}$/ },
});

const Activity = mongoose.model('Activity', activitySchema);

// Routes
app.get('/activities', async (req, res) => {
  try {
    const { search } = req.query;
    const query = search
      ? { name: { $regex: search, $options: 'i' } }
      : {};
    const activities = await Activity.find(query);
    res.json(activities);
  } catch (err) {
    console.error('Error fetching activities:', err.message);
    res.status(500).json({ error: `Server error: ${err.message}` });
  }
});

app.post('/activities', async (req, res) => {
  try {
    const newActivity = new Activity(req.body);
    const savedActivity = await newActivity.save();
    res.status(201).json(savedActivity);
  } catch (err) {
    console.error('Error saving activity:', err.message);
    res.status(400).json({ error: 'Invalid data. Please check your input.' });
  }
});

app.get('/', (req, res) => {
  res.send('Welcome to the PlanIt API!');
});

// Catch-All Route
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));



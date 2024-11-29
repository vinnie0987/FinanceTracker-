import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import goalRoutes from './routes/goal.routes'; // Import the goal routes
import authRoutes from './routes/auth.routes'; // Import the auth routes

const app = express();

// Middleware Setup
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(bodyParser.json()); // For parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded

// API Routes
app.use('/api/v1', goalRoutes); // Mount the goal routes on /api/v1
app.use('/api/v1', authRoutes); // Mount the auth routes on /api/v1

// Health check endpoint
app.get('/api/v1/health', (req, res) => {
  res.status(200).send({
    status: 'success',
    message: 'Server is running!',
  });
});

// Server Setup
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;

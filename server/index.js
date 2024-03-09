const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

const connectDB = require('./mongodb/connect.js');
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());


const authRoutes = require('./routes/authRoute.js')
app.use('/api/v1',authRoutes)





app.get('/', async (req, res) => {
  res.status(200).json({
    message: 'Hello from Server!',
  });
});

const startServer = async () => {
  try {
    connectDB(process.env.MONGODB_URI);
    const PORT = process.env.PORT || 8000;
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};

startServer();

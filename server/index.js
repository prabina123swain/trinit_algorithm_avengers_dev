const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

const connectDB = require('./mongodb/connect.js');
const {login, Signup} = require("./controllers/Auth");
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/v1/login",login);
app.post("/api/v1/signup",Signup);

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

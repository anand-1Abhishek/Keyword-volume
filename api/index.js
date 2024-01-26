const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const searchVolumeRoutes = require('./routes/searchVolumeRoutes');
const connectDB = require('./config/db.js');


const app = express();
dotenv.config();
connectDB();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

app.use('/api', searchVolumeRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

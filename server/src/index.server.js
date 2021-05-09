const express = require('express')
const env = require("dotenv");
const mongoose = require("mongoose");
const app = express();

//routes
const authRoutes = require('./routes/auth')
const adminRoutes = require('./routes/admin/auth')


env.config()

const PORT = process.env.PORT || 8080
const MONGODB_URI = process.env.MONGODB_URI

mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    }
  )
  .then(() => {
    console.log("Database connected successfully!");
  });

app.use(express.json())
app.use('/api', authRoutes)
app.use('/api', adminRoutes)

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');  // cross origin resource sharing
const postRoutes = require('./routes/posts');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(express.json());
app.use(cors());

//Test route
app.get('/',(req,res) => {
    res.send('Hello world!')
});

// Use the postRoutes for the /posts endpoint
app.use('/posts', postRoutes);

//start server
app.listen(port,() => {
    console.log(`Server running on port ${port}`);
});

// Connect to MongoDB using the connection string from .env
mongoose.connect(process.env.MONGO_URI)
    .then((result) => {
        console.log("connected to database");
    })
    .catch((err) => {
        console.error("MongoDB connection error:", err);
    });


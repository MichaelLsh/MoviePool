import express from 'express';
import cors from 'cors';
import reviews from './api/reviews.route.js';

// used to create a web server
const app = express(); 
// middleware that Express will use
app.use(cors());
app.use(express.json());
// for the below created URL which use the route of reviews
app.use("/api/v1/reviews", reviews);
app.use("*", (req, res) => {res.status(404).json({error:"not found"})});

export default app;

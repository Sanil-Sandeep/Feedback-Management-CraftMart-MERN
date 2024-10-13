import express, { request, response } from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from 'mongoose';
import { Feedback } from './models/feedbackModel.js';
import feedbackRoute from './routes/feedbackRoute.js';
import cors from 'cors';

const app = express();

// Middleware for parsing request body
app.use(express.json());

//Middleware for handling Cors Policy
//Option 01: Allow all Origins with Default of cors (*)

//option 02:Allow custom origins
/*
app.use(
   cors({
      origin: 'http://localhost:5555',
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      allowedHeaders: ['Content-Type'],
   })
);
*/

app.get('/', (request, response) => {
    console.log(request)
    return response.status(234).send('Welcome to mern stack tutorial')
});

app.use('/feedbacks', feedbackRoute);

mongoose
   .connect(mongoDBURL)
   .then(() => {
     console.log('App connected to database');
     app.listen(PORT, () => {
        console.log(`App is listning to port: ${PORT}`)
    });
   })
   .catch((error) => {
      console.log(error);
   })
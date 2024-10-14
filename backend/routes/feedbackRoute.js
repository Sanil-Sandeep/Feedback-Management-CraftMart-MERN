import express from 'express';
import { Feedback } from '../models/feedbackModel.js';

const router = express.Router();

//Route for create a new feedback
router.post("/", async (request, response) => {
  try {
    if (!request.body.name || !request.body.email || !request.body.message) {
      return response.status(400).send({
        message: "Send all required fields: name, email, message",
      });
    }
    const newFeedback = {
      name: request.body.name,
      email: request.body.email,
      message: request.body.message,
    };

    const feedback = await Feedback.create(newFeedback);

    return response.status(201).send(feedback);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//route for get all feedback from database
router.get("/", async (request, response) => {
  try {
    const feedbacks = await Feedback.find({});

    return response.status(200).json({
      count: feedbacks.length,
      data: feedbacks,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//route for get one feedback from database by id
router.get("/:id", async (request, response) => {
  try {
    const { id } = request.params;

    const feedback = await Feedback.findById(id);

    return response.status(200).json(feedback);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//route for update feedback
router.put("/:id", async (request, response) => {
  try {
    if (!request.body.name || !request.body.email || !request.body.message) {
      return response.status(400).send({
        message: "Send all required fields: name, email, message",
      });
    }

    const { id } = request.params;

    const result = await Feedback.findByIdAndUpdate(id, request.body);

    if (!result) {
      return response.status(404).json({ message: "Feedback not found" });
    }
    return response
      .status(200)
      .send({ message: "Feedback updated succesfully" });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});



export default router;
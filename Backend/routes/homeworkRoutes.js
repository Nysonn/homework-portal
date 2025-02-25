import express from 'express';
import { getHomework } from "../controllers/homeworkController.js";

const router = express.Router();

router.get('/homework', getHomework);

export default router;
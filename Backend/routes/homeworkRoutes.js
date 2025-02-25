import express from "express";
import { getHomework, uploadHomework, deleteHomework } from "../controllers/homeworkController.js";
import upload from "../config/multer.js";

const router = express.Router();

// GET route for fetching homework
router.get("/", getHomework);

// POST route for uploading homework
router.post("/", upload.single("file"), uploadHomework);

// DELETE route for removing homework
router.delete("/:id", deleteHomework);

export default router;

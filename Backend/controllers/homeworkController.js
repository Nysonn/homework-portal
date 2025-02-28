import Homework from "../models/homework.js";
import cloudinary from "../config/cloudinary.js";
import { Readable } from "stream";

export const getHomework = async (req, res) => {
  const { class: className, subject } = req.query;

  if (!className || !subject) {
    return res.status(400).json({ error: "Both class and subject are required" });
  }

  try {
    // Query the database for homework matching the provided class and subject.
    const homeworkList = await Homework.findAll({
      where: { className, subject },
    });

    return res.status(200).json({ homework: homeworkList });
  } catch (error) {
    console.error("Error fetching homework:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

//FUNCTION TO UPLOAD PDF FILE TO THE CLOUDINARY PLATFORM
export const uploadHomework = async (req, res) => {
  try {
    const { title, description, className, subject } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: "File is required" });
    }

    if (req.file.mimetype !== "application/pdf") {
      return res.status(400).json({ error: "Only PDF files are allowed" });
    }

    // Cloudinary upload_stream requires a readable stream
    const bufferStream = new Readable();
    bufferStream.push(req.file.buffer);
    bufferStream.push(null);

    let cloudinaryResult;
    const uploadPromise = new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { resource_type: "raw", folder: "homework_pdfs" },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );
      bufferStream.pipe(stream);
    });

    cloudinaryResult = await uploadPromise;

    // Create new homework record
    const homework = await Homework.create({
      title,
      description,
      className,
      subject,
      fileUrl: cloudinaryResult.secure_url,
    });

    return res.status(201).json({ homework });
  } catch (error) {
    console.error("Error uploading homework:", error);
    return res.status(500).json({ error: error.message });
  }
};

export const deleteHomework = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the homework record by primary key.
    const homework = await Homework.findByPk(id);

    if (!homework) {
      return res.status(404).json({ error: "Homework not found" });
    }

    // Extract the public_id from the Cloudinary file URL.
    // Assuming the URL is in the format:
    // https://res.cloudinary.com/<cloud_name>/raw/upload/v<version>/homework_pdfs/<filename>.pdf
    const urlParts = homework.fileUrl.split("/");
    const fileWithExtension = urlParts.pop(); // e.g., filename.pdf
    const folderName = urlParts.pop(); // should be "homework_pdfs"
    const publicId = `${folderName}/${fileWithExtension.split(".")[0]}`;

    // Delete the file from Cloudinary.
    await cloudinary.uploader.destroy(publicId, {
      resource_type: "raw",
    });

    // Delete the record from the database.
    await homework.destroy();

    return res.status(200).json({ message: "Homework deleted successfully" });
  } catch (error) {
    console.error("Error deleting homework:", error);
    return res.status(500).json({ error: error.message });
  }
};

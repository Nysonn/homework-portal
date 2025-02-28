import multer from "multer";

// 1. Define a file filter to accept only PDF files
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "application/pdf") {
    cb(null, true);  // Accept the file
  } else {
    cb(new Error("Only PDF files are allowed!"), false); // Reject the file
  }
};

// 2. Use memory storage (no local disk writes)
const storage = multer.memoryStorage();

// 3. Initialize Multer with the specified storage and file filter
const upload = multer({
  storage,
  fileFilter,
});

export default upload;

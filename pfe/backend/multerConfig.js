import multer from 'multer';

// Define storage for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Upload files to the 'uploads' directory
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname); // Add unique suffix to filename
  }
});

// Create Multer instance with specified storage options
const upload = multer({ storage });

export default upload;

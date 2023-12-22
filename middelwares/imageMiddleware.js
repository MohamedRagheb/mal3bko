// imageMiddleware.js
const multer = require('multer')
const path = require('path')

// Set up multer for handling file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads') // Specify the directory where you want to save the uploaded images
  },
  filename: (req, file, cb) => {
    // Use the current timestamp as the filename to avoid overwriting files
    const timestamp = Date.now()
    const extension = path.extname(file.originalname)
    const filename = `${timestamp}${extension}`
    cb(null, filename)
  },
})

const upload = multer({ storage })
// Middleware function to handle image upload
const saveImageMiddleware = upload.single('image')

module.exports = saveImageMiddleware

const express = require("express");
const multer = require("multer");
const cors = require("cors");
const app = express();

app.use(cors());

app.use(express.static("uploads"));


const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      console.log(uniqueSuffix);
      console.log(file.fieldname);
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })

// Set up multer middleware to handle file uploads
const upload = multer({ storage: storage });

// Route to handle file uploads
app.post('/upload', upload.single('file'), (req, res) => {
  console.log(req.file);
  let name = req.body.name;
  let filename = req.file.fieldname
  console.log(filename + '-' + uniqueSuffix);
  console.log(name);
  res.send('File uploaded successfully');
});

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});

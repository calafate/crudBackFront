const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    const ext = file.mimetype.split("/")[1]
    const uniqueSuffix = `${file.originalname}.${ext}`;
    cb(null, uniqueSuffix);
  }
});

const upload = multer({ storage: storage });

module.exports = upload
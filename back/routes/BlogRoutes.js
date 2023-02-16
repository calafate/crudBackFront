const express = require("express");
const {check} = require("express-validator");
const router = express.Router();

const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
    cb(null, "./uploads");
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = `${file.originalname}`;
        cb(null, uniqueSuffix);
    }
});
const upload = multer({ storage, dest: 'uploads' });

const {
  getAllBlogs,
  createBlog,
  getBlogById,
  updateBlog,
  deleteBlog,
} = require("../controllers/BlogController");


router.get("/", getAllBlogs);
router.get("/:id",getBlogById);

router.post("/", upload.single("image"), createBlog);
router.put("/:id", upload.single("image"), updateBlog);

router.delete("/:id",deleteBlog);

module.exports = router;

/* [
  check('title').not().isEmpty().withMessage('Ingrese un título'),
  check('body').not().isEmpty().withMessage('Ingrese el texto de la nota'),
] */
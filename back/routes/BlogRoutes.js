const express = require("express");
const router = express.Router();
const {getAllBlogs, createBlog, getBlogById, updateBlog, deleteBlog} = require("../controllers/BlogController");
const {blogValidationRules, validarID, validate} = require("../middleware/validator");

// MULTER
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

// RUTAS
router.get("/", getAllBlogs);
router.get("/:id", getBlogById);
router.post("/", upload.single("image"), blogValidationRules(), validate, createBlog);
router.put("/:id", upload.single("image"), blogValidationRules(), validate, updateBlog);
router.delete("/:id", deleteBlog);


module.exports = router;

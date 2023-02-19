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

router.post("/", upload.single("image"), [
  check("title").not().isEmpty().withMessage("Ingrese Titulo"),
  check("summary").not().isEmpty().withMessage("Ingrese un Resumen"),
  check("body").not().isEmpty().withMessage("Ingrese texto de la Publicación"),
  check("category").not().isEmpty().withMessage("Ingrese una Categoría")
], createBlog);

router.put("/:id", upload.single("image"), [
  check("title").not().isEmpty().withMessage("Ingrese Titulo"),
  check("summary").not().isEmpty().withMessage("Ingrese un Resumen"),
  check("body").not().isEmpty().withMessage("Ingrese texto de la Publicación"),
  check("category").not().isEmpty().withMessage("Ingrese una Categoría")
], updateBlog);

router.delete("/:id",deleteBlog);

module.exports = router;

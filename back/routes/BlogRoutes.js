const express = require("express");
const {check} = require('express-validator');
const router = express.Router();
const {
  getAllBlogs,
  createBlog,
  getBlogById,
  updateBlog,
  deleteBlog,
} = require("../controllers/BlogController");


router.get("/", getAllBlogs);

router.post("/", [
  check('title').not().isEmpty().withMessage('Ingrese un título'),
  check('body').not().isEmpty().withMessage('Ingrese el texto de la nota'),
], createBlog);

router.get("/:id",getBlogById);
router.put("/:id",updateBlog);
router.delete("/:id",deleteBlog);

module.exports = router;
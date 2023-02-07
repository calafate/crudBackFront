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


router.route("/").get(getAllBlogs)

router.route("/").post([
  check('title').not().isEmpty().withMessage('Ingrese un título'),
  check('body').not().isEmpty().withMessage('Ingrese el texto de la nota'),
], createBlog);

router.route("/:id").get(getBlogById).put(updateBlog).delete(deleteBlog);

module.exports = router;
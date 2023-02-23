const Blog = require("../models/Blog");
const { validationResult } = require("express-validator");
/* const { json } = require("express"); */
const fs = require('fs');


exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({createdAt: -1});
    res.json({ data: blogs, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    res.json({ data: blog, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createBlog = async (req, res) => {
    try {
      const {title, summary, body, category, createdAt} = req.body
      const blog = new Blog({
        title,
        summary,
        body,
        category,
        image : req.file.originalname,
        createdAt
      });
      console.log(blog)
      await blog.save();
      res.json({ data: blog, status: "success" });
    } catch (err) {
      const errors = []
      errors.push({msg: "ingrese el archivo de la imagen - Error en el envio (501)"})
      res.status(501).json({ errors: errors });
    }
};

exports.updateBlog = async (req, res) => {
    const errors = []
    if (req.file) {
      try {
        const {title, summary, body, createdAt} = req.body
        const blog = await Blog.findById(req.params.id);
        console.log(`/uploads/${blog.image}`)
        try {
          fs.unlinkSync(`./uploads/${blog.image}`)
        } catch(err) {
          errors.push({msg: "Error al tratar de borrar el archivo"})
          res.json({ errors: errors });
          console.error('Error al tratar de borrar el archivo', err)
        }
        blog.title = title;
        blog.summary = summary;
        blog.body = body;
        blog.createdAt = createdAt;
        blog.image = req.file.originalname;
        await blog.save();
        res.json({ data: blog, status: "success" });
      } catch (err) {
        errors.push({msg: "Error en el envio (500)"})
        res.status(500).json({ errors: errors });
      }
    } else {
      try {
        const blog = await Blog.findByIdAndUpdate(req.params.id, req.body);
        res.json({ data: blog, status: "success" });
      } catch (err) {
        errors.push({msg: "Error en el envio (500)"})
        res.status(500).json({ errors: errors });
      }
    }
};

exports.deleteBlog = async (req, res) => {
  const errors = []
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    fs.unlinkSync(`./uploads/${blog.image}`)
    res.json({ data: blog, status: "success" });
  } catch (err) {
    errors.push({msg: "Error en el envio (500)"})
    res.status(500).json({ errors: errors });
  }
};


const Blog = require("../models/Blog");
const { validationResult } = require("express-validator");
const { json } = require("express");


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
    const err = validationResult(req);
    if (err.isEmpty()) {
      const {title, summary, body, createdAt} = req.body
      const blog = new Blog({
        title,
        summary,
        body,
        image : req.file.originalname,
        createdAt
      });
      await blog.save();
      res.json({ data: blog, status: "success" });
    } else {
      res.status(501).json({ error: err });
    }
  } catch (err) {
    res.status(501).json({ error: err.message });
  }
};

exports.updateBlog = async (req, res) => {
  try {
    const {title, summary, body, createdAt} = req.body;
    const blog = await Blog.findByIdAndUpdate(req.params.id, {title,
      summary,
      body,
      image : req.file.originalname,
      createdAt
    });
    res.json({ data: blog, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    res.json({ data: blog, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



/******* */
/* exports.updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndUpdate(req.params.id, req.body);
    res.json({ data: blog, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}; */
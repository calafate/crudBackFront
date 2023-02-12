const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const blogSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    summary: {
        type: String,
    },
    body: {
        type: String,
        required: true
    },
    category: {
        type: String,
    },
    image: {
        type: String,
    },
    email: {
        type: String,
    },
    createdAt: {
        type: Date,
        required: true
    },
});

module.exports = mongoose.model("Blog", blogSchema);
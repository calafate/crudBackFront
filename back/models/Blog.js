const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const blogSchema = new Schema({
    title: {
        type: String,
    },
    summary: {
        type: String,
    },
    body: {
        type: String,
    },
    category: {
        type: String,
    },
    image: {
        type: String,
    },
    createdAt: {
        type: Date,
        required: true
    },
});

module.exports = mongoose.model("Blog", blogSchema);
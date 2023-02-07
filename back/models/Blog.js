const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const blogSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
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
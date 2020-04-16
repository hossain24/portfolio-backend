const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VideoSchema = new Schema(
    {
        title: String,
        url: String,
    },
    {
        timestamps: true
    });

module.exports = mongoose.model("Video", VideoSchema);
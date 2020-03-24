const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema(
    {
        name: String,
        age: Number,
        email: String,
        address: String
    },
    {
        timestamps: true
    });

module.exports = mongoose.model("User", UserSchema);
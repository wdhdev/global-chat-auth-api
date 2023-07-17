const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    _id: String,
    id: Number,
    avatar_url: String,
    username: String,
    email: String,
    token: String,
    linked: String,
    lastUpdated: String
})

module.exports = mongoose.model("github-users", schema, "github-users")
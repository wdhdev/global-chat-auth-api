const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    _id: String,
    user: String,
    service: String
})

module.exports = mongoose.model("auth-tokens", schema, "auth-tokens")
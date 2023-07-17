import mongoose from "mongoose";

const schema = new mongoose.Schema({
    _id: String,
    user: String,
    service: String
})

export default mongoose.model("auth-tokens", schema, "auth-tokens")
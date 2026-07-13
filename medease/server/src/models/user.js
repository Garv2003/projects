import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
});

const user = mongoose.model('User', userSchema);

export default user;


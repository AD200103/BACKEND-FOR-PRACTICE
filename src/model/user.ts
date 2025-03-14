import mongoose from "mongoose";
const users = new mongoose.Schema({
  id: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  username: { type: String, required: true },
});
export default mongoose.model("user", users);

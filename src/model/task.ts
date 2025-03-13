import mongoose from "mongoose";
const task = new mongoose.Schema({
  id: { type: String, required: true },
  task: { type: String, required: true },
  status: { type: Boolean, required: true },
});
export default mongoose.model("task", task);

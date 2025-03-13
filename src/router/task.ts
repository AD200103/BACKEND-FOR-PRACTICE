import express from "express";
const router = express.Router();
import {
  ADD_TASK,
  DELETE_TASK,
  GET_TASKS,
  UPDATE_TASK,
} from "../controller/task.js";

router.post("/tasks", ADD_TASK);
router.delete("/tasks/:id", DELETE_TASK);
router.get("/tasks", GET_TASKS);
router.put("/tasks/:id", UPDATE_TASK);

export default router;

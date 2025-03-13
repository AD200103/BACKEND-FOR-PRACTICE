import express from "express";
const router = express.Router();
import {
  ADD_TASK,
  DELETE_TASK,
  GET_TASKS,
  UPDATE_TASK,
} from "../controller/task.js";
import auth from "../utils/authorization.js";

router.post("/tasks", auth, ADD_TASK);
router.delete("/tasks/:id", auth, DELETE_TASK);
router.get("/tasks", GET_TASKS);
router.put("/tasks/:id", auth, UPDATE_TASK);

export default router;

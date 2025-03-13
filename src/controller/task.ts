/* eslint-disable @typescript-eslint/no-unused-vars */
import TaskModel from "../model/task.js";
import { v4 as uuidv4 } from "uuid";
import { RequestHandler } from "express";
const ADD_TASK: RequestHandler = async (req, res) => {
  try {
    const task = {
      id: uuidv4(),
      task: req.body.task,
      status: false,
    };
    const newTask = new TaskModel(task);
    await newTask.save();
    const findTask = await TaskModel.find();
    if (findTask) {
      res
        .status(201)
        .json({ message: "Successfully added!", response: findTask });
      return;
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong!" });
    return;
  }
};
const DELETE_TASK: RequestHandler = async (req, res) => {
  try {
    const response = await TaskModel.findOneAndDelete({ id: req.params.id });
    const tasks = await TaskModel.find();
    if (response) {
      res
        .status(200)
        .json({ message: "Task successfully deleted!", tasks: tasks });
      return;
    }
    res.status(404).json({ message: "No such task exists!" });
    return;
  } catch (err) {
    res.status(500).json({ message: "Something went wrong!" });
    return;
  }
};
const GET_TASKS: RequestHandler = async (req, res) => {
  try {
    const tasks = await TaskModel.find();
    res.status(200).json({ tasks: tasks });
    return;
  } catch (err) {
    res.status(500).json({ message: "Something went wrong!" });
    return;
  }
};
const UPDATE_TASK: RequestHandler = async (req, res) => {
  try {
    const taskToUpdate = await TaskModel.findOneAndUpdate(
      { id: req.params.id },
      { ...req.body },
      { new: true }
    );
    if (taskToUpdate) {
      res
        .status(200)
        .json({ message: "updated successfully!", task: taskToUpdate });
      return;
    }
    res.status(404).json({ message: "No such task exists!" });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong!" });
  }
};
export { ADD_TASK, DELETE_TASK, GET_TASKS, UPDATE_TASK };

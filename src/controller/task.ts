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
      userId: req.body.userId,
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
    const taskToDel = await TaskModel.findOne({ id: req.params.id });
    if (!taskToDel) {
      res.status(404).json({ message: "No such task exists!" });
      return;
    }
    if (taskToDel?.userId !== req.body.userId) {
      res
        .status(403)
        .json({ message: "You don't have the access to this data!" });
      return;
    }
    const response = await TaskModel.findOneAndDelete({ id: req.params.id });
    const tasks = await TaskModel.find();
    if (response) {
      res
        .status(200)
        .json({ message: "Task successfully deleted!", tasks: tasks });
      return;
    }
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
    const taskToDel = await TaskModel.findOne({ id: req.params.id });
    if (!taskToDel) {
      res.status(404).json({ message: "No such task exists!" });
      return;
    }
    if (taskToDel?.userId !== req.body.userId) {
      res
        .status(403)
        .json({ message: "You don't have the access to this data!" });
      return;
    }
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
  } catch (err) {
    res.status(500).json({ message: "Something went wrong!" });
  }
};
export { ADD_TASK, DELETE_TASK, GET_TASKS, UPDATE_TASK };

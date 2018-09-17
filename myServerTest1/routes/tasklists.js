import express from 'express';
const router = express.Router();

import Tasklist from '../models/Tasklist';
// const Todolist = require('../models/Todolist');

// Import validator
import {isNumeric,isBoolean,isEmpty} from 'validator';

// Get data
router.get("/", async (req, res) => {
  const findTasks = await Tasklist.findAll({
    attributes: ["id", "todoid", "name", "isfinished"]
  });
  try {
    res.json({
      result: "ok",
      data: findTasks,
      message: "Query Task successfully!"
    });
  } catch (error) {
    res.json({
      result: "failed",
      data: {},
      message: `Query Task failed. Error: ${error}.`
    });
  }
});

//Get data by isfinished
router.post("/ifdone", async (req, res) => {
  const { isfinished } = req.body;
  const findTaskIfDone = await Tasklist.findAll({
    where: {
      isfinished
    }
  });
  try {
    res.json({
      result: "ok",
      data: findTaskIfDone,
      length: findTaskIfDone.length,
      message: "Query Task successfully!"
    });
  } catch (error) {
    res.json({
      result: "failed",
      data: {},
      message: `Query Task failed. Error: ${error}.`
    });
  }
});

// Get data by todoid
router.post("/getid", async (req, res) => {
  const { todoid } = req.body;
  const findByTodoid = await Tasklist.findAll({
    where: {
      todoid
    }
  });
  if (!isNumeric(todoid)) {
    res.json({
        result: "failed",
        data: {},
        message: `Query Task failed. todoid must be a number.`
  });
  return;
}
  try {
    res.json({
      result: "ok",
      data: findByTodoid,
      message: "Query Task successfully!"
    });
  } catch (error) {
    res.json({
      result: "failed",
      data: {},
      message: `Query Task failed. Error: ${error}.`
    });
  }
});

// Insert more Task
router.post("/addtask", async (req, res) => {
  const { todoid, name, isfinished } = req.body;
  const addTask = await Tasklist.create(
    {
      name,
      todoid,
      isfinished
    },
    {
      fields: ["todoid", "name", "isfinished"]
    }
  );
  try {
    res.json({
      result: "ok",
      data: addTask,
      message: "Add Task successfully!"
    });
  } catch (error) {
    res.json({
      result: "failed",
      data: {},
      message: `Add Task failed. Error: ${error}.`
    });
  }
});

// Update Task
router.post("/updatetask", async (req, res) => {
  const { id, todoid, name, isfinished } = req.body;
  const updateTask = await Tasklist.update(
    {
      name,
      todoid,
      isfinished
    },
    {
      where: {
        id
      }
    }
  );
  const findUpdatedTask = await Tasklist.findOne({
    where: {
      id
    }
  });
  try {
    res.json({
      result: "ok",
      data: findUpdatedTask,
      message: "Update Task successfully!"
    });
  } catch (error) {
    res.json({
      result: "failed",
      data: {},
      message: `Update Task failed. Error: ${error}.`
    });
  }
});

// Delete Task
router.delete("/deletetask", async (req, res) => {
  const { id } = req.body;
  const deleteTask = await Tasklist.destroy({
    where: {
      id
    }
  });
  try {
    res.json({
      result: "ok",
      data: deleteTask,
      message: "Delete Task successfully!"
    });
  } catch (error) {
    res.json({
      result: "failed",
      data: {},
      message: `Delete Task failed. Error: ${error}.`
    });
  }
});
module.exports = router;

// Lay thu vien express
const express = require("express");
// Khoi tao router
const router = express.Router();

// Import 2 model vao day
const Todo = require("../models/Todo");
const Task = require("../models/Task");

// Insert new task - Them task
router.post("/insert", async (req, res) => {
  // Trich xuat du lieu tu req.body (req.body.name, ...)
  let { listid, name, isfinished } = req.body;
  try {
    const newTask = await Task.create(
      {
        listid,
        name,
        isfinished
      },
      {
        // Chi lay 1 vai truong thong tin thoi
        fields: ["listid", "name", "isfinished"]
      }
    );
    if (newTask) {
      res.json({
        result: "ok",
        data: newTask,
        message: "Insert new Task successfully!"
      });
    } else {
      res.json({
        result: "failed",
        data: {},
        message: "Insert new Task failed."
      });
    }
  } catch (error) {
    res.json({
      result: "failed",
      data: {},
      message: `Insert new Task failed. Error: ${error}.`
    });
  }
});

// Sua du lieu
router.put("/:id", async (req, res) => {
  const { id } = req.params; /// const id = req.params.id
  const { listid, name, isfinished } = req.body; ///listid = req.body.listid

  try {
    /*  const oneAllTasks = await Task.findOne({
      where: {
        id
      }
    }); */
    // console.log(oneAllTasks.id);

    const allTasks = await Task.update(
      {
        listid: listid ? listid : allTasks.listid,
        name: name ? name : allTasks.name,
        isfinished: isfinished ? isfinished : allTasks.isfinished
      },
      {
        where: {
          id
        }
      }
    );
    if (allTasks) {
      res.json({
        result: "ok",
        data: { listid, name, isfinished },
        message: "Update Task successfully!"
      });
    } else {
      res.json({
        result: "failed",
        data: {},
        message: "Update Task failed."
      });
    }
  } catch (error) {
    res.json({
      result: "failed",
      data: {},
      message: `Update Task failed. Error: ${error}.`
    });
  }
});

// Delete Task
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    let numberofRowsDeleted = await Task.destroy({
      where: {
        listid: id
      }
    });
    res.json({
      result: "ok",
      message: "Delete Task successfully!",
      count: numberofRowsDeleted
    });
  } catch (error) {
    res.json({
      result: "failed",
      data: {},
      message: `Delete Task failed. Error: ${error}.`
    });
  }
});

// Get du lieu
router.get("/get", async (req, res) => {
  try {
    const allTasks = await Task.findAll({
      attributes: ["listid", "name", "isfinished"]
      // where: {
      //     listid: 2
      // }
    });
    res.json({
      result: "ok",
      data: allTasks,
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

//Get du lieu qua id
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const allTasks = await Task.findAll({
      attributes: ["listid", "name", "isfinished"],
      where: {
        id
      }
    });
    res.json({
      result: "ok",
      data: allTasks,
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

//Get du lieu qua listid
router.get("/getdata/:listid", async (req, res) => {
    const {listid} = req.params;
  try {
    const allTasks = await Task.findAll({
      attributes: ["id", "listid", "name", "isfinished"],
      where: {
        listid
      }
    });
    res.json({
      result: "ok",
      data: allTasks,
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
module.exports = router;

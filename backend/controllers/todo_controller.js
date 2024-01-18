const db = require("../models");
const { todo_tbl } = require("../models");

const addTask = async (req, res) => {
  const { todo_name } = req.body;
  try {
    await todo_tbl.create({ todo: todo_name });
    const task = await todo_tbl.findAll({
      order: [["id", "ASC"]],
    });
    return res.status(200).json(task);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const getTask = async (req, res) => {
  try {
    const task = await todo_tbl.findAll({
      order: [["id", "ASC"]],
    });
    return res.status(200).json(task);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const deleteTask = async (req, res) => {
  const { todo_id } = req.params;
  try {
    await todo_tbl.destroy({ where: { id: todo_id } });
    const task = await todo_tbl.findAll({
      order: [["id", "ASC"]],
    });

    return res.status(200).json({ data: task, message: "deleted successfuly" });
  } catch (error) {
    return res.status(500).json(error);
  }
};

const updateTask = async (req, res) => {
  const { todo_id } = req.params;
  const { todo_name } = req.body;
  try {
    await todo_tbl.update({ todo: todo_name }, { where: { id: todo_id } });
    const task = await todo_tbl.findAll({
      order: [["id", "ASC"]],
    });

    return res.status(200).json({ data: task, message: "updated successfuly" });
  } catch (error) {
    return res.status(500).json(error);
  }
};

const getTaskById = async (req, res) => {
  const { todo_id } = req.params;
  try {
    const findOne = await todo_tbl.findOne({ where: { id: todo_id } });

    return res.status(200).json(findOne);
  } catch (error) {
    return res.status(500).json(error);
  }
};

module.exports = {
  addTask,
  getTask,
  deleteTask,
  updateTask,
  getTaskById,
};

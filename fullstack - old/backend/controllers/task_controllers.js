const { task_tbl } = require("../models");
const bcrypt = require("bcrypt");

const addTask = async (req, res) => {
  const { task_name } = req.body;

  try {
    const task_exist = await task_tbl.findOne({
      where: { task_name },
    });

    if (task_exist) {
      return res.status(403).json({ message: `Task already exist!` });
    } else {
      //   const salt = await bcrypt.genSaltSync(10);
      //   const hashedPassword = await bcrypt.hashSync(password, salt);

      await task_tbl.create({
        task_name,
      });
      const task_list = await task_tbl.findAll({
        order: [["id", "ASC"]],
      });
      return res.status(201).json(task_list);
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};

const getTask = async (req, res) => {
  try {
    const getAllTask = await task_tbl.findAll({
      order: [["id", "ASC"]],
    });
    return res.status(200).json(getAllTask);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const deleteTaskById = async (req, res) => {
  const { task_id } = req.params;

  try {
    const getTaskById = await task_tbl.findOne({
      where: { id: task_id },
    });

    if (!getTaskById) {
      return res.status(404).json({ message: "Task not found" });
    } else {
      await task_tbl.destroy({
        where: { id: task_id },
      });
      const task_list = await task_tbl.findAll({
        order: [["id", "ASC"]],
      });
      return res.status(200).json(task_list);
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};

const updateTask = async (req, res) => {
  const { task_id } = req.params;
  const { task_name } = req.body;

  try {
    const getTaskById = await task_tbl.findOne({
      where: { id: task_id },
    });
    if (!getTaskById) {
      return res.status(404).json({ message: `Task not found` });
    } else {
      await task_tbl.update({ task_name }, { where: { id: task_id } });
      const updatedTask = await task_tbl.findOne({
        where: { id: task_id },
      });

      const task_list = await task_tbl.findAll({
        order: [["id", "ASC"]],
      });
      return res.status(200).json(task_list);
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};

const getTaskById = async (req, res) => {
  const { task_id } = req.params;
  try {
    const findOne = await task_tbl.findOne({
      where: { id: task_id },
    });
    if (!findOne) {
      return res.status(404).json({ message: `Task not found` });
    } else {
      return res.status(200).json({ findOne });
    }
  } catch (error) {
    return res.status(error);
  }
};

module.exports = {
  addTask,
  getTask,
  deleteTaskById,
  updateTask,
  getTaskById,
};

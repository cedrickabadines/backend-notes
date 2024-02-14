const { speedrun_tbl } = require("../models");
const bcrypt = require("bcrypt");

const addSpeedrun = async (req, res) => {
  const { username, age, password } = req.body;
  try {
    const speedrun_exist = await speedrun_tbl.findOne({
      where: { age },
    });
    if (speedrun_exist) {
      return res.status(403).json({ message: "Speedrun already exist!" });
    } else {
      const salt = await bcrypt.genSaltSync(10);
      const hashedPassword = await bcrypt.hashSync(password, salt);
      await speedrun_tbl.create({ username, age, password: hashedPassword });
      const speedrun_list = await speedrun_tbl.findAll({
        order: [["id", "ASC"]],
      });
      return res.status(201).json(speedrun_list);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
const getSpeedrun = async (req, res) => {
  try {
    const getAllSpeedrun = await speedrun_tbl.findAll({
      order: [["id", "ASC"]],
    });
    return res.status(200).json(getAllSpeedrun);
  } catch (error) {
    return res.status(500).json(error);
  }
};
const deleteSpeedrunById = async (req, res) => {
  const { speedrun_id } = req.params;
  try {
    const getSpeedrunById = await speedrun_tbl.findOne({
      where: { id: speedrun_id },
    });
    if (!getSpeedrunById) {
      return res.status(404).json({ message: "Speedrun not found" });
    } else {
      await speedrun_tbl.destroy({
        where: { id: speedrun_id },
      });
      // const student = await speedrun_tbl.findAll({
      //   order: [["id", "ASC"]],
      // });
      return res
        .status(200)
        .json({ data: getSpeedrunById, message: "Deleted successfuly" });
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};
const updateSpeedrun = async (req, res) => {
  const { speedrun_id } = req.params;
  const { username, age, password } = req.body;
  try {
    const getSpeedrunById = await speedrun_tbl.findOne({
      where: { id: speedrun_id },
    });
    if (!getSpeedrunById) {
      return res.status(404).json({ message: "Speedrun not found" });
    } else {
      await speedrun_tbl.update(
        { username, age, password },
        { where: { id: speedrun_id } }
      );
      //   const task = await speedrun_tbl.findAll({
      //     order: [["id", "ASC"]],
      //   });
      const updatedSpeedrun = await speedrun_tbl.findOne({
        where: { id: speedrun_id },
      });
      return res
        .status(200)
        .json({ data: updatedSpeedrun, message: "updated successfuly" });
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};
const getSpeedrunById = async (req, res) => {
  const { speedrun_id } = req.params;
  try {
    const findOne = await speedrun_tbl.findOne({ where: { id: speedrun_id } });
    if (!findOne) {
      return res.status(404).json({ message: "Speedrun not found" });
    } else {
      return res.status(200).json(findOne);
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};
module.exports = {
  addSpeedrun,
  getSpeedrun,
  deleteSpeedrunById,
  updateSpeedrun,
  getSpeedrunById,
};

const db = require("../models");

const { dance_tbl } = require("../models");

const addDance = async (req, res) => {
  const { first_name, middle_name, last_name, age, gender, contest } = req.body;
  try {
    await dance_tbl.create({
      first_name,
      middle_name,
      last_name,
      age,
      gender,
      contest,
    });
    const dance = await dance_tbl.findAll({
      order: [["id", "ASC"]],
    });
    return res.status(200).json(dance);
  } catch (error) {
    return res.status(500).json({ message: `Wrong`, data: error });
  }
};
const getDance = async (req, res) => {
  try {
    const dance = await dance_tbl.findAll({
      order: [["id", "ASC"]],
    });
    return res.status(200).json(dance);
  } catch (error) {
    return res.status(500).json(error);
  }
};
const deleteDance = async (req, res) => {
  const { dance_id } = req.params;
  try {
    await dance_tbl.destroy({ where: { id: dance_id } });
    const dance = await dance_tbl.findAll({
      order: [["id", "ASC"]],
    });
    return res
      .status(200)
      .json({ data: dance, message: "deleted successfuly" });
  } catch (error) {
    return res.status(500).json(error);
  }
};
const updateDance = async (req, res) => {
  const { dance_id } = req.params;
  const { first_name, middle_name, last_name, age, gender, contest } = req.body;
  try {
    await dance_tbl.update(
      { first_name, middle_name, last_name, age, gender, contest },
      { where: { id: dance_id } }
    );
    const dance = await dance_tbl.findAll({
      order: [["id", "ASC"]],
    });
    return res
      .status(200)
      .json({ data: dance, message: "updated successfuly" });
  } catch (error) {
    return res.status(500).json(error);
  }
};
const getDanceById = async (req, res) => {
  const { dance_id } = req.params;
  try {
    const findOne = await dance_tbl.findOne({ where: { id: dance_id } });
    return res.status(200).json(findOne);
  } catch (error) {
    return res.status(500).json(error);
  }
};
module.exports = {
  addDance,
  getDance,
  deleteDance,
  updateDance,
  getDanceById,
};

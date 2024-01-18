const db = require("../models");
const { try_tbl } = require("../models");

const addTry = async (req, res) => {
  const { name, age, hobby, work } = req.body;
  try {
    await try_tbl.create({ name, age, hobby, work });
    const try_list = await try_tbl.findAll({
      order: [["id", "ASC"]],
    });
    return res.status(200).json(try_list);
  } catch (error) {
    return res.status(500).json(error);
  }
};
const getTry = async (req, res) => {
  try {
    const getAllStudent = await try_tbl.findAll({
      order: [["id", "ASC"]],
    });
    return res.status(200).json(getAllStudent);
  } catch (error) {
    return res.status(500).json(error);
  }
};
const deleteTryById = async (req, res) => {
  const { student_id } = req.params;
  try {
    const getStudentById = await try_tbl.findOne({
      where: { id: student_id },
    });
    if (!getStudentById) {
      return res.status(404).json({ message: "pak u walang ganyan!!!" });
    } else {
      await try_tbl.destroy({
        where: { id: student_id },
      });
      // const student = await try_tbl.findAll({
      //   order: [["id", "ASC"]],
      // });
      return res
        .status(200)
        .json({ data: getStudentById, message: "deleted successfuly" });
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};
const updateTry = async (req, res) => {
  const { student_id } = req.params;
  const { name, age, course, year } = req.body;
  try {
    const getStudentById = await try_tbl.findOne({
      where: { id: student_id },
    });
    if (!getStudentById) {
      return res.status(404).json({ message: "pak u walang ganyan!!!" });
    } else {
      await try_tbl.update(
        { name, age, course, year },
        { where: { id: student_id } }
      );
      //   const task = await try_tbl.findAll({
      //     order: [["id", "ASC"]],
      //   });
      const updatedStudent = await try_tbl.findOne({
        where: { id: student_id },
      });
      return res
        .status(200)
        .json({ data: updatedStudent, message: "updated successfuly" });
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};
const getStudentById = async (req, res) => {
  const { student_id } = req.params;
  try {
    const findOne = await try_tbl.findOne({ where: { id: student_id } });
    if (!findOne) {
      return res.status(404).json({ message: "pak u walang ganyan!!!" });
    } else {
      return res.status(200).json(findOne);
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};
module.exports = {
  addTry,
  //   getTry,
  //   deleteTryById,
  //   updateTry,
  //   getTryById,
};

const db = require("../models");
const { student_tbl } = require("../models");

const addStudent = async (req, res) => {
  const { name, age, course, year } = req.body;
  try {
    await student_tbl.create({ name, age, course, year });
    const student_list = await student_tbl.findAll({
      order: [["id", "ASC"]],
    });
    return res.status(200).json(student_list);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const getStudent = async (req, res) => {
  try {
    const getAllStudent = await student_tbl.findAll({
      order: [["id", "ASC"]],
    });
    return res.status(200).json(getAllStudent);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const deleteStudentById = async (req, res) => {
  const { student_id } = req.params;

  try {
    const getStudentById = await student_tbl.findOne({
      where: { id: student_id },
    });

    if (!getStudentById) {
      return res.status(404).json({ message: "pak u walang ganyan!!!" });
    } else {
      await student_tbl.destroy({
        where: { id: student_id },
      });
      // const student = await student_tbl.findAll({
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

const updateStudent = async (req, res) => {
  const { student_id } = req.params;
  const { name, age, course, year } = req.body;

  try {
    const getStudentById = await student_tbl.findOne({
      where: { id: student_id },
    });

    if (!getStudentById) {
      return res.status(404).json({ message: "pak u walang ganyan!!!" });
    } else {
      await student_tbl.update(
        { name, age, course, year },
        { where: { id: student_id } }
      );
      //   const task = await student_tbl.findAll({
      //     order: [["id", "ASC"]],
      //   });
      const updatedStudent = await student_tbl.findOne({
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
    const findOne = await student_tbl.findOne({ where: { id: student_id } });
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
  addStudent,
  getStudent,
  deleteStudentById,
  updateStudent,
  getStudentById,
};

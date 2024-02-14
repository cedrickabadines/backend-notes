const { exam_tbl } = require("../models");
const bcrypt = require("bcrypt");

const addExam = async (req, res) => {
  const { exam_name, exam_code, exam_description, password } = req.body;

  try {
    const exam_exist = await exam_tbl.findOne({
      where: { exam_code },
    });

    if (exam_exist) {
      return res.status(403).json({ message: `User already exist!` });
    } else {
      const salt = await bcrypt.genSaltSync(10);
      const hashedPassword = await bcrypt.hashSync(password, salt);

      await exam_tbl.create({
        exam_name,
        exam_code,
        exam_description,
        password: hashedPassword,
      });
      const exam_list = await exam_tbl.findAll({
        order: [["id", "ASC"]],
      });
      return res.status(201).json(exam_list);
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};

const getExam = async (req, res) => {
  try {
    const getAllExam = await exam_tbl.findAll({
      order: [["id", "ASC"]],
    });
    return res.status(200).json(getAllExam);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const deleteExamById = async (req, res) => {
  const { exam_id } = req.params;

  try {
    const getExamById = await exam_tbl.findOne({
      where: { id: exam_id },
    });

    if (!getExamById) {
      return res.status(404).json({ message: "Exam not found" });
    } else {
      await exam_tbl.destroy({
        where: { id: exam_id },
      });
      const exam_list = await exam_tbl.findAll({
        order: [["id", "ASC"]],
      });
      return res.status(200).json(exam_list);
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};

const updateExam = async (req, res) => {
  const { exam_id } = req.params;
  const { exam_name, exam_code, exam_description, password } = req.body;

  try {
    const getExamById = await exam_tbl.findOne({
      where: { id: exam_id },
    });
    if (!getExamById) {
      return res.status(404).json({ message: `Exam not found` });
    } else {
      await exam_tbl.update(
        { exam_name, exam_code, exam_description, password },
        { where: { id: exam_id } }
      );
      const updatedExam = await exam_tbl.findOne({
        where: { id: exam_id },
      });

      const exam_list = await exam_tbl.findAll({
        order: [["id", "ASC"]],
      });
      return res.status(200).json(exam_list);
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};

const getExamById = async (req, res) => {
  const { exam_id } = req.params;
  try {
    const findOne = await exam_tbl.findOne({
      where: { id: exam_id },
    });
    if (!findOne) {
      return res.status(404).json({ message: `Exam not found` });
    } else {
      return res.status(200).json({ findOne });
    }
  } catch (error) {
    return res.status(error);
  }
};

module.exports = {
  addExam,
  getExam,
  deleteExamById,
  updateExam,
  getExamById,
};

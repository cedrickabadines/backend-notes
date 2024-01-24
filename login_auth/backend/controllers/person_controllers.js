const { person_tbl } = require("../models");
const bcrypt = require("bcrypt");

const addPerson = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const user_exist = await person_tbl.findOne({
      where: { email },
    });

    if (user_exist) {
      return res.status(403).json({ message: `User already exist!` });
    } else {
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(password, salt);
      await person_tbl.create({
        username,
        email,
        password: hashedPassword,
      });

      const person_list = await person_tbl.findAll({
        order: [["id", "ASC"]],
      });
      return res.status(201).json(person_list);
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};

const getPerson = async (req, res) => {
  try {
    const getAllPerson = await person_tbl.findAll({
      order: [["id", "ASC"]],
    });
    return res.status(201).json(getAllPerson);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const deletePersonById = async (req, res) => {
  const { person_id } = req.params;

  try {
    const getPersonById = await person_tbl.findOne({
      where: { id: person_id },
    });

    if (!getPersonById) {
      return res.status(404).json({ message: "Person not found!" });
    } else {
      await person_tbl.destroy({
        where: { id: person_id },
      });
      return res.status(200).json({ message: "Deleted Successfully!" });
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};

const updatePerson = async (req, res) => {
  const { person_id } = req.params;
  const { username, email, password } = req.body;

  try {
    const getPersonById = await person_tbl.findOne({
      where: { id: person_id },
    });

    if (!getPersonById) {
      return res.status(404).json({ message: "Person not found" });
    } else {
      await person_tbl.update(
        { username, email, password },
        { where: { id: person_id } }
      );

      const updatedPerson = await person_tbl.findOne({
        where: { id: person_id },
      });
      return res.status(200).json({
        data: updatePerson,
        message: "Updated Successfully",
      });
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};

const getPersonById = async (req, res) => {
  const { person_id } = req.params;

  try {
    const person = await person_tbl.findOne({
      where: { id: person_id },
    });

    if (!person) {
      return res.status(404).json({ message: "Person not found!" });
    } else {
      return res.status(200).json(person);
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};

module.exports = {
  addPerson,
  getPerson,
  deletePersonById,
  updatePerson,
  getPersonById,
};

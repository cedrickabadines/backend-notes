const { people_tbl } = require("../models");
const bcrypt = require("bcrypt");

const addPeople = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const people_exist = await people_tbl.findOne({ where: { email } });

    if (people_exist) {
      return res.status(403).json({ message: `People already exist!` });
    } else {
      const salt = await bcrypt.genSaltSync(10);
      const hashedPassword = await bcrypt.hashSync(password, salt);

      await people_tbl.create({ username, email, password: hashedPassword });

      const people_list = await people_tbl.findAll({
        order: [["id", "ASC"]],
      });
      return res.status(201).json(people_list);
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};

const getPeople = async (req, res) => {
  try {
    const getAllPeople = await people_tbl.findAll({
      order: [["id", "ASC"]],
    });
    return res.status(200).json(getAllPeople);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const deletePeopleById = async (req, res) => {
  const { people_id } = req.params;

  try {
    const getPeopleById = await people_tbl.findOne({
      where: { id: people_id },
    });

    if (!getPeopleById) {
      return res.status(404).json({ message: `People doesn't exist!` });
    } else {
      await people_tbl.destroy({
        where: { id: people_id },
      });
      return res.status(200).json({ message: `Deleted Successfully!` });
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};

const updatePeople = async (req, res) => {
  const { people_id } = req.params;
  const { username, email, password } = req.body;

  try {
    const getPeopleById = await people_tbl.findOne({
      where: { id: people_id },
    });

    if (!getPeopleById) {
      return res.status(404).json({ message: `People doesn't exist!` });
    } else {
      await people_tbl.update(
        { username, email, password },
        { where: { id: people_id } }
      );
      return res.status(200).json({ message: `Updated Successfully!` });
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};

const getPeopleById = async (req, res) => {
  const { people_id } = req.params;

  try {
    const findOne = await people_tbl.findOne({ where: { id: people_id } });

    return findOne
      ? res.status(200).json(findOne)
      : res.status(404).json({ message: `People not found` });
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  addPeople,
  getPeople,
  deletePeopleById,
  updatePeople,
  getPeopleById,
};

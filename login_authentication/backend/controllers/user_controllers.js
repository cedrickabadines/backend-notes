const { user_tbl } = require("../models");
const bcrypt = require("bcrypt");

const addUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const user_exist = await user_tbl.findOne({
      where: { email },
    });

    if (user_exist) {
      return res.status(403).json({ message: "User already exist!" });
    } else {
      const salt = await bcrypt.genSaltSync(10);

      const hashedPassword = await bcrypt.hashSync(password, salt);

      await user_tbl.create({ username, email, password: hashedPassword });
      const user_list = await user_tbl.findAll({
        order: [["id", "ASC"]],
      });
      return res.status(201).json(user_list);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const getUser = async (req, res) => {
  try {
    const getAllUser = await user_tbl.findAll({
      order: [["id", "ASC"]],
    });
    return res.status(200).json(getAllUser);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const deleteUserById = async (req, res) => {
  const { user_id } = req.params;

  try {
    const getUserById = await user_tbl.findOne({
      where: { id: user_id },
    });

    if (!getUserById) {
      return res.status(404).json({ message: "User not found" });
    } else {
      await user_tbl.destroy({
        where: { id: user_id },
      });
      return res
        .status(200)
        .json({ data: getUserById, message: "Deleted Successfully" });
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};

const updateUser = async (req, res) => {
  const { user_id } = req.params;
  const { username, email, password } = req.body;

  try {
    const getUserById = await user_tbl.findOne({
      where: { id: user_id },
    });
    if (!getUserById) {
      return res.status(404).json({ message: "User not found" });
    } else {
      await user_tbl.update(
        { username, email, password },
        { where: { id: user_id } }
      );
      const updatedUser = await user_tbl.findOne({
        where: { id: student_id },
      });
      return res
        .status(200)
        .json({ data: updatedUser, message: "Updated Successfully" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const getUserById = async (req, res) => {
  const { user_id } = req.params;

  try {
    const findOne = await user_tbl.findOne({ where: { id } });
    if (!findOne) {
      return res.status(404).json({ message: "User not found" });
    } else {
      return res.status(200).json(findOne);
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};

module.exports = {
  addUser,
  getUser,
  deleteUserById,
  updateUser,
  getUserById,
};

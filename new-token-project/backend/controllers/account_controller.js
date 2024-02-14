const { account_tbl } = require("../models");
const bcrypt = require("bcrypt");

const addAccount = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user_exist = await account_tbl.findOne({
      where: { email },
    });

    if (user_exist) {
      return res.status(403).json({ message: `User already exist!` });
    } else {
      const salt = await bcrypt.genSaltSync(10);
      const hashedPassword = await bcrypt.hashSync(password, salt);

      await account_tbl.create({ name, email, password: hashedPassword });
      const account_list = await account_tbl.findAll({
        order: [["id", "ASC"]],
      });
      return res.status(201).json(account_list);
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};

const getAccount = async (req, res) => {
  try {
    const getAllAccount = await account_tbl.findAll({
      order: [["id", "ASC"]],
    });
    return res.status(200).json(getAllAccount);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const deleteAccountById = async (req, res) => {
  const { account_id } = req.params;

  try {
    const getAccountById = await account_tbl.findOne({
      where: { id: account_id },
    });
    if (!getAccountById) {
      return res.status(404).json({ message: "Account not found" });
    } else {
      await account_tbl.destroy({
        where: { id: account_id },
      });
      return res
        .status(200)
        .json({ data: getAccountById, message: "Deleted Successfully" });
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};

const updateAccount = async (req, res) => {
  const { account_id } = req.params;
  const { name, email, password } = req.body;

  try {
    const getAccountById = await account_tbl.findOne({
      where: { id: account_id },
    });

    if (!getAccountById) {
      return res.status(404).json({ message: `Account not found` });
    } else {
      await account_tbl.update(
        { name, email, password },
        { where: { id: account_id } }
      );
      return res
        .status(200)
        .json({ data: updateAccount, message: `Update Successfully` });
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};

const getAccountById = async (req, res) => {
  const { account_id } = req.params;

  try {
    const findOne = await account_tbl.findOne({
      where: { id: account_id },
    });

    if (!findOne) {
      return res.status(404).json({ message: `Account not found` });
    } else {
      return res.status(200).json(findOne);
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};

module.exports = {
  addAccount,
  getAccount,
  deleteAccountById,
  updateAccount,
  getAccountById,
};

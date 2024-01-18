const { inventory_tbl } = require("../models");

const addInventory = async (req, res) => {
  const { product_name, price, description, expiration } = req.body;

  try {
    await inventory_tbl.create({
      product_name,
      price,
      description,
      expiration,
    });
    const inventory_list = await inventory_tbl.findAll({
      order: [["id", "ASC"]],
    });
    return res.status(201).json(inventory_list);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const getInventory = async (req, res) => {
  try {
    const getAllInventory = await inventory_tbl.findAll({
      order: [["id", "ASC"]],
    });
    return res.status(201).json(getAllInventory);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const deleteInventoryById = async (req, res) => {
  const { inventory_id } = req.params;
  try {
    const getInventoryById = await inventory_tbl.findOne({
      where: { id: inventory_id },
    });
    if (!getInventoryById) {
      return res.status(404).json({ message: "Inventory not found" });
    } else {
      await inventory_tbl.destroy({
        where: { id: inventory_id },
      });
      return res
        .status(200)
        .json({ data: getInventoryById, message: "Deleted Successfully" });
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};

const updateInventory = async (req, res) => {
  const { inventory_id } = req.params;
  const { product_name, price, description, expiration } = req.body;

  try {
    const getInventoryById = await inventory_tbl.findOne({
      where: { id: inventory_id },
    });
    if (!getInventoryById) {
      return res.status(404).json({ message: "Inventory not found" });
    }

    await inventory_tbl.update(
      { product_name, price, description, expiration },
      { where: { id: inventory_id } }
    );

    const updatedInventory = await inventory_tbl.findOne({
      where: { id: inventory_id },
    });
    return res
      .status(200)
      .json({ data: updatedInventory, message: "Updated Successfully" });
  } catch (error) {
    return res.status(500).json(error);
  }
};

const getInventoryById = async (req, res) => {
  const { inventory_id } = req.params;

  try {
    const product = await inventory_tbl.findOne({
      where: { id: inventory_id },
    });

    if (!product) {
      return res.status(404).json({ message: "Inventory not found" });
    } else {
      return res.status(200).json(product);
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};

module.exports = {
  addInventory,
  getInventory,
  deleteInventoryById,
  updateInventory,
  getInventoryById,
};

const { employee_tbl } = require("../models");

const addEmployee = async (req, res) => {
  const {
    first_name,
    last_name,
    middle_name,
    age,
    birthday,
    address,
    email,
    status,
    sss,
    pag_ibig,
    phil_health,
    tin,
    position,
    department,
    branch,
  } = req.body;
  try {
    await employee_tbl.create({
      first_name,
      last_name,
      middle_name,
      age,
      birthday,
      address,
      email,
      status,
      sss,
      pag_ibig,
      phil_health,
      tin,
      position,
      department,
      branch,
    });
    const employee_list = await employee_tbl.findAll({
      order: [["id", "ASC"]],
    });
    return res.status(201).json(employee_list);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const getEmployee = async (req, res) => {
  try {
    const getAllEmployee = await employee_tbl.findAll({
      order: [["id", "ASC"]],
    });
    return res.status(200).json(getAllEmployee);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const deleteEmployeeById = async (req, res) => {
  const { employee_id } = req.params;
  try {
    const getEmployeeById = await employee_tbl.findOne({
      where: { id: employee_id },
    });
    if (!getEmployeeById) {
      return res.status(404).json({ message: "pak u walang ganyan!!!" });
    } else {
      await employee_tbl.destroy({
        where: { id: employee_id },
      });
      // const employee = await employee_tbl.findAll({
      //   order: [["id", "ASC"]],
      // });
      return res
        .status(200)
        .json({ data: getEmployeeById, message: "deleted successfuly" });
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};

const updateEmployee = async (req, res) => {
  const { employee_id } = req.params;
  const {
    first_name,
    last_name,
    middle_name,
    age,
    birthday,
    address,
    email,
    status,
    sss,
    pag_ibig,
    phil_health,
    tin,
    position,
    department,
    branch,
  } = req.body;
  try {
    const getEmployeeById = await employee_tbl.findOne({
      where: { id: employee_id },
    });
    if (!getEmployeeById) {
      return res.status(404).json({ message: "pak u walang ganyan!!!" });
    } else {
      await employee_tbl.update(
        {
          first_name,
          last_name,
          middle_name,
          age,
          birthday,
          address,
          email,
          status,
          sss,
          pag_ibig,
          phil_health,
          tin,
          position,
          department,
          branch,
        },
        { where: { id: employee_id } }
      );
      //   const task = await employee_tbl.findAll({
      //     order: [["id", "ASC"]],
      //   });
      const updatedEmployee = await employee_tbl.findOne({
        where: { id: employee_id },
      });
      return res
        .status(200)
        .json({ data: updatedEmployee, message: "updated successfuly" });
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};

const getEmployeeById = async (req, res) => {
  const { employee_id } = req.params;
  try {
    const findOne = await employee_tbl.findOne({ where: { id: employee_id } });
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
  addEmployee,
  getEmployee,
  deleteEmployeeById,
  updateEmployee,
  getEmployeeById,
};

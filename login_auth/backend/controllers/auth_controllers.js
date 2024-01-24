const { person_tbl } = require("../models");
const bcrypt = require("bcrypt");

const userLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const person_exist = await person_tbl.findOne({
      where: { email },
    });

    if (!person_exist) {
      res.status(403).json({ message: `Person not found` });
    } else {
      const match = await bcrypt.compare(password, person_exist.password);

      if (match) {
        return res.status(200).json({ message: `Login Successfully!` });
      } else {
        return res
          .status(401)
          .json({ message: `Wrong password, please try again` });
      }
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};

module.exports = {
  userLogin,
};

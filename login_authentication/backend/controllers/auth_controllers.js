const { user_tbl } = require("../models");
const bcrypt = require("bcrypt");

const userLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user_exist = await user_tbl.findOne({
      where: { email },
    });

    if (!user_exist) {
      return res.status(403).json({ message: "User does not exist" });
    } else {
      bcrypt.compare(password, user_exist.password).then(async (match) => {
        if (!match) {
          return res.status(401).json({
            message: "Wrong password, Please try again",
          });
        } else {
          return res.status(200).json({ message: `User login succesfully` });
        }
      });
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};

module.exports = {
  userLogin,
};

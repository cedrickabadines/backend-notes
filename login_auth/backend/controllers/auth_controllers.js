const { person_tbl } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
        const token = generateToken(person_exist.id, person_exist.username);
        return res
          .status(200)
          .cookie("userToken", token, {
            expires: new Date(Date.now() + 60 * 60 * 24 * 1000 * 1),
          })
          .json({ message: `Login Successfully!`, userToken: token });
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

const logout = async (req, res) => {
  const { token } = req.body;

  try {
    if (!token) {
      return res.status(401).json({ message: `No token found` });
    }

    const decodedToken = jwt.verify(token, "test");
    const tokenData = await person_tbl.findOne({
      where: { id: decodedToken.id },
    });

    if (!tokenData) {
      return res.status(401).json({ message: `Invalid user` });
    } else {
      res.cookie("userToken", null, { expires: new Date(0) });
      return res.status(200).json({ message: `Logout Successfully!` });
      // return res.status(200).json(decodedToken);
    }
  } catch (error) {
    return res.status(500).json(error);
  }

  //   console.log(res);
  //   return res.cookie("userToken", "123", { expires: new Date(0) });
};

const getToken = async (req, res) => {
  const { token } = req.body;
  try {
    if (!token) {
      return res.status(401).json({ message: `No token found` });
    }

    const decodedToken = jwt.verify(token, "test");
    const tokenData = await person_tbl.findOne({
      where: { id: decodedToken.id },
    });

    if (!tokenData) {
      return res.status(401).json({ message: `Not found` });
    } else {
      return res.status(200).json(decodedToken);
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};

const generateToken = (id, username) => {
  return jwt.sign({ id, username }, "test", {
    expiresIn: "10m",
  });
};

module.exports = {
  userLogin,
  logout,
  getToken,
};

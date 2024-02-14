const { exam_tbl } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  const { exam_code, password } = req.body;

  try {
    const exam_exist = await exam_tbl.findOne({
      where: { exam_code },
    });

    if (!exam_exist) {
      return res.status(403).json({ message: `Exam does not exist!` });
    } else {
      const match = await bcrypt.compare(password, exam_exist.password);

      if (match) {
        const token = generateToken(exam_exist.id, exam_exist.exam_code);
        return res
          .status(200)
          .cookie("userToken", token, {
            expires: new Date(Date.now() + 60 * 60 * 24 * 1000 * 1),
          })
          .json({ message: `Login Successfully`, userToken: token });
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
    const tokenData = await exam_tbl.findOne({
      where: { id: decodedToken.id },
    });
    if (!tokenData) {
      return res.status(401).json({ message: `Invalid User` });
    } else {
      res.cookie("userToken", null, { expires: new Date(0) });
      return res.status(200).json({ message: `Logout Successfully` });
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};

const getToken = async (req, res) => {
  const { token } = req.body;

  try {
    if (!token) {
      return res.status(401).json({ message: `Token not found` });
    }
    const decodedToken = jwt.verify(token, "test");
    const tokenData = await exam_tbl.findOne({
      where: { id: decodedToken.id },
    });

    if (!tokenData) {
      return res.status(401).json({ message: `Token not found` });
    } else {
      return res.status(200).json(decodedToken);
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};

const generateToken = (id, username) => {
  return jwt.sign({ id, username }, "test", {
    expiresIn: "8h",
  });
};

module.exports = {
  login,
  logout,
  getToken,
};

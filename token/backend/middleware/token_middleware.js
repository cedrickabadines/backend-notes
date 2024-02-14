const jwt = require("jsonwebtoken");
const people = require("../models/people_models");
const token_validation = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, "test");
      req.people_exist = await people.findOne(decoded.id);
      next();
    } catch (error) {
      console.log(error);
      return res
        .status(400)
        .json({ message: "Invalid Token / Token not recognize!" });
    }
  }
  if (!token) {
    console.log("No Token Found!");
    return res.status(401).json({ message: "No Token Found!" });
  }
};
module.exports = { token_validation };

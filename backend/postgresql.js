const { Sequelize } = require("sequelize");

const connection = async () => {
  const sequelize = new Sequelize("student", "postgres", null, {
    host: "localhost",
    dialect: "postgres",
  });

  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the databasezxcz:", error);
  }
};

module.exports = { connection };

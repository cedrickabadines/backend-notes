module.exports = (sequelize, DataTypes) => {
  const person_tbl = sequelize.define("person_tbl", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return person_tbl;
};

// { "name": "SequelizeDatabaseError", "parent": { "length": 285, "name": "error", "severity": "ERROR", "code": "23502", "detail": "Failing row contains (null, user1, email@email.com, pass1, 2024-01-24 02:00:08.939+00, 2024-01-24 02:00:08.939+00).", "schema": "public", "table": "person_tbls", "column": "id",

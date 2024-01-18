module.exports = (sequelize, DataTypes) => {
  const todo_tbl = sequelize.define("todo_tbl", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    todo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return todo_tbl;
};

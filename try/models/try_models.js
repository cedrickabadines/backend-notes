module.exports = (sequelize, DataTypes) => {
  const try_tbl = sequelize.define("try_tbl", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    hobby: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    work: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return try_tbl;
};

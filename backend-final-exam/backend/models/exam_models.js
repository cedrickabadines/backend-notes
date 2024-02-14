module.exports = (sequelize, DataTypes) => {
  const exam_tbl = sequelize.define("exam_tbl", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    exam_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    exam_code: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    exam_description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return exam_tbl;
};

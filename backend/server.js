const express = require("express");
const router = express.Router();
const cors = require("cors");
const db = require("./models");
const todoRoute = require("./routes/todo_routes");
const studentRoute = require("./routes/student_routes");
const { connection } = require("./postgresql.js");

const app = express();
const port = 8080;

app.use(cors());
app.use(express.json());
app.use("/todo_api", todoRoute);
app.use("/student_api", studentRoute);

connection();
db.sequelize.sync().then(() => {
  app.listen(port, () => console.log(`HIIII ${port}`));
});

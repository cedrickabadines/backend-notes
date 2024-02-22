const express = require("express");
const router = express.Router();
const cors = require("cors");
const db = require("./models");
const taskRoute = require("./routes/task_routes");
// const authRoute = require("./routes/auth_routes");

const app = express();
const port = 8080;

app.use(cors());
app.use(express.json());

app.use("/task-api", taskRoute);
// app.use("/auth-api", authRoute);

db.sequelize.sync().then(() => {
  app.listen(port, () => console.log(`Listening to port: ${port}`));
});

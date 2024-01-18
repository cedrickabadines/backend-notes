const express = require("express");
const router = express.Router();
const cors = require("cors");
const db = require("./models");
const tryRoute = require("./routes/try_routes.js");

const app = express();
const port = 8080;

app.use(express.json());
app.use("/try_api", tryRoute);

db.sequelize.sync().then(() => {
  app.listen(port, () => console.log(`HIIII ${port}`));
});

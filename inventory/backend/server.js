const express = require("express");
const cors = require("cors");
const db = require("./models");
const dotenv = require("dotenv").config();
const inventoryRoute = require("./routes/inventory_routes.js");

const app = express();
const port = 8080;

app.use(cors());
app.use(express.json());
app.use("/inventory_api", inventoryRoute);

db.sequelize.sync().then(() => {
  app.listen(port, () => console.log(`Listening to port: ${port}`));
});

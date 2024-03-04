const express = require("express");
const router = express.Router();
const cors = require("cors");
const db = require("./models");
const danceRoute = require("./routes/dance_route");

const app = express();
const port = 8080;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/dance-api", danceRoute);

db.sequelize.sync().then(() => {
  app.listen(port, () => console.log(`Listening to port ${port}`));
});

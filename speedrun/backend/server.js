const express = require("express");
const router = express.Router();
const cors = require("cors");
const db = require("./models");
const speedrunRoute = require("./routes/speedrun_routes");

const app = express();
const port = 8080;

app.use(cors());
app.use(express.json());

app.use("/speedrun-api", speedrunRoute);

db.sequelize.sync().then(() => {
  app.listen(port, () => console.log(`Listening to port: ${port}`));
});

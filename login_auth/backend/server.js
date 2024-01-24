const express = require("express");
const router = express.Router();
const db = require("./models");
const personRoute = require("./routes/person_routes");
const loginRoute = require("./routes/login_routes");

const app = express();
const PORT = 8080;

app.use(express.json());
app.use("/person-api", personRoute);
app.use("/login-api", loginRoute);

db.sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`Listening to Port: ` + PORT));
});

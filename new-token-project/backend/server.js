const express = require("express");
const router = express.Router();
const cors = require("cors");
const db = require("./models");
const accountRoute = require("../backend/routes/account_routes");
const loginRoute = require("./routes/auth_routes");

const app = express();
const port = 8080;

app.use(cors());
app.use(express.json());
app.use("/account-api", accountRoute);
app.use("/auth-api", loginRoute);

db.sequelize.sync().then(() => {
  app.listen(port, () => console.log(`Listening to port: ${port}`));
});

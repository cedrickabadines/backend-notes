const express = require("express");
const router = express.Router();
const db = require("./models");
const userRoute = require("./routes/user_routes");
const loginRoute = require("./routes/login_routes");

const app = express();
const PORT = 6969;

app.use(express.json());
app.use("/user-api", userRoute);
app.use("/login-api", loginRoute);

db.sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`Listening to port: ${PORT}`));
});

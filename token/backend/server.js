const express = require("express");
const cors = require("cors");
const db = require("./models");
const peopleRoute = require("./routes/people_routes");
const authRoute = require("./routes/auth_routes");

const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.json());
app.use("/people-api", peopleRoute);
app.use("/login-api", authRoute);

db.sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`Listening to port: ${PORT}`));
});

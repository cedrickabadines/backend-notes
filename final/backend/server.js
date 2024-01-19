const express = require("express");
const db = require("./models");
const employeeRoute = require("./routes/employee_routes");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use("/employee-api", employeeRoute);

db.sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`Listening to port: ` + PORT));
});

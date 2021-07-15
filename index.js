const express = require("express");
const db = require("./conf");
const app = express();
const port = process.env.PORT || 4040;
const pool = require("./conf");
const morgan = require("morgan");
const cors = require("cors");
const authRouter = require("./routes/auth");
const loginRouter = require("./routes/login");
const dbName = process.env.DB_NAME;

app.use(morgan("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

pool.getConnection((err) => {
  if (err) {
    console.error(`error connecting to ${dbName}`, err);
  } else {
    console.log(`connected to ${dbName}`);
  }
});

app.use("/register", authRouter);
app.use("/login", loginRouter);

app.listen(port, (err) => {
  if (err) {
    throw new Error("Something had happened", err);
  }
  console.log(`server is listening on port ${port}`);
});

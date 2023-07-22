const express = require("express");
const connect = require("./db");
const app = express();
const port = 5000;
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept"
  );
  next();
});
connect();
app.get("/", function (req, res) {
  res.send("HELLO FROM OTHER SIDE!");
});
app.use(express.json());
app.use("/api", require("./routes/createUser"));
app.use("/api", require("./routes/displayData"));
app.listen(port);

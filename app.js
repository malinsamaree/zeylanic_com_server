const express = require("express");
require("dotenv").config();
const getUserId = require("./functions/getUserId.js");

const app = express();

const port = process.env.PORT || 5000;

app.get("/*", getUserId, (req, res, next) => {
  // home page is sent from the local server - no database call
  // customer pages are retrieve from a database
  console.log(res.locals.userId);
  res.send(res.locals.userId);
});

app.use((err, req, res, next) => {
  console.log("error");
  // sending the home page
});

app.listen(port, () => console.log(`server listening at port ${port}`));

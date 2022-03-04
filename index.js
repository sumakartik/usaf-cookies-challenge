const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();
const port = 3000;
const host = "127.0.0.1";

let name = "";

app.get("/login/:name", (req, res) => {
  const opts = {
    httpOnly: true,
    secure: false,
  };
  name = req.params.name;
  console.log(`User ${name} attempting login.`);
  res.cookie("loginCookie", { userName: name }, opts);
  res.end();
});

app.use(cookieParser());

app.get("/hello", (req, res) => {
  const cookieObj = req.cookies.loginCookie;
  res.status(200);
  res.send(`Hello ${cookieObj.userName}`);
  console.log(cookieObj.userName);
});

app.listen(port, host, () => console.log(`Server running on ${host}:${port}`));

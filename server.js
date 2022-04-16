const express = require("express");
const app = express();
const fs = require("fs");
const user = require("./models/User");
const bp = require("body-parser");
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

// import dotenv module and call its config method that relearn environement variables  file and save all their variables .
require("dotenv").config({ path: "./config/.env" });
// connect to mongodb database
const mongoose = require("mongoose");
const url = `mongodb+srv://radhia_rh:RADHIARAHMANI2022@cluster0.b8mc7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
mongoose
  .connect(url, connectionParams)
  .then(() => {
    console.log("Connected to database ");
  })
  .catch((err) => {
    console.error(`Error connecting to the database. \n${err}`);
  });
let port = process.env.PORT;
console.log(port);
const data = [
  {
    FirstName: "Radhia",
    LastName: "Rahmani",
    Email: "radhiarahmani.info@gmail.com",
    password: "RADHIARADHIA2022",
  },
  {
    FirstName: "Meriem",
    LastName: "Salhi",
    Email: "meriem.info@gmail.com",
    password: "MERIOUMA2022",
  },
  {
    FirstName: "Maha",
    LastName: "Charni",
    Email: "mahacherni@gmail.com",
    password: "MAHAMAHA2020",
  },
];

app.post("/adduser", async (req, res, next) => {
  try {
    const data = new user({
      FirstName: process.env.FirstName,
      LastName: process.env.LastName,
      Email: "amanibenkhalifa@gmail.com",
      password: "amouna123654",
    });
    await data.save();
    console.log(req.body);
    req.body = data;
    res.send(req.body);
  } catch (err) {
    res.send(err);
  }
});
// delete user by id  :delete method
app.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const u = await user.findByIdAndDelete(id);
    req.body = u;
    res.send(req.body);
  } catch (err) {
    res.send(err);
  }
});
// get all users :get method
app.get("/list", async (req, res) => {
  const users = await user.find();
  res.send(users);
});
// update user by id : put method
app.put("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updated_user = await user.findByIdAndUpdate(id, {
      Email: "salma_consulting@gmail.com",
      FirstName: "Salma",
    });
    req.body = updated_user;
    res.send(req.body);
  } catch (err) {
    res.send(err);
  }
});

app.listen(port);

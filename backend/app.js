const express = require("express");
const bodyParser = require('body-parser')
const Post = require('./models/post');
const app = express();
const chalk = require('chalk');
const mongoose = require('mongoose');

const postRoutes = require('./routes/posts')


mongoose
  .connect('mongodb+srv://msarigul:qznbHDyFlpp0YmMk@cluster0.yx04ypo.mongodb.net/node-angular?retryWrites=true&w=majority')
  .then(() => {
    console.log(chalk.green.bold('===> Connected to database successfully!'));
  })
  .catch((err) => {
    console.log(chalk.red.bold('===> Connection to database failed!'));
    console.log(chalk.red.bold(err));

  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));


app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS, PUT"
  );
  next();
});

app.use("/api/posts", postRoutes);

module.exports = app;

const express = require("express");
const bodyParser = require('body-parser')
const Post = require('./models/post');
const app = express();
const chalk = require('chalk');
const mongoose = require('mongoose');


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
    "Access-Control-Allow-Mehtods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.post("/api/posts", (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  console.log(chalk.blue('NS-Post Added Successfully!'));
  post.save();
  res.status(201).json({
    message: "Post added successfully"
  })
});


app.get("/api/posts", (req, res, next) => {
  const posts = [
    {
      id: "000001",
      title: "first server-side post",
      content: "this is coming from server",
    },
    {
      id: "000002",
      title: "second server-side post",
      content: "this is coming from server",
    },
  ];
  res.status(200).json({
    message: "Post Fetched Successfully",
    posts: posts,
  });
});

module.exports = app;

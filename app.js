const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const app = express();

app.get("/", function(req,res){
  res.sendFile(__dirname + "/signup.html");
});

app.use(express.static("public"));

app.listen(3000, function(){
  console.log("Server 3000 ready nih!")
});

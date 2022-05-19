const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const app = express();



app.use(express.static("public"));
app.use(bodyParser.urlencoded({ encoded : true }));

app.get("/", function(req,res){
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req,res){
  console.log(req.body.firstName);

  res.send("submitted");
});

app.listen(3000, function(){
  console.log("Server 3000 ready nih!")
});

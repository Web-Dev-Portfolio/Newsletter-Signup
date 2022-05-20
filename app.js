const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const app = express();
const https = require("https");



app.use(express.static("public"));
app.use(bodyParser.urlencoded({ encoded : true }));

app.get("/", function(req,res){
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req,res){

  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  console.log(firstName,lastName,email);

  const url = "https://us8.api.mailchimp.com/3.0/lists/e00fc1594e";
  const options = {
    method : "POST",
    auth : "fitransyah:5feed6297af57a8f01cb92d5bc1de4ec-us8"
  };
  const request = https.request(url, options,function(response){
    response.on("data", function(data){
      console.log(JSON.parse(data));
    });
  });
  request.end();
  //res.send("submitted");
});

app.listen(3000, function(){
  console.log("Server 3000 ready nih!")
});

// endpoint : https://usX.api.mailchimp.com/3.0/lists/{list_id}

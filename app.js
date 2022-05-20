const express = require("express")
const bodyParser = require("body-parser")
const request = require("request")
const app = express()
const https = require("https")



app.use(express.static("public"));
app.use(bodyParser.urlencoded({ encoded : true }))

app.get("/", function(req,res){
  res.sendFile(__dirname + "/signup.html")
})

app.post("/", function(req,res){

  const firstName = req.body.firstName
  const lastName = req.body.lastName
  const email = req.body.email
  console.log(firstName,lastName,email)
  const members = {
    members : [
      {
        email_address : email,
        status : "subscribed",
        merge_fields : {
          FNAME : firstName,
          LNAME : lastName,
          EMAIL : email
        }
    }
  ]
  }
  const jsonData = JSON.stringify(members);

  const url = "https://us8.api.mailchimp.com/3.0/lists/e00fc1594e"
  const options = {
    method : "POST",
    auth : "fitransyah:efc83346ceb2ba3410d2593c9198c8ea-us8"
  }
  const request = https.request(url, options,function(response){
    response.on("data", function(data){
      var dataJson = JSON.parse(data)
      console.log(dataJson)

      if (dataJson.error_count > 0 || response.statusCode != 200)
      {
        res.sendFile(__dirname + "/failure.html")
      }
      else if (dataJson.error_count === 0 && response.statusCode === 200){
        res.sendFile(__dirname + "/success.html")
      }

      console.log("POST response : " +res.statusCode)
      console.log("HTTPS response : "+response.statusCode)

    })
  })
  request.write(jsonData)
  request.end()
  //res.send("submitted");
})

app.listen(3000, function(){
  console.log("Server 3000 ready nih!")
})

// endpoint : https://usX.api.mailchimp.com/3.0/lists/{list_id}
// useyourAPIhere

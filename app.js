const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const { response } = require("express");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname +"/signup.html");
});

app.post("/", function(req, res){
    const fname = req.body.fname;
    const lname = req.body.lname;
    const email = req.body.email;
    
    const data = {
        members:[
            {
                email_address: email,
                status: "subscribed",
                marge_fields: {
                    FNAME: fname,
                    LNAME: lname
                }
            }
        ]
    };
    const jsonData = JSON.stringify(data);

    const url = "https://us1.api.mailchimp.com/3.0/lists/797fca7801"

    const options = {
        method: "POST",
        auth:"akash:01de96897aba2156e2b1bdbcdf5f5f8d-us1"
    }

    const request = https.request(url,options, function(response){
        if(response.statusCode == 200){
            res.send("Successfully subsribed!");
        }else{
            res.send("There was an error with signing up,please try again!");
        }
        
        response.on("data", function(data){
            console.log(JSON.parse(data));
        })
    });

    request.write(jsonData);
    request.end();
});

app.listen(3000, function(){
    console.log("server is runing on port 300....");
});

//api id
//01de96897aba2156e2b1bdbcdf5f5f8d-us1

//app id
//797fca7801
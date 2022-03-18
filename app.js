const express = require("express");

const https = require("https");

const bodyParser = require("body-parser");

const app = express();

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended: true}));


  app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");
    });

    app.post("/", function(req, res){

      const query = req.body.cityName
      var firstCharacter = query.slice(0,1).toUpperCase();
      var restCharacters = query.slice(1,query.length);
      var capitalizedQuery = firstCharacter + restCharacters;

      const apiKey = "b1f9c5086c26f8cdeba9cd514aa5b79f"
      const unit = "metric"
      const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;


        // const url = "https://api.openweathermap.org/data/2.5/weather?q=London&appid=b1f9c5086c26f8cdeba9cd514aa5b79f&units=metric"

      https.get(url, function(response){
        console.log(response.statusCode);

        response.on("data", function(data){
           const weatherData = JSON.parse(data)
           const temp = weatherData.main.temp
           const icon = weatherData.weather[0].icon
           const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
           res.write("<h1><center>Temperature in "+ capitalizedQuery +" is " + temp + " C</center><h1>");
           res.write("<center><img src="+ imageURL +"></center>");
           res.write("<h2><center>try again with diferent name.<center></h2>");
           res.send();
    });
  });
});


app.listen(3000  || process.env.Port, function(){
  console.log("Server running on port 3000.");
});

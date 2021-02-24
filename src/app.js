const express = require("express");
const app = express();
const path = require("path");
const https = require("https");

app.set("views", path.join(__dirname, "templates"));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));

// https://api.oceandrivers.com:443/v1.0/getAemetStation/aeropuertopalma/lastdata/
// TODO: get request for weather ^

function getWeather() {
  let weather_url =
    "https://api.oceandrivers.com:443/v1.0/getAemetStation/aeropuertopalma/lastdata/";
  https
    .get(weather_url, (response) => {
      let weather = "";

      // called when a data chunk is received.
      response.on("data", (chunk) => {
        weather += chunk;
      });

      // called when the complete response is received.
      response.on("end", () => {
        console.log(`Weather data fetched from: ${weather_url}`);
      });
    })
    .on("error", (error) => {
      console.log("Error: " + error.message);
    });
}

let powerInfo = {
  batteries: "good",
  breakers: "good",
  voltage: "26.7v",
};

let waterInfo = {
  water_level: "good",
  water_quality: "good",
};

let internetInfo = {
  isp: "Comcast",
  speed: "1000 mbps",
  internet_health: "good",
};

app.get("/", (req, res) => {
  let weather = getWeather();

  const viewData = {
    weather,
    powerInfo,
    waterInfo,
    internetInfo,
  };

  res.render("index", viewData);
});

module.exports = app;

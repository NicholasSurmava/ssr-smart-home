const express = require("express");
const app = express();
const path = require("path");
const fetch = require("node-fetch");

app.set("views", path.join(__dirname, "templates"));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));

// https://api.oceandrivers.com:443/v1.0/getAemetStation/aeropuertopalma/lastdata/
// TODO: get request for weather ^
getWeather = async () => {
  try {
    const response = await fetch(
      "https://api.oceandrivers.com:443/v1.0/getAemetStation/aeropuertopalma/lastdata/"
    );
    const weather = await response.json();
    return weather;
  } catch (err) {
    // handle error
    console.error(err);
  }
};

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
  const viewData = {
    powerInfo,
    waterInfo,
    internetInfo,
  };

  (async () => {
    const weatherInfo = await getWeather();
    viewData["weatherInfo"] = weatherInfo;
    res.render("index", viewData);
  })();
});

module.exports = app;

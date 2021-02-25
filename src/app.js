const express = require("express");
const app = express();
const path = require("path");
const fetch = require("node-fetch");

app.set("views", path.join(__dirname, "templates"));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));

getWeather = async () => {
  try {
    const response = await fetch(
      "https://api.oceandrivers.com:443/v1.0/getEasyWind/EW013/?period=latestdata"
    );
    const weather = await response.json();

    console.log("Getting Weather Info");

    return weather;
  } catch (err) {
    // handle error
    console.error(err);
  }
};

getPower = async () => {
  try {
    let powerInfo = {
      batteries: "good",
      breakers: "good",
      voltage: "26.7v",
    };

    console.log("Getting Power Info");

    return powerInfo;
  } catch (err) {
    console.error(err);
  }
};

getWater = async () => {
  try {
    let waterInfo = {
      water_level: "good",
      water_quality: "good",
    };

    console.log("Getting Water Info");

    return waterInfo;
  } catch (err) {
    console.error(err);
  }
};

getInternet = async () => {
  try {
    let internetInfo = {
      isp: "Comcast",
      speed: "1000 mbps",
      internet_health: "good",
    };

    console.log("Getting Internet Info");

    return internetInfo;
  } catch (err) {
    console.error(err);
  }
};

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

app.get("/", (req, res) => {
  const viewData = {};

  (async () => {
    console.time("Execution Time");
    await delay(2000);
    const powerInfo = await getPower();
    await delay(3000);
    const waterInfo = await getWater();
    await delay(5000);
    const internetInfo = await getInternet();
    await delay(10000);
    const weatherInfo = await getWeather();

    console.timeEnd("Execution Time");

    viewData["weatherInfo"] = weatherInfo;
    viewData["powerInfo"] = powerInfo;
    viewData["waterInfo"] = waterInfo;
    viewData["internetInfo"] = internetInfo;

    res.render("index", viewData);
  })();
});

module.exports = app;

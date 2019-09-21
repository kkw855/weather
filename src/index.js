import ReactDOM from "react-dom";
import React from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CssBaseline } from "@material-ui/core";

function App() {
  return (
    <div style={{height: "100vh", width: "100vw"}}>
      <CssBaseline />
    </div>
  );
}

function myAsyncFunction() {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "http://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=d2a0e255ccae1c99c859101c3ed1b5bf", true);
    xhr.onload = () => resolve(xhr.responseText);
    xhr.onerror = () => reject(xhr.statusText);
    xhr.send();
  });
}

async function requestWeather() {
  try {
    const response = await myAsyncFunction();
    console.log(response);
  } catch(err) {
    console.log(err);
  }
}

// requestWeather();
console.log("End");

ReactDOM.render(<App />, window.document.querySelector("#react-root"));

navigator.geolocation.getCurrentPosition(function(position) {
  console.log("getCurrentPosition", position.coords.latitude, position.coords.longitude);
});
const watchID = navigator.geolocation.watchPosition(function(position) {
  console.log("watchPosition", position.coords.latitude, position.coords.longitude);
});
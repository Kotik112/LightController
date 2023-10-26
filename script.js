/*
 * Element selection
 */

// Buttons for inner circle
const toggleButton = document.querySelector(".toggle-switch");
const octoberFestButton = document.getElementById("october-fest");
const stPatricksDayButton = document.getElementById("st-patricks-day");
const rainboowButton = document.getElementById("rainbow");
const christmasButton = document.getElementById("christmas");

// Buttons for outer circle
const orangeButton = document.getElementById("orange-circle");
const greenButton = document.getElementById("green-circle");
const lightBlueButton = document.getElementById("light-blue-circle");
const darkBlueButton = document.getElementById("dark-blue-circle");
const purpleButton = document.getElementById("purple-circle");
const pinkButton = document.getElementById("pink-circle");
const redButton = document.getElementById("red-circle");
const yellowButton = document.getElementById("yellow-circle");

// Slider
const slider = document.getElementById("toggle-switch");

/*
 *       Global variables
 */
const wsUrl = `ws://172.16.17.14:9999/qlcplusWS`;
let ws;
let isConnected = false;
// Keeps track of the stPatricksDay state
let stPatricksDayInterval = null;
let christmasInterval = null;
// Keeps track of the color index for stPatricksDay & octoberFest
let colorIndex = 0;

// When the DOM/Page is loaded, connect to the websocket
/* document.addEventListener("DOMContentLoaded", () => {
  connectToWebsocket();
}); */

/* slider.addEventListener("change", () => {
  if (slider.checked) {
    turnOn(1, 31);
  } else {
    turnOff(1, 31);
  }
}); */

function stPatricksDay() {
  let index = 0;
  const orange = [255, 95, 0]; // Orange
  const green = [0, 255, 0]; // Green

  return setInterval(() => sendColorAlternation(orange, green), 1000);
}

// Helper function. Used with setInterval() to switch colors between two fixtures
function sendColorAlternation(color1, color2) {
  const colors = [color1, color2];
  let r, g, b;
  // Lampa 1
  [r, g, b] = colors[colorIndex];
  ws.send(`CH|1|${r}`);
  ws.send(`CH|2|${g}`);
  ws.send(`CH|3|${b}`);

  let secondIndex = colorIndex === 1 ? 0 : 1;

  // Lampa 2
  [r, g, b] = colors[secondIndex];
  ws.send(`CH|4|${r}`);
  ws.send(`CH|5|${g}`);
  ws.send(`CH|6|${b}`);

  colorIndex++;
  if (colorIndex >= 2) {
    colorIndex = 0;
  }
}

function turnOn(start, end) {
  if (start <= 0 || end > 512 || start > end) {
    alert("Invalid range!");
    return;
  }
  for (start; start < end; start++) {
    sendMessage(`CH|${start}|255`);
  }
}

function turnOff(start, end) {
  if (start <= 0 || end > 512 || start > end) {
    alert("Invalid range!");
    return;
  }
  for (start; start < end; start++) {
    sendMessage(`CH|${start}|0`);
  }
}

function sendMessage(message) {
  if (isConnected) {
    ws.send(message);
  } else {
    alert("Not connected to websocket!");
    connectToWebsocket();
  }
}

const connectToWebsocket = () => {
  ws = new WebSocket(wsUrl);

  ws.onopen = () => {
    isConnected = true;
    console.log("Connected to websocket");
  };

  ws.onclose = () => {
    isConnected = false;
    console.log("Disconnected from websocket");
  };

  ws.onerror = (error) => {
    console.log(`Error: ${error}`);
  };

  ws.onmessage = (event) => {
    const message = event.data;
    console.log(`Message: ${message}`);
    // Logic for handling messages
  };
};

/* Exempel */
const octoberFestButtonExample = document.getElementById("rainbow");

octoberFestButtonExample.addEventListener("click", () => {
  console.log("Octoberfest button clicked");
  ws.send("QLC+API|setFunctionStatus|1|1");
});

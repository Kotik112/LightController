/*
 * Element selection
 */

// Buttons for inner circle
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

let isOctoberFestOn = false;
octoberFestButton.addEventLitener("click", () => {
  // if (isOctoberFestOn is false, play octoberfest
  if (!isOctoberFestOn) {
    playFunction(10);
    // set boolean to true so that next time the button is clicked, it will turn off the function
    isOctoberFestOn = true;
  } else {
    stopFunction(10);
    isOctoberFestOn = false;
  }
});

let isStPatricksDayOn = false;
stPatricksDayButton.addEventListener("click", () => {});

let isRainbowOn = false;
rainbowButton.addEventListener("click", () => {
  if (!isRainbowOn) {
    playFunction(12);
    isRainbowOn = true;
  } else {
    playFunction(12);
    isRainbowOn = false;
  }
});

let isChristmasOn = false;
christmasButton.addEventListener("click", () => {
  if (!isChristmasOn) {
    playFunction(11);
    isChristmasOn = true;
  } else {
    playFunction(11);
    isChristmasOn = false;
  }
});

let isOrangeOn = false;
orangeButton.addEventListener("click", () => {
  if (!isOrangeOn) {
    // Orange button ÓN logic here
    console.log("Orange button ON");
    isOrangeOn = true;
  } else {
    // Orange button OFF logic here
    console.log("Orange button OFF");
    isOrangeOn = false;
  }
});

let isGreenOn = false;
greenButton.addEventListener("click", () => {
  if (!isGreenOn) {
    // Green button ÓN logic here
    console.log("Green button ON");
    isGreenOn = true;
  } else {
    // Green button OFF logic here
    console.log("Green button OFF");
    isGreenOn = false;
  }
});

let isLightBlueOn = false;
lightBlueButton.addEventListener("click", () => {
  if (!isLightBlueOn) {
    // Light blue button ÓN logic here
    console.log("Light blue button ON");
    isLightBlueOn = true;
  } else {
    // Light blue button OFF logic here
    console.log("Light blue button OFF");
    isLightBlueOn = false;
  }
});

let isDarkBlueOn = false;
darkBlueButton.addEventListener("click", () => {
  if (!isDarkBlueOn) {
    // Dark blue button ÓN logic here
    console.log("Dark blue button ON");
    isDarkBlueOn = true;
  } else {
    // Dark blue button OFF logic here
    console.log("Dark blue button OFF");
    isDarkBlueOn = false;
  }
});

let isPurpleOn = false;
purpleButton.addEventListener("click", () => {
  if (!isPurpleOn) {
    // Purple button ÓN logic here
    console.log("Purple button ON");
    isPurpleOn = true;
  } else {
    // Purple button OFF logic here
    console.log("Purple button OFF");
    isPurpleOn = false;
  }
});

let isPinkOn = false;
pinkButton.addEventListener("click", () => {
  if (!isPinkOn) {
    // Pink button ÓN logic here
    console.log("Pink button ON");
    isPinkOn = true;
  } else {
    // Pink button OFF logic here
    console.log("Pink button OFF");
    isPinkOn = false;
  }
});

let isRedOn = false;
redButton.addEventListener("click", () => {
  if (!isRedOn) {
    // Red button ÓN logic here
    console.log("Red button ON");
    isRedOn = true;
  } else {
    // Red button OFF logic here
    console.log("Red button OFF");
    isRedOn = false;
  }
});

let isYellowOn = false;
yellowButton.addEventListener("click", () => {
  if (!isYellowOn) {
    // Yellow button ÓN logic here
    console.log("Yellow button ON");
    isYellowOn = true;
  } else {
    // Yellow button OFF logic here
    console.log("Yellow button OFF");
    isYellowOn = false;
  }
});

function stPatricksDay() {
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

function playFunction(functionNumber) {
  ws.send(`QLC+API|setFunctionStatus|${functionNumber}|1`);
}

function stopFunction(functionNumber) {
  ws.send(`QLC+API|setFunctionStatus|${functionNumber}|0`);
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

let isOctoberFeztOn = false;
octoberFestButtonExample.addEventListener("click", () => {
  console.log("Octoberfest button clicked");
  // if (isOctoberFestOn is false, play octoberfest
  if (!isOctoberFeztOn) {
    playFunction(10);
    // set boolean to true so that next time the button is clicked, it will turn off the function
    isOctoberFeztOn = true;
  } else {
    stopFunction(10);
    isOctoberFeztOn = false;
  }
});

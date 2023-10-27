/*
 * Element selection
 */

// Buttons for inner circle
const octoberFestButton = document.getElementById("october-fest");
const stPatricksDayButton = document.getElementById("st-patricks-day");
const rainbowButton = document.getElementById("rainbow");
const christmasButton = document.getElementById("christmas");
const halloweenButton = document.getElementById("christmas");

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

let masterSwitch = true;

if (!masterSwitch){
  let isOctoberFestOn = false;
  let isStPatricksDayOn = false;
  let isChristmasOn = false;
  let isHalloweenOn = false;
  let isRainbowOn = false;
  let isGreenOn = false;
  let isLightBlueOn = false;
  let isDarkBlueOn = false;
  let isOrangeOn = false;
  let isYellowOn = false;
  let isPurpleOn = false;
  let isPinkOn = false;
  let isRedOn = false;
}

/*
 *       Global variables
 */
const wsUrl = `ws://127.0.0.1:9999/qlcplusWS`;
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
octoberFestButton.addEventListener("click", () => {
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
stPatricksDayButton.addEventListener("click", () => {
    if (!isStPatricksDayOn) {
      console.log("hej");
      playFunction(12);
      isStPatricksDayOn = true;
    } else {
      stopFunction(12);
      isStPatricksDayOn = false;
    }
});

let isHalloweenOn = false;
halloweenButton.addEventListener("click", () => {
    if (!isHalloweenOn) {
      console.log("hej");
      playFunction(12);
      isHalloweenOn = true;
    } else {
      stopFunction(12);
      isHalloweenOn = false;
    }
});

let isRainbowOn = false;
rainbowButton.addEventListener("click", () => {
  if (!isRainbowOn) {
    console.log("hej");
    playFunction(12);
    isRainbowOn = true;
  } else {
    stopFunction(12);
    isRainbowOn = false;
  }
});

let isChristmasOn = false;
christmasButton.addEventListener("click", () => {
  if (!isChristmasOn) {
    playFunction(11);
    isChristmasOn = true;
  } else {
    stopFunction(11);
    isChristmasOn = false;
  }
});

let isOrangeOn = false;
orangeButton.addEventListener("click", () => {
  if (!isOrangeOn) {
    playFunction(72);
    // Orange button ÓN logic here
    console.log("Orange button ON");
    isOrangeOn = true;
  } else {
    stopFunction(72);
    // Orange button OFF logic here
    console.log("Orange button OFF");
    isOrangeOn = false;
  }
});

let isGreenOn = false;
greenButton.addEventListener("click", () => {
  if (!isGreenOn) {
    playFunction(75);
    // Green button ÓN logic here
    console.log("Green button ON");
    isGreenOn = true;
  } else {
    stopFunction(75);
    // Green button OFF logic here
    console.log("Green button OFF");
    isGreenOn = false;
  }
});

let isLightBlueOn = false;
lightBlueButton.addEventListener("click", () => {
  if (!isLightBlueOn) {
    console.log("Light blue button ON");
    playFunction(76);
    // Light blue button ÓN logic here
    
    isLightBlueOn = true;
  } else {
    stopFunction(76);
    // Light blue button OFF logic here
    console.log("Light blue button OFF");
    isLightBlueOn = false;
  }
});

let isDarkBlueOn = false;
darkBlueButton.addEventListener("click", () => {
  if (!isDarkBlueOn) {
    playFunction(77);
    // Dark blue button ÓN logic here
    console.log("Dark blue button ON");
    isDarkBlueOn = true;
  } else {
    stopFunction(77);
    // Dark blue button OFF logic here
    console.log("Dark blue button OFF");
    isDarkBlueOn = false;
  }
});

let isPurpleOn = false;
purpleButton.addEventListener("click", () => {
  if (!isPurpleOn) {
    playFunction(79);
    // Purple button ÓN logic here
    console.log("Purple button ON");
    isPurpleOn = true;
  } else {
    stopFunction(79);
    // Purple button OFF logic here
    console.log("Purple button OFF");
    isPurpleOn = false;
  }
});

let isPinkOn = false;
pinkButton.addEventListener("click", () => {
  if (!isPinkOn) {
    playFunction(78);
    // Pink button ÓN logic here
    console.log("Pink button ON");
    isPinkOn = true;
  } else {
    stopFunction(78);
    // Pink button OFF logic here
    console.log("Pink button OFF");
    isPinkOn = false;
  }
});

let isRedOn = false;
redButton.addEventListener("click", () => {
  if (!isRedOn) {
    playFunction(71);
    // Red button ÓN logic here
    console.log("Red button ON");
    isRedOn = true;
  } else {
    stopFunction(71);
    // Red button OFF logic here
    console.log("Red button OFF");
    isRedOn = false;
  }
});

let isYellowOn = false;
yellowButton.addEventListener("click", () => {
  if (!isYellowOn) {
    playFunction(73);
    // Yellow button ÓN logic here
    console.log("Yellow button ON");
    isYellowOn = true;
  } else {
    stopFunction(73);
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


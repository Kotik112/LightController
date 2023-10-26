/*
 * Element selection
 */
const toggleButton = document.querySelector(".toggle-switch");

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

// When the DOM is loaded, connect to the websocket
document.addEventListener("DOMContentLoaded", () => {
  connectToWebsocket();
});

toggleButton.addEventListener("change", () => {
  if (toggleButton.checked) {
    turnOn(1, 31);
  } else {
    turnOff(1, 31);
  }
});

/* function stPatricksDay() {
  let index = 0;
  const orange = [255, 95, 0]; // Orange
  const green = [0, 255, 0]; // Green

  return setInterval(() => sendColorAlternation(orange, green), 1000);
} */

function sendColorAlternation(color1, color2) {
  let r, g, b;
  // Lampa 1
  [r, g, b] = color1;
  ws.send(`CH|1|${r}`);
  ws.send(`CH|2|${g}`);
  ws.send(`CH|3|${b}`);

  let secondIndex = index === 1 ? 0 : 1;

  // Lampa 2
  [r, g, b] = color2;
  ws.send(`CH|4|${r}`);
  ws.send(`CH|5|${g}`);
  ws.send(`CH|6|${b}`);

  index++;
  if (index >= 2) {
    index = 0;
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

// Select all the anchor tags with the "button-button" class
const buttonButtons = document.querySelectorAll(".button-circle");

// Add a click event listener to each anchor tag
buttonButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    console.log("click");
    event.preventDefault(); // Prevent the default link behavior
    // Handle the click action for each button
    // You can perform actions like sending data to your WebSocket server here
    // For example, you can identify the button clicked and send a corresponding command.
  });
});

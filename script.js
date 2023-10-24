// Toggle power button
const powerOnButton = document.getElementById("powerOn");
const powerOffButton = document.getElementById("powerOff");
const colorPicker = document.getElementById("colorPicker");
const stPatriksDayButton = document.getElementById("st-patricks-btn");

const christmasButton = document.getElementById("christmas-btn");
const pageBody = document.getElementById("page-body");

const Checkbox1 = document.getElementById("Checkbox1");
const colorPicker1 = document.getElementById("colorPicker1");
const Checkbox2 = document.getElementById("Checkbox2");
const colorPicker2 = document.getElementById("colorPicker2");
const Checkbox3 = document.getElementById("Checkbox3");
const colorPicker3 = document.getElementById("colorPicker3");
const Checkbox4 = document.getElementById("Checkbox4");
const colorPicker4 = document.getElementById("colorPicker4");
const Checkbox5 = document.getElementById("Checkbox5");
const colorPicker5 = document.getElementById("colorPicker5");
const Checkbox6 = document.getElementById("Checkbox6");
const colorPicker6 = document.getElementById("colorPicker6");

colorPicker.addEventListener("change", () => {
  const color = colorPicker.value;
  console.log("Color changed");

  // Update Color Picker 1 if its checkbox is checked
  if (Checkbox1.checked) {
    colorPicker1.value = color;
  }
  if (Checkbox2.checked) {
    colorPicker2.value = color;
  }
  if (Checkbox3.checked) {
    colorPicker3.value = color;
  }
  if (Checkbox4.checked) {
    colorPicker4.value = color;
  }
  if (Checkbox5.checked) {
    colorPicker5.value = color;
  }
  if (Checkbox6.checked) {
    colorPicker6.value = color;
  }
});

/*
 *       Global variables
 */
const wsUrl = `ws://172.16.17.14:9999/qlcplusWS`;
let ws;
let isConnected = false;

// Keeps track of the stPatricksDay state
let stPatricksDayInterval = null;

/**
 *      Event Listener Declarations
 */

document.addEventListener("DOMContentLoaded", () => {
  connectToWebsocket();
});

powerOnButton.addEventListener("click", (event) => {
  if (isConnected) {
    // Swap background colors
    powerOnButton.style.backgroundColor = "#f44336";
    powerOffButton.style.backgroundColor = "#d4d4d4";
    pageBody.style.backgroundColor = "black";

    document
      .querySelectorAll(".color-picker-container label")
      .forEach((label) => {
        label.style.color = "white";
      });
    turnOn(1, 7);
  } else {
    console.log("Not connected to websocket");
  }
});

powerOffButton.addEventListener("click", () => {
  if (isConnected) {
    // Swap background colors
    powerOffButton.style.backgroundColor = "#f44336";
    powerOnButton.style.backgroundColor = "#d4d4d4";
    pageBody.style.backgroundColor = "white";

    document
      .querySelectorAll(".color-picker-container label")
      .forEach((label) => {
        label.style.color = "black";
      });
    turnOff(1, 7);
  } else {
    console.log("Not connected to websocket");
  }
});

Checkbox1.addEventListener("change", () => {
  // Enable/disable Color Picker 1 based on the checkbox state
  colorPicker1.disabled = !Checkbox1.checked;

  // Update Color Picker 1 if it's being enabled
  if (Checkbox1.checked) {
    colorPicker1.value = colorPicker.value;
    const color = colorPicker1.value;
  }
});

Checkbox2.addEventListener("change", () => {
  // Enable/disable Color Picker 2 based on the checkbox state
  colorPicker2.disabled = !Checkbox2.checked;

  // Update Color Picker 2 if it's being enabled
  if (Checkbox2.checked) {
    colorPicker2.value = colorPicker.value;
  }
});

Checkbox3.addEventListener("change", () => {
  // Enable/disable Color Picker 2 based on the checkbox state
  colorPicker3.disabled = !Checkbox3.checked;

  // Update Color Picker 2 if it's being enabled
  if (Checkbox3.checked) {
    colorPicker3.value = colorPicker.value;
  }
});

Checkbox4.addEventListener("change", () => {
  // Enable/disable Color Picker 2 based on the checkbox state
  colorPicker4.disabled = !Checkbox4.checked;

  // Update Color Picker 2 if it's being enabled
  if (Checkbox4.checked) {
    colorPicker4.value = colorPicker.value;
  }
});

Checkbox5.addEventListener("change", () => {
  // Enable/disable Color Picker 2 based on the checkbox state
  colorPicker5.disabled = !Checkbox5.checked;

  // Update Color Picker 2 if it's being enabled
  if (Checkbox5.checked) {
    colorPicker5.value = colorPicker.value;
  }
});

Checkbox6.addEventListener("change", () => {
  // Enable/disable Color Picker 2 based on the checkbox state
  colorPicker6.disabled = !Checkbox6.checked;

  // Update Color Picker 2 if it's being enabled
  if (Checkbox6.checked) {
    colorPicker6.value = colorPicker.value;
  }
});

stPatriksDayButton.addEventListener("click", () => {
  if (isConnected) {
    // If stPatricksDayInterval is 'set', clear and reset it.
    if (stPatricksDayInterval) {
      clearInterval(stPatricksDayInterval);
      stPatricksDayInterval = null; // Reset the ID
    } else {
      stPatricksDayInterval = stPatricksDay();
    }
  } else {
    console.log("not connected");
  }
});

colorPicker.addEventListener("change", () => {
  // TODO: Change color of the light bulb
});

christmasButton.addEventListener("click", () => {
  //console.log(ws.readyState);
  const universeIndex = 1;
  const dmxStart = 1;
  const channelCount = 16;
  if (isConnected) {
    ws.send(
      `QLC+API|getChannelsValues|${universeIndex}|${dmxStart}|${channelCount}`
    );
  } else {
    console.log("Not connected to websocket");
  }
});

/*
 *       Helper function Declarations
 */

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
    // TODO: Actual logic for handling messages
  };
};

function sendMessage(message) {
  if (isConnected) {
    ws.send(message);
  } else {
    alert("Not connected to websocket!");
    connectToWebsocket();
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

function stPatricksDay() {
  let index = 0;
  const orange = [255, 95, 0]; // Orange
  const green = [0, 255, 0]; // Green

  return setInterval(() => sendColorAlternation(orange, green), 1000);
}

// Helper function. Used with setInterval() to switch colors between two fixtures
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

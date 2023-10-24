// Toggle power button
const powerOnButton = document.getElementById("powerOn");
const powerOffButton = document.getElementById("powerOff");
const colorPicker = document.getElementById("colorPicker");
const stPatriksDayButton = document.getElementById("st-patricks-btn");

const christmasButton = document.getElementById("christmas-btn");

const wsUrl = `ws://172.16.17.14:9999/qlcplusWS`;
let ws;
let isConnected = false;

document.addEventListener("DOMContentLoaded", () => {
  connectToWebsocket();
});

powerOnButton.addEventListener("click", (event) => {
  if (isConnected) {
    // Swap background colors
    powerOnButton.style.backgroundColor = "#f44336";
    powerOffButton.style.backgroundColor = "#d4d4d4";
    turnOn(1, 7);
  } else {
    console.log("Not connected to websocket");
    connectToWebsocket();
  }
});

powerOffButton.addEventListener("click", () => {
  if (isConnected) {
    // Swap background colors
    powerOffButton.style.backgroundColor = "#f44336";
    powerOnButton.style.backgroundColor = "#d4d4d4";
    turnOff(1, 7);
  } else {
    console.log("Not connected to websocket");
    connectToWebsocket();
  }
});
stPatriksDayButton.addEventListener("click", () => {
  if (isConnected) {
    stPatricksDay();
  } else {
    console.log("not connected");
    connectToWebsocket();
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
    connectToWebsocket();
  }
});

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
  setInterval(() => {
    const colors = [
      [255, 95, 0], // Orange
      [0, 255, 0], // Green
    ];

    let r, g, b;
    // Lampa 1
    [r, g, b] = colors[index];
    ws.send(`CH|1|${r}`);
    ws.send(`CH|2|${g}`);
    ws.send(`CH|3|${b}`);

    let secondIndex = index === 1 ? 0 : 1;

    // Lampa 2
    [r, g, b] = colors[secondIndex];
    ws.send(`CH|4|${r}`);
    ws.send(`CH|5|${g}`);
    ws.send(`CH|6|${b}`);

    index++;
    if (index >= 2) {
      index = 0;
    }
  }, 1000);
}

const merryGoRound = () => {
  const RED = 1;
  const GREEN = 2;
  const BLUE = 3;
  const fixtures = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [10, 11, 12],
    [13, 14, 15],
    [16, 17, 18],
    [19, 20, 21],
    [22, 23, 24],
    [25, 26, 27],
    [28, 29, 30],
  ];
  const step = 5;
  const MAX_CHANNELS = 10 * 3 + 1;

  const dim = (channel, value) => {
    return new Promise((resolve) => {
      sendMessage(`CH|${channel}|${value}`);
      setTimeout(resolve, 1000);
    });
  };

  const dimFixtures = async () => {
    let counter = 0;
    let max = 255;
    let min = 0;

    for (let i = BLUE; i < MAX_CHANNELS; i += 3) {
      dimmerDown = fixtures[counter];
      dimmerUp = fixtures[(counter + 1) % fixtures.length];
      max -= step;
      min += step;
      await dim(dimmerDown[BLUE], max);
      await dim(dimmerUp[BLUE], min);
      counter = (counter + 1) % fixtures.length;
    }
  };

  // Call dimFixtures initially
  dimFixtures();

  // Set up a repeating interval
  setInterval(dimFixtures, 10_000);
};

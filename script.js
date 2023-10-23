
// Toggle power button
const powerOnButton = document.getElementById("powerOn");
const powerOffButton = document.getElementById("powerOff");
const colorPicker = document.getElementById("colorPicker");
const stPatriksDayButton = document.getElementById("st-patricks-btn");

const christmasButton = document.getElementById("christmas-btn");

const wsUrl = `ws://172.16.17.14:9999/qlcplusWS`;
let ws;
let isConnected = false;

powerOnButton.addEventListener("click", (event) => {
    if (isConnected) {
        // Swap background colors
        powerOnButton.style.backgroundColor = "#f44336";
        powerOffButton.style.backgroundColor = "#d4d4d4";
        turnOn(1, 7);
    }
    else {
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
    }
    else {
        console.log("Not connected to websocket");
        connectToWebsocket();
    }
});

colorPicker.addEventListener("change", () => {
    // TODO: Change color of the light bulb
});

christmasButton.addEventListener("click", () => {
    //console.log(ws.readyState);
    const universeIndex = 1;
    const dmxStart = 1
    const channelCount = 16;
    if (isConnected) {
        ws.send(`QLC+API|getChannelsValues|${universeIndex}|${dmxStart}|${channelCount}`);
    }
    else {
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
    }

    ws.onerror = (error) => {
        console.log(`Error: ${error}`);
    };

    ws.onmessage = (event) => {
        const message = event.data;
        console.log(`Message: ${message}`);
        // TODO: Actual logic for handling messages
    }
}

function sendMessage(message) {
    if (isConnected) {
        ws.send(message);
    }
    else {
        alert('Not connected to websocket!');
        connectToWebsocket();
    }
}

function turnOn(start, end) {
    if (start <= 0 || end > 512 || start > end) {
        alert('Invalid range!');
        return;
    }
    for (start; start < end; start++) {
        sendMessage(`CH|${start}|255`);
    }
}

function turnOff(start, end) {
    if (start <= 0 || end > 512 || start > end) {
        alert('Invalid range!');
        return;
    }
    for (start; start < end; start++) {
        sendMessage(`CH|${start}|0`);
    }
}
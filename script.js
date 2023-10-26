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
const octoberFestBtn = document.getElementById("october-fest");

/*
 *       Global variables
 */
const wsUrl = `ws://172.16.17.14:9999/qlcplusWS`;
let ws;
let isConnected = false;
// Keeps track of the stPatricksDay state
let stPatricksDayInterval = null;
let christmasInterval = null;

/**
 *      Event Listener Declarations
 */

document.addEventListener("DOMContentLoaded", () => {
    connectToWebsocket();
});

/* colorPicker.addEventListener("change", () => {
    const color = colorPicker.value;
    changeColor(color);
}); */

powerOnButton.addEventListener("click", (event) => {
    if (isConnected) {
        // Swap background colors
        powerOnButton.style.backgroundColor = "#f44336";
        powerOffButton.style.backgroundColor = "#d4d4d4";

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

        turnOff(1, 7);
    } else {
        console.log("Not connected to websocket");
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
    const selectedColor = colorPicker.value;
    const colors = hex2rgb(selectedColor);
    console.log(colors);  // remove later
    // Change default channel if needed by calling:
    // setRed(startChannel = N, colors.r);
    setRed(colors.r);
    setGreen(colors.g);
    setBlue(colors.b);
});

octoberFestBtn.addEventListener("click", () => {
    if (isConnected) {
        if (christmasInterval) {
            clearInterval(christmasInterval);
            christmasInterval = null;
        } else {
            christmasInterval = octoberFest();
        }
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

let colorIndex = 0;
function stPatricksDay() {
    const orange = [255, 95, 0]; // Orange
    const green = [0, 255, 0]; // Green
    const ALTER_INTERVAL = 2000;
    colorIndex = 0; // Reset colorIndex

    return setInterval(() => sendColorAlternation(orange, green), ALTER_INTERVAL);
}

function octoberFest() {
    const blue = [0, 0, 255]; // Blue
    const white = [255, 255, 255]; // White
    const ALTER_INTERVAL = 2000;
    colorIndex = 0; // Reset colorIndex

    return setInterval(() => sendColorAlternation(blue, white), ALTER_INTERVAL);
}

// Helper function. Used with setInterval() to switch colors between two fixtures
function sendColorAlternation(color1, color2) {
    const colors = [color1, color2];
    let r, g, b;
    // Lampa 1
    [r, g, b] = colors[colorIndex];
    /* ws.send(`CH|1|${r}`);
    ws.send(`CH|2|${g}`);
    ws.send(`CH|3|${b}`); */

    // Send to all odd lights
    for (var i = 1; i < 31; i += 6) {
        ws.send(`CH|${i}|${r}`);
        ws.send(`CH|${i + 1}|${g}`);
        ws.send(`CH|${i + 2}|${b}`);
    }

    let secondIndex = colorIndex === 1 ? 0 : 1;

    // Lampa 2
    [r, g, b] = colors[secondIndex];
    /* ws.send(`CH|4|${r}`);
    ws.send(`CH|5|${g}`);
    ws.send(`CH|6|${b}`); */

    // Send to all even lights
    for (var i = 4; i < 31; i += 6) {
        ws.send(`CH|${i}|${r}`);
        ws.send(`CH|${i + 1}|${g}`);
        ws.send(`CH|${i + 2}|${b}`);
    }

    colorIndex++;
    if (colorIndex >= 2) {
        colorIndex = 0;
    }
}

// Konverterar hex till rgb
// T.ex #ff0000 -> {r: 255, g: 0, b: 0}
// Funktionen skippar # i början av hex
function hex2rgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

function setRed(channel = 1, value) {
    if (value < 0 || value > 255) {
        alert("Invalid value!");
        return;
    }
    console.log(`Setting red to ${value} on channel ${channel}`);
    sendMessage(`CH|${channel}|${value}`);
}

function setGreen(channel = 2, value) {
    if (value < 0 || value > 255) {
        alert("Invalid value!");
        return;
    }
    console.log(`Setting green to ${value} on channel ${channel}`);
    sendMessage(`CH|${channel}|${value}`);
}

function setBlue(channel = 3, value) {
    if (value < 0 || value > 255) {
        alert("Invalid value!");
        return;
    }
    console.log(`Setting blue to ${value} on channel ${channel}`);
    sendMessage(`CH|${channel}|${value}`);
}

function changeColor(color) {
    const colors = hex2rgb(color);
    if (colors === null) {
        alert("Invalid color!");
        return;
    }
    console.log(`Colors: ${colors}`);
    for (let i = 1; i < 7; i += 3) {
        setRed(channel = i, colors.r);
        setGreen(channel = i + 1, colors.g);
        setBlue(channel = i + 2, colors.b);
    }
    console.log("Color message sent to all 30 channels");
}




//// Experiment

const play = document.getElementById("test-play");
const stop = document.getElementById("test-stop");

play.addEventListener("click", () => {
    runPatrickAllBlue();
});

stop.addEventListener("click", () => {
    stopPatrickAllBlue();
});

function runPatrickAllBlue() {
    ws.send(`QLC+API|setFunctionStatus|1|1`);
}

function stopPatrickAllBlue() {
    ws.send(`QLC+API|setFunctionStatus|1|0`);
}
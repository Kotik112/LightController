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

colorPicker.addEventListener("change", () => {
    const color = colorPicker.value;
    changeColor(color);

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
    const selectedColor = colorPicker.value;
    const colors = hex2rgb(selectedColor);
    console.log(colors);  // remove later
    // Change default channel if needed by calling:
    // setRed(startChannel = N, colors.r);
    setRed(colors.r);
    setGreen(colors.g);
    setBlue(colors.b);
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
    const orange = [255, 95, 0]; // Orange
    const green = [0, 255, 0]; // Green

    return setInterval(() => sendColorAlternation(orange, green), 1000);
}

// Helper function. Used with setInterval() to switch colors between two fixtures
let colorIndex = 0;
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

// Konverterar hex till rgb
// T.ex #ff0000 -> {r: 255, g: 0, b: 0}
// Funktionen skippar # i början av hex
function hex2rgb(hex) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);

    return { r, g, b };
}

function setRed(channel = 1, value) {
    if (value < 0 || value > 255) {
        alert("Invalid value!");
        return;
    }
    sendMessage(`CH|${channel}|${value}`);
}

function setGreen(channel = 2, value) {
    if (value < 0 || value > 255) {
        alert("Invalid value!");
        return;
    }
    sendMessage(`CH|${channel}|${value}`);
}

function setBlue(channel = 3, value) {
    if (value < 0 || value > 255) {
        alert("Invalid value!");
        return;
    }
    sendMessage(`CH|${channel}|${value}`);
}

function changeColor(color) {
    const colors = hex2rgb(color);

    setRed(colors.r);
    setGreen(colors.g);
    setBlue(colors.b);

    setRed(channel = 4, colors.r);
    setGreen(channel = 5, colors.g);
    setBlue(channel = 6, colors.b);
}


'use strict';

// Toggle power button
const powerOnButton = document.getElementById("powerOn");
const powerOffButton = document.getElementById("powerOff");
const colorPicker = document.getElementById("colorPicker");

colorPicker.addEventListener("change", () => {
    connect();
    const color = colorPicker.value;
    let result = hexToRgb(color);
    console.log(result);
    setRed(result.r);
    setGreen(result.g);
    setBlue(result.b);
    console.log("Color changed");
});

powerOnButton.addEventListener("click", () => {
    powerOnButton.style.backgroundColor = "#4CAF50";
    powerOffButton.style.backgroundColor = "#d4d4d4";
});

powerOffButton.addEventListener("click", () => {
    powerOffButton.style.backgroundColor = "#f44336";
    powerOnButton.style.backgroundColor = "#d4d4d4";
});
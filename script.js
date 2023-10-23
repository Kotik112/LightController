
// Toggle power button
const powerOnButton = document.getElementById("powerOn");
const powerOffButton = document.getElementById("powerOff");
const colorPicker = document.getElementById("colorPicker");
const stPatriksDayButton = document.getElementById("stPatriksDay");

console.log(powerOnButton);

/* colorPicker.addEventListener("change", () => {
    // TODO: Change color of the light bulb
}); */

powerOnButton.addEventListener("click", (event) => {
    // Swap background colors
    powerOnButton.style.backgroundColor = "#f44336";
    powerOffButton.style.backgroundColor = "#d4d4d4";
    console.log("Power on");
    console.log(event);
});

powerOffButton.addEventListener("click", () => {
    // Swap background colors
    powerOffButton.style.backgroundColor = "#f44336";
    powerOnButton.style.backgroundColor = "#d4d4d4";
    console.log("Power off");
});
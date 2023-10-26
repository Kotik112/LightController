/* 
* Element selection
*/
const toggleButton = document.querySelector('.toggle-switch');




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



toggleButton.addEventListener("change", () => {
    if (toggleButton.checked) {
        turnOn(1, 31);
    } else {
        turnOff(1, 31);
    }
});



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

// Select all the anchor tags with the "button-button" class
const buttonButtons = document.querySelectorAll('.button-circle');

// Add a click event listener to each anchor tag
buttonButtons.forEach(button => {
    button.addEventListener("click", (event) => {
        console.log("click")
        event.preventDefault(); // Prevent the default link behavior
        // Handle the click action for each button
        // You can perform actions like sending data to your WebSocket server here
        // For example, you can identify the button clicked and send a corresponding command.
    });
});

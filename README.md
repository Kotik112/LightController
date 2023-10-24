# DMX Light Controller:

This documentation provides information on how to use and understand the JavaScript code for controlling DMX lights using a web interface. The program assumes that the DMX fixtures are set to sequenced channels, meaning each fixture occupies a series of consecutive DMX channels. The JavaScript code interacts with a WebSocket server to control DMX lights.

Table of Contents
Introduction
Prerequisites
Usage
Functionality
Power Control
Color Selection
Modes
Color Picker Containers
WebSocket Connection
Helper Functions
HTML Structure
1. Introduction<a name="introduction"></a>
This project provides a web interface for controlling DMX lights. It uses JavaScript and WebSocket communication to send DMX control commands to compatible fixtures. The code allows you to turn the lights on or off, change their colors, and activate various lighting modes.

2. Prerequisites<a name="prerequisites"></a>
Before using this project, you should have the following prerequisites in place:

A working WebSocket server that listens for DMX control commands.
DMX fixtures configured to receive control commands on specific channels (sequenced channels).
3. Usage<a name="usage"></a>
To use this project, follow these steps:

Clone the repository or download the HTML and JavaScript files.
Host the HTML file on a web server or open it in a web browser.
Ensure your WebSocket server's URL is correctly set in the JavaScript code (variable wsUrl).
Once you've completed the above steps, you can use the web interface to control your DMX lights.

4. Functionality<a name="functionality"></a>
Power Control<a name="power-control"></a>
Clicking the "On" button (powerOnButton) turns on the lights.
Clicking the "Off" button (powerOffButton) turns off the lights.
Color Selection<a name="color-selection"></a>
The color of the lights can be changed using the color picker (colorPicker).
If checkboxes (Checkbox1 to Checkbox6) are checked, the color pickers (colorPicker1 to colorPicker6) change to the selected color when the main color picker changes.
Modes<a name="modes"></a>
"St. Patrick's Day" mode can be activated by clicking the "St. Patrick's Day" button (stPatriksDayButton).
The "Christmas" button (christmasButton) retrieves the current DMX channel values if the WebSocket is connected.
Color Picker Containers<a name="color-picker-containers"></a>
The HTML contains multiple color picker containers, each with a checkbox and color picker input.
WebSocket Connection<a name="websocket-connection"></a>
The WebSocket connection is established with the server specified in the wsUrl.
Messages are sent and received through the WebSocket for DMX control.
Helper Functions<a name="helper-functions"></a>
Various helper functions are provided for interacting with DMX lights, such as sendMessage, turnOn, turnOff, and others.
5. HTML Structure<a name="html-structure"></a>
The HTML structure consists of various elements that form the user interface for controlling DMX lights. The key elements include:

Power buttons for turning the lights on and off.
A color picker for selecting the desired color.
Modes buttons for special lighting effects.
Multiple color picker containers, each with a checkbox and color picker input.
A Prevas logo image.
JavaScript code is included at the end of the HTML file.
The HTML file provides the visual interface for interacting with the DMX lights. The JavaScript code controls the functionality of the interface and communicates with the WebSocket server to send DMX control commands.

For the project to work, you need to ensure that the WebSocket server's URL is correctly configured in the JavaScript code (wsUrl).

That's it! You now have a basic understanding of how to use and interact with this DMX light control project. You can further customize the HTML and JavaScript code to meet your specific requirements and lighting setup.

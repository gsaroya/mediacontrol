# Media Control Web Application

## About

I made this web application to effortlessly control certain aspects of my home entertainment ecosystem using my phone. This application is mostly hard-coded around my specific use case and hardware. See _Software_ and _Hardware_ sections for usage.

### Features

- Easily view, refresh, and change information about inputs at a glance
- Select between various HDMI inputs (using multi-port HDMI switch)
- Select between various USB ports for a single USB Hub input (using multi-port USB switch)
- Capture audio from HDMI devices and stream to wireless USB headset

![](https://raw.githubusercontent.com/gsaroya/mediacontrol/master/images/demo.gif)

### Overview

The following image outlines the all the involved components and how the application ties in.
![](https://raw.githubusercontent.com/gsaroya/mediacontrol/master/images/overview.png)

## Software

### Environment
- Raspbian (with root access to install services)
- Node.JS server

### Languages/Scripts
- JavaScript (vanilla frontend, Node.JS backend)
- Python (used in backend to communicate with GPIO)
- Bash (used in backend to run services and execute scripts)

### Setup Procedure

Note: Ensure hardware procedure is setup and tested first. `cd` into the root of this repo.

Audio Relay Service/Script:
- Update `service/audio.sh` to point to the right input and output devices
- Ensure the path to `service/audio.sh` in `service/audrelay.service` is correct
- Install the service: `sudo cp service/audrelay.service /lib/systemd/system/audrelay.service`
- Enable the service: `sudo systemctl enable audrelay.service`

Node Application:
- `npm install`
- `npm start`
- The app will be running from `localhost:3000` and can be used assuming hardware is setup properly

## Hardware

### Components
- HDMI Switch (Five inputs, one output)
- USB Switch (One input, four outputs)
- USB sound card with line-in
- HDMI line-out extractor
- Analog-Digital Converter (ADC: MCP3008)
- Relay Board (With two or more modules)
- Raspberry Pi Model B+
- Wireless USB headset

### Setup Procedure

Triggering switches:
- To control the HDMI and USB switches remotely, the button presses need to be simulated from the Pi
- I soldered wires to the leads under the buttons and connected them to the _relay board_
  - One module for the _HDMI switch_ and one for the _USB switch_
- To use the relay board with the _Pi_, I followed [this video](https://www.youtube.com/watch?v=OQyntQLazMU)
- The script `python/click.py` triggers a relay module through a specified pin via command-line argument

Reading selected inputs:
- I used [this guide](https://projects.raspberrypi.org/en/projects/physical-computing/15) to connect the understand the _ADC_ pinout and connect it to the _Pi_.
- To tell which input is active in the switches, we can read the voltages of the leds.
- I soldered a wire to a lead of each of four of the five _HDMI switch_ leds and three of the four _USB switch_ leds. 
  - Next I soldered each wire to a separate channel in the _ADC_.
- The script `python/read.py` should be updated to read the right channels and have an appropriate threshold for checking the voltages

Connecting everything together:
- Connect all the HDMI devices to the _HDMI switch_ inputs
- Connect the _HDMI switch_ output to the _HDMI line-out extractor_ device
- Connect the _HDMI line-out extractor_ to the _TV_ and _USB sound card_ accordingly
- Connect the _USB sound card_ to the _Pi_
- Connect all the USB devices to the _USB switch_ outputs
  - Connect whatever USB peripherals you wish to use between these devices to the input (in my case, the wireless USB headset)
- Provide power to all devices and `ssh` into the _Pi_ (over wired or wireless network) to begin the software procedure.
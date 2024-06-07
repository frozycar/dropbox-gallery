#!/bin/bash

# Locate in the server folder of the project
cd /home/gelkor/Projects/dropbox-gallery/server

# To run the following commands we have to install pm2 library
# Update the dropbox files
pm2 start dropbox.js --name dropbox --no-autorestart

# Start the server
pm2 start index.js --name server

# Let dropbox to update the new files
sleep 20

# Configure the chromium browser to start in kiosk mode
xset s noblank
xset s off
xset -dpms

#unclutter -idle 0.5 -root &

# Using sed commnad search through the Chromium preferences file and clear out
# any flags that would make the warning bar appear
#sed -i 's/"exited_cleanly":false/"exited_cleanly":true/' /home/$USER/.config/chromium/Default/Preferences
#sed -i 's/"exit_type":"Crashed"/"exit_type":"Normal"/' /home/$USER/.config/chromium/Default/Preferences

# Start the browser in kiosk mode
chromium-browser http://localhost:3000 --kiosk --noerrdialogs --disable-infobars --enable-features=OverlayScrollbar


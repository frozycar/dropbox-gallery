#!/bin/bash

# Start the server
# First install pm2 and after pm2 start index.js --name server
cd /home/gelkor/Projects/dropbox-gallery/server
pm2 start index.js --name server

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


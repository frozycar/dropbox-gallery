# That command run in the pi console not through SSH
# Know the number of display to run the kiosk
echo $DISPLAY

# Create the service file
# Copy all from files/kiosk.service.
# Check the number of the DISPLAY=:0.0
sudo nano /lib/systemd/system/kiosk.service

# Enable and start the service
sudo systemctl enable kiosk.service
sudo systemctl start kiosk.service
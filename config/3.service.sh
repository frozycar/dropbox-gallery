# That command run in the pi console not through SSH
# Know the number of display to run the kiosk
echo $DISPLAY

# Create the service file
# Copy all from files/kiosk.service.
# Check the number of the DISPLAY=:0
sudo nano /lib/systemd/system/kiosk.service

## FOR SOME REASON WHEN WE RUN SYSTEMD services, the $PATH environment does not take from the current user
# Create the symlinks to run pm2 and node
whereis node
whereis pm2
cd /usr/local/bin
ln -s path_to_node node
ln -s path_to_pm2 pm2

# Enable and start the service
sudo systemctl enable kiosk.service
sudo systemctl start kiosk.service
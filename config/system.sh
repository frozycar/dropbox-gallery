# Disable bluetooth
sudo nano /boot/firmware/config.txt
dtoverlay=disable-bt

# Activate firewall and block ports
sudo apt install ufw
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow ssh
sudo ufw enable

# Install tailscale

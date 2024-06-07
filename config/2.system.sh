# Disable bluetooth. Just in case do not do
sudo nano /boot/firmware/config.txt
dtoverlay=disable-bt

# Activate firewall and block ports
sudo apt install ufw
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow ssh
sudo ufw enable

# Install Tailscale on Debian Bookworm
curl -fsSL https://pkgs.tailscale.com/stable/debian/bookworm.noarmor.gpg | sudo tee /usr/share/keyrings/tailscale-archive-keyring.gpg >/dev/null
curl -fsSL https://pkgs.tailscale.com/stable/debian/bookworm.tailscale-keyring.list | sudo tee /etc/apt/sources.list.d/tailscale.list
sudo apt-get update
sudo apt-get install tailscale
# Confirm in the browser the session
sudo tailscale up
# Check the IP
tailscale ip -4
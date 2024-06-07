## SETUP THE OS

sudo apt purge wolfram-engine scratch scratch2 nuscratch sonic-pi idle3 -y
#sudo apt purge scratch nuscratch sonic-pi idle3 -y
sudo apt purge smartsim java-common minecraft-pi libreoffice* -y
#sudo apt purge smartsim java-common libreoffice* -y
sudo apt clean
sudo apt autoremove -y
sudo apt update
sudo apt upgrade

sudo apt install wtype
sudo raspi-config

# Install Tailscale on Debian Bookworm
curl -fsSL https://pkgs.tailscale.com/stable/debian/bookworm.noarmor.gpg | sudo tee /usr/share/keyrings/tailscale-archive-keyring.gpg >/dev/null
curl -fsSL https://pkgs.tailscale.com/stable/debian/bookworm.tailscale-keyring.list | sudo tee /etc/apt/sources.list.d/tailscale.list
sudo apt-get update
sudo apt-get install tailscale
# Confirm in the browser the session
sudo tailscale up
# Check the IP
tailscale ip -4

# Install node
sudo apt install curl -y 
sudo apt install build-essential libssl-dev 
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/master/install.sh | bash 
source ~/.bashrc
# Check the installation 
command -v nvm 
# Install node specific version
nvm install 18.4.0
# Install PM2 globally
npm install pm2 -g
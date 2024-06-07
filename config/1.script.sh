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
# Follow that steps: System options -> Boot/Auto Login -> Desktop Autologin => FINISH
# Last time that I run, screen was not turning on
#sudo raspi-config

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

# Clone the repository
mkdir ~/Projects
cd Projects
git clone https://github.com/frozycar/dropbox-gallery.git
# Copy the config files that we have in the local machine. /server/config.js
# Install the packages in the server and client folders
# Create the bundle
npm run build
# Move the files from the client/dist folder to server/client folder
# Download all the files
npm run dropbox
# Run the server
npm run server
# Open browser and access to http://localhost:3000
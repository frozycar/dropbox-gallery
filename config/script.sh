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
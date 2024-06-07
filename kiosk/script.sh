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

nvm install 18.4.0
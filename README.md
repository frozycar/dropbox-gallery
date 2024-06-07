# dropbox-gallery

Application that downloads the dropbox images and display in a simple gallery

## Step by Step to configure OS

1. Burn SD card with `Raspberry Pi Imager`
2. Connect WIFI
3. Update OS
4. Configure packages for kiosk mode
5. Install `nvm` and `pm2`
6. Configure SSH connection to access just with keys
7. Clone the app locally (`git clone https://github.com/frozycar/dropbox-gallery.git`) and run but not in Kiosk mode
8. Once the app works right, create `kiosk.service` to run the kiosk in the start up
9. Install `firewalld` and `tailscale`

## Initialisation of Project

1. Create `public` folder and inside `cars` and `csv`
2. Create `logs` folder

## Sources

- [Issue in generating access token](https://www.dropboxforum.com/t5/Dropbox-API-Support-Feedback/Issue-in-generating-access-token/m-p/592667#M27563)
- [How can i get an acces token without a login?](https://www.dropboxforum.com/t5/Dropbox-API-Support-Feedback/How-can-i-get-an-acces-token-without-a-login/td-p/690457/page/1)

- [JS SDK](https://dropbox.github.io/dropbox-sdk-js/index.html)
- [Examples](https://github.com/dropbox/dropbox-sdk-js/tree/main/examples/javascript)
- [HTTP doc](https://www.dropbox.com/developers/documentation/http/documentation)

## Others

- https://www.twilio.com/en-us
//const app = require('express')();
const { Dropbox } = require('dropbox'); 
const { appKey, appSecret, refreshToken } = require('../config');

const config = {
    clientId: appKey,
    clientSecret: appSecret,
    refreshToken
}

const hostname = 'localhost';
const port = 4000;

const dbx = new Dropbox(config);

const REDIRECT_URL = `http://${hostname}:${port}/auth`;

app.get('/', (req, res) => {
  dbx.auth.getAuthenticationUrl(REDIRECT_URL, null, 'code', 'offline', null, 'none', false)
    .then((authUrl) => {
      res.writeHead(302, { Location: authUrl });
      res.end();
    });
});

app.get('/auth', (req, res) => {
  const { code } = req.query;
  console.log(`code:${code}`);

  dbx.auth.getAccessTokenFromCode(REDIRECT_URL, code)
    .then((token) => {
      console.log(`Token Result:${JSON.stringify(token)}`);
      dbx.auth.setRefreshToken(token.result.refresh_token);
      dbx.usersGetCurrentAccount()
        .then((response) => {
          console.log('response', response);
        })
        .catch((error) => {
          console.error(error);
        });
    })
    .catch((error) => {
      console.error(error);
    });
  res.end();
});

app.listen(port);
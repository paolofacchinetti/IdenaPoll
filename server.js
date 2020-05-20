const express = require('express');
const app = express();
const NodeCache = require('node-cache');
const {v4: uuidv4} = require('uuid');
const {checkSignature} = require('./ether');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
app.listen(8000, () => {
  console.log('Server started!')
});
const sessionCache = new NodeCache({
  stdTTL: 60 * 5,
  checkperiod: 60,
});
const SESSION_COOKIE_TIME = 5 * 60 * 1000;
const AUTH_COOKIE_TIME = 24 * 60 * 60 * 1000;
app.use(bodyParser.json());
app.use(cookieParser());
const IDENA_SESSION_TOKEN_COOKIE = 'IDENA_SESSION_TOKEN';
const IDENA_AUTH_COOKIE = 'IDENA_AUTH';
app.route('/auth/v1/logout').post((req, res) => {
  const session = req.cookies[IDENA_AUTH_COOKIE];
  if (session) {
    res.clearCookie(IDENA_AUTH_COOKIE);
    return res.json()
  }
});

app.route('/auth/v1/new-token').get((_, res) => {
  const token = uuidv4();
  res.cookie(IDENA_SESSION_TOKEN_COOKIE, token, {
    maxAge: SESSION_COOKIE_TIME,
    httpOnly: true,
  });
  return res.json({token})
});

app.route('/auth/v1/start-session').post((req, res) => {
  const {token, address} = req.body;
  const nonce = `signin-${uuidv4()}`;
  sessionCache.set(token, {address, nonce});
  return res.json({success: true, data: {nonce}})
});

app.route('/auth/v1/authenticate').post((req, res) => {
  const {token, signature} = req.body;

  const cacheValue = sessionCache.get(token);
  if (!cacheValue) {
    return res.json({
      success: false,
      data: {
        authenticated: false,
      },
    })
  }

  const address = checkSignature(cacheValue.nonce, signature);

  if (address.toLowerCase() !== cacheValue.address.toLowerCase()) {
    return res.json({
      success: false,
      data: {
        authenticated: false,
      },
    })
  }

  sessionCache.set(token, {...cacheValue, authenticated: true});

  return res.json({
    success: true,
    data: {
      authenticated: true,
    },
  })
});
app.route('/auth/v1/session').get((req, res) => {
  const session = req.cookies[IDENA_AUTH_COOKIE];
  if (session) {
    return res.json({authenticated: true, address: session.address})
  }

  if (req.query.onlyCheck) {
    return res.sendStatus(403)
  }

  const sessionToken = req.cookies[IDENA_SESSION_TOKEN_COOKIE];
  if (sessionToken) {
    const data = sessionCache.get(sessionToken);
    if (data) {
      const {address, authenticated} = data;
      if (authenticated) {
        res.clearCookie(IDENA_SESSION_TOKEN_COOKIE);
        res.cookie(
          IDENA_AUTH_COOKIE,
          {authenticated: true, address},
          {
            maxAge: AUTH_COOKIE_TIME,
            httpOnly: true,
          }
        );
        return res.status(200).json({authenticated: true, address})
      }
    }
  }

  return res.sendStatus(403)
});

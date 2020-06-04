const express = require('express');
const app = express();
const NodeCache = require('node-cache');
const {v4: uuidv4} = require('uuid');
const {checkSignature} = require('./ether');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const fetch = require('node-fetch');
app.use(cors());
app.listen(8000, () => {
  console.log('Server started!')
});
const sessionCache = new NodeCache({
  stdTTL: 60 * 5,
  checkperiod: 60,
});
const SESSION_COOKIE_TIME = 5 * 60 * 1000;
const AUTH_COOKIE_TIME = 8 * 60 * 60 * 1000;
app.use(bodyParser.json());
app.use(bodyParser.text());
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
  res.set('Access-Control-Allow-Origin', [_.header('origin')]);
  res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.append('Access-Control-Allow-Headers', 'Content-Type');
  res.set('Access-Control-Allow-Credentials', 'true');
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
app.route('/auth/v1/session').get(async (req, res) => {
  res.set('Access-Control-Allow-Origin', [req.header('origin')]);
  res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.append('Access-Control-Allow-Headers', 'Content-Type');
  res.set('Access-Control-Allow-Credentials', 'true');
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
        let session = {
          address: address,
          expiresAt: new Date().getTime() + AUTH_COOKIE_TIME
        };
        let headers = {
          'Authorization': '0000000000000000000000000',
          'Content-Type': 'application/json'
        };
        let fe = await fetch(`http://idenapoll.com:3000/sessions?address=${address}`, {
          method: 'GET',
          headers: headers
        });
        const sessions = await fe.json();
        if (sessions)
          for (let session of sessions) {
            fe = await fetch(`http://idenapoll.com:3000/sessions/${session.id}`, {
              method: 'DELETE',
              headers: headers
            });
            const json = await fe.json();
          }
        fe = await fetch("http://idenapoll.com:3000/sessions", {
          method: 'POST',
          body: JSON.stringify(session),
          headers: headers
        });

        const json = await fe.json();
        return res.status(200).json({authenticated: true, address})
      }
    }
  }
  return res.sendStatus(403)
});
app.route("/vote").post(async (req, res) => {
  res.set('Access-Control-Allow-Origin', [req.header('origin')]);
  res.append('Access-Control-Allow-Methods', 'POST');
  res.append('Access-Control-Allow-Headers', 'Content-Type');
  res.set('Access-Control-Allow-Credentials', 'true');
  const body = JSON.parse(req.body);
  const {poll, option} = body;
  let headers = {
    'Authorization': '0000000000000000000000000',
    'Content-Type': 'application/json'
  };
  if (req.cookies[IDENA_AUTH_COOKIE]) {
    const voter = req.cookies[IDENA_AUTH_COOKIE].address;
    let fe = await fetch(`http://idenapoll.com:3000/sessions?address=${voter}`, {
      method: 'GET',
      headers: headers
    });
    const sessions = await fe.json();
    if (sessions[0].expiresAt > new Date().getTime()) {
      let status = {status: "ok"};
      fe = await fetch(`http://idenapoll.com:3000/polls/${poll}`, {method: 'GET'});
      const polljs = await fe.json();
      let found;
      for (o of polljs.options) {
        let search = o.votes.find((v) => {
          return v.address === voter
        });
        found = search !== undefined ? search : found;
      }
      if (found == null) {
        polljs.options[option].votes.push({
          address: voter
        });
        const fe = await fetch(`http://idenapoll.com:3000/polls/${poll}`, {
          method: 'PATCH',
          body: JSON.stringify(polljs),
          headers: headers
        });
        const jsonres = await fe.json();
      } else {
        status = {status: "dup"}
      }
      return res.status(200).json(status);
    } else
      return res.sendStatus(403);
  } else
    return res.sendStatus(403);
});

app.route("/create").post(async (req, res, next) => {
  res.set('Access-Control-Allow-Origin', [req.header('origin')]);
  res.append('Access-Control-Allow-Methods', 'POST');
  res.append('Access-Control-Allow-Headers', 'Content-Type');
  res.set('Access-Control-Allow-Credentials', 'true');
  const poll = JSON.parse(req.body);
  if (req.cookies[IDENA_AUTH_COOKIE]) {
    const voter = req.cookies[IDENA_AUTH_COOKIE].address;
    let headers = {
      'Authorization': '0000000000000000000000000',
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Connection': 'keep-alive'
    };
    let fe = await fetch(`http://idenapoll.com:3000/sessions?address=${voter}`, {
      method: 'GET',
      headers: headers,
      body: null
    });
    poll.endsAt = new Date(poll.endsAt).getTime();
    const sessions = await fe.json();
    if (sessions[0].expiresAt > new Date().getTime()) {
      headers = {
        'Authorization': '0000000000000000000000000',
        'Content-Type': 'application/json'
      };
      const fe = await fetch("http://idenapoll.com:3000/polls", {
        method: 'POST',
        body: JSON.stringify(poll),
        headers: headers
      });
      const json = await fe.json();
      return res.status(200).json(json);
    } else
      return res.sendStatus(403)
  } else
    return res.sendStatus(403)
});
setInterval(async () => {
  let fe = await fetch(`http://idenapoll.com:3000/polls?endsAt_lte=${new Date().getTime()}&status=active`, {method: 'GET'});
  const polljs = await fe.json();
  let headers = {
    'Authorization': '0000000000000000000000000',
    'Content-Type': 'application/json'
  };
  if (polljs)
    for (let poll of polljs) {
      poll.status = "ended";
      fe = await fetch(`http://idenapoll.com:3000/polls/${poll.id}`, {
        method: 'PATCH',
        body: JSON.stringify(poll),
        headers: headers
      });
      const json = await fe.json();
    }
  fe = await fetch(`http://idenapoll.com:3000/sessions?expiresAt_lte=${new Date().getTime()}`, {
    method: 'GET',
    headers: headers
  });
  const sessions = await fe.json();
  if (sessions)
    for (let session of sessions) {
      fe = await fetch(`http://idenapoll.com:3000/sessions/${session.id}`, {
        method: 'DELETE',
        headers: headers
      });
      const json = await fe.json();
    }
}, 1800000);

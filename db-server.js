const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
const bodyParser = require('body-parser');
server.use(bodyParser.json());
server.use(bodyParser.text());
server.use(middlewares);
server.use((req, res, next) => {
  if (isAuthorized(req) || (req.method === 'GET' && req.url.substring(0, 6) === "/polls")) { // add your authorization logic here
    if (req.method === 'POST') {
      req.body.createdAt = Date.now()
    }
    next() // continue to JSON Server router
  } else {
    res.sendStatus(401)
  }
});
server.use(router);
server.listen(3000, () => {
  console.log('JSON Server is running')
});

function isAuthorized(req) {
  return req.headers.authorization === "cfd8d2ae-a31b-4f5e-87a9-a0743d180b24";
}

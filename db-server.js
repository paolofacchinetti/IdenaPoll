const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults(["noCors"]);
const bodyParser = require('body-parser');
server.use(bodyParser.json());
server.use(middlewares);
server.use((req, res, next) => {
  if (isAuthorized(req) || req.method === 'GET') { // add your authorization logic here
    if (req.method === 'POST') {
      req.body.createdAt = Date.now()
    }
    next() // continue to JSON Server router
  } else {
    res.sendStatus(401)
  }
});
server.use(router);
server.listen(80, () => {
  console.log('JSON Server is running')
});

function isAuthorized(req) {
  return req.headers.origin === "localhost:8000";
}

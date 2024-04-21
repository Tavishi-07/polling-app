const http = require('http');
const controller = require('./controller');

const server = http.createServer(controller);

server.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});

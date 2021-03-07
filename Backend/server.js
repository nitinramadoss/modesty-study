const http = require('http');
const util = require("util");

const port = 1234;

const server = http.createServer((req, res) => {
 
  let path = url.parse(req.url, true);

  res.setHeader("Content-type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.writeHead(200, "OK");

  res.write("The response\n\n");
  res.write(util.inspect(path.query) + "\n\n");
 
  res.end("End of message.");  
  
});

server.listen(port, () => {
  console.log(`Listening on ${port}`);
});


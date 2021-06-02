const http = require("http");

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.write("Hello World!");
    res.end();
  } else if (req.url === "/test") {
    res.write(JSON.stringify([1, 2, 3]));
    res.end();
  } else {
    res.write("404 error!");
    res.end();
  }
});

server.listen(3000);

console.log("Listening on port 3000");

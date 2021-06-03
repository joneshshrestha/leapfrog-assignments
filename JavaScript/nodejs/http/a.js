const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  if (req.url == "/") {
    res.writeHead(200, { "Content-Type": "text/html" });
    fs.readFile("./index.html", null, function (error, data) {
      if (error) {
        res.writeHead(404);
        res.write("File not found!");
      } else {
        res.write(data);
      }
      res.end();
    });
  } else if (req.url == "/about") {
    res.writeHead(200, { "Content-Type": "text/html" });
    fs.readFile("./about.html", null, function (error, data) {
      if (error) {
        res.writeHead(404);
        res.write("File not found!");
      } else {
        res.write(data);
      }
      res.end();
    });
  } else {
    res.writeHead(200, { "Content-Type": "text/html" });
    fs.readFile("./404.html", null, function (error, data) {
      if (error) {
        res.writeHead(404);
        res.write("File not found!");
      } else {
        res.write(data);
      }
      res.end();
    });
  }
});

server.listen(8000, "127.0.0.1", () => {
  console.log("listening on port 8000");
});

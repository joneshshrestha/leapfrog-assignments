const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  //   res.writeHead(200, { "content-type": "text/html" });
  //   fs.createReadStream("index.html").pipe(res);
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

server.listen(process.env.PORT || 3000);

console.log("Listening on port 3000");

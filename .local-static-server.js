const http = require("http");
const fs = require("fs");
const path = require("path");

const host = process.env.HOST || "127.0.0.1";
const port = Number(process.env.PORT || 3000);
const rootDir = path.join(__dirname, "out");

const mimeTypes = {
  ".css": "text/css; charset=utf-8",
  ".gif": "image/gif",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".mjs": "application/javascript; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8",
  ".webp": "image/webp",
};

function sendFile(filePath, res) {
  const ext = path.extname(filePath).toLowerCase();
  const contentType = mimeTypes[ext] || "application/octet-stream";

  fs.readFile(filePath, (error, content) => {
    if (error) {
      res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("Internal Server Error");
      return;
    }

    res.writeHead(200, { "Content-Type": contentType });
    res.end(content);
  });
}

function resolvePath(urlPath) {
  const cleanPath = decodeURIComponent(urlPath.split("?")[0]);
  const normalized = cleanPath === "/" ? "/index.html" : cleanPath;
  const requestedPath = path.normalize(path.join(rootDir, normalized));

  if (!requestedPath.startsWith(rootDir)) {
    return null;
  }

  return requestedPath;
}

const server = http.createServer((req, res) => {
  const resolvedPath = resolvePath(req.url || "/");

  if (!resolvedPath) {
    res.writeHead(403, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Forbidden");
    return;
  }

  fs.stat(resolvedPath, (error, stats) => {
    if (!error && stats.isFile()) {
      sendFile(resolvedPath, res);
      return;
    }

    const indexPath = path.join(resolvedPath, "index.html");
    fs.stat(indexPath, (indexError, indexStats) => {
      if (!indexError && indexStats.isFile()) {
        sendFile(indexPath, res);
        return;
      }

      const notFoundPath = path.join(rootDir, "404.html");
      fs.stat(notFoundPath, (notFoundError, notFoundStats) => {
        if (!notFoundError && notFoundStats.isFile()) {
          res.statusCode = 404;
          sendFile(notFoundPath, res);
          return;
        }

        res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
        res.end("Not Found");
      });
    });
  });
});

server.listen(port, host, () => {
  console.log(`Static server running at http://${host}:${port}`);
});

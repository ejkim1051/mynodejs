const http = require('http');

const url = require('url');

http.createServer((req, res) => {
    const path = url.parse(req.url, true).pathname; //user
    if(path == "/hello"){
        res.end("<h1>World</h1>");
    }else if(path == "/world"){
        res.end("<h1>Hello</h1>");
    }else if(path == "/"){
        res.end("<h1>Home</h1>");
    }
}).listen(4500);
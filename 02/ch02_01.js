const http = require('http');   //commonjs import

// req => HttpRequest, res => HttpResponse
const server = http.createServer((req, res)=>{
    res.statusCode = 200;   //ok
    res.setHeader("Content-Type","text/plain"); //데이터 타입 정의
    res.write("Hello World");
    res.end();
});

server.listen(4500);
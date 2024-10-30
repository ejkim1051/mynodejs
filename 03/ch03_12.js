const http = require('http');
const url = require('url');
const fs = require('fs');

http.createServer((req, res) => {
    const path = url.parse(req.url, true).pathname;

    if(path == "/json"){
        res.setHeader('Content-Type', 'application/json;charset=UTF-8');
        const data = {
            name:'lee', age:40, address:'서울시 동대문구 장안동'
        }
        const result = JSON.stringify(data);
        res.end(result);
    }else if(path == "/test"){
        res.setHeader('Content-Type', 'application/json;charset=UTF-8');
        const data = fs.readFileSync('test2.json','utf-8');
        const result = JSON.parse(data);
        const posts = result['data'];
        res.end(JSON.stringify({data:posts}, null, 2));
    }
}).listen(4500);
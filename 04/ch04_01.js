const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;

app.get("/", (req, res) =>{
    res.send("<h1>Hello world</h1>")
});

app.get("/write", (req, res) => {
    const posts = [];
    for(let i=0;i<10;i++){
        posts.push({
            id:i,
            title: `테스트 타이틀(${i})`,
            content:`테스트 내용입니다(${i})`
        });
    }
    fs.writeFileSync("test.json", JSON.stringify({data:posts}), null, 2);
    res.send("<h1>test.json 파일 생성 성공</h1>")
});

app.get("/list", (req, res) => {
    const data = fs.readFileSync('test.json','utf-8');
    const result = JSON.parse(data);
    const posts = result["data"];
    posts.forEach(x=>{
                x["author"] = {
                    name : "홍길동",
                    email : "aa@gmail.com"
                }
            });
                
    res.status(200).json({data:posts});
});

app.get("/view/:postId", (req, res) => {
    const postId = req.params.postId;
    const data = fs.readFileSync('test.json','utf-8');
    const jsonObj = JSON.parse(data);
    const posts = jsonObj["data"];
    const selectedPost = posts.filter(item=>{
        return item.id == postId;
    });
    console.log(selectedPost[0]);
    res.json({data:selectedPost[0]});

});

app.listen(PORT, ()=>{
    console.log(`서버가 실행중입니다. ${PORT} 에서`);
});
const fs = require('fs');

const result = fs.readFileSync('test.json', 'utf-8');
const data = JSON.parse(result); //객체로 바꿔줌
const posts = data["data"];
posts.forEach(item=>{
    console.log(item['title'], item['content'], item['author'])
});
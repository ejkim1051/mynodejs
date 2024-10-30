const fs = require('fs');

fs.readFile('hello.txt', 'utf-8', (err, data) => {
    if(err){
        console.log(`error : ${err}`);
    }
    console.log(`data:${data}`);
});


try{
    const data = fs.readFileSync('hello.txt', 'utf-8'); //1.파일명, 2.인코딩포멧
    console.log(`readFileSync data : ${data}`);
}catch(e){
    console.log(e);
}

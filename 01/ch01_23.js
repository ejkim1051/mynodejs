console.log('begin');

setTimeout(()=>{
    console.log(`1초 뒤어 호출`);
}, 1000);

console.log('end');

setInterval(()=>{
    console.log(`1초 마다 실행`);
},1000);
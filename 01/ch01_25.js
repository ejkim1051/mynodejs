let personInfo = {
    name:'lee',
    age:55,
    address:'서울 금천구 독산동 123',
    hobby:['독서','등산','낚시','넷플릭스']
}

for(let key in personInfo){
    console.log(`${key} => ${personInfo[key]}`);
}

console.log('--------------------------');
console.log(`key List : ${Object.keys(personInfo)}`);
console.log(`key List Type : ${typeof(Object.keys(personInfo))}`);  //Object.keys 키찾기

//includes 배열찾기

Object.keys(personInfo).forEach(key=>{
    console.log(`${key} => ${personInfo[key]}`);
});
let personInfo = {
    name:'lee',
    age:55,
    address:'서울 금천구 독산동 123',
    hobby:['독서','등산','낚시','넷플릭스']
}

console.log(personInfo);
console.log(personInfo['name']);
console.log(personInfo['age']);
console.log(personInfo.hobby[2]);
console.log(personInfo.hobby.length);
//console.log(JSON.stringify(personInfo));
console.log('--------------------------');
personInfo['gender'] = 'M'; //추가
console.log(personInfo);
personInfo['address'] = '서울 양천구 신정동';   //수정
console.log(personInfo);